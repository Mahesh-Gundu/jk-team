import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CMLabel } from "../Form/FormLabels";
import { PageHeader } from '@/components/common/PageHeader/PageHeader';
import { Box } from '@mui/material';
import { Container } from "react-bootstrap";

// import { AppContext } from "../Context/AppContext";

function EmployeeAdd(props: any) {
    // const { globalData, setGlobalData } = React.useContext(AppContext);
    const [closeModal, setCloseModal] = React.useState(false);
    const [rowdata, setRowData] = React.useState(props.rowData || {});
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
    }
    const handleSubmit = (e: any) => {
        // e.preventDefault();
        setCloseModal(false);
        props.onSubmit(rowdata)
        console.log(rowdata, "@@@@@@@")
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
