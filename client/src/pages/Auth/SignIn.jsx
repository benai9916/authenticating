import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

import { Typography, Container, Paper, Grid, Button } from "@mui/material";

import Input from "../../components/Input";
import { signIn } from "../../store/slice/authSlice";

const initialStat = { email: "", password: " " };

const Signin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialStat);
  const dispatch = useDispatch();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await dispatch(signIn(formData));
    if(result.payload?.message) {
      navigate('/reservation')
      localStorage.setItem('isValid', true)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{mt: 5, pt:5}}>
      <Paper elevation={4} >
        <Typography style={{ paddingTop: 20, paddingLeft: 30 }} variant="h5">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container style={{ padding: "10px 20px" }}>
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
            style={{ margin: "20px", marginLeft: 36, width: 150 }}
            type="submit"
            size="large"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container justify="center" style={{ paddingBottom: 10 }}>
            <Grid item sx={{pl:3}}>
              <Button href="/signup">Dont have an accout? Sign Up</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signin;
