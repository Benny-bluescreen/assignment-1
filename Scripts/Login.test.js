const { Login } = require('./Login.js');
const fileScripts = require('./ReadWriteToJson.js');

jest.mock('./ReadWriteToJson.js');

describe('Login Function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('ska returnera true för giltiga inloggningsuppgifter', () => {
        const mockData = [{ username: 'testUser', password: 'Password1!' }];
        fileScripts.FetchDataFromJsonFile.mockReturnValue(mockData);

        const result = Login('testUser', 'Password1!');

        expect(result).toBe(true);
    });

    it('ska returnera felmeddelande för ogiltigt lösenord', () => {
        const mockData = [{ username: 'testUser', password: 'Password1!' }];
        fileScripts.FetchDataFromJsonFile.mockReturnValue(mockData);

        const result = Login('testUser', 'WrongPassword');

        expect(result).toBe('Kan inte logga in på grund av felaktiga användaruppgifter');
    });

    it('ska returnera felmeddelande för icke-existerande användarnamn', () => {
        const mockData = [{ username: 'testUser', password: 'Password1!' }];
        fileScripts.FetchDataFromJsonFile.mockReturnValue(mockData);

        const result = Login('nonExistentUser', 'Password1!');

        expect(result).toBe('Kan inte logga in på grund av felaktiga användaruppgifter');
    });

    it('ska returnera felmeddelande för null användarnamn och lösenord', () => {
        const mockData = [{ username: 'testUser', password: 'Password1!' }];
        fileScripts.FetchDataFromJsonFile.mockReturnValue(mockData);

        const result = Login(null, null);

        expect(result).toBe('Kan inte logga in på grund av felaktiga användaruppgifter');
    });

    it('ska returnera felmeddelande för tomt användarnamn och lösenord', () => {
        const mockData = [{ username: 'testUser', password: 'Password1!' }];
        fileScripts.FetchDataFromJsonFile.mockReturnValue(mockData);

        const result = Login('', '');

        expect(result).toBe('Kan inte logga in på grund av felaktiga användaruppgifter');
    });
});