const app = require('../app');
const request = require('supertest');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
require('../models');

let token;

beforeAll(async() => {
    const res = await request(app).post('/users/login').send({
        email: 'testuser@gmail.com',
        password: 'testuser'
    });
    token = res.body.token;
});

test('GET /purchases', async () => {
    const res = await request(app)
        .get('/purchases')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /purchases', async () => {
    const product = await Product.create({
        title: "headline 1",
        description: "Lead 1",
        brand: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam laudantium optio nisi consectetur voluptatum, minus hic aut at ex cum quo ut quasi necessitatibus earum sint nemo tempora commodi non." ,
        price: "Author test",
    });
    const purchaseProduct = {
        ProductId: product.id,
        quantity: 5,
    }
    const res = await request(app)
        .post('/purchases')
        .send(purchaseProduct)
        .set('Authorization', `Bearer ${token}`);
    await product.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(purchaseProduct.quantity);
    
    const purchaseId = res.body.id;
    await Purchase.destroy({ where: { id: purchaseId } });
    const deletedPurchase = await Purchase.findByPk(purchaseId);
    expect(deletedPurchase).toBeNull();
});
