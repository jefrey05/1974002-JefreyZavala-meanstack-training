var app = express();
var admin = express();
app.get('/',function(req,res){
    console.log(req.protocol);
    res.send('page');
})
admin.get('/user',function(req,res){
    res.send('Admind Homepage | User');
})

app.use('/admin',admin);
app.get('*',function(req,res){
    res.send('404');
})