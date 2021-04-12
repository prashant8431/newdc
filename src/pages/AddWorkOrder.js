import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

export const AddWorkOrder = () => {
  //database initialise

  const classes = useStyles();

  const [orderNo, setOrderNo] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [type, setType] = useState("");

  const [partName, setPartName] = useState("");
  const [qty, setQty] = useState("");

  //error
  const [orderNoErr, setOrderNoErr] = useState(false);
  const [companyIdErr, setCompanyIdErr] = useState(false);
  const [typeErr, setTypeErr] = useState(false);
  const [partNameErr, setPartNameErr] = useState(false);
  const [qtyErr, setQtyErr] = useState(false);
  //array part and qty

  const [arrayId, setArrayId] = useState(0);
  const [partArr, setPartArr] = useState([]);

  const [companyArr, setCompanyArr] = useState([]);

  //backdrop
  const [dropOpen, setDropOpen] = useState(false);

  //snackbar
  const [snackOpen, setSnackOpen] = useState(false);

  //autocomplete
  const [key, setKey] = useState("");
  const [productList, setProductList] = useState([]);

  //dialog state
  const [dialogOpen, setDialogOpen] = useState(false);

  const [productName, setProductName] = useState("");

  //my Company
  const [mycompany, setMyCompany] = useState([]);

  const addPartQty = () => {
    setPartNameErr(false);
    setQtyErr(false);
    if (partName === "") {
      return setPartNameErr(true);
    }
    if (qty === "") {
      return setQtyErr(true);
    }

    const array = {
      arrayId,
      partName,
      qty,
    };
    setPartArr([...partArr, array]);
    setArrayId(arrayId + 1);
  };

  const handleDelete = (id) => {
    const newArr = partArr.filter((item) => item.arrayId !== id);
    setPartArr(newArr);
  };

  const addOrder = async (e) => {
    e.preventDefault();
    setDropOpen(true);
    setOrderNoErr(false);
    setCompanyIdErr(false);
    setTypeErr(false);

    if (orderNo === "") {
      return setOrderNoErr(true);
    }
    if (companyId === "") {
      return setCompanyIdErr(true);
    }
    if (type === "") {
      return setTypeErr(true);
    }
    const orderArr = {};
    const postData = await axios.post("home", {
      orderNo,
      mycompanyId: mycompany.id,
      companyId,
      orderDate,
      type,
      partArr,
    });
    console.log(postData);
    if (postData.status === 201) {
      setDropOpen(false);
      setSnackOpen(true);
      window.location.reload();
    }
  };

  useEffect(async () => {
    const getData = await axios.get("/company");
    setCompanyArr(getData.data);
  }, []);
  const snackClose = () => {
    setSnackOpen(false);
  };

  //autocomplete search
  useEffect(async () => {
    const getProducts = await axios.post("/searchProduct", {
      key,
    });
    setProductList(getProducts.data);
    // console.log(key);
    const getStored = localStorage.getItem("mycompany");
    setMyCompany(JSON.parse(getStored));

    console.log(mycompany);
  }, [key]);

  const openModal = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  const submit = async () => {
    const res = await axios.post("/productList", {
      productName,
    });
    setDialogOpen(false);
    // setRefresh((v) => !v);
    // console.log(res);
  };

  return (
    <div className={classes.root}>
      <MenuBar />

      <Toolbar className={classes.subHead}>
        <Typography variant="h6" className={classes.title}>
          Add New Purchase Order
        </Typography>
        <Button color="secondary" onClick={() => openModal()}>
          Add Products
        </Button>
      </Toolbar>
      <Divider />
      <form
        className={classes.form}
        noValidate
        onSubmit={addOrder}
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Order Number"
              className={classes.field}
              value={orderNo}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setOrderNo(e.target.value)}
              error={orderNoErr ? true : false}
              helperText={orderNoErr ? "Please write order number" : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              className={classes.field}
              error={typeErr ? true : false}
            >
              <InputLabel id="demo-simple-select-label" shrink>
                Select Company
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setCompanyId(e.target.value);
                }}
                value={companyId}
              >
                {companyArr.map((val) => {
                  return <MenuItem value={val.id}>{val.name}</MenuItem>;
                })}
              </Select>
              <FormHelperText>
                {typeErr ? "Please seslect type" : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Order Date"
              type="date"
              className={classes.field}
              value={orderDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setOrderDate(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              className={classes.field}
              error={companyIdErr ? true : false}
            >
              <InputLabel id="demo-simple-select-label" shrink>
                Order Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                value={type}
              >
                <MenuItem value="work">Work Order</MenuItem>
                <MenuItem value="purchase">Purchase Order</MenuItem>
              </Select>
              <FormHelperText>
                {companyIdErr ? "Please seslect type" : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            {/* <TextField
              fullWidth
              variant="outlined"
              label="Part Name"
              className={classes.field}
              value={partName}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setPartName(e.target.value);
              }}
              error={partNameErr ? true : false}
              helperText={partNameErr ? "Please write part name" : ""}
            /> */}
            <Autocomplete
              id="controllable-states-demo"
              options={productList.map((option) => option.name)}
              // getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              onChange={(e, fVal) => {
                setPartName(fVal);
              }}
              value={partName}
              onInputChange={(e, val) => {
                setKey(val);
              }}
              inputValue={key}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Quantity"
              type="number"
              className={classes.field}
              value={qty}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setQty(e.target.value);
              }}
              error={qtyErr ? true : false}
              helperText={qtyErr ? "Please write quantity" : ""}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              className={classes.addbtn}
              color="primary"
              onClick={() => {
                addPartQty();
              }}
            >
              Add Part
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.tableFont}>
                  Part Name
                </TableCell>
                <TableCell align="center" className={classes.tableFont}>
                  Quantity
                </TableCell>
                <TableCell align="center" className={classes.tableFont}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partArr
                .map((val) => {
                  return (
                    <TableRow>
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        className={classes.tableFont}
                      >
                        {val.partName}
                      </TableCell>
                      <TableCell align="center" className={classes.tableFont}>
                        {val.qty}
                      </TableCell>

                      <TableCell align="center" className={classes.tableFont}>
                        <Button
                          onClick={() => {
                            handleDelete(val.arrayId);
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

      <Dialog open={dialogOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Please write name of product</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            fullWidth
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            value={productName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
