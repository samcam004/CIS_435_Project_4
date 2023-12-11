function start() {
    fetchBooks();
    fetchISBNs();
    fetchUpdateBooks();
    const addButton = document.getElementById('btn-submit-data');
    addButton.addEventListener('click', addBook);
    const deleteButton = document.getElementById('btn-delete-data');
    deleteButton.addEventListener('click', deleteBook);
}

async function fetchBooks() {
    try {
        const response = await fetch('http://localhost/CIS_435_Project_4/php/readBooks.php');
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

async function fetchISBNs() {
    try {
        const response = await fetch('http://localhost/CIS_435_Project_4/php/readBooks.php');
        const json = await response.json();
        const deleteDropdown = document.getElementById('delete_id');

        // Clearing any previous dropdown options
        deleteDropdown.innerHTML = '';

        // Create an option for each ISBN found in the DB
        json.forEach(book => {
            const option = document.createElement('option');
            option.value = book.ISBN;
            option.textContent = book.ISBN;
            deleteDropdown.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

async function addBook(){
    // Grabbing data for new book
    const newBook = {
        ISBN : document.getElementById('ISBN').value,
        name : document.getElementById('name').value,
        author : document.getElementById('author').value,
        genre : document.getElementById('genre').value,
        price : parseFloat(document.getElementById('price').value)
    }
    // Sending data back to DB
    try {
        const response = await fetch('http://localhost/CIS_435_Project_4/php/createBook.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        const responseText = await response.text();
        console.log(responseText);
        
        fetchBooks();
        fetchISBNs();
        fetchUpdateBooks();
    } catch (error) {
        console.error(error);
    }
}

async function deleteBook() {
    const selectedISBN = document.getElementById('delete_id').value;
    try {
        const response = await fetch('http://localhost/CIS_435_Project_4/php/deleteBook.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ISBN: selectedISBN })
        });
        const responseText = await response.text();
        console.log(responseText);
        // After deleting the book, refresh the page 
        fetchISBNs();
        fetchBooks();
        fetchUpdateBooks();
    } catch (error) {
        console.error(error);
    }
}

async function fetchUpdateBooks(){
    try {
        const response = await fetch('http://localhost/CIS_435_Project_4/php/readBooks.php');
        const json = await response.json();

        const tableBody = document.querySelector('.updateTableBody');
        
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
            cellTitle.classList.add('titleCell'); 
            newRow.appendChild(cellTitle);

            const cellAuthor = document.createElement('th');
            cellAuthor.textContent = book.Author;
            cellAuthor.classList.add('authorCell'); 
            newRow.appendChild(cellAuthor);

            const cellGenre = document.createElement('th');
            cellGenre.textContent = book.Genre;
            cellGenre.classList.add('genreCell'); 
            newRow.appendChild(cellGenre);

            const cellPrice = document.createElement('th');
            cellPrice.textContent = book.Price;
            cellPrice.classList.add('priceCell'); 
            newRow.appendChild(cellPrice);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => enableEdit(book,newRow));
            newRow.appendChild(editButton);

            // Adding the new row to the table
            tableBody.appendChild(newRow); 
        });
    } catch (error) {
        console.error(error);
    }
}

function enableEdit(book, newRow) {

    // Grab all the cells in the row
    const cells = newRow.querySelectorAll('th'); 

    const isbnCell = cells[0];
    const titleCell = cells[1];
    const authorCell = cells[2];
    const genreCell = cells[3];
    const priceCell = cells[4];

    // Create input fields and populate with existing data
    const isbnInput = document.createElement('input');
    isbnInput.value = book.ISBN;
    isbnCell.innerHTML = '';
    isbnCell.appendChild(isbnInput);

    const titleInput = document.createElement('input');
    titleInput.value = book.Title;
    titleCell.innerHTML = '';
    titleCell.appendChild(titleInput);

    const authorInput = document.createElement('input');
    authorInput.value = book.Author;
    authorCell.innerHTML = '';
    authorCell.appendChild(authorInput);

    const genreInput = document.createElement('input');
    genreInput.value = book.Genre;
    genreCell.innerHTML = '';
    genreCell.appendChild(genreInput);

    const priceInput = document.createElement('input');
    priceInput.value = book.Price;
    priceCell.innerHTML = '';
    priceCell.appendChild(priceInput);

    // Change the edit button to a save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => updateBook(book, newRow));
    newRow.replaceChild(saveButton, newRow.querySelector('button'));
}

async function updateBook(book, newRow) {
    // Cells
    const cells = newRow.querySelectorAll("th");

    const updatedBook = {
        ISBN: cells[0].querySelector('input').value,
        Title: cells[1].querySelector('input').value,
        Author: cells[2].querySelector('input').value,
        Genre: cells[3].querySelector('input').value,
        Price: parseFloat(cells[4].querySelector('input').value)
    };

    try { 
        const response = await fetch('http://localhost/CIS_435_Project_4/php/updateBook.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

      const responseData = await response.json();

      console.log(responseData);

      fetchBooks();
      fetchUpdateBooks();
      turnEditingOff(updatedBook, newRow);
      fetchISBNs();
    } catch (error) {
      console.error(error);
    }
}

function turnEditingOff(updatedBook, newRow) {

    // Update row cells to hold the updated text
    const cells = newRow.querySelectorAll("th");

    cells[0].innerHTML = '';
    cells[0].textContent = updatedBook.ISBN;

    cells[1].innerHTML = '';
    cells[1].textContent = updatedBook.Title;

    cells[2].innerHTML = '';
    cells[2].textContent = updatedBook.Author;

    cells[3].innerHTML = '';
    cells[3].textContent = updatedBook.Genre;

    cells[4].innerHTML = '';
    cells[4].textContent = updatedBook.Price;

    // Change the save button back to edit
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => enableEdit(updatedBook, newRow));
    newRow.replaceChild(editButton, newRow.querySelector('button'));
}

window.addEventListener('load', start);