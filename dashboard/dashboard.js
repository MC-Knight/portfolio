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

// open and close edit blog model
const editBlogModal = document.getElementById("edit-blog-modal");
const openEditBlogModel = document.getElementById("open-edit-blog-model");
const closeEditBlogModel = document.querySelector(
  '[data-close-id="close-edit-blog-modal"]'
);

openEditBlogModel.addEventListener("click", () => {
  editBlogModal.style.display = "flex";
});

closeEditBlogModel.addEventListener("click", () => {
  editBlogModal.style.display = "none";
});

// open and close delete blog model
const deleteBlogModal = document.getElementById("delete-blog-modal");
const openDeleteBlogModel = document.getElementById("open-delete-blog-model");
const closeDeleteBlogModel = document.querySelector(
  '[data-close-id="close-delete-blog-modal"]'
);
const noDeleteBlogModel = document.querySelector(
  '[data-close-id="no-delete-blog-modal"]'
);

openDeleteBlogModel.addEventListener("click", () => {
  deleteBlogModal.style.display = "flex";
});

closeDeleteBlogModel.addEventListener("click", () => {
  deleteBlogModal.style.display = "none";
});

noDeleteBlogModel.addEventListener("click", () => {
  deleteBlogModal.style.display = "none";
});

// open and close comment blog model
const commentBlogModal = document.getElementById("comments-blog-modal");
const openCommentBlogModel = document.getElementById(
  "open-comments-blog-model"
);
const closeCommentBlogModel = document.querySelector(
  '[data-close-id="close-comments-blog-modal"]'
);

openCommentBlogModel.addEventListener("click", () => {
  commentBlogModal.style.display = "flex";
});

closeCommentBlogModel.addEventListener("click", () => {
  commentBlogModal.style.display = "none";
});

// open and close comment delete blog model
const deleteBlogCommentModal = document.getElementById(
  "delete-blog-comment-modal"
);
const openDeleteBlogCommentModel = document.getElementById(
  "open-delete-blog-comment-model"
);
const closeDeleteBlogCommentModel = document.querySelector(
  '[data-close-id="close-delete-blog-comment-modal"]'
);
const noDeleteBlogCommentModel = document.querySelector(
  '[data-close-id="no-delete-blog-comment-modal"]'
);

openDeleteBlogCommentModel.addEventListener("click", () => {
  commentBlogModal.style.display = "none";
  deleteBlogCommentModal.style.display = "flex";
});

closeDeleteBlogCommentModel.addEventListener("click", () => {
  commentBlogModal.style.display = "flex";
  deleteBlogCommentModal.style.display = "none";
});

noDeleteBlogCommentModel.addEventListener("click", () => {
  commentBlogModal.style.display = "flex";
  deleteBlogCommentModal.style.display = "none";
});
