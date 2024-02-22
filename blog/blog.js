const currentLocationHref = window.location.href;
const url = new URL(currentLocationHref);
const blogId = url.searchParams.get("id");
// get blogs from local storage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

const currentBlog = blogs.find((blog) => blog.id === parseInt(blogId, 10));

const loadBlog = () => {
  if (!currentBlog) {
    alert("oops blog not found");
    return;
  }

  document.title = currentBlog.title;

  const blogImagePoster = document.getElementById("blog-image-poster");
  blogImagePoster.src = `../posters/${currentBlog.poster}`;

  const blogTitle = document.querySelector(".blog-main-title");
  blogTitle.innerHTML = currentBlog.title;

  const blogDate = document.getElementById("blog-date");
  blogDate.innerHTML = `${currentBlog.date}`;

  const blogContent = document.querySelector(".blog-main-content");
  blogContent.innerHTML = currentBlog.content;

  const likes = document.getElementById("like-modal");
  likes.style.cursor = "pointer";
  if (currentBlog.isLiked) {
    likes.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13.2222C19.49 11.6 21 9.65556 21 7.11111C21 5.49034 20.4205 3.93596 19.3891 2.7899C18.3576 1.64385 16.9587 1 15.5 1C13.74 1 12.5 1.55556 11 3.22222C9.5 1.55556 8.26 1 6.5 1C5.04131 1 3.64236 1.64385 2.61091 2.7899C1.57946 3.93596 1 5.49034 1 7.11111C1 9.66667 2.5 11.6111 4 13.2222L11 21L18 13.2222Z" fill="#F70000" stroke="#F70000" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> ${currentBlog.likes}`;
  } else {
    likes.innerHTML = ` <svg
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3 10.1667C17.641 8.95 19 7.49167 19 5.58333C19 4.36776 18.4785 3.20197 17.5502 2.34243C16.6219 1.48289 15.3628 1 14.05 1C12.466 1 11.35 1.41667 10 2.66667C8.65 1.41667 7.534 1 5.95 1C4.63718 1 3.37813 1.48289 2.44982 2.34243C1.52152 3.20197 1 4.36776 1 5.58333C1 7.5 2.35 8.95833 3.7 10.1667L10 16L16.3 10.1667Z"
      stroke="black"
      stroke-opacity="0.6"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> ${currentBlog.likes}`;
  }

  const views = document.getElementById("views");
  views.innerHTML = currentBlog.views;

  const commentNumber = document.getElementById("comment-number");
  commentNumber.innerHTML = currentBlog.comments.length;
};

loadBlog();

const commentModal = () => {
  const modal = document.querySelector(".modal");

  modal.style.display = "flex";
  const modalStyle = window.getComputedStyle(modal);

  if (modalStyle.display === "flex") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.style.overflowY = "hidden";
  }
};

const openModal = document.getElementById("open-comment-modal");
openModal.style.cursor = "pointer";
openModal.addEventListener("click", commentModal);

const closeCommentModal = () => {
  const modal = document.querySelector(".modal");

  modal.style.display = "none";
  const modalStyle = window.getComputedStyle(modal);

  if (modalStyle.display === "none") {
    document.body.style.overflowY = "auto";
  }
};

const closeModal = document.querySelector(
  '[data-close-id="close-comments-modal"]'
);
closeModal.addEventListener("click", closeCommentModal);

const loadComment = () => {
  const currentBlogComments = currentBlog.comments;

  const commentDiv = document.querySelector(".comment-contents");

  if (currentBlogComments.length === 0) {
    const noComments = document.createElement("p");
    noComments.style.width = "100%";
    noComments.style.textAlign = "left";
    noComments.textContent = "no comments at the moment";
    commentDiv.appendChild(noComments);
  } else {
    for (let i = 0; i < currentBlogComments.length; i++) {
      const newCommentDiv = document.createElement("div");
      newCommentDiv.classList.add("comment-card");
      const newCommentContent = document.createElement("p");
      newCommentContent.innerHTML = currentBlogComments[i].content;
      newCommentDiv.appendChild(newCommentContent);

      commentDiv.append(newCommentDiv);
    }
  }
};
loadComment();

const addcomment = () => {
  // get blogs from local storage
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const form = document.forms["add-comment-to-blog"];

  //get form values
  const content = form["comment"].value.trim();

  if (!content) {
    alert("Please enter a comment.");
    return;
  }

  //new comment
  const newComment = {
    id: blogId * 10 + currentBlog.comments.length,
    content: content,
    blogId: blogId,
  };

  const editedBlog = blogs.find((b) => b.id == blogId);

  if (editedBlog) {
    editedBlog.comments.push(newComment);
    //update localStorage blogs
    localStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.reload();
  } else {
    alert("oops something goes wrong");
  }
};

const addCommentBtn = document.getElementById("add-comment-to-blog");
addCommentBtn.addEventListener("click", addcomment);

const updateViews = () => {
  if (!currentBlog.isViewed) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const editedBlog = blogs.find((b) => b.id == blogId);
    editedBlog.views += 1;
    editedBlog.isViewed = true;
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
};
updateViews();

const likeBlog = () => {
  if (!currentBlog.isLiked) {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const editedBlog = blogs.find((b) => b.id == blogId);
    editedBlog.likes += 1;
    editedBlog.isLiked = true;
    localStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.reload();
  } else {
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const editedBlog = blogs.find((b) => b.id == blogId);
    editedBlog.likes -= 1;
    editedBlog.isLiked = false;
    localStorage.setItem("blogs", JSON.stringify(blogs));
    window.location.reload();
  }
};

const likeBtn = document.getElementById("like-modal");
likeBtn.addEventListener("click", likeBlog);
