import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Search from "../components/forms/Search";
import { searchListings } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {
  // // state
  // const [searchLocation, setSearchLocation] = useState("");
  // const [searchDate, setSearchDate] = useState("");
  // const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]);
  // when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    console.table({ location, date, bed });
    searchListings({ location, date, bed }).then((res) => {
      console.log("SEARCH RESULTS ===>", res.data);
      setHotels(res.data);
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container">
        <div className="row">
          {hotels.length>0 ? hotels.map((h) => (
            <SmallCard key={h._id} h={h} />
          )) : <h4 style={{margin: "10% 40%"}}>Match Not Found</h4>}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
