type BlogComment = {
  id: number;
  content: string;
  blogId: number;
};

type SingleBlog = {
  id: number;
  title: string;
  poster: string;
  content: string;
  date: string;
  comments: BlogComment[];
  views: number;
  likes: number;
  isLiked: boolean;
  isViewed: boolean;
};
const currentLocationHref = window.location.href;
const url = new URL(currentLocationHref);
const blogIdParam = url.searchParams.get("id");

const loadBlog = (currentBlog: SingleBlog) => {
  document.title = currentBlog.title;

  const blogImagePoster = document.getElementById(
    "blog-image-poster"
  ) as HTMLImageElement;
  if (blogImagePoster !== null)
    blogImagePoster.src = `../posters/${currentBlog.poster}`;

  const blogTitle: HTMLElement | null =
    document.querySelector(".blog-main-title");
  if (blogTitle !== null) blogTitle.innerHTML = currentBlog.title;

  const blogDate: HTMLElement | null = document.getElementById("blog-date");
  if (blogDate !== null) blogDate.innerHTML = `${currentBlog.date}`;

  const blogContent: HTMLElement | null =
    document.querySelector(".blog-main-content");
  if (blogContent !== null) blogContent.innerHTML = currentBlog.content;

  const likes: HTMLElement | null = document.getElementById("like-modal");
  if (likes !== null) {
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
  }

  const views: HTMLElement | null = document.getElementById("views");
  if (views !== null) views.innerHTML = currentBlog.views.toString();

  const commentNumber: HTMLElement | null =
    document.getElementById("comment-number");
  if (commentNumber !== null)
    commentNumber.innerHTML = currentBlog.comments.length.toString();
};

const loadComment = (currentBlog: SingleBlog) => {
  const currentBlogComments = currentBlog.comments;

  const commentDiv: HTMLElement | null =
    document.querySelector(".comment-contents");

  if (currentBlogComments.length === 0) {
    const noComments: HTMLParagraphElement = document.createElement("p");
    noComments.style.width = "100%";
    noComments.style.textAlign = "left";
    noComments.textContent = "no comments at the moment";
    if (commentDiv !== null) commentDiv.appendChild(noComments);
  } else {
    for (let i = 0; i < currentBlogComments.length; i++) {
      const newCommentDiv: HTMLDivElement = document.createElement("div");
      newCommentDiv.classList.add("comment-card");
      const newCommentContent: HTMLParagraphElement =
        document.createElement("p");
      newCommentContent.innerHTML = currentBlogComments[i].content;
      newCommentDiv.appendChild(newCommentContent);

      if (commentDiv !== null) commentDiv.append(newCommentDiv);
    }
  }
};

const updateViews = (currentBlog: SingleBlog, blogId: number) => {
  if (!currentBlog.isViewed) {
    let blogs: SingleBlog[] = JSON.parse(localStorage.getItem("blogs") || "[]");
    const editedBlog = blogs.find((b) => b.id == blogId);

    if (editedBlog) {
      editedBlog.views += 1;
      editedBlog.isViewed = true;
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }
};

if (blogIdParam !== null) {
  const blogId = parseInt(blogIdParam, 10);
  let blogs: SingleBlog[] = JSON.parse(localStorage.getItem("blogs") || "[]");

  const currentBlog = blogs.find((blog) => blog.id === blogId);

  if (currentBlog == null) {
    window.location.href = "/index.html";
    alert("oops blog not found");
  }

  if (currentBlog) {
    loadBlog(currentBlog);
    loadComment(currentBlog);
    updateViews(currentBlog, blogId);
  } else {
    console.error("Blog with the specified ID not found.");
  }
} else {
  console.error("Blog ID parameter not found in the URL.");
}

const commentModal = () => {
  const modal: HTMLElement | null = document.querySelector(".modal");

  if (modal !== null) {
    modal.style.display = "flex";
    const modalStyle = window.getComputedStyle(modal);

    if (modalStyle.display === "flex") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.body.style.overflowY = "hidden";
    }
  }
};

const openModal: HTMLElement | null =
  document.getElementById("open-comment-modal");
if (openModal !== null) {
  openModal.style.cursor = "pointer";
  openModal.addEventListener("click", commentModal);
}

const closeCommentModal = () => {
  const modal: HTMLElement | null = document.querySelector(".modal");

  if (modal !== null) {
    modal.style.display = "none";
    const modalStyle = window.getComputedStyle(modal);

    if (modalStyle.display === "none") {
      document.body.style.overflowY = "auto";
    }
  }
};

const closeModal: HTMLElement | null = document.querySelector(
  '[data-close-id="close-comments-modal"]'
);
if (closeModal !== null) {
  closeModal.addEventListener("click", closeCommentModal);
}

const addcomment = () => {
  if (blogIdParam !== null) {
    const blogId = parseInt(blogIdParam, 10);

    // get blogs from local storage
    let blogs: SingleBlog[] = JSON.parse(localStorage.getItem("blogs") || "[]");
    const currentBlog = blogs.find((blog) => blog.id === blogId);

    const form = document.forms.namedItem(
      "add-comment-to-blog"
    ) as HTMLFormElement;

    //get form values
    const contentField = form["comment"] as unknown as HTMLTextAreaElement;

    if (contentField.value.trim() === null) {
      alert("Please enter a comment.");
      return;
    }

    //new comment
    if (currentBlog) {
      const newComment: BlogComment = {
        id: blogId * 10 + currentBlog.comments.length,
        content: contentField.value.trim(),
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
    }
  }
};

const addCommentBtn: HTMLElement | null = document.getElementById(
  "add-comment-to-blog"
);
if (addCommentBtn !== null) addCommentBtn.addEventListener("click", addcomment);

const likeBlog = () => {
  if (blogIdParam !== null) {
    const blogId = parseInt(blogIdParam, 10);

    // get blogs from local storage
    let blogs: SingleBlog[] = JSON.parse(localStorage.getItem("blogs") || "[]");
    const currentBlog = blogs.find((blog) => blog.id === blogId);

    if (currentBlog) {
      if (!currentBlog.isLiked) {
        let blogs: SingleBlog[] = JSON.parse(
          localStorage.getItem("blogs") || "[]"
        );
        const editedBlog = blogs.find((b) => b.id == blogId);
        if (editedBlog) {
          editedBlog.likes += 1;
          editedBlog.isLiked = true;
          localStorage.setItem("blogs", JSON.stringify(blogs));
          window.location.reload();
        }
      } else {
        let blogs: SingleBlog[] = JSON.parse(
          localStorage.getItem("blogs") || "[]"
        );
        const editedBlog = blogs.find((b) => b.id == blogId);
        if (editedBlog) {
          editedBlog.likes -= 1;
          editedBlog.isLiked = false;
          localStorage.setItem("blogs", JSON.stringify(blogs));
          window.location.reload();
        }
      }
    }
  }
};

const likeBtn: HTMLElement | null = document.getElementById("like-modal");
if (likeBtn !== null) likeBtn.addEventListener("click", likeBlog);
