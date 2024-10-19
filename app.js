const apiURL = 'https://66f91c912a683ce97310eea0.mockapi.io/api/vi/posts';

function fetchPosts() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.log('error', error));
}
fetchPosts()

function displayData(posts) {
    let container = document.getElementById("cont")
    container.innerHTML = "";
    posts.forEach(ele => {
        let cols = `
<div class="post">
    <div class="post">
        <div class="post-header">
            <img src="${ele.avatar}" width="100px" alt="Avatar" onerror="this.src='assets/profile.jpg'">
         <div>
            <h4>${ele.name}</h4>
            <small>${ele.createdAt}</small>
            </div>
            </div>
            <h6 class="post_title">${ele.title}</h6>
        <div class="post-image">
            <img src="${ele.avatar}" alt="IMG" onerror="this.src='assets/profile.jpg';">
        </div>
        <p>${ele.body}</p>
        <div class="actions">
            <button class="edit-btn" onclick="editPost(${ele.id})">Edit</button>
            <button class="delete-btn" onclick="deletePost(${ele.id})">Delete</button>
        </div>
    </div>
</div> `
        container.innerHTML += cols
    })
}
// })
let createPostModal = document.getElementById("create-post");

document.querySelector("#createPostForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let createPostName = document.getElementById("create-name").value;
    let createPostTitle = document.getElementById("create-title").value;
    let createPostAvatar = document.getElementById("create-avatar").value;
    let createPostURL = document.getElementById("create-postURL").value;
    let createPostBody = document.getElementById("create-body").value;

    const newPost = {
        name: createPostName,
        title: createPostTitle,
        avatar: createPostAvatar,
        postURL: createPostURL,
        body: createPostBody,
        createdAt: new Date().toISOString()
    }

    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchPosts();
            createPostModal.style.display = "none";
        })
        .catch(error => console.log(error));

        document.getElementById("create-name").value = "";
        document.getElementById("create-title").value = "";
        document.getElementById("create-avatar").value = "";
        document.getElementById("create-postURL").value = "";
        document.getElementById("create-body").value = "";

});

document.querySelector("#post-cont").addEventListener("click", () => {
    createPostModal.style.display = "block";
});

document.querySelectorAll(".close-btn").forEach(closeContent => {
    closeContent.addEventListener("click", () => {
        createPostModal.style.display = "none";
        editPostModal.style.display = "none";
    });
});

// ========Delete Post==============

function deletePost(id) {
    fetch(`${apiURL}/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
        .then(data => {
            alert(`${data.name} Deleted`)
            fetchPosts();
        })
        .catch((error) => console.log("Error", error)
        )
}

// ============Edit Post===============
let editPostModal = document.getElementById("ubdate-post");

function editPost(id){
    console.log(id);
    
    fetch(`${apiURL}/${id}`)
    .then(response => response.json())
    .then(ele =>{
        editPostModal.style.display = "block";
        document.getElementById("edit-name").value = ele.name
        document.getElementById("edit-title").value = ele.title
        document.getElementById("edit-avatar").value = ele.avatar
        document.getElementById("edit-postURL").value = ele.postURL
        document.getElementById("edit-body").value = ele.body
    })
    .catch(error => console.log("Error", error))

    document.getElementById("updatePostForm").addEventListener("submit", (e)=>{
        e.preventDefault()
        
                const name = document.getElementById("edit-name").value;
                const title = document.getElementById("edit-title").value;
                const avatar = document.getElementById("edit-avatar").value;
                const postURL =  document.getElementById("edit-postURL").value;
                const body = document.getElementById("edit-body").value;
        
                const updatePost = {
                    name: name,
                    title: title,
                    avatar: avatar,
                    postURL: postURL,
                    body: body,
                }
        fetch(`${apiURL}/${id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(updatePost),
        })
        .then(response => response.json())
        .then(data =>{
            // alert(`${data.name} Updated`)
            console.log(`${data.name} Updated`);
            fetchPosts()
            editPostModal.style.display="none";
        })
        .catch((error) => console.log(error))
        document.getElementById("edit-name").value = "";
        document.getElementById("edit-title").value = "";
        document.getElementById("edit-avatar").value = "";
        document.getElementById("edit-postURL").value = "";
        document.getElementById("edit-body").value = "";
    })
}