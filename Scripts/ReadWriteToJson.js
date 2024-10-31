const fs = require('fs');

function FetchDataFromJsonFile() {
    const userData = fs.readFileSync('UserData/UserData.json');
    const users = JSON.parse(userData);
    return users;
}

function WriteDataToJsonFile(data) {
    fs.writeFileSync('UserData/UserData.json', JSON.stringify(data, null, 2)); // Skriver och Prettify JSON (Fixar till den så inte allt är på samma rad)
}

module.exports = { FetchDataFromJsonFile, WriteDataToJsonFile }