const request = require('supertest');
const app = require('../app');
const { connectDB, closeDB, clearDB } = require('./setup');

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe('Job Routes', () => {
    
    const mockJob = {
        title: "Desenvolvedor Backend Junior",
        company: "Tech Test Ltda",
        location: "Remoto",
        description: "Vaga para teste",
        type: "Full-time"
    };

    describe('POST /api/jobs', () => {
        it('deve criar uma nova vaga', async () => {
            const res = await request(app)
                .post('/api/jobs')
                .send(mockJob);

            expect(res.statusCode).toEqual(201);
            expect(res.body.title).toBe(mockJob.title);
            expect(res.body).toHaveProperty('_id');
        });
    });

    describe('GET /api/jobs', () => {
        it('deve retornar lista de vagas', async () => {
            await request(app).post('/api/jobs').send(mockJob);

            const res = await request(app).get('/api/jobs');
            
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('deve filtrar vagas por busca', async () => {
            await request(app).post('/api/jobs').send({ ...mockJob, title: "React Dev" });
            await request(app).post('/api/jobs').send({ ...mockJob, title: "Java Dev" });

            const res = await request(app).get('/api/jobs?search=React');
            
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].title).toContain('React');
        });
    });

    describe('GET /api/jobs/:id', () => {
        it('deve retornar erro 404 para vaga inexistente', async () => {
            const res = await request(app).get('/api/jobs/999999');
            expect(res.statusCode).toEqual(404);
        });
    });
});