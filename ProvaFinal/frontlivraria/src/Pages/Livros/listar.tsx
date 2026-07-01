import { useEffect, useState } from "react";

export interface Livro {
    id: number;
    nome: string;
    autor: string;
    estaDisponivel: boolean; // Mantemos minúsculo seguindo o padrão da API
    qtdEmprestimo: number;   // Nome exato que apareceu no console!
}

export function ListarLivros() {
    // 1. ESTADO: Começamos com uma lista vazia de livros
    const [livros, setLivros] = useState<Livro[]>([]);

    // 2. EFEITO: Roda automaticamente ao abrir a página
    useEffect(() => {
        carregarLivros();
    }, []);

    // 3. BUSCA: Fazemos a requisição para a sua API em C#
    function carregarLivros() {
        // Atenção: Substitua "5000" pela porta que a sua API C# está rodando
        // Substitua também a rota caso a sua rota de listagem no C# seja diferente
        fetch("http://localhost:5203/api/livro/listar") 
            .then((resposta) => resposta.json())
            .then((dados) => {
                console.log("DADOS QUE CHEGARAM DA API:", dados);
                // Pegamos os dados da API e salvamos no nosso estado
                setLivros(dados); 
            })
            .catch((erro) => {
                console.error("Erro ao buscar livros da API:", erro);
            });
    }

    // 4. TELA: Renderizamos a tabela
    return (
        <div>
            <h2>Listagem de Livros</h2>
            <table border={1} style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Autor</th>
                        <th>Disponível?</th>
                        <th>Empréstimos</th>
                    </tr>
                </thead>
                <tbody>
    {livros.map((livro) => (
        // O id minúsculo resolve o erro vermelho do console
        <tr key={livro.id}> 
            <td>{livro.id}</td>
            <td>{livro.nome}</td>
            <td>{livro.autor}</td>
            <td>{livro.estaDisponivel ? "Sim" : "Não"}</td>
            <td>{livro.qtdEmprestimo}</td> 
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
}