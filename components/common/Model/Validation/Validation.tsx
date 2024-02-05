import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles  from '../InputForm.module.scss'
import { CMLabel } from "../../Form/FormLabels";
// import { AppContext } from "../Context/AppContext";

function ValidationForm(props: any) {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [closeModal, setCloseModal] = React.useState(false);
    const [rowdata, setRowData] = React.useState(props.rowData || {
        validation: "",
        description: "",
    });
    // const RequiredChange = (field: any, e: any) => {
    //     console.log(e.target.checked)
    // }
    console.log(closeModal, "closeModal")
    const [errors, setErrors] = useState<any>({});
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
        
        setRowData({ ...rowdata, [e.target.name]: e.target.value })
    }
    const validateForm = () => {
        let isValid = true;
        const newErrors: any = {};
        
        const wordToWordSpaceRegex = /^(?! )[a-zA-Z'-]+(?: [a-zA-Z'-]+)*(?<! )$/;

        // Validate field_name
        if (rowdata.validation == "") {
            newErrors.validation = "Validation Label is required!";
            isValid = false;
        }else if(rowdata.validation!='' && !wordToWordSpaceRegex.test(rowdata.validation)){
            newErrors.validation = "Enter valid text";
            isValid = false;
        }
        // Validate placeholder
        if (rowdata.description == "") {
            newErrors.description = "Description is required!";
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

    const isFormValid = Object.keys(errors).length === 0;


    return (
        <>
            {!submitted ?
                <form onSubmit={(e: any) => handleSubmit(e)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CMLabel>Validation Label</CMLabel>
                            <TextField
                                placeholder='Enter Vaiadtion'
                                size="small"
                                name="validation"
                                fullWidth
                                onChange={handleChange}
                                value={rowdata?.validation}
                            />
                            {errors.validation && <div className={styles.errortext}>{errors.validation}</div>}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <CMLabel>Description</CMLabel>
                            <TextField
                                placeholder='Enter Description'
                                size="small"
                                name="description"
                                fullWidth
                                multiline
                                minRows={3}
                                onChange={handleChange}
                                value={rowdata?.description}
                            />
                            {errors.description && <div className={styles.errortext}>{errors.description}</div>}
                        </Grid>
                        </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit">Submit</Button>
                    </Grid>
                </form> : ""
            }
        </>
    );
}

export default ValidationForm;
