import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({
  name,
  handleChange,
  type,
  label,
  autoFocus,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} style={{ padding: 14 }}>
      <TextField
        name={name}
        onChange={handleChange}
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {name === "password" && ( type !== 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />)}
                </IconButton>
              </InputAdornment>
            )
        }}
      />
    </Grid>
  );
};

export default Input;
