const express = require('express');
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const knex = require('knex')

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Shlok@347',
    database : 'smartbrain'
  }
});

const app= express();

const database = {
    users: [
        {
            id:'123',
            name: 'shlok',
            email: 'shloksharma347@gmail.com',
            password: 'shlok347',
             entries: 0,
            joined: new Date()
        },
          {
                id:'124',
                name: 'shibbu',
                email: 'shloksharma743@gmail.com',
                password: 'shlok743',
                 entries: 0,
                joined: new Date()
            }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'shloksharma347@gmail.com'
        }
    ]
    
}

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => {res.send(database.users);})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`);
})