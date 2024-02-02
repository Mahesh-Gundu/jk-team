import { Box, Grid, TextField } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { CMLabel } from '../common/Form/FormLabels';
import { useFormik } from "formik";
import * as yup from "yup";
import { buttonStyle } from '../common/Helpers/InlineStyles';
import { CMButton } from '../common/Button/Button';
import styles from './Patients.module.scss'

function PatientModal(props: any) {
    const ModelBodyComponent = props.modelCmpnt;
    // const getAddDetails = (val: any) => {
    //     console.log(val, "******")
    // }
    const handleChange = (fields: any, e: any) => {
        console.log(e.target.value, "values")
        formik.setFieldValue(fields, e.target.value);
    }
    const formik = useFormik({
        initialValues: {
            test: "",
            result: "",
        },
        validationSchema: yup.object({
            test: yup.string().ensure().required(" Test is required!"),
            result: yup.string().required(" Result is required!"),
        }),
        onSubmit: (values: any) => {
            console.log(values, "values")
            // addDropdown().then((res: any) => {
            //     console.log(res)
            //     // toast.success("Record Created Successfully")
            // }, (error: any) => {
            //     console.log(error)
            // });
            props.onHide()
        },
    });

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} >
                <Modal.Header closeButton >
                    <h5><b>{props.header}</b></h5>
                </Modal.Header>
                <Modal.Body>
                    {/* <ModelBodyComponent rowData={props.rowData} onSubmit={onSubmit} getaddDetails={getAddDetails} />  */}
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CMLabel>Test</CMLabel>
                                <TextField
                                    placeholder='Enter Test'
                                    size="small"
                                    name="test"
                                    fullWidth
                                    onChange={(e: any) => handleChange("test", e)}
                                />
                                {formik.touched.test && formik.errors.test && (
                                    <div className={styles.errortext + " text-danger"}>{formik.errors.test}</div>)
                                }
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CMLabel>Result</CMLabel>
                                <TextField
                                    placeholder='Enter Result'
                                    size="small"
                                    name="result"
                                    multiline
                                    minRows={3}
                                    fullWidth
                                    onChange={(e: any) => handleChange("result", e)}
                                />
                                {formik.touched.result && formik.errors.result && (
                                    <div className={styles.errortext + " text-danger"}>{formik.errors.result}</div>)
                                }
                            </Grid>
                        </Grid>
                        <Box component='div'
                            sx={buttonStyle}>
                            <Box component='span'>
                                <CMButton variant="contained" value="Submit" type="submit" color="primary" />
                            </Box>
                        </Box>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PatientModal;