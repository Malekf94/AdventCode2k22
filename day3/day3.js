const fs = require("fs");

fs.readFile("inputData.txt", "utf-8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	const allRuckSacks = [];
	let rucksack = "";
	const priorityLetter = [];
	const alphabet = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];
	let sum = 0;

	for (let i = 0; i < data.length; i++) {
		const tester = /[a-zA-Z]/.test(data[i]);
		if (tester) {
			rucksack += data[i];
		} else if (rucksack.length !== 0) {
			allRuckSacks.push(rucksack);
			rucksack = "";
		}
		if (i == data.length - 1) {
			allRuckSacks.push(rucksack);
		}
	}
	// for (let i = 0; i < allRuckSacks.length; i++) {
	// 	let itemLength = Math.floor(allRuckSacks[i].length / 2);
	// 	let a = allRuckSacks[i].slice(0, itemLength);
	// 	let b = allRuckSacks[i].slice(itemLength);
	// 	let firstCompartment = a.split("");
	// 	let secondCompartment = b.split("");
	// 	for (let j = 0; j < firstCompartment.length; j++) {
	// 		for (let k = 0; k < secondCompartment.length; k++) {
	// 			if (firstCompartment[j] == secondCompartment[k]) {
	// 				priorityLetter.push(firstCompartment[j]);
	// 				j = firstCompartment.length;
	// 				k = secondCompartment.length;
	// 			}
	// 		}
	// 	}
	// }
	// The above commentted out code was for the first part of the puzzle. Commenting out the below for loop if you want the answer for the first half.

	for (let i = 0; i < allRuckSacks.length; i += 3) {
		let threeElves = allRuckSacks.slice(i, i + 3);
		let firstElf = threeElves[0].split("");
		let secondElf = threeElves[1].split("");
		let thirdElf = threeElves[2].split("");
		for (let j = 0; j < firstElf.length; j++) {
			for (let k = 0; k < secondElf.length; k++) {
				if (firstElf[j] == secondElf[k]) {
					for (let l = 0; l < thirdElf.length; l++) {
						if (firstElf[j] == thirdElf[l]) {
							priorityLetter.push(firstElf[j]);
							j = firstElf.length;
							k = secondElf.length;
							l = thirdElf.length;
						}
					}
				}
			}
		}
	}

	for (let i = 0; i < priorityLetter.length; i++) {
		for (let j = 0; j < alphabet.length; j++) {
			if (priorityLetter[i] == alphabet[j]) {
				sum += j + 1;
			}
		}
	}
	console.log(sum);
	priorityLetter.sort();
	// console.log(priorityLetter);
	// console.log(allRuckSacks);
});
