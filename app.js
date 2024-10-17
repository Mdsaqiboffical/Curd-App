// create Post 

// let createPostModal = document.getElementById("create-post");
// let createPostName = document.getElementById("create-name");
// let createPostTitle = document.getElementById("create-title");
// let createPostAvatar = document.getElementById("create-avatar");
// let createPostURL = document.getElementById("create-postURL");
// let createPostBody = document.getElementById("create-body");
// let createPostbtn = document.querySelector(".create-butn");

// // Edit post

// let editPostModal = document.getElementById("ubdate-post");
// let editPostName = document.getElementById("edit-name");
// let editPostTitle = document.getElementById("edit-title");
// let editPostAvatar = document.getElementById("edit-avatar");
// let editPostURL = document.getElementById("edit-postURL");
// let editPostbody = document.getElementById("edit-body");
// let editPostbtn = document.querySelector(".edit-butn");

// document.querySelector("#post-cont").addEventListener("click", () => {
//     createPostModal.style.display = "block";
// });

// document.querySelectorAll(".close-btn").forEach(closeContent => {
//     closeContent.addEventListener("click", () => {
//         createPostModal.style.display = "none";
//         editPostModal.style.display = "none";
//     });
// });
// createPostbtn.addEventListener("click", () => {
//     if (createPostAvatar.value === "" || createPostName.value === "" || createPostTitle.value === "" || createPostBody.value === "" || createPostURL === "") {
//         alert("Fill The All Input!")
//     } else {

//         let cont = document.querySelector(".js-post")
//         let postRow =
//             `
//      <div class="post">
//       <div class="post-header">
//         <img src="${createPostAvatar.value}" alt="Avatar" onerror="this.src='assets/profile.jpg';">
//        <div>
//          <h6>${createPostName.value}</h6>
//          <small>${new Date().toLocaleString()}</small>
//       </div>
//        </div>
//         <p class="post_title">${createPostTitle.value}</p>
//         <div class="post-image">
//         <img src="${createPostURL.value}" alt="Uploaded Image" onerror="this.src='assets/profile.jpg';">
//         </div>
//         <p class="post-body">${createPostBody.value}</p>
//         <div class="actions">
//             <button class="edit-btn" onclick="editPost(this)">Edit</button>
//             <button class="delete-btn" onclick="deletePost(this)">Delete</button>
//         </div>
//         </div>
//         `
//         createPostName.value = "";
//         createPostTitle.value = "";
//         createPostBody.value = "";
//         createPostURL.value = "";
//         createPostAvatar.value = "";

//         createPostModal.style.display = "none";
//         cont.innerHTML += postRow
//     }
// })

// function editPost(button) {
//     // let postBtn = button.querySelector(".post");
//     let postBtn = button.closest(".post")
//     let postName = postBtn.querySelector("h6").innerText;
//     let postTitle = postBtn.querySelector(".post_title").innerText;
//     let postBody = postBtn.querySelector(".post-body").innerText;
//     let postAvatar = postBtn.querySelector(".post-header img").src;
//     let postImage = postBtn.querySelector(".post-image img").src;

//     editPostName.value = postName;
//     editPostTitle.value = postTitle;
//     editPostbody.value = postBody;
//     editPostAvatar.value = postAvatar;
//     editPostURL.value = postImage;
//     // console.log(editPostName.value);

//     editPostModal.style.display = "block";

//     editPostbtn.addEventListener("click", () => {
//         if (editPostName === "" || editPostTitle === "" || editPostbody === "" || editPostAvatar === "" || editPostURL === ""){
//             alert("Fill The All Input")
//         } else {
//             postBtn.querySelector("h6").innerText = editPostName.value;
//             postBtn.querySelector(".post_title").innerText = editPostTitle.value;
//             postBtn.querySelector(".post-body").innerText = editPostbody.value;
//             postBtn.querySelector(".post-header img").src = editPostAvatar.value;
//             postBtn.querySelector(".post-image img").src = editPostURL.value;
//         }
//         editPostModal.style.display = "none";
//     })
// }

// function deletePost(button) {
//     let post = button.closest(".post");
//     post.remove();
// }

// let URL = fetch("https://66f91c912a683ce97310eea0.mockapi.io/api/vi/posts");
// async function postFun() {
//     const URLData = await URL.json()
//     console.log(URLData);

//     return URLData
// }
// postFun()

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
            alert(`${data.name}`)
            fetchPosts();
        })
        .catch((error) => console.log("Error", error)
        )
}

// ============Edit Post===============
let editPostModal = document.getElementById("ubdate-post");

function editPost(id){
    fetch(`${apiURL}/${id}`)
    .then(response => response.json())
    .then(ele =>{
        editPostModal.style.display = "block";
        document.getElementById("postId").value = ele.id
        document.getElementById("edit-name").value = ele.name
        document.getElementById("edit-title").value = ele.title
        document.getElementById("edit-avatar").value = ele.avatar
        document.getElementById("edit-postURL").value = ele.postURL
        document.getElementById("edit-body").value = ele.body
    })
    .catch(error => console.log("Error", error))

}
document.getElementById("updatePostForm").addEventListener("submit", (e)=>{
    e.preventDefault()
    
    let id = document.getElementById("postId").value;
    let name = document.getElementById("edit-name").value;
            let title = document.getElementById("edit-title").value;
            let avatar = document.getElementById("edit-avatar").value;
            let postURL =  document.getElementById("edit-postURL").value;
            let body = document.getElementById("edit-body").value;
    
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
        body: JSON.stringify(updatePost)
    })
    .then(response => response.json())
    .then(data =>{
        console.log("DATA", data);
        fetchPosts()
        editPostModal.style.display="none";
    })
})