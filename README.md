# Combine Files for Visual Studio Code

Combines several files spread over several folders. This is useful in many cases.

1. Combine SQL scripts from your repo into a single file you can use for deployment.
2. Easily create an API doc from Markdown files stored in a folder structure.
3. You get the idea.

## Features

Just use `Ctrl` and `Shift` to select multiple files and folders, then right-click and choose *Combine Files*. 

If you select a folder, all matching files in subfolders will also be included.

The result will be a single file containing the content of all the selected files. By default, there will also be headers and footers for each included file, as well as a table of contents at the top. You can configure all of this either in user settings, or a configuration file.

## Installation

Search for *Combine Files* in the VS Code extensions marketplace.

Alternatively, you can install it from this link: [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=BateleurIO.vscode-combine-scripts)

## Configuration

You can change the default configuration in user/workspace settings, or you can place a configuration file named `.combinefilesrc.json` in the workspace root.

The file looks like this:

```json
{
    "fileGroups": [/*...*/]
}
```

Each entry in `fileGroups` can have one or more of the following properties:

*   `groupName` - Not used. Use this to label multiple configurations.
*   `outputFileName` - The name of the output file. If this is not specified, a temporary file is created.
*   `fileGlobs` - A list of glob patterns to match. A file is included if it matches *any* glob pattern. Defaults to `**/*.sql` if none is specified.
*   `fileHeader` - The lines of text to be placed at the beginning of the output.
*   `fileFooter` - The lines of text to be placed at the end of the output.
*   `includeToc` - A table of contents will be written after `fileHeader` but before the first `entryHeader` if this is `true`. Defaults to `false`.
*   `tocHeader` - If `includeToc === true`, the lines of text to be placed after the `fileHeader`, but before the first `tocEntry`.
*   `tocEntry` - If `includeToc === true`, the single line of text that is added once for each included file. Defaults to `'\t${lineNo}\t\t${entryPath}'`, which will show the line number and original file name for each entry.
*   `tocFooter` - If `includeToc === true`, the lines of text to be placed after the last `tocEntry`, but before the first `entryHeader`.
*   `entryHeader` - The lines of text to be placed at the beginning of each file entry. You can also include the `${entryPath}` variable anywhere in this value.
*   `entryFooter` - The lines of text to be placed at the end of each file entry. You can also include the `${entryPath}` variable anywhere in this value.

For an example, here is the default configuration for SQL files:

```json
{
    "fileGroups": [{
        "fileGlobs": [
            "**/*.sql"
        ],
        "fileHeader": [
            "/**********************************************************************************",
            "* This is a concatenation of all the selected files, including files in subfolders.",
            "* The start and end of each file contains a comment with its name, as well as a",
            "* print statement.",
            "***********************************************************************************"
        ],
        "includeToc": true,
        "tocHeader": [
            "* These are the line numbers for the included files:"
        ],
        "tocEntry": "* ${lineNo}\t\t${entryPath}",
        "tocFooter": [
            "***********************************************************************************/"
        ],
        "entryHeader": [
            "/*********************************************************************************",
            "* Start: ${entryPath}",
            "**********************************************************************************/",
            "print 'Start: ${entryPath}'",
            "GO"
        ],
        "entryFooter": [
            "GO",
            "/*********************************************************************************",
            "* End: ${entryPath}",
            "**********************************************************************************/",
            "print 'End: ${entryPath}'",
            "GO",
            "/*********************************************************************************/"
        ],
        "fileFooter": []
    }]
}
```

## See Also

- [Combine Scripts for Azure Data Studio](https://github.com/BateleurIO/azuredatastudio-combine-scripts) is the Azure Data Studio version of this extension. The two are nearly identical, except that the Azure Data Studio version comes configured with defaults for `.sql` files. You can use it to combine other types as well.
- [Combine Files NPM Package](https://www.npmjs.com/package/@cobuskruger/combine-files) [(GitHub)](https://github.com/BateleurIO/combine-files) is an NPM package that combines files with all the same features as this extension.
