import React from 'react';

const Bill = ({bill,list,setList}) => {
    // console.log(list);
    const handleDelete=(id)=>{
        console.log(id);
       const url=`http://localhost:5000/api/delete-billing/${id}`

        fetch(url,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>console.log(data))

        const rest=list.filter(b=>b._id !== id)
            setList(rest);
        

    }
    const {_id,name,email,phone,amount}=bill;
    return (
        <div className='d-flex justify-content-center'>
           <input type="text" name="id" value={_id} readOnly id="" />
           <input type="text" name="name" value={name} readOnly id="" />
           <input type="email" name="email" value={email} readOnly id="" />
           <input type="number" name="phone" value={phone} readOnly id="" />
           <input type="number" name="amount" value={amount} readOnly id="" />
           <input type="button" name="edit" value='modify item' id="" />
           <input onClick={()=>handleDelete(_id)} type="button" name="delete" value='delete item' id="" />
        </div>
    );
};

export default Bill;