[**Modul Ajar Generator**](../../../../README.md)

***

[Modul Ajar Generator](../../../../README.md) / [packages/utils/utils](../README.md) / extractCodeFromMarkdownFence

# Function: extractCodeFromMarkdownFence()

> **extractCodeFromMarkdownFence**(`code`): `string`

Defined in: [packages/utils/utils.js:79](https://github.com/GTPSHAX/modul-ajar-generator/blob/9db625383fe8ae8db846d4419c7c2eb1c653406a/packages/utils/utils.js#L79)

Cleans code extracted from markdown code blocks.
Removes the enclosing backticks while preserving inner content.
Use this when the entire input is a markdown code block.

## Parameters

### code

`string`

Code wrapped in markdown fences (```...```)

## Returns

`string`

- Code content without fence markers
