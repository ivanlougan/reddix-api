const data = require('../db/data/test-data/index')
const request = require('supertest')
const app = require('../app')
const seed = require('../db/seeds/seed')
const db = require('../db/connection')


beforeEach(() => {
    return seed(data)
  })
  afterAll(() => {
    return db.end()
  })

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
      })

})