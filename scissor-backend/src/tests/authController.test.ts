import request from 'supertest';
import app from '../app'; 

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
