import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AllRecords() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchRecords() {
      try {
        const { data } = await axios.get("/api/records");
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    }

    fetchRecords();
  }, []);

  if (records.length === 0) return <p>Loading Records...</p>;

  const filteredRecords = records.filter(
    (record) =>
      record.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.albumname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
        <input id="searchbar" type="text"
        placeholder = "Search Artist or Album Name"
        value={searchQuery}
        onChange={(e)=> setSearchQuery(e.target.value)}/>
      <div className="records-container">
        {filteredRecords.map((record) => (
          <Link to={`/records/${record.id}`} key={record.id} className="singlerecord">
            <div key={record.id} className="records">
              <img className="albumcover" src={record.imageurl} alt="Album Cover" />
              <h1>{record.artist}</h1>
              <h2>{record.albumname}</h2>
              <p>${record.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default AllRecords;
