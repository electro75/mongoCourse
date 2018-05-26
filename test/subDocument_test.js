const assert = require('assert');
const User = require('../src/user');

describe('Sub Documents', ()=>{
    it('can create a subdocument', (done)=>{
        const john = new User({
            name: 'John',
            posts: [{ title: 'PostTitle'}]
        });

    })
});