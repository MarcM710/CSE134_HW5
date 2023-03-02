displayBlogPosts();
//----------------------------------------------------------------------
function getBlogPosts() {
    const posts = JSON.parse(localStorage.getItem("blogPosts"));
    return posts ? posts : [];
}
//----------------------------------------------------------------------
export function displayBlogPosts() {
    const tableBody = document.getElementById("blogTableBody");
    const blogPosts = getBlogPosts();
    tableBody.innerHTML = "";

    for (let i = 0; i < blogPosts.length; i++) {
        const row = tableBody.insertRow(-1);
        const title = row.insertCell(0);
        const date = row.insertCell(1);
        const summary = row.insertCell(2);
        const actions = row.insertCell(3);

        title.textContent = blogPosts[i].title;
        date.textContent = blogPosts[i].date;
        summary.textContent = blogPosts[i].summary;

        // add delete and edit buttons for each blog post
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", createEditBtn(i));
        actions.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", createDeleteBtn(i));
        actions.appendChild(deleteBtn);
    }
}
//----------------------------------------------------------------------
export function addBtn(){
    document.getElementById("addBtn").addEventListener("click", function() {
        const blogDialog = document.getElementById("blogDialog");
        blogDialog.showModal();
    });
}
//----------------------------------------------------------------------
export function cancelBtn(){
    document.getElementById("cancelBtn").addEventListener("click", function() {
        const blogDialog = document.getElementById("blogDialog");
        blogDialog.close();
    });
}
//----------------------------------------------------------------------
export function addRecord() {
    document.getElementById("blogForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const blogPosts = getBlogPosts();
        const titleInput = document.getElementById("title");
        const dateInput = document.getElementById("date");
        const summaryInput = document.getElementById("summary");
        const newPost = {
            title: titleInput.value,
            date: dateInput.value,
            summary: summaryInput.value,
        };

        blogPosts.push(newPost);
        localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

        titleInput.value = "";
        dateInput.value = "";
        summaryInput.value = "";

        const blogDialog = document.getElementById("blogDialog");
        blogDialog.close();
        displayBlogPosts();
    });
}
//----------------------------------------------------------------------
export function createDeleteBtn(index) {
    return function () {
        const posts = getBlogPosts();
        posts.splice(index, 1);
        localStorage.setItem("blogPosts", JSON.stringify(posts));
        displayBlogPosts();
    };
}
//----------------------------------------------------------------------
export function createEditBtn(index) {
    return function () {
        const posts = getBlogPosts();
        const editDialog = document.createElement("dialog");

        editDialog.innerHTML = `
          <form>
            <label for="title">Blog Title:</label>
            <input type="text" id="title" value="${posts[index].title}" required><br/>
            <label for="date">Post Date:</label>
            <input type="date" id="date" value="${posts[index].date}" required><br/>
            <label for="summary">Post Summary:</label>
            <textarea id="summary" required>${posts[index].summary}</textarea><br/>
            <button type="button" id="cancel">Cancel</button>
            <button type="submit">Save</button>
          </form>
        `;

        document.body.appendChild(editDialog);
        editDialog.showModal();

        const cancelButton = editDialog.querySelector("#cancel");
        cancelButton.addEventListener("click", function () {
            editDialog.close();
            document.body.removeChild(editDialog);
        });

        const editForm = editDialog.querySelector("form");
        editForm.addEventListener("submit", function (event) {
            event.preventDefault();
            posts[index].title = editForm.querySelector("#title").value;
            posts[index].date = editForm.querySelector("#date").value;
            posts[index].summary = editForm.querySelector("#summary").value;
            localStorage.setItem("blogPosts", JSON.stringify(posts));
            displayBlogPosts();
            editDialog.close();
            document.body.removeChild(editDialog);
        });
    };
}
//----------------------------------------------------------------------