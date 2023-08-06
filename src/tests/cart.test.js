const app = require('../app');
const request = require('supertest');
const Product = require('../models/Product');
require('../models');

let token;
let id;

beforeAll(async() => {
    const res = await request(app).post('/users/login').send({
        email: 'testuser@gmail.com',
        password: 'testuser'
    });
    token = res.body.token;
});

test('GET /cart', async () => {
    const res = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart', async () => {
    const product = await Product.create({
        title: "headline 1",
        description: "Lead 1",
        brand: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam laudantium optio nisi consectetur voluptatum, minus hic aut at ex cum quo ut quasi necessitatibus earum sint nemo tempora commodi non." ,
        price: "Author test",
    });
    const cartProduct = {
        ProductId: Product.id,
        quantity: 5,
    }
    const res = await request(app)
        .post('/cart')
        .send(cartProduct)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    await product.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(cartProduct.quantity);
});

test('PUT /cart/:id', async () => {
    const body = {
        quantity: 4,
    }
    const res = await request(app)
        .put(`/cart/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);
});

test('DELETE /cart/:id', async () => {
    const res = await request(app)
        .delete(`/cart/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});