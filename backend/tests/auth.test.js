const request = require('supertest');
const app = require('../server');

describe('Auth API Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should reject registration with incomplete payloads', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return error for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'WrongPassword123!'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});