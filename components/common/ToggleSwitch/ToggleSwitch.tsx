import Switch from "@mui/material/Switch";
import React from "react";

interface SwitchProps {
  variant: "contained" | "outlined";
  color: "primary" | "secondary" | "success" | "error";
  name: string;
  onChange?: any;
  checked: any;
}
export const CMToggleSwitch = (props: SwitchProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked ? 1 : 0)
  };
  return (
    <Switch checked={props.checked} onChange={handleChange} name={props.name} color={props.color} />
  );
};

CMToggleSwitch.defaultProps = {
  variant: "contained",
  color: "primary",
  checked: 1
}
