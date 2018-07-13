'use strict';

import { commands, ExtensionContext, workspace, window } from 'vscode';
// import * as sqlops from 'sqlops';
import * as fs from 'fs';
import * as tmp from 'tmp';
import { FullFileList } from './full-file-list';
import { FileConcatenator } from './file-concat';

export function activate(context: ExtensionContext) {

    context.subscriptions.push(commands.registerCommand('extension.combineScripts', (selectedFile, fileList) => {
        let files = (new FullFileList(fileList)).list;
        let text = (new FileConcatenator(files)).getText();
        let tempName = tmp.tmpNameSync() + '.sql';
        fs.writeFileSync(tempName, text);
        workspace.openTextDocument(tempName).then(doc => {
            window.showTextDocument(doc);
        });
    }));

    // context.subscriptions.push(vscode.commands.registerCommand('extension.showCurrentConnection', () => {
    //     sqlops.connection.getCurrentConnection().then(connection => {
    //         let connectionId = connection ? connection.connectionId : 'No connection found!';
    //         vscode.window.showInformationMessage(connectionId);
    //     }, error => {
    //          console.info(error);
    //     });
    // }));
}

export function deactivate() {
}