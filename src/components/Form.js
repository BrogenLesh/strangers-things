import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchPostForm } from "../util/api";

const Form = ({ token, posts, setPosts, setPostID }) => {
    const [description, setdescription] = useState('')
    const [title, setTitle] = useState('')
    const [location, setlocation] = useState('')
    const [price, setprice] = useState('')
    const history = useHistory();

    const handlePostForm = async (event) => {
        event.preventDefault();
        if (token) {
            const createForm = await fetchPostForm(token, title, description, price, location)
            setPosts([createForm, ...posts])
            setPostID(createForm.author._id)
            history.push('/posts')

        } else {
            alert("Please Login")
        }
    }
    return (
        <div>
            <form>
                <h2>Create Post</h2>
                <label>Title:</label>
                <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <br></br>
                <label>Description:</label>
                <input type="text" placeholder="Description" value={description} onChange={(event) => setdescription(event.target.value)}></input>
                <br></br>
                <label>Location:</label>
                <input type="text" placeholder="Location" value={location} onChange={(event) => setlocation(event.target.value)}></input>
                <br></br>
                <label>Price:</label>
                <input type="text" placeholder="Price" value={price} onChange={(event) => setprice(event.target.value)}></input>
                <button type="submit" onClick={handlePostForm}>Submit</button>

            </form>
        </div>


    )
}

export default Form