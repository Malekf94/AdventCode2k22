const fs = require("fs");

fs.readFile("inputData.txt", "utf-8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	let oneSet = [];
	let wholeSet = [];
	let number = "";
	let sum = 0;
	const reg = new RegExp("^[0-9]$");

	for (let i = 0; i < data.length; i++) {
		if (data[i] == "-") {
			oneSet.push(parseInt(number)); //when we see the - symbol, we add the number
			number = "";
		} else if (data[i] == ",") {
			oneSet.push(parseInt(number)); //when we see the "," symbol, we add the number and then the whole array to show that that is one elf
			wholeSet.push(oneSet);
			oneSet = [];
			number = "";
		} else if (data[i] != "," || data[i] != "-") {
			// console.log(data[i]);
			let parsedInt = parseInt(data[i]);
			const numberTest = reg.test(parsedInt);

			if (numberTest == false) {
				//if it's a line break then we compare the two elves
				if (number.length != 0) {
					oneSet.push(parseInt(number));
					wholeSet.push(oneSet);
					number = "";
					oneSet = [];
				}
			} else {
				number += data[i];
				if (i == data.length - 1) {
					oneSet.push(parseInt(number));
					wholeSet.push(oneSet);
				}
			}
			if (wholeSet.length == 2) {
				if (
					wholeSet[0][0] <= wholeSet[1][0] &&
					wholeSet[0][1] >= wholeSet[1][0]
				) {
					sum++;
				} else if (
					wholeSet[0][0] <= wholeSet[1][1] &&
					wholeSet[0][1] >= wholeSet[1][1]
				) {
					sum++;
				} else if (
					wholeSet[1][0] <= wholeSet[0][1] &&
					wholeSet[1][1] >= wholeSet[0][1]
				) {
					sum++;
				} else if (
					wholeSet[1][0] <= wholeSet[0][0] &&
					wholeSet[1][1] >= wholeSet[0][0]
				) {
					sum++;
				}
				wholeSet = [];
			}
		}
	}
	console.log(sum);
});
