 const form = document.getElementById('product-form');
 const stockList = document.getElementById('stock-list');
 const valorGeralLabel = document.getElementById('valor-geral');

 let estoque = JSON.parse(localStorage.getItem('meuEstoque')) || [];
 atualizarTabela();

 form.addEventListener('submit', (e) => {
     e.preventDefault();
     const novoItem = {
         nome: document.getElementById('nome').value,
         tamanho: document.getElementById('tamanho').value,
         cor: document.getElementById('cor').value,
         quantidade: parseInt(document.getElementById('quantidade').value),
         preco: parseFloat(document.getElementById('preco').value)
     };
     estoque.push(novoItem);
     salvarEAtualizar();
     form.reset();
     document.getElementById('tamanho').value = "M"; // Valor padrão
 });

 function salvarEAtualizar() {
     localStorage.setItem('meuEstoque', JSON.stringify(estoque));
     atualizarTabela();
 }

 function atualizarTabela() {
     stockList.innerHTML = '';
     let somaTotal = 0;

     estoque.forEach((item, index) => {
         const totalItem = item.quantidade * item.preco;
         somaTotal += totalItem;

         const tr = document.createElement('tr');
         tr.innerHTML = `
             <td><strong>${item.nome}</strong><br><small>${item.tamanho} | ${item.cor}</small></td>
             <td>${item.quantidade}</td>
             <td>R$ ${totalItem.toFixed(2)}</td>
             <td>
                 <button class="btn-item add" onclick="alterarQtd(${index}, 1)">+</button>
                 <button class="btn-item remove" onclick="alterarQtd(${index}, -1)">-</button>
                 <button class="btn-item delete" onclick="excluirItem(${index})">x</button>
             </td>
         `;
         stockList.appendChild(tr);
     });

     valorGeralLabel.innerText = `R$ ${somaTotal.toFixed(2)}`;
 }

 window.alterarQtd = function(index, valor) {
     estoque[index].quantidade += valor;
     if (estoque[index].quantidade < 0) estoque[index].quantidade = 0;
     salvarEAtualizar();
 };

 window.excluirItem = function(index) {
     if(confirm("Deseja apagar este produto?")) {
         estoque.splice(index, 1);
         salvarEAtualizar();
     }
 };

 window.filtrarEstoque = function() {
     const termoBusca = document.getElementById('search-input').value.toLowerCase();
     const rows = stockList.getElementsByTagName('tr');

     for (let i = 0; i < rows.length; i++) {
         const textoLinha = rows[i].textContent.toLowerCase();
         rows[i].style.display = textoLinha.includes(termoBusca) ? "" : "none";
     }
 };
