const express = require('express')
const basicAuth = require('express-basic-auth')
const path = require('path')

const app = express()

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/logout', (req, res) => {
    res.send(401)
})

app.get('/test', basicAuth({users: { 'test': 'test' }, challenge: true,}), (req, res) => {
    res.send('success')
})

app.listen(3000, () => {
    console.log('listening...')
})
