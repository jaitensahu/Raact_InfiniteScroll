import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import Image from "./Imagecomponent/Imagecomponent";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  let visible = true;
  let [randomDataArray, setRandomDataArray] = useState([]);
  let inputQuery = useRef("");

  let randomPhotoAPI =
    "https://api.unsplash.com/photos/random?count=10&client_id=umtYoNCvI49r6lf9UN-zY2X36JljY4_aTvyW11w5Xm8";

  // Fetch Api Data
  async function getData(pg = 1, query = "") {
    let response;
    // setRandomDataArray((prev) => []);
    try {
      if (query != "") {

        response = await axios(
          `https://api.unsplash.com/search/photos?page=${pg}&query=${query}&client_id=umtYoNCvI49r6lf9UN-zY2X36JljY4_aTvyW11w5Xm8`
        );
        setRandomDataArray((prev) => [...response.data.results]);
        return response.data.results;
      } else {
        // setRandomDataArray((prev) => [])
        response = await axios(randomPhotoAPI);
        // console.log(response.data);
        setRandomDataArray((prev) => [...prev,...response.data]);
        return response.data;
      }
      // return response.data;
    } catch (error) {
      alert(error.message+". Try After Some Time")
      console.log(error.message);
    }
    // return response;
  }

  useEffect(() => {
    getData();
  }, []);

  // Function To Get Input Value
  function getQuery() {
    getData(1, inputQuery.current.value);
  }
    
  // Get Random Data On Empty String
  function getRandomOnEmpty(e) {
    if (e.target.value == "") getData();
  }

 async function fetchMoreData(){
  let moreData;
  // console.log(inputQuery.current.value);
  if(inputQuery.current.value==""){
    moreData= await getData();
  }else{
    let res = await getData(1, inputQuery);
    // console.log(res);
    moreData=res;
    // console.log(moreData);
  }
    console.log(moreData);
    setRandomDataArray((prev) => [...prev,...moreData]);
  }

  console.log("Data=", randomDataArray);
  return (
    <div className="App">
      <div className="InputContainer">
      <input placeholder="Search" type="text" ref={inputQuery} onChange={getRandomOnEmpty} />
      <button onClick={getQuery}>Search</button>
      </div>
      <InfiniteScroll
        dataLength={randomDataArray.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        endMessage=
        {
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      </InfiniteScroll>
      <div className="imgContainer">
        {randomDataArray.map((ele) => {
          return <Image data={ele} />;
        })}
      </div>
    </div>
  );
}

export default App;
