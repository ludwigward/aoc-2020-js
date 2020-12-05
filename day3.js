const fs = require('fs')

fs.readFile('./input_day3.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }
  calculateTrees(data);
})

function calculateTrees(input) {
  let sum = 1;
  let inputCopy = input;
  //console.log(input.length);

  let pos = 0;
  let rowLength = 30;
  let rows = input.split("\n");

  let rightsteps = [1,3,5,7];
  let downsteps  = [1,1,1,1];

  rightsteps.forEach((rightstep, i) => {
    let noOfTrees = 0;
    rows.forEach((row, j) => {
      if (row[(j*rightstep)%31] === "#") {
        if (downsteps[i] !== 2) {
          noOfTrees++;
        } else {
          if (j%2 !== 0) {
            noOfTrees++;
          }
        }
      }

    });
    console.log(noOfTrees);
    sum *= noOfTrees;


  });
  noOfTrees = 0
  for (var i = 0; i < rows.length; i = i + 2) {
    console.log((i/2) % 31);
    console.log(rows[ (i/2)%31 ]);
    if (rows[i][ (i/2)%31 ] === "#") {
      noOfTrees++;
    }
  }
  console.log(noOfTrees);
console.log(sum*noOfTrees);

}
