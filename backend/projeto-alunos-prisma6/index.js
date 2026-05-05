const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// --- ROTA DE CADASTRO ---
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const novoUser = await prisma.usuario.create({
            data: { username, email, password }
        });
        res.status(201).json(novoUser);
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: "Usuário ou email já cadastrado" });
    }
});

// --- ROTA DE LOGIN (Ajustada) ---
app.post('/login', async (req, res) => {
    const { userOrEmail, password } = req.body;
    
    try {
        // Busca o usuário pelo username OU pelo email
        const user = await prisma.usuario.findFirst({
            where: {
                OR: [
                    { username: userOrEmail },
                    { email: userOrEmail }
                ]
            }
        });

        // Verifica se o usuário existe e se a senha bate exatamente
        if (user && user.password === password) {
            res.json({ message: "Login ok", user });
        } else {
            res.status(401).json({ error: "Credenciais inválidas" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro no servidor" });
    }
});

// --- ROTAS DE MÚSICAS ---
app.get('/musicas', async (req, res) => {
    const musicas = await prisma.musica.findMany();
    res.json(musicas);
});

app.post('/musicas', async (req, res) => {
    const { title, artist } = req.body;
    const novaMusica = await prisma.musica.create({
        data: { title, artist }
    });
    res.json(novaMusica);
});

app.delete('/musicas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.musica.delete({ where: { id } });
    res.status(204).send();
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));