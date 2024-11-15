var express = require('express'); 
var router = express.Router();
const recomendacoesController = require('../controllers/recomendacoesControllers');


router.post('/', recomendacoesController.createRecomendacoes);
router.get('/', recomendacoesController.getAllRecomendacoes); // PARA TESTE

router.get('/:codigoPais/:codigoSurto', recomendacoesController.getRecomendacoesByPaisBySurto);

router.put('/:codigoRecomendacoes', recomendacoesController.updateRecomendacoes);

// router.get('/:codigoPais/:recomendacoes', paiseController.getByCode, recomendacoesController.getAllRecomendacoes); // PARA TESTE






module.exports = router;


// vai para Paises
//router.get('/paises/:codigoPais/surtos/:codigoSurto/recomendacoes', recomendacoesController.getRecomendacoesById); // com codigo pais e codigo surto tenho uma recomendacao





/*
POST: /api/recomendacoes/ OK
PUT: /api/recomendacoes/cr4  
GET: /api/paises/cp1 /cs2 /recomendacoes OK
*/
