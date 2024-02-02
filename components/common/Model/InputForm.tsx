import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CMLabel } from "../Form/FormLabels";
import { getTypeData, getValidationData } from "@/components/Master/master.services";
import styles from "./InputForm.module.scss"
// import { AppContext } from "../Context/AppContext";

function InputForm(props: any) {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [closeModal, setCloseModal] = React.useState(false);
    const [rowdata, setRowData] = React.useState(props.rowData || {
        field_name: "",
        placeholder: "",
        type: {
            id:"",
            label:"",
        },
        minlength: 0,
        maxlength: "",
        validation: "",
        minrange: 0,
        maxrange: "",
        minsize: 0,
        maxsize: "",
    });
    // const RequiredChange = (field: any, e: any) => {
    //     console.log(e.target.checked)
    // }
    console.log(closeModal, "closeModal")

    const [TypeOption, setTypeOption] = useState([]);
    const [ValidationOption, setValidationOption] = useState([]);
    const [showValidationFileds, setShowValidationFields] = useState(false);
    const [showRangeFileds, setShowRangeFields] = useState(false);
    const [showSizeFileds, setShowSizeFields] = useState(false);
    const [errors, setErrors] = useState<any>({});
    // const [formData, setFormData] = useState({
    //     field_name: "",
    //     placeholder: "",
    //     type: "",
    //     minlength: "",
    //     maxlength: "",
    //     validation: "",
    //     minrange: "",
    //     maxrange: "",
    //     minsize: "",
    //     maxsize: "",
    // });
    const [submitted, setSubmitted] = useState<any>(false);

    console.log("*********", props.rowData);

    const handleChange = (e: any) => {
        console.log(rowdata, "*****");
        console.log(e.target.value.name, "eeeeeeeeeeeeee");
        const { name, value } = e.target;
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

    const handleChangeNew = (e: any) => {
        console.log(rowdata, "*****");
        console.log(e.target.value.name, "eeeeeeeeeeeeee");
        const { name, value } = e.target;
        setRowData({
            ...rowdata,
            [name]: value
        });
        setErrors({
            ...errors, [name]: ""
        })
        if (e.target.value == 1 || e.target.value=="Text") {
            setShowValidationFields(true);
            setShowRangeFields(false);
            setShowSizeFields(false);
        }
        else if (e.target.value == 2 || e.target.value=="Range") {
            setShowRangeFields(true);
            setShowValidationFields(false);
            setShowSizeFields(false);
        }
        else if (e.target.value == 3 || e.target.value=="File") {
            setShowSizeFields(true);
            setShowRangeFields(false);
            setShowValidationFields(false);
        } else {
            setShowSizeFields(false);
            setShowRangeFields(false);
            setShowValidationFields(false);
        }
        
        setRowData({ ...rowdata, [e.target.name]: e.target.value })
    }
    const validateForm = () => {
        let isValid = true;
        const newErrors: any = {};
        // Validate field_name
        if (rowdata.field_name == "") {
            newErrors.field_name = "Field name is required!";
            isValid = false;
        }
        // Validate placeholder
        if (rowdata.placeholder == "") {
            newErrors.placeholder = "Placeholder is required!";
            isValid = false;
        }
        // Validate type
        if (rowdata.type.label == "") {
            newErrors.type = "Type is required!";
            isValid = false;
        }
         // Validate Min&Max Lengths
         if (rowdata.minlength <0 ) {
            newErrors.minlength = "Enter valid min..length!";
            isValid = false;
        }else if(Number(rowdata.maxlength) < Number(rowdata.minlength)){
            newErrors.maxlength = "Enter valid max..length!";
            isValid = false;
        }
        else if (rowdata.minlength && rowdata.maxlength == "" ) {
            newErrors.maxlength = "Enter valid max..length!";
            isValid = false;
        }else if(rowdata.maxlength && rowdata.minlength == "" ){
            newErrors.minlength = "Enter valid min..length!";
            isValid = false;
        }
            // Validate Min&Max Range
            if (rowdata.minrange <0 ) {
                newErrors.minrange = "Enter valid min..range!";
                isValid = false;
            }else if(Number(rowdata.maxrange) < Number(rowdata.minrange)){
                newErrors.maxrange = "Enter valid max..range!";
                isValid = false;
            }
            else if (rowdata.minrange && rowdata.maxrange == "" ) {
                newErrors.maxrange = "Enter valid max..range!";
                isValid = false;
            }else if(rowdata.maxrange && rowdata.minrange == "" ){
                newErrors.minrange = "Enter valid min..range!";
                isValid = false;
            }
                // Validate Min&Max size
         if (rowdata.minsize <0 ) {
            newErrors.minsize = "Enter valid min..size!";
            isValid = false;
        }else if(Number(rowdata.maxsize) < Number(rowdata.minsize)){
            newErrors.maxsize = "Enter valid max..size!";
            isValid = false;
        }
        else if (rowdata.minsize && rowdata.maxsize == "" ) {
            newErrors.maxsize = "Enter valid max..size!";
            isValid = false;
        }else if(rowdata.maxsize && rowdata.minsize == "" ){
            newErrors.minsize = "Enter valid min..size!";
            isValid = false;
        }
        console.log({ newErrors }, "kjhgfds");
    
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, you can submit or process the data here
            console.log("Form data:", rowdata);
            setCloseModal(false);
            setSubmitted(true); // Set a submitted flag
            console.log(rowdata, "rowdata")
            props.onSubmit(rowdata)
        } else {
            console.log("dfghjk", errors);
            // Form is not valid, display error messages
        }
    };

    React.useEffect(() => {
        // setGlobalData({
        //   ...globalData,
        //   loading: true
        // })
        getTypeData().then((res: any) => {
            //   setGlobalData({
            //     ...globalData,
            //     loading: false
            //   })
            console.log(res, "res")
            setTypeOption(res.type)
            console.log(TypeOption, "TypeOption");
        }).catch((err: any) => {
            console.log(err)
            //   setGlobalData({
            //     ...globalData,
            //     loading: false,
            //     error: true,
            //     errorMessage: "Failed to load data"
            //   });
        })
        // })


        getValidationData().then((res: any) => {
            //   setGlobalData({
            //     ...globalData,
            //     loading: false
            //   })
            console.log(res, "res")
            setValidationOption(res)
            console.log(ValidationOption, "ValidationOption");
        }).catch((err: any) => {
            console.log(err)
            //   setGlobalData({
            //     ...globalData,
            //     loading: false,
            //     error: true,
            //     errorMessage: "Failed to load data"
            //   });
        })

        if (props?.rowData?.type == 1 || props?.rowData?.type=="Text") {
            setShowValidationFields(true);
            setShowRangeFields(false);
            setShowSizeFields(false);
        }
        else if (props?.rowData?.type == 2 || props?.rowData?.type=="Range") {
            setShowRangeFields(true);
            setShowValidationFields(false);
            setShowSizeFields(false);
        }
        else if (props?.rowData?.type == 3 || props?.rowData?.type=="File") {
            setShowSizeFields(true);
            setShowRangeFields(false);
            setShowValidationFields(false);
        } else {
            setShowSizeFields(false);
            setShowRangeFields(false);
            setShowValidationFields(false);
        }

    }, [])

    const isFormValid = Object.keys(errors).length === 0;


    return (
        <>
            {!submitted ?
                <form onSubmit={(e: any) => handleSubmit(e)}>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel>Type</CMLabel>
                    <TextField
                        value={rowdata?.type}
                        placeholder='Enter Type'
                        size="small"
                        name="type"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid> */}
                        <Grid item xs={12} sm={6} md={6} lg={6}>
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
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <CMLabel>Placeholder</CMLabel>
                            <TextField
                                placeholder='Enter Placeholder'
                                size="small"
                                name="placeholder"
                                fullWidth
                                onChange={handleChange}
                                value={rowdata?.placeholder}
                            />
                            {errors.placeholder && <div className={styles.errortext}>{errors.placeholder}</div>}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CMLabel>Type</CMLabel>
                            <FormControl fullWidth >
                                <Select size="small"
                                    onChange={handleChangeNew}
                                    placeholder="Type" name="type" value={rowdata?.type}>
                                    {TypeOption?.map((v: any, index: any) => (
                                        <MenuItem value={v.label} >
                                            <Typography variant="body1">
                                                {v.label}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {errors.type && <div className={styles.errortext}>{errors.type}</div>}
                        </Grid>
                        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                            <label htmlFor="toggleContainer">Required</label>
                            <Switch
                                onChange={(e:any)=>RequiredChange('required',e)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                value={required}
                                name="required"
                            />
                    </Grid> */}

                        {showValidationFileds ? <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CMLabel><b>Validation</b></CMLabel>
                            <hr />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <CMLabel>Minimum Length</CMLabel>
                                    <TextField
                                        placeholder='Enter Min..length'
                                        size="small"
                                        name="minlength"
                                        fullWidth
                                        onChange={handleChange}
                                        value={rowdata?.minlength}
                                        type="number"
                                    />
                                      {errors.minlength && <div className={styles.errortext}>{errors.minlength}</div>}
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <CMLabel>Maximum Length</CMLabel>
                                    <TextField
                                        placeholder='Enter Max..length'
                                        size="small"
                                        name="maxlength"
                                        fullWidth
                                        onChange={handleChange}
                                        value={rowdata?.maxlength}
                                        type="number"
                                    />
                                      {errors.maxlength && <div className={styles.errortext}>{errors.maxlength}</div>}
                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4}>
                                    <CMLabel>Validation</CMLabel>
                                    <FormControl fullWidth >
                                        <Select size="small"
                                            onChange={handleChange}
                                            placeholder="Validation" name="validation" value={rowdata?.validation}>
                                            {ValidationOption?.map((v: any, index: any) => (
                                                <MenuItem value={v.label} >
                                                    <Typography variant="body1">
                                                        {v.label}
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid> : null}

                        {showSizeFileds ? <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CMLabel><b>File Size</b></CMLabel>
                            <hr />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <CMLabel>Minimum Size</CMLabel>
                                    <TextField
                                        placeholder='Enter Min..Size'
                                        size="small"
                                        name="minsize"
                                        fullWidth
                                        onChange={handleChange}
                                        value={rowdata?.minsize}
                                        type="number"
                                    />
                                    {errors.minsize && <div className={styles.errortext}>{errors.minsize}</div>}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <CMLabel>Maximum Size</CMLabel>
                                    <TextField
                                        placeholder='Enter Max..Size'
                                        size="small"
                                        name="maxsize"
                                        fullWidth
                                        onChange={handleChange}
                                        value={rowdata?.maxsize}
                                        type="number"
                                    />
                                     {errors.maxsize && <div className={styles.errortext}>{errors.maxsize}</div>}
                                </Grid>
                            </Grid>
                        </Grid> : null}

                        {showRangeFileds ? <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CMLabel><b>Range</b></CMLabel>
                            <hr />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <CMLabel>Minimum Range</CMLabel>
                                    <TextField
                                        placeholder='Enter Min..Range'
                                        size="small"
                                        name="minrange"
                                        fullWidth
                                        onChange={handleChange}
                                        value={rowdata?.minrange}
                                        type="number"
                                    />
                                    {errors.minrange && <div className={styles.errortext}>{errors.minrange}</div>}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <CMLabel>Maximum Range</CMLabel>
                                    <TextField
                                        placeholder='Enter Max..Range'
                                        size="small"
                                        name="maxrange"
                                        fullWidth
                                        onChange={handleChange}
                                        value={rowdata?.maxrange}
                                        type="number"
                                        
                                    />
                                    {errors.maxrange && <div className={styles.errortext}>{errors.maxrange}</div>}
                                </Grid>
                            </Grid>
                        </Grid> : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit">Submit</Button>
                    </Grid>
                </form> : ""
            }
        </>
    );
}

export default InputForm;
