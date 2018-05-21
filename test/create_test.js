const assert = require('assert');
const User = require('../src/user');

describe('Creating Records', ()=>{
    it('saves a user', (done)=>{
        const person = new User({ name: 'John' });

        person.save()
            .then(()=>{
            //Check if person is saved successfully.
                assert(!person.isNew);
                done();
            })
    })

});