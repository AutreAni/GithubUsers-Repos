import React, { useState } from 'react';
import Repos from './Repos';
import './Card.css';


function Card(props) {

    const [repos, setRepos] = useState([]);
    const [isClicked, setIsClicked] = useState({ clicked: false, user: props.userName });
    const handleClick = () => {

        handleToggle(isClicked, props.userName, setIsClicked);

        fetch(`https://api.github.com/users/${props.userName}/repos`)
            .then(response => response.json())
            .then(data => {
                setRepos(data);
            });
    }

    return (
        <>
                <div className="Card" onClick={handleClick}>
                    <div className="Card_inner__wrapper">
                        <Avatar title={props.userName}
                            src={props.userAvatarUrl}
                        />
                        <Title
                            userName={props.userName}
                        />
                    </div>
            </div>
            {(isClicked.clicked && isClicked.user === props.userName) ? (<Repos userName={props.userName}
                repos={repos}
            />) : (null)
            }
        </>
    )
}


function Avatar(props) {
    return (
        <div className="Avatar">
            <img src={props.src} alt={props.userName} />
        </div>
    )
}


function Title(props) {
    return (
        <div className="Title">
            <span className="Username">{props.userName}</span>
        </div>
    )
}



function handleToggle(obj, username, setObj) {
    return (obj.clicked && obj.user === username) ? setObj({ clicked: false, user: username }) :
        setObj({ clicked: true, user: username });
}


export default Card
