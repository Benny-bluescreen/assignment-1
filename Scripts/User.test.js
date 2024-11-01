const { CreateUser } = require("./User");
const fileScripts = require("./ReadWriteToJson.js");
const passwordScripts = require("./Password.js");
const User = require("../Classes/User.js");

jest.mock("./ReadWriteToJson.js");
jest.mock("./Password.js");
jest.mock("../Classes/User.js");

describe("CreateUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("ska returnera ett felmeddelande om användarnamnet redan finns", () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([{ username: "existingUser" }]);

    const result = CreateUser("existingUser", "Password123!");

    expect(result).toBe("Användarnamnet finns redan");
  });

  it("ska returnera ett felmeddelande om lösenordet är ogiltigt", () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([]);
    passwordScripts.IsPasswordValid.mockReturnValue(false);

    const result = CreateUser("newUser", "short");

    expect(result).toBe("Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken");
  });

  it("ska returnera ett felmeddelande om användarnamnet eller lösenordet är tomt", () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([]);
    passwordScripts.IsPasswordValid.mockReturnValue(false);
    const result = CreateUser("", "");

    expect(result).toBe("Användarnamnet eller lösenordet får inte vara tomt");
  });

  it("ska returnera ett felmeddelande om användarnamnet eller lösenordet är null", () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([]);
    passwordScripts.IsPasswordValid.mockReturnValue(false);
    const result = CreateUser(null, null);

    expect(result).toBe("Användarnamnet eller lösenordet får inte vara tomt");
  });

  it("ska skapa en ny användare om användarnamnet och lösenordet är giltiga", () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([]);
    passwordScripts.IsPasswordValid.mockReturnValue(true);
    const newUser = new User("newUser", "ValidPassword1!");

    const result = CreateUser("newUser", "ValidPassword1!");

    expect(result).toEqual(newUser);
  });
});
