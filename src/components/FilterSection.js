import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataByFilter } from '../redux/slice/jobSlice';

const FilterSection = () => {
     const { data, status, error, totalCount } = useSelector((state) => state.job);

     const dispatch = useDispatch();

  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
//   const [employees, setEmployees] = useState('');
//   const [remote, setRemote] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
//   companyName,
//     jdLink,
//     jdUid,
//     jobDetailsFromCompany,
//     jobRole,
//     location,
//     logoUrl,
//     maxExp,
//     maxJdSalary,
//     salaryCurrencyCode,
//     minExp,
//     minJdSalary,



  const handleFilters = (role,experience,salary,companyName,location ,data)=>{
   
    if(role){
        const filteredData = data && data.filter((item)=>(item.jobRole).includes(role.toLowerCase()))
        console.log("role filtered-----",filteredData)
        dispatch(setDataByFilter(filteredData))
        return filteredData;
    }
    else if(companyName){
        const filteredData = data && data.filter((item)=>(item.companyName).includes(companyName.toLowerCase()))
        dispatch(setDataByFilter(filteredData))
        console.log("role filtered-----",filteredData)
        return filteredData;
    } 
    else if(location){
        const filteredData = data && data.filter((item)=>(item.location).includes(location.toLowerCase()))
        dispatch(setDataByFilter(filteredData))
        console.log("role filtered-----",filteredData)
        return filteredData;
    } 
    else if(experience){
        console.log(typeof experience)
        const filteredData = data && data.filter((item)=>(parseInt(item.minExp) <= parseInt(experience) && parseInt(item.maxExp) >= parseInt(experience)
))
        dispatch(setDataByFilter(filteredData))
        console.log("role filtered-----",filteredData)
        return filteredData;
    } 
    else if(salary){
        console.log(typeof salary)
        const filteredData = data && data.filter((item)=>(parseInt(item.maxJdSalary)>= parseInt(salary) && parseInt(item.minJdSalary) >= parseInt(salary)))
        dispatch(setDataByFilter(filteredData))
        console.log("role filtered-----",filteredData)
        return filteredData;
    } 
    else {
        
        dispatch(setDataByFilter([]))
        return data;
    }
    
    
}
const clearFilter=(e)=>{
    dispatch(setDataByFilter([]))
    e.preventDefault()
    setRole("")
    setCompanyName("")
    setExperience("")
    setSalary("")
    setLocation("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, experience, salary,companyName });
    console.log("data pass to filter--",data);
    const filteredData = handleFilters(role,experience,salary,companyName,location ,data)
    console.log("filteredData----------",filteredData)

  };

  return (
    <div className='filters-section'>

   
    <form onSubmit={handleSubmit}className='filters-container'>
       <div className='filter'>
        
          
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        />
       
      <input
        type="number"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        />
       
      <input
            
            type="number"
            placeholder="Minimum Base pay salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            />
            </div>
           
            <div  className='filter'>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
     

      {/* <label>
        Remote: */}
        {/* <input
          type="text"
          placeholder='Remote'
          value={remote}
          onChange={(e) => setRemote(e.target.value)}
        /> */}
       
        <input
          type="text"
          placeholder='Company Name'
          checked={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      <button type="submit">Apply Filters</button>
        </div>
      {/* </label> */}
    </form>
     </div>
  );
};

export default FilterSection;
