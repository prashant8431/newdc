import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuBar from "./wrapper/MenuBar";
import {
  Toolbar,
  Typography,
  Divider,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
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
  form: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
  },
  field: {
    // margin: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submit: {
    fontFamily: "Montserrat",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  addbtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    fontFamily: "Montserrat",
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
}));

export const AddCompany = () => {
  //database initialise

  const classes = useStyles();

  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [gstin, setGstin] = useState("");
  const [contact, setContact] = useState("");

  //field err
  const [nameErr, setNameErr] = useState(false);
  const [addrErr, setAddrErr] = useState(false);
  const [gstinErr, setGstinErr] = useState(false);
  const [contactErr, setContactErr] = useState(false);

  //companies
  const [companyArr, setCompanyArr] = useState([]);

  //refresh page
  const [refresh, setRefresh] = useState(false);

  //backdrop
  const [dropOpen, setDropOpen] = useState(false);

  //snackbar
  const [snackOpen, setSnackOpen] = useState(false);

  const addCompany = async (e) => {
    e.preventDefault();
    setDropOpen(true);
    setNameErr(false);
    setAddrErr(false);
    setGstinErr(false);
    setContactErr(false);

    if (name === "") {
      return setNameErr(true);
    }
    if (addr === "") {
      return setAddrErr(true);
    }
    if (gstin === "") {
      return setGstinErr(true);
    }
    if (contact === "") {
      return setContactErr(true);
    }
    const addData = await axios.post("company", {
      name,
      addr,
      gstin,
      contact,
    });
    if (addData.status === 201) {
      setDropOpen(false);
      setSnackOpen(true);
      setRefresh((v) => !v);
    }
  };

  const handleDelete = async (id) => {
    const dRes = await axios.delete("/company/" + id);
    if (dRes.status === 202) {
      setRefresh((v) => !v);
    }
  };

  useEffect(async () => {
    const getData = await axios.get("/company");
    setCompanyArr(getData.data);
  }, [refresh]);
  const snackClose = () => {
    setSnackOpen(false);
  };

  return (
    <div className={classes.root}>
      <MenuBar />

      <Toolbar className={classes.subHead}>
        <Typography variant="h6" className={classes.title}>
          Add Company
        </Typography>
      </Toolbar>
      <Divider />
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={addCompany}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Company Name"
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameErr ? true : false}
          helperText={nameErr ? "Please write name" : ""}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Address"
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          error={addrErr ? true : false}
          helperText={addrErr ? "Please write address" : ""}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="GSTIN"
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          value={gstin}
          onChange={(e) => setGstin(e.target.value)}
          error={gstinErr ? true : false}
          helperText={gstinErr ? "Please wirte GSTIN number" : ""}
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
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          error={contactErr ? true : false}
          helperText={contactErr ? "Please write contact number" : ""}
        />

        <Button
          fullWidth
          variant="contained"
          className={classes.submit}
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <Divider />
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableFont}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableFont}>
                Address
              </TableCell>
              <TableCell align="center" className={classes.tableFont}>
                GSTIN
              </TableCell>
              <TableCell align="center" className={classes.tableFont}>
                Conatct
              </TableCell>
              <TableCell align="center" className={classes.tableFont}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyArr
              .map((val) => {
                return (
                  <TableRow>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className={classes.tableFont}
                    >
                      {val.name}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      {val.address}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      {val.GSTIN}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      {val.contact_no}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      <Button
                        onClick={() => {
                          handleDelete(val.id);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop className={classes.backdrop} open={dropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen}
        autoHideDuration={1000}
      >
        <Alert severity="success" onClose={snackClose}>
          New comapy added
        </Alert>
      </Snackbar>
    </div>
  );
};
