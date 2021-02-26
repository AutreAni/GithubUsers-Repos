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
        <div className="Card__wrapper">
            { props.completed ? (<div className="Card" onClick={handleClick}>
                <div className="Card_inner__wrapper">
                    <Avatar title={props.userName}
                        src={props.userAvatarUrl}
                    />
                    <Title name={props.name}
                        userName={props.userName}
                        joinDate={props.joinDate}
                    />
                    <div className='UserInfo'>
                            <UserInfoField
                                IclassName="fas fa-user-friends"
                                Count={props.followers}
                                fieldFor="followers"
                            />
                            <UserInfoField
                                IclassName="fas fa-user-friends"
                                Count={props.following}
                                fieldFor="following"
                            />
                        <UserInfoField
                            IclassName="fas fa-book"
                            Count={props.repos}
                            fieldFor="public repos"
                        />
                    </div>
                </div>
            </div>) : (null)}

            {(isClicked.clicked && isClicked.user === props.userName) ? (<Repos userName={props.userName}
                repos={repos}
            />) : (null)
            }
        </div>
    )
}

function UserInfoField(props) {
    return (
        <div className = "Field">
            <i className={props.IclassName} />
            <span className="Count">{props.Count}</span>
            <span>{props.fieldFor}</span>
        </div>
    )
}

function Avatar(props) {
    return (
        <div className="Avatar">
            <img src={props.src} alt={props.title} />
        </div>
    )
}


function Title(props) {
    return (
        <div className="Title">
            <h3>{props.name}</h3>
            <span className="Username">{props.userName}</span>
            <span className="JoinDate">Joined in {getDate(props.joinDate)}</span>
        </div>
    )
}

function getDate(str) {
    let date = new Date(str.slice(0, 7));
    let year = date.getFullYear();
    let months = ["January ", "Fabruary ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "November ", "December "];
    return months[date.getMonth()] + year;
}

function handleToggle(obj, username, setObj) {
    return (obj.clicked && obj.user === username) ? setObj({ clicked: false, user: username }) :
        setObj({ clicked: true, user: username });
}


export default Card
