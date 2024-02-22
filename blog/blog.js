const loadBlog = () => {
  const currentLocationHref = window.location.href;

  const url = new URL(currentLocationHref);

  const blogId = url.searchParams.get("id");

  // get blogs from local storage
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const currentBlog = blogs.find((blog) => blog.id === parseInt(blogId, 10));

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

  const likes = document.getElementById("likes");
  likes.innerHTML = currentBlog.likes;

  const views = document.getElementById("views");
  views.innerHTML = currentBlog.views;

  const commentNumber = document.getElementById("comment-number");
  commentNumber.innerHTML = currentBlog.comments.length;
};

loadBlog();
