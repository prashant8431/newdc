import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuBar from "./wrapper/MenuBar";
import {
  Toolbar,
  Typography,
  Divider,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  FormHelperText,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { Link, useParams, Redirect } from "react-router-dom";

import * as moment from "moment";
import UserContext from "./context/UserContext";

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
    marginTop: 40,
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
  grid: {
    marginTop: "20",
    fontFamily: "Montserrat",
  },
}));

export const GenerateDc = () => {
  const { mycompany } = useContext(UserContext);
  let { id } = useParams();

  const classes = useStyles();

  //array part and qty

  const [partArr, setPartArr] = useState([]);

  const [nameAddr, setNameAddr] = useState([]);

  const [name, setName] = useState("");

  //backdrop
  const [dropOpen, setDropOpen] = useState(false);

  //snackbar
  const [snackOpen, setSnackOpen] = useState(false);

  //textfield values

  const [values, setValues] = useState([]);

  useEffect(async () => {
    const getData = await axios.get("/home/" + id);
    setPartArr(getData.data[1]);
    setNameAddr(getData.data[0]);
    setName(getData.data[0].company.name);
    console.log(getData.data[0].company.name);
    console.log(values);
  }, []);
  const snackClose = () => {
    setSnackOpen(false);
  };

  const [descri, setDescri] = useState("");
  const [qty, setQty] = useState("");
  const [remarks, setRemarks] = useState("");

  const changeQty = (id, val, type) => {
    if (type === "descri") {
      setDescri(val);
    }
    if (type === "qty") {
      setQty(val);
    }
    if (type === "remarks") {
      setRemarks(val);
    }
    const array = {
      id,
      descri,
      qty,
      remarks,
    };

    const findP = values.find((p) => p.id === id);

    if (findP) {
      if (type === "descri") {
        findP.descri = val;
        return setDescri("");
      }
      if (type === "qty") {
        findP.qty = val;
        return setQty("");
      }
      if (type === "remarks") {
        findP.remarks = val;
        return setRemarks("");
      }

      // console.log(findP);
      return (findP.val = val);
    }

    setValues([...values, array]);
    // console.log(values);
  };
  const submitDc = async (e) => {
    e.preventDefault();
    const res = await axios.patch("/product/1", {
      values,
      nameAddr,
      mycompany_id: mycompany.id,
    });
    return window.location.replace("/print/" + res.data);

    // return <Redirect to="/print/1" />;

    console.log(res);
  };

  return (
    <div className={classes.root}>
      <MenuBar />

      <Toolbar className={classes.subHead}>
        <Typography variant="h6" className={classes.title}>
          Generate Delivery Challan
        </Typography>
      </Toolbar>
      <Divider />
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={submitDc}
      >
        <Grid container className={classes.grid} spacing={3}>
          <Grid item xs={3}>
            Order No : {nameAddr.order_no}
          </Grid>
          <Grid item xs={3}>
            Party Name :{name}
          </Grid>
          <Grid item xs={3}>
            Type : {nameAddr.type}
          </Grid>
          <Grid item xs={3}>
            Due Date : {nameAddr["order_date"]}
          </Grid>
        </Grid>

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tableFont}>
                  Part Name
                </TableCell>
                <TableCell align="center" className={classes.tableFont}>
                  Remaining Qty
                </TableCell>
                <TableCell align="center" className={classes.tableFont}>
                  Quantity
                </TableCell>
                <TableCell align="center" className={classes.tableFont}>
                  Remarks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partArr
                .map((val) => {
                  if (val.qty === 0) {
                    return (
                      <TableRow>
                        <TableCell className={classes.tableFont} align="center">
                          {val.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={3}
                          className={classes.tableFont}
                        >
                          Order Completed
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        className={classes.tableFont}
                      >
                        {val.name}
                        <br />
                        <br />

                        <TextField
                          variant="outlined"
                          label="Description"
                          className={classes.field}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) =>
                            changeQty(val.id, e.target.value, "descri")
                          }
                        />
                      </TableCell>
                      <TableCell align="center" className={classes.tableFont}>
                        {val.qty}
                      </TableCell>

                      <TableCell align="center" className={classes.tableFont}>
                        <TextField
                          variant="outlined"
                          label="Quantity"
                          className={classes.field}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="number"
                          onChange={(e) =>
                            changeQty(val.id, e.target.value, "qty")
                          }
                        />
                      </TableCell>
                      <TableCell align="center" className={classes.tableFont}>
                        <TextField
                          variant="outlined"
                          label="Remarks"
                          className={classes.field}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) =>
                            changeQty(val.id, e.target.value, "remarks")
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
                .reverse()}
            </TableBody>
          </Table>
        </TableContainer>
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

      <Backdrop className={classes.backdrop} open={dropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackOpen}
        autoHideDuration={1000}
      >
        <Alert severity="success" onClose={snackClose}>
          New order added
        </Alert>
      </Snackbar>
    </div>
  );
};
