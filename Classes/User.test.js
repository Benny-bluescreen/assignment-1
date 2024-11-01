const User = require('./User');

describe('User', () => {
  it('ska skapa en användare med användarnamn och lösenord', () => {
    const user = new User('anvandarnamn', 'losenord');
    expect(user.username).toBe('anvandarnamn');
    expect(user.password).toBe('losenord');
  });

  it('ska ha en korrekt användarnamn', () => {
    const user = new User('testuser', 'testpassword');
    expect(user.username).toBe('testuser');
  });

  it('ska ha en korrekt lösenord', () => {
    const user = new User('testuser', 'testpassword');
    expect(user.password).toBe('testpassword');
  });
});
