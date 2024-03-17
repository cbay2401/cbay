import {useState, useEffect}  from 'react';

import axios from "axios";


function AllRecords(){

    const [records, setRecords] = useState([])

    useEffect(()=>{
        async function fetchRecords(){
            const {data} = await axios.get('/api/records')

            setRecords(data)

        }

        fetchRecords()
    },[])

        console.log({records})

    return<div>
        <h2>Records:</h2>
        {records.map(r => <div key={(r.id)} className='records'>
            <h1>{r.artist}</h1>
        </div>)}



    </div>
}


export default AllRecords