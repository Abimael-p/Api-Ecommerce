const app = require('../app');
const request = require('supertest');
const path = require('path')


const imagePrev = path.join(__dirname,"../img/board-ge626a5c2b_1280.jpg");

let token;
let id;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: 'testuser@gmail.com',
        password: 'testuser',
    });
    token = res.body.token;
});

test('Get /product_images', async () => {
    const res = await request(app)
    .get("/product_images")
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('Post /product_images', async () => {
    const res = await request(app)
      .post('/product_images/')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', imagePrev);
      id = res.body.id;
    expect(res.status).toBe(201);
  });
  
  

test('DELETE /product_images/:id', async () => {
    const res = await request(app)
        .delete(`/product_images/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});