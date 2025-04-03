// Define a class Funcionario para representar um funcionário
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome; // Nome do funcionário
        this.idade = idade; // Idade do funcionário
        this.cargo = cargo; // Cargo do funcionário
        this.salario = salario; // Salário do funcionário
    }

    // Método para retornar uma string representando o funcionário
    toString = () => `${this.nome}, ${this.idade} anos, ${this.cargo}, R$ ${this.salario}`;
}

// Array para armazenar os funcionários
const funcionarios = [];
// Variável para armazenar o índice do funcionário em edição
let editIndex = -1;

// Adiciona um evento de submit ao formulário de funcionário
document.getElementById("funcionarioForm").addEventListener("submit", event => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    const cargo = document.getElementById("cargo").value;
    const salario = parseFloat(document.getElementById("salario").value);

    // Se não estiver editando, adiciona um novo funcionário, caso contrário, edita o existente
    editIndex === -1 ?
        funcionarios.push(new Funcionario(nome, idade, cargo, salario)) :
        Object.assign(funcionarios[editIndex], { nome, idade, cargo, salario }), editIndex = -1;

    atualizarTabela(); // Atualiza a tabela de funcionários
    event.target.reset(); // Reseta o formulário
});

// Função para atualizar a tabela de funcionários
const atualizarTabela = () => {
    const tbody = document.getElementById("funcionariosTable"); // Obtém o corpo da tabela
    tbody.innerHTML = ""; // Limpa a tabela

    // Itera sobre os funcionários e cria uma linha para cada um
    funcionarios.forEach((func, index) => {
        const row = tbody.insertRow(); // Cria uma nova linha
        row.insertCell(0).textContent = func.nome; // Adiciona o nome
        row.insertCell(1).textContent = func.idade; // Adiciona a idade
        row.insertCell(2).textContent = func.cargo; // Adiciona o cargo
        row.insertCell(3).textContent = `R$ ${func.salario.toFixed(2)}`; // Adiciona o salário formatado

        // Cria a célula de ações (editar e excluir)
        const actionsCell = row.insertCell(4);
        const editButton = document.createElement("button"); // Botão de editar
        editButton.textContent = "Editar";
        editButton.onclick = () => editarFuncionario(index); // Define o evento de clique
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement("button"); // Botão de excluir
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => excluirFuncionario(index); // Define o evento de clique
        actionsCell.appendChild(deleteButton);
    });
};

// Função para excluir um funcionário pelo índice
const excluirFuncionario = index => (funcionarios.splice(index, 1), atualizarTabela());

// Função para editar um funcionário pelo índice
const editarFuncionario = index => {
    // Preenche os campos do formulário com os dados do funcionário
    document.getElementById("nome").value = funcionarios[index].nome;
    document.getElementById("idade").value = funcionarios[index].idade;
    document.getElementById("cargo").value = funcionarios[index].cargo;
    document.getElementById("salario").value = funcionarios[index].salario;
    editIndex = index; // Define o índice do funcionário em edição
};

// Função para gerar relatórios sobre os funcionários
const gerarRelatorios = () => {
    // Filtra os funcionários com salário acima de R$ 5000
    const salariosAltos = funcionarios.filter(f => f.salario > 5000);
    // Calcula a média salarial
    const mediaSalarial = funcionarios.reduce((acc, f) => acc + f.salario, 0) / funcionarios.length || 0;
    // Obtém os cargos únicos
    const cargosUnicos = [...new Set(funcionarios.map(f => f.cargo))];
    // Obtém os nomes dos funcionários em maiúsculo
    const nomesMaiusculos = funcionarios.map(f => f.nome.toUpperCase());

    // Exibe os relatórios no elemento com id "relatorios"
    document.getElementById("relatorios").textContent = `
    Funcionários com salário acima de R$ 5000: ${salariosAltos.map(f => f.toString()).join("\n")}
    Média salarial: R$ ${mediaSalarial.toFixed(2)}
    Cargos únicos: ${cargosUnicos.join(", ")}
    Nomes em maiúsculo: ${nomesMaiusculos.join(", ")}
    `;
};