//Saved a new joke
export const saveJoke=(postOption)=>{
    return fetch("http://localhost:8088/jokes",postOption)
     
}

//Retreive all Jokes
export const getAllJokes=()=>{
    return fetch("http://localhost:8088/jokes").then(res=>res.json())
}

//updating the jokes
export const updateJokeToldOrUntold=(untoldOrToldJoke)=>{
    if(untoldOrToldJoke.told){
        untoldOrToldJoke.told=false;
    }
    else{
        untoldOrToldJoke.told=true;
    }
    const putOptions={
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(untoldOrToldJoke)
    }
    return fetch(`http://localhost:8088/jokes/${untoldOrToldJoke.id}`,putOptions)
}

export const deleteJoke=(id)=>{
    try{
    const deleteOptions={
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }
    const response = fetch(`http://localhost:8088/jokes/${id}`,deleteOptions)
    if(!response.ok){
        throw new Error(`Failed to delete Item`)
    }
    else{
        console.log(`Joke Deleted Successfully`)
    }
    }catch (error) {
    console.error(error);
  }
}