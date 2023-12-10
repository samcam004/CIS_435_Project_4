function start() {
    fetchBooks();
    const addButton = document.getElementById('btn-submit-data');
    addButton.addEventListener('click', addBook);
    const deleteButton = document.getElementById('btn-delete-data');
    deleteButton.addEventListener('click', deleteBook);
}

async function addBook(){
    // Grabbing data for new book
    const newBook = {
        "isbn": document.getElementById('ISBN').value,
        "name": document.getElementById('name').value,
        "author": document.getElementById('author').value,
        "genre": document.getElementById('genre').value,
        "price": parseFloat(document.getElementById('price').value)
    }
    // Log the newBook to see if you're capturing form data correctly.
    console.log(newBook);
    // Sending data back to API
    try {
        const response = await fetch('http://localhost/projects/CIS_435_Project_4/php/createBook.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        const responseText = await response.text();
        console.log(responseText);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function fetchBooks() {
    try {
        const response = await fetch('http://localhost/projects/CIS_435_Project_4/php/readBooks.php');
        const json = await response.json();

        const tableBody = document.querySelector('.tableCurrentBody');
        
        // Clearing any previous data in the table
        tableBody.innerHTML = ''; 

        // Create a row for each table found in the DB
        json.forEach(book => {
            const newRow = document.createElement('tr');
            newRow.classList.add('booksRow');

            const cellISBN = document.createElement('th');
            cellISBN.textContent = book.ISBN;
            newRow.appendChild(cellISBN);

            const cellTitle = document.createElement('th');
            cellTitle.textContent = book.Title;
            newRow.appendChild(cellTitle);

            const cellAuthor = document.createElement('th');
            cellAuthor.textContent = book.Author;
            newRow.appendChild(cellAuthor);

            const cellGenre = document.createElement('th');
            cellGenre.textContent = book.Genre;
            newRow.appendChild(cellGenre);

            const cellPrice = document.createElement('th');
            cellPrice.textContent = book.Price;
            newRow.appendChild(cellPrice);

            // Adding the new row to the table
            tableBody.appendChild(newRow); 
        });
    } catch (error) {
        console.error(error);
    }
}

async function deleteBook(){

}

window.addEventListener('load', start);