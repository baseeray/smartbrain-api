const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email.toLowerCase()
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name.toLowerCase(),
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => {
                res.status(400).json('unable to register');
            })
        })
        .then(trx.commit)
        .catch((err) => {
            res.json("System has encountered an error");
            trx.rollback;
        })
    });
}


module.exports = {
    handleRegister
};