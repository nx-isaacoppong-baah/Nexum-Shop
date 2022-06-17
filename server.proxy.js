const childProcess = require('child_process');
const fs = require('fs');
const path = require("path");

const platform = process.platform;
const httpHost = "127.0.0.1:3010";
const httpsHost = "0.0.0.0:3000";
const certificatePath = path.join(__dirname, "certificates");
const publicKeyPath = path.join(certificatePath, "cert.pem");
const privateKeyPath = path.join(certificatePath, "key.pem");
const gitignorePath = process.cwd() + "/.gitignore";

let commands = [];
let filename, filepath;

// execute commands
(function () {
	switch (platform) {
		case "linux":
			filename = "ssl-proxy-linux-amd64";
			filepath = path.join(__dirname, filename);
			console.log("Operating System: " + platform);
	
			try {
				fs.readFileSync(filepath);
			} catch (e) {
				console.log("Downloading the ssl-proxy pre-build binary using wget");
				commands.push("wget -qO- \"https://getbin.io/suyashkumar/ssl-proxy\" | tar xvz");
	
				commands.push(filepath
					+ " -from " + httpsHost
					+ " -to " + httpHost
				);
	
				// add ssl-proxy file to gitignore
				fs.appendFileSync(gitignorePath, "\n" + filename + "\n");
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

	if (commands.length > 0) {
		const command = commands.join(" && ");
		console.log(command);
		childProcess.execSync(command, {
			cwd: process.cwd(),
			env: process.env,
			stdio: 'inherit',
			encoding: 'utf-8'
		});
	}
})();
