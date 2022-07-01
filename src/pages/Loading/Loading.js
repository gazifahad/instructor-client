import React from 'react';

const Loading = ({inputvalues}) => {
    return (
        <div>
            <> <input type="text" name="id" value='loading' readOnly id="" />
           <input type="text" name="name" value={inputvalues.name} readOnly id="" />
           <input type="email" name="email" value={inputvalues.email} readOnly id="" />
           <input type="number" name="phone" value={inputvalues.phone} readOnly id="" />
           <input type="number" name="amount" value={inputvalues.amount} readOnly id="" />
           <input type="text" name="" id="" /></>
        </div>
    );
};

export default Loading;