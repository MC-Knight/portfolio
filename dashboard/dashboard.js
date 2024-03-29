// open and close add blog model
const blogModal = document.getElementById("add-blog-modal");
const addBlogModel = document.getElementById("open-add-blog-model");
const closeAddBlogModel = document.querySelector(
  '[data-close-id="close-add-blog-modal"]'
);

addBlogModel.addEventListener("click", () => {
  blogModal.style.display = "flex";
});

closeAddBlogModel.addEventListener("click", () => {
  blogModal.style.display = "none";
});

//display blog
const displayBlogs = async () => {
  const recentBlogsRight = document.getElementById("recent-blogs-right");
  const isLoading = document.createElement("div");
  isLoading.classList.add("loader-1");
  recentBlogsRight.innerHTML = "";
  recentBlogsRight.appendChild(isLoading);
  // get blogs from api
  const res = await fetch(
    "https://portfolioapi-production-ec62.up.railway.app/api/blogs"
  );
  const data = await res.json();
  let blogs = data.blogsWithComments;

  if (blogs.length === 0) {
    recentBlogsRight.removeChild(isLoading);
    const noBlogs = document.createElement("p");
    noBlogs.classList.add("no-blog");
    noBlogs.textContent = "no blogs at the moment";
    recentBlogsRight.appendChild(noBlogs);
  } else {
    recentBlogsRight.removeChild(isLoading);
    blogs.forEach((blog) => {
      //create blog card
      const blogCard = document.createElement("div");
      blogCard.classList.add("recent-blog-right-card");

      // create blog image poster
      const img = document.createElement("img");
      img.src = `${blog.poster}`;
      img.alt = blog.id;

      // create div element for blog details
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("recent-blog-right-card-details");

      // create p element for title
      const titleP = document.createElement("p");
      titleP.classList.add("recent-blog-text");
      titleP.textContent = blog.title;

      // create div for blog buttons
      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("recent-blog-buttons");

      // Create div elements for likes
      const likesDiv = document.createElement("div");
      likesDiv.classList.add("recent-blog-likes");
      likesDiv.innerHTML = `
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.2474 9.08634C13.2332 8.01306 14.2322 6.7266 14.2322 5.04317C14.2322 3.97086 13.8488 2.94246 13.1664 2.18422C12.484 1.42598 11.5584 1 10.5933 1C9.42891 1 8.60851 1.36756 7.6161 2.47024C6.62368 1.36756 5.80329 1 4.63885 1C3.67377 1 2.74821 1.42598 2.0658 2.18422C1.38338 2.94246 1 3.97086 1 5.04317C1 6.73395 1.99241 8.02041 2.98483 9.08634L7.6161 14.2322L12.2474 9.08634Z"
          stroke="black"
          stroke-opacity="0.6"
          stroke-width="1.32322"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg> ${blog.likes}`;

      // Create div elements for views
      const viewsDiv = document.createElement("div");
      viewsDiv.classList.add("recent-blog-likes");
      viewsDiv.innerHTML = `
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.7041 7.93933C1.7041 7.93933 3.68893 3.30806 8.3202 3.30806C12.9515 3.30806 14.9363 7.93933 14.9363 7.93933C14.9363 7.93933 12.9515 12.5706 8.3202 12.5706C3.68893 12.5706 1.7041 7.93933 1.7041 7.93933Z"
            stroke="black"
            stroke-opacity="0.6"
            stroke-width="1.32322"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.32028 9.92416C9.41647 9.92416 10.3051 9.03552 10.3051 7.93933C10.3051 6.84314 9.41647 5.9545 8.32028 5.9545C7.22409 5.9545 6.33545 6.84314 6.33545 7.93933C6.33545 9.03552 7.22409 9.92416 8.32028 9.92416Z"
            stroke="black"
            stroke-opacity="0.6"
            stroke-width="1.32322"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg> ${blog.views}`;

      // create comment button
      const commentsButton = document.createElement("button");
      commentsButton.id = `open-comments-blog-model-${blog._id}`;
      commentsButton.innerHTML = `   
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_131_988)">
            <path
              d="M5.65008 13.2322C6.91281 13.88 8.36538 14.0554 9.74603 13.7269C11.1267 13.3985 12.3446 12.5877 13.1804 11.4407C14.0161 10.2937 14.4147 8.8859 14.3043 7.47102C14.1939 6.05614 13.5818 4.7272 12.5783 3.72368C11.5748 2.72017 10.2459 2.10807 8.83099 1.99769C7.41611 1.88731 6.00832 2.28591 4.86132 3.12165C3.71432 3.9574 2.90353 5.17533 2.57506 6.55598C2.2466 7.93663 2.42205 9.3892 3.0698 10.6519L1.74658 14.5554L5.65008 13.2322Z"
              stroke="black"
              stroke-opacity="0.6"
              stroke-width="1.32322"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_131_988">
              <rect
                width="15.8786"
                height="15.8786"
                fill="white"
                transform="translate(0.42334)"
              />
            </clipPath>
          </defs>
        </svg>
        ${blog.comments.length}`;

      // create edit button
      const editButton = document.createElement("button");
      editButton.id = `open-edit-blog-model-${blog._id}`;
      editButton.innerHTML = `  
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6581 2.96052L8.88181 1.1842H3.55286C3.23879 1.1842 2.93758 1.30897 2.7155 1.53105C2.49342 1.75313 2.36865 2.05434 2.36865 2.36841V11.8421C2.36865 12.1562 2.49342 12.4574 2.7155 12.6795C2.93758 12.9015 3.23879 13.0263 3.55286 13.0263H10.6581C10.9722 13.0263 11.2734 12.9015 11.4955 12.6795C11.7176 12.4574 11.8423 12.1562 11.8423 11.8421"
            stroke="#33383C"
            stroke-opacity="0.8"
            stroke-width="1.18421"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.73682 10.6579H5.32892"
            stroke="#33383C"
            stroke-opacity="0.8"
            stroke-width="1.18421"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.8946 5.6842C11.1302 5.44865 11.4497 5.31631 11.7828 5.31631C12.1159 5.31631 12.4354 5.44865 12.6709 5.6842C12.9065 5.91976 13.0388 6.23924 13.0388 6.57236C13.0388 6.90548 12.9065 7.22496 12.6709 7.46052L10.0657 10.0658L7.69727 10.6579L8.28937 8.28946L10.8946 5.6842Z"
            stroke="#33383C"
            stroke-opacity="0.8"
            stroke-width="1.18421"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        Edit`;

      // create delete button
      const deleteButton = document.createElement("button");
      deleteButton.id = `open-delete-blog-model-${blog._id}`;
      deleteButton.innerHTML = ` 
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.875 3.75H13.125"
            stroke="#FF4820"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.875 3.75V12.5C11.875 13.125 11.25 13.75 10.625 13.75H4.375C3.75 13.75 3.125 13.125 3.125 12.5V3.75"
            stroke="#FF4820"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 3.75V2.5C5 1.875 5.625 1.25 6.25 1.25H8.75C9.375 1.25 10 1.875 10 2.5V3.75"
            stroke="#FF4820"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        Delete`;

      // Append all elements to their respective parent elements
      buttonsDiv.appendChild(likesDiv);
      buttonsDiv.appendChild(viewsDiv);
      buttonsDiv.appendChild(commentsButton);
      buttonsDiv.appendChild(editButton);
      buttonsDiv.appendChild(deleteButton);
      detailsDiv.appendChild(titleP);
      detailsDiv.appendChild(buttonsDiv);
      blogCard.appendChild(img);
      blogCard.appendChild(detailsDiv);

      recentBlogsRight.appendChild(blogCard);

      // main container for modals
      const mainContainer = document.querySelector(".container");

      //create div for edit modal
      const editModal = document.createElement("div");
      editModal.classList.add("modal");
      editModal.id = `edit-blog-modal-${blog._id}`;

      editModal.innerHTML = `  
        <form name="edit-blog-form-${blog._id}">
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="close-modal"
          data-close-id="close-edit-blog-modal-${blog._id}"
        >
          <path
            d="M15.972 5.29102L5.54956 15.7134"
            stroke="#33383C"
            stroke-width="0.868535"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.54956 5.29102L15.972 15.7134"
            stroke="#33383C"
            stroke-width="0.868535"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
    
        <h1>edit Blog</h1>
    
        <div class="input-div-container">
          <p>Title</p>
          <div class="input-div">
            <input
              type="text"
              name="title"
              placeholder="Enter your blog title"
              required
              value="${blog.title}"
            />
          </div>
        </div>
    
        <div class="input-div-container">
          <p>Blog poster</p>
          <div class="input-div">
            <input type="file" name="poster" required value="${blog.poster}"/>
          </div>
        </div>
    
        <div class="input-div-container">
          <p>Blog content</p>
          <div class="textarea-div">
            <textarea
              rows="4"
              placeholder="Enter your text here..."
              name="content"
              required
            >${blog.content}</textarea>
          </div>
        </div>
    
        <button type="button" onClick={editBlog("${blog._id}")} id="edit-blog-btn-${blog._id}">edit blog</button>
      </form>`;

      const openEditBlogButton = document.getElementById(
        `open-edit-blog-model-${blog._id}`
      );
      const closeEditBlogButton = editModal.querySelector(
        `[data-close-id="close-edit-blog-modal-${blog._id}"]`
      );

      openEditBlogButton.addEventListener("click", () => {
        editModal.style.display = "flex";
      });

      closeEditBlogButton.addEventListener("click", () => {
        editModal.style.display = "none";
      });
      mainContainer.appendChild(editModal);

      //create div for delete modal
      const deleteModal = document.createElement("div");
      deleteModal.classList.add("modal");
      deleteModal.id = `delete-blog-modal-${blog._id}`;

      deleteModal.innerHTML = `
        <div class="delete-modal">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="close-modal"
            id="close-delete-blog-modal-${blog._id}"
          >
            <path
              d="M15.972 5.29102L5.54956 15.7134"
              stroke="#33383C"
              stroke-width="0.868535"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.54956 5.29102L15.972 15.7134"
              stroke="#33383C"
              stroke-width="0.868535"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div class="delete-modal-content">
            <p>Are you sure?</p>
            <p>you want to delete this blog,</p>
            <p>${blog.title}</p>
          </div>

          <div class="delete-modal-buttons">
            <button id="no-delete-blog-modal-${blog._id}">No</button>
            <button onClick={deleteBlog("${blog._id}")} id="delete-blog-${blog._id}">Continue</button>
          </div>
        </div>`;

      mainContainer.appendChild(deleteModal);

      // open and close delete blog model
      const openDeleteBlogModel = document.getElementById(
        `open-delete-blog-model-${blog._id}`
      );
      const closeDeleteBlogModel = document.getElementById(
        `close-delete-blog-modal-${blog._id}`
      );
      const noDeleteBlogModel = document.getElementById(
        `no-delete-blog-modal-${blog._id}`
      );

      openDeleteBlogModel.addEventListener("click", () => {
        deleteModal.style.display = "flex";
      });

      closeDeleteBlogModel.addEventListener("click", () => {
        deleteModal.style.display = "none";
      });

      noDeleteBlogModel.addEventListener("click", () => {
        deleteModal.style.display = "none";
      });

      //create div for comments modal
      const commentModal = document.createElement("div");
      commentModal.classList.add("modal");
      commentModal.id = `comments-blog-modal-${blog._id}`;

      const commentsDiv = document.createElement("div");
      commentsDiv.classList.add("comments-modal");

      commentsDiv.innerHTML = `   
        <div class="comments-modal-header">
          <h1>Comments</h1>
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-close-id="close-comments-blog-modal-${blog._id}"
          >
            <path
              d="M15.972 5.29102L5.54956 15.7134"
              stroke="#33383C"
              stroke-width="0.868535"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.54956 5.29102L15.972 15.7134"
              stroke="#33383C"
              stroke-width="0.868535"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>`;

      commentModal.appendChild(commentsDiv);

      let blogComments = blog.comments || [];
      if (blogComments.length === 0) {
        const noBlogComments = document.createElement("p");
        noBlogComments.classList.add("no-blog");
        noBlogComments.textContent = "no comments at the moment";
        commentsDiv.appendChild(noBlogComments);
      } else {
        blogComments.forEach((blogComment) => {
          const singleCommentDiv = document.createElement("div");
          singleCommentDiv.classList.add("comment-card");

          const commnentContent = document.createElement("p");
          commnentContent.innerHTML = `${blogComment.content}`;
          singleCommentDiv.appendChild(commnentContent);

          // Create the delete button div
          const deleteButtonDiv = document.createElement("div");
          deleteButtonDiv.classList.add("comment-delete");

          const deleteButton = document.createElement("button");
          deleteButton.id = `open-delete-blog-comment-model-${blogComment._id}`;
          deleteButton.innerHTML = `
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.875 3.75H13.125"
              stroke="#FF4820"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.875 3.75V12.5C11.875 13.125 11.25 13.75 10.625 13.75H4.375C3.75 13.75 3.125 13.125 3.125 12.5V3.75"
              stroke="#FF4820"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 3.75V2.5C5 1.875 5.625 1.25 6.25 1.25H8.75C9.375 1.25 10 1.875 10 2.5V3.75"
              stroke="#FF4820"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          delete`;

          deleteButtonDiv.appendChild(deleteButton);
          singleCommentDiv.appendChild(deleteButtonDiv);
          commentsDiv.append(singleCommentDiv);
        });
      }

      mainContainer.appendChild(commentModal);
      // open and close comment blog model

      const openCommentBlogModel = document.getElementById(
        `open-comments-blog-model-${blog._id}`
      );
      const closeCommentBlogModel = document.querySelector(
        `[data-close-id="close-comments-blog-modal-${blog._id}"]`
      );

      openCommentBlogModel.addEventListener("click", () => {
        commentModal.style.display = "flex";
      });

      closeCommentBlogModel.addEventListener("click", () => {
        commentModal.style.display = "none";
      });
    });
  }
};

displayBlogs();

const makeDeleteCommentModels = () => {
  //create div for delete comment modal
  const populateComments = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // get blogs from api
        const res = await fetch(
          "https://portfolioapi-production-ec62.up.railway.app/api/blogs"
        );
        const data = await res.json();
        let blogs = data.blogsWithComments;

        let allComments = [];
        for (let i = 0; i < blogs.length; i++) {
          if (blogs[i].comments.length === 0) {
            continue;
          }
          for (let j = 0; j < blogs[i].comments.length; j++) {
            allComments.push(blogs[i].comments[j]);
          }
        }
        resolve(allComments);
      } catch (error) {
        reject(error);
      }
    });
  };

  populateComments()
    .then((allComments) => {
      // main container for modals
      const mainContainer = document.querySelector(".container");
      setTimeout(() => {
        for (let i = 0; i < allComments.length; i++) {
          const deleteCommentModal = document.createElement("div");
          deleteCommentModal.classList.add("modal");
          deleteCommentModal.id = `delete-blog-comment-modal-${allComments[i]._id}`;

          deleteCommentModal.innerHTML = `
          <div class="delete-modal">
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="close-modal"
              data-close-id="close-delete-blog-comment-modal-${allComments[i]._id}"
            >
              <path
                d="M15.972 5.29102L5.54956 15.7134"
                stroke="#33383C"
                stroke-width="0.868535"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.54956 5.29102L15.972 15.7134"
                stroke="#33383C"
                stroke-width="0.868535"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
    
            <div class="delete-modal-content">
              <p>Are you sure?</p>
              <p>you want to delete this comment</p>
               <p>${allComments[i].content}</p>
            </div>
    
            <div class="delete-modal-buttons">
              <button data-close-id="no-delete-blog-comment-modal-${allComments[i]._id}">No</button>
              <button id="continue-delete-blog-comment-${allComments[i]._id}">Continue</button>
            </div>
          </div>`;

          mainContainer.appendChild(deleteCommentModal);

          // Add event listener to the continue button
          const continueButton = document.getElementById(
            `continue-delete-blog-comment-${allComments[i]._id}`
          );
          continueButton.addEventListener("click", () =>
            deleteBlogComment(allComments[i]._id)
          );

          //open and close comment delete blog model
          const openDeleteBlogCommentModel = document.getElementById(
            `open-delete-blog-comment-model-${allComments[i]._id}`
          );

          openDeleteBlogCommentModel.addEventListener("click", () => {
            document.getElementById(
              `comments-blog-modal-${allComments[i].blog}`
            ).style.display = "none";

            deleteCommentModal.style.display = "flex";
          });

          const closeDeleteBlogCommentModel = document.querySelector(
            `[data-close-id="close-delete-blog-comment-modal-${allComments[i]._id}"]`
          );

          const noDeleteBlogCommentModel = document.querySelector(
            `[data-close-id="no-delete-blog-comment-modal-${allComments[i]._id}"]`
          );

          closeDeleteBlogCommentModel.addEventListener("click", () => {
            deleteCommentModal.style.display = "none";
          });

          noDeleteBlogCommentModel.addEventListener("click", () => {
            deleteCommentModal.style.display = "none";
          });
        }
      }, 3000);
    })
    .catch((error) => {
      console.error("An error occurred while populating comments:", error);
    });
};

makeDeleteCommentModels();

//save blog function
const saveBlogButton = document.getElementById("save-blog-button");
const saveNewBlog = async () => {
  const form = document.forms["add-blog-form"];

  //get form values
  const title = form["title"].value;
  const poster =
    form["poster"].files.length > 0 ? form["poster"].files[0] : null;
  const content = form["content"].value;

  if (!title || title.trim() === "") {
    alert("Please enter a title.");
    return;
  }

  if (!content || content.trim() === "") {
    alert("Please enter content.");
    return;
  }

  if (!poster) {
    alert("Please choose a poster.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", poster);
  formData.append("content", content);

  const token = localStorage.getItem("dauth");
  const url = `https://portfolioapi-production-ec62.up.railway.app/api/blogs`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  const isLoading = document.createElement("div");
  isLoading.classList.add("loader");
  saveBlogButton.innerHTML = "";
  saveBlogButton.appendChild(isLoading);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      saveBlogButton.innerHTML = "save blog";
      const resError = await response.json();
      showToaster(resError.error, 5000);
    }

    if (!response.ok && response.status === 403) {
      saveBlogButton.innerHTML = "save blog";
      const resError = await response.json();
      showToaster(resError.error, 2000);
      localStorage.removeItem("dauth");
      localStorage.removeItem("dref");
      setTimeout(() => {
        window.location.href = "login/login.html";
      }, 2000);
    }

    if (response.ok) {
      saveBlogButton.innerHTML = "save blog";
      const data = await response.json();
      //close modal
      blogModal.style.display = "none";

      // window.location.reload();
      const blogMessage = document.getElementById("blog-message");
      blogMessage.innerHTML = data.message;
      blogMessage.classList.add("added-message");

      setTimeout(() => {
        blogMessage.innerHTML = "";
        blogMessage.classList.remove("added-message");
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    saveBlogButton.innerHTML = "save blog";
    console.log(error);
  }
};

saveBlogButton.addEventListener("click", saveNewBlog);

//edit blog function
const editBlog = async (blogId) => {
  const form = document.forms[`edit-blog-form-${blogId}`];

  //get form values
  const title = form["title"].value;
  const content = form["content"].value;
  if (!title || title.trim() === "") {
    alert("Please enter a title.");
    return;
  }

  if (!content || content.trim() === "") {
    alert("Please enter content.");
    return;
  }

  const blogData = {
    title,
    content,
  };

  const token = localStorage.getItem("dauth");
  const url = `https://portfolioapi-production-ec62.up.railway.app/api/blogs/${blogId}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  };

  const editBlogBtn = document.getElementById(`edit-blog-btn-${blogId}`);
  const isLoading = document.createElement("div");
  isLoading.classList.add("loader");
  editBlogBtn.innerHTML = "";
  editBlogBtn.appendChild(isLoading);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      editBlogBtn.innerHTML = "edit blog";
      const resError = await response.json();
      showToaster(resError.error, 5000);
    }

    if (!response.ok && response.status === 403) {
      saveBlogButton.innerHTML = "edit blog";
      const resError = await response.json();
      showToaster(resError.error, 2000);
      localStorage.removeItem("dauth");
      localStorage.removeItem("dref");
      setTimeout(() => {
        window.location.href = "login/login.html";
      }, 2000);
    }

    if (response.ok) {
      editBlogBtn.innerHTML = "edit blog";
      const data = await response.json();

      //current opened modal
      const currentOpenedModal = document.getElementById(
        `edit-blog-modal-${blogId}`
      );
      currentOpenedModal.style.display = "none";

      const blogMessage = document.getElementById("blog-message");
      blogMessage.innerHTML = data.message;
      blogMessage.classList.add("added-message");

      setTimeout(() => {
        blogMessage.innerHTML = "";
        blogMessage.classList.remove("added-message");
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    editBlogBtn.innerHTML = "edit blog";
    console.log(error);
  }
};

//delete blog function
const deleteBlog = async (blogId) => {
  const token = localStorage.getItem("dauth");
  const url = `https://portfolioapi-production-ec62.up.railway.app/api/blogs/${blogId}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteBlogBtn = document.getElementById(`delete-blog-${blogId}`);
  const isLoading = document.createElement("div");
  isLoading.classList.add("loader");
  deleteBlogBtn.innerHTML = "";
  deleteBlogBtn.appendChild(isLoading);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      deleteBlogBtn.innerHTML = "Continue";
      const resError = await response.json();
      showToaster(resError.error, 5000);
    }

    if (response.ok) {
      deleteBlogBtn.innerHTML = "Continue";
      const data = await response.json();
      //current opened modal
      const currentOpenedModal = document.getElementById(
        `delete-blog-modal-${blogId}`
      );
      currentOpenedModal.style.display = "none";

      const blogMessage = document.getElementById("blog-message");
      blogMessage.innerHTML = data.message;
      blogMessage.classList.add("delete-message");

      setTimeout(() => {
        blogMessage.innerHTML = "";
        blogMessage.classList.remove("delete-message");
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    deleteBlogBtn.innerHTML = "Continue";
    console.log(error);
  }
};

//delete blog comment
const deleteBlogComment = async (commentId) => {
  const token = localStorage.getItem("dauth");
  const url = `https://portfolioapi-production-ec62.up.railway.app/api/comments/${commentId}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteBlogCommentBtn = document.getElementById(
    `continue-delete-blog-comment-${commentId}`
  );
  const isLoading = document.createElement("div");
  isLoading.classList.add("loader");
  deleteBlogCommentBtn.innerHTML = "";
  deleteBlogCommentBtn.appendChild(isLoading);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      deleteBlogCommentBtn.innerHTML = "Continue";
      const resError = await response.json();
      showToaster(resError.error, 5000);
    }

    if (response.ok) {
      deleteBlogCommentBtn.innerHTML = "Continue";
      const data = await response.json();
      //current opened modal
      const currentOpenedModal = document.getElementById(
        `delete-blog-comment-modal-${commentId}`
      );
      currentOpenedModal.style.display = "none";

      const blogMessage = document.getElementById("blog-message");
      blogMessage.innerHTML = data.message;
      blogMessage.classList.add("added-message");

      setTimeout(() => {
        blogMessage.innerHTML = "";
        blogMessage.classList.remove("added-message");
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    deleteBlogCommentBtn.innerHTML = "Continue";
    console.log(error);
  }
};

const setLikeCommentsandViewNumbers = async () => {
  const posts = document.getElementById("blogs-numbers");
  const comments = document.getElementById("comments-number");
  const likes = document.getElementById("likes-number");

  //isLoading
  const isLoadingPosts = document.createElement("div");
  isLoadingPosts.classList.add("loader-1");

  const isLoadingComments = document.createElement("div");
  isLoadingComments.classList.add("loader-1");

  const isLoadingLikes = document.createElement("div");
  isLoadingLikes.classList.add("loader-1");

  //posts
  posts.innerHTML = "";
  posts.appendChild(isLoadingPosts);
  //comments
  comments.innerHTML = "";
  comments.appendChild(isLoadingComments);
  //likes
  likes.innerHTML = "";
  likes.appendChild(isLoadingLikes);

  // get blogs from api
  const res = await fetch(
    "https://portfolioapi-production-ec62.up.railway.app/api/blogs"
  );
  const data = await res.json();
  let blogs = data.blogsWithComments;

  posts.removeChild(isLoadingPosts);
  posts.innerHTML = blogs.length;

  let allComments = [];
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].comments.length === 0) {
      continue;
    }
    for (let j = 0; j < blogs[i].comments.length; j++) {
      allComments.push(blogs[i].comments[j]);
    }
  }

  comments.removeChild(isLoadingComments);
  comments.innerHTML = allComments.length;

  let likesNumber = 0;
  for (let i = 0; i < blogs.length; i++) {
    likesNumber += blogs[i].likes;
  }

  likes.removeChild(isLoadingLikes);
  likes.innerHTML = likesNumber;
};
setLikeCommentsandViewNumbers();

const mostLikedPost = async () => {
  const mostLikedDiv = document.querySelector(".recent-blogs-left");
  const isLoading = document.createElement("div");
  isLoading.classList.add("loader-1");
  mostLikedDiv.innerHTML = "";
  mostLikedDiv.appendChild(isLoading);
  // get blogs from api
  const res = await fetch(
    "https://portfolioapi-production-ec62.up.railway.app/api/blogs"
  );
  const data = await res.json();
  let blogs = data.blogsWithComments;

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  if (blogs.length === 0) {
    mostLikedDiv.removeChild(isLoading);
    const noBlogs = document.createElement("p");
    noBlogs.classList.add("no-blog");
    noBlogs.textContent = "no blogs at the moment";
    mostLikedDiv.appendChild(noBlogs);
  } else {
    mostLikedDiv.removeChild(isLoading);
    for (let i = 0; i < sortedBlogs.length; i++) {
      const likesBlogCard = document.createElement("div");
      likesBlogCard.classList.add("recent-blog-left-card");
      const blogTitle = document.createElement("p");
      blogTitle.innerHTML = sortedBlogs[i].title;

      const blogLikes = document.createElement("p");
      blogLikes.innerHTML = sortedBlogs[i].likes;

      likesBlogCard.appendChild(blogTitle);
      likesBlogCard.appendChild(blogLikes);

      mostLikedDiv.appendChild(likesBlogCard);
    }
  }
};
mostLikedPost();

function showToaster(message, seconds = 3000) {
  const toastP = document.getElementById("dashboard-toast");
  toastP.innerText = message;
  toastP.classList.add("dashboard-toast");

  setTimeout(() => {
    toastP.innerText = "";
    toastP.classList.remove("dashboard-toast");
  }, seconds);
}

const logoutButton = document.getElementById("logout");
const logoutHandler = async () => {
  const data = {
    token: localStorage.getItem("dref"),
  };
  const url =
    "https://portfolioapi-production-ec62.up.railway.app/api/users/logout";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const isLoading = document.createElement("div");
  isLoading.classList.add("loader-1");
  logoutButton.innerHTML = "";
  logoutButton.appendChild(isLoading);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      logoutButton.innerHTML = "Logout";
      const resError = await response.json();
      localStorage.removeItem("dauth");
      localStorage.removeItem("dref");
      window.location.href = "/login/login.html";
    }

    if (response.ok) {
      logoutButton.innerHTML = "Logout";
      const data = await response.json();
      showToaster(data.message);
      localStorage.removeItem("dauth");
      localStorage.removeItem("dref");
      showToaster(data.message);
      setTimeout(() => {
        window.location.href = "/login/login.html";
      }, 3000);
    }
  } catch (error) {
    logoutButton.innerHTML = "Logout";
    console.log(error);
  }
};

logoutButton.addEventListener("click", logoutHandler);

const checkUser = () => {
  const token = localStorage.getItem("dauth");

  if (!token) {
    window.location.href = "/login/login.html";
  }
};
checkUser();
