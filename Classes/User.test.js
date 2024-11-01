const User = require("./User");
const { CreateUser } = require("../Scripts/User");
const fileScripts = require("../Scripts/ReadWriteToJson.js");
const passwordScripts = require("../Scripts/Password.js");

describe("User", () => {
  it("ska skapa en användare med användarnamn och lösenord", () => {
    const user = new User("anvandarnamn", "losenord");
    expect(user.username).toBe("anvandarnamn");
    expect(user.password).toBe("losenord");
  });

  it("ska ha en korrekt användarnamn", () => {
    const user = new User("testuser", "testpassword");
    expect(user.username).toBe("testuser");
  });

  it("ska ha en korrekt lösenord", () => {
    const user = new User("testuser", "testpassword");
    expect(user.password).toBe("testpassword");
  });
});
jest.mock("../Scripts/ReadWriteToJson.js");
jest.mock("../Scripts/Password.js");

describe("CreateUser", () => {
  beforeEach(() => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([]);
    fileScripts.WriteDataToJsonFile.mockClear();
    passwordScripts.IsPasswordValid.mockClear();
  });

  it("ska returnera ett felmeddelande om användarnamnet eller lösenordet är tomt", () => {
    expect(CreateUser("", "password")).toBe("Användarnamnet eller lösenordet får inte vara tomt");
    expect(CreateUser("username", "")).toBe("Användarnamnet eller lösenordet får inte vara tomt");
  });

  it("ska returnera ett felmeddelande om användarnamnet redan finns", () => {
    fileScripts.FetchDataFromJsonFile.mockReturnValue([{ username: "existingUser", password: "password" }]);
    expect(CreateUser("existingUser", "password")).toBe("Användarnamnet finns redan");
  });

  it("ska returnera ett felmeddelande om lösenordet inte är giltigt", () => {
    passwordScripts.IsPasswordValid.mockReturnValue(false);
    expect(CreateUser("newUser", "invalid")).toBe("Lösenordet behöver vara minst 8 tecken långt och innehålla minst en stor bokstav, en siffra och ett specialtecken");
  });

  it("ska skapa en ny användare om användarnamnet och lösenordet är giltiga", () => {
    passwordScripts.IsPasswordValid.mockReturnValue(true);
    const newUser = CreateUser("newUser", "ValidPassword1!");
    expect(newUser.username).toBe("newUser");
    expect(newUser.password).toBe("ValidPassword1!");
    expect(fileScripts.WriteDataToJsonFile).toHaveBeenCalled();
  });
});
