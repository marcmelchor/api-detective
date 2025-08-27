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
				path.join(context.extensionPath, 'src', 'app', 'dist', 'index.html')
			);

			const componentJsUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'src', 'app', 'dist', 'assets', 'index.js'))
			);

			const componentCssUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'src', 'app', 'dist', 'assets', 'index.css'))
			);

			let componentHTML = fs.readFileSync(html.fsPath, 'utf-8');

			componentHTML = componentHTML
				.replace(
					'<script type="module" crossorigin src="/assets/index.js"></script>',
					`<script type="module" crossorigin src="${ componentJsUri }"></script>`
				)
				.replace(
					'<link rel="stylesheet" crossorigin href="/assets/index.css">',
					`<link rel="stylesheet" crossorigin href="${ componentCssUri }">`
				);
			panel.webview.html = componentHTML;
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {
}
