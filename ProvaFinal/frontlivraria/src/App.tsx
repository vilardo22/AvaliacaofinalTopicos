// 1. Importamos as ferramentas do roteador
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// 2. Importamos a nossa tela
import { ListarLivros } from './Pages/Livros/listar';
import { CadastrarLivro } from "./Pages/Livros/cadastrar";
import { LivrosDisponiveis } from "./Pages/Livros/disponiveis";
import { LivrosEmprestados } from "./Pages/Livros/emprestados";
import { LivroMaisEmprestado } from "./Pages/Livros/maisemprestados";
function App() {
  return (
    // BrowserRouter: É o "envelopador" principal. Ele avisa o navegador que o React vai controlar a URL a partir de agora.
    <BrowserRouter>
      
      {/* (Opcional) Um menu de navegação simples para você testar */}
      <nav style={{ padding: "10px", backgroundColor: "#f0f0f0", marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Página Inicial</Link>
        <Link to="/pages/livro/listar">  - Listar livros -  </Link>

        <Link to="/pages/livro/cadastrar"> - Cadastrar Livro  -  </Link>

        <Link to="/pages/livro/disponiveis">  - Livros Disponíveis  -  </Link>
        <Link to="/pages/livro/emprestados">  - Livros Emprestados  -  </Link>

        <Link to="/pages/livro/maisemprestados">  - Livro Mais Emprestado  -  </Link>
      </nav>

      {/* Routes: É a caixa onde guardamos todas as rotas possíveis do sistema */}
      <Routes>
        
        {/* Route: É a regra. "Se o caminho na URL for X, mostre o componente Y" */}
        
        {/* Rota da Página Inicial (quando a URL está vazia) */}
        <Route path="/" element={<h2>Bem-vindo ao Sistema da Biblioteca</h2>} />

        {/* A rota específica que o seu exercício pediu */}
        <Route path="/pages/livro/listar" element={<ListarLivros />} />

        <Route path="/pages/livro/cadastrar" element={<CadastrarLivro />} />

        <Route path="/pages/livro/disponiveis" element={<LivrosDisponiveis />} />

        <Route path="/pages/livro/emprestados" element={<LivrosEmprestados />} />

        <Route path="/pages/livro/maisemprestados" element={<LivroMaisEmprestado/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;