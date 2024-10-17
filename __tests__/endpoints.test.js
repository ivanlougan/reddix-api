const data = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const endpoints = require('../endpoints.json')
require('jest-sorted')


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
        });
        test('400 - responds with an error message when given invalid article_id', () => {
            return request(app)
            .get("/api/articles/smth_not_valid")
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toBe('Invalid id type');
            })
        })   
        test('404 - responds with an error message when given article_id that does not exist', () => {
            return request(app)
            .get("/api/articles/888")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe('Not Found');
            })
        })       
    });
    describe('/api/articles', () => {
        test('200 - responds with articles array', () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                body.forEach((article) => {
                    expect(typeof article.article_id).toBe('number');
                    expect(typeof article.title).toBe('string');
                    expect(typeof article.topic).toBe('string');
                    expect(typeof article.created_at).toBe('string');
                    expect(typeof article.author).toBe('string');
                    expect(typeof article.votes).toBe('number');
                    expect(typeof article.article_img_url).toBe('string');
                    expect(typeof article.comment_count).toBe('number');

                    expect(article).not.toHaveProperty("body");
                })
            })
        });
        test('200 - responds with articles array sorted by date', () => {
            return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeSortedBy("created_at", {descending: true});
              });
        });
    });
});