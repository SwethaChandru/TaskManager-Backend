var mongoose=require('mongoose');
var express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
 
var app=express();
app.use(cors({}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); 
// mongodb://localhost:27017/TaskManager
mongoose.connect('mongodb+srv://swetha:root@cluster0.t9p2e.mongodb.net/db?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log(err);
      console.log('Error while Connecting!')
    } else {
      console.log('Connected to Mongo DB')
    }
  });

const uroute=require('./Routes/userRoute');
app.use('/user',uroute);

const troute=require('./Routes/taskRoute');
app.use('/task',troute);

// const reqroute=require('./routes/requestRoute');
// app.use('/request',reqroute);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

const PORT= process.env.PORT||3000;

app.get('/',function(req,res){
  res.send("Sample Application Name")
})
app.listen(PORT,()=>{
    console.log('server has been started at port:' +PORT);
})