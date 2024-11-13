# => SafetyTourism

## Para relacionar essas cinco coleções em MongoDB:

### Destino Turístico:
- Utilizador
- Pacote de Viagem
- Reserva
- Estrutura das Coleções
- Destino Turístico

## Estrutura das Coleções:

### Destino Turístico
```javascript
{
  "_id": ObjectId("..."),
  "nome": "Paris",
  "pais": "França"
}
```

### Utilizador
```javascript
{
  "_id": ObjectId("..."),
  "nome": "João Silva",
  "email": "joao@example.com",
  "password": "hashed_password",
  "tipoUtilizador": "cliente", // ou "funcionario"
  "morada": "Rua Exemplo, 123",
  "telefone": "123456789",
  "NIF": "123456789"
}
```

### Pacote de Viagem
```javascript
{
  "_id": ObjectId("..."),
  "descricao": "Voo para Paris",
  "preco": 500,
  "destinoId": ObjectId("...") // Referência à coleção Destino Turístico
}
```

### Reserva

```javascript
{
  "_id": ObjectId("..."),
  "clienteId": ObjectId("..."), // Referência à coleção Utilizador
  "pacoteId": ObjectId("...")  // Referência à coleção Pacote de Viagem
}
```

## Estrutura do Projeto:

### models
- destination_model.js
- user_model.js
- package_model.js
- booking_model.js

### routes
- destination_route.js
- user_route.js
- package_route.js
- booking_route.js

### controllers
- destination_controller.js
- user_controller.js
- package_controller.js
- booking_controller.js

### middleware
- auth.js
- roles.js

### SafetyTourism_project
- app.js

Para implementar processos de autenticação e autorização para os recursos definidos, usaremos o framework Express.js com MongoDB para a API e JWT (JSON Web Tokens) para autenticação.