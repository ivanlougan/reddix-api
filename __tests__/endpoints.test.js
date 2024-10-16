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
        it(" 404 - endpoint does not exist", () => {
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
                expect(body.message).toBe('Bad Request');
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
    describe('/api/articles/:article_id/comments', () => {
        test('200 - responds with comments array related to the particular article', () => {
            return request(app)
            .get("/api/articles/3/comments")
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeInstanceOf(Array);

                body.forEach((comment) => {
                    expect(typeof comment.article_id).toBe('number');
                    expect(typeof comment.votes).toBe('number');
                    expect(typeof comment.created_at).toBe('string');
                    expect(typeof comment.author).toBe('string');
                });
            });
        });
        test('400 - responds with an error message when given invalid article_id', () => {
            return request(app)
            .get("/api/articles/smth_not_valid/comments")
            .expect(400)
            .then(({ body }) => {
                expect(body.message).toBe('Bad Request');
            });
        }); 
        test('404 - responds with an error message when given article_id that does not exist', () => {
            return request(app)
            .get("/api/articles/888/comments")
            .expect(404)
            .then(({ body }) => {
                expect(body.message).toBe('Not Found');
            });
        }); 
    });

    //POST
    describe('/api/articles/:article_id/comments', () => {
        test("201 - should add a comment to the relevant article_id", () => {
            const newComment = {
              body: "The Worlds First Photo of Quantum Entanglement Could Disprove Einsteins Theory",
              article_id: 1,
              author: "butter_bridge",
              votes: 0,
              created_at: new Date(),
            };
            return request(app)
              .post("/api/articles/1/comments")
              .send(newComment)
              .expect(201)
              .then(({ body }) => {
                const comment = body.comment;
                expect(typeof comment.comment_id).toBe("number");
                expect(typeof comment.body).toBe("string");
                expect(comment.article_id).toBe(1);
                expect(typeof comment.author).toBe("string");
                expect(comment.votes).toBe(0);
                expect(typeof comment.created_at).toBe("string");
              });
          });
      
          test("POST: 400 - should return with appropriate error when comment is blank", () => {
            const newComment = {
              body: null,
              article_id: 1,
              author: "butter_bridge",
              votes: 0,
              created_at: new Date(),
            };
            return request(app)
              .post("/api/articles/1/comments")
              .send(newComment)
              .expect(400)
              .then((response) => {
                expect(response.body.msg).toBe("Body cannot be blank");
              });
          });
    }); 

    // PATCH
    describe("/api/articles/:article_id", () => {
        test("200 - increases votes on an article depending on the amount of votes defined in newVote and responds with the updated article", () => {
          const newVote = 5;
          const updateArticle = {
            inc_votes: newVote,
          };
          return request(app)
            .patch("/api/articles/1")
            .send(updateArticle)
            .expect(200)
            .then(({ body }) => {
              const article = body.article;
              expect(article).toHaveProperty("article_id");
              expect(article).toHaveProperty("title");
              expect(article).toHaveProperty("topic");
              expect(article).toHaveProperty("author");
              expect(article).toHaveProperty("body");
              expect(article).toHaveProperty("created_at");
              expect(article).toHaveProperty("votes");
              expect(article).toHaveProperty("article_img_url");
              expect(article.votes).toEqual(105);
            });
        });
        test("200 - decreases votes on an article depending on the amount of votes defined in newVote and responds with the updated article", () => {
          const newVote = -100;
          const updateArticle = {
            inc_votes: newVote,
          };
          return request(app)
            .patch("/api/articles/1")
            .send(updateArticle)
            .expect(200)
            .then(({ body }) => {
              const article = body.article;
              expect(article.votes).toEqual(0);
            });
        });
        test("400 - responds with the relevant error message if incorrect data type", () => {
          const newVote = "smth_not_valid";
          const updateArticle = {
            inc_votes: newVote,
          };
          return request(app)
            .patch("/api/articles/1")
            .send(updateArticle)
            .expect(400)
            .then((response) => {
              expect(response.body.message).toBe("Bad Request");
            });
        });
    
        test("400 - responds with the relevant error message if body is empty", () => {
          const updateArticle = {};
          return request(app)
            .patch("/api/articles/1")
            .send(updateArticle)
            .expect(400)
            .then((response) => {
              expect(response.body.msg).toBe("Body cannot be blank");
            });
        });
    });

    // DELETE
    describe("/api/comments/:comment_id", () => {
        test("204 - deletes comment by comment id", () => {
          return request(app)
            .delete("/api/comments/6")
            .expect(204)
        });
        test("400: Responds with a bad request message if comment_id is invalid", () => {
            return request(app)
            .delete("/api/comments/smth_not_valid")
            .expect(400)
            .then((response) => {
                expect(response.body.message).toBe("Bad Request")
            })
        })
        test("404: Responds with a not found message if comment_id is valid but the comment associated with it does not exist", () => {
            return request(app)
            .delete("/api/comments/888")
            .expect(404)
            .then((response) => {
                expect(response.body.message).toBe("Not Found");
            })
        })
    });
    describe('/api/users', () => {
        test('200 - fetch all the users from db', () => {
            return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
                body.rows.forEach((user) => {
                    expect(typeof user.username).toBe('string');
                    expect(typeof user.name).toBe('string');
                    expect(typeof user.avatar_url).toBe('string');
                })
            })
        })       
    });
});