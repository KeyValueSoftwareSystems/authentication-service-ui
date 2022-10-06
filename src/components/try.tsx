import React, { FC, useState } from "react"
import CheckIcon from '@mui/icons-material/Check';

interface TryProps{
    placeholder:string
    api:any
    id:any
}
const Try:FC<TryProps>=({placeholder,api,id})=>{
    const [newvalue,setnewvalue]=useState("")
    const savePermission=()=>{
        console.log("new",newvalue)
        api(
           { variables: {
            id,
            newvalue
            },}
        )
    }   
    const handleChange = (event:any) => {
        setnewvalue(event.target.value);    
        console.log('value is:', event.target.value);
      };
   
    return(
        <><input
            type="text"
            placeholder={placeholder}
            className="permsissions" onChange={handleChange}/>
            <div onClick={()=>{
                console.log("new",newvalue)
                   api(
                    { variables: {
                     id,
                     newvalue
                     }
                    }
    )
    }}>
            <CheckIcon  />
            </div>
            </>
    )
}
export default Try