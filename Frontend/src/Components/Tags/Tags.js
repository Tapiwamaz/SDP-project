import React from 'react'
import { AcademicCapIcon,GlobeAltIcon,ScaleIcon,MusicalNoteIcon,ComputerDesktopIcon,CpuChipIcon,BookOpenIcon,PlusCircleIcon} from '@heroicons/react/24/outline';

const Tags = ({name,print}) => {
    let color;
    let bgcolor="var(--primary)";
    // let bgcolor="black"
    let borderColor="transparent";
    let textColour="white";
    if(name==="Education"){
        color="yellow"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <AcademicCapIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    else if(name==="Sports"){
        color="pink"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <GlobeAltIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    else if(name==="Entertainment"){
        color="cyan"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <MusicalNoteIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    else if(name==="Political"){
        color="red"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <ScaleIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    else if(name==="Religious"){
        color="brown"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <BookOpenIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    else if(name==="Gaming"){
        color="lime"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <ComputerDesktopIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    else if(name==="IT"){
        color="purple"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <CpuChipIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    else if(name==="Other"){
        color="grey"
        return(
            <button onClick={print} style={{
                backgroundColor:bgcolor,
                color:textColour,
                border: `${borderColor} 2px solid`,
                borderRadius: "20px",
                margin: "2px",
                padding:"10px",
                minWidth:"100px",
                height:"10px",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <PlusCircleIcon style={{
                    color:color,
                    height:"20px",
                    }}/>
                {name}
        
              
            </button >
        )
    }
    

}

export default Tags
