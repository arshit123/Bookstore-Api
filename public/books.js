document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first');
        window.location.href = 'login.html';
        return;
    }

    const response = await fetch('/api/books', {
        headers: { 'Authorization': token }
    });

    const books = await response.json();
    const booksList = document.getElementById('booksList');
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.genre}) - ${book.available ? 'Available' : 'Unavailable'}`;
        booksList.appendChild(li);
    });
});
