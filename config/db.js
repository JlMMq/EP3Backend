const mongoose = require('mongoose')

const conectarDB = async () => {
    try{
        
        await mongoose.connect('mongodb://127.0.0.1:27017/ComerceBD',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        console.log(`Se establecio conexion con base de datos ComerceBD`)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = conectarDB