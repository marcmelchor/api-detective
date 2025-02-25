// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { takeUntil } from 'rxjs';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { ApiService } from './services/api-service';
import { DetectiveAPI } from './components/detective.api/detective-api';


const apiService = new ApiService();
const detectiveApi = new DetectiveAPI();
detectiveApi.getRequestType()
	.pipe(takeUntil(apiService.unsubscribeNotifier()))
	.subscribe();
apiService.requestType$
	.pipe(takeUntil(apiService.unsubscribeNotifier()))
	.subscribe();

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
				path.join(context.extensionPath, 'src/components/detective.api', 'detective-api.html')
			);

			const componentJsUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'dist', 'detective.api', 'detective-api.js'))
			);
			const componentCssUri = panel.webview.asWebviewUri(
				vscode.Uri.file(path.join(context.extensionPath, 'dist', 'detective.api', 'detective-api.css'))
			);
			let componentHTML = fs.readFileSync(html.fsPath, 'utf-8');

			componentHTML = componentHTML
				.replace(
					"import { DetectiveAPI } from './detective-api.js';",
					`import { DetectiveAPI } from '${ componentJsUri }';`
				)
				.replace(
					'href=""',
					`href=${ componentCssUri }`
				);
			panel.webview.html = componentHTML;
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {
	apiService.stopSubscriptions();
}
