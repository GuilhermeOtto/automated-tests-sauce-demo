# Automação de Testes com Playwright

<p>Este projeto contém automações de testes end-to-end para a aplicação <a href="https://www.saucedemo.com/" target="_blank">Swag Labs (sauce demo)</a>, utilizando o framework Playwright e a estrutura Page Object Model (POM).</p>

<h2>Estrutura de Pastas</h2>
<pre>
tests/
│
│
└── auth/                         # Pasta para autenticação
│   ├── authSetup.js              # Script de autenticação (configurações iniciais)
│   └── auth.json                 # Estado de login (armazenamento de estado)
│
├── pages/                        # Pasta para os arquivos Page Object
│   ├── CartPage.js               # Página de Carrinho
│   ├── LoginPage.js              # Página de Login
│   └── ProductsPage.js           # Página de Produtos
│
└── tests/                        # Pasta onde estão os arquivos de teste
    └── saucedemo.spec.js         # Arquivo principal de testes
</pre>

<h2>Requisitos</h2>
<ul>
  <li><strong>Git</strong></li>
  <li><strong>Node.js</strong></li>
  <li><strong>Playwright</strong></li>
</ul>

<h3>Instalação</h3>

<pre>
1. Clone o repositório para o seu ambiente local:

   git clone https://github.com/GuilhermeOtto/automated-tests-sauce-demo.git
   cd automated-tests-sauce-demo

2. Instalação:

npm init playwright@latest


</pre>

<h2>Execução dos Testes</h2>
<p>Todos os testes estão definidos no arquivo <code>tests/saucedemo.spec.js</code></p>

<h3>Testes de Autenticação</h3>

<p>Teste de login:</p>

<ul>
  <li><strong>Login with valid credentials</strong>: Verifica se o login funciona corretamente com um usuário padrão.</li>
  <li><strong>Login with invalid credentials</strong>: Verifica se a mensagem de erro é exibida quando as credenciais são inválidas.</li>
  <li><strong>Login with blocked credentials</strong>: Verifica se a mensagem de erro é exibida para um usuário bloqueado.</li>
  <li><strong>Trying to access inventory with no login</strong>: Verifica se o acesso à página de inventário (Produtos) é restringido quando o usuário não está autenticado.</li>
</ul>

<h3>Testes de Página de Produtos</h3>

<p>Testes da página de produtos, onde os usuários podem:</p>
<ul>
  <li><strong>Add item to cart</strong>: Adiciona itens no carrinho e verifica se a quantidade demonstrada está correta</li>
  <li><strong>Remove item to cart in product page</strong>: Adiciona e faz a remoção dos itens no carrinho pela página de produtos</li>
  <li><strong>Sort by Name (A-Z)</strong>: Ordena e verifica se os produtos estão ordenados por nome de forma ascendente</li>
  <li><strong>Sort by Name (Z-A)</strong>: Ordena e verifica se os produtos estão ordenados por nome de forma descendente</li>
  <li><strong>Sort by Price (Low to High)</strong>: Ordena e verifica se os produtos estão ordenados por preço do mais barato para o mais caro</li>
  <li><strong>Sort by Price (High to Low)</strong>: Ordena e verifica se os produtos estão ordenados por preço do mais caro para o mais barato</li>
</ul>

<h3>Testes de Carrinho</h3>

<p>Testes da página de carrinho, incluindo:</p>
<ul>
  <li><strong>Remove items to cart in cart page</strong>: Remove os itens do carrinho</li>
  <li><strong>Continue shopping</strong>: Verifica o botão "Continue shopping" (voltar à página de produtos)</li>
</ul>

<h3>Execução dos Testes</h3>

<pre>
1. Para rodar os testes, execute o comando abaixo:

   npm run test
</pre>

<h2>Detalhes sobre a Estrutura dos Testes</h2>

<h3>Testes de Login (<code>LoginPage.js</code>)</h3>

<p>Os testes de login estão localizados dentro de <code>saucedemo.spec.js</code>, e utilizam os métodos da classe <code>LoginPage</code> para interagir com os elementos da página de login.</p>

<h3>Testes de Produtos (<code>ProductsPage.js</code>)</h3>

<p>A classe <code>ProductsPage.js</code> é utilizada para interagir com os elementos da página de produtos, como adicionar itens ao carrinho, remover itens e ordenar os produtos por diferentes critérios.</p>

<h3>Testes de Carrinho (<code>CartPage.js</code>)</h3>

<p>A classe <code>CartPage.js</code> contém métodos para interagir com o carrinho de compras, permitindo adicionar, remover itens e navegar entre as páginas de produtos e carrinho.</p>

<h2>Considerações Finais</h2>

<p>Este projeto utiliza uma abordagem Page Object Model (POM) para organizar os testes, promovendo a reutilização de código e a manutenção simplificada. Cada página da aplicação tem sua própria classe correspondente, e todas as interações com os elementos da página são centralizadas nessas classes.</p>
