describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'sleeprnestapp6@gmail.com',
      password: 'strongerPassword2629!',
    };
    await fetch('http://auth:3001', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  });
  test('Create', async () => {});
});
