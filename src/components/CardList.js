import React from 'react';
import Card from './Card';
import './CardList.css';

function CardList(props) {
    console.log("cardlist", props.users, props.success);
    const list = props.users.length ? props.users.map(user =>
        <li key = {user.id}>
            <Card userName={user.login}
            userAvatarUrl = {user.avatar_url}
            />
        </li>) : null;

    return (
        <div className = "CardList">
            <ul className = "CardList_Ul">{list}</ul>
        </div>
    )



}

export default CardList
