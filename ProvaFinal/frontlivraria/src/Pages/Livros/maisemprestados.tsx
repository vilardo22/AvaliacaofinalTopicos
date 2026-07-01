import { useEffect, useState } from "react";

// Mantemos a nossa interface padronizada com o back-end
export interface Livro {
    id: number;
    nome: string;
    autor: string;
    estaDisponivel: boolean;
    qtdEmprestimo: number; // Nome exato mapeado da sua API
}

export function LivroMaisEmprestado() {
    // 1. MUDANÇA NO ESTADO: 
    // Como a API retorna apenas UM livro, não começamos com um array vazio [].
    // Começamos com "null" (nulo) e avisamos ao TypeScript que essa variável 
    // pode ser do tipo Livro OU nula (<Livro | null>).
    const [livro, setLivro] = useState<Livro | null>(null);
    const [carregando, setCarregando] = useState(true);

    // 2. O gatilho para buscar os dados ao abrir a página
    useEffect(() => {
        fetch("http://localhost:5203/api/livro/maisemprestado")
            .then((resposta) => {
                if (resposta.ok) {
                    return resposta.json();
                }
                throw new Error("Nenhum livro encontrado ou banco vazio.");
            })
            .then((dados) => {
                // Guardamos o objeto do livro diretamente no estado
                setLivro(dados);
                setCarregando(false);
            })
            .catch((erro) => {
                console.error("Erro ao buscar o livro mais emprestado:", erro);
                setCarregando(false);
            });
    }, []);

    // 3. RENDERIZAÇÃO CONDICIONAL (Essencial para não quebrar a tela)
    // Como a internet demora alguns milissegundos para trazer os dados, se o React 
    // tentar ler "livro.nome" logo de cara com ele valendo "null", a aplicação quebra.
    // Colocamos essa barreira amigável enquanto os dados não chegam:
    if (carregando) {
        return <p style={{ textAlign: "center" }}>Carregando dados do campeão de empréstimos...</p>;
    }

    // Se parou de carregar mas o livro continua nulo (banco vazio, por exemplo):
    if (!livro) {
        return <p style={{ textAlign: "center" }}>Nenhum dado de empréstimo registrado no sistema.</p>;
    }

    // 4. A TELA: Quando os dados finalmente chegam com sucesso
    return (
        <div style={{ maxWidth: "500px", margin: "30px auto", padding: "25px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>🏆 Livro Mais Emprestado</h2>
            
            <hr />
            
            <div style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.8" }}>
                <p><strong>ID do Livro:</strong> {livro.id}</p>
                <p><strong>Título:</strong> {livro.nome}</p>
                <p><strong>Autor:</strong> {livro.autor}</p>
                
                {/* Destaque para o requisito principal da funcionalidade */}
                <p style={{ color: "#E65100", fontWeight: "bold" }}>
                    Quantidade Total de Empréstimos: {livro.qtdEmprestimo} vezes
                </p>
                
                <p><strong>Status Atual na Biblioteca:</strong> {livro.estaDisponivel ? "Disponível para retirada" : "Emprestado no momento"}</p>
            </div>
        </div>
    );
}