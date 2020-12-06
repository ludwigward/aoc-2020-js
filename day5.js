const fs = require('fs')

fs.readFile('./input_day5.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }

  // calculateSeatIDs("BFFFBBFRRR");
  // calculateSeatIDs("FFFBBBFRRR");
  // calculateSeatIDs("BBFFBBFRLL");

  calculateSeatIDs(data)
})

function calculateSeatIDs(input) {
  let data = input.split("\n");
  let maxSeatID = 0;
  let rows = [];
  let cols = [];
  let myRow = 0;
  let myCol = 0;
  for (var i = 0; i < 128; i++) {
    rows[i] = 0;
  }
  for (var i = 0; i < 8; i++) {
    cols[i] = 0;
  }

  data.forEach((seatDesc, i) => {
    if (seatDesc !== "") {
      let maxRow = 128;
      let minRow = 0;
      let maxCol = 8;
      let minCol = 0;
      let row = -1;
      let col = -1;
      seatDesc.split("").forEach((step, j) => {


        if (step === "B") {
          if (j === 6) {
            row = maxRow - 1;
          } else {
            minRow = minRow + (maxRow - minRow)/2;
          }
        } else if (step === "F") {
          if (j === 6) {
            row = minRow;
          } else {
            maxRow = maxRow - (maxRow - minRow)/2;
          }
        } else if (step === "R") {
          if (j === 9) {
            col = maxCol - 1;
          } else {
            minCol = minCol + (maxCol - minCol)/2;
          }
        } else if (step === "L") {
          if (j === 9) {
            col = minCol;
          } else {
            maxCol = maxCol - (maxCol - minCol)/2;
          }
        }


        //console.log(j, minRow, maxRow, minCol, maxCol);
      });
      rows[row] = rows[row] + 1;
      cols[col] = cols[col] + 1;
      console.log(row, col, 8*row + col, rows[row], cols[col]);
      //console.log(rows);
      if (8*row + col > maxSeatID) {
        maxSeatID = 8*row + col;
      }

    }

  });
  console.log(maxSeatID);

  for (var i = 0; i < rows.length; i++) {
    console.log(i,rows[i]);
    if (rows[i] === 7) {
      myRow = i;
    }
  }

  for (var i = 0; i < cols.length; i++) {
    console.log(i,cols[i]);
    if (cols[i] === 105) {
      myCol = i;
    }
  }

  console.log("My seat ID", 8*myRow + myCol);

}
