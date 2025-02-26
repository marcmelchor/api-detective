// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { takeUntil } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

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
