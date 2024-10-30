const fileScripts = require('./ReadWriteToJson.js');
const passwordScripts = require('./Passwords.js');
const User = require('../Classes/User.js');

function CreateUser(username, password) {
    const users = fileScripts.FetchDataFromJsonFile();
    
    for (let user of users) {
        if (user.username === username) {
            return "Användarnamnet finns redan";
        }
    }

    if (!passwordScripts.IsPasswordValid(password))
        return "Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken";
    
    const newUser = new User(username, password);
    users.push(newUser);
    fileScripts.WriteDataToJsonFile(users);

    return newUser;
}

module.exports = { CreateUser }