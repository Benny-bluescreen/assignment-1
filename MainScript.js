const { clear } = require("console");
const prompt = require("prompt-sync")();
const loginScripts = require("./Scripts/Login.js");
const userScripts = require("./Scripts/User.js");
const passwordScripts = require("./Scripts/Password.js");

function mainMenu() {
  console.log("Huvudmeny");
  console.log("1. Logga in");
  console.log("2. Byta lösenord");
  console.log("3. Lägga till användare");
  console.log("4. Se lösenord");
  console.log("5. Avsluta programmet\n");

  const option = prompt("Välj ett alternativ: ");

  switch (option) {
  case "1":
    clear();
    console.log("Logga in");
    RecieveInputAndCallMethod(new Array("Användarnamn: ", "Lösenord: "), loginScripts.Login);
    break;
  case "2":
    clear();
    console.log("Byt lösenord");
    RecieveInputAndCallMethod(new Array("Användarnamn: ", "Ditt gamla lösenord: ", "Nytt lösenord: "), passwordScripts.ChangePassword);
    break;
  case "3":
    clear();
    console.log("Lägg till användare");
    RecieveInputAndCallMethod(new Array("Användarnamn: ", "Lösenord: "), userScripts.CreateUser);
    break;
  case "4":
    clear();
    console.log("Se lösenorden");
    RecieveInputAndCallMethod(new Array(), passwordScripts.ShowPasswords);
    break;
  case "5":
    console.log("Avslutar programmet...");
    process.exit();
    break;
  default:
    clear();
    console.log("Felaktigt val, försök igen.");
    break;
  }
}

function RecieveInputAndCallMethod(inputPrompts, functionToCall) {
  const inputs = [];

  if (functionToCall instanceof Function
        && Array.isArray(inputPrompts)
        && inputPrompts.length === functionToCall.length) {

    for (let i = 0; i < inputPrompts.length; i++) {
      const input = prompt(inputPrompts[i]);
      inputs.push(input);
    }

    if (inputs.length > 0) {
      console.log("Dina inmatade värden var: ");
      console.log(inputs);
    }
  }
  else {
    console.log("Error: Felaktigt antal argument när du kallar på RecieveInputAndCallMethod funktionen");
    return;
  }

  const result = functionToCall(...inputs);
  if (result) {
    console.log(result);
    console.log("\n");
  }
}

while (true)
  mainMenu();
