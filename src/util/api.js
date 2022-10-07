const cohortName = "2204-FTB-MT-WEB-PT";
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const fetchAllPost = async (token) => {
    const response = await fetch(`${APIURL}/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    return (result.data.posts)
};


export const fetchPostForm = async (token, title, description, price, location) => {
    const response = await fetch(`${APIURL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            post: {
                title: title,
                description: description,
                price: price,
                location: location
            }
        })
    })
    const result = await response.json();
    console.log(result.data.post)
    return result.data.post

}

export const fetchRegister = async (userName, password) => {
    const response = await fetch(`${APIURL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                username: userName,
                password: password
            }
        })

    })
    const result = await response.json();
    console.log(result)
    if (!result.success) {
        alert(result.error.message)
    } else {
        return (result.data.token)
    }

}


export const fetchLogin = async (userName, password) => {
    const response = await fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                username: userName,
                password: password
            }
        })
    })

    const result = await response.json()
    if (!result.success) {
        alert(result.error.message)
    } else {
        return result.data.token
    }

}

export const fetchDelete = async (token, postID, selectedPost, posts, setPosts) => {
    const response = await fetch(`${APIURL}/posts/${postID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json()
    console.log(result)
    if (result.success) {
        window.confirm('You want to delete this post?') 
        const newPost = posts.filter(post => post._id !== selectedPost)
        console.log(newPost)
        setPosts(newPost)
    } else {
        alert("UNAUTHORIZED USER")
    }

}

export const fetchMessage = async (postID, token, comment) => {
    const response = await fetch(`${APIURL}/posts/${postID}/messages`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message: {
                content: comment
            }
        })
    })

    const result = await response.json();
    console.log(result)
    return result.data.message.content

}


export const fetchUser = async (token) => {
    const response = await fetch(`${APIURL}/users/me`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    console.log(result.data)
    return result.data.messages

}