# => OMS

## Para relacionar essas cinco coleções em MongoDB:

- Zona
- País
- Vírus
- Surto
- Recomendação

## Estrutura das Coleções:

### Zona
```javascript
{
  "_id": ObjectId("..."),
  "codigoZona": "Z001",
  "nomeZona": "Zona A"
}
```

### País
```javascript
{
  "_id": ObjectId("..."),
  "codigoPais": "P001",
  "nomePais": "País A",
  "codigoZona": "Z001"  // Referência à coleção Zona
}
```

### Vírus
```javascript
{
  "_id": ObjectId("..."),
  "codigoVirus": "V001",
  "nomeVirus": "Vírus A"
}
```

### Surto
```javascript
{
  "_id": ObjectId("..."),
  "codigoSurto": "S001",
  "codigoVirus": "V001",  // Referência à coleção Vírus
  "codigoZona": "Z001",   // Referência à coleção Zona
  "dataDeteccao": ISODate("2023-01-01T00:00:00Z"),
  "dataFim": null
}
```

### Recomendação
```javascript
{
  "_id": ObjectId("..."),
  "codigoRecomendacao": "R001",
  "codigoZona": "Z001",  // Referência à coleção Zona
  "dataNota": ISODate("2023-01-01T00:00:00Z"),
  "validade": 30
}
```

## Estrutura do Projeto:

### models
- user_model.js
- zone_model.js
- country_model.js
- virus_model.js
- outbreak_model.js
- recommendation_model.js

### routes
- auth_route.js
- zones_route.js
- countries_route.js
- viruses_route.js
- outbreaks_route.js
- recommendations_route.js

### controllers
- auth_controller.js
- zones_controller.js
- countries_controller.js
- viruses_controller.js
- outbreaks_controller.js
- recommendations_controller.js

### middleware
- auth.js
- roles.js

### OMS_project
- app.js

Para implementar processos de autenticação e autorização para os recursos definidos, usaremos o framework Express.js com MongoDB para a API e JWT (JSON Web Tokens) para autenticação.