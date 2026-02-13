const express = require("express");
const cors = require("cors");

const app = express();

// Configurações
app.use(express.json());
app.use(cors());

// --- BANCO DE DADOS (Simulado na Memória) ---
const usuarios = [];

// --- ROTAS DE AUTENTICAÇÃO ---

// 1. Rota de Cadastro (Register)
app.post("/auth/register", (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
        return res.status(400).json({ erro: "Preencha todos os campos!" });
    }

    const usuarioExiste = usuarios.find((u) => u.email === email);
    if (usuarioExiste) {
        return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    const novoUsuario = { id: usuarios.length + 1, nome, email, senha, tipo };
    usuarios.push(novoUsuario);

    console.log("Novo usuário cadastrado:", novoUsuario);
    res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
});

// 2. Rota de Login
app.post("/auth/login", (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha,
    );

    if (!usuario) {
        return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    res.json({
        mensagem: "Login realizado!",
        usuario: { id: usuario.id, nome: usuario.nome, tipo: usuario.tipo },
    });
});

// --- INICIA O SERVIDOR (O que mantém ele vivo) ---
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
    console.log(`A cozinha está ABERTA e esperando conexões!`);
}).on("error", (erro) => {
    // Se a porta 3000 estiver travada pelo Windows, ele vai gritar aqui!
    console.error("🚨 ERRO: Não foi possível ligar o servidor:", erro.message);
});
