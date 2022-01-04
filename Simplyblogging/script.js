const blogList = document.getElementById("blogList");

const reader = new FileReader();
savedImages = localStorage.getItem("image") || "[]";
images = JSON.parse(savedImages);
console.log(images);

window.addEventListener("DOMContentLoaded", (event) => {
  const savedBlogs = localStorage.getItem("blog");
  var blogs = JSON.parse(savedBlogs);
  if (blogs != null) {
    for (var i = 0; i < blogs.length; i++) {
      list = document.createElement("ul");
      blogList.appendChild(list);
      var node1 = document.createElement("LI");
      node1.textContent = "Title: " + blogs[i][0];
      list.appendChild(node1);
      var node2 = document.createElement("LI");
      node2.textContent = "Article: " + blogs[i][1];
      list.appendChild(node2);
      var node3 = document.createElement("img");
      //node3.setAttribute("src", "data:image/png;base64," + blogs[i][2]);
      node3.setAttribute("src", images[i]);
      //node3.setAttribute("alt", "Image");
      node3.setAttribute("width", "200");
      list.appendChild(node3);
      list.classList.add("lists");
    }
  }
});

function printBlogs() {
  const title_input = document.getElementById("title_input").value;
  const article_input = document.getElementById("article_input").value;

  if (title_input != "" && article_input != "") {
    let data = [title_input, article_input];
    const savedBlogs = localStorage.getItem("blog") || "[]";
    var blogs = JSON.parse(savedBlogs);
    blogs.push(data); // add the result

    const prevImg = document.querySelector("#img");
    //console.log(prevImg.getAttribute("src"));
    if (prevImg.getAttribute("src") == "") {
      console.log("Empty image");
      images.push("");
      localStorage.setItem("image", JSON.stringify(images));
      location.reload();
    }

    localStorage.setItem("blog", JSON.stringify(blogs));
    blogList.innerHTML = "";
    for (var i = 0; i < blogs.length; i++) {
      list = document.createElement("ul");
      blogList.appendChild(list);
      var node1 = document.createElement("LI");
      node1.textContent = "Title: " + blogs[i][0];
      list.appendChild(node1);
      var node2 = document.createElement("LI");
      node2.textContent = "Article: " + blogs[i][1];
      list.appendChild(node2);
      var node3 = document.createElement("img");
      node3.setAttribute("src", images[i]);
      //node3.setAttribute("alt", "Image");
      node3.setAttribute("width", "200");
      list.appendChild(node3);
      list.classList.add("lists");
      location.reload();
    }
  } else {
    alert("One or more fields are missing !");
  }
}

const btn = document.getElementById("addBlog");
btn.addEventListener("click", printBlogs);

var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

function previewFile() {
  const preview = document.querySelector("#img");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert Image file to Base64 String
      preview.src = reader.result;
      images.push(reader.result);
      localStorage.setItem("image", JSON.stringify(images));
      console.log(images);
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
