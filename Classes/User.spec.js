const User = require('./User');
const fs = require('fs');

jest.mock('fs');

describe('User Class', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('CreateUser ska skapa en ny användare om användarnamnet är unikt och lösenordet är giltigt', () => {
        const mockData = JSON.stringify([]);
        fs.readFileSync.mockReturnValue(mockData);

        const newUser = User.CreateUser('testUser', 'Password1!');

        expect(newUser.username).toBe('testUser');
        expect(newUser.password).toBe('Password1!');
        expect(fs.writeFileSync).toHaveBeenCalled();
    });

    test('CreateUser ska returnera fel om användarnamnet redan finns', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.CreateUser('testUser', 'Password1!');

        expect(result).toBe('Användarnamnet finns redan');
    });

    test('CreateUser ska returnera fel om lösenordet är ogiltigt', () => {
        const mockData = JSON.stringify([]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.CreateUser('testUser', 'pass');

        expect(result).toBe('Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken');
    });

    test('Login ska returnera true för giltiga inloggningsuppgifter', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.Login('testUser', 'Password1!');

        expect(result).toBe(true);
    });

    test('Login ska returnera fel för ogiltiga inloggningsuppgifter', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.Login('testUser', 'WrongPassword');

        expect(result).toBe('Kan inte logga in på grund av felaktiga användaruppgifter');
    });

    test('Login ska returnera fel för null inloggningsuppgifter', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.Login(null, null);

        expect(result).toBe('Kan inte logga in på grund av felaktiga användaruppgifter');
    });

    test('Login ska returnera fel för tomma inloggningsuppgifter', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.Login(null, null);

        expect(result).toBe('Kan inte logga in på grund av felaktiga användaruppgifter');
    });

    test('ChangePassword ska ändra lösenordet om det gamla lösenordet är korrekt och det nya lösenordet är giltigt', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.ChangePassword('testUser', 'Password1!', 'NewPassword1!');

        expect(result).toBe('Lösenordet har ändrats');
        expect(fs.writeFileSync).toHaveBeenCalled();
    });

    test('ChangePassword ska returnera fel om användaren inte finns', () => {
        const mockData = JSON.stringify([]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.ChangePassword('testUser', 'Password1!', 'NewPassword1!');

        expect(result).toBe('Användaren finns inte');
    });

    test('ChangePassword ska returnera fel om det gamla lösenordet är felaktigt', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.ChangePassword('testUser', 'WrongPassword', 'NewPassword1!');

        expect(result).toBe('Felaktigt lösenord');
    });

    test('ChangePassword ska returnera fel om det nya lösenordet är samma som det gamla lösenordet', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.ChangePassword('testUser', 'Password1!', 'Password1!');

        expect(result).toBe('Nya lösenordet kan inte vara samma som det gamla');
    });

    test('ChangePassword ska returnera fel om det nya lösenordet är ogiltigt', () => {
        const mockData = JSON.stringify([{ username: 'testUser', password: 'Password1!' }]);
        fs.readFileSync.mockReturnValue(mockData);

        const result = User.ChangePassword('testUser', 'Password1!', 'short');

        expect(result).toBe('Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken');
    });
});