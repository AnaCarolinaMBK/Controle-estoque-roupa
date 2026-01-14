const form = document.getElementById('product-form');
const stockList = document.getElementById('stock-list');

// Carregar dados ao abrir a página
let estoque = JSON.parse(localStorage.getItem('meuEstoque')) || [];
atualizarTabela();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const novoItem = {
        nome: document.getElementById('nome').value,
        tamanho: document.getElementById('tamanho').value,
        cor: document.getElementById('cor').value,
        quantidade: parseInt(document.getElementById('quantidade').value)
    };

    estoque.push(novoItem);
    salvarEAtualizar();
    form.reset();
});

function salvarEAtualizar() {
    localStorage.setItem('meuEstoque', JSON.stringify(estoque));
    atualizarTabela();
}

function atualizarTabela() {
    stockList.innerHTML = '';
    
    estoque.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.tamanho}</td>
            <td>${item.cor}</td>
            <td><strong>${item.quantidade}</strong></td>
            <td>
                <button class="btn-item add" onclick="alterarQtd(${index}, 1)">+</button>
                <button class="btn-item remove" onclick="alterarQtd(${index}, -1)">-</button>
                <button class="btn-item delete" onclick="excluirItem(${index})">x</button>
            </td>
        `;
        stockList.appendChild(tr);
    });
}

window.alterarQtd = function(index, valor) {
    estoque[index].quantidade += valor;
    if (estoque[index].quantidade < 0) estoque[index].quantidade = 0;
    salvarEAtualizar();
};

window.excluirItem = function(index) {
    if(confirm("Deseja remover este produto do estoque?")) {
        estoque.splice(index, 1);
        salvarEAtualizar();
    }
};
