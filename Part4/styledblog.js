
displayStyledBlogPosts();
//----------------------------------------------------------------------
function getStyledBlogPosts() {
    const styledBlogPosts = JSON.parse(localStorage.getItem("styledBlogPosts"));
    return styledBlogPosts ? styledBlogPosts : [];
}
//----------------------------------------------------------------------
export function displayStyledBlogPosts() {
    const tableBody = document.getElementById("blogTableBody");
    const styledBlogPosts = getStyledBlogPosts();
    tableBody.innerHTML = "";

    for (let i = 0; i < styledBlogPosts.length; i++) {
        const styledRow = tableBody.insertRow(-1);
        const title = styledRow.insertCell(0);
        const date = styledRow.insertCell(1);
        const summary = styledRow.insertCell(2);
        const actions = styledRow.insertCell(3);

        title.textContent = styledBlogPosts[i].title;
        date.textContent = styledBlogPosts[i].date;
        summary.textContent = styledBlogPosts[i].summary;

        // add delete and edit buttons with icons for each blog post
        const editBtn = document.createElement("button");
        const editIcon = document.createElement("span");
        editIcon.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.appendChild(editIcon);
        editBtn.addEventListener("click", createStyledEditBtn(i));
        actions.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener("click", createStyledDeleteBtn(i));
        actions.appendChild(deleteBtn);
    }
}
//----------------------------------------------------------------------
export function addStyledBtn(){
    document.getElementById("addBtn").addEventListener("click", function() {
        const blogDialog = document.getElementById("blogDialog");
        blogDialog.showModal();
    });
}
//----------------------------------------------------------------------
export function cancelStyledBtn(){
    document.getElementById("cancelBtn").addEventListener("click", function() {
        const blogDialog = document.getElementById("blogDialog");
        blogDialog.close();
    });
}
//----------------------------------------------------------------------
export function addStyledRecord() {
    document.getElementById("blogForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const styledBlogPosts = getStyledBlogPosts();
        const titleInput = document.getElementById("title");
        const dateInput = document.getElementById("date");
        const summaryInput = document.getElementById("summary");
        const newPost = {
            title: titleInput.value,
            date: dateInput.value,
            summary: summaryInput.value,
        };

        styledBlogPosts.push(newPost);
        localStorage.setItem("styledBlogPosts", JSON.stringify(styledBlogPosts));

        titleInput.value = "";
        dateInput.value = "";
        summaryInput.value = "";

        const blogDialog = document.getElementById("blogDialog");
        blogDialog.close();

        displayStyledBlogPosts();
    });
}
//----------------------------------------------------------------------
export function createStyledDeleteBtn(index) {
    return function () {
        const styledBlogPosts = getStyledBlogPosts();
        styledBlogPosts.splice(index, 1);
        localStorage.setItem("styledBlogPosts", JSON.stringify(styledBlogPosts));
        displayStyledBlogPosts();
    };
}
//----------------------------------------------------------------------
export function createStyledEditBtn(index) {
    return function () {
        const styledBlogPosts = getStyledBlogPosts();
        const editDialog = document.createElement("dialog");

        editDialog.innerHTML = `
          <form>
            <label for="title">Blog Title:</label>
            <input type="text" id="title" value="${styledBlogPosts[index].title}" required><br/>
            <label for="date">Post Date:</label>
            <input type="date" id="date" value="${styledBlogPosts[index].date}" required><br/>
            <label for="summary">Post Summary:</label>
            <textarea id="summary" required>${styledBlogPosts[index].summary}</textarea><br/>
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
            styledBlogPosts[index].title = editForm.querySelector("#title").value;
            styledBlogPosts[index].date = editForm.querySelector("#date").value;
            styledBlogPosts[index].summary = editForm.querySelector("#summary").value;
            localStorage.setItem("styledBlogPosts", JSON.stringify(styledBlogPosts));
            displayStyledBlogPosts();
            editDialog.close();
            document.body.removeChild(editDialog);
        });
    };
}
//----------------------------------------------------------------------