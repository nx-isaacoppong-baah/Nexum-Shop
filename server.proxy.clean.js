const childProcess = require('child_process');
const path = require("path");
const fs = require('fs');
const gitignorePath = process.cwd() + "/.gitignore";

const certificatePath = path.join(__dirname, "certificates");
const publicKeyPath = path.join(certificatePath, "cert.pem");
const privateKeyPath = path.join(certificatePath, "key.pem");

// create cert folder and move the keys to the folder
if (!fs.existsSync(certificatePath))  {
	fs.mkdirSync(certificatePath);
}

// add ssl-proxy file to gitignore
fs.appendFileSync(gitignorePath, "\ncertificates\n");

(function () {
	if (!fs.existsSync("./cert.pem") || !fs.existsSync("./key.pem")) {
		return;
	}

	const command = [
		"mv ./cert.pem " + publicKeyPath,
		"mv ./key.pem " + privateKeyPath
	].join(" && ")
	
	childProcess.execSync(command, {
		cwd: process.cwd(),
		env: process.env,
		stdio: 'inherit',
		encoding: 'utf-8'
	});
})();
