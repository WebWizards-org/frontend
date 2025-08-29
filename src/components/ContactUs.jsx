import React, { useState } from 'react'
import axios from 'axios';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/messages/contactUs', formData);
      setFormData({
        name: "",
        email: "",
        message: ""
      })     

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Name'/><br />
        <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='Email'/><br />
        <input type="text" name='message' value={formData.message} onChange={handleChange} placeholder='Desc'/><br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default ContactUs
