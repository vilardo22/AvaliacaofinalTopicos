import { useEffect, useState } from "react";

// Usamos a mesma interface que já descobrimos que funciona perfeitamente!
export interface Livro {
    id: number;
    nome: string;
    autor: string;
    estaDisponivel: boolean;
    qtdEmprestimo: number;
}

export function LivrosEmprestados(){
    const [livros, setLivros] = useState<Livro[]>([]);

    useEffect(() => {
        carregarLivros();
    }, []);


    function carregarLivros() {
        fetch("http://localhost:5203/api/livro/listar")
        .then((resposta) => resposta.json())
        .then((dados: Livro[]) =>{
            const apenasEmprestados = dados.filter(livro => livro.estaDisponivel === false);
            setLivros(apenasEmprestados);
        })
        .catch((erro) => console.error("Erro ao buscar livros:", erro));
    }

    function devolverLivro(id: number){
        fetch(`http://localhost:5203/api/livro/devolver/${id}`,{
            method: "PUT"
        })
        .then((resposta) => {
            if (resposta.ok){
                alert("Livro devolvido com sucesso!!!");

                carregarLivros();
            } else{
                alert("Não foi possivel devolver o livro");
            }
        })
        .catch((erro) => console.error("Erro ao devolver",erro));
    }
    return (
        <div>
            <h2>Livros emprestados</h2>
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
                                    onClick={() => devolverLivro(livro.id)}
                                    style={{ padding: "5px 10px", backgroundColor: "#008CBA", color: "white", border: "none", cursor: "pointer" }}
                                >
                                    Realizar Devolução
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


