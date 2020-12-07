const fs = require('fs')

fs.readFile('./input_day7.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }

  calculateBags(data)
  calculateIncludingBags(data)
})

function calculateBags(input) {
  data = input.split("\n");

  let searchList = ["shiny gold"];
  let resultList = ["shiny gold"];
  let colourList = [];
  while (true) {
    searchList = resultList;
    resultList = [];
    data.forEach((row, i) => {
      searchList.forEach((colour, j) => {
        if (row.includes(colour) && row.substring(0, colour.length) !== colour) {
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

      if (path.includes(rowColour) && rowColour !== "shiny gold" && rowColour !== "") {
        let toReplace = row.split("contain")[1];
        toReplace = "(".concat(toReplace).concat(")");
        console.log(path);
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

  let pathArray = path.split("");
  for (var i = 0; i < pathArray.length; i++) {
    if (isNaN(parseInt(pathArray[i])) && pathArray[i] !== "(" && pathArray[i] !== ")" && pathArray[i] !== "+") {
      // pathArray[]
      pathArray.splice(i,1);
      i--;
    } else if (pathArray[i] === "(") {
      pathArray[i] = "*("
    } else if (pathArray[i] === ")") {
      pathArray[i] = "+1)";
    }
  }

  path = pathArray.join();

  while (path.includes(",")) {
    path = path.replace(",", "");
  }

  console.log(path);
}
