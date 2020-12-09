const fs = require('fs')

fs.readFile('./input_day9.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }

  // calculateSeatIDs("BFFFBBFRRR");
  // calculateSeatIDs("FFFBBBFRRR");
  // calculateSeatIDs("BBFFBBFRLL");

  //decryptData(data);
  decryptAgain(data);
})

function decryptAgain(input) {
  let rows = input.split("\n");
  rows.splice(rows.length - 1, 1);
  let target = 26796446;

  let foundRange = false;
  for (var i = 0; i < rows.length; i++) {
    let range = [];
    for (var j = i ; j < rows.length; j++) {
      range.push(rows[j]);

      let sum = 0;
      for (var k = 0; k < range.length; k++) {
        sum += parseInt(range[k]);
      }

      if (sum > target) {
        j++;
      }
      if (sum === target) {
        console.log("FOUND");
        range.sort();
        console.log(range.length, range, sum, target);
        console.log(parseInt(range[0]) + parseInt(range[range.length - 1]));
        foundRange = true;

        break;
      }
    }
    if (foundRange) { break; }
  }
}

function decryptData(input) {
  let rows = input.split("\n");
  rows.splice(rows.length - 1, 1);

  rows.forEach((row, i) => {
    if (i <= 24) {
      console.log(i, row);
    } else {
      let lastNumbers = [];
      for (var j = 0; j < 25; j++) {
        lastNumbers[j] = parseInt(rows[i - 25 + j]);
      }
      //console.log(lastNumbers);
      //let valid = determineValid(lastNumbers, parseInt(row));
      console.log(lastNumbers.length, determineValid(lastNumbers, parseInt(row)), row);

    }

  });


}

function determineValid(previousNumbers, target) {
  let valid = false;
  for (var i = 0; i < previousNumbers.length; i++) {
    for (var j = 0; j < previousNumbers.length; j++) {
      if (i !== j) {
        //console.log(previousNumbers[i], previousNumbers[j], previousNumbers[i] + previousNumbers[j], target);
        if (previousNumbers[i] + previousNumbers[j] === target) {
          valid = true;
          break;
        }
      }
    }
    if (valid) {
      break;
    }
  }

  return [valid, previousNumbers[i], previousNumbers[j], i, j];

}
