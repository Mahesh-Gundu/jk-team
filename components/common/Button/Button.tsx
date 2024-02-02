import Button from '@mui/material/Button';
import styles from "./Button.module.scss";
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

interface ButtonProps {
    variant: "contained" | "outlined",
    color: "primary" | "secondary" | "success" | "error",
    value: string,
    onClick?: any,
    size?: "small" | "medium" | 'large',
    type: any,
    disabled?: boolean,
    loading?: boolean
}

interface LinkButtonProps {
    variant: "contained" | "outlined",
    color: "primary" | "secondary" | "success" | "error",
    value: string,
    size?: "small" | "medium" | 'large',
    type: any,
    link: string,
    icon?:any
}

export const CMButton = (props: ButtonProps) => {
    return (
        <Button onClick={props.onClick} disabled={props.disabled || props.loading} size='medium' className={props.size === "small" ? styles.smallButton : ""} variant={props.variant} color={props.color} type={props.type}>
            {props.value}
            {props.loading ? <CircularProgress size={"20px"} sx={{ marginLeft: "10px" }} color="inherit" /> : ""}
        </Button>
    )
}

export const CMLinkButton = (props: LinkButtonProps) => {

    return (
        <Button component={Link} to={props.link} size='medium' className={props.size === "small" ? styles.smallButton : ""} variant={props.variant} color={props.color} type={props.type}>
            {props.value}{props.icon?<span>&nbsp;</span>:null}{props.icon?props.icon:null}
        </Button>
    )
}

CMButton.defaultProps = {
    variant: "contained",
    value: "-",
    color: "primary",
    type: "button"
}

CMLinkButton.defaultProps = {
    variant: "contained",
    value: "-",
    color: "primary",
    type: "button",
    link: "/"
}