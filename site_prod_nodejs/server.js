/* 
    Autor: Leandro Schelb - leandro.schelb@gmail.com

    Desc: Servidor node.js+express simples.

    TO-DO:
        - PORT poderia ser uma Environment Variable.
*/

const express = require('express')
const app = express()
const routes = require('./routes.js')

app.use('/', express.static(__dirname + '/public'));
app.use('/api/', routes)


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
