const express = require ('express')
const recordsRouter = express.Router()
const {getAllRecords, addNewRecord, getRecordById} = require('../db/records')



recordsRouter.get('/records', async (req, res, next)=>{
    try{
        const record = await getAllRecords()
        res.send(record)
    }catch (err){
        next(err)
    }
})

recordsRouter.post('/records', async (req, res, next) => {
    const {artist, albumname, year, genre, imageurl, price} = req.body

    const recordData = {}

    try {
    //    recordData.recordId = req.records.id
       recordData.artist = artist
       recordData.albumname = albumname
       recordData.year = year
       recordData.genre = genre
       recordData.imageurl = imageurl
       recordData.price = price


       const record = await addNewRecord(recordData);

       if (record) {
         res.send(record);
       } else {
         next({
           name: 'RecordCreationError',
           message: 'There was an error creating your record. Please try again.'
         })
       }
     } catch ({ name, message }) {
       next({ name, message });
    }
})
recordsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const record = await getRecordById(id)
    if (!record) {
      res.status(404).send('No record found.')
    } else {
      res.send(record)
    }
  } catch(err) {
    next(err)
  }
})

module.exports = recordsRouter