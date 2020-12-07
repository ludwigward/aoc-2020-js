const fs = require('fs')

fs.readFile('./input_day7.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }

  // calculateSeatIDs("BFFFBBFRRR");
  // calculateSeatIDs("FFFBBBFRRR");
  // calculateSeatIDs("BBFFBBFRLL");

  calculateBags(data)
  calculateIncludingBags(data)
})

function calculateBags(input) {
  data = input.split("\n");
  // let goldbagsList = [];
  //
  // data.forEach((row, i) => {
  //   if (row.includes("shiny gold") && row.substring(0, 10) !== "shiny gold") {
  //     console.log(row);
  //     goldbagsList.push(row.split("bags")[0]);
  //   }
  //
  // });
  // console.log(goldbagsList);
  // let resultList = [];
  //
  // data.forEach((row, i) => {
  //   if (row.includes("dim tan") && row.substring(0, 7) !== "dim tan") {
  //     console.log(resultList);
  //   }
  //   if (row.includes("posh beige") && row.substring(0, 10) !== "posh beige") {
  //     console.log(row);
  //   }
  // });

  let searchList = ["shiny gold"];
  let resultList = ["shiny gold"];
  let colourList = [];
  while (true) {
    searchList = resultList;
    resultList = [];
    data.forEach((row, i) => {
      searchList.forEach((colour, j) => {
        if (row.includes(colour) && row.substring(0, colour.length) !== colour) {
          //console.log(row);
          resultList.push(row.split("bags")[0]);
          colourList.push(row.split("bags")[0])
        }
      });


    });

    if (resultList.length === 0) {
      break;
    }

  }

  colourList.sort();
  for (var j = 0; j < colourList.length - 1; j++) {
    if (colourList[j] === colourList[j+1]) {
      colourList.splice(j, 1);
      j--;
    }
  }

  console.log(colourList.length);

}

function calculateIncludingBags(input) {
  data = input.split("\n");

  let colourList = [];
  let resultList = ["shiny gold"];
  let baglist = [];

  let noOfBags = 0;

  let path = "shiny gold bags contain 1 pale maroon bag, 3 plaid blue bags, 5 dull tan bags."

  let stillReplacing = true;
  while (stillReplacing) {
    stillReplacing = false;
    data.forEach((row, i) => {
      let rowColour = row.split("contain")[0].split(" bags")[0];

      //console.log("Row colour", rowColour);

      if (path.includes(rowColour) && rowColour !== "shiny gold" && rowColour !== "") {
        let toReplace = row.split("contain")[1];
        toReplace = "(".concat(toReplace).concat(")");
        console.log("To replace", toReplace);
        if (toReplace !== undefined && toReplace !== "( no other bags.)") {
          path = path.replace(rowColour, toReplace);
          stillReplacing = true;
        }
      }


    });

    console.log(path);


  }

  while (path.includes("bags,") || path.includes("bag,") || path.includes("bags.") || path.includes("bag.")) {
    path = path.replace("bags,", "+");
    path = path.replace("bag,", "+");
    path = path.replace("bags.", "");
    path = path.replace("bag.", "");
  }
  console.log(path);
  // path = path.replace(/[^\d.-]/g,'');
  // console.log(path);

  let pathArray = path.split("");
  for (var i = 0; i < pathArray.length; i++) {
    if (isNaN(parseInt(pathArray[i])) && pathArray[i] !== "(" && pathArray[i] !== ")" && pathArray[i] !== "+") {
      // pathArray[]
      pathArray.splice(i,1);
      i--;
    } else if (pathArray[i] === "(") {
      pathArray[i] = "*("
    }
  }
  console.log(pathArray.join().replace(",",""));

  path = pathArray.join();

  while (path.includes(",")) {
    path = path.replace(",", "");
  }

  console.log(path);

  console.log(noOfBags);

}

// 1 ( 1  + 4 ( 5   + 1   + 2   ) ) + 3 ( 4 ( 1   + 3  + 4   + 4   ) + 5 ( 3   + 2 ( 5   + 1   + 2   ) ) + 4 ( 4   + 1 ( 1   + 4 ( 5   + 1   + 2   ) ) + 4 ( 5   + 1   + 2   ) + 3   ) + 2 ( 3 ( 4   + 1 ( 1   + 3   + 4   + 4   ) ) + 3 ( 1   + 3   + 4   + 4   ) + 3 ( 3 ( 5   + 1   + 4   + 2 ( 1   + 4 ( 5   + 1   + 2   ) ) ) + 2 ( 5 ( 1   + 3   + 4   + 4   ) + 3 ( 5   + 1   + 4   + 2 ( 1   + 4 ( 5   + 1   + 2   ) ) ) + 4   + 3   ) ) ) ) + 5 ( 1 ( 1   + 3   + 4   + 4   ) )
//
// //
//
// shiny gold bags contain 1 ( 1 dark cyan bag, 4 ( 5 dark cyan bags, 1 light violet bag, 2 bright coral bags.) bags.) bag, 3 ( 4 ( 1 bright coral bag, 3 light magenta bags, 4 muted teal bags, 4 light violet bags.) bags, 5 ( 3 muted gold bags, 2 ( 5 dark cyan bags, 1 light violet bag, 2 bright coral bags.) bags.) bags, 4 ( 4 posh plum bags, 1 ( 1 dark cyan bag, 4 ( 5 dark cyan bags, 1 light violet bag, 2 bright coral bags.) bags.) bag, 4 ( 5 dark cyan bags, 1 light violet bag, 2 bright coral bags.) bags, 3 posh black bags.) bags, 2 ( 3 ( 4 muted tomato bags, 1 ( 1 bright coral bag, 3 light magenta bags, 4 muted teal bags, 4 light violet bags.) bag.) bags, 3 ( 1 bright coral bag, 3 light magenta bags, 4 muted teal bags, 4 light violet bags.) bags, 3 ( 3 ( 5 muted gold bags, 1 bright coral bag, 4 muted tomato bags, 2 ( 1 dark cyan bag, 4 ( 5 dark cyan bags, 1 light violet bag, 2 bright coral bags.) bags.) bags.) bags, 2 ( 5 ( 1 bright coral bag, 3 light magenta bags, 4 muted teal bags, 4 light violet bags.) bags, 3 ( 5 muted gold bags, 1 bright coral bag, 4 muted tomato bags, 2 ( 1 dark cyan bag, 4 ( 5 dark cyan bags, 1 light violet bag, 2 bright coral bags.) bags.) bags.) bags, 4 light magenta bags, 3 dark cyan bags.) bags.) bags.) bags.) bags, 5 ( 1 ( 1 bright coral bag, 3 light magenta bags, 4 muted teal bags, 4 light violet bags.) bag.) bags.
