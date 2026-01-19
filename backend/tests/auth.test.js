const request = require('supertest');
const app = require('../server');
const { connectDB, closeDB, clearDB } = require('./setup');

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe('Auth Routes', () => {
    
    describe('POST /api/auth/signup/candidate', () => {
        it('deve criar um novo candidato com sucesso', async () => {
            const res = await request(app)
                .post('/api/auth/signup/candidate')
                .send({
                    name: 'Teste Silva',
                    email: 'teste@email.com',
                    password: 'Password123',
                    phone: '1199999999'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.email).toBe('teste@email.com');
            expect(res.body.user.type).toBe('candidate');
        });

        it('não deve permitir emails duplicados', async () => {
            await request(app).post('/api/auth/signup/candidate').send({
                name: 'User 1', email: 'duplicado@email.com', password: '123456'
            });

            const res = await request(app).post('/api/auth/signup/candidate').send({
                name: 'User 2', email: 'duplicado@email.com', password: '123456'
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toBe('Email já cadastrado');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            await request(app).post('/api/auth/signup/candidate').send({
                name: 'Login User',
                email: 'login@test.com',
                password: 'password123'
            });
        });

        it('deve logar com credenciais corretas', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'login@test.com',
                password: 'password123'
            });

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toBe('Login successful');
        });

        it('deve rejeitar senha incorreta', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'login@test.com',
                password: 'senhaerrada'
            });

            expect(res.statusCode).toEqual(401);
        });
    });
});