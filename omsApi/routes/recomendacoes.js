var express = require('express'); 
var router = express.Router();
const recomendacoesController = require('../controllers/recomendacoesControllers');

router.post('/', recomendacoesController.createRecomendacoes);
router.get('/', recomendacoesController.getAllRecomendacoes); // PARA TESTE
router.get('/:codigoRecomendacao', recomendacoesController.getRecomendacaoStatus); // PARA TESTE
// vai para Paises
//router.get('/paises/:codigoPais/surtos/:codigoSurto/recomendacoes', recomendacoesController.getRecomendacoesById); // com codigo pais e codigo surto tenho uma recomendacao
//router.put('/:codigoRecomendacoes', recomendacoesController.updateRecomendacoes);

module.exports = router;


/*
POST: /api/recomendacoes/ OK
PUT: /api/recomendacoes/cr4  
GET: /api/paises/cp1 /cs2 /recomendacoes OK
*/
