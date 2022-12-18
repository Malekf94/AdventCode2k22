const fs = require("fs");

fs.readFile("inputData.txt", "utf-8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	// console.log(data);
	const stringified = JSON.stringify(data);
	const crates = [];
	let singleCrate = [];
	let count = 0;
	const re = /^\d$/;
	let tempCrate = [];
	let end_of_matrix = 0;

	for (let i = 2; i < stringified.length; i += 4) {
		if (stringified[i + 1] == "n") {
			i--;
		} else if (re.test(parseInt(stringified[i]))) {
			for (let j = i; j < stringified.length; j += 4) {
				if (re.test(parseInt(stringified[j])) == false) {
					end_of_matrix = j;
					i = stringified.length;
					j = stringified.length;
				} else {
					count++;
				}
			}
		} else {
			singleCrate.push([stringified[i]]);
		}
	}

	for (let i = 0; i < singleCrate.length; i += count) {
		tempCrate.push(singleCrate[i]);
		if (tempCrate.length == singleCrate.length / count) {
			crates.push(tempCrate);
			tempCrate = [];
			if (crates.length == count) {
				i = singleCrate.length;
			} else {
				i = crates.length - count;
			}
		}
	}
	let moving = [];
	let number = "";
	for (let i = end_of_matrix; i < stringified.length; i++) {
		if (re.test(parseInt(stringified[i]))) {
			number += stringified[i];
		} else {
			if (number.length != 0) {
				moving.push(parseInt(number));
			}
			number = "";
		}

		if ((stringified[i + 1] = "r" && stringified[i + 3] == "n")) {
			i += 3;
		}
	}
	for (let i = 0; i < crates.length; i++) {
		for (let j = 0; j < crates[i].length; j++) {
			if (crates[i][j] == " ") {
				crates[i].splice(j, 1);
				j--;
			}
		}
	}

	// for (let i = 0; i < moving.length; i += 3) {
	// 	let a = moving[i];
	// 	let from = moving[i + 1] - 1;
	// 	let to = moving[i + 2] - 1;
	// 	for (let j = 0; j < a; j++) {
	// 		let b = crates[from].shift();
	// 		crates[to].unshift(b);
	// 	}
	// }

	for (let i = 0; i < moving.length; i += 3) {
		let a = moving[i];
		let from = moving[i + 1] - 1;
		let to = moving[i + 2] - 1;
		let b = crates[from].splice(0, a);
		for (let j = b.length - 1; j >= 0; j--) {
			crates[to].unshift(b[j]);
		}
	}

	console.table(crates);
});
