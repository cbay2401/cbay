const db = require('./client')



async function getAllRecords(){
    const {rows} = await db.query ('SELECT * FROM records')
    return rows
    
}

async function addNewRecord(record){
    const { artist, albumname, year, genre, imageurl, price } = record

    const {rows}  = await db.query(
        `INSERT INTO records (artist,albumname,year,genre,imageurl,price) 
        VALUES ($1,$2,$3,$4,$5,$6) 
        RETURNING *;`,[artist, albumname, year, genre, imageurl, price]
    )
     return rows [0];
        
}

async function getRecordById( id ) {
    const { rows } = await db.query(`
      SELECT * FROM records
      WHERE id = $1
    `, [ id ] )

    return rows [0]
}

const deleteRecord = async (recordId) => {
    await db.query(`
    DELETE FROM records
    WHERE id = $1
    `, [recordId])
} 

module.exports = {addNewRecord, getAllRecords, getRecordById, deleteRecord}






