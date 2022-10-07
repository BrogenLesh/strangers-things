import { React, useState } from "react";
import { Link, Route, Switch, NavLink } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Posts from "./Posts";
import Form from "./Form";
import Profile from "./Profile"
import FeaturedPost from "./FeaturedPost";



const App = () => {
    const [posts, setPosts] = useState([])
    const [userName, setUserName] = useState('');
    const [searchBar, setSearchBar] = useState('')
    const [token, setToken] = useState('')
    const [postID, setPostID] = useState(null)
    const [comment, setComment] = useState('')
    const [featuredPost, setFeaturedPost] = useState([])

    return <main>
        <nav id="navbar">
            <Link to="/home">
                <h1>Strangers Things</h1>
            </Link>
            <div>
                <NavLink to="/home">Home</NavLink> |
                <NavLink to="/posts">Posts</NavLink> |
                <NavLink to="/profile">Profile</NavLink> |
                <NavLink to="/login">Log In</NavLink>
            </div>
        </nav>


        <Switch>
            <Route exact path="/">
                <Register
                    token={token} setToken={setToken}
                />
            </Route>

            <Route path="/login">
                <Login
                    userName={userName} setUserName={setUserName}
                    token={token} setToken={setToken}
                />
            </Route>

            <Route path="/posts">
                <Route path="/posts/:postId">
                    <FeaturedPost
                        token={token} posts={posts} setPosts={setPosts}
                        postID={postID} setPostID={setPostID}
                        userName={userName} setSearchBar={setSearchBar}
                        featuredPost={featuredPost} setFeaturedPost={setFeaturedPost}
                    />
                </Route>
                <Posts
                    posts={posts} setPosts={setPosts}
                    searchBar={searchBar} setSearchBar={setSearchBar}
                    token={token} setPostID={setPostID}
                    featuredPost={featuredPost} setFeaturedPost={setFeaturedPost}
                />
            </Route>

            <Route exact path="/createform">
                <Form
                    token={token} setToken={setToken}
                    posts={posts} setPosts={setPosts}
                    postID={postID} setPostID={setPostID} />
            </Route>

            <Route exact path="/logout"><div>Logout</div></Route>

            <Route exact path="/home">
                <div >
                    <h1>Welcome to Stranger Things </h1>
                    <div >
                        <Link exact to="/profile">
                            <button type="text" >Profile</button>
                        </Link>
                    </div>
                </div>
            </Route>

            <Route exact path="/profile">
                {
                    token ?

                        <Profile
                            userName={userName}
                            token={token}
                            postID={postID} setSearchBar={setSearchBar}
                        /> :
                        <div>
                            <Link to="/login">Log In</Link>
                        </div>

                }

            </Route>
        </Switch>

    </main>
}

export default App;
