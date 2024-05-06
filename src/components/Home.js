import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/slice/jobSlice";
import Loading from "./Loading";
import JobDetailsCard from "./JobDetailsCard";
import FilterSection from "./FilterSection";
import Card from "./Card";

// import { fetchData } from '../redux/slice/dataSlice';
// import { fetchData } from './features/yourFeatureSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { data, filteredData,status, error, totalCount } = useSelector((state) => state.job);
  const limit = 10;
  console.log("data from redux store-----", data);
  console.log("data from redux store totalCount-----", totalCount);

  useEffect(() => {
    dispatch(fetchData({ limit, offset: (page - 1) * limit }));
  }, [dispatch,page]);

  const handleScroll = () => {
     
   
    //To get height of scroll bar----------
//       console.log("scrollHeight" + document.documentElement.scrollHeight);
//     //To get height of viewport screen , which is visible to user (our screen height)--------
//       console.log("innerHeight" + window.innerHeight);
//     //To get how much we scroll the viewport--------
//       console.log("scrollTop" + document.documentElement.scrollTop);
    if (
          //if viewed screen height + how much we scroll the screen is > total scroll height then we call api for next 10 data.

      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      if  (data.length < totalCount) {
        setPage((prevPage) => prevPage + 1);
      } 
      
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.length]);



  return (
    <div>
    
       
       {/* <div className="wrapper"> */}
      <div className="container">
        <h3>List of cards</h3>
            <FilterSection/>
        <div className="grid grid-three-column">
            {filteredData.length>0 ? filteredData.map((curVal, id) => {
            return <Card key={id} jobInfo={curVal} />;
          }) : (
             data && data.map((curVal, id) => {
            return <Card key={id} jobInfo={curVal} />;
          })
          )}
         
        </div>
      </div>
    {/* </div> */}
    
    </div>
  );
};

export default Home;
