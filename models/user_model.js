
const _ = require('underscore');
const db = require('../modules/db');
const uuidV4 = require('uuid').v4;


let getById = (id) => {
    return db('users').where({id}).first();
}


let createUser = (tgId, login, name) => {

    const data = {
        id: uuidV4(),
        created_date: new Date(),
        tg_id: tgId,
        login,
        name,
    };

    return db('users').insert(data).then(result => {
        return data;
    });

}

const updateUsername = (id, username) => {
    return db('users').where({id}).update({username});
};

const updateEmail = (id, email) => {
    return db('users').where({id}).update({email});
};



module.exports = {
    createUser,
    updateUsername,
    updateEmail,
    getById
};
