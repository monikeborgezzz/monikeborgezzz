const API_URL = 'http://localhost:3000'; 

// Referências HTML
const introScreen = document.getElementById('intro-screen');
const authScreen = document.getElementById('auth-screen');
const mainScreen = document.getElementById('main-screen');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const logo = document.getElementById('intro-logo');
        if(logo) logo.classList.add('smoke-out');
    }, 1800);

    setTimeout(() => {
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.classList.add('hidden');
            authScreen.classList.remove('hidden');
            authScreen.classList.add('slide-in');
        }, 800);
    }, 2600);
});



async function doLogin() {
    const userOrEmail = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value.trim();

    if (!userOrEmail || !password) return alert("Preencha tudo!");

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userOrEmail, password })
        });

        if (response.ok) {
            authScreen.classList.add('hidden');
            mainScreen.classList.remove('hidden');
            mainScreen.classList.add('slide-in');
            loadSongs();
        } else {
            alert("Usuário ou senha incorretos!");
        }
    } catch (err) {
        alert("Servidor desligado!");
    }
}

async function doSignup() {
    const username = document.getElementById('signup-user').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-pass').value.trim();

    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert("Cadastrado! Faça login agora.");
        document.getElementById('go-login').click(); // Volta pro login
    } else {
        alert("Erro no cadastro (Usuário já existe?)");
    }
}



async function loadSongs() {
    const response = await fetch(`${API_URL}/musicas`);
    const songs = await response.json();
    const list = document.getElementById('music-list');
    list.innerHTML = '';
    songs.forEach(s => {
        const item = document.createElement('div');
        item.className = 'music-item';
        item.innerHTML = `
            <div><b>${s.title}</b><br><small>${s.artist}</small></div>
            <span onclick="deleteSong(${s.id})" style="cursor:pointer">✕</span>
        `;
        list.appendChild(item);
    });
}

async function doAddSong() {
    const title = document.getElementById('new-title').value;
    const artist = document.getElementById('new-artist').value;
    await fetch(`${API_URL}/musicas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, artist })
    });
    document.getElementById('new-title').value = '';
    document.getElementById('new-artist').value = '';
    loadSongs();
}

async function deleteSong(id) {
    await fetch(`${API_URL}/musicas/${id}`, { method: 'DELETE' });
    loadSongs();
}

// Eventos de clique
document.getElementById('login-submit').onclick = doLogin;
document.getElementById('signup-submit').onclick = doSignup;
document.getElementById('btn-add-sound').onclick = doAddSong;
document.getElementById('go-signup').onclick = () => { loginForm.classList.add('hidden'); signupForm.classList.remove('hidden'); };
document.getElementById('go-login').onclick = () => { signupForm.classList.add('hidden'); loginForm.classList.remove('hidden'); };