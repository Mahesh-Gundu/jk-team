import ImgMediaCard from "@/components/formcards/formcards"
const form = () => {
    return (
        <>
            <ImgMediaCard/>
        </>
    )
}

export default form



// import { getfieldData, postData } from "@/components/appoval/formtitle.services"
// import { FormTitleAdd } from "@/components/appoval/formtitleAdd"
// import { CMButton } from "@/components/common/Button/Button"
// import { AppContext } from "@/components/common/Helpers/Context/AppContext"
// import { buttonStyle } from "@/components/common/Helpers/InlineStyles"
// import { Box, Button, Card, Grid } from "@mui/material"
// import { useRouter } from "next/router"
// import { useContext, useEffect, useState } from "react"
// const form = () => {
//     const router = useRouter();
//     const { globalData, setGlobalData } = useContext(AppContext)
//     const [value, setValue] = useState<any>([])
//     const [data, setdata] = useState<any>()
//     const [submitvalue, setSubmitValue] = useState(0)
//     useEffect(() => {
//         if (globalData?.user) {
//             setValue(globalData?.user?.formDetails)
//             setdata(globalData?.user?.data)
//         } else {
//             router.push('/admin');
//         }
//     }, [globalData.user, submitvalue])



//     const handleButton = () => {
//         router.push("/admin");
//     }

//     const handlesubmitData = (val: any, index: any) => {
//         // setArrayData(val)
//         let dataClo = [...data];
//         dataClo[index]["values"] = val;
//         setdata(dataClo);
//         const payload = dataClo.map((e: any) => e.values)
//         const dataCount = payload.includes(undefined)
//         if (!dataCount) {
//             console.log(payload, "PAYLOAD", dataCount);
//             postData(payload)
//             router.push("/admin")
//         }


//     }
//     // const handleSubmit = () => {
//     //     setSubmitValue(submitvalue + 1)
//     //     const payload = data?.map((e: any) => e?.values)
//     //     console.log("****data", data, "DATATTTTTTTTTTTTTT", submitvalue);
//     //     // globalData?.user?.data.map((e:any)=>{
//     //     //     // setVal(e.values)
//     //     //     let a =[]
//     //     //     console.log(e['values'],"VALUESSSSSSSSSSSSSS");
//     //     //     a.push(e.values)
//     //     //     console.log(a,"VALUESaaaaaaaaaaaaaaa");


//     //     // })
//     //     console.log(payload, "payload");


//     // }


//     return (
//         <>
//             {value && <>
//                 {value.form_title || value.form_description ? <div style={{ margin: "30px" }}>
//                     <Card style={{ boxShadow: "0 2px -2px #aaaaaa", padding: "20px", marginLeft: "40px", marginRight: "40px" }}>
//                         <h3 style={{ margin: "10px", fontWeight:700 }}>{value.form_title}</h3>
//                         <Card style={{ padding: "10px" }} ><p style={{fontWeight:300}}>{value.form_description}</p></Card>
//                     </Card>
//                 </div> : null}
//                 <FormTitleAdd value={data} submit={submitvalue} values={handlesubmitData} />
//                 {data?.length ? <Box component='div'
//                     sx={buttonStyle}
//                 >
//                     <Box component='span' mr={2} mb={2} sx={{ boxShadow: 2 }}>
//                         {/* <Button onClick={handleButton} style={{ color: "white", backgroundColor: "black", paddingLeft: "16px", paddingRight: "16px", paddingBottom: "6px", paddingTop: "6px" }}>Cancel</Button> */}
//                         <CMButton variant="contained" color="secondary" value="Cancel" onClick={handleButton}
//                         />
//                     </Box>

//                     <Box component='span' mr={2} mb={2}>
//                         <CMButton variant="contained" value="Submit" type="submit" color="primary" onClick={() => setSubmitValue(submitvalue + 1)}></CMButton>
//                         {/* <Button onClick={handleSubmit} style={{ color: "white", backgroundColor: '#00a8ec', paddingLeft: "16px", paddingRight: "16px", paddingBottom: "6px", paddingTop: "6px" }}>Submit</Button> */}
//                     </Box>
//                 </Box> : null}
//             </>}

//         </>

//     )
// }
// export default form
