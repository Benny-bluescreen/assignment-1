const file = require('./ReadWriteToJson.js');
const passwordScripts = require('./Passwords.js');

function ShowPasswords() {
    const users = file.FetchDataFromJsonFile();

    for (let user of users) {
        console.log(`Användarnamn: ${user.username}, Lösenord: ${user.password}`);
    }
    console.log("Visade alla användare och lösenord \n");
}

function ChangePassword(username, oldPassword, newPassword) {
    const users = file.FetchDataFromJsonFile();

    let user = users.find(user => user.username === username);
    
    if (!user) {
        return "Användaren finns inte";
    }
    else if (user.password != oldPassword) {
        return "Felaktigt lösenord";
    }
    else if (user.password === newPassword) {
        return "Nya lösenordet kan inte vara samma som det gamla";
    }
    else if (!IsPasswordValid(newPassword)) {
        return "Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken";
    }
    else {
        user.password = newPassword;
        file.WriteDataToJsonFile(users);
        return "Lösenordet har ändrats";
    }   
}

function IsPasswordValid(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

module.exports = {ShowPasswords, ChangePassword, IsPasswordValid}
