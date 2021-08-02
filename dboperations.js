var config = require('./dbconfig')
const sql = require('mssql')




//função para buscar os clientes (todos)
async function getClientes() {
   try{
      let pool = await sql.connect(config)
      let clientes = await pool.request().query('SELECT * from clientes')
      return clientes.recordsets;
   }
   catch (error){
      console.log(error);
   }
}

//função para buscas clientes por ID

async function getClientesid(clienteId){
    try{
       let pool = await sql.connect(config)
       let clientes = await pool.request()
           .input('input_parameter', sql.Int, clienteId)
           .query("SELECT * from clientes where id = @input_parameter")
        return clientes.recordsets
    }
    catch (error) {
        console.log(error)
    }
 }

 //Função para adicionar clientes na tabela

 async function addClientes(cliente) {

   try {
       let pool = await sql.connect(config);
       let insertCliente = await pool.request()
           .input('nome', sql.VarChar, cliente.nome)
           .input('email', sql.VarChar, cliente.email)
           .execute('cadastro');
       return insertCliente.recordsets;
   }
   catch (err) {
       console.log(err);
   }
}


module.exports = {
   getClientes : getClientes,
   getClientesid : getClientesid,
   addClientes: addClientes
}