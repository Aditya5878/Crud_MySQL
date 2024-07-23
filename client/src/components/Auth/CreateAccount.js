import React from 'react';
import { Link , useHistory} from 'react-router-dom';

import { useState } from 'react';



const CreateAccount = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const history = useHistory();
 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);

        fetch('/CreateAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.Status === "Success") {
                console.log(data.Status);
                alert("Account Created Successfully");
                history.push('/Login');
            } else {
                alert("Error and Account Creation Failed");
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    };




    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form  onSubmit={handleSubmit}>
                <div classname="mb-3">
                    <label htmlFor='name'><strong>Name</strong> </label>
                    <input type="text" placeholder='Enter Name' name ='name'
                     onChange={e => setValues({...values , name: e.target.value})}className='form-control rounded-0' />
                </div>
                <div classname="mb-3">
                    <label htmlFor='email'><strong>Email</strong> </label>
                    <input type="email" placeholder='Enter Email' name ='email' 
                     onChange={e => setValues({...values , email: e.target.value})} className='form-control rounded-0' />
                </div>
                <div classname="mb-3">
                    <label htmlFor='password'><strong>Password</strong> </label>
                    <input type="password" placeholder='Enter password' name ='password'
                     onChange={e => setValues({...values , password: e.target.value})} className='form-control rounded-0' />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign-Up</button>
                <p>You are agree to ours terms and policies </p>
                <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
            
        </div>
    )
}


export default CreateAccount;

