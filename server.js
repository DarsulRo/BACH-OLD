const express = require('express')
const server = express()
var { Mongo } = require('./mongo')



server.set('view engine','ejs')
server.use('/public',express.static('public'))


server.get('/',function(req,res){
    res.render('main')
})

server.get('/getallcurente',async function(req,res){
    let curente = await Mongo.db.db('bach').collection('curente').find({}).toArray()
    res.json(curente)
})


async function start(){
    await Mongo.connectToMongo()
    const port = 8000
    server.listen(8000,() =>{
        console.log('Listening on port ' + port)
    })
}
start()
