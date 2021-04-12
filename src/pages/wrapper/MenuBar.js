import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemIcon,
  Divider,
  Drawer,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EjectIcon from "@material-ui/icons/Eject";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import ShareIcon from "@material-ui/icons/Share";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import RestoreIcon from "@material-ui/icons/Restore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  orange: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    left: "30%",
  },

  AppHead: {
    fontFamily: "Montserrat",
  },
  float: {
    position: "fixed",
    bottom: 90,
    right: 20,
  },

  profileIco: {
    position: "absolute",
    right: 20,
  },
  listFont: {
    fontFamily: "Montserrat",
  },
  points: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 12,
  },
}));

const theme = createMuiTheme({
  Typography: {
    fontFamily: "Montserrat",
  },
});

export default function MenuBar() {
  const classes = useStyles();

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const anchor = "left";

  const [mycompany, setMyCompany] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const getStored = localStorage.getItem("mycompany");
    setMyCompany(JSON.parse(getStored));
    console.log(getStored);
    if (getStored === null) {
      setRedirect(true);
    }
  }, []);
  const changeCompany = () => {
    localStorage.clear();
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/mycompanies" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon onClick={toggleDrawer("left", true)} />
          </IconButton>

          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <div
              className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
              })}
              role="presentation"
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List className={classes.listFont}>
                <ListItem button key="home" component={Link} to="/"></ListItem>
                <ListItem button key="home" component={Link} to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={classes.listFont}>Home</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button key="add" component={Link} to="/addWorkOrder">
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={classes.listFont}>
                      Add Work Order
                    </Typography>
                  </ListItemText>
                </ListItem>

                <ListItem button key="bank" component={Link} to="/dcList">
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={classes.listFont}>
                      Delivery Challan List
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button key="add" component={Link} to="/addCompany">
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={classes.listFont}>
                      Add Company
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button key="add" component={Link} to="/products">
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={classes.listFont}>
                      Product List
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>

              <Divider />
            </div>
          </Drawer>
          <Typography variant="h6" className={classes.AppHead} color="inherit">
            {mycompany.name}
          </Typography>
          <div className={classes.profileIco}>
            <Button
              className={classes.points}
              color="inherit"
              onClick={changeCompany}
            >
              Change Company
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
