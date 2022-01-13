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

const user = users.find(user=>user.username===username);

if(!users){
  return response.status(400).json({error:"users not found"})
}
request.user=user;

return next();
}

app.post('/users', (request, response) => {
  const {name,username}=request.body;
  
  const usersAreadyExisty = users.find(user => user.username === username);

  if(usersAreadyExisty){
    return response.status(400).json({error:'usersAreadyExisty'});
    }

  const user=({ 
    id: uuidv4(), // precisa ser um uuid
    name, 
    username, 
    todos: []
  })
 return response.status(201).json(user)
  
  users.push(user)



});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {user}=request;
  const{todos}=request.body;

  if(!todos){
    return response.status(400).json({message:"todos not found"})
  }else{
    return response.status(201).json(user.todos);
  }
 
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {username}=request.headers;
  const{user}=request.body;
  const {title, deadline}=request.body;
  
    const todos={ 
    id: uuidv4(), 
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  }

  
if(!todos){
  return response.status(400).send({message:"error:todos not create"})
}else{
  return response.status(201).json(todos)
}
 //user.todos.push(todos)
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