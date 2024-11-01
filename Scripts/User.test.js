const { CreateUser } = require('./User');
const fileScripts = require('./ReadWriteToJson.js');
const passwordScripts = require('./Password.js');
const User = require('../Classes/User.js');

jest.mock('./ReadWriteToJson.js');
jest.mock('./Password.js');
jest.mock('../Classes/User.js');

describe('CreateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ska returnera ett felmeddelande om användarnamnet redan finns', () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([{ username: 'existingUser' }]);

    const result = CreateUser('existingUser', 'Password123!');

    expect(result).toBe('Användarnamnet finns redan');
  });

  it('ska returnera ett felmeddelande om lösenordet är ogiltigt', () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([]);
    passwordScripts.IsPasswordValid.mockReturnValue(false);

    const result = CreateUser('newUser', 'short');

    expect(result).toBe('Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken');
  });

  it('ska skapa en ny användare om användarnamnet inte finns och lösenordet är giltigt', () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([]);
    passwordScripts.IsPasswordValid.mockReturnValue(true);
    const mockUser = { username: 'newUser', password: 'Password123!' };
    User.mockImplementation(() => mockUser);

    const result = CreateUser('newUser', 'Password123!');

    expect(result).toBe(mockUser);
    expect(fileScripts.WriteDataToJsonFile).toHaveBeenCalledWith([mockUser]);
  });
});