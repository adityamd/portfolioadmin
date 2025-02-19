const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')
const router = require('./routes/field')
const { generateUploadURL, generateFetchURL } = require('./config/s3')
const { login, register } = require('./controllers/user')
const path = require('path')
const cors = require('cors'); 
const session = require('express-session')
const redis = require('redis')
const { RedisStore } = require('connect-redis')

dotenv.config('./.env')
const PORT = process.env.PORT || 5000

connectDB()
const app = express()
const redisClient = redis.createClient({
    port: 6379,
    host: 'localhost',
})

redisClient.connect()

const redisStore = new RedisStore({
    client: redisClient,
});

const corsOptions = {
    origin: ['http://localhost:3000', 'https://adityasportfoliowebsite-b867d3ac6934.herokuapp.com', 'https://adityasportfolioadmin-368b40b5c9fe.herokuapp.com/'] // Whitelist the domains you want to allow
};

app.use(session({
    store: redisStore,
    secret: 'mysecret',
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 30,
        resave: false
    }
}))
app.use(express.json({ extended: false }))
app.use(cors(corsOptions));
app.post('/login', login)
// app.post('/register', register)
app.use('/api/field', router)
app.get('/s3/url/:name', async (req, res) => {
    console.log(req.params.name)
    const url = await generateUploadURL(req.params.name);
    res.send(url);
})

app.get('/s3/url/get/:name', async (req, res) => {
    console.log(req.params.name)
    const url = await generateFetchURL(req.params.name);
    res.send(url);
})

app.listen(PORT, () => {
    console.log('Server is running on port 3000')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "./client/build")))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,".","client","build","index.html")))
} else{
    app.get('/', (req,res) => res.send('Please change to production'))
}
