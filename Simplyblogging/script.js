const blogList = document.getElementById("blogList")
window.addEventListener('DOMContentLoaded', (event) => {

    const savedBlogs = localStorage.getItem('blog');
    var blogs = JSON.parse(savedBlogs)
    if(blogs!=null){
    for(var i=0;i<blogs.length;i++)
    {
        list = document.createElement("ul")
        blogList.appendChild(list)
        var node1 = document.createElement("LI"); 
        node1.textContent="Title: "+blogs[i][0] 
        list.appendChild(node1); 
        var node2 = document.createElement("LI"); 
        node2.textContent="Article: "+blogs[i][1] 
        list.appendChild(node2);              
        var node3 = document.createElement("LI");  
        node3.textContent="Image: "+blogs[i][2]
        list.appendChild(node3);
        list.classList.add("lists");
    }
}
});
function printBlogs() {
    const title_input = document.getElementById('title_input').value
    const article_input = document.getElementById('article_input').value
    const image_input = document.getElementById('image_input').value

    if(title_input != "" && article_input != "" || image_input != "") {
    let data = [title_input, article_input, image_input];
    const savedBlogs = localStorage.getItem('blog') || '[]';
    var blogs = JSON.parse(savedBlogs)
    blogs.push(data) // add the result

    document.querySelector('#blogList').innerHTML = "<li>" + blogs[0][0] + "</li> <li>" + blogs[0][1] + "</li> <li>" + blogs[0][2] + "</li>";

    localStorage.setItem('blog', JSON.stringify(blogs)) 
    blogList.innerHTML = ""
    for(var i=0;i<blogs.length;i++)
    {
        list = document.createElement("ul")
        blogList.appendChild(list)
        var node1 = document.createElement("LI"); 
        node1.textContent="Title: "+blogs[i][0] 
        list.appendChild(node1); 
        var node2 = document.createElement("LI"); 
        node2.textContent="Article: "+blogs[i][1] 
        list.appendChild(node2);              
        var node3 = document.createElement("LI");  
        node3.textContent="Image: "+blogs[i][2]
        list.appendChild(node3);
        list.classList.add("lists");
    }
}
else {
    alert("One or more fields are missing !")
}
}

const btn = document.getElementById("addBlog")
btn.addEventListener("click", printBlogs);

window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');
            img.onload = () => {
                URL.revokeObjectURL(img.src); // no longer needed, free memory
            }

            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
});