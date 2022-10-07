import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchDelete } from "../util/api";
import { fetchMessage } from "../util/api";



const FeaturedPost = ({ featuredPost, token, postID, posts, setPosts, userName, setSearchBar }) => {
    const history = useHistory()
    const [comment, setComment] = useState('')

    const deletePost = (selectedPost) => {
        fetchDelete(token, postID, selectedPost, posts, setPosts);
        history.push('/posts')
    }

    const leavePost = () => {
        history.push('/posts')
        console.log(featuredPost)
        console.log(postID)
        setSearchBar('')
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (userName !== featuredPost.author.username) {
            const message = fetchMessage(postID, token, comment)
            alert("Sent")
            setComment('')
        } else {
            alert("This is your post")
        }

    }


    return (
        <>
            <div id="featured-view">
                <h1>{featuredPost.title}</h1>
                <p>{featuredPost.description}</p>
                <b >Price:</b> <span>{featuredPost.price}</span>
                <b >Seller:</b> <span >{featuredPost.author.username ? featuredPost.author.username : null }  </span>
                <b >Location:</b> <span >{featuredPost.location}</span>
                <section >
                    <div>Messages:</div>
                    <ul >
                        {
                            featuredPost.messages.map(message => {
                                console.log(featuredPost)
                                console.log(message)
                                
                                if (featuredPost.author.username !== message.fromUser.username) {
                                    return <>
                                        <li key={featuredPost._id}>
                                            <span>{message.content} - Posted by: {message.fromUser.username} </span>
                                        </li>
                                    </>
                                }
                            })
                        }


                    </ul>
                </section>
                <footer >
                    <form onSubmit={handleCommentSubmit}>
                        <input name="comment" type="text"
                            placeholder="Enter message" value={comment} onChange={(event) => setComment(event.target.value)} />
                        <button type="submit">Send</button>
                    </form>
                </footer>

                <button onClick={() => deletePost(postID)}>Delete Post</button>

                        <button onClick={leavePost}>Close</button>
            </div>
        </>

    )
}


export default FeaturedPost
