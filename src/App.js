import './App.css';
import React, { useState } from 'react';
import Card from './components/Card';
import Search from './components/Search';
import NoUserFound from './components/NoUserFound';



function App() {
  // const [users, setUsers] = useState([])
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [joinDate, setJoinDate] = useState("")
  const [searchResult, setSeachResult] = useState ({})


  const setData = (
    {
      name,
      login,
      followers,
      following,
      public_repos,
      avatar_url,
      created_at,
    }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setJoinDate(created_at);
  };

  const handleChange = (value) => {
    setUserInput(value);
  }

  const handleResult = (response,setObj) => {
    if(!response.ok){
      setObj({completed:true, success:false})
      throw new Error();
    }
    setObj({completed:true, success:true})
    return response
  }

  const handleSubmit = () => {
      setSeachResult({completed:false, success:false})
      // fetch(`https://api.github.com/users/?q=${userInput}`)

      fetch(`https://api.github.com/users/${userInput}`)
      .then(response => (handleResult(response, setSeachResult)))
      .then(response => response.json())
      .then(data => {
          setData(data);
        })
      .catch(error => {
        console.log(error.message)})
  }


  return (
    <div>
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {searchResult.completed && !searchResult.success ? (<NoUserFound/>) : 
      (<Card completed = {searchResult.completed}
        userAvatarUrl={avatar}
        name={name}
        userName={userName}
        followers={followers}
        following={following}
        repos={repos}
        joinDate = {joinDate}
      />)
      }
    </div>
  )
}

export default App;
