const fs = require('fs')

fs.readFile('./input_day2.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }
  noOfValidPasswords(data);
})

function noOfValidPasswords(input) {
  let inputArray = input.split("\n");
  let noOfValidPasswords = 0;
  let noOfValidPasswords2 = 0;

  for (var i = 0; i < inputArray.length; i++) {
    let correctPassword = true;
    let searchLetter = inputArray[i].split(" ")[1];
    if (searchLetter !== undefined) {
      searchLetter = searchLetter.split(":")[0];
      //console.log(searchLetter);

      let minOccurance = inputArray[i].split(" ")[0].split("-")[0];
      let maxOccurance = inputArray[i].split(" ")[0].split("-")[1];

      let pswrd = inputArray[i].split(" ")[2].split("").sort().join("");
      //console.log(pswrd);


      let tooMany = "";
      for (var j = -1; j < maxOccurance; j++) {
        tooMany = tooMany.concat(searchLetter);
      }
      //console.log(tooMany);

      let minOccString = "";
      for (var j = 0; j < minOccurance; j++) {
        minOccString = minOccString.concat(searchLetter);
      }

      if (pswrd.includes(tooMany)) {
        correctPassword = false;
      }

      if (!pswrd.includes(minOccString)) {
        correctPassword = false;
      }

      if (correctPassword) {
        noOfValidPasswords++;
      }

      // Calculate second part


      let tmp = 0;
      pswrdSplit = pswrd.split("");
      let pos1 = parseInt(minOccurance);
      let pos2 = parseInt(maxOccurance);
      let pswrd2 = inputArray[i].split(" ")[2].split("")

      if ( pswrd2[pos1 - 1] === searchLetter ) {
        tmp++;
      }
      if ( pswrd2[pos2 - 1] === searchLetter) {
        tmp++;
      }

      if (tmp === 1) {
        noOfValidPasswords2++;
      }

      console.log(pos1,pos2,searchLetter,pswrd2.join(), tmp);
      console.log(noOfValidPasswords2);

    }
  }

  console.log("First part gives", noOfValidPasswords);
  console.log("Second part gives", noOfValidPasswords2);
}
