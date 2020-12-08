const fs = require('fs')

fs.readFile('./input_day8.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return err;
  }

  //console.log(calculateAccumulator(data));
  fixCode(data);
})

function fixCode(input) {
  let instructions = input.split("\n");
  console.log("Instructions", instructions.length);
  //instructions.splice(instructions.length - 1, 1);
  let origInstructions = instructions;
  //instructions[instructions.length-1] = "end"
  console.log(instructions[instructions.length-1]);

  let nopIndices = [];
  let jmpIndices = [];

  for (var i = 0; i < instructions.length; i++) {
    if (instructions[i].split(" ")[0] === "nop") {
        nopIndices.push(i);
    } else if (instructions[i].split(" ")[0] === "jmp") {
      jmpIndices.push(i);
    }
  }

  console.log("NOPs", nopIndices.length);
  console.log("JMPs", jmpIndices.length);
  console.log(nopIndices);


  let nop = 0;
  let jmp = 0;
  let [success, acc, max] = calculateAccumulator(instructions);
  console.log(success, acc, max);
  let tmp = "";

  for (var i = 0; i < nopIndices.length; i++) {
    //instructions = origInstructions;
    tmp = instructions[nopIndices[i]];
    instructions[nopIndices[i]] = instructions[nopIndices[i]].replace("nop", "jmp");
    [success, acc, max] = calculateAccumulator(instructions);
    console.log(success, acc, max);
    instructions[nopIndices[i]] = tmp;
  }

  for (var i = 0; i < jmpIndices.length; i++) {
    //instructions = origInstructions;
    tmp = instructions[jmpIndices[i]];
    instructions[jmpIndices[i]] = instructions[jmpIndices[i]].replace("jmp", "nop");
    [success, acc, max] = calculateAccumulator(instructions);
    console.log(success, acc, max);
    instructions[jmpIndices[i]] = tmp;
  }
}

function calculateAccumulator(instructions) {
  let acc = 0;
  let success = false;
  //instructions[instructions.length-1] = "end";

  // setup array to track instruction runs
  let instrRun = [];
  for (var i = 0; i < instructions.length; i++) {
    instrRun[i] = 0;
  }
  let max = 0;

  let step = 0;
  i = 0;
  while (instrRun[i] === 0) {
    max = Math.max(i,max);
    //console.log(instructions[i]);
    if (instructions[i] === "" || instructions[i] === undefined) {
      console.log("END");
      success = true;
      break;
    }

    instrRun[i] = 1;
    let action = instructions[i].split(" ")[0];
    let value = instructions[i].split(" ")[1];
    if (value.includes("+")) {
      step = parseInt(value.split("+")[1]);
    } else {
      step = (-1)*parseInt(value.split("-")[1]);
    }

    //console.log(i, action, step);

    if (action === "acc") {
      acc += step;
    } else if (action === "jmp") {
      i += step;
    }

    if (action !== "jmp") {
      i++;
    }

    if (i >= instructions.length) {
      console.log("overflow");
      i = 0;
    }
  }

  //console.log(i, instructions[i]);
  //console.log("Acc:", acc, "Sucecss:", success);

  return [success, acc, max];
}
