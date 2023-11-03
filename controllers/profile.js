const handleProfile = (req, res, db) => {
    const { name } = req.params;
    db.select('*').from('users').where({name})
    .then(user => {
        if(user.length) {
            res.json({
                id: user[0].id,
                name: user[0].name,
                entries: user[0].entries,
            });
        } else {
            res.json('Not Found');
        }
    })
    .catch(err => {
        res.status(400).json('error getting user');
    });
}

module.exports = {
    handleProfile
};