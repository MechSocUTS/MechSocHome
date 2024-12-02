// const key = process.env.AIRTABLE_API_KEY;

window.onload = function() {
    // Perform a GET request to a sample website
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            // Display the fetched data in the <pre> element
            document.getElementById('response').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            // Handle errors, if any
            document.getElementById('response').textContent = 'Error: ' + error.message;
        });
};
