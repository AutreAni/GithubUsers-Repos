import React, {useState} from 'react';
import './Repos.css';

function Repos(props) {

    const repos = props.repos;  


    const listRepos = repos.length !== 0 ?(
         repos.map((li) => <List name = {li.name} url = {li.html_url}
         />)
     ) : (
         <li>User has no public repository</li>
         );
    return(
        <div className = "Repos">
            <ul className = "Repos_Ul" onClick = {props.toggleInnerUl}>
                {listRepos}
            </ul>  
        </div>
    )
}

function List(props) {
    const [clicked, setClicked] = useState(false);

    function handleToggle(e) {
        if(e.target.tagName === "SPAN" || e.target.tagName === "I" ) {
        !clicked? setClicked(true) : setClicked(false)
        }else{
            return;
        }
    }

    return(
        <li onClick = {handleToggle}
        key = {props.key}
        >
        <i className = "fas fa-book"></i>
        <span> {props.name}</span>
       
        {clicked? (
                  <a 
                  href = {props.url} 
                  target = "_blank" 
                  rel = "noreferrer">
                  {props.url}
                  </a>
                  ): null}
        </li>
    )
}

export default Repos
