import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  Button,
  Divider,
  Paper,
  Grid,
  TextField,
} from "@material-ui/core";

import MenuBar from "./wrapper/MenuBar";
import axios from "axios";

import { Link, Redirect } from "react-router-dom";

import low from "lowdb";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  title: {
    fontFamily: "Montserrat",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#f44336",
    fontWeight: "bold",
  },
  subHead: {
    backgroundColor: "#fafafa",
  },
  tableContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  table: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat",
  },
  tableFont: {
    fontFamily: "Montserrat",
    color: "#000",
    fontWeight: "bold",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  grid: {
    marginTop: "30px",
  },
  subHead: {
    backgroundColor: "#fafafa",
  },
  form: {
    padding: theme.spacing(2),
    marginTop: "200px",
    backgroundColor: "#fff",
  },
  field: {
    // margin: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submit: {
    fontFamily: "Montserrat",
  },
}));

export const Company = () => {
  const classes = useStyles();
  //refresh page
  const [refresh, setRefresh] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [gstin, setGstin] = useState("");

  const [mycompany, setMyCompany] = useState([]);

  const [redirect, setRedirect] = useState(false);

  const [company, setCompany] = useState([]);
  useEffect(async () => {
    const getData = await axios.get("mycompany");
    setCompany(getData.data);

    // console.log(getData);
  }, [refresh]);

  const submitForm = async (e) => {
    e.preventDefault();
    const postData = await axios.post("mycompany", {
      name,
      address,
      contact,
      gstin,
    });
    setRefresh((v) => !v);
    // console.log(postData);
  };
  const customRedirect = async (id) => {
    const getCompany = await axios.get("/mycompany/" + id);
    // setMyCompany(getCompany.data);
    localStorage.setItem("mycompany", JSON.stringify(getCompany.data));
    // console.log(getCompany.data.name);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Toolbar className={classes.subHead}>
        <Typography variant="h6" className={classes.title}>
          Select Company
        </Typography>
      </Toolbar>
      <Divider />
      <Grid container spacing={3} className={classes.grid}>
        {company.map((val) => {
          return (
            <Grid item xs={3}>
              <Button
                className={classes.paper}
                onClick={() => customRedirect(val.id)}
              >
                {val.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={submitForm}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Company Name"
          className={classes.field}
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Address"
          className={classes.field}
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="GSTIN"
          className={classes.field}
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={gstin}
          onChange={(e) => setGstin(e.target.value)}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Contact Number"
          type="number"
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />

        <Button
          fullWidth
          variant="contained"
          className={classes.submit}
          color="primary"
          type="submit"
        >
          Add Company
        </Button>
      </form>
    </div>
  );
};
