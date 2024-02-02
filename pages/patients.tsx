import { useState } from 'react'
import PatientTableList from '@/components/Patients/Patients';
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
 <PatientTableList/>
   </div>
   </>
  )
    }
export default Master