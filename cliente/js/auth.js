/* =========================================
   auth.js - Lógica Visual e Conexão com API
   ========================================= */

const loginForm = document.getElementById("form-login");
const cadastroForm = document.getElementById("form-cadastro");
const btnIrCadastro = document.getElementById("btn-ir-cadastro");
const btnIrLogin = document.getElementById("btn-ir-login");

// --- 1. ALTERNAR TELAS ---
btnIrCadastro.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    cadastroForm.classList.remove("hidden");
});

btnIrLogin.addEventListener("click", () => {
    cadastroForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});

// --- 2. CADASTRAR USUÁRIO (Conexão com Backend) ---
cadastroForm.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // Impede a página de recarregar

    // Pega os valores digitados
    const nome = document.getElementById("cad-nome").value;
    const email = document.getElementById("cad-email").value;
    const tipo = document.getElementById("cad-tipo").value;
    const senha = document.getElementById("cad-senha").value;

    try {
        const resposta = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, tipo, senha }),
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert("Sucesso! " + dados.mensagem);
            cadastroForm.reset(); // Limpa os campos
            btnIrLogin.click(); // Volta para a tela de login
        } else {
            alert("Erro: " + dados.erro);
        }
    } catch (erro) {
        console.error("Erro no fetch de cadastro:", erro);
        alert(
            "Erro ao conectar com o servidor. Verifique se ele está rodando.",
        );
    }
});

// --- 3. FAZER LOGIN ---
loginForm.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;

    try {
        const resposta = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            // Salva o "crachá" do usuário no navegador
            const dadosUsuario = JSON.stringify(dados.usuario);
            localStorage.setItem("usuarioLogado", dadosUsuario);

            // Redireciona para a Home
            window.location.href = "index.html";
        } else {
            alert("Erro: " + dados.erro);
        }
    } catch (erro) {
        console.error("Erro no fetch de login:", erro);
        alert("Erro ao tentar fazer login.");
    }
});
