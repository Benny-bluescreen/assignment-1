class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static FetchDataFromJsonFile() {
        const fs = require('fs');
        const data = fs.readFileSync('UserData/UserData.json');
        return data;
    }

    static WriteDataToJsonFile(data) {
        const fs = require('fs');
        fs.writeFileSync('UserData/UserData.json', JSON.stringify(data, null, 2)); // Skriver och Prettify JSON (Fixar till den så inte allt är på samma rad)
    }

    static CreateUser(username, password) {
        const userData = User.FetchDataFromJsonFile();
        const users = JSON.parse(userData);
        
        for (let user of users) {
            if (user.username === username) {
                return "Användarnamnet finns redan";
            }
        }

        if (!User.IsPasswordValid(password))
            return "Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken";
        
        const newUser = new User(username, password);
        users.push(newUser);
        User.WriteDataToJsonFile(users);

        return newUser;
    }

    static IsPasswordValid(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }
    static Login(username, password) {
        let userData = User.FetchDataFromJsonFile();
        const users = JSON.parse(userData);

        for (let user of users) {
            if (user.username === username && user.password === password) {
                return true;
            }
        }
        
        return "Kan inte logga in på grund av felaktiga användaruppgifter";
    }

    static ChangePassword(username, oldPassword, newPassword) {
        const userData = User.FetchDataFromJsonFile();
        const users = JSON.parse(userData);

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
        else if (!User.IsPasswordValid(newPassword)) {
            return "Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken";
        }
        else {
            user.password = newPassword;
            User.WriteDataToJsonFile(users);
            return "Lösenordet har ändrats";
        }
        
    }

    static ShowPasswords() {
        const userData = User.FetchDataFromJsonFile();
        const users = JSON.parse(userData);

        for (let user of users) {
            console.log(`Användarnamn: ${user.username}, Lösenord: ${user.password}`);
        }
        console.log("Visade alla användare och lösenord \n");
    }
}

module.exports = User;
