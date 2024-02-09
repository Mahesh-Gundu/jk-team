import { Box, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CMLabel } from "../Form/FormLabels";
import { Add, Remove } from "@mui/icons-material";
import styles from "./DropdownForm.module.scss";
import { v4 as uuidv4 } from "uuid"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { CMButton } from "../Button/Button";
import { Button } from "react-bootstrap";
// import { AppContext } from "../Context/AppContext";

function DropdownForm(props: any) {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [optionArr, setOptionArr] = useState<any>(props?.rowData?.options || [{ id: uuidv4(), value: "" }])
    const [closeModal, setCloseModal] = React.useState(false);
    const [rowdata, setRowData] = React.useState(props.rowData || {
        field_name: "",
        options: optionArr,
    });

    console.log(closeModal, "closeModal", props.rowData)

    const [errors, setErrors] = useState<any>({});
    const [submitted, setSubmitted] = useState<any>(false);

    console.log("*********", props.rowData);

    const addField = (index: any) => {
        let valid = optionArr.find((val: any) => val.value === "");

        if (!valid) {
            setOptionArr([...optionArr, { id: uuidv4(), value: "" }]);
        } else {
            toast.error('Please enter the value before adding field')
        }
    }
    const removeField = (index: any) => {
        let remove = [...optionArr];
        console.log(remove, "remove")
        if (remove.length > 1) {
            remove.splice(index, 1)
        }
        setOptionArr(remove)
    }

    const handleChangeOpt = (e: any, index: any) => {
        let optionArrClo = [...optionArr];
        optionArrClo[index].value = e.target.value;
        setOptionArr(optionArrClo);
        console.log(optionArr, "optionArrClo", optionArrClo);
        const { name, value } = e.target;
        rowdata.options = optionArr;
        setRowData({
            ...rowdata,
            [name]: value
        });
        setErrors({
            ...errors, [name]: ""
        })
        setRowData({ ...rowdata, [e.target.name]: e.target.value })
    }
    console.log(optionArr, "optionArr")
    const handleChange = (e: any) => {
        console.log(rowdata, "*****");
        console.log(e.target.value.name, "eeeeeeeeeeeeee");
        const { name, value } = e.target;
        rowdata.options = optionArr;
        setRowData({
            ...rowdata,
            [name]: value
        });
        setErrors({
            ...errors, [name]: ""
        })
        console.log("@@@@@@@", name);
        // setRowData({ ...rowdata, [e.target.name]: e.target.value })
    }
    console.log(rowdata, "rowdata")
    // const handleChangeNew = (e: any,index:any) => {
    //     console.log(rowdata, "*****");
    //     console.log(e.target.value.name, "eeeeeeeeeeeeee");
    //     const { name, value } = e.target;
    //     setRowData({
    //         ...rowdata,
    //         [name]: value
    //     });
    //     setErrors({
    //         ...errors, [name]: ""
    //     })
    //     setRowData({ ...rowdata, [e.target.name]: e.target.value })
    // }
    const validateForm = () => {
        let isValid = true;
        const newErrors: any = {};
        const wordToWordSpaceRegex = /^(?! )[a-zA-Z'-]+(?: [a-zA-Z'-]+)*(?<! )$/;
        // Validate field_name
        if (rowdata.field_name == "") {
            newErrors.field_name = "Field name is required!";
            isValid = false;
        }else if(rowdata.field_name!='' && !wordToWordSpaceRegex.test(rowdata.field_name)){
            newErrors.field_name = "Enter valid text";
            isValid = false;
        }
        // Validate options 
        console.log(rowdata.options, "@@@@@@@@@@@@")
        rowdata?.options?.map((e:any)=>{
            if(e.value=="") {
                newErrors.options = "Options is required!";
                isValid = false;
            }
        })
        // let val = rowdata?.options?.map((e:any)=>{
        //     return e.value
        // }) 
        // console.log(val,"val")
        // if(val="") {
        //     newErrors.options = "Options is required!";
        //     isValid = false;
        // }
        console.log({ newErrors }, "newerrors");
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("aaaaaaaaaaaa")
        if (validateForm()) {
            setCloseModal(false);
            setSubmitted(true);
            rowdata.options = optionArr;
            // let data = {
            //     ...rowdata,
            //     id: uuidv4()
            // }
            props.onSubmit(rowdata)
            console.log(rowdata, "data");
            // if (optionArr.value = "") {
            // toast.error("AAAAAAAAAAAAAAAAAAAAAAAAAA");
            // }
        } else {
            console.log("dfghjk", errors);
        }
    };
    const isFormValid = Object.keys(errors).length === 0;

    return (
        <>
            {!submitted ?
                <form onSubmit={(e: any) => handleSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CMLabel>Field Name</CMLabel>
                            <TextField
                                placeholder='Enter Field Name'
                                size="small"
                                name="field_name"
                                fullWidth
                                onChange={handleChange}
                                value={rowdata?.field_name}
                            />
                            {errors.field_name && <div className={styles.errortext}>{errors.field_name}</div>}
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} className={styles.field}>
                            <CMLabel>Options</CMLabel>
                            {
                                optionArr.map((val: any, ind: any) => (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
                                            <Grid item xs={7} sm={9} md={9} lg={9} >
                                                <TextField
                                                    placeholder='Enter options'
                                                    size="small"
                                                    name="options"
                                                    value={val.value}
                                                    fullWidth
                                                    onChange={(e: any) => handleChangeOpt(e, ind)}
                                                />
                                            {errors.options && <div className={styles.errortext}>{errors.options}</div>}
                                            </Grid>
                                            <Grid item xs={5} sm={3} md={3} lg={3} className={styles.buttons}>
                                                <div className={styles.buttons} >
                                                    <div className={styles.buttoncontainercircle}>
                                                        <div style={{marginRight:"11px"}}>
                                                            <Button className={styles.buttonplus} onClick={() => addField(ind)}>
                                                                <Add className={styles.buttonadd} />
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className={styles.buttonplus} onClick={() => removeField(ind)} >
                                                                <Remove className={styles.buttonadd} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>

                                        </div>
                                    </>
                                ))
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "end" }}>
                        <CMButton value="Submit" variant="contained" color="primary" type="submit" />
                    </Grid>
                </form> : null
            }
        </>
    );
}

export default DropdownForm;
