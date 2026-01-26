/* Lógica da Página de Autenticação (Login/Cadastro)
   Gerencia a alternância entre os formulários
*/

const loginForm = document.getElementById('form-login');
const cadastroForm = document.getElementById('form-cadastro');
const btnIrCadastro = document.getElementById('btn-ir-cadastro');
const btnIrLogin = document.getElementById('btn-ir-login');

// Alternar para Cadastro
btnIrCadastro.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    cadastroForm.classList.remove('hidden');
});

// Alternar para Login
btnIrLogin.addEventListener('click', () => {
    cadastroForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});
