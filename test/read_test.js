const assert = require('assert');
const User = require('../src/user');

describe('Reading Users from database', ()=>{
    let john;

    beforeEach((done)=>{
        john = new User({name: 'John'});

        john.save()
            .then(()=>{ done(); })
    })

    it('Finds all Users with name of John', (done)=>{
        User.find({name: 'John'})
            .then((users)=>{
                assert(users[0]._id.toString() === john._id.toString());
                done();
            })
    })
})