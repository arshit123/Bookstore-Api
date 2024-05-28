document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = 'login.html';
        return;
    }

    const booksList = document.getElementById('booksList');

    const fetchBooks = async () => {
        const response = await fetch('/api/books', {
            headers: { 'Authorization': token }
        });

        const books = await response.json();
        booksList.innerHTML = ''; // Clear existing books
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (${book.genre}) - ${book.available ? 'Available' : 'Unavailable'}`;
            booksList.appendChild(li);
        });
    };

    await fetchBooks();

    document.getElementById('addBookForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const available = document.getElementById('available').checked;

        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ title, author, genre, available })
        });

        if (response.ok) {
            await fetchBooks();
            alert('Book added successfully');
        } else {
            const data = await response.json();
            alert(`Error: ${data.msg}`);
        }
    });

    document.getElementById('updateBookForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('updateId').value;
        const title = document.getElementById('updateTitle').value;
        const author = document.getElementById('updateAuthor').value;
        const genre = document.getElementById('updateGenre').value;
        const available = document.getElementById('updateAvailable').checked;

        const response = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ title, author, genre, available })
        });

        if (response.ok) {
            await fetchBooks();
            alert('Book updated successfully');
        } else {
            const data = await response.json();
            alert(`Error: ${data.msg}`);
        }
    });

    document.getElementById('deleteBookForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('deleteId').value;

        const response = await fetch(`/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });

        if (response.ok) {
            await fetchBooks();
            alert('Book deleted successfully');
        } else {
            const data = await response.json();
            alert(`Error: ${data.msg}`);
        }
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('You have been logged out');
        window.location.href = 'login.html';
    });
});
