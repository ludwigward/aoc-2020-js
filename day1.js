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
  let found = false;
  inputArray = input.split("\n");
  for (var i = 0; i < inputArray.length; i++) {
    for (var j = 0; j < inputArray.length; j++) {
      if (j !== i) {
        if (parseInt(inputArray[i]) + parseInt(inputArray[j]) == 2020) {
          console.log("Two number result: ", parseInt(inputArray[i])* parseInt(inputArray[j]));
          found = true;
          break;
        }
      }
    }
    if (found == true) {
      break;
    }
  }
}

function calculateNumbers2(input) {
  let found = false;
  inputArray = input.split("\n");
  for (var i = 0; i < inputArray.length; i++) {
    for (var j = 0; j < inputArray.length; j++) {
      for (var k = 0; k < inputArray.length; k++) {
        if (i !== j && i !== k && j !== k) {
          if (parseInt(inputArray[i]) + parseInt(inputArray[j]) + parseInt(inputArray[k]) == 2020) {
            found = true;
            console.log("Three number result: ", parseInt(inputArray[i]) * parseInt(inputArray[j]) * parseInt(inputArray[k]));
            break;
          }
        }
      }
      if (found == true) {
        break;
      }
    }
    if (found == true) {
      break;
    }
  }
}
