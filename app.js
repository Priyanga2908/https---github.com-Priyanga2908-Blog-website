const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogroutes')


const app = express()
//register view engine
app.set('view engine','ejs')

//connect mongodb
const url = "mongodb://0.0.0.0/intern2"
mongoose.connect(url)
  .then((result) => {
    app.listen(3000)
    console.log('Connected to MongoDB');
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


//middleware-static
app.use(express.static('public'))//the particular folder file can be accessed by browser
//if we use styles that be linked in any ejs , it will be reflected
//listen for req
app.use(express.urlencoded({extended : true}))//to accept form data 
app.use(morgan('dev'))

app.get('/',(req,res) => {
  res.redirect('/blogs')
})

app.get('/about',(req,res) => {
  //res.sendFile('./views/about.html',{root : __dirname});
  res.render('about',{title : 'about'})//since we used ejs we can mention the file name
})  


//blog routes
app.use('/blogs',blogRoutes)

app.use((req,res)=> {
    res.status(404).render('404',{title : '404'})
})



//this function can be used for any url if there is not match made from the above function
//it have be made at last
//we have to manually set 404 as status since its not aware of it


//this prgm is called handler

////redirect
//app.get('/about-us',(req,res) => {
 //   res.redirect('/about');
//})