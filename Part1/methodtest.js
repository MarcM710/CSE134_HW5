export function initializeHttpFile() {
    const idElement = document.getElementById('id');
    const nameElement = document.getElementById('article_name');
    const bodyElement = document.getElementById('article_body');
    const dateElement = document.getElementById('article_date');
    const outputElement = document.getElementById('response');

    const endpoints = {
        get: 'https://httpbin.org/get',
        post: 'https://httpbin.org/post',
        put: 'https://httpbin.org/put',
        delete: 'https://httpbin.org/delete',
    };

    // Ensuring date element is current time/date, HTML handles elememnt is read only
    dateElement.value = new Date().toString();

    // function to handle response
    const fetchData = async (method, endpoint, body) => {
        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const responseData = JSON.stringify(await response.json(), null, 2);
            outputElement.innerHTML = `<pre class="response">${responseData}</pre>`;
        } catch (error) {
            console.error(`Error occurred when calling ${method}Data(): `, error);
        }
    };

    const showLoader = () => {
        outputElement.innerHTML = `<div class="loader"></div>`;
    };

    // functionality for buttons

    const getFunc = async () => {
        showLoader();
        const id = idElement.value;
        const endpoint = `${endpoints.get}?id=${id}`;
        await fetchData('GET', endpoint);
    };

    const postFunc = async () => {
        showLoader();
        const id = idElement.value;
        const articleName = nameElement.value;
        const articleBody = bodyElement.value;
        const date = dateElement.value;
        const body = { id, articleName, articleBody, date };
        await fetchData('POST', endpoints.post, body);
    };

    const putFunc = async () => {
        showLoader();
        const id = idElement.value;
        const articleName = nameElement.value;
        const articleBody = bodyElement.value;
        const date = dateElement.value;
        const body = { id, articleName, articleBody, date };
        await fetchData('PUT', endpoints.put, body);
    };

    const deleteFunc = async () => {
        showLoader();
        const id = idElement.value;
        const endpoint = `${endpoints.delete}?id=${id}`;
        await fetchData('DELETE', endpoint);
    };

    // event listeners

    document.getElementById('getButton').addEventListener('click', getFunc);
    document.getElementById('postButton').addEventListener('click', postFunc);
    document.getElementById('putButton').addEventListener('click', putFunc);
    document.getElementById('deleteButton').addEventListener('click', deleteFunc);
}