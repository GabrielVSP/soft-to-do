# To-Do Softpar

WebApp que permite aos usuários gerenciar suas tarefas diárias de maneira eficiente. O usuário pode criar, editar, excluir, e marcar tarefas como concluídas. A aplicação também oferece a possibilidade de filtrar e pesquisar tarefas com base no status e categoria. 

## Tecnologias Usadas

* Backend: Laravel
* Frontend: Vue.js 3
* Banco de Dados: MySQL
* Estilo: Quasar Framework (para UI) e TailwindCss

## Requisitos
* Node.js (v16+)
* Composer
* Php (v8+)
* Laravel (v10+)
* MySQL

## Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/GabrielVSP/soft-to-do.git

cd soft-to-do
```
### Back-end

Navegue até a pasta API e instale as dependências com o composer

```bash
cd API
composer install
```
Após isso, configure o arquivo .env

```bash
DB_CONNECTION=mysql ## tipo de database
DB_HOST=127.0.0.1 #host da databse
DB_PORT=3306 
DB_DATABASE=soft_to_do #nome da databse
DB_USERNAME=root #usuário
DB_PASSWORD= #senha

SANCTUM_STATEFUL_DOMAINS=* #necessário para a API de autenticação
```

Execute as migrações e inicie o servidor
```bash
php artisan migrate

php artisan serve
```

### Front-end

Navegue até a pasta front-end e instale as dependências com o npm

```bash
cd front-end
npm install
```

Inicie o servidor

```bash
npm run dev
```

### Atenção

Certifique-se de que o back-end está usando a porta :8000 e o front-end a porta :9000

## Documentação da API

1- Métodos GET
- `GET` **api/user**:
   * Retorna o usuário autenticado, é necessário enviar o token Bearer nos headers.
- `GET` **api/tasks**:
   * Retorna todas as tarefas vinculadas a um usuário, é necessário enviar o token Bearer nos headers.
- `GET` **api/tasks/[ID]**:
   * Retorna a tarefa especificada pelo ID, é necessário enviar o token Bearer nos headers.
- `GET` **api/categories**:
    * Retorna todas as categorias.

2- Métodos POST
- `POST` **api/register**:
   * Cria um novo usuário junte do token de autenticação.
    ```json
    {
      "name": "Nome do usuário",
      "email": "Email do usuário",
      "password": "senha do usuário",
      "password_confirmation": "senha do usuário"
    }
- `POST` **api/login**:
   * Retorna o token de autenticação
    ```json
    {
      "email": "Email do usuário",
      "password": "senha do usuário"
    }
- `POST` **api/task**:
   * Cria uma nova tarefa, , é necessário enviar o token Bearer nos headers..
    ```json
    {
      "title": "Título da tarefa",
      "description": "Descrição da tarefa",
      "category_id": "ID da categoria a qual a tarefa pertence(em número)",
      "user_id": "ID do usuário a qual a tarefa pertence(em número)"
    }
  
3- Métodos PATCH/PUT
- `PATCH` **api/task/[ID]**:
   * Atualiza a tarefa especificada pelo ID, é necessário enviar o token Bearer nos headers.
    ```json
    {
      "title": "Título da tarefa",
      "description": "Descrição da tarefa",
      "category_id": "ID da categoria a qual a tarefa pertence(em número)",
      "status": "pending | in_progress | completed",
      "completion_date": "String que informa quando foi concluida"
    }

4- Métodos DELETE
- `DELETE` **api/task/[ID]**:
   * Remove a tarefa especifica pelo ID, é necessário enviar o token Bearer nos headers.

## Modelo Entidade-Relacionamento 
![image](https://github.com/user-attachments/assets/450015a3-2ab1-45a5-a820-d041af53d384)
* Users possui uma relação 1:N com as tarefas(um usuário pode ter várias tareafas)
* Categories possui uma relação 1:N com as tarefas(uma categoria pode ter várias tareafas)

## Galeria
<div style="text-align: center; margin: auto">
  <img src="https://github.com/user-attachments/assets/c3df7dee-3852-45b6-949f-f5b6322bea11" width="400">
  <img src="https://github.com/user-attachments/assets/42cef769-ab62-4c7f-898c-ed12c973d3b7" width="400">
  <img src="https://github.com/user-attachments/assets/d7da328c-a364-412b-966f-de4821143936" width="400">
  <img src="https://github.com/user-attachments/assets/ebfbeb7a-181a-4b93-a853-cccdbef20959" width="400">
</div>
