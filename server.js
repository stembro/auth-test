const express = require('express')
const basicAuth = require('basic-auth')
const path = require('path')
const app = express()

const authorize = (request, response, next) => {
    const unauthorized = response => {
        response.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return response.sendStatus(401);
    };
 
    const user = basicAuth(request);
 
    if (!user || !user.name || !user.pass) {
        return unauthorized(response);
    };
 
    if (user.name === 'test' && user.pass === 'test') {
        return next();
    } else {
        return unauthorized(response);
    };
};

app.use(express.static(__dirname))

app.get('/logout', authorize, (req, res) => {
    throw Error()
})

app.get('/test', authorize, (req, res) => {
    res.sendStatus(200)
})

app.get('/secret', authorize, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'secret.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening...')
})
