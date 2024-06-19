
const User = require('../models/User')
const config = require('../config/global')

exports.crearUsuario = async (req, res) => {
    try
    {
        const { apenom, email, password } = req.body
        const user = new User({
            apenom,
            email,
            password
        })

        user.password = await user.encryptPassword(user.password)
        await user.save()

        res.json({
            val : true, 
            apenom: apenom, 
            email: email
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send('Ocurrio un error en crearUsuario')
    } 
}

exports.obtenerUsuario = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    try{
        const { email, password } = req.body
        const user = await User.findOne({email : email})

        if(!user){
            return res.status(404).send("El usuario no existe")
        }

        const validPassword = await user.validatePassword(password)
        if(!validPassword){
            return res.status(404).json({val: false})
        }

        res.json({val: true})
    }
    catch(error){
        console.log(error)
        req.status(500).send('Ocurrio un error en la validacion')
    } 
}