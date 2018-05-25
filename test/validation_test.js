const assert = require('assert');
const User = require('../src/user');

describe('validating records', ()=>{

    it('requires user to have a name', ()=>{
        const user = new User({name: undefined});       //Name is explicitly set to undefined to test the validation.
        const validationRes = user.validateSync();
        const { message } =  validationRes.errors.name;  

        assert(message === 'Name is required.');
    });

    it('requires the name to be longer than 2 characters', ()=>{
        const user = new User({name: 'Al'});            //Name is explicitly set to Al to test the validator function.
        const validationRes = user.validateSync();
        const { message } = validationRes.errors.name;

        assert( message === 'Name must be longer than 2 characters' );
    })
});