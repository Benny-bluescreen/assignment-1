const { ChangePassword } = require('./Passwords.js');
const file = require('./ReadWriteToJson.js');

jest.mock('./ReadWriteToJson.js');

describe('ChangePassword', () => {
    beforeEach(() => {
        file.FetchDataFromJsonFile.mockClear();
        file.WriteDataToJsonFile.mockClear();
    });

    it('ska returnera "Användaren finns inte" om användaren inte finns', () => {
        file.FetchDataFromJsonFile.mockReturnValue([]);
        const result = ChangePassword('nonexistentUser', 'oldPassword', 'NewPassword1!');
        expect(result).toBe('Användaren finns inte');
    });

    it('ska returnera "Felaktigt lösenord" om det gamla lösenordet är felaktigt', () => {
        file.FetchDataFromJsonFile.mockReturnValue([{ username: 'user1', password: 'OldPassword1!' }]);
        const result = ChangePassword('user1', 'wrongPassword', 'NewPassword1!');
        expect(result).toBe('Felaktigt lösenord');
    });

    it('ska returnera "Nya lösenordet kan inte vara samma som det gamla" om det nya lösenordet är samma som det gamla', () => {
        file.FetchDataFromJsonFile.mockReturnValue([{ username: 'user1', password: 'OldPassword1!' }]);
        const result = ChangePassword('user1', 'OldPassword1!', 'OldPassword1!');
        expect(result).toBe('Nya lösenordet kan inte vara samma som det gamla');
    });

    it('ska returnera "Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken" om det nya lösenordet är ogiltigt', () => {
        file.FetchDataFromJsonFile.mockReturnValue([{ username: 'user1', password: 'OldPassword1!' }]);
        const result = ChangePassword('user1', 'OldPassword1!', 'short');
        expect(result).toBe('Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken');
    });

    it('ska ändra lösenordet och returnera "Lösenordet har ändrats" om alla villkor är uppfyllda', () => {
        const users = [{ username: 'user1', password: 'OldPassword1!' }];
        file.FetchDataFromJsonFile.mockReturnValue(users);
        const result = ChangePassword('user1', 'OldPassword1!', 'NewPassword1!');
        expect(result).toBe('Lösenordet har ändrats');
        expect(users[0].password).toBe('NewPassword1!');
        expect(file.WriteDataToJsonFile).toHaveBeenCalledWith(users);
    });
});