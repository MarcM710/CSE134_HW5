export function initializeHttpFile() {
    const idElement = document.getElementById('article_id');
    const nameElement = document.getElementById('article_name');
    const bodyElement = document.getElementById('article_body');
    const dateElement = document.getElementById('article_date');
    const outputElement = document.getElementById('response');

    const postEndpoint = 'https://httpbin.org/post'
    const getEndpoint = 'https://httpbin.org/get'
    const putEndpoint = 'https://httpbin.org/put'
    const delEndpoint = 'https://httpbin.org/delete'

    dateElement.value = new Date().toString();
// ---------------------------------------------------------------------------------------------
    function showLoader() {
        outputElement.innerHTML = `<div class="loader"></div>`;
    }

// Use asynchronous functions to return allow the output to populate once response is received
// ---------------------------------------------------------------------------------------------
    document.getElementById('getButton').addEventListener('click', getFunc);
    async function getFunc() {
        try {
            showLoader()
            const id = idElement.value;
            const response = await fetch(getEndpoint + `?id=${id}`);
            const responseData = JSON.stringify(await response.json(), null, 2);

            outputElement.innerHTML = `<pre class="response">${responseData}</pre>`;
        } catch (error) {
            console.error("Error occurred when calling getData(): ", error);
        }
    }
// ---------------------------------------------------------------------------------------------
    document.getElementById('postButton').addEventListener('click', postFunc);
    async function postFunc() {
        try {
            showLoader()
            const id = idElement.value;
            const articleName = nameElement.value;
            const articleBody = bodyElement.value;
            const date = dateElement.value;

            const response = await fetch(postEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, articleName, articleBody, date }),
            });

            const responseData = JSON.stringify(await response.json(), null, 2);
            outputElement.innerHTML = `<pre class="response">${responseData}</pre>`;
        } catch (error) {
            console.error("Error occurred when calling postData(): ", error);
        }
    }
// ---------------------------------------------------------------------------------------------
    document.getElementById('putButton').addEventListener('click', putFunc);
    async function putFunc() {
        try {
            showLoader()
            const id = idElement.value;
            const articleName = nameElement.value;
            const articleBody = bodyElement.value;
            const date = dateElement.value;

            const response = await fetch(putEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, articleName, articleBody, date }),
            });

            const responseData = JSON.stringify(await response.json(), null, 2);
            outputElement.innerHTML = `<pre class="response">${responseData}</pre>`;
        } catch (error) {
            console.error("Error occurred when calling putData(): ", error);
        }
    }
// ---------------------------------------------------------------------------------------------
    document.getElementById('deleteButton').addEventListener('click', deleteFunc);
    async function deleteFunc() {
        try {
            showLoader()
            const id = idElement.value;
            const response = await fetch(delEndpoint + `?id=${id}`, {
                method: 'DELETE',
            });

            const responseData = JSON.stringify(await response.json(), null, 2);
            outputElement.innerHTML = `<pre class="response">${responseData}</pre>`;
        } catch (error) {
            console.error("Error occurred when calling deleteData(): ", error);
        }
    }
}