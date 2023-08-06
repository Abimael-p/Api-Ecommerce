const app = require('../app');
const request = require('supertest');

let token;
let id;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: 'testuser@gmail.com',
        password: 'testuser',
    });
    token = res.body.token;
})


test('GET /categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories', async () => {
    const category = {
        name: "Tech",
    }
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /categories/:id', async () => {
    const category = {
        name: "Tech updated",
    }
    const res = await request(app)
        .put(`/categories/${id}`)
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
});

test('DELETE /categories/:id', async () => {
    const res = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});