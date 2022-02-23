import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React from "react";

export const FormText = ({ name, control, defaultValue="", rules, label, ...props }) => {
    const { setValue } = useForm();
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                if(!value && !!defaultValue) {setValue(name,defaultValue);}
                return (
                    <TextField 
                        name={name} 
                        onChange={onChange} 
                        value={value || defaultValue}
                        label={label} 
                        error={!!error} 
                        helperText={error ? error.message:null}
                        variant="standard"
                        required={!!rules?.required}
                        {...props}
                    />
                )
            }}
            rules={{...rules}}
        />
    );
};

export const FormPassword = ({ name, control, label, defaultValue="",rules, ...props }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                    <TextField 
                        type="password"
                        name={name} 
                        onChange={onChange} 
                        value={value || defaultValue}
                        label={label} 
                        error={!!error} 
                        helperText={error ? error.message:null}
                        variant="standard"
                        required={!!rules?.required}
                        autoComplete="new-password"
                        {...props}
                    />
                )
            }}
            rules={{...rules}}
        />
    );
}

export const FormTextArea = ({ name, control, label, defaultValue,rules, ...props }) => {
    const { setValue } = useForm();
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue||""}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                if(!value && !!defaultValue) {setTimeout(setValue(name,defaultValue));}
                return (
                    <TextField 
                        multiline 
                        rows={4} 
                        name={name} 
                        value={value || defaultValue} 
                        label={label} 
                        onChange={onChange} 
                        error={!!error} 
                        helperText={error ? error.message:null}
                        required={!!rules?.required}
                        {...props}
                    />
                )
            }}
            rules={{...rules}}
        />
    );
};