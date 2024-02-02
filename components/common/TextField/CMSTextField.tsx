import { TextField} from "@mui/material";

interface TextFieldProps {
    name?: string,
    onChange?: any,
    value?: any,
    error?: any,
    helperText?: any,
    placeholder?: string,
    sx?: any,
    type?: "text" | "number" | "file" | "password",
    variant?: "filled" | "standard" | "outlined",
    InputProps?: any,
    disabled?:boolean,
    fullWidth?:boolean,
    minRows?:any,
    multiline?:any,
    title?:any,
}

export const CMTextField = (props: TextFieldProps) => {
    const handleChange = (e: any) => {
        props.onChange(e.target.value);
    }
    return (
        <TextField
            name={props.name}
            onChange={handleChange}
            value={props.value}
            error={props.error}
            type={props.type}
            helperText={props.helperText}
            placeholder={props.placeholder}
            disabled={props.disabled?true:false}
            // margin="dense"
            size="small"
            variant={props.variant}
            InputProps={props.InputProps}
            minRows={props.minRows}
            multiline={props.multiline}
            fullWidth={true}
            title={props.title}
            sx={props.sx} />
    )
}
// const StyledTextarea = styled(TextareaAutosize)(
//     ({ theme }) => `
    
//     border: 1px solid #d0d7de;
//     &:hover {
//       border-color:  #505d69;
//     }
//     &:focus {
//         border-color: #00a8ec;
//     }
//     ${(props:any)=> props.error &&   'border-color:  #ff3d60;'}
  
//   `,
//   );


// interface TextareaAutosizeProps {
//     name?: string,
//     onChange?: any,
//     value?: any,
//     placeholder?: string,
//     disabled?:boolean,
//     minRows?:any,
//     error?:any
//     helperText?: any,
// }

// export const CMTextArea = (props: TextareaAutosizeProps)=>{
//     const handleChange = (e: any) => {
//         props.onChange(e.target.value);
//     }
//     // return (
//     //     <StyledTextarea
//     //         name={props.name}
//     //         // error={props.error}
//     //         onChange={handleChange}
//     //         value={props.value}
//     //         placeholder={props.placeholder}
//     //         disabled={props.disabled?true:false}
//     //         style={{width:'100%',borderRadius:4, borderWidth:1.5}}
//     //         minRows={props.minRows?props.minRows:3}
//     //         />
//     // )

//     return(
//         <TextField
//         name={props.name}
//         onChange={handleChange}
//         value={props.value}
//         error={props.error}
//         // type={props.type}
//         helperText={props.helperText}
//         placeholder={props.placeholder}
//         disabled={props.disabled?true:false}
//         // margin="dense"
//         size="small"
//         // variant={props.variant}
//         minRows={3}
//         fullWidth={true}
//         // sx={props.sx}
//   InputProps={{
//     inputComponent: StyledTextarea,
//   }}
// />
//     )
// }