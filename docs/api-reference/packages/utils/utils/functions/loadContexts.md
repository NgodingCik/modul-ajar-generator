[**Modul Ajar Generator**](../../../../README.md)

***

[Modul Ajar Generator](../../../../README.md) / [packages/utils/utils](../README.md) / loadContexts

# Function: loadContexts()

> **loadContexts**(`dir`): `object`

Defined in: [packages/utils/utils.js:37](https://github.com/GTPSHAX/modul-ajar-generator/blob/4297ff4935987b650cede1000047210790531bd4/packages/utils/utils.js#L37)

This function loads all Markdown files from a specified directory, reads their content, and constructs an object where each key is derived from the filename (converted to uppercase and underscores) and the value is the file's content. This allows for easy access to the content of multiple Markdown files in a structured format.

## Parameters

### dir

`string`

Content directory path

## Returns

`object`

- An object where keys are derived from filenames and values are file contents
