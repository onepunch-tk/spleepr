describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'sleeprnestapp6@gmail.com',
      password: 'strongerPassword2629!',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jwt = await response.text();
    console.log(jwt);
  });
  test('Create', async () => {
    expect(true).toBeTruthy();
  });
});
