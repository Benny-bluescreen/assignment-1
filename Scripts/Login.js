const fileScripts = require('./ReadWriteToJson.js');

function Login(username, password) {
    let users = fileScripts.FetchDataFromJsonFile();

    for (let user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    
    return "Kan inte logga in på grund av felaktiga användaruppgifter";
}

module.exports = { Login }