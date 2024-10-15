const data = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const endpoints = require('../endpoints.json')


beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    return db.end()
})

describe('Test Endpoints', () => {
    describe('/api/topics', () => {
        test('200 - fetch all the topics from db', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                expect(body.length).toBe(3);
            })
        })
        it("GET 404 Endpoint does not exist", () => {
            return request(app)
            .get('/api/trees')
            .expect(404)
            .then((response) => {
              expect(response.status).toBe(404)
              expect(response.body.msg).toBe('URL Not Found');
            })
        });
    });
    describe('/api', () => {
        test('200 - fetch available endpoints', () => {
            return request(app)
            .get("/api")
            .expect(200)
            .then(({body}) => {
                expect(body).toBeInstanceOf(Object);
                expect(body['GET /api']).toHaveProperty('description');
                expect(body).toEqual(endpoints)
            })
        });
    });
    describe('/api/articles/:article_id', () => {
        test('200 - responds with a single article object when given a valid and present article id', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body }) => {
                    expect(body.article_id).toBe(1);
                    expect(typeof body.title).toBe('string');
                })
        })        
    });
});