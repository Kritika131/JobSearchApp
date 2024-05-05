import React from 'react'
import JobDetailsCard from './JobDetailsCard';

const Home = ({jobInfo}) => {
  return (
    <div>
       <div className="wrapper">
      <div className="container">
        <h1>List of cards</h1>
        <div className="grid grid-three-column">
          {jobInfo.map((curVal, id) => {
            return <JobDetailsCard key={id} jobData={curVal} />;
          })}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
