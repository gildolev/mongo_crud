const fs = require('fs');
const { usersCollection } = require('../db');

async function add(user) {
    const{email,name,password}=user;
    const query = { email };
    const updateDoc={$setOnInsert:{email,name,password}}
    const options={ upsert: true };
    const result = await usersCollection().updateOne(query, updateDoc, options)
}

async function getUser(email) {
    const query = { email };
    const user = await usersCollection().findOne(query);
    return user;

}

async function deleteUser(email) {
    const query = { email };
    const result = await usersCollection().deleteOne(query);
    console.log('deleted');
}

async function update(emailToFind, user) {
  const{email,name,password}=user;
    const filter = { emailToFind };
    const options = { upsert: false };
    const updateDoc = {
        $set: {
            email,
            name,
            password
        },
    };
    const result = await usersCollection().updateOne(filter, updateDoc, options);
    console.log('updated', result);

}

async function getAll() {
    return await usersCollection().find({}).toArray();
}

module.exports = {
    update,
    getAll,
    getUser,
    deleteUser,
    add
}