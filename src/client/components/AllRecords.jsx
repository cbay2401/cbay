import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AllRecords() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/api/records/records');
        setRecords(data);

        if (sortBy === 'price') {
          data.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'genre') {
          data.sort((a, b) => a.genre.localeCompare(b.genre));
        } else if (sortBy === 'year') {
          data.sort((a, b) => a.year - b.year);
        }
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    }

    fetchData();
  }, [sortBy]);

  if (records.length === 0) return <p>Loading Records...</p>;

  const filteredRecords = records.filter(
    (record) =>
      record.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.albumname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  
  return (
    <>
      <section className="searchbar-container">
        <input
          id="searchbar"
          type="text"
          placeholder="Search by Artist or Album"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="filter" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Filter Records</option>
          <option value="price">Sort by Price</option>
          <option value="genre">Sort by Genre</option>
          <option value="year">Sort by Year Released</option>
        </select>
      </section>
      <div className="main-container">
        <div className="records-container">
          {filteredRecords.map((record) => (
            <Link
              to={`/records/${record.id}`}
              key={record.id}
              className="singlerecord"
            >
              <div key={record.id} className="records">
                <img
                  className="albumcover"
                  src={record.imageurl}
                  alt="Album Cover"
                />
                <div className="records-text">
                  <h4>{record.artist}</h4>
                  <h5>{record.albumname}</h5>
                  <p>${record.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </>
  );
}

export default AllRecords;
