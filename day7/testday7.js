const fs = require("fs");

fs.readFile("test.txt", "utf-8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	const jasoned = JSON.stringify(data);
	let word = "";
	let lines = [];
	let siraj = 0;
	let test = jasoned.slice(7, 7 + 4);
	let directories = {};

	for (let i = 1; i < jasoned.length; i++) {
		if (jasoned.slice(i, i + 4) == "\\r\\n" || i == jasoned.length - 1) {
			lines.push(word);
			word = "";
			i += 3;
		} else {
			word += jasoned[i];
		}
	}
	for (let i = 0; i < lines.length; i++) {
		if (lines[i][0] == "$" && lines[i][2] == "c") {
			let dir = "";
			let temp = "";
			let listOfSubDir = [];
			for (let j = 5; j < lines[i].length; j++) {
				dir += lines[i][j];
			}
			if (lines[i + 1] == "$ ls") {
				for (let k = i + 2; k < lines.length; k++) {
					if (lines[k][0] !== "$") {
						listOfSubDir.push(lines[k]);
					} else {
						directories[dir] = listOfSubDir;
						siraj = k - i;
						k = lines.length;
					}
				}
			}
			if (listOfSubDir.length != 0) {
				directories[dir] = listOfSubDir;
			}
			// console.log(directories);

			// directories[dir] = ["test"];
			// console.log(listOfSubDir);
		}
	}
	// console.log(word);
	// console.log(directories);
	let keys = Object.keys(directories);
	console.log(keys);
	for (let i = 0; i < keys.length; i++) {
		let tempArray = directories[keys[i]];
		for (let k = 0; k < tempArray.length; k++) {
			if (tempArray[k][0] == "d") {
				for (let j = 4; j < tempArray[k].length; j++) {
					word += tempArray[k][j];
					if (j == tempArray[k].length - 1) {
						tempArray[k] = word;
						word = "";
					}
				}
			} else {
				tempArray[k] = parseInt(tempArray[k]);
			}
		}
	}
	let sum = 0;
	for (let i = keys.length - 1; i >= 0; i--) {
		let tempArray = directories[keys[i]];
		console.log(tempArray);
		for (let k = 0; k < tempArray.length; k++) {
			if (typeof tempArray[k] == "number") {
				sum += tempArray[k];
				tempArray.splice(k, 1);
				// console.log(tempArray);
			}
			if (k == tempArray.length - 1) {
				tempArray.push(sum);
				sum = 0;
				// console.log(tempArray);
			}
		}
	}

	for (let i = keys.length - 1; i >= 0; i--) {
		let tempArray = directories[keys[i]];
		for (let k = 0; k < tempArray.length; k++) {
			if (typeof tempArray[k] == "string") {
				tempArray[k] = directories[tempArray[k]][0];
			}
		}
	}
	console.log(directories);
});
