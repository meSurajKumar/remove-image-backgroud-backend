const imagesRoutes = require('../routes/imagesRoutes')

module.exports = function(app){
    app.get('/',(req,res)=>{
        return res.status(200).send('Welcome to app backend')
    })
    app.use('/api/v1/images',imagesRoutes)


    app.use('*',(req,res)=>{
        return res.status(404).send({message : 'The route you are looking for not exsits.'})
    })
}