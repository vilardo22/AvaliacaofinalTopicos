import { useEffect, useState } from "react";

// Usamos a mesma interface que já descobrimos que funciona perfeitamente!
export interface Livro {
    id: number;
    nome: string;
    autor: string;
    estaDisponivel: boolean;
    qtdEmprestimo: number;
}

export function LivrosDisponiveis() {
    const [livros, setLivros] = useState<Livro[]>([]);

    // 1. Ao abrir a página, carregamos a lista
    useEffect(() => {
        carregarLivros();
    }, []);

    // 2. Função para buscar os livros (igual à da tela listar)
    function carregarLivros() {
        fetch("http://localhost:5203/api/livro/listar")
            .then((resposta) => resposta.json())
            .then((dados: Livro[]) => {
                // A MÁGICA DO FILTRO: 
                // O .filter() cria uma lista nova, guardando apenas os livros que passarem no teste.
                // O teste aqui é: "estaDisponivel" precisa ser "true".
                const apenasDisponiveis = dados.filter(livro => livro.estaDisponivel === true);
                
                // Salvamos no estado apenas os disponíveis
                setLivros(apenasDisponiveis); 
            })
            .catch((erro) => console.error("Erro ao buscar livros:", erro));
    }

    // 3. A NOVA AÇÃO: Função que será chamada quando clicarmos no botão "Emprestar"
    function realizarEmprestimo(id: number) {
        // Apontamos para aquela exata rota PUT que você criou no C#
        fetch(`http://localhost:5203/api/livro/emprestar/${id}`, {
            method: "PUT" // Avisamos que é uma atualização
        })
        .then((resposta) => {
            if (resposta.ok) {
                alert("Livro emprestado com sucesso!");
                // PONTO CRÍTICO: Após o sucesso, chamamos a função de buscar novamente.
                // Isso vai no banco, pega a lista nova (onde esse livro agora estará false)
                // e redesenha a tela, fazendo o livro "sumir" da tabela de disponíveis magicamente!
                carregarLivros(); 
            } else {
                alert("Não foi possível emprestar o livro.");
            }
        })
        .catch((erro) => console.error("Erro ao emprestar:", erro));
    }

    return (
        <div>
            <h2>Livros Disponíveis para Empréstimo</h2>
            <table border={1} style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Autor</th>
                        <th>Empréstimos Históricos</th>
                        <th>Ação</th> {/* Nova coluna para o botão */}
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <tr key={livro.id}>
                            <td>{livro.id}</td>
                            <td>{livro.nome}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.qtdEmprestimo}</td>
                            <td>
                                {/* O botão que aciona a nossa nova função, passando o ID daquele livro específico */}
                                <button 
                                    onClick={() => realizarEmprestimo(livro.id)}
                                    style={{ padding: "5px 10px", backgroundColor: "#008CBA", color: "white", border: "none", cursor: "pointer" }}
                                >
                                    Realizar Empréstimo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Um aviso amigável caso não tenha nenhum livro disponível */}
            {livros.length === 0 && (
                <p style={{ marginTop: "20px", color: "gray" }}>Não há livros disponíveis no momento.</p>
            )}
        </div>
    );
}