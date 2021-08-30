const express = require('express');
const cors = require('cors');

const port = 3030;
const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', require('./routes/api'));

// listen in to the port
app.listen(port, () => {
    console.log(`escuchando en el puerto: ${port}`);
});
