import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CMLabel } from "../Form/FormLabels";
import { PageHeader } from '@/components/common/PageHeader/PageHeader';
import { Box } from '@mui/material';
import { Container } from "react-bootstrap";
import styles from "./InputForm.module.scss"


// import { AppContext } from "../Context/AppContext";

function EmployeeAdd(props: any) {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [closeModal, setCloseModal] = React.useState(false);
    const [errors, setErrors] = useState<any>({});
    const [rowdata, setRowData] = React.useState(props.rowData || {
        name: "",
        email: "",
        Phone_number: '',
        address: "",
        id: "",
        password: "",
        validation: "",
        designation: "",
        department: "",
        off_location: "",
    });
    // const RequiredChange = (field: any, e: any) => {
    //     console.log(e.target.checked)
    // }
    const [dataOption, setDataOption] = useState([
        {
            id: 1,
            label: "True"
        },
        {
            id: 0,
            label: "False"
        },
    ])
    const [empdesignation, setEmpdesignation] = useState([
        {
            id: 1,
            label: "developer"
        },
        {
            id: 0,
            label: "tester"
        },
    ])
    const [empdepartment, setEmpdepartment] = useState([
        {
            id: 1,
            label: "Hr department"
        },
        {
            id: 0,
            label: "Developing department"
        },
    ])
    const [epmlocation, setEpmlocation] = useState([
        {
            id: 1,
            label: "Hyderabad"
        },
        {
            id: 0,
            label: "Mumbai"
        },
    ])
    console.log("*********", props.rowData);
    const handleChange = (e: any) => {
        console.log(rowdata, "*****");
        setRowData({ ...rowdata, [e.target.name]: e.target.value })
        setErrors({
            ...errors, [e.target.name]: ""
        })
    }
    const validateForm = () => {
        let isValid = true;
        const newErrors: any = {};
        // const nameRegex = /^[a-zA-Z'-]+$/;
        // Validate name
        if (rowdata.name == "") {
            newErrors.name = "Name is required!";
            isValid = false;
        } 
        if (rowdata.password == "") {
            newErrors.password = "Password is required!";
            isValid = false;
        }
        if (rowdata.Phone_number == "") {
            newErrors.Phone_number = "Phone Number is required!";
            isValid = false;
        }
        if (rowdata.address == "") {
            newErrors.address = "Address is required!";
            isValid = false;
        }
        if (rowdata.id == "") {
            newErrors.id = "Id is required!";
            isValid = false;
        }
        if (rowdata.email == "") {
            newErrors.email = "Email is required!";
            isValid = false;
        }
        // Validate type
        console.log(rowdata.validation,"vvvv")
        if (rowdata.validation == "") {
            newErrors.validation = "Validation is required!";
            isValid = false;
        }
        if (rowdata.designation == "") {
            newErrors.designation = "Designation is required!";
            isValid = false;
        }
        if (rowdata.department == "") {
            newErrors.department = "Department is required!";
            isValid = false;
        }
        if (rowdata.off_location == "") {
            newErrors.off_location = "Office Location is required!";
            isValid = false;
        }
        
        console.log({ newErrors }, "kjhgfds");
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // setCloseModal(false);
        // props.onSubmit(rowdata)
        // console.log(rowdata, "@@@@@@@")
        if (validateForm()) {
            // Form is valid, you can submit or process the data here
            setCloseModal(false);
            props.onSubmit(rowdata)
            console.log(rowdata, "@@@@@@@")
        } else {
            console.log("dfghjk", errors);
            // Form is not valid, display error messages
        }
    };

    return (
        <>
        <div className="container">
          <Box>
                            {/* <PageHeader header='Employees table'/> */}
                            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Name</b></CMLabel>
                    <TextField
                        value={rowdata?.name}
                        placeholder='Enter name'
                        size="small"
                        name="name"
                        fullWidth
                        onChange={handleChange}
                    />
                    {errors.name && <div className={styles.errortext}>{errors.name}</div>}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Email</b></CMLabel>
                    <TextField
                        value={rowdata?.email}
                        placeholder='Enter email'
                        size="small"
                        name="email"
                        fullWidth
                        onChange={handleChange}
                    />
                    {errors.email && <div className={styles.errortext}>{errors.email}</div>}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Phone number</b></CMLabel>
                    <TextField
                        value={rowdata?.Phone_number}
                        placeholder='Enter phonenumber'
                        size="small"
                        name="Phone_number"
                        fullWidth
                        onChange={handleChange}
                    />
                    {errors.Phone_number && <div className={styles.errortext}>{errors.Phone_number}</div>}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Address</b></CMLabel>
                    <TextField
                        value={rowdata?.address}
                        placeholder='Enter address'
                        size="small"
                        name="address"
                        fullWidth
                        onChange={handleChange}
                    />
                    {errors.address && <div className={styles.errortext}>{errors.address}</div>}
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Designation</b></CMLabel>
                    <TextField
                        value={rowdata?.designation}
                        placeholder='Enter designation'
                        size="small"
                        name="designation"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Department</b></CMLabel>
                    <TextField
                        value={rowdata?.department}
                        placeholder='Enter department'
                        size="small"
                        name="department"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Office Locality</b></CMLabel>
                    <TextField
                        value={rowdata?.off_location}
                        placeholder='Enter offlocality'
                        size="small"
                        name="off_location"
                        fullWidth
                        onChange={handleChange}
                    />
                </Grid> */}
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Id</b></CMLabel>
                    <TextField
                        placeholder='Enter id'
                        size="small"
                        name="id"
                        fullWidth
                        onChange={handleChange}
                        value={rowdata?.id}
                    />
                    {errors.id && <div className={styles.errortext}>{errors.id}</div>}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Password</b></CMLabel>
                    <TextField
                        placeholder='Enter password'
                        size="small"
                        name="password"
                        fullWidth
                        onChange={handleChange}
                        value={rowdata?.password}
                    />
                    {errors.password && <div className={styles.errortext}>{errors.password}</div>}
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Validation</b></CMLabel>
                    <FormControl fullWidth >
                        <Select size="small"
                            onChange={handleChange}
                            placeholder="validation" name="validation" value={rowdata?.validation}>
                            {dataOption.map((v: any, index: any) => (
                                <MenuItem value={v.id} >
                                    <Typography variant="body1">
                                        {v.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errors.validation && <div className={styles.errortext}>{errors.validation}</div>}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Designation</b></CMLabel>
                    <FormControl fullWidth >
                        <Select size="small"
                            onChange={handleChange}
                            placeholder="Enter designation" name="designation" value={rowdata?.designation}>
                            {empdesignation.map((v: any, index: any) => (
                                <MenuItem value={v.label} >
                                    <Typography variant="body1">
                                        {v.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errors.designation && <div className={styles.errortext}>{errors.designation}</div>}
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Department</b></CMLabel>
                    <FormControl fullWidth >
                        <Select size="small"
                            onChange={handleChange}
                            placeholder="Enter department" name="department" value={rowdata?.department}>
                            {empdepartment.map((v: any, index: any) => (
                                <MenuItem value={v.label} >
                                    <Typography variant="body1">
                                        {v.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.department && <div className={styles.errortext}>{errors.department}</div>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CMLabel><b>Office Locality</b></CMLabel>
                    <FormControl fullWidth >
                        <Select size="small"
                            onChange={handleChange}
                            placeholder="Enter off_location" name="off_location" value={rowdata?.off_location}>
                            {epmlocation.map((v: any, index: any) => (
                                <MenuItem value={v.label} >
                                    <Typography variant="body1">
                                        {v.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.off_location && <div className={styles.errortext}>{errors.off_location}</div>}
                    </FormControl>
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
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "end" }}>
                <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Grid>
            </div>
        </>
    );
}

export default EmployeeAdd;
