const assert = require('assert');
const User = require('../src/user');

describe('Updating Records', ()=>{
    let john;

    beforeEach((done)=>{
        john = new User({name: 'John'});
        john.save()
            .then(()=> done())

    });

    function assertName(operation, done) {
        operation.then(()=> User.find({}))
                .then((users)=>{
                    assert(users.length === 1);
                    assert(users[0].name === 'Joe');
                    done();
            });
    }

    it('instance type using set and save', (done)=>{
        john.set('name', 'Joe');
        
        assertName(john.save(), done)
    });

    it('A model instance can update', (done)=>{
        assertName(john.update({ name: 'Joe'}), done)
    })

    it('A model can update', (done)=>{
        assertName(
            User.update({name: 'John'}, {name: 'Joe'}),
            done
        );

    });

    it('A model class can update one record', (done)=>{
        assertName(
            User.findOneAndUpdate({name: 'John'}, { name: 'Joe' }),
            done
        );
        
    });

    it('A model class can find a record with _id and update', (done)=>{
        assertName(
            User.findByIdAndUpdate(john._id, { name:'Joe' }),
            done
        );
    });
});

