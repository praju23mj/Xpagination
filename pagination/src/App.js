import React from "react";
import { useState,useEffect } from "react";
import './App.css';

function App() {

  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchData=async ()=>{
    try{
      const response= await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
      const data= await response.json();
      setMembers(data);
      setTotalPages(Math.ceil(data.length / 10));
    }
    catch(error){
      alert('Failed to fetch data');
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }  
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentMembers = members.slice(startIndex, endIndex);




  return (
    <div className="container">
    <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          { currentMembers.map(member=>(
          <tr key={member.id}>
            <td>{member.id}</td>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>{member.role}</td>
          </tr>
           ))}
        </tbody>
      </table>
    <div>
      <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
      <span>{currentPage}</span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
    </div>
  );
}

export default App;
