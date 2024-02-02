import React, { createContext, useEffect } from "react";
import { CMLabel } from "./FormLabels";
// import { CMTextField } from "../TextField/CMTextField";
import { CMAutoComplete } from "../AutoComplete/AutoComplete";
import { CMToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import { useNavigate, useParams } from "react-router-dom";
// import { useFormik } from 'formik';
import { Box, Button, Card, CardContent, CircularProgress, Grid } from "@mui/material";
import { CMButton, CMLinkButton } from "../Button/Button";
import { useFormik } from "formik";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { CMFileUpload } from "./Input";
import { CMTextField } from "../TextField/CMSTextField";
import { generateFormFields } from "../Helpers/Form";
import { AppContext } from "../Helpers/Context/AppContext";
import { ErrorMessage } from "../Alert/Alert";
import { buttonStyle } from "../Helpers/InlineStyles";
import { useRouter } from "next/router";

const TextField = (props: any) => {

    const { item, formik, handleChange } = props;
    return <React.Fragment>
        {formik.errors[item.name] ? (<CMLabel>{item.label}<span style={{ color: "red" }}>*</span> </CMLabel>) : (<CMLabel>{item.label}</CMLabel>)}
        <CMTextField disabled={item.disabled}
            //  sx={inputStyle}
            name={item.name} placeholder={item.placeholder}
            onChange={(e: any) => handleChange(item.name, e)}
            error={formik.touched[item.name] && Boolean(formik.errors[item.name])}
            helperText={formik.touched[item.name] && formik.errors[item.name]}
            value={formik.values[item.name]}
            title={formik.values[item.name]}
        />
    </React.Fragment>
}

const Dropdown = (props: any) => {
    const { item, formik, handleChange } = props;
    console.log(typeof formik.values[item.name], "$$$$$$4");

    return <>
        {
            typeof formik.values[item.name] == "object" ?
                <React.Fragment>
                    {/* <CMLabel>{item.label}</CMLabel> */}
                    {formik.errors[item.name] ? (<CMLabel>{item.label}<span style={{ color: "red" }}>*</span> </CMLabel>) : (<CMLabel>{item.label}</CMLabel>)}
                    <CMAutoComplete
                        options={item.options ? item.options : [{ id: 1, label: "label" }]}
                        disabled={item.disabled}
                        placeholder={item.placeholder}
                        onChange={(val: any) => handleChange(item.name, val)}
                        name={item.name}
                        value={formik.values[item.name]}
                        errors={formik.touched[item.name] && Boolean(formik.errors[item.name])}
                        helperText={formik.touched[item.name] && formik.errors[item.name]}
                    />
                </React.Fragment> : <React.Fragment>
                    {/* <CMLabel>{item.label}</CMLabel> */}
                    {formik.errors[item.name] ? (<CMLabel>{item.label}<span style={{ color: "red" }}>*</span> </CMLabel>) : (<CMLabel>{item.label}</CMLabel>)}
                    <CMAutoComplete
                        options={item.options ? item.options : [{ id: 1, label: "label" }]}
                        disabled={item.disabled}
                        placeholder={item.placeholder}
                        onChange={(val: any) => handleChange(item.name, val)}
                        name={item.name}
                        value={formik.values[item.name]}
                        errors={formik.touched[item.name] && Boolean(formik.errors[item.name])}
                        helperText={formik.touched[item.name] && formik.errors[item.name]}
                    />
                </React.Fragment>

        }
    </>

}

export const ToggleSwitch = (props: any) => {

    const { item, formik, handleChange } = props;
    return <React.Fragment>
        <CMLabel>{item.label}</CMLabel>
        <CMToggleSwitch checked={formik.values[item.name]}
            onChange={(e: any) => handleChange(item.name, e)}
            name={item.name} color={'primary'} />
    </React.Fragment>
}

const TextArea = (props: any) => {
    const { item, formik, handleChange } = props;
    return <React.Fragment>
        <CMLabel>{item.label}</CMLabel>
        <CMTextField
            disabled={item.disabled}
            minRows={4}
            multiline={true}
            name={item.name} placeholder={item.placeholder}
            onChange={(e: any) => handleChange(item.name, e)}
            error={formik.touched[item.name] && Boolean(formik.errors[item.name])}
            helperText={formik.touched[item.name] && formik.errors[item.name]}
            value={formik.values[item.name]}
        />
    </React.Fragment>
}

export const CMDatePicker = (props: any) => {
    const { item, formik, handleChange } = props;
    return <React.Fragment>
        {formik.errors[item.name] ? (<CMLabel>{item.label}<span style={{ color: "red" }}>*</span> </CMLabel>) : (<CMLabel>{item.label}</CMLabel>)}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                slotProps={{ textField: { fullWidth: true, size: 'small', name: item.name } }}
                format="DD-MM-YYYY"
                value={dayjs(formik.values[item.name])}
                onChange={(val: any) => handleChange(item.name, val)}
            />
            {/* {<span style={{ color: "red" }}>{formik.errors[item.name]}</span>} */}
            {formik.touched[item.name] && formik.errors[item.name] && (
                <div style={{
                    color: "#ff3d60", fontFamily:"Arial", fontWeight: 400, fontSize: "0.75rem", lineHeight: 1.66, letterSpacing: "0.03333em", textAlign: "left", marginTop: "4px", marginBottom: "0px", marginRight: "14px", marginLeft: "14px"
                }}>{formik.errors[item.name]}</div>)
            }
        </LocalizationProvider>
    </React.Fragment>
}

const FileUpload = (props: any) => {

    const { item, formik, handleChange } = props;
    return <React.Fragment>
        {formik.errors[item.name] ? (<CMLabel>{item.label}<span style={{ color: "red" }}>*</span> </CMLabel>) : (<CMLabel>{item.label}</CMLabel>)}
        <CMFileUpload
            value={formik.values[item.name]}
            onChange={(e: any) => handleChange(item.name, e)}
            error={formik.touched[item.name] && Boolean(formik.errors[item.name])}
            helperText={formik.touched[item.name] && formik.errors[item.name]}
        />
    </React.Fragment>
}

export const CMForm = (props: any) => {
    const { formFields, validationSchema, detailService, type, submitValue } = props;

    const [formFieldValues, setFormFieldValues] = React.useState<any>([]);
    useEffect(() => {
        console.log(formFields, "111");

        generateFormFields(formFields).then((res: any) => {
            console.log(res, "%%%%%");

            setFormFieldValues(res)
        })
            .catch(err => {
                console.log("errrrrrrr");

                setFormFieldValues([])
            })
    }, [formFields])


    // const history = useNavigate();

    const { globalData, setGlobalData } = React.useContext(AppContext)
    const [showError, setShowError] = React.useState(false)
    const [error, setError] = React.useState("")

    const { id } = useParams();

    const formik: any = useFormik({
        initialValues: props.initialValues ? props.initialValues : {},
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            console.log(values, "%%%%%%%%%%%%%%%%%");
            props.values(formik.values)
            setShowError(false);
            setGlobalData({
                ...globalData,
                loading: true
            });
            let json: any = {};
            Object.keys(values).forEach((item: any) => {
                if (typeof values[item] == 'object') {
                    json[item] = values[item].id;

                } else {
                    json[item] = values[item];
                }
            })
            // let service: any = type === 'edit' ? props.addService(json, id + "") : props.addService(json);
            // service.then((result: any) => {
            //     setGlobalData({
            //         ...globalData,
            //         loading: true
            //     });
            //     // if(type ==='edit'){
            //     //     toast.success("Record Updated Successfully")
            //     // }else{
            //     //     toast.success("Record Created Successfully")
            //     // }
            //     // history(routeLinks[props.listPageKey]);
            // },
            //     (error: any) => {
            //         setGlobalData({
            //             ...globalData,
            //             loading: false
            //         })
            //         setShowError(true)
            //         setError(error)
            //     });
        },
    });

    const hideErrorWindow = () => {
        setShowError(false);
    }

    useEffect(() => {
        if (submitValue) {
            formik?.handleSubmit()
        }

    }, [submitValue])


    const [loading, setLoading] = React.useState<any>(false)
    React.useEffect(() => {

        if (formFieldValues.length) {
            setLoading(true)
            formFieldValues.forEach((item: any) => {
                if (item.default) {
                    formik.setFieldValue(item.name, item.default)
                } else {
                    if (item.type === 'dropdown' && item.options?.length)

                        formik.setFieldValue(item.name, item.options[0])
                    else
                        formik.setFieldValue(item.name, '')

                }
            })
            if (type === 'edit') {
                setShowError(false);
                setGlobalData({
                    ...globalData,
                    loading: true
                });
                detailService(id + "").then((res: any) => {
                    formik.setValues(res);
                    formFieldValues.forEach((item: any) => {

                        if (item.type === 'dropdown') {
                            console.log("options", item.options, res, item.name)
                            let option = item.options.find((x: any) => x.id === res[item.name]);
                            console.log("optionsvalue", option)
                            setTimeout(() => {
                                formik.setFieldValue(item.name, option)
                            }, 1000)

                        }
                    })
                    setShowError(false);
                    setGlobalData({
                        ...globalData,
                        loading: false
                    })
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000)

                }).catch((err: any) => {
                    setShowError(true);
                    setError(error)
                    setGlobalData({
                        ...globalData,
                        loading: false
                    })
                    setLoading(false);
                })
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 100)
            }
        }

    }, [formFieldValues]);

    // const router = useRouter();
    const handleChange = (field: any, value: any) => {
        formik.setFieldValue(field, value);
    }

    return (
        (formFieldValues.length < 1 || loading) ? <Card sx={{ padding: "10px", "display": "flex", justifyContent: "center" }}><CircularProgress /></Card> :
            <form onSubmit={formik?.handleSubmit}>
                <Card>
                    <CardContent>
                        {
                            showError ?
                                <ErrorMessage onClick={hideErrorWindow} message={error} /> : null
                        }
                        <Grid container spacing={3}>
                            {
                                formFieldValues.map((item: any, index: number) => {
                                    console.log(item, "********");

                                    return (
                                        <Grid item xs={12} lg={(formFieldValues.length === 1) || item.fullWidth ? 12 : props.layout == "2 Box Layout" ? 6 : props.layout == "3 Box Layout" ? 4 : 6} md={(formFieldValues.length === 1) || item.fullWidth ? 12 : props.layout == "2 Box Layout" ? 6 : props.layout == "3 Box Layout" ? 4 : 6} sm={(formFieldValues.length === 1) || item.fullWidth ? 12 : props.layout == "2 Box Layout" ? 6 : props.layout == "3 Box Layout" ? 4 : 6} key={"te" + index}>

                                            {
                                                item?.type === 'text' ?
                                                    <TextField item={item} formik={formik} handleChange={handleChange} />
                                                    : item?.type === 'dropdown' ?
                                                        <Dropdown item={item} formik={formik} handleChange={handleChange} /> :
                                                        item?.type === 'toggle' ?
                                                            <ToggleSwitch formik={formik} handleChange={handleChange} item={item} /> :
                                                            item.type === 'textarea' ?
                                                                <TextArea item={item} formik={formik} handleChange={handleChange} /> :
                                                                item.type === 'date' ?
                                                                    <CMDatePicker formik={formik} handleChange={handleChange} item={item} /> :
                                                                    item.type === 'file' ?
                                                                        <FileUpload item={item} formik={formik} handleChange={handleChange} /> :

                                                                        null
                                            }
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        {/* <Box component='div'
                            sx={buttonStyle}
                        >
                            <Box component='span' mr={2} sx={{ boxShadow: 2 }}>
                                <CMLinkButton variant="contained" color="secondary" value="Cancel"
                                    link={props.listPageKey}
                                />
                                <Button onClick={handleButton} style={{color:"white",backgroundColor:"black",paddingLeft:"16px",paddingRight:"16px",paddingBottom:"6px",paddingTop:"6px"}}>Cancel</Button>
                            </Box>

                            <Box component='span' mr={2}>
                                <CMButton variant="contained" value="Submit" color="primary" type="submit"></CMButton>
                            </Box>
                        </Box> */}
                    </CardContent>
                </Card>
            </form>
    )
}