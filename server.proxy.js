const childProcess = require('child_process');
const fs = require('fs');

const platform = process.platform;
const httpHost = "127.0.0.1:3000";
const httpsHost = "0.0.0.0:3010";
const publicKeyPath = process.cwd() + "/cert/cert.pem";
const privateKeyPath = process.cwd() + "/cert/key.pem";

let commands = [];
let filename, filepath;

switch (platform) {
	case "linux":
		filename = "ssl-proxy-linux-amd64";
		filepath = process.cwd() + "/" + filename;
		console.log("Operating System: " + platform);

		try {
			fs.readFileSync(filepath);
		} catch (e) {
			console.log("Downloading the ssl-proxy pre-build binary using wget");
			commands.push("wget -qO- \"https://getbin.io/suyashkumar/ssl-proxy\" | tar xvz");

			// add ssl-proxy file to gitignore
			fs.appendFileSync("./.gitignore", "\n" + filename + "\n");
		}

		commands.push(filepath
		+ " -cert " + publicKeyPath
		+ " -key " + privateKeyPath
		+ " -from " + httpsHost
		+ " -to " + httpHost
		);

		break;
	case "darwin":
		console.log("Operating System: " + platform);
		console.log("Downloading the ssl-proxy pre-build binary using wget");
		break;
	case "win32" || "win64":
		console.log("Operating System: " + platform);
		console.log("Downloading the ssl-proxy pre-build binary using wget");
		break;
	default:
		break;
}

// execute commands
(function () {
	if (commands.length > 0) {
		const command = commands.join(" && ");

		childProcess.execSync(command, {
			cwd: process.cwd(),
			env: process.env,
			stdio: 'inherit',
			encoding: 'utf-8'
		});
	}
})();
