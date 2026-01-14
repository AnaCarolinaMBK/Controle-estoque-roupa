document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    
    // Carregar dados do localStorage
    let products = JSON.parse(localStorage.getItem('clothing_stock')) || [];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.nome}</td>
                <td>${product.tamanho}</td>
                <td>${product.cor}</td>
                <td>${product.quantidade}</td>
                <td><button class="delete-btn" onclick="deleteProduct(${index})">Excluir</button></td>
            `;
            productList.appendChild(tr);
        });
        localStorage.setItem('clothing_stock', JSON.stringify(products));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newProduct = {
            nome: document.getElementById('nome').value,
            tamanho: document.getElementById('tamanho').value,
            cor: document.getElementById('cor').value,
            quantidade: document.getElementById('quantidade').value
        };

        products.push(newProduct);
        renderProducts();
        form.reset();
    });

    window.deleteProduct = (index) => {
        products.splice(index, 1);
        renderProducts();
    };

    renderProducts();
});
