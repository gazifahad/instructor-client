import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const Register = () => {
    // const [user,setUser]=useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
    // setUser(data);
    const url='http://localhost:5000/api/registration';
    fetch(url,
     {
        method:"POST",
        headers:{
         "content-type":"application/json"
        },
        body:JSON.stringify(data)
     })
     .then(res=>res.json())
     .then(data=>console.log(data))
    }
    // console.log(data);
    return (
        <div className='w-100'>
            <h2 className='text-secondary text-center'>Please Register</h2>
          <form className='w-50 mx-auto' onSubmit={handleSubmit(onSubmit)}>
      <input className='w-100 mb-3' placeholder='name' {...register("Name", { required: true, maxLength: 20 })} />
      <br />
      <input className='w-100 mb-3' placeholder='email' {...register("Email", { pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
      <br />
      <input className='w-100 mb-3' type="text" {...register("password")} />
      <br />
      <input className='btn btn-primary' type="submit" value={'Register'} />
    </form>
        </div>
    );
};

export default Register;