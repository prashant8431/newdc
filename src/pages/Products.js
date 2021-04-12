import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuBar from "./wrapper/MenuBar";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
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
}));

export const Products = () => {
  const classes = useStyles();
  //refresh page
  const [refresh, setRefresh] = useState(false);

  const [products, setProducts] = useState([]);

  //dialog state
  const [dialogOpen, setDialogOpen] = useState(false);

  const [productName, setProductName] = useState("");

  useEffect(async () => {
    const getData = await axios.get("productList");
    setProducts(getData.data);
    // console.log(getData);
  }, [refresh]);

  const handleDelete = async (id) => {
    const delRes = await axios.delete("/productList/" + id);
    if (delRes.status === 202) {
      setRefresh((v) => !v);
    }
  };
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
    setRefresh((v) => !v);
    console.log(res);
  };
  return (
    <div className={classes.root}>
      <MenuBar />

      <Toolbar className={classes.subHead}>
        <Typography variant="h6" className={classes.title}>
          Product List
        </Typography>
        <Button color="secondary" onClick={() => openModal()}>
          Add Products
        </Button>
      </Toolbar>

      <Divider />

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableFont}>
                Product name
              </TableCell>

              <TableCell align="center" className={classes.tableFont}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
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
