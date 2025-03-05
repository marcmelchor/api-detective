// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
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
				path.join(context.extensionPath, 'src', 'extension.html')
			);

			const componentJsUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'dist', 'detective-api', 'index.js'))
			);
			let componentHTML = fs.readFileSync(html.fsPath, 'utf-8');

			componentHTML = componentHTML
				.replace(
					"import { DetectiveAPI } from './index.js';",
					`import { DetectiveAPI } from '${ componentJsUri }';`
				);
			panel.webview.html = componentHTML;
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {
}
