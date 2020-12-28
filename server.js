const express = require('express')
const server = express()
var { Mongo } = require('./mongo')



server.set('view engine','ejs')
server.use('/public',express.static('public'))
server.use(logger)

server.get('/',function(req,res){
    res.render('main')
})

server.get('/getcollection/:collection',async function(req,res){
    let collection = await Mongo.db.db('bach').collection(req.params.collection).find({enabled: {$ne :false}}).sort({order:1}).toArray()
    res.json(collection)
})
server.get('/curente/:short', async function(req,res){
    let curent = await Mongo.db.db('bach').collection('curente').findOne({short:req.params.short})
    let autori = await Mongo.db.db('bach').collection('autori').find({curent:req.params.short}).toArray()

    res.render('curente', {curent, autori})
})
function logger(req,res,next){
    console.log(`[`+req.method+'] Request made at ['+new Date().toLocaleTimeString() + '] by [' + req.ip + '] for [' + req.url + ']')
    next()
}

async function start(){
    await Mongo.connectToMongo()
    const port = 8000
    server.listen(8000,() =>{
        console.log('Listening on port ' + port)
    })
}
start()
