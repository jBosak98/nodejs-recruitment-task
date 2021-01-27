const authTest = require('./integration/auth.test');
const moviesTest = require('./integration/movies.test');


describe('Integration tests', () => {
  describe('Authorization API', authTest.bind(this));
  describe('Movies API', moviesTest.bind(this));
})