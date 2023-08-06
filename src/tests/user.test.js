const app = require('../app');
const request = require('supertest');

let id;
let token;

test('POST /users', async () => {
    const user = {
        firstName: "Braian",
        lastName: "Gil",
        email: 'braian@gmail.com',
        password: 'braian1234',
        phone: '123456789'
    }
    const res = await request(app)
        .post('/users')
        .send(user)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.password).not.toBe(user.password);
});

test('POST /users/login', async () => {
    const body = {
        email: 'braian@gmail.com',
        password: 'braian1234',
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /users/:id', async () => {
    const user = {
        firstName: "Braian updated",
    }
    const res = await request(app)
        .put(`/users/${id}`)
        .send(user)
        .set('Authorization', `Bearer ${token}`);;
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test('POST /users/login credenciales incorrectas', async () => {
    const body = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto1234',
    }
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});