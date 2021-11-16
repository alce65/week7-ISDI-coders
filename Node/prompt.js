import inquirer from "inquirer";
console.log("Learning NodeJS");
inquirer
  .prompt([
    { name: "gretings", message: "Como te llamas?", type: "input" },
    { name: "age", message: "Que edad tienes?", type: "number" },
  ])
  .then((answer) => {
    console.log(`Hola ${answer.gretings}`);
    console.log(answer);
  });
