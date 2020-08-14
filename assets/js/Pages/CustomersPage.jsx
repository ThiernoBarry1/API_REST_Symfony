import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import  Pagination from '../Components/Pagination';
const CustomersPage = (props) => {
    const [ customers,  setCustomers ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        Axios.get("http://127.0.0.1:8000/api/customers")
        .then((response)=>response.data['hydra:member'],[])
        .then(data => setCustomers(data))
        .catch(error => console.log(error.response))
    });
    const handleDelete = id=>{
         Axios.delete("http://127.0.0.1:8000/api/customers/"+id).then((response)=> {
             setCustomers(customers.filter(customer=>customer.id !== id ))
         });
     }
     const handlePageChange = (page)=>
     {
         setCurrentPage(page);
     }
     const itemPerPage = 10;
    
     const paginatedCustomers = Pagination.getData(customers,currentPage,itemPerPage);
    return ( 
        <>
        <h1> liste des clients</h1>
        <table className="table table-hover">
           <thead>
               <tr>
                   <th>Id</th>
                   <th>Client</th>
                   <th>Email</th>
                   <th>Entreprise</th>
                   <th  className="text-center">Factures</th>
                   <th  className="text-center">Montant total</th>
                   <th/>
               </tr>
           </thead>
           <tbody>
         { paginatedCustomers.map((customer)=>(
               <tr key={customer.id}>
                   <td>{customer.id}</td>
                   <td>
                     <a href="#"> { customer.firstName} { customer.lastName}</a>
                   </td>
                    <td>{ customer.email}</td>
                    <td>{customer.compagny }</td>
                    <td className="text-center"><span className="badge badge-primary">{customer.invoices.length}</span></td>
                    <td className="text-center">{customer.montantTotal.toLocaleString()}</td>
                   <td>
                       <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(customer.id)} disabled={ customer.invoices.length > 0}>Supprimer</button>
                   </td>
               </tr>
         ))
          } 
           </tbody>
        </table>
        <Pagination currentPage={currentPage}  length={customers.length} itemPerPage ={itemPerPage} 
                  handlePageChange={handlePageChange}/>
        
        </>
     );
}
 
export default CustomersPage;