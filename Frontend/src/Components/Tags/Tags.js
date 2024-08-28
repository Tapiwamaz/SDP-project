import React from 'react'

const Tags = ({name,print}) => {
    let color;
    if(name==="Education"){
        color="yellow"
    }
    if(name==="Sports"){
        color="pink"
    }
    if(name==="Entertainment"){
        color="green"
    }
    if(name==="Political"){
        color="red"
    }
    if(name==="Religious"){
        color="brown"
    }
    if(name==="Gaming"){
        color="blue"
    }
    if(name==="IT"){
        color="purple"
    }
    else if(name==="Other"){
        color="grey"
    }
    

  return (

    <button onClick={print} style={{
        backgroundColor:color,
        border: "none",
        borderRadius: "20px",
        height: "25px",
        margin: "2px",
        minWidth:"50px"
    }}>
        {name}

      
    </button >
  )
}

export default Tags
