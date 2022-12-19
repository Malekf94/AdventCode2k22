const fs = require("fs");

fs.readFile("inputData.txt", "utf-8", (err, data) => {
	if (err) {
		console.log(err);
		return;
	}
	let sequence = [];
	for (let i = 0; i < 14; i++) {
		sequence.push(data[i]);
	}
	let index = 0;
	for (let i = 4; i < data.length; i++) {
		let a = sequence.length - 1;
		for (let j = 0; j < sequence.length; j++) {
			for (let k = a; k > j; k--) {
				if (sequence[j] == sequence[k]) {
					sequence.shift();
					sequence.push(data[i]);
					j = sequence.length;
				}
			}
			if (j == sequence.length - 1) {
				index = i;
				i = data.length;
				j = sequence.length;
			}
		}
	}
	console.log(index);
});
