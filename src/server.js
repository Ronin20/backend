//email do diego: diego.schell.f@gmail.com

const express = require('express'); //Aqui ele ta importando express la do node modules
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); //inicializando a aplicação

app.use(cors());

const server = require('http').Server(app)
const io = require('socket.io')(server);

io.onconnection("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-qswa0.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true,
    
})

app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(express.json()); //importando o modulo para trabalhar com arquivos json
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(require('./routes')); //Importando o arquivo de rotas

server.listen(process.env.PORT || 3333); //Colocando a aplicação pra usar a porta definida