import './App.css';
import React, { useState } from 'react';
import Search from './components/Search';
import NoUserFound from './components/NoUserFound';
import CardList from './components/CardList';
// import Card from './components/Card';



function App() {
  const [users, setUsers] = useState([]); 
  const [userInput, setUserInput] = useState('');
  const [searchResult, setSeachResult] = useState ({});
  const [ready, setReady] = useState(false)

  const handleChange = (value) => {
    setUserInput(value);
  }

  const handleResult = (response,setObj) => {
    if(!response.ok){
      setObj({completed:true, success:false})
      throw new Error();
    }
    setObj({completed:true, success:true})
    return response;
  }

  const handleSubmit = () => {
      setSeachResult({completed:false, success:false})

      fetch(`https://api.github.com/search/users?q=${userInput}`)
      .then(response => (handleResult(response, setSeachResult)))
      .then(response => response.json())
      .then(data => {
         setUsers(data.items);
         setReady(true);

        })
      .catch(error => {
        console.log(error.message)});
  }

  return (
    <div>
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        completed = {searchResult.completed}
      />
      {searchResult.completed && searchResult.success && ready ? (<CardList users = {users} userInput = {userInput} ready= {ready}/>): null}
      {searchResult.completed && !searchResult.success ? (<NoUserFound/>) : null };
     </div>
  )
}

export default App;
