import EmployeeTable from '@/components/EmployeeTable/EmployeeTable';
import { useState } from 'react'
const Employee = () => {
  const [value , setValue] = useState<any>([])
  const Values =(data:any)=>{
    console.log("******",data);
    setValue(data)
  }
  console.log(value,"valdata")
  return (
    <>
   <div>
 <EmployeeTable/>
   </div>
   </>
  )
    }
export default Employee