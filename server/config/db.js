const mongoose =  require('mongoose')

const connectDatabase = async() => {
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('MongoDB Connected')
    }).catch(err=>{
        console.log('MongoDB Erorr' + err.message)
    })
}

module.exports = connectDatabase