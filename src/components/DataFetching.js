import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/slice/jobSlice';
// import { fetchData } from '../redux/slice/dataSlice';
// import { fetchData } from './features/yourFeatureSlice';

const YourComponent = () => {
  const dispatch = useDispatch();
  const{ data,status ,error,totalCount} = useSelector((state) => state.job);
 
  console.log("data from redux store-----",data)
  console.log("data from redux store totalCount-----",totalCount)

  useEffect(() => {
    dispatch(fetchData({limit:10,offset:0}));
  }, [dispatch]);

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
            fetchedData          {/* {data.map(item => <li key={item.id}>{item.title}</li>)} */}
        </ul>
      )}
    </div>
  );
};

export default YourComponent;
