const expres = require("express");
const users = require("./MOCK_DATA.json");
const fs=require("fs")

const app = expres();

const port = 8000;

//middleware - plugins
app.use(expres.urlencoded({extended:false}));

//routes
/* for react website and apps*/
//REST API
app.get("/api/users", (req, resp) => {
  return resp.json(users);
});

//getting only data with id

app.get("/api/users/:id", (req, resp) => {
  //: id--> for dyanmically id   //id not  dynamically id
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return resp.json(user);
});

//all methods

// app.get("/api/users", (req, resp) => {
//   return resp.json(users);
// });

// app.patch("/api/users", (req, resp) => {
//   //update the user
//   return resp.json(users);
// });

// app.delete("/api/users", (req, resp) => {
//   //delete the user
//   return resp.json(users);
// });

//here all routes are same /api/users do all methos together\

app
  .route("/api/users")
  .get((req, resp) => {
    return resp.json(users);
  })
  .delete(() => {
    //delete  the user
    return resp.json(users);
  })
  .patch((req, resp) => {
    //edit the user
    return resp.json(users);
  })
  .post((req,resp)=>{
     const body=req.body;
     users.push({...body, id: users.length+1})
    
     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return resp.json({
            status:"Pending"
        })
     })
     console.log(body)
     return resp.json({status:"sucess",id:users.length})


  });

/*Html document rendar*/
app.get("/user", (req, resp) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
   
    </ul>
    `;
  resp.send(html);
});

app.listen(port, () => {
  console.log("Server on");
});
