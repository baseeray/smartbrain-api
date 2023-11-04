const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex(
    {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            port: 5432, 
            password : 'test', 
            database : 'smart-brain'
        }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.json("success");
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

app.put('/image', (req, res) => { image.handleImage(req, res, db)});

app.post('/imageUrl', image.handleAPIcall);

//might need in the future DO NOT DELETE
app.get('/profile/:name', (req, res) => { profile.handleProfile(req, res, db)});

app.listen(process.env.PORT || 1234, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});