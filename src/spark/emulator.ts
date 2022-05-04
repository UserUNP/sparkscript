import tmp from "tmp";
// import Template from "../components/Template";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";

function setversion(version: string) {
	runCompiler(["-v", version], (stdout: string, _stderr: string) => {
		if(stdout.includes("Invalid version")) throw new Error(stdout);
	});
}

function from(raw: string): void;
function from(raw: Buffer): void;
function from(raw: string | Buffer) {
	const tmpobj = tmp.fileSync();
	fs.writeFileSync(tmpobj.name, raw);
	runCompiler([tmpobj.name], (stdout: string, _stderr: string) => {
		if(stdout.includes("ERROR")) throw new Error(stdout);
		if(stdout.includes("TFINISHEDOK")) {
			console.log(stdout.split(":")[1].replace("\n", ""))
		}
	});
}

function runCompiler(args: string[], callback: (stdout: string, stderr: string) => void) {
	const cwd = path.join(__dirname, ".");
	if(process.platform === "linux") {
		const spkc = path.join(__dirname, "./spkc");
		return execFile(spkc, args, {cwd, shell: true}, (err, stdout, stderr) => {
			if(err) throw err;
			callback(stdout, stderr);
		});
	} else if(process.platform === "win32") {
		const spkc = path.join(__dirname, "./spkc.exe");
		return execFile(spkc, args, {cwd, shell: true}, (err, stdout, stderr) => {
			if(err) throw err;
			callback(stdout, stderr);
		});
	} else {
		throw new Error(`Unsupported platform: ${process.platform}`);
	}
}

export default {
	runCompiler,
	from,
	setversion
}
