// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

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
				}
			);
			const html = vscode.Uri.file(
				path.join(context.extensionPath, 'src/components', 'component.html')
			);

			const componentScriptUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'dist', 'component.js'))
			);
			let componentHTML = fs.readFileSync(html.fsPath, 'utf-8');

			componentHTML = componentHTML.replace(
				"import { DetectiveAPI } from './component.js';",
				`import { DetectiveAPI } from '${ componentScriptUri }';`
			);
			panel.webview.html = componentHTML;
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
