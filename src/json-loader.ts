import { WorkspaceSvg } from "blockly";
import { codeGen, createToolbox, generateCommandList, loadBlocks } from "./block-loader";
import { javaGenerator } from "./codegen";
import { CommandData } from "./types/command-data";

export const input = document.getElementById("fileInput")! as HTMLInputElement;
const fileReader = new FileReader();
/**
 * Allows JSON files to be read and the workspace to be changed when a JSON file is read
 * @param workspace The blockly workspace
 */
export function activateJsonLoader(workspace: WorkspaceSvg) {
	fileReader.addEventListener("loadend", e => {
		const commandData: CommandData = JSON.parse(fileReader.result! as string);
		loadBlocks(commandData);
		workspace.updateToolbox(createToolbox(generateCommandList(commandData)));
		codeGen(commandData, javaGenerator);
	});
	input.addEventListener("change", e => {
		const file = input.files?.item(0);
		if (file) {
			fileReader.readAsText(file);
		}
	});
}