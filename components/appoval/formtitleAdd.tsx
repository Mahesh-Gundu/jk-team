import { Box } from "@mui/material";
import React, { useContext} from 'react';
import { CMForm } from "../common/Form/CMForm";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Add, Remove } from "@mui/icons-material";
import styles from './formtitle.module.scss';
import { AppContext } from "../common/Helpers/Context/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';


import * as yup from "yup";

export const FormTitleAdd = (props: any) => {

    const { globalData, setGlobalData } = useContext<any>(AppContext)

    const addForm = (e: any, index: any) => {

        let dataValue = [...props.value];
        let obj = {
            id: dataValue.length + 1,
            heading: e.heading,
            multiple: e.multiple,
            layout: e.layout,
            approval: e.approval,
            options: e.options,
            section1: e.section1
        }
        dataValue.splice(index + 1, 0, obj)
        setGlobalData({
            ...globalData,
            user: { ...globalData.user, data: dataValue }
        })
    }

    const removeForm = (e: any, index: any) => {
        let dataValue = [...props.value];
        if (props.value.length > 1) {
            dataValue.splice(index, 1)
        }
        setGlobalData({
            ...globalData,
            user: { ...globalData.user, data: dataValue }
        })
    }

    const validationSchema = (val: any) => {
        
        let obj = {}
        val.map((e: any) => {
            if ((e.type == "text" || e.type=="file") && e.toggle == true) {
                obj = Object.assign(obj, { [e.name]: yup.string().ensure().required(e.label + " required") });
            }
            else if (e.type == "dropdown" && e.toggle == true) {
                obj = Object.assign(obj, { [e.name]: yup.object().required(e.label + " required") });
            }
            else if (e.type == "date" && e.toggle == true) {
                obj = Object.assign(obj, { [e.name]: yup.date().nullable().required(e.label + " required") });
            }

        })
        return yup.object(obj);

    }

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
                                        {e.multiple ? 
                                          <div className={styles.buttontonggle}>
                                          <div>
                                              <Button className={styles.buttonplus} onClick={() => addForm(e, index)}>
                                                  < Add className={styles.buttonadd} />
                                              </Button>
                                          </div>
                                          <div>
                                              <Button className={styles.buttonplus} onClick={() => removeForm(e, index)}>
                                                  <Remove className={styles.buttonadd} />
                                              </Button>
                                          </div>
                                      </div>: null}
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