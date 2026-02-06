/*Home page (index.html) functionality
 * Handles join game form submission*/

document.getElementById('joinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('gameCode').value.trim();
    if (!code) return;
    // Placeholder for joining game while i setup backend 
    alert('Attempting to join game with code: ' + code + '. (Backend needed for full functionality)');
});
