const express = require('express');//importer toutes les dep avec require et on les mets dans la variable express
const app = express()//creer une instance 
const mongoose=require('mongoose')
const dotenv = require('dotenv')
dotenv.config() //bch ynajem yaqra l fichier .env bl process.env
const MONGODB_URI=process.env.MONGODB_URI //naayet ll les var d'envi l mawjoud fl fichier .env
//const PORT=process.env.PORT || 5000 //ken lqach l port mteena (undefined ) par defaut yhot 5000
const PORT=process.env.PORT
console.log(MONGODB_URI)


const event = require('./routes/events')


app.use(express.json());
app.use('/events',event)


app.get('/',(req,res)=>{
    res.send('hello world!')
})

//connect to database mongo
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('Connected to the database')
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((err)=>{
    console.error('Error connecting to database:',err.message)
})