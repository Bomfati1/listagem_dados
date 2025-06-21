# 🚀 Sistema de Cadastro de Alunos

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Aplicação web moderna, do tipo SPA (Single Page Application), desenvolvida em React para gerenciar o cadastro completo de alunos. A interface permite criar, listar, editar e excluir registros de forma dinâmica e interativa utilizando modais.

---

### ✨ Funcionalidades Principais

- **Listagem de Alunos:** Visualização de todos os alunos cadastrados em uma tabela organizada.
- **Adicionar Novo Aluno:** Cadastro de novos alunos através de um formulário em modal, com validação para matrículas não repetidas.
- **Editar Aluno:** Alteração dos dados de um aluno existente em um modal pré-preenchido.
- **Excluir Aluno:** Remoção de um aluno do sistema com um modal de confirmação para evitar exclusões acidentais.
- **Interface Interativa:** Utilização de modais para todas as ações de CRUD, melhorando a experiência do usuário.
- **Estilização Profissional:** Interface estilizada com a biblioteca `react-bootstrap`.

---

### 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - [React.js](https://reactjs.org/) (com Hooks)
  - [Vite](https://vitejs.dev/) como ambiente de desenvolvimento e build
- **Roteamento:**
  - [React Router DOM](https://reactrouter.com/)
- **Estilização:**
  - [Bootstrap](https://getbootstrap.com/)
  - [React-Bootstrap](https://react-bootstrap.github.io/)
- **Comunicação com API:**
  - [Axios](https://axios-http.com/)
- **API Mock (Simulada):**
  - [json-server](https://github.com/typicode/json-server)

---

### 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node.js)

---

### ⚙️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Bomfati1/listagem_dados.git
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd listagem_dados/listagem
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure a API Mock:**

    - Certifique-se de que o arquivo `db.json` existe na raiz do projeto com a estrutura correta:

      ```json

        "alunos": [
            { "id": "id",
            "nome": "Nome",
            "email": "Email",
            "matricula": "20251040",
            "curso": "Nome do curso",
            "dataNascimento": "2003-09-01",
            "ativo": true }
        ]

      ```

---

### ▶️ Como Executar a Aplicação

Para que a aplicação funcione, você precisa iniciar **dois servidores** em terminais separados.

1.  **Terminal 1: Inicie a API Mock**

    - Este terminal irá servir os dados do seu arquivo `db.json`.

    ```bash
    npm run mock-api
    ```

    - A API estará disponível em `http://localhost:3001` (ou a porta que você configurou).

2.  **Terminal 2: Inicie a Aplicação React**
    - Este terminal irá servir a interface do usuário.
    ```bash
    npm run dev
    ```
    - Abra seu navegador e acesse `http://localhost:5173` (ou a porta que aparecer no seu terminal).

---

### 📁 Estrutura de Pastas

O projeto está organizado da seguinte forma para facilitar a manutenção:

```
src/
├── components/     # Componentes React reutilizáveis (ex: AlunoForm.jsx)
├── pages/          # Componentes que representam as páginas (ex: AlunosListPage.jsx)
└── services/       # Lógica de comunicação com a API (ex: alunoService.js)
```

---

### 🔗 Endpoints da API Mock

A API simulada pelo `json-server` oferece os seguintes endpoints para o recurso `/alunos`:

| Método   | URL           | Descrição                            |
| -------- | ------------- | ------------------------------------ |
| `GET`    | `/alunos`     | Retorna a lista de todos os alunos.  |
| `GET`    | `/alunos/:id` | Retorna um aluno específico por ID.  |
| `POST`   | `/alunos`     | Cria um novo aluno.                  |
| `PUT`    | `/alunos/:id` | Atualiza todos os dados de um aluno. |
| `DELETE` | `/alunos/:id` | Exclui um aluno.                     |

---

### 🔮 Possíveis Melhorias

- Conexão com um banco de dados real (usando um backend em Node.js + Express, por exemplo).
- Sistema de autenticação de usuários (Login/Senha com JWT).
- Testes unitários e de integração (com Jest e React Testing Library).
- Paginação na lista de alunos para lidar com grandes volumes de dados.
- Funcionalidade de busca e filtros dinâmicos.

---

### ✒️ Autores

**Matheus Bomfati Lemes**
**Reinaldo Calixto Junior**
**Lucas Rafael Paulino de Oliveira**
