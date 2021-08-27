const { Router } = require('express');
const fs = require('fs');


const router = Router();

// Crear un nuevo usuario
router.post('/getVocabulario', (req, res,) => {
    const rawdata = fs.readFileSync('db/vocabulario.json');
    const vocabulario = JSON.parse(rawdata);

    return res.status(200).json(vocabulario);
});


router.post('/getGramatica', (req, res) => {
    const rawdata = fs.readFileSync('db/gramatica.json');
    const gramatica = JSON.parse(rawdata);

    return res.status(200).json(gramatica);
});






module.exports = router;