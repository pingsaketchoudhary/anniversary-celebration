const bcrypt = require('bcrypt');

const password = process.argv[2] || 'forever';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) console.error(err);
    else console.log(`Password: ${password}\nHash: ${hash}`);
});
