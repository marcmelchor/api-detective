// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
// import { DetectiveAPI } from '../components/index';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	/*
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "api-detective" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('api-detective.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from API Detective!');
	});

	context.subscriptions.push(disposable);
	*/
	context.subscriptions.push(
		vscode.commands.registerCommand('api-detective.startApiDetective', () => {
			const panel = vscode.window.createWebviewPanel(
				'apiDetective',
				'API Detective',
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					localResourceRoots: [
						vscode.Uri.joinPath(context.extensionUri, 'src/components')
					]
				}
			);
			const html = vscode.Uri.joinPath(
				context.extensionUri,
				'src/components',
				'index.html'
			);
			fs.readFile(html.fsPath, 'utf-8', (err, data) => {
				if (err) {
					vscode.window.showErrorMessage('Failed to load HTML file.');
					return;
				}

				const webView = panel.webview.asWebviewUri(
					vscode.Uri.joinPath(context.extensionUri, 'src/components')
				);

				let updatedHtml = data
                    .replace(/src="(.*?)"/g, (match, src) => {
                        return `src="${panel.webview.asWebviewUri(
                            vscode.Uri.joinPath(
                                context.extensionUri,
                                "src/components",
                                src
                            )
                        )}"`;
                    })
                    .replace(/href="(.*?)"/g, (match, href) => {
                        return `href="${panel.webview.asWebviewUri(
                            vscode.Uri.joinPath(
                                context.extensionUri,
                                "src/components",
                                href
                            )
                        )}"`;
                    });
				panel.webview.html = updatedHtml;
			});
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
