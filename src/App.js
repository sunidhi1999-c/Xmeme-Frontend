import React ,{useState,useEffect}from 'react'
import './App.css'
import Meme from './Components/Meme'
import Header from './Components/Header'
import SwaggerButton from './Components/SwaggerButton'
const Backend_URL='https://xmemeendpoint.herokuapp.com/'
// const Backend_URL='http://localhost:8081/'
function App() {
  // Form field variables
  const [Name,setName]=useState('')
  const [Caption,setCaption]=useState('')
  const [Image,setImage]=useState('')
  const [Loading,setLoading]=useState(false)
  const [Error,IsError]=useState(false)
  const [Message,setMessage]=useState('')
  // Function to upload memes
  const UploadMeme=(e)=>{
    e.preventDefault();
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var data = JSON.stringify({"name":Name,"caption":Caption,"url":Image});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
      };

      fetch(`${Backend_URL}memes`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if(result.status)
          {
            console.log(result)
            IsError(true)
            setMessage('Duplicate values exists')
          }
          else if(result.id)
          {
            setMessage('Uploaded Meme Successfully !!')
            setName('')
            setCaption('')
            setImage('')
          }
          setLoading(false)
        })
        .catch(error => console.log('error', error));
  }
  useEffect(()=>{
    setTimeout(()=>{
      setMessage('')
    },2000)
  },[Error,Loading])
    return (
    <div className="conatiner-fluid">
      <Header/>
      <br/>
      <div className="row">
        <div className="col-sm-12 col-md-3"></div>
        <div className="col-sm-12 col-md-6">
          <h3 style={{overflow:'hidden',color:'#fff'}}>&nbsp;&nbsp;&nbsp;Add Meme</h3>
        <form  className="meme_form" onSubmit={UploadMeme}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Meme Owner</label>
            <input type="text" placeholder="Enter your full name"className="form-control" id="name" required value={Name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="caption" className="form-label">Caption</label>
            <input type="text" placeholder="Be creative with the caption"className="form-control" id="caption"  required value={Caption} onChange={(e)=>setCaption(e.target.value)}/>
          </div>
          <label htmlFor="meme_url" className="form-label">Meme URL</label>
          <div className="input-group mb-3">
            <input type="text" placeholder="Enter URL of your meme here"className="form-control" id="meme_url"  required value={Image} onChange={(e)=>setImage(e.target.value)}/>
            <div className="input-group-append">
            <button type="submit" style={{background:'dodgerblue',color:'#fff'}}className="btn btn-primary input-group-text">{Loading?'Loading...':'Submit meme'}</button>
            </div>
          </div>
          <span style={Error?{color:'red'}:{color:'green'}}>{Message}</span>
        </form>
        </div>
      </div>
      <hr/>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Meme Loading={Loading}/>
        </div>
      </div>
      <SwaggerButton/>
    </div>
  );
}

export default App;
