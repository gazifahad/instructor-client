
// import { Button } from 'bootstrap';


import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Home.css'
import { useForm } from 'react-hook-form';
import Bill from './Bill/Bill';
import Loading from './Loading/Loading';


const Home = () => {
    const searchRef=useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [inputvalues, setInputValues] = useState([]);
    const [billingList, setBillingList] = useState([]);
    // console.log(inputvalues);
  

    const [lgShow, setLgShow] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        setInputValues(data);
        setIsLoading(true);

        const url = 'http://localhost:5000/api/add-billing';
        fetch(url,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => console.log(data));

    }

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5000/api/entityCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10)
                setPageCount(pages);
            })
    }, [])
    
    const handleSearch=()=>{
        const searchText=searchRef.current.value;
        
        const url2=`http://localhost:5000/tsearch?page=${page}&size=${pageSize}&search=${searchText}`;
        fetch(url2)
        .then(res=>res.json())
        .then(data=>setBillingList(data));
        console.log(searchText);
    }

    useEffect(() => {


        const url1 = `http://localhost:5000/api/billing-list?page=${page}&size=${pageSize}`;
         fetch (url1)
            .then(res => res.json())
            .then(data =>{
                setBillingList(data)
                setIsLoading(false)
                })
                .catch(() => {
                    setErrorMessage("Unable to fetch user list");
                    setIsLoading(false);
                 });


    }, [page, pageSize,inputvalues])





    return (
        <div>
            <h2>home</h2>
            <nav className='w-100 bg-secondary d-flex justify-content-between'>
                <h4>logo</h4>
                <label htmlFor="paid">paid total:
                    <input className='h-100' type="number" value={30} name="paid" readOnly id="" />
                </label>

            </nav>
            <section className='w-100'>

                <nav className='m-5 p-1 bg-secondary d-flex justify-content-between'>
                    <h4>Billing</h4>

                    <div>
                        <input ref={searchRef} placeholder='type to search' className='h-100' type="text" name="search" id="" />
                        <button onClick={handleSearch}>search</button>
                    </div>
                    <>

                        <Button onClick={() => setLgShow(true)}>Add  new bill</Button>

                        <Modal
                            size="lg"
                            show={lgShow}
                            onHide={() => setLgShow(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    Add a new bill
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={handleSubmit(onSubmit)} disabled={isLoading}>
                                    <input placeholder='full name' {...register("name", { required: true, maxLength: 20 })} />
                                    <input placeholder='Email' {...register("email", {required:true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
                                    <input placeholder='phone no.' type="number" maxLength="14" {...register("phone", {required:true, pattern: /^([01]|\+88)?\d{11}/ })} />
                                    <input placeholder='bill amount' type="number" inputmode="numeric" {...register("amount", {required:true, min: 1, max: 1000000 })}  />
                                    <input type="submit" />
                                </form>
                            </Modal.Body>
                        </Modal>
                    </>


                </nav>

            </section>
            <section className='main-area text-center mx-auto'>
           
            
                    {errorMessage && <div className="error">{errorMessage}</div>}
                <h2>bils: {billingList.length}</h2>
                <div className='table-header'>
                    <input className='text-center' type="text" name="id" value='billing id' readOnly id="" />
                    <input className='text-center' type="text" name="name" value="full name" readOnly id="" />
                    <input className='text-center' type="email" name="email" value="email" readOnly id="" />
                    <input className='text-center' type="text" name="phone" value="Contact no." readOnly id="" />
                    <input className='text-center' type="text" name="amount" value='paid amount' readOnly id="" />
                    <input className='text-center' type="text" name="action" value='action' id="" readOnly />
                </div>
                {
                    isLoading && <Loading inputvalues={inputvalues}></Loading> 
                }
                {
                    
                    billingList.map(bill => <Bill list={billingList} setList={setBillingList} key={bill._id} bill={bill}> </Bill>)
                }
            </section>
            <section className='pagination d-flex justify-content-center mt-3' >
                {
                    [...Array(pageCount).keys()].map(number => <button
                        className={page === number + 1 ? 'selected page-item' : 'page-item text-center'} onClick={() => setPage(number + 1)} key={number}>{number + 1} </button>)
                }
                <b>page size: </b>
                <select onChange={(e) => setPageSize(e.target.value)} name='' id=''>

                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="15">20</option>
                </select>
            </section>



        </div>
    );
};

export default Home;