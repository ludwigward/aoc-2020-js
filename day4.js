const fs = require('fs')

fs.readFile('./input_day4.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }

  calculateValidPassports(data);
})

function calculateValidPassports(input) {
  let data = input.split("\n");
  // console.log(passports.length);
  // console.log(passports);

  let passportNo = 0;
  let validPassorts = 0;
  let reallyValidPassports = 0;
  let tmpData = "";

  input.split("\n").forEach((row, i) => {
    if (row === "") {
      console.log();
      console.log(passportNo);
      let data = tmpData.split(" ");
      console.log(data.length);
      console.log(tmpData);
      console.log(data);



      if (tmpData.includes("byr") && tmpData.includes("iyr") && tmpData.includes("eyr") && tmpData.includes("hgt") && tmpData.includes("hcl") && tmpData.includes("ecl") && tmpData.includes("pid") ) {
        let validated = [0,0,0,0,0,0,0];
        data.sort().forEach((dataPoint, j) => {
          if (dataPoint !== "") {
            let key = dataPoint.split(":")[0];
            let value = dataPoint.split(":")[1];

            //Check birthyear
            if (key === "byr") {
              if (parseInt(value) >= 1920 && parseInt(value) <= 2002) {
                validated[0] = 1;
              }
            }

            // Check issue year
            if (key === "iyr") {
              if (parseInt(value) >= 2010 && parseInt(value) <= 2020) {
                validated[1] = 1;
              }
            }

            // Check expire year
            if (key === "eyr") {
              if (parseInt(value) >= 2020 && parseInt(value) <= 2030) {
                validated[2] = 1;
              }
            }

            // Check height
            if (key === "hgt") {
              if (value.includes("cm")) {
                if ( parseInt(value.replace("cm", "")) >= 150 && parseInt(value.replace("cm", "")) <= 193 ) {
                  validated[3] = 1;
                }
              } else if (value.includes("in")) {
                if ( parseInt(value.replace("in", "")) >= 59 && parseInt(value.replace("in", "")) <= 76 ) {
                  validated[3] = 1;
                }
              }
            }

            // Check hair colour
            if (key === "hcl") {
              if (value[0] === "#" && value.length === 7) {
                validated[4] = 1;
              }
            }

            // Check eye colour
            if (key === "ecl") {
              if (value === "amb" || value === "blu" || value ===  "brn" || value === "gry" || value === "grn" || value === "hzl" || value === "oth") {
                validated[5] = 1;
              }
            }

            // Check passport id
            if (key === "pid") {
              if (value.length === 9) {
                validated[6] = 1;
              }
            }
          }
        });


        validPassorts++;
        console.log("VALID");
        console.log(validated);

        let sum = 0;
        validated.forEach((item, l) => {
          sum += item;
        });
        if (sum === 7) {
          reallyValidPassports++;
        }

      }


      // Go to next
      passportNo++;
      tmpData = "";
    } else {
      if (row !== "") {
        tmpData = tmpData.concat(row);
        tmpData = tmpData.concat(" ");
      }
    }


  });
  console.log("Valid passports:", validPassorts);
  console.log("Really valid passports:", reallyValidPassports);
}
