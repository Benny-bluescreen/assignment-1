const { WriteDataToJsonFile, FetchDataFromJsonFile } = require('./ReadWriteToJson');
const fs = require('fs');

jest.mock('fs');

describe('WriteDataToJsonFile', () => {
  it('skriver data till UserData.json filen', () => {
    const data = { name: 'Test User', age: 30 };
    WriteDataToJsonFile(data);

    expect(fs.writeFileSync).toHaveBeenCalledWith('UserData/UserData.json', JSON.stringify(data, null, 2));
  });

  it('skriver och prettify JSON data', () => {
    const data = { name: 'Test User', age: 30 };
    WriteDataToJsonFile(data);

    const writtenData = fs.writeFileSync.mock.calls[0][1];
    expect(writtenData).toBe(JSON.stringify(data, null, 2));
  });

  it('kastar ett fel om skrivning misslyckas', () => {
    fs.writeFileSync.mockImplementation(() => {
      throw new Error('Skrivfel');
    });

    expect(() => WriteDataToJsonFile({ name: 'Test User' })).toThrow('Skrivfel');
  });
});

describe('FetchDataFromJsonFile', () => {
  it('hämtar data från UserData.json filen', () => {
    const data = { name: 'Test User', age: 30 };
    fs.readFileSync.mockReturnValue(JSON.stringify(data));

    const result = FetchDataFromJsonFile();

    expect(result).toEqual(data);
    expect(fs.readFileSync).toHaveBeenCalledWith('UserData/UserData.json');
  });

  it('kastar ett fel om läsning misslyckas', () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error('Läsfel');
    });

    expect(() => FetchDataFromJsonFile()).toThrow('Läsfel');
  });

  it('returnerar ett tomt objekt om JSON är ogiltig', () => {
    fs.readFileSync.mockReturnValue('ogiltig JSON');

    expect(() => FetchDataFromJsonFile()).toThrow(SyntaxError);
  });
});