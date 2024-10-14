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
})