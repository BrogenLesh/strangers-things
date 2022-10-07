import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllPost } from "../util/api";

const Posts = (props) => {
    const {
        posts, setPosts, 
        setPostID, token,
        setFeaturedPost,
        searchBar, setSearchBar
    } = props

    const history = useHistory();

    const post = async () => {
        setPosts(await fetchAllPost(token))
    }

    useEffect(() => {
        post();
    }, []);


    const handleSearchBar = (event) => {
        setSearchBar(event.target.value)
    }

    const handleCreatePost = (event) => {
        event.preventDefault();
    }

    const handleOpenForm = () => {
        token ? history.push('/createform') :
            alert("Login")
    }

    const handleFeaturedPost = (event, post) => {
        if (token) {
            setFeaturedPost(post);
            setPostID(post._id)
            history.push(`/posts/${post._id}`)
        } else {
            alert("Login")
        }
    }

    return (
        <div>
            <form onSubmit={handleCreatePost}>
                <input type="text" name="search" placeholder="Search Post" value={searchBar} onChange={handleSearchBar}></input>
                <button onClick={handleOpenForm}>Create a Post +</button>
            </form>

            {
                posts.filter(post => {

                    return `${post.title} ${post.description}`
                        .toLowerCase()
                        .includes(searchBar.toLowerCase())
                }).map((post) => {
                    return (
                        <>
                            <div key ={post._id} onClick={(event) => {
                                { handleFeaturedPost(event, post) }
                            }}>
                                <h1>{post.title}</h1>
                                <p>{post.description}</p>
                                <div>
                                    <b>Price:</b> {post.price}
                                    <b>Seller:</b> {post.author.username}
                                    <b>Location:</b> {post.location}
                                </div>
                            </div>
                        </>
                    );
                })}
        </div>
    );
};

export default Posts;


//not getting a post id  find out what post ids are. 