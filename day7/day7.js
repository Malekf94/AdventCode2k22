const fs = require("fs");

fs.readFile("test.txt", "utf-8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	const jasoned = JSON.stringify(data);
	let word = "";
	let lines = [];
	let test = jasoned.slice(7, 7 + 4);
	console.log(test);
	let directories = {};

	for (let i = 1; i < jasoned.length; i++) {
		if (jasoned.slice(i, i + 4) == "\\r\\n") {
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
				let number = "";
				for (let j = i + 2; j < lines.length; j++) {
					if (lines[j][0] == "d") {
						for (let k = 4; k < lines[j].length; j++) {
							temp += lines[j][k];
						}
						listOfSubDir.push(temp);
						temp = "";
					}
					if (lines[j][0] != "d" && lines[j][0] != "$") {
						for (let k = 0; k < lines[j].length; k++) {
							number += lines[j][k];
							if (lines[j][k] == " ") {
								for (let l = k + 1; l < lines[j].length; l++) {
									temp += lines[j][l];
								}
								k = lines[j].length;
								let tempObj = {};
								tempObj[temp] = parseInt(number);
								listOfSubDir.push(tempObj);
								temp = "";
								number = "";
							}
						}
					}
				}
			}
			directories[dir] = ["test"];
			// console.log(listOfSubDir);
		}
	}
	// console.log(lines);
	console.log(directories);
});
