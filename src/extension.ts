'use strict';

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp';
import { ConfigLoader, FileList, FileCombiner } from '@cobuskruger/combine-files';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.combineScripts', async(selectedFile: any, fileList: any) => {
        const rootPath = <any>vscode.workspace.rootPath || './';
        const vscodeConfig = vscode.workspace.getConfiguration('combineScripts');
        const configFileGroups = [];
        for (const prop in vscodeConfig) {
            if (vscodeConfig.hasOwnProperty(prop) && typeof(vscodeConfig[prop]) === 'object') {
                configFileGroups.push(vscodeConfig[prop]);
            }
        }
        const configLoader = new ConfigLoader({ fileGroups: configFileGroups }); 
        // [vscodeConfig.sqlScripts, vscodeConfig.markdown, vscodeConfig.textFiles] });
        const configFilePath = path.resolve(rootPath, '.combinefilesrc.json');
        if (fs.existsSync(configFilePath)) {
            configLoader.addConfigFile(configFilePath);
        }
        const fileGroups = configLoader.config.fileGroups;
        const outputFiles = [];
        if (!fileList) {
            fileList = [];
        }
        if (fileList.length > 0) {
            if (fileList[0] instanceof vscode.Uri) {
                fileList = fileList.map(item => item.fsPath);
            }
        } else {
            if (selectedFile) {
                if (selectedFile instanceof vscode.Uri) {
                    fileList.push(selectedFile.fsPath);
                } else {
                    fileList.push(selectedFile);
                }
            } else {
                fileList.push(rootPath);
            }
        }
        for (const fileGroup of fileGroups) {
            const resolvedFiles = (new FileList(fileList, rootPath, fileGroup));
            const files = resolvedFiles.list;
            const fileLists = {};
            for (const file of files) {
                const ext = <any>(file.split('.').pop());
                if (!fileLists.hasOwnProperty(ext)) {
                    fileLists[ext] = [];
                }
                fileLists[ext].push(file);
            }

            for (const key in fileLists) {
                if (!fileLists.hasOwnProperty(key)) {
                    continue;
                }
                const fileText = (new FileCombiner(fileGroup, fileLists[key])).getText();
                let outputFileName = fileGroup.outputFileName || tmp.tmpNameSync() + '.' + key;

                if (!path.isAbsolute(outputFileName)) {
                    outputFileName = path.join(rootPath, outputFileName);
                }
                fs.writeFileSync(outputFileName, fileText);
                outputFiles.push(outputFileName);
            }
        }
        for (const outputFileName of outputFiles) {
            const doc = await vscode.workspace.openTextDocument(outputFileName);
            await vscode.window.showTextDocument(doc, { preview: false });
        }
    }));
}

export function deactivate() {
}