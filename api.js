var Db = require('./dboperations')
var Cliente = require('./cliente')
const dboperations = require('./dboperations')


var express = require('express')
var cors = require('cors')
var app = express()
var router = express.Router();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//app.use('api', router)  //verificar utilização

//Criando as rotas da API

app.route((request, response, next)=>{
   console.log('middleware');
   next();
})

//Rota busca todos na tabela cliente
app.route('/clientes').get((request, response) =>{
    dboperations.getClientes().then(result => {
        response.json(result[0])

    })
})

//Rota busca clientes por ID
app.route('/clientes/:id').get((request, response) => {
    dboperations.getClientesid(request.params.id).then(result => {
        response.json(result[0])
    })
})

//Rota para adicionar clientes

app.route('/clientes').post((request, response)=>{
    let cliente = {...request.body}

    dboperations.addClientes(cliente).then(result => {
        response.status(201).json(result)
    })
})

//configurando porta de escuta do express

app.listen(3003, ()=>console.log('Servidor Rodando na porta 3003'))

/*var port = process.env.PORT || 8090
app.listen(port)
console.log('App na porta ' + port)

*/


/*teste de conexão
dboperations.getClientes().then(result => {
    console.log(result)
})
*/

