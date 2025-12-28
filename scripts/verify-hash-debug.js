const bcrypt = require('bcrypt');

const password = 'forever';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Generated Hash: ${hash}`);

    bcrypt.compare(password, hash, function (err, result) {
        console.log(`Verification Result for '${password}': ${result}`);
    });
});
