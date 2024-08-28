import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
 


const MyForm = () => {
  // Correctly initialize the state with the form fields
  const initialValue = { username: '', email: '', password: '', confirmPass: '' };
  const [formData, setFormData] = useState(initialValue);
  const [formErrors,setFormErrors] = useState({});
  const[isSubmit,setIsSubmit] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData); // Log the form data object
      //alert(JSON.stringify(formData,null,200)); // Alert the form data as a string
      setFormErrors(validate(formData));
      setIsSubmit(true);
     
    };
//send the data
useEffect(()=>{
    if(Object.keys(formErrors).length===0 && isSubmit){
        console.log(formData);
    }
},[formErrors]);

//validation
const validate = (values) => {
  const errors={};
  const regex=/^[a-zA-Z]{1}[\\s@]+\.[^\s@]{2,}$/i;
  if(!values.username){
    errors.username="username is required";
  } 
  if(!values.email){
    errors.email="email is required";
  }
  if(!values.password){
    errors.password="password is required";
  }else if(values.password.length<4){
    errors.password="password must be at least 4 characters";
  }else if(values.password.length>10){
    errors.password="password should not exceed more then 10 characters";
  }
  if(!values.confirmPass){
    errors.confirmPass="password is required";
  }
 return errors;
}


  return (
    <div>
        {Object.keys(formErrors).length ===0 && isSubmit?<div>
            <Alert severity="success"> SUCCESSFULLY REGISTER </Alert>
            
           </div>:(
            <pre>{JSON.stringify(formData,undefined,2)}</pre>
           )}
      <form onSubmit={handleSubmit}>
        <p className='heading'>Sign Up</p>
        <div>
          <p className='fieldName'>UseName</p>
          <input
            type='text'
            onChange={handleChange}
            name="username"
            value={formData.username}
          />
        </div>
        <span className="pp">{formErrors.username}</span>
        <div>
          <p className='fieldName'>Email</p>
          <input
            type='email'
            onChange={handleChange}
            name="email"
            value={formData.email}
          />
        </div>
        <span className="pp">{formErrors.email}</span>
        <div>
          <p className='fieldName'>Password</p>
          <input
            type='password'
            onChange={handleChange}
            name="password"
            value={formData.password}
          />
        </div>
        <span className="pp">{formErrors.password}</span>
        <div>
          <p className='fieldName'>Confirm Password</p>
          <input
            type='password'
            onChange={handleChange}
            name="confirmPass"
            value={formData.confirmPass}
          />
        </div>
        <span className="pp">{formErrors.confirmPass}</span>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-4">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
