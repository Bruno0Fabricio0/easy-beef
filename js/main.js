// Dados dos produtos
const produtos = {
    premium: [
        {
            nome: "Picanha Premium",
            preco: 89.90,
            descricao: "Corte nobre ideal para churrasco",
            imagem: "picanha.jpg",
            disponivel: true
        },
        {
            nome: "Filé Mignon",
            preco: 79.90,
            descricao: "O mais macio dos cortes bovinos",
            imagem: "file-mignon.jpg",
            disponivel: true
        },
        {
            nome: "T-Bone",
            preco: 75.90,
            descricao: "Corte premium com filé e contra-filé",
            imagem: "tbone.jpg",
            disponivel: true
        },
        {
            nome: "Ancho",
            preco: 69.90,
            descricao: "Parte nobre do contra-filé",
            imagem: "ancho.jpg",
            disponivel: true
        },
        {
            nome: "Prime Rib",
            preco: 85.90,
            descricao: "Costela premium especial",
            imagem: "prime-rib.jpg",
            disponivel: true
        },
        {
            nome: "Wagyu",
            preco: 299.90,
            descricao: "Carne premium de alta marmorização",
            imagem: "wagyu.jpg",
            disponivel: true
        },
        {
            nome: "Tomahawk",
            preco: 129.90,
            descricao: "Corte especial com osso longo",
            imagem: "tomahawk.jpg",
            disponivel: true
        },
        {
            nome: "Short Rib",
            preco: 79.90,
            descricao: "Costela premium especial",
            imagem: "short-rib.jpg",
            disponivel: true
        },
        {
            nome: "Bife Ancho",
            preco: 89.90,
            descricao: "Corte argentino premium",
            imagem: "bife-ancho.jpg",
            disponivel: true
        },
        {
            nome: "Denver Steak",
            preco: 69.90,
            descricao: "Corte premium macio e suculento",
            imagem: "denver.jpg",
            disponivel: true
        }
    ],
    tradicional: [
        {
            nome: "Contra Filé",
            preco: 49.90,
            descricao: "Corte tradicional para churrasco",
            imagem: "contra-file.jpg",
            disponivel: true
        },
        {
            nome: "Alcatra",
            preco: 45.90,
            descricao: "Versátil e saborosa",
            imagem: "alcatra.jpg",
            disponivel: true
        },
        {
            nome: "Coxão Mole",
            preco: 39.90,
            descricao: "Ideal para bifes e assados",
            imagem: "coxao-mole.jpg",
            disponivel: true
        },
        {
            nome: "Patinho",
            preco: 38.90,
            descricao: "Carne magra e versátil",
            imagem: "patinho.jpg",
            disponivel: true
        },
        {
            nome: "Maminha",
            preco: 42.90,
            descricao: "Ótima para churrasco",
            imagem: "maminha.jpg",
            disponivel: true
        },
        {
            nome: "Cupim",
            preco: 39.90,
            descricao: "Tradicional e saboroso",
            imagem: "cupim.jpg",
            disponivel: true
        },
        {
            nome: "Acém",
            preco: 35.90,
            descricao: "Ideal para cozidos",
            imagem: "acem.jpg",
            disponivel: true
        },
        {
            nome: "Costela",
            preco: 34.90,
            descricao: "Perfeita para churrascos",
            imagem: "costela.jpg",
            disponivel: true
        },
        {
            nome: "Paleta",
            preco: 36.90,
            descricao: "Versátil e econômica",
            imagem: "paleta.jpg",
            disponivel: true
        },
        {
            nome: "Músculo",
            preco: 32.90,
            descricao: "Ótimo para sopas e cozidos",
            imagem: "musculo.jpg",
            disponivel: true
        }
    ]
};

// Função para criar card de produto com imagem ampliável
function criarCardProduto(produto) {
    return `
        <div class="produto-card">
            <div class="produto-imagem-container">
                <img src="assets/images/produtos/${produto.imagem}" 
                     alt="${produto.nome}" 
                     class="produto-imagem"
                     onclick="abrirImagemAmpliada(this.src)"
                     loading="lazy">
                <div class="zoom-icon">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <p class="descricao">${produto.descricao}</p>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="pedirViaWhatsApp('${produto.nome}')" class="pedir-btn">
                    <i class="fab fa-whatsapp"></i>
                    Pedir no WhatsApp
                </button>
            </div>
        </div>
    `;
}

// Função para abrir imagem ampliada
function abrirImagemAmpliada(src) {
    const modal = document.createElement('div');
    modal.className = 'modal-imagem';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="fechar-modal">&times;</span>
            <img src="${src}" alt="Imagem ampliada">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.fechar-modal').onclick = function() {
        modal.remove();
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// Função para pedir via WhatsApp
// Remover estas funções
function pedirViaWhatsApp(nomeProduto) {
    const texto = encodeURIComponent(`Olá! Gostaria de pedir: ${nomeProduto}`);
    window.open(`https://wa.me/5591985659626?text=${texto}`, '_blank');
}

function atualizarBotaoWhatsApp() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (carrinhoItens.length > 0) {
        whatsappButton.classList.add('tem-itens');
        whatsappButton.setAttribute('data-quantidade', carrinhoItens.length);
    } else {
        whatsappButton.classList.remove('tem-itens');
        whatsappButton.removeAttribute('data-quantidade');
    }
}

// Carrinho de compras
let carrinhoItens = [];

// Função para adicionar ao carrinho
let mensagemAtual = '';
let produtoSelecionado = null;

function abrirModalMensagem(produto) {
    produtoSelecionado = produto;
    const modal = document.getElementById('mensagemModal');
    const textarea = document.getElementById('mensagemPersonalizada');
    textarea.value = '';
    modal.classList.add('ativo');
}

function confirmarMensagem() {
    const textarea = document.getElementById('mensagemPersonalizada');
    mensagemAtual = textarea.value.trim();
    adicionarAoCarrinho(produtoSelecionado, mensagemAtual);
    document.getElementById('mensagemModal').classList.remove('ativo');
}

// Atualiza a função de adicionar ao carrinho
function adicionarAoCarrinho(nomeProduto, mensagem = '') {
    let produtoEncontrado = null;
    for (let categoria in produtos) {
        produtoEncontrado = produtos[categoria].find(p => p.nome === nomeProduto);
        if (produtoEncontrado) break;
    }

    if (produtoEncontrado) {
        carrinhoItens.push({
            ...produtoEncontrado,
            mensagem: mensagem
        });
        atualizarBotaoWhatsApp();
        mostrarNotificacao(`${produtoEncontrado.nome} adicionado ao carrinho!`);
    }
}

// Atualiza a função de enviar pedido
function enviarPedidoWhatsApp() {
    if (carrinhoItens.length === 0) {
        mostrarNotificacao('Adicione produtos ao carrinho primeiro!');
        return;
    }

    let total = carrinhoItens.reduce((sum, item) => sum + item.preco, 0);
    
    const mensagem = `Olá! Gostaria de fazer um pedido:\n\n` +
        carrinhoItens.map(item => 
            `▫️ ${item.nome}\n   R$ ${item.preco.toFixed(2)}` +
            (item.mensagem ? `\n   Obs: ${item.mensagem}` : '')
        ).join('\n\n') +
        `\n\n💰 Total: R$ ${total.toFixed(2)}\n\nAguardo o retorno!`;

    const texto = encodeURIComponent(mensagem);
    window.open(`https://wa.me/5591985659626?text=${texto}`, '_blank');
    
    carrinhoItens = [];
    atualizarBotaoWhatsApp();
}

// Atualiza a função de criar tabela
function criarTabelaProdutos(produtos) {
    return `
        <table class="produtos-table">
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                ${produtos.map(produto => `
                    <tr>
                        <td class="produto-imagem-cell">
                            <img src="assets/images/produtos/${produto.imagem}" 
                                 alt="${produto.nome}"
                                 class="produto-imagem-miniatura"
                                 onclick="abrirImagemAmpliada(this.src)">
                        </td>
                        <td class="produto-nome">${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td class="produto-preco">R$ ${produto.preco.toFixed(2)}</td>
                        <td>
                            <span class="produto-status ${produto.disponivel ? 'status-disponivel' : 'status-indisponivel'}">
                                ${produto.disponivel ? 'Disponível' : 'Indisponível'}
                            </span>
                        </td>
                        <td class="produto-acao">
                            ${produto.disponivel ? `
                                <button onclick="abrirModalMensagem('${produto.nome}')" class="btn-adicionar">
                                    <i class="fas fa-cart-plus"></i>
                                    Adicionar
                                </button>
                            ` : ''}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.innerHTML = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.classList.add('fadeout');
        setTimeout(() => notificacao.remove(), 300);
    }, 2000);
}

// Função para atualizar o botão do WhatsApp
function atualizarBotaoWhatsApp() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (carrinhoItens.length > 0) {
        whatsappButton.classList.add('tem-itens');
        whatsappButton.setAttribute('data-quantidade', carrinhoItens.length);
    } else {
        whatsappButton.classList.remove('tem-itens');
        whatsappButton.removeAttribute('data-quantidade');
    }
}

// Remover a função pedirViaWhatsApp
function adicionarAoCarrinho(nomeProduto) {
    let produtoEncontrado = null;
    for (let categoria in produtos) {
        produtoEncontrado = produtos[categoria].find(p => p.nome === nomeProduto);
        if (produtoEncontrado) break;
    }

    if (produtoEncontrado) {
        carrinhoItens.push({
            ...produtoEncontrado
        });
        atualizarBotaoWhatsApp();
        mostrarNotificacao(`${produtoEncontrado.nome} adicionado ao carrinho!`);
    }
}

function enviarPedidoWhatsApp() {
    if (carrinhoItens.length === 0) {
        mostrarNotificacao('Adicione produtos ao carrinho primeiro!');
        return;
    }

    let total = carrinhoItens.reduce((sum, item) => sum + item.preco, 0);
    
    const mensagem = `Olá! Gostaria de fazer um pedido:\n\n` +
        carrinhoItens.map(item => 
            `▫️ ${item.nome}\n   R$ ${item.preco.toFixed(2)}`
        ).join('\n\n') +
        `\n\n💰 Total: R$ ${total.toFixed(2)}\n\nAguardo o retorno!`;

    const texto = encodeURIComponent(mensagem);
    window.open(`https://wa.me/5591985659626?text=${texto}`, '_blank');
    
    // Limpa o carrinho após enviar
    carrinhoItens = [];
    atualizarBotaoWhatsApp();
}

function atualizarBotaoWhatsApp() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (carrinhoItens.length > 0) {
        whatsappButton.classList.add('tem-itens');
        whatsappButton.setAttribute('data-quantidade', carrinhoItens.length);
    } else {
        whatsappButton.classList.remove('tem-itens');
        whatsappButton.removeAttribute('data-quantidade');
    }
}

// Atualizar a função que mostra os produtos
document.addEventListener('DOMContentLoaded', () => {
    const botoesCategorias = document.querySelectorAll('.categoria-btn');
    const produtosContainer = document.getElementById('produtos-container');

    botoesCategorias.forEach(botao => {
        botao.addEventListener('click', () => {
            const categoria = botao.dataset.categoria;
            
            // Atualiza botões
            botoesCategorias.forEach(b => b.classList.remove('active'));
            botao.classList.add('active');

            // Atualiza produtos com a nova tabela
            produtosContainer.innerHTML = criarTabelaProdutos(produtos[categoria]);
        });
    });

    // Mostra produtos premium por padrão
    document.querySelector('[data-categoria="premium"]').click();
});


// Função para mostrar modal do carrinho
function mostrarCarrinho() {
    const modal = document.getElementById('carrinhoModal');
    const carrinhoItensDiv = document.getElementById('carrinho-itens');
    const carrinhoTotal = modal.querySelector('.carrinho-total');
    
    let total = carrinhoItens.reduce((sum, item) => sum + item.preco, 0);
    
    carrinhoItensDiv.innerHTML = carrinhoItens.map(item => `
        <div class="carrinho-item">
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p class="item-preco">R$ ${item.preco.toFixed(2)}</p>
                ${item.mensagem ? `<p class="item-obs">Obs: ${item.mensagem}</p>` : ''}
            </div>
            <button onclick="removerDoCarrinho('${item.nome}')" class="btn-remover">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    carrinhoTotal.innerHTML = `
        <div class="total">
            <span>Total:</span>
            <span class="valor">R$ ${total.toFixed(2)}</span>
        </div>
    `;
    
    modal.classList.add('ativo');
}

// Função para remover item do carrinho
function removerDoCarrinho(nomeProduto) {
    const index = carrinhoItens.findIndex(item => item.nome === nomeProduto);
    if (index > -1) {
        carrinhoItens.splice(index, 1);
        mostrarCarrinho();
        atualizarBotaoWhatsApp();
        mostrarNotificacao('Item removido do carrinho!');
    }
}

// Função para limpar carrinho
function limparCarrinho() {
    carrinhoItens = [];
    mostrarCarrinho();
    atualizarBotaoWhatsApp();
    mostrarNotificacao('Carrinho limpo!');
}

// Atualizar o botão do WhatsApp para abrir o modal
document.querySelector('.whatsapp-button').onclick = function(e) {
    e.preventDefault();
    if (carrinhoItens.length > 0) {
        mostrarCarrinho();
    } else {
        mostrarNotificacao('Adicione produtos ao carrinho primeiro!');
    }
};

// Fechar modal ao clicar no X ou fora
document.addEventListener('DOMContentLoaded', () => {
    const modais = document.querySelectorAll('.modal');
    
    modais.forEach(modal => {
        const fecharBtn = modal.querySelector('.fechar-modal');
        if (fecharBtn) {
            fecharBtn.onclick = () => modal.classList.remove('ativo');
        }
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('ativo');
            }
        };
    });
});