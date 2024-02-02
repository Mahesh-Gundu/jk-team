import { Box } from "@mui/material";
import React, { useContext, useState } from 'react';
import { CMForm } from "../common/Form/CMForm";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Add, Remove } from "@mui/icons-material";
import styles from './formtitle.module.scss';
import { AppContext } from "../common/Helpers/Context/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from "yup";

export const FormTitleAdd = (props: any) => {

    const { globalData, setGlobalData } = useContext<any>(AppContext)
    const [remove,setRemove] = useState(false)

    const addForm = (e: any, index: any) => {
        setRemove(true)
        let dataValue = [...props.value];
        let obj = {
            id: dataValue.length + 1,
            heading: e.heading,
            multiple: e.multiple,
            layout: e.layout,
            approval: e.approval,
            options: e.options,
            section1: e.section1 ,
            removeFormData:true
        }
        dataValue.splice(index + 1, 0, obj)
        setGlobalData({
            ...globalData,
            user: { ...globalData.user, data: dataValue }
        })
    }

    const removeForm = (e: any, index: any) => {
        let dataValue = [...props.value];
        // if (props.value.length > 1) {
            dataValue.splice(index, 1)
        // }
        setGlobalData({
            ...globalData,
            user: { ...globalData.user, data: dataValue }
        })
    }

    const validationSchema = (val: any) => {

        let obj = {}
        val.map((e: any) => {
            if ((e.type == "text" && e.toggle==true)) {
                if (e.minlength && e.maxlength) {
                    obj = Object.assign(obj, {
                        [e.name]: yup.string().ensure().required(e.label + " required").min(Number(e.minlength), "Too Short").max(Number(e.maxlength), "Too Long")
                    });
                } else {
                    obj = Object.assign(obj, {
                        [e.name]: yup.string().ensure().required(e.label + " required")
                    });
                }
            }
            else if ((e.type == "file" && e.toggle==true)) {
                if (e.minsize && e.maxsize) {
                    obj = Object.assign(obj, {
                        [e.name]: yup.string().ensure().required(e.label + " required").min(Number(e.minsize), "Too Short").max(Number(e.maxsize), "Too Long")
                    });
                } else {
                    obj = Object.assign(obj, {
                        [e.name]: yup.string().ensure().required(e.label + " required")
                    });
                }
            }
            else if ((e.type == "range" && e.toggle==true)) {
                if (e.minrange && e.maxrange) {
                    obj = Object.assign(obj, {
                        [e.name]: yup.string().ensure().required(e.label + " required").min(Number(e.minrange), "Too Short").max(Number(e.maxrange), "Too Long")
                    });
                } else {
                    obj = Object.assign(obj, {
                        [e.name]: yup.string().ensure().required(e.label + " required")
                    });
                }
            }
            else if (e.type == "dropdown" && e.toggle==true) {
                obj = Object.assign(obj, { [e.name]: yup.object().required(e.label + " required") });
            }
            else if (e.type == "date" && e.toggle==true) {
                obj = Object.assign(obj, { [e.name]: yup.date().nullable().required(e.label + " required") });
            }

        })
        return yup.object(obj);

    }
    console.log(props.value,"cmform data")

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Row>
                        <Col lg={12}>
                            {props.value?.map((e: any, index: any) => (
                                <Box component="div" sx={{ mt: 2 }}>

                                    <div className={e.heading ? styles.approvalName : styles.buttonContainer}>
                                        {e.heading ? <h4 style={{ marginTop: "20px" }}>{"Add " + e.heading}</h4> : null}
                                        {/* {e.multiple ?
                                            <div className={styles.buttontonggle}>
                                                <div>
                                                    <Button className={styles.buttonplus} onClick={() => addForm(e, index)}>
                                                        < Add className={styles.buttonadd} />
                                                    </Button>
                                                </div>
                                                {<div>
                                                    <Button className={styles.buttonplus} onClick={() => removeForm(e, index)} disabled={!e.removeFormData}>
                                                        <Remove className={styles.buttonadd} />
                                                    </Button>
                                                </div>}
                                            </div> : null} */}
                                    </div>

                                    <CMForm
                                        formFields={e.section1}
                                        layout={e.layout}
                                        submitValue={props.submit}
                                        validationSchema={() => validationSchema(e.section1)}
                                        values={(val: any) => props.values(val, index)}

                                    />
                                </Box>
                            ))}
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    )
}