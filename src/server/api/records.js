const express = require ('express')
const recordsRouter = express.Router()
const {getAllRecords} = require('../db/records')



recordsRouter.get('/records', async (req, res, next)=>{
    try{
        const record = await getAllRecords()
        res.send(record)
    }catch (err){
        next(err)
    }
})

module.exports = recordsRouter