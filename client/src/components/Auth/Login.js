import React, { useState } from 'react';
import { useHistory , Link } from 'react-router-dom'; 



const Login = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(values);

        if (!values.email.trim() || !values.password.trim()) {
            alert("Please provide both email and password.");
            return; // Exit the function if validation fails
        }

        try {
            const response = await fetch('/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include', // Important for sending/receiving cookies
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (data.Status === "Success") {
                console.log(data.Status);
                history.push('/home'); // Redirect to the home page
            } else {
                console.log(data.Status);
                alert("Invalid Credentials");
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                         onChange={e => setValues({...values , email: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                         onChange={e => setValues({...values , password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                    <p>You are agree to ours terms and policies</p>
                    <Link to ='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
            
        </div>
    )
}

export default Login

