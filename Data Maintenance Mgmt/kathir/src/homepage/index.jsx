// import React from 'react'

import { useState } from "react";
import { API_URL } from "../APIURL/apiUrl";
// import { Link } from "react-router-dom";

import axios from 'axios';

const HigherEmployee = () => {


  // let name = "kathir"

  // function setName(newName){
  //   name = newName;
  // }

  // changeName("Balaji")
  
  const [name , setName] = useState(''); // kathir
  const [email , setEmail] = useState(''); // ath@ferd.com
  const [address , setAddress] = useState(''); 
  const [contact , setContact] = useState(''); 

  const changeName = ()=>{
    const currentName = document.getElementById('name-higher').value;
    setName(()=>currentName);
  }
  const changeEmail = ()=>{
    const currentName = document.getElementById('email-higher').value;
    setEmail(()=>currentName);
  }
  const changeAddress = ()=>{
    const currentName = document.getElementById('address-higher').value;
    setAddress(()=>currentName);
  }
  const changeContact = ()=>{
    const currentName = document.getElementById('contact-higher').value;
    setContact(()=>currentName);
  }

  const submitData = async()=>{

    const obj = {
      userName : name,
      userEmail : email,
      userAddress : address,
      userContact : contact
    }

    // const formData = new FormData();
    // formData.append('userName',name);
    // formData.append('userEmail',email);

    console.log(obj)


    const response = await axios.post( API_URL + "/submitData", obj);


    console.log(response.data.message)




  }

  // returns jsx - functional component
  return (
   <>

       <div id="content-higher" className="content">
      
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Add Data </h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form id="dataForm-higher" className="form-container" >
                          <input type="hidden" id="userId-higher" />
                          <label ><b>Name</b></label>
                          <input type="text" id="name-higher" value={name} onChange={()=>changeName()} required />
                          <label ><b>Email</b></label>
                          <input type="email" id="email-higher" value={email} onChange={()=>changeEmail()} required /> 
                          <label ><b>Address</b></label>
                          <input type="address" id="address-higher" value={address} onChange={()=>changeAddress()} required /> 
                          <label ><b>Contact</b></label>
                          <input type="text" id="contact-higher" value={contact} onChange={()=>changeContact()} required /> 
                          {/* <button type="submit" className="btn">Save</button>
                          <button type="button" className="btn cancel" >Close</button> */}
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={()=>submitData()}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>


                <h2>Higher Employees</h2>
              
                <button type="button" className="openFormBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Add Data
                </button>


                <div id="formPopup-higher" className="form-popup">
                    
                </div>
                <table id="dataTable-higher">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            
   </>
  )
}


export default HigherEmployee;