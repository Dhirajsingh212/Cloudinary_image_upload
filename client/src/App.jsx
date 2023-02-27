import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './App.css'

const App = () => {
  const [file,setFile]=useState('');
  const [previewSource,setpreviewSource]=useState('');

  const changeHandler=(e)=>{
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    const file1=e.target.files[0];
    preview(file1);
  }

  const preview=(file1)=>{
      const reader=new FileReader();
      reader.readAsDataURL(file1);
      reader.onloadend=()=>{
        setpreviewSource(reader.result);
      }
  }
  
  const submitHandler=(e)=>{
    e.preventDefault();
    if(!previewSource) return;
    uploadImage(previewSource);
  }

  const uploadImage=async (img)=>{
    const data=img;
    try{
      await axios.post('http://localhost:8080/api/upload',{
        data
      })
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='app'>
      <form onSubmit={submitHandler} className="app_form">
          <input type="file" onChange={changeHandler} className="app_form_input"/>
          <button type='submit'>submit</button>
      </form>
      {previewSource && (<img src={previewSource} className='app_previewimg' />)}
    </div>
  )
}

export default App