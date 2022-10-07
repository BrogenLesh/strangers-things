import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchUser } from "../util/api";



const Profile = ({ token, userName, setSearchBar }) => {
    const [messages, setMessages] = useState([])
    const history = useHistory();

    const messageData = async () => {
        setMessages(await fetchUser(token))
        return messages
    }

    const handleMessage = (title) => {
        setSearchBar(title)
        history.push(`/posts`)
    }


    useEffect(() => {
        messageData();
    }, [])

    return <>

        <>
            <h1>WELCOME {userName}</h1>
            <h2>INBOX</h2>
            {
                messages.map(message => {
                    console.log(message)
                    return <>
                        {
                            userName !== message.fromUser.username ?
                                <article>
                                    <h1 onClick={() => handleMessage(message.post.title)}>Post: {message.post.title}</h1>
                                    <div>From: {message.fromUser.username}</div>
                                    <div>{message.content} </div>
                                    <br></br>
                                    <a onClick={() => handleMessage(message.post.title)}>-View Post-</a>
                                </article>
                                : null
                        }

                    </>

                })
            }
        </>

    </>
}


export default Profile;
