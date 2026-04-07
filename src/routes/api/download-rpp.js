import { AppRoute } from "../index.js";
import { convertMarkdownToDocx } from "@mohtasham/md-to-docx";
import fs from "fs";
import path from "path";
import JSZip from "jszip";

const dirname = import.meta.dirname;

export const route = new AppRoute("/download-rpp", "post", async (req, res) => {
  try {
    const { rppObject, md } = req.body;
    if (!rppObject && !md) {
      return res
        .status(400)
        .json({ error: "RPP object and markdown are required" });
    }

    // Parse markdown values in rppObject to DOCX-compatible format
    for (const [key, value] of Object.entries(rppObject)) {
      if (typeof value === "string") {
        // Docxtemplater free version only supports plain text, so we strip markdown formatting like bold/italic.
        rppObject[key] = value
          .replace(/\*\*(.*?)\*\*/g, "$1")
          .replace(/\*(.*?)\*/g, "$1")
          .replace(/__(.*?)__/g, "$1");
      }
    }

    // Force all heading levels to be bolded and replace <br> with a unique token for soft breaks
    let currentSectionIndent = 0;
    let lastHeaderLevel = 0;
    let lastLineWasText = false;
    let mdWithBoldHeading = md
      .replace(/^(#+)\s+(.+)$/gm, "$1 **$2**")
      .replace(/<br\s*\/?>/gi, "@@SOFT_BR@@")
      .replace(/<breakPage\s*\/?>/gi, "@@PAGE_BREAK@@")
      .split("\n");

    mdWithBoldHeading = mdWithBoldHeading
      .map((line) => {
        if (line.trim() === "") return "";

        // Determine indent context from headers
        const headerMatch = line.match(/^(#+)\s/);
        console.log(`Processing line: "${line}"`);
        console.log(`Header match: ${JSON.stringify(headerMatch)}`);
        if (headerMatch) {
          const headerLevel = headerMatch[1].length; // H1=1, H2=2, H3=3, etc.

          // Determine section indent purely by header level. H1, H2 -> 0, H3 -> 1, etc.
          currentSectionIndent = Math.max(0, headerLevel - 2);
          
          console.log(`[DEBUG INDENT] Found Header H${headerLevel}. Setting currentSectionIndent to ${currentSectionIndent}`);

          lastHeaderLevel = headerLevel;
          lastLineWasText = false;
          // Headers themselves can get markers too if they need indentation
          let markerText = "";
          if (currentSectionIndent > 0) {
            markerText += `\u200BIND_LVL_${currentSectionIndent}\u200B`;
          }
          if (headerLevel === 2) {
            markerText += `\u200BH2_MARKER\u200B`;
          }
          
          if (markerText) {
            console.log(`[DEBUG INDENT] Injecting marker ${markerText} into header: "${line.substring(0, 20)}..."`);
            return `${line}${markerText}`;
          }
          return line;
        }

        // Exclude formatting tables to prevent breaking MD logic
        if (/^[ \t]*\|/.test(line)) {
          console.log(`[DEBUG INDENT] Skipping table line: "${line.substring(0, 20)}..."`);
          lastLineWasText = false;
          return line;
        }

        const listMatch = line.match(/^([ \t]*)([-*+◦•]|\d+\.)\s+(.*)/);
        
        // Kita hitung panjang karakternya hanya pada segmen sebelum ada enter/break manual
        const firstSegment = line.split("@@SOFT_BR@@")[0].split("@@PAGE_BREAK@@")[0];
        const needsFirstLineIndent = !listMatch && firstSegment.length > 200;

        // Skip adding markers if no indent is needed
        if (currentSectionIndent === 0 && !needsFirstLineIndent) {
          console.log(`[DEBUG INDENT] Skipping line due to 0 indent & no 1st-line: "${line.substring(0, 20)}..."`);
          lastLineWasText = !listMatch;
          return line;
        }

        let pMarkerText = "";
        if (currentSectionIndent > 0) pMarkerText += `\u200BIND_LVL_${currentSectionIndent}\u200B`;
        if (needsFirstLineIndent) pMarkerText += `\u200BFL_IND\u200B`;
        
        console.log(`[DEBUG INDENT] Injecting marker ${pMarkerText.replace(/\u200B/g, '')} into line: "${line.substring(0, 20)}..."`);

        // For list items, add blank line if previous was regular text
        if (listMatch) {
          const [, leading, bullet, text] = listMatch;
          const result = `${leading}${bullet} ${text}${pMarkerText}`;
          const needsBlankLine = lastLineWasText;
          lastLineWasText = false;
          // Add blank line before list if previous line was text (helps parsesr recognize list)
          return needsBlankLine ? `\n${result}` : result;
        }

        // For regular paragraphs, inject at the end
        lastLineWasText = true;
        return `${line}${pMarkerText}`;
      })
      .join("\n");

    // Convert markdown to DOCX buffer
    const blob = await convertMarkdownToDocx(mdWithBoldHeading, {
      style: {
        fontFamily: "Times New Roman",
        heading1Alignment: "CENTER",
      },
    });
    const arrayBuffer = await blob.arrayBuffer();

    // Post-process DOCX with JSZip
    const zip = await JSZip.loadAsync(arrayBuffer);
    let documentXml = await zip.file("word/document.xml").async("string");

    // Replace soft breaks and page breaks
    documentXml = documentXml.replace(/@@SOFT_BR@@/g, "</w:t><w:br/><w:t>");
    documentXml = documentXml.replace(
      /@@PAGE_BREAK@@/g,
      '</w:t><w:br w:type="page"/><w:t>',
    );

    // Apply native DOCX indents, Spacing 1.5, and Font Size 12pt
    // HTML comments with markers are preserved in DOCX XML, look for them directly
    documentXml = documentXml.replace(
      /<w:p\b[^>]*>[\s\S]*?<\/w:p>/g,
      (pMatch) => {
        // Find our injected indentation marker (invisible zero-width spaces with marker text)
        const levelMatch = pMatch.match(/\u200BIND_LVL_(\d+)\u200B/);
        const hasFlInd = pMatch.includes("\u200BFL_IND\u200B");
        const hasH2Marker = pMatch.includes("\u200BH2_MARKER\u200B");
        
        const level = levelMatch ? parseInt(levelMatch[1], 10) : 0;

        // Remove all marker occurrences from this paragraph
        let cleanP = pMatch.replace(/\u200BIND_LVL_\d+\u200B/g, "")
                           .replace(/\u200BFL_IND\u200B/g, "")
                           .replace(/\u200BH2_MARKER\u200B/g, "");

        // --- SPACING & INDENTATION ---
        const spacingBefore = hasH2Marker ? "720" : "0"; // 720 twips = 36pt margin top for H2 (3x of 12pt)
        let spacingXml = `<w:spacing w:line="360" w:lineRule="auto" w:before="${spacingBefore}" w:after="0" />`;
        
        if (cleanP.includes("<w:pPr>")) {
          cleanP = cleanP.replace(/<w:pPr\b[^>]*>[\s\S]*?<\/w:pPr>/, (pPrText) => {
            let inner = pPrText;
            
            // List Items Logic
            if (inner.includes("<w:numPr>")) {
              if (level > 0) {
                inner = inner.replace(/<w:ilvl w:val="(\d+)"\s*\/>/, (match, currVal) => {
                  const newLevel = parseInt(currVal, 10) + level;
                  return `<w:ilvl w:val="${newLevel}"/>`;
                });
              }
            }
            
            // Standard Margin / Indent Logic
            let indXml = "";
            if (!inner.includes("<w:numPr>") && (level > 0 || hasFlInd)) {
              if (inner.includes("<w:ind ")) {
                inner = inner.replace(/<w:ind([^>]*)\/>/, (indMatch, attrs) => {
                  let newAttrs = attrs;
                  if (/w:left="\d+"/.test(newAttrs)) {
                    newAttrs = newAttrs.replace(/w:left="\d+"/, `w:left="${level * 720}"`);
                  } else {
                    newAttrs += ` w:left="${level * 720}"`;
                  }
                  if (hasFlInd) {
                    if (/w:firstLine="\d+"/.test(newAttrs)) {
                      newAttrs = newAttrs.replace(/w:firstLine="\d+"/, `w:firstLine="720"`);
                    } else {
                      newAttrs += ` w:firstLine="720"`;
                    }
                  }
                  return `<w:ind${newAttrs}/>`;
                });
              } else {
                indXml = `<w:ind w:left="${level * 720}"${hasFlInd ? ' w:firstLine="720"' : ''} />`;
              }
            }

            // Spacing Logic
            if (inner.includes("<w:spacing ")) {
              inner = inner.replace(/<w:spacing([^>]*)\/>/, spacingXml);
              spacingXml = ""; // handled
            }

            // Inject safely before <w:rPr> or </w:pPr> to maintain OOXML valid order
            let toInject = spacingXml + indXml;
            if (toInject) {
              let injectPos = inner.indexOf("<w:rPr>");
              if (injectPos === -1) injectPos = inner.indexOf("</w:pPr>");
              inner = inner.slice(0, injectPos) + toInject + inner.slice(injectPos);
            }
            return inner;
          });
        } else {
          // No paragraph properties exist, create them
          let indXml = "";
          if (level > 0 || hasFlInd) {
            indXml = `<w:ind w:left="${level * 720}"${hasFlInd ? ' w:firstLine="720"' : ''} />`;
          }
          cleanP = cleanP.replace(/^(<w:p\b[^>]*>)/, `$1<w:pPr>${spacingXml}${indXml}</w:pPr>`);
        }

        // --- FONT SIZE 12pt (24 half-points) ---
        // Only apply 12pt if not a heading
        const isHeading = cleanP.includes('<w:pStyle w:val="Heading');
        if (!isHeading) {
          cleanP = cleanP.replace(/<w:r\b[^>]*>[\s\S]*?<\/w:r>/g, (rMatch) => {
            let run = rMatch;
            const szXml = `<w:sz w:val="24"/><w:szCs w:val="24"/>`; // 12pt = 24
            if (run.includes("<w:rPr>")) {
              if (run.includes("<w:sz ")) {
                run = run.replace(/<w:sz w:val="\d+"\s*\/>/g, '<w:sz w:val="24"/>');
                run = run.replace(/<w:szCs w:val="\d+"\s*\/>/g, '<w:szCs w:val="24"/>');
              } else {
                run = run.replace("<w:rPr>", `<w:rPr>${szXml}`);
              }
            } else {
              run = run.replace(/^(<w:r\b[^>]*>)/, `$1<w:rPr>${szXml}</w:rPr>`);
            }
            return run;
          });
        }

        return cleanP;
      },
    );

    // --- PAGE MARGINS & A4 FORMAT ---
    // 1 cm ≈ 567 twips
    // Top: 3cm (1701), Left: 4cm (2268), Bottom: 3cm (1701), Right: 3cm (1701)
    // A4: w:w="11906" w:h="16838"
    documentXml = documentXml.replace(
      /<w:sectPr([^>]*)>([\s\S]*?)<\/w:sectPr>/g,
      (match, attrs, content) => {
        let newContent = content.replace(/<w:pgSz[^>]*\/>/g, '')
                                .replace(/<w:pgMar[^>]*\/>/g, '');
        newContent += '<w:pgSz w:w="11906" w:h="16838"/>';
        newContent += '<w:pgMar w:top="1701" w:right="1701" w:bottom="1701" w:left="2268" w:header="708" w:footer="708" w:gutter="0"/>';
        return `<w:sectPr${attrs}>${newContent}</w:sectPr>`;
      }
    );

    zip.file("word/document.xml", documentXml);

    const mdDocxBuffer = await zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync(path.join(dirname, "md.docx"), mdDocxBuffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
    res.setHeader("Content-Disposition", 'attachment; filename="RPP.docx"');
    res.send(mdDocxBuffer);
  } catch (error) {
    console.error("Error downloading RPP:", error);
    res.status(500).json({ error: "Failed to download RPP" });
  }
});
