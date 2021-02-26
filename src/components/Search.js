import React from 'react'
import './Search.css'

function Search (props){
 
    const onSearchChange = (e)=>{
        e.preventDefault();
        props.handleChange(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit();
    }

    return (
        <div className = "Search__wrapper">
        <form className = "Search">
          <input className = "Search__input" type = "text"
           placeholder = "Search" 
           name = "search"
           onChange = {onSearchChange} />
           <i className = "fas fa-search" onClick = {onSearchSubmit}>
           </i>
        </form>
        </div>
    );
}



export default Search;
