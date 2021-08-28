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


router.post('/loginAdmin', (req, res) => {
    const rawdata = fs.readFileSync('db/login.json');
    const loginData = JSON.parse(rawdata);

    if (req.body.user === loginData.user && req.body.password === loginData.password) {
        return res.json(1)
    } else {
        return res.json(0)
    }

});


router.post('/getKanjis', (req, res) => {
    const rawdata = fs.readFileSync('db/kanjis.json');
    const kanjis = JSON.parse(rawdata);
    console.log(kanjis);
    return res.status(200).json(kanjis);
});


module.exports = router;