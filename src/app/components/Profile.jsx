import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as mutations from "../store/mutations";
import { history } from "../store/history";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },

  paper: {
    margin: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Profile = ({ user }) => {
  const classes = useStyles();
  return (
    <Grid item container component="main" className={classes.root} md={6}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Profile
        </Typography>
        <form className={classes.form}>
          <TextField
            color="primary"
            fullWidth
            id="name"
            name="name"
            value={user.name}
            label="Name: "
            InputProps={{
              readOnly: true,
            }}
            className="mt-4"
          />
          <TextField
            color="primary"
            fullWidth
            id="email"
            name="email"
            value={user.email}
            label="Email: "
            InputProps={{
              readOnly: true,
            }}
            className="mt-4"
          />
          <TextField
            color="primary"
            fullWidth
            id="phoneNo"
            name="phoneNo"
            value={user.phoneNo}
            label="Phone Number : "
            InputProps={{
              readOnly: true,
            }}
            className="mt-4"
          />
          <Button
            onClick={() => history.push("/profile/edit")}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit
          </Button>
        </form>
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export const ConnectedProfile = connect(mapStateToProps)(Profile);
