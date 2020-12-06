const fs = require('fs')

fs.readFile('./input_day6.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }

  // calculateSeatIDs("BFFFBBFRRR");
  // calculateSeatIDs("FFFBBBFRRR");
  // calculateSeatIDs("BBFFBBFRLL");

  calculateAnswers(data)
})

function calculateAnswers(input) {
  let data = input.split("\n");
  let groupNo = 0;
  let groupData = "";
  let groupDataList = [];
  let sum = 0;
  let sum2 = 0;
  let groupSize = 0;

  data.forEach((row, i) => {
    //console.log(row);
    if (row === "") {
      groupNo++;
      let orderedAnswers = groupData.split("").sort();
      let rawAnswers = orderedAnswers.join();

      for (var j = 0; j < orderedAnswers.length - 1; j++) {
        //console.log(orderedAnswers[j]);
        if (orderedAnswers[j] === orderedAnswers[j+1]) {
          orderedAnswers.splice(j, 1);
          j--;
        }
      }

      orderedAnswers = orderedAnswers.join();
      while (orderedAnswers.includes(",") || rawAnswers.includes(",")) {
        orderedAnswers = orderedAnswers.replace(",","");
        rawAnswers = rawAnswers.replace(",","");
      }

      for (var j = 0; j < rawAnswers.length; j++) {
        if (rawAnswers[j] === rawAnswers[j + groupSize - 1]) {
          sum2++;
        }
      }

      groupDataList.push(orderedAnswers);
      sum += orderedAnswers.length;
      groupSize = 0;
      groupData = "";
    } else {
      groupData = groupData.concat(row);
      groupSize++;
    }

  });

  console.log("Sum anyone answered", sum);
  console.log("Sum everyone answered", sum2);
}
