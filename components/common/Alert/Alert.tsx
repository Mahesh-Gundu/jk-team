import { Alert, AlertTitle } from "@mui/material"
import { useEffect } from "react"

export const ErrorMessage = (props: any) => {
    useEffect(() => {
        setTimeout(() => {
            props.onClick();
        }, 3000)
    }, [])
    return (
        <div style={{ marginBottom: 10 }}>
            <Alert onClose={props.onClick} severity="error">
                <AlertTitle sx={{textAlign:"left"}}>Error</AlertTitle>
                <div dangerouslySetInnerHTML={{ __html: props.message }}></div>
            </Alert>
        </div>

    )
}