import React from 'react'

const Card = ({jobInfo}) => {
      const {
    companyName,
    jdLink,
    jdUid,
    jobDetailsFromCompany,
    jobRole,
    location,
    logoUrl,
    maxExp,
    maxJdSalary,
    salaryCurrencyCode,
    minExp,
    minJdSalary,
  } = jobInfo;
  return (
    <>

    <section className="card_Section">
        <div className="main_card_page">
          {/*  div with three cards */}
          <div className="main_card_items">
            {/* card div with details */}
            <div className="card">
              <div className="card_items">
               
                {/* image with title */}
                <p>JobId : {jdUid}</p>
                
                <p>Company Name :{companyName}</p>
                  <p>Job Role :{jobRole} </p>
                  <p>Location : {location}</p>
                <p>Estimated salary: {minJdSalary}-{maxJdSalary}lpa {salaryCurrencyCode}</p>
                <p>Experience: {minExp}-{maxExp}</p>
              </div>
              <div className="card_items_data">
            
                <p className="">Job Details</p>
                <p>
                   
                  {jobDetailsFromCompany.substr(0, 150)}
                </p>
                {/* <p>view job</p> */}
                {/* two button  */}
                {/* <div className="card_b/utton_items"> */}
                <button className="card_button2">Easy Apply</button>
                {/* <button className="card_button2">Unlock refrral asks</button> */}
                {/* </div> */}
              
              </div>
            </div>
          </div>
        </div>
        </section>
      
    </>
  )
}

export default Card
