import React from 'react'

const Accountholders = () => {
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

export default Accountholders