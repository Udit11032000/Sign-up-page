const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const request=require("request");
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
  var firstName=req.body.firstname;
  var lastName=req.body.lastname;
  var Email=req.body.emailid;
  var data={
    members:[
      {
        email_address: Email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData=JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/64315a51df";
  const options ={
    method: "POST",
    auth:"Udit:73d9ef546c2bd9036f85c2f48365ca68-us6",
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname +"/failure.html");
    }
    response.on("data",function(data)
  {
    console.log(JSON.parse(data));
  })
  })
  request.write(jsonData);
  request.end();
})

app.listen(process.env.PORT || 5000, function()
{
  console.log("Server is starting");
});

//const apikey= "73d9ef546c2bd9036f85c2f48365ca68-us6";
//const listid="64315a51df";
