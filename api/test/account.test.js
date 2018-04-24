const request = require('supertest');
const app = require('../src/app');
const { assert } = require('chai');

describe('NAMESPACE /account', () => {
    let token;

    before(() => request(app)
        .post('/users')
        .send({ email: 'test5@test.fr', username: 'Test5', password: 'testtest' })
        .expect(201, {})
        .then(() => request(app)
            .post('/auth/login')
            .send({ email: 'test5@test.fr', password: 'testtest' })
            .expect(200)
            .then((res) => {
                token = res.body.token;
            })));

    describe('GET /account', () => {
        it('should return a token', () => request(app)
            .get('/account')
            .set('Authorization', token)
            .expect(200)
            .expect((res) => {
                assert.equal(res.body.email, 'test5@test.fr');
                assert.equal(res.body.username, 'Test5');
            }));

        it('should return not found', () => request(app)
            .get('/account')
            .set('Authorization', 'token')
            .expect(404, {}));
    });

    describe('DELETE /account', () => {
        it('should delete the account', () => request(app)
            .delete('/account')
            .set('Authorization', token)
            .expect(200, {}));
    });
});
