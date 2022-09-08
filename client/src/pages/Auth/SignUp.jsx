import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { Typography, Container, Paper, Grid, Button } from "@mui/material";

import Input from "../../components/Input";

import { signUp } from "../../store/slice/authSlice";

const initialStat = {
  firstName: "",
  lastName: "",
  email: "",
  password: " ",
};

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialStat);
  const dispatch = useDispatch();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = await dispatch(signUp(formData));
    if(result.payload?.message) {
      navigate('/reservation')
    }
      
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{mt: 5, pt:5}}>
      <Paper elevation={4}>
        <Typography style={{ paddingTop: 20, paddingLeft: 30 }} variant="h5">
          Sign Up
        </Typography>
        <form  onSubmit={handleSubmit}>
          <Grid container style={{ padding: "10px 20px" }}>
            <Input name="firstName" handleChange={handleChange} label="First Name" />
            <Input name="lastName" handleChange={handleChange} label="Last Name" />

            <Input
              name="email"
              handleChange={handleChange}
              type="email"
              label="Email"
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          <Button
            style={{
              margin: "20px",
              marginLeft: 36,
              width: 150,
              fontWeight: "bold",
            }}
            type="submit"
            size="large"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justify="center" style={{ paddingBottom: 10 }}>
            <Grid item sx={{pl:3}}>
              <Button href="/signin">Already have an account? Sign In</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
