import { useState } from 'react'
import MasterTable from '../components/Master/mastertable';
const Master = () => {
  const [value , setValue] = useState<any>([])
  const Values =(data:any)=>{
    console.log("******",data);
    setValue(data)
  }
  console.log(value,"valdata")
  return (
    <>
   <div>
 <MasterTable/>
   </div>
   </>
  )
    }
export default Master