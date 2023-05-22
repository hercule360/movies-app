//require mongoose 
const mongoose = require ('mongoose')

//connect fuction 
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('connect to database successfully')
    } catch (error) {
        console.log(error)
        
    }
}

// export 

module.exports = connect