/* =========================================
   client/js/script.js
   Lógica principal da Página Inicial (Home)
   ========================================= */

// --- 1. CARREGAR PROJETOS ---
async function carregarProjetos() {
    const listaProjetos = document.getElementById('lista-projetos');
    
    // Se não achar a div na tela, para a função para não dar erro
    if (!listaProjetos) return; 

    // Projetos de Teste 
    const projetosMock = [
        { id: 1, titulo: "Apoio Escolar para Crianças", ong: "ONG Educar", descricao: "Buscamos voluntários para dar aulas de reforço em matemática e português aos finais de semana." },
        { id: 2, titulo: "Limpeza da Praia", ong: "Mar Limpo", descricao: "Junte-se a nós neste sábado para um mutirão de coleta de resíduos na orla da praia central." },
        { id: 3, titulo: "Distribuição de Sopas", ong: "Aquece Coração", descricao: "Precisamos de ajuda para cozinhar e distribuir refeições para pessoas em situação de rua." }
    ];

    // Limpa a mensagem de "Carregando..."
    listaProjetos.innerHTML = "";

    // Pega a lista e cria um "Card" HTML para cada projeto
    projetosMock.forEach(projeto => {
        const card = document.createElement('div');
        card.className = 'card-projeto';
        
        card.innerHTML = `
            <h3>${projeto.titulo}</h3>
            <p class="ong-nome">🏢 Organização: ${projeto.ong}</p>
            <p class="descricao">${projeto.descricao}</p>
            <a href="#" class="btn-secundario">Quero Ajudar</a>
        `;
        
        // Adiciona o card na tela
        listaProjetos.appendChild(card);
    });
}

// --- 2. GERENCIAMENTO DE SESSÃO (LOGIN/LOGOUT) ---
function verificarSessao() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) return; // Ninguém logado, deixa o botão normal

    const usuario = JSON.parse(usuarioLogado);
    const botaoHeader = document.querySelector('.btn-primary'); 

    if (botaoHeader) {
        const primeiroNome = usuario.nome.split(' ')[0];
        
        // Altera o botão para mostrar o nome
        botaoHeader.textContent = `Olá, ${primeiroNome} (Sair)`;
        botaoHeader.style.backgroundColor = "#0984E3"; 
        botaoHeader.href = "#"; 
        
        // Adiciona a função de sair (logout)
        botaoHeader.addEventListener('click', (e) => {
            e.preventDefault(); 
            const confirmar = confirm("Deseja sair da sua conta?");
            if (confirmar) {
                localStorage.removeItem('usuarioLogado');
                window.location.reload(); 
            }
        });
    }
}

// --- 3. INICIALIZAÇÃO (O gatilho que faltava!) ---
document.addEventListener('DOMContentLoaded', () => {
    carregarProjetos();
    verificarSessao(); 
});