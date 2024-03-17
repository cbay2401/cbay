import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {useParams}  from 'react-router'

function SingleRecord (){
    const {id} = useParams();
    const [record, setRecord] = useState({})
    
    useEffect(() => {
        async function getRecord() {
          try {
            const { data } = await axios.get(`/api/records/${id}`);
            console.log(data);
            setRecord(data);
          } catch (err) {
            console.log("Error: ", err);
          }
        }
        getRecord();
      }, [id]);


    return(
        <>
        <img className="albumcover" src={record.imageurl} alt="Album Cover" />
        <h1>{record.artist}</h1>
        <h2>{record.albumname}</h2>
        <p>${record.price}</p>
        <p>{record.year}</p>
        <p>{record.genre}</p>

        </>
    )
}

export default SingleRecord