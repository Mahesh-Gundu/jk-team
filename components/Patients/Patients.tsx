import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CMLabel } from '../common/Form/FormLabels';
import { Button, Grid, TextField, Tooltip, Typography } from '@mui/material';
import style from './Patients.module.scss'
import { FlexDiv } from '../common/Flex/Flex';
import { PageHeader } from '../common/PageHeader/PageHeader';
import PatientModal from './PatientsModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik";
import * as yup from "yup";
import styles from './Patients.module.scss'

interface Column {
    id: 'tests' | 'result';
    label: string;
    minWidth?: number;
    align?: 'left';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: 'tests',
        label: 'Tests',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'result',
        label: 'Result',
        minWidth: 170,
        align: 'left',
    },

];

interface Data {
    tests: string;
    result: number;
}

function createData(
    tests: string,
    result: number,
): Data {
    // const density = population / size;
    return { result, tests };
}

const rows = [
    createData('abcde', 'IN'),
    createData('1234', 'CN'),
    createData('@#$&', 'IT'),
];

const PatientTableList = (props: any) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openModal, setOpenModal] = React.useState(false);

    const handleShow = (row: any) => {
        // console.log(row, "**********");
        // setRowData(row)
        setOpenModal(true);
    }
    const handleClose = () => setOpenModal(false);
    
    const handleChange = (fields: any, e: any) => {
        console.log(e.target.value, "values")
        formik.setFieldValue(fields, e.target.value)
        formik.setFieldValue("table",rows)
    }

    const formik: any = useFormik({
        initialValues: {
            patientname: "",
            table:"",
        },
        validationSchema: yup.object({
            patientname: yup.string().ensure().required('Patient name is required!')
        }),
        onSubmit: (values: any) => {
            console.log(values, "values")
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container xs={12} sm={12} md={12} lg={12} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 5, mb: 1, ml: 5, mr: 5 }}>
                        <CMLabel>Patient Name</CMLabel>
                        <TextField
                            placeholder='Enter Patient Name'
                            size="small"
                            name="patientname"
                            fullWidth
                            onChange={(e: any) => handleChange('patientname', e)}
                            value={formik.patientname}
                        />
                        {formik.touched.patientname && formik.errors.patientname && (
                            <div className={styles.errortext + " text-danger"}>{formik.errors.patientname}</div>)
                        }
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ ml: 5, mr: 5 }}>
                        <PageHeader list={true} value={"Add"} onClick={handleShow} />
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                    className={style.Tablebg}
                                                >
                                                    <Typography><b>{column.label}</b></Typography>
                                                </TableCell>
                                            ))}
                                            <TableCell
                                                key={'action'}
                                                className={style.Tablebg}
                                            >
                                                <Typography><b>Action</b></Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                        <TableCell key={"action"}>
                                                            <FlexDiv>
                                                                <Typography sx={{ marginLeft: "10px" }}>
                                                                    <Tooltip title="Edit">
                                                                        <Button className={style.buttonadj} variant="outlined" value="edit" color='primary' size="small" onClick={() => props.onClick(row, index)} >Edit</Button>
                                                                    </Tooltip>
                                                                </Typography>
                                                            </FlexDiv>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "end" }}>
                            <Button sx={{ mt: 2 }} variant="contained" color="primary" type="submit">Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

            {openModal && <PatientModal show={openModal} onHide={handleClose} header="Add Test & Result" />}

        </>
    );
}

export default PatientTableList;