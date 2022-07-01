import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Bill = ({ bill, list, setList,totalAmount }) => {
    const { _id, name, email, phone, amount } = bill;
    
    const [lgShow, setLgShow] = useState(false);
    // update user start 

    // console.log(id);
    const { register, handleSubmit } = useForm();

    const [updateduser, setupdatedUser] = useState({});

    
    // useEffect(() => {
       
    // }, []);
    
    const handleModifyClick = id => {
        setLgShow(true);
       
        
    }
    
    const onSubmit = async  data => {
        const id=data.id;
        const name=data.name;
        const email=data.email;
        const phone=data.phone;
        const amount=data.amount;


        const updateduser = { name, email,phone,amount };
        console.log(updateduser);
        
        
        fetch(`https://my-new-application252563.herokuapp.com/api/update-billing/${id}`, {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateduser),
        })
            .then(response => response.json())
            .then(data => {
                totalAmount();
                alert('user updated')
                
            })
            //  const newUpdatedUSer=updateduser._id=id;
            //  setupdatedUser(newUpdatedUSer);
            //  console.log(updateduser);
            //  const index = list.findIndex(object => {
            //     return object._id === id;
            //   })
            
            //  console.log(index);


            // const update=()=>{
            // const newList= list[index]={updateduser};
            // setList(newList);
            // }
        

    }

    useEffect(()=>{
        
        const url=`https://my-new-application252563.herokuapp.com/api/update-billing/${_id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setupdatedUser(data))
    },[_id]);
        // const handleupdateduser=()=>{}
        
        
          
    





    // update user finish 
    // console.log(list);
    const handleDelete = (id) => {
        console.log(id);
        const url = `https://my-new-application252563.herokuapp.com/api/delete-billing/${id}`

        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => totalAmount())

        const rest = list.filter(b => b._id !== id)
        setList(rest);


    }
    function refreshPage(){
        window.location.reload();
    }
    
    return (
        <div className='main'>
            <div className='d-flex justify-content-center'>
                <input type="text" name="id" value={_id} readOnly id="" />
                <input type="text" name="name" value={name} readOnly id="" />
                <input type="email" name="email" value={email} readOnly id="" />
                <input type="number" name="phone" value={phone} readOnly id="" />
                <input type="number" name="amount" value={amount} readOnly id="" />
                <input type="button" onClick={() => handleModifyClick(_id)} name="edit" value='modify item' id="" />
                <input onClick={() => handleDelete(_id)} type="button" name="delete" value='delete item' id="" />
            </div>
            <div className='modal'>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                           tap to edit the bill
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" name="id" value={_id}  {...register("id")} readOnly id="" />
                            <input placeholder={name} {...register("name", { required: true, maxLength: 20 })} />
                            <input placeholder={email} {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
                            <input placeholder={phone} type="number" maxLength="11" {...register("phone", { required: true, pattern: /^([01]|\+88)?\d{11}/ })} />
                            <input placeholder={amount} type="number" inputmode="numeric" {...register("amount", { required: true, min: 1, max: 1000000 })} />
                            <input type="submit"/>
                            <button onClick={refreshPage}>Refresh</button>
                        </form>
                    </Modal.Body>
                </Modal>
          

        </div>

        </div >
    );
};

export default Bill;