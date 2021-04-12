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
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuBar from "./wrapper/MenuBar";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import * as moment from "moment";
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

export const DClist = () => {
  const classes = useStyles();
  //refresh page
  const [refresh, setRefresh] = useState(false);

  const [orders, setOrders] = useState([]);
  useEffect(async () => {
    const getData = await axios.get("dchallan");
    setOrders(getData.data);
    console.log(getData);
  }, [refresh]);

  const handleDelete = async (id) => {
    const delRes = await axios.delete("/home/" + id);
    if (delRes.status === 202) {
      setRefresh((v) => !v);
    }
  };
  return (
    <div className={classes.root}>
      <MenuBar />

      <Toolbar className={classes.subHead}>
        <Typography variant="h6" className={classes.title}>
          Delivery Challan List
        </Typography>
      </Toolbar>
      <Divider />

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableFont}>
                Delivery Challan No
              </TableCell>
              <TableCell align="center" className={classes.tableFont}>
                Type
              </TableCell>
              <TableCell align="center" className={classes.tableFont}>
                Party name
              </TableCell>
              <TableCell align="center" className={classes.tableFont}>
                Date
              </TableCell>

              <TableCell align="center" className={classes.tableFont}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .map((val) => {
                return (
                  <TableRow>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className={classes.tableFont}
                    >
                      {val.id}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      {val.get_order.type}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      {val.company.name}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      {moment(val.created_at).format("ll")}
                    </TableCell>
                    <TableCell align="center" className={classes.tableFont}>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={"/print/" + val.id}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
