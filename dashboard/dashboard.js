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
