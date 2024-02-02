import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CircularProgress} from "@mui/material";
import axios from 'axios';
// import axios from 'axios';
import React from 'react';
// import { config } from '../../../config';

// interface InputProps {
//     label:string,
//     name:string,
//     placeholder:string,
//     formik:any
// }

export const CMInput = (props: any) => {
    return (
        <input className="my-custom-input" type="text" {...props} />
        // <React.Fragment>
        //     <CMLabel>{field.label}</CMLabel>
        //     <TextField id={field.name} fullWidth
        //         variant="outlined" size="small"
        //         sx={inputStyle}
        //         placeholder={field.placeholder}
        //         name={field.name}
        //         value={field.formik.values[field.name]}
        //         onChange={field.formik.handleChange}
        //         {...props}
        //         // error={formik.touched[props.name] && Boolean(formik.errors[props.name])}
        //         // helperText={formik.touched[props.name] && formik.errors[props.name]}
        //     />
        // </React.Fragment>

    )
}


// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

export const CMFileUpload = (props: any) => {
    console.log("image", props.value)
    const [loading, setLoading] = React.useState(false);
    // const [value, setValue] = React.useState(props.value || "");
    const onFileChange = (event: any) => {
        setLoading(true)
        if(event.target.files && event.target.files[0])
        fileUpload(event.target.files[0])
    }
    const fileUpload = (file: any) => {
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file", file
        );
        formData.append(
            "fileName", file.name
        );

        // Request made to the backend api
        // Send formData object
        // axios.post(config.baseUrl + '/upload-file', formData).then(res => {
        //     // setValue(res.data.filename);
        //     props.onChange(res.data.filename)
        //     setLoading(false);
        // }).catch(err => {
        //     console.log({ err })
        //     setLoading(false);
        // })

        axios.post('/upload-file', formData).then(res => {
            // setValue(res.data.filename);
            props.onChange(res.data.filename)
            setLoading(false);
        }).catch(err => {
            console.log({ err })
            setLoading(false);
        })
    }
    const getImagePath = (value: string) => {
        // return config.imageUrl + value;
        return value
    }
    const style = {
        color: "#ff3d60",
        fontSize: "0.75rem",
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
        marginTop: 4,
        fontWeight: 400
    }
    return (
        <>
            <label>
                <input type='file' onChange={onFileChange} style={{ display: 'none' }} />
                {(!props.value || loading) ? <Button disabled={loading} component="label" color="primary" variant="contained" startIcon={<CloudUploadIcon />}>
                    Choose file {loading ? <CircularProgress size={"20px"} sx={{ marginLeft: "10px" }} color="inherit" /> : ""}
                    <input type='file' onChange={onFileChange} style={{ display: 'none' }} />
                </Button> : <img alt="" width="150px" src={getImagePath(props.value)} />}
                {
                    props.errors || props.helperText ? <p style={style}>{
                        props.errors || props.helperText
                    }</p> : null
                }

            </label>

        </>

    )
}