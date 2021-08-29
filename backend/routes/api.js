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

    return res.status(200).json(kanjis);
});

router.post('/deleteKanji', (req, res) => {
    const rawdata = fs.readFileSync('db/kanjis.json');
    const kanjis = JSON.parse(rawdata);

    const idEliminar = req.body.id;

    let nuevosKanjis = kanjis.filter(k => k.id != idEliminar);

    if (nuevosKanjis.length) {
        fs.writeFileSync('db/kanjis.json', JSON.stringify(nuevosKanjis));
    }

    return res.status(200).json(nuevosKanjis);
});


router.post('/createKanji', (req, res) => {
    const rawdata = fs.readFileSync('db/kanjis.json');
    const kanjis = JSON.parse(rawdata);

    let nuevoKanji = req.body;
    kanjis.unshift(nuevoKanji);

    if (kanjis.length) {
        fs.writeFileSync('db/kanjis.json', JSON.stringify(kanjis));
    }

    return res.status(200).json(kanjis);
});

router.post('/editKanji', (req, res) => {
    const rawdata = fs.readFileSync('db/kanjis.json');
    let kanjis = JSON.parse(rawdata);

    let kanjiEditar = req.body;
    let parseKanjis = [];

    kanjis.forEach(k => {
        if (k.id === kanjiEditar.id) {
            parseKanjis.push(kanjiEditar);
        } else {
            parseKanjis.push(k);
        }
    });

    if (parseKanjis.length) {
        fs.writeFileSync('db/kanjis.json', JSON.stringify(parseKanjis));
    }

    return res.status(200).json(parseKanjis);
});


router.post('/eliminarCategoriaVocabulario', (req, res) => {
    const rawdata = fs.readFileSync('db/vocabulario.json');
    let vocabulario = JSON.parse(rawdata);

    let categoriaEliminar = req.body.categoria;

    let nuevoVocabulario = vocabulario.filter(v => v.categoria !== categoriaEliminar);


    if (nuevoVocabulario.length) {
        fs.writeFileSync('db/vocabulario.json', JSON.stringify(nuevoVocabulario));
    }

    return res.status(200).json(nuevoVocabulario);
});


router.post('/editarCategoriaVocabulario', (req, res) => {
    const rawdata = fs.readFileSync('db/vocabulario.json');
    let vocabulario = JSON.parse(rawdata);

    const oldName = req.body.oldName;
    const newName = req.body.newName;

    let nuevoVocabulario = vocabulario.map(v => {
        if (v.categoria === oldName) {
            v.categoria = newName;
        }
        return v;
    });

    if (nuevoVocabulario.length) {
        fs.writeFileSync('db/vocabulario.json', JSON.stringify(nuevoVocabulario));
    }

    return res.status(200).json(nuevoVocabulario);
});


router.post('/nuevoVocabulario', (req, res) => {
    const rawdata = fs.readFileSync('db/vocabulario.json');
    let vocabulario = JSON.parse(rawdata);

    const { kana, significado, categoria } = req.body;

    vocabulario.unshift({
        id: vocabulario.length + 1,
        kana: kana,
        significado: significado,
        categoria: categoria
    });

    if (vocabulario.length) {
        fs.writeFileSync('db/vocabulario.json', JSON.stringify(vocabulario));
    }

    return res.status(200).json(vocabulario);
});




router.post('/eliminarVocabulario', (req, res) => {
    const rawdata = fs.readFileSync('db/vocabulario.json');
    let vocabulario = JSON.parse(rawdata);

    let idEliminar = req.body.id;

    let nuevoVocabulario = vocabulario.filter(v => v.id !== idEliminar);


    if (nuevoVocabulario.length) {
        fs.writeFileSync('db/vocabulario.json', JSON.stringify(nuevoVocabulario));
    }

    return res.status(200).json(nuevoVocabulario);
});


router.post('/editarVocabulario', (req, res) => {
    const rawdata = fs.readFileSync('db/vocabulario.json');
    let vocabulario = JSON.parse(rawdata);

    const { id, kana, significado, categoria } = req.body;

    let nuevoVocabulario = vocabulario.map(v => {
        if (v.id === id) {
            v.kana = kana;
            v.significado = significado;
            v.categoria = categoria;
        }
        return v;
    });

    if (nuevoVocabulario.length) {
        fs.writeFileSync('db/vocabulario.json', JSON.stringify(nuevoVocabulario));
    }

    return res.status(200).json(nuevoVocabulario);
});


router.post('/nuevaCategoriaVocabulario', (req, res) => {
    const rawdata = fs.readFileSync('db/vocabulario.json');
    let vocabulario = JSON.parse(rawdata);

    const { nombre } = req.body;

    vocabulario.unshift({
        id: vocabulario.length + 1,
        categoria: nombre,
    });

    if (vocabulario.length) {
        fs.writeFileSync('db/vocabulario.json', JSON.stringify(vocabulario));
    }

    return res.status(200).json(vocabulario);
});



router.post('/eliminarGramatica', (req, res) => {
    const rawdata = fs.readFileSync('db/gramatica.json');
    let gramatica = JSON.parse(rawdata);

    const { id } = req.body;

    let nuevaGramatica = gramatica.filter(g => g.id !== id);


    if (nuevaGramatica.length) {
        fs.writeFileSync('db/gramatica.json', JSON.stringify(nuevaGramatica));
    }

    return res.status(200).json(nuevaGramatica);
});


router.post('/editarGramatica', (req, res) => {
    const rawdata = fs.readFileSync('db/gramatica.json');
    let gramatica = JSON.parse(rawdata);

    const { id, particula, info, pronunciacion } = req.body;

    gramatica.map(g => {
        if (g.id === id) {
            g.particula = particula;
            g.info = info;
            g.pronunciacion = pronunciacion;
        }
        return g;
    });

    if (gramatica.length) {
        fs.writeFileSync('db/gramatica.json', JSON.stringify(gramatica));
    }

    return res.status(200).json(gramatica);
});



router.post('/crearGramatica', (req, res) => {
    const rawdata = fs.readFileSync('db/gramatica.json');
    let gramatica = JSON.parse(rawdata);

    const { particula, info, pronunciacion } = req.body;

    gramatica.unshift({
        id: gramatica.length + 1,
        particula: particula,
        info: info,
        pronunciacion: pronunciacion
    });


    if (gramatica.length) {
        fs.writeFileSync('db/gramatica.json', JSON.stringify(gramatica));
    }

    return res.status(200).json(gramatica);
});

module.exports = router;