import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { setJobData } from "../redux/slice/jobSlice";

const HomePage = () => {
  const [jobData, setJobData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalCount,setTotalCount] = useState()
  const dispatch = useDispatch();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const limit=10
  
  const handleJobAPI = async () => {
    try {
      const body = JSON.stringify({
        limit,
        offset: (page - 1) * limit,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const res = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await res.json();
      console.log("result from api------------", data);
      setJobData((prev) => [...prev, ...data.jdList])
      setLoading(false);
      setTotalCount(data.totalCount)

    //    dispatch(setJobData({ results: data.jdList }));
    //   dispatch(setTotalCount({ total: data.totalCount }));
      


    } catch (err) {
      console.log("error while calling api---", err);
      console.log("error while calling api---", err.message);
    }
  };

  useEffect(()=>{
    if(jobData && totalCount){
         console.log("jobData---",{ results: jobData })
      console.log("totalCount----",{ total: totalCount })

          dispatch(setJobData({ results: jobData }));
          dispatch(setTotalCount({ total: totalCount }));
          
      }
//   dispatch(setJobData({ results: jobData }));
//           dispatch(setTotalCount({ total: totalCount }));
  },[jobData])

//   const handleJobAPI = async () => {
//     try{
//         const body = JSON.stringify({
//           limit,
//           offset: (page - 1) * limit,
//         });
    
//         const requestOptions = {
//           method: "POST",
//           headers: myHeaders,
//           body,
//         };
    
//         const res = await fetch(
//           "https://api.weekday.technology/adhoc/getSampleJdJSON",
//           requestOptions
//         ) 
//         const data = await res.json()
//         setTotalCount(data.totalCount)
//         // setJobData((prev) => [...prev, ...data.jdList]);
//          dispatch(setJobData({ results: data.jdList }));
//       dispatch(setTotalCount({ total: data.totalCount }));
     
//         setLoading(false);
//         console.log("result from api------------",data.jdList)

//     } catch(err){
//         console.log("error while calling api---",err)
//         console.log("error while calling api---",err.message)
//     }
//   };
  

    // useEffect(() => {
    //   handleJobAPI();
    //   console.log("jobData---",jobData)
    //   console.log("totalCount----",totalCount)
    //   if(jobData && totalCount){

    //       dispatch(setJobData({ results: jobData }));
    //       dispatch(setTotalCount({ total: totalCount }));
          
    //   }

     
    // }, [page]);

    const handelInfiniteScroll = async () => {
    //To get height of scroll bar---------- 
    //   console.log("scrollHeight" + document.documentElement.scrollHeight);
      //To get height of viewport screen , which is visible to user (our screen height)--------
    //   console.log("innerHeight" + window.innerHeight);
      //To get how much we scroll the viewport--------
    //   console.log("scrollTop" + document.documentElement.scrollTop);
      try {
        if (
            //if viewed screen height + how much we scroll the screen is > total scroll height then we call api for next 10 data.
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
        ) {
          setLoading(true);
          setPage((prev) => prev + 1);
        //   if((totalCount % limit ? totalCount/limit : (totalCount/limit)+1) > page){

        //   }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // useEffect(() => {
    //   window.addEventListener("scroll", handelInfiniteScroll);
    //   return () => window.removeEventListener("scroll", handelInfiniteScroll);
    // }, []);

  return (
    <div>
      <Home/>
       {/* {loading && <Loading />} */}
      <button onClick={handleJobAPI}>API call</button>
    </div>
  );
};

export default HomePage;
