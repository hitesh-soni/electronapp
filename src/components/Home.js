import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";
import Cell from "./products/Cell";
import CreateForm from "./products/CreateForm";
import {
  defaultValue,
  ProductValidations,
} from "./products/productValidations";
import { deleteProduct } from "../actions/productsActions";
import { LoginAcion } from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": { margin: theme.spacing(1) },
    display: "inline-block",
    "vertical-align": "middle",
    "margin-right": "-4px",
    width: "50%",
    "text-align": "right",
  },
  title: {
    display: "inline-block",
    "vertical-align": "middle",
    "margin-right": "-4px",
    width: "50%",
  },
  container: { padding: theme.spacing(2) },
}));

const Products = ({ products, LoginAcion, deleteProduct }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [validations, setValidations] = useState(ProductValidations);
  const [showDialog, setShowDialog] = useState(false);
  const [productId, setProductId] = useState(0);

  const handleClickOpen = () => {
    setFormValue(defaultValue);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (value, index) => {
    setFormValue(Object.assign({}, value, { position: index }));
    setOpen(true);
  };

  const handleDelete = (id) => {
    setShowDialog(true);
    setProductId(id)
  }

  return (
    <div>
      <div>
        <div className={classes.title}>
          <h1>Home</h1>
        </div>
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add new Product
          </Button>
          <Button color="secondary" onClick={() => LoginAcion(false)}>
            Logout
          </Button>
        </div>
      </div>

      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Grid container spacing={5}>
            {products.map((value, index) => (
              <Cell
                key={index}
                value={value}
                index={index}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              ></Cell>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <CreateForm
        open={open}
        handleClose={handleClose}
        defaultValue={formValue}
        validations={validations}
      />

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this product?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This product will loose his data and you won&apos;t be able to see it again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              deleteProduct(productId);
              setShowDialog(false);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = ({ products }) => ({
  products: products.list,
});

export default connect(mapStateToProps, { deleteProduct, LoginAcion })(
  Products
);
