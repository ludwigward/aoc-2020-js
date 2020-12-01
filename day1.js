const fs = require('fs')

fs.readFile('./input_day1.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }
  calculateNumbers1(data);
  calculateNumbers2(data);
})

function calculateNumbers1(input) {
  inputArray = input.split("\n");
  for (var i = 0; i < inputArray.length; i++) {
    for (var j = 0; j < inputArray.length; j++) {
      if (j !== i) {
        if (parseInt(inputArray[i]) + parseInt(inputArray[j]) == 2020) {
          console.log(parseInt(inputArray[i])* parseInt(inputArray[j]));
          break;
        }
      }
    }
  }
}

function calculateNumbers2(input) {
  inputArray = input.split("\n");
  for (var i = 0; i < inputArray.length; i++) {
    for (var j = 0; j < inputArray.length; j++) {
      for (var k = 0; k < inputArray.length; k++) {
        if (parseInt(inputArray[i]) + parseInt(inputArray[j]) + parseInt(inputArray[k]) == 2020) {
          console.log(parseInt(inputArray[i]) * parseInt(inputArray[j]) * parseInt(inputArray[k]));
        }
      }
    }
  }
}
