export function parseMarkdownToObject(markdown) {
  const lines = markdown.split('\n');
  const result = {};
  let currentKey = null;
  let currentValueLines = [];

  for (const line of lines) {
    const keyMatch = line.match(/^\{([A-Z_]+)\}$/);
    if (keyMatch) {
      if (currentKey) {
        result[currentKey] = currentValueLines.join('\n').trim();
      }
      currentKey = keyMatch[1].trim();
      currentValueLines = [];
    } else if (currentKey) {
      currentValueLines.push(line);
    }
  }

  if (currentKey) {
    result[currentKey] = currentValueLines.join('\n').trim();
  }

  return result;
}

export function getKeysDescriptionFromMarkdown(markdown) {
  const result = {};
  const regex = /<!--\s*\{([A-Z_]+)\}\s+([\s\S]*?)\s*-->/g;

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const key = match[1];
    const description = match[2].trim();
    result[key] = description;
  }

  return result;
}

export function removeCommentsFromMarkdown(markdown) {
  return markdown
    .replace(/<!--[\s\S]*?-->/g, '')      // Hapus semua HTML comment
    .replace(/\n\s*\n+/g, '\n')           // Hapus baris kosong berlebih
    .trim();
}

export function removeImportRequire(content) {
  return content
    // Single-line: import ... ; or require(...);
    .replace(/^\s*(import|require)(\s+|\s*\()([^\n]*?);?\s*$/gm, '')
    // Multi-line dynamic import(...) or require(...)
    .replace(/^\s*(import|require)\s*\([\s\S]*?\)\s*;?\s*$/gm, '')
    // Multi-line static import ... from '...' (no semicolon, spread across lines)
    .replace(/^\s*import\s[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    // Remove excess blank lines
    .replace(/\n\s*\n+/g, '\n')
    .trim();
}