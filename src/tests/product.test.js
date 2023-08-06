const app = require('../app');
const request = require('supertest');
const Image = require('../models/Image');
require('../models');

let token;
let id;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: 'testuser@gmail.com',
        password: 'testuser',
    });
    token = res.body.token;
});

test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const product = {
        title: "headline 1",
        description: "Lead 1",
        brand: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam laudantium optio nisi consectetur voluptatum, minus hic aut at ex cum quo ut quasi necessitatibus earum sint nemo tempora commodi non." ,
        price: "Author test",
    }
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
    expect(res.body.id).toBeDefined();
});

test('POST /products/:id/images', async () => {
    const image = await Image.create({
        url: "cualquiercosa.com",
        publicId: "cualquiercosa",
    })
    const res = await request(app)
        .post(`/products/${id}/images`)
        .send([ image.id ])
        .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /products/:id', async () => {
    const res = await request(app)
        .delete(`/Products/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});