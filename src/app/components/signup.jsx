import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import * as mutations from "../store/mutations";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({ authenticated, handleCreateUser }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleCreateUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
              />
            </Grid>
            {authenticated == mutations.USERNAME_RESERVED ? (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email-error"
                  name="email"
                  label="Email Address already exists"
                  type="email"
                  error
                />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNo"
                name="phoneNo"
                label="Phone Number"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.session.status,
});

const mapDispatchToProps = (dispatch) => ({
  handleCreateUser(e) {
    e.preventDefault();
    const name = e.target["name"].value;
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    const phoneNo = e.target["phoneNo"].value;
    dispatch(mutations.createUser({ name, email, password, phoneNo }));

    e.target["email"].value = null;
  },
});

SignUp.propTypes = {
  authenticated: PropTypes.string,
};

export const ConnectedSignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
