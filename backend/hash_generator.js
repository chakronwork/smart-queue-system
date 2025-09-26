// File: smart-queue-system/backend/hash_generator.js
const bcrypt = require('bcrypt');
const password = '123456789';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error hashing password:", err);
        return;
    }
    console.log("Here is your new ADMIN_HASH:");
    console.log(hash);
});