import { useState } from 'react'
import ValidationTable from '@/components/ValidationTable/Validationtable';
const Validation = () => {
  const [value , setValue] = useState<any>([])
  const Values =(data:any)=>{
    console.log("******",data);
    setValue(data)
  }
  console.log(value,"valdata")
  return (
    <>
   <div>
 <ValidationTable/>
   </div>
   </>
  )
    }
export default Validation