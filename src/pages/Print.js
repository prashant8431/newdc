import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuBar from "./wrapper/MenuBar";
import {
  Toolbar,
  Typography,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";

import { Link, useParams } from "react-router-dom";
import ReactToPrint, {
  PrintContextConsumer,
  useReactToPrint,
} from "react-to-print";
import * as moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: "#fafafa",
  },
  title: {
    // fontFamily: "Montserrat",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",

    color: "#21212b",
    // fontWeight: "bold",
    fontSize: "25px",
  },
  address: {
    fontSize: "15px",
    fontFamily: "Montserrat",
    // marginLeft: "20%",
    color: "#000",
  },
  subHead: {
    // backgroundColor: "#fafafa",
    marginTop: "10px",
  },
  form: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
  },
  field: {
    // margin: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  grid: {
    marginTop: "10",
    fontFamily: "Montserrat",
    backgroundColor: "#fff",
  },

  detailHeader: {
    fontFamily: "Montserrat",

    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sign: {
    fontFamily: "Montserrat",
    textAlign: "center",
    marginLeft: "50%",
    marginRight: "auto",
    marginTop: "10%",
  },
  contact_no: {
    fontFamily: "Montserrat",
    fontSize: "10px",
  },
  dc_no: {
    fontFamily: "Montserrat",
    fontSize: "13px",
    marginLeft: "25px",
  },
  date: {
    fontFamily: "Montserrat",
    fontSize: "13px",
    marginRight: "25px",
  },
  to: {
    fontFamily: "Montserrat",
    marginLeft: "25px",
    // backgroundColor: "#fff",
  },
  toName: {
    fontFamily: "Montserrat",
    textDecorationLine: "underline",
    marginLeft: "30px",
    fontSize: "15px",
    // textAlign: "center",
  },
  firm: {
    fontFamily: "Montserrat",
    fontSize: "18px",
    marginTop: "10px",
    marginRight: "40px",
  },
}));

const PrintContent = React.forwardRef((props, ref) => {
  let { id } = useParams();

  const classes = useStyles();

  //array part and qty

  const [company, setCompany] = useState([]);
  const [order, setOrder] = useState([]);
  const [details, setDetails] = useState([]);

  const [partArr, setPartArr] = useState([]);

  const [mycompany, setMyCompany] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(async () => {
    const getData = await axios.get("/dchallan/" + id);
    setDetails(getData.data);
    setCompany(getData.data.company);
    setOrder(getData.data.get_order);
    setPartArr(JSON.parse(getData.data.item_list));

    //stored
    const getStored = localStorage.getItem("mycompany");
    setMyCompany(JSON.parse(getStored));

    console.log(mycompany);
  }, []);

  return (
    <div className={classes.root} ref={ref}>
      <Toolbar className={classes.subHead}>
        <Typography className={classes.contact_no}>
          GSTIN : {mycompany.gstin}
        </Typography>
        <Typography variant="h2" className={classes.title}>
          {mycompany.name}
          <div className={classes.address}>
            {mycompany.address}
            <br />
          </div>
        </Typography>
        <Typography className={classes.contact_no}>
          Contact: {mycompany.contact_no}
        </Typography>
      </Toolbar>
      {/* <Divider /> */}
      <Grid container>
        <Grid item xs={6} border={1}>
          <Typography className={classes.dc_no}>
            D.C. No.:{details.id}
          </Typography>
        </Grid>
        <Grid item xs={6} border={1}>
          <Typography align="right" className={classes.date}>
            Date : {moment(details.created_at).format("ll")}
            {/* {details.created_at} */}
          </Typography>
        </Grid>
      </Grid>
      <br />
      {/* <Divider /> */}

      <div className={classes.to}>
        To,
        <Typography className={classes.toName}>
          {company.name}, {company.address}, Contact No: {company.contact_no},
          GSTIN:
          {company.GSTIN}
        </Typography>
      </div>
      <br />
      <Grid container>
        <Grid item xs={6} border={1}>
          <Typography className={classes.dc_no}>
            Order No.:{details.id}
          </Typography>
        </Grid>
        <Grid item xs={6} border={1}>
          <Typography align="right" className={classes.date}>
            Order Date : {moment(order.created_at).format("ll")}
          </Typography>
        </Grid>
      </Grid>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  borderLeft: "1px solid #f1f1f1",
                }}
                className={classes.tableFont}
              >
                Sl No
              </TableCell>
              <TableCell
                style={{
                  borderLeft: "1px solid #f1f1f1",
                }}
                align="center"
                className={classes.tableFont}
              >
                Part Name
              </TableCell>

              <TableCell
                style={{
                  borderLeft: "1px solid #f1f1f1",
                }}
                align="center"
                className={classes.tableFont}
              >
                Quantity
              </TableCell>
              <TableCell
                style={{
                  borderLeft: "1px solid #f1f1f1",
                }}
                align="center"
                className={classes.tableFont}
              >
                Remarks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partArr.map((val, i) => {
              return (
                <TableRow>
                  <TableCell
                    style={{
                      borderBottom: "none",
                    }}
                    align="center"
                    className={classes.tableFont}
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    className={classes.tableFont}
                    style={{
                      borderBottom: "none",
                      borderLeft: "1px solid #f1f1f1",
                    }}
                  >
                    {val.name}
                    <br />
                    <div
                      style={{
                        marginLeft: "20px",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {val.descri}
                    </div>
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "none",
                      borderLeft: "1px solid #f1f1f1",
                    }}
                    align="center"
                    className={classes.tableFont}
                  >
                    {val.qty}
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "none",
                      borderLeft: "1px solid #f1f1f1",
                    }}
                    align="center"
                    className={classes.tableFont}
                  >
                    {val.remarks}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} border={1}>
          <Typography className={classes.dc_no}>
            Received the above mentioned goods in goods condition.
          </Typography>
        </Grid>
        <Grid item xs={6} border={1}>
          <Typography align="right" className={classes.firm}>
            For Sagar EnterPrises
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Typography className={classes.dc_no}>Receiver's Signature</Typography>
      <div style={{ display: "flex" }}></div>
    </div>
  );
});

export const Print = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <MenuBar />
      <PrintContent ref={componentRef} />
      <Button
        onClick={handlePrint}
        variant="contained"
        color="primary"
        type="submit"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Print this out!
      </Button>
    </div>
  );
};
