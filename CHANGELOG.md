# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

* Nothing for now.

## [2.0.3] - 2019-04-19

Updated one of the upstream dependencies to fix a bug causing selected files being included in a file for every configuration.

## [2.0.2] - 2019-04-10

1. Enabled dynamic loading of configuration types.
2. Changed the menu item to Combine Files, to reflect the more generic functionality it now has.
3. Fixed an error that showed when selecting the Combine Files option.

## [2.0.1] - 2019-04-05

Fixed a rather blatant oversight in the Readme - it still referred to Azure Data Studio in the title.

## [2.0.0] - 2019-03-27

### Overview
This is almost a complete rewrite of the extension, and it's much more customizable and capable than before.

### Added
1. Instead of being hard-coded to work with `.sql` files, that is now only one possible configuration and you can specify any glob pattern you choose.
2. A table of contents, showing line numbers for each file.
3. Customizable headers and footers for the TOC, the individual script files and the output file itself.
4. You can optionally specify an output filename, instead of having output dumped into a temporary file.
5. Multiple file groups, all with either shared or distinctive headers, footers and more.
6. Multiple output files. You can, for example, have one file for table changes, and another for data changes.
7. Run the extension directly from the command palette to include all the files in the workspace, or using multi-select from the explorer.
8. Configured directly in the Azure Data Studio user or workspace settings, or you can add a configuration file in the workspace root.

## [1.3.0] - 2018-07-20

### Changed

* Added GO statements after the PRINT statements, to ensure each statement is properly isolated.

## [1.2.0] - 2018-07-18

### Changed

* Added back the menu item.

## [1.1.0] - 2018-07-13

### Changed

* Small update to add print statements, so you can see the start and end of scripts as they execute.
* Also added an icon.

## [1.0.0] - 2018-07-11

* This is the initial release. Super excited.

