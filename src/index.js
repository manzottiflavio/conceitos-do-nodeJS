const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');
const { send } = require('express/lib/response');

const app = express();

app.use(cors());
app.use(express.json());

 const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username}=request.headers;

const user = users.find((user)=>user.username===username);

if(!users){
  return response.status(400).json({error:"users not found"})
}
request.users=users;

return next();
}

app.post('/users', (request, response) => {
  const {name,username}=request.body;
  
  const user={ 
    id: uuidv4(), // precisa ser um uuid
    name, 
    username, 
    todos: []
  }
if(!user){
  return response.status(400).json("{users does not existy}");
  }else{
    return response.status(201).json(user)
  }
  users.push(user)

//const usersAreadyExisty=user.some((users)=>users.username===username);

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {username}=request.headers;
  const {todos}=request.body;
  const {title}=request.body;
  if(!todos){
    return response.status(400).json({message:"todos not found"})
  }else{
    return response.status(201).json(todos);
  }
 
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {username}=request.headers;
  const{user}=request.body;
  const {title}=request.body;
  

  const todos={ 
    id: uuidv4(), // precisa ser um uuid
    title,
    done: false, 
    deadline:new Date('deadline'),
    created_at:new date(2022-10-14)
  }

  //todos.push(user)
if(!todos){
  return response.status(400).send({message:"error:todos not create"})
}else{
  return response.status(201).json(todos)
}
 date.push(todos);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;