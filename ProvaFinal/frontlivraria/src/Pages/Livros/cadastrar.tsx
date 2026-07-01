import { useState } from "react";
// Opcional: Ferramenta para redirecionar o usuário para a lista após o cadastro
import { useNavigate } from "react-router-dom"; 

export function CadastrarLivro() {
    // 1. ESTADO: Criamos uma "memória" para cada campo do formulário
    const [nome, setNome] = useState("");
    const [autor, setAutor] = useState("");
    
    const navigate = useNavigate();

    // 2. AÇÃO DO BOTÃO: Esta função roda quando clicamos em "Cadastrar"
    function lidarComCadastro(e: React.FormEvent) {
        // ESSENCIAL: Evita que a página recarregue (comportamento padrão do HTML)
        e.preventDefault();

        // 3. O PACOTE: Montamos o objeto exatamente como a API C# espera receber
        const novoLivro = {
            nome: nome,
            autor: autor
        };

        // 4. O ENVIO: Fazemos a requisição tipo POST
        // Atenção: Ajuste a rota se a sua API C# estiver usando um caminho diferente
        fetch("http://localhost:5203/api/livro/cadastrar", {
            method: "POST", // Avisamos que estamos enviando dados (não apenas buscando)
            headers: {
                "Content-Type": "application/json", // Avisamos que o formato é JSON
            },
            body: JSON.stringify(novoLivro), // Transformamos o objeto JS em texto JSON
        })
        .then((resposta) => {
            if (resposta.ok) {
                alert("Livro cadastrado com sucesso!");
                navigate("/Pages/Livros/listar"); // Manda o usuário de volta para a tabela!
            } else {
                alert("Erro ao cadastrar o livro.");
            }
        })
        .catch((erro) => {
            console.error("Erro na comunicação com a API:", erro);
        });
    }

    // 5. TELA: O formulário em HTML
    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>Cadastrar Novo Livro</h2>
            
            {/* O onSubmit liga o formulário à nossa função */}
            <form onSubmit={lidarComCadastro} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                
                <div>
                    <label>Nome do Livro:</label><br />
                    <input 
                        type="text" 
                        value={nome} 
                        // Toda vez que o usuário digita, atualizamos o estado
                        onChange={(e) => setNome(e.target.value)} 
                        style={{ width: "100%", padding: "8px" }}
                        required 
                    />
                </div>

                <div>
                    <label>Autor:</label><br />
                    <input 
                        type="text" 
                        value={autor} 
                        onChange={(e) => setAutor(e.target.value)} 
                        style={{ width: "100%", padding: "8px" }}
                        required 
                    />
                </div>

                <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
}