let form = document.querySelector("#form");
let input = document.querySelector("#input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

form = addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation(); // multiple time run
});

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Post cannnot be Blank";
    //console.log("failure");
  } else {
    console.log("success");
    msg.innerHTML = ""; // clear space (msg)
    acceptDate();
  }
};

//formValidation(); // single time run

// store data

let data = {};

let acceptDate = () => {
  //key value
  data["text"] = input.value;
  //   console.log("data pushed");

  console.log(data);
  createPost();
};

// upload on screen

let createPost = () => {
  //posts.innerHTML += data.text;
  posts.innerHTML += ` 
   <div>
         <p>${data.text}</p>
         <span class="options">
            <i onClick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
</div>`; // this target this icon or this list item only.
  input.value = ""; // clear input field
};

// delete

let deletePost = (e) => {
  //e.remove(); // target trash icon
  e.parentElement.parentElement.remove(); // post parent
};

// edit

let editPost = (e) => {
  // input                       p tag
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove(); // clear space
};

/*

form = document.querySelector("#form");
input = document.querySelector("#input");
msg = document.querySelector("#msg");
posts = document.querySelector("#posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("form submitted");
  formValidation();
});

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Post cannnot be Blank";
  } else {
    //console.log("success");
    msg.innerHTML = "";
    acceptDate();
  }
};

let data = {};

let acceptDate = () => {
  data["text"] = input.value;
  createpost();
};

let createpost = () => {
  posts.innerHTML += `
   <div>
     <p>${data.text}</p>
     <span class="options">
     <i onClick="editPost(this)" class="fas fa-edit"></i>
     <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
     </span>
 </div> 
  `;
  input.value = "";
  //deletePost()
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};

let editPost = (e) => {
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove(); // clear space
};

*/
