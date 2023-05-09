import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users,setUser]= useState([]);


  useEffect(()=>{
    fetch(`http://localhost:5000/users`)
    .then(res=>res.json())
    .then(data=>setUser(data))
  },[])
  console.log(users);



const handleAddUser =(event)=>{
  event.preventDefault();
  const form =  event.target;
  const name =  form.name.value;
  const email= form.email.value;
  const user={name,email}
  fetch('http://localhost:5000/users',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(user)
  })
  .then(res=>res.json())
  .then(data=>{console.log('inside post',data)
        const newUser = [...users,data]
        setUser(newUser);
        form.reset();

})
  
}


  return (
    <>
      <h1>users managenment system</h1>
      <p>
        {users.length}
      </p>

      <form onSubmit={handleAddUser}>
    <input type="text" name="name" id="" required />
    <br />
    <input type="email" name="email" id="" required />
    <br />
    <input type="submit" value="add user" />


      </form>
    {
      users.map(user=><>
      
      
      <p>ID: {user.id} Name:{user.name} Email: {user.email}</p>
      

      </>
      )
    }

    </>
  );
}

export default App;
