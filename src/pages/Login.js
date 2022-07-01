import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const { register, handleSubmit } = useForm();
    const [serverUser,setServerUser]=useState([]);
    const onSubmit =async user => {
        const inputEmail=user.Email;
        const inputPass=user.Password;
       const url=`https://my-new-application252563.herokuapp.com/api/login?email=${user.Email}&pass=${user.Password}`

  
        await fetch(url)
        .then(res=>res.json())
        .then(data=>{
         console.log(data.accessToken);
            if(data.result[0].Email==inputEmail && data.result[0].password==inputPass ){
                navigate('/');
                localStorage.setItem('accessToken',data.accessToken);
             }
             else if(data.result[0].Email!==inputEmail && data.result[0].password==inputPass){
               console.log('invalid email');
             }
             else if(data.result[0].Email==inputEmail && data.result[0].password!==inputPass){
               console.log('invalid password');
             }
             else {
               console.log('invalid email and password');
             }
        })
       
        // console.log(serverUser[0].Email,serverUser[0].password);

     
    }
  
    return (
        <div>
           
            <div className='w-100'>
            <h2 className='text-secondary text-center'>Please Login</h2>
          <form className='w-50 mx-auto' onSubmit={handleSubmit(onSubmit)}>
      
      <input className='w-100 mb-3' placeholder='email' {...register("Email", { pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
      <br />
      <input className='w-100 mb-3' type="text" {...register("Password")} />
      <br />
      <input className='btn btn-primary' type="submit" />
    </form>
        </div>
        </div>
    );
};

export default Login;