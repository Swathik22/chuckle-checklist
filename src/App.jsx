import { useState } from "react"
import "./App.css"
import { useEffect } from "react"
import { saveJoke,getAllJokes,updateJokeToldOrUntold,deleteJoke } from "./services/jokeService.js"

export const App = () => {
  const[textValue,setTextValue]=useState("")
  const[allJokes,setAllJokes]=useState([])
  const[untoldJokesOnly,setUntoldJokesOnly]=useState([])
  const[toldJokesOnly,setToldJokesOnly]=useState([])
  const[addBtnClicked,setAddBtnClicked]=useState(false)
  const[untoldBtnClicked,setUntoldBtnClicked]=useState(false)

  useEffect(()=>{
    getAllJokes().then(jokeArray=>{
      setUntoldJokesOnly(jokeArray.filter(untoldJoke=>untoldJoke.told===false))
      setToldJokesOnly(jokeArray.filter(toldJoke=>toldJoke.told===true))
      setAllJokes(jokeArray)   
      setAddBtnClicked(false)  
      setUntoldBtnClicked(false)
      //console.log(untoldJokesOnly.length,toldJokesOnly.length)
    })
  },[addBtnClicked,textValue,untoldBtnClicked])//[] means ONLY on initial render of component

  const handleSaveJoke=()=>{
    const options={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        text:textValue,
        told:false
      })
    }
    saveJoke(options)
    //getAllJokes()
  }

  const handleUntoldOrToldJoke=(joke)=>{
    updateJokeToldOrUntold(joke)
    setUntoldBtnClicked(true)
  }

  const handleDeleteJoke=(id)=>{
    deleteJoke(id)
    setUntoldBtnClicked(true)
  }
    
  return <div className="app-container">
  <div className="app-heading">
    <h1 className="app-heading-text">Chuckle CheckList</h1>
  </div>
  <h2>Add Jokes</h2>
  <div className="joke-add-form">
    <input
        className="joke-input placeholder"
        type="text"
        placeholder="New One Liner"
        value={textValue}
        onChange={(event) => {
          // What's the value of event?
          setTextValue(event.target.value)
          //console.log(textValue)
        }}
    />
    <button id="addJoke" className="joke-input-submit" onClick={()=>{handleSaveJoke()
       setTextValue("")
     
    }}>Add</button>
  </div>
  <div className="joke-lists-container">
    <div className="joke-list-container">
      <div><h2>Untold <span className="untold-count">{untoldJokesOnly.length}</span></h2>       
      </div>
      {untoldJokesOnly.map(untold=>{
      return(  <div key={untold.id}>
        
        <li className="joke-list-item"><p className="joke-list-item-text">{untold.text}</p>
        <button id={untold.id} onClick={()=>{handleDeleteJoke(untold.id)}}><i className="fa-solid fa-trash"></i></button>
        <button id={untold.id} onClick={()=>{handleUntoldOrToldJoke(untold)}}><i className="fa-regular fa-face-meh" /></button></li>
      </div>)
      })}  
    </div>
    <div className="joke-list-container">
     <div> <h2>Told <span className="told-count">{toldJokesOnly.length}</span></h2>      
     </div>
     {
      toldJokesOnly.map(told=>{
        return(<div key={told.id}>
          <li className="joke-list-item"><p className="joke-list-item-text">{told.text}</p>
          <button id={told.id} onClick={()=>{handleDeleteJoke(told.id)}}><i className
          ="fa-solid fa-trash"></i></button>
          <button id={told.id} onClick={()=>{handleUntoldOrToldJoke(told)}}><i className="fa-regular fa-face-meh" /></button></li>
          </div>)
      })
     }
    </div>
  </div>
  </div>
}
