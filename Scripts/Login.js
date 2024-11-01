const fileScripts = require('./ReadWriteToJson.js');

function Login(username, password) {
  const users = fileScripts.FetchDataFromJsonFile();

  for (const user of users) {
      if (user.username === username && user.password === password) {
      return true;
    }
  }

  return "Kan inte logga in på grund av felaktiga användaruppgifter";
}

module.exports = { Login };
