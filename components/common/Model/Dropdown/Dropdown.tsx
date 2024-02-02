import { Box, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from './Dropdown.module.scss';
import { CMLabel } from "../../Form/FormLabels";
import { buttonStyle } from "../../Helpers/InlineStyles";
import { CMButton } from "../../Button/Button";
import { Button } from "react-bootstrap";
import Add from "@mui/icons-material/Add";
import { Remove } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid"
// import { toast } from "react-toastify";

function DropdownBody(props: any) {

    const handleChange = (fields: any, e: any) => {
        console.log(e.target.value, "values")
        formik.setFieldValue(fields, e.target.value);
    }

    const handleSubmit = (values: any) => {
        console.log(values, "values")
    }
    const [optionArr, setOptionArr] = useState<any>([{ value: "" }])
    const addField = (index: any) => {
        let valid = optionArr.find((val: any) => val.value === "");
        if (!valid) {
            setOptionArr([...optionArr, { value: "" }])
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
        formik.setFieldValue("options", optionArrClo);
    }
    const formik = useFormik({
        initialValues: {
            fieldname: "",
            options: optionArr,
        },
        validationSchema: yup.object({
            fieldname: yup.string().ensure().required(" Fieldname is required!"),
            // options: yup.string().required(" Options is required!"),
            options: yup.array().of(
                yup.object().shape({
                  value: yup.string().required(" Options is required!"),
                })
              ),
        }),
        onSubmit: (values: any) => {
            console.log(values, "values")
            let data = {
                ...values,
                id: uuidv4()
            }
            console.log(data, "data")
            // addDropdown().then((res: any) => {
            //     console.log(res)
            //     // toast.success("Record Created Successfully")

            // }, (error: any) => {
            //     console.log(error)
            // });
        },
    });

    return (

        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CMLabel>Field Name</CMLabel>
                        <TextField
                            placeholder='Enter Fieldname'
                            size="small"
                            name="fieldname"
                            fullWidth
                            onChange={(e: any) => handleChange("fieldname", e)}
                        />
                        {formik.touched.fieldname && formik.errors.fieldname && (
                            <div className={styles.errortext + " text-danger"}>{formik.errors.fieldname}</div>)
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} className={styles.field}>
                    <CMLabel>Options</CMLabel>
                        {
                            optionArr.map((val: any, ind: any) => (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:22 }}>
                                        <Grid item xs={7} sm={9} md={10} lg={9} >
                                            <TextField
                                                placeholder='Enter options'
                                                size="small"
                                                name="options"
                                                value={val.value}
                                                fullWidth
                                                onChange={(e: any) => handleChangeOpt(e, ind)}
                                            />
                                            {formik.touched.options && formik.errors.options && (
                                                <div className={styles.errortext + " text-danger"}>{formik.errors.options}</div>)
                                            }
                                        </Grid>
                                        <Grid item xs={5} sm={3} md={2} lg={3} className={styles.buttons}>
                                            <div className={styles.buttons} >
                                                <div>
                                                    <Button className={styles.buttonplus} onClick={() => addField(ind)}>
                                                        < Add className={styles.buttonadd} />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button className={styles.buttonplus} onClick={() => removeField(ind)}>
                                                        <Remove className={styles.buttonadd} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Grid>
                                        
                                    </div>
                                </>
                            ))
                        }
                    </Grid>
                </Grid>
                <Box component='div'
                    sx={buttonStyle}>
                    <Box component='span' mr={2} mb={2}>
                        <CMButton variant="contained" value="Submit" type="submit" color="primary" />
                    </Box>
                </Box>
            </form>
        </React.Fragment>
    );
}

export default DropdownBody;



