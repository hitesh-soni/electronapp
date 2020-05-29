import React from "react";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { Formik } from "formik";
import { saveProduct, editProduct } from "../../actions/productsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const CreateForm = ({
  open,
  handleClose,
  validations,
  defaultValue,
  saveProduct,
  editProduct,
}) => {
  const classes = useStyles();

const handleImageChange = (e,setFieldValue) => {
    var files = e.target.files ? e.target.files : [];
    if (!files.length || !window.FileReader) return;
    if (/^image/.test(files[0].type)) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = function () {
            setFieldValue('image',this.result)
        }
     }
}


  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validations}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        if (!values.position && values.position !== 0 )
          saveProduct({
            title: values.title,
            description: values.description,
            image: values.image
          }).then(() => {
            resetForm();
            handleClose();
          });
        else
          editProduct(
            { title: values.title, description: values.description , image: values.image},
            values.position
          ).then(() => {
            resetForm();
            handleClose();
          });
      }}
      initialValues={defaultValue}
    >
      {({
        handleSubmit,
        handleChange,
        values,     
        errors,    
        setFieldValue   
      }) => (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"> Product</DialogTitle>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <DialogContent className={classes.root}>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>

              <TextField
                margin="dense"
                id="name"
                name="posision"
                style={{ display: "none" }}
                value={values.posision}
                onChange={handleChange}
                label="posision"
                type="text"
                variant="outlined"
                helperText={errors.posision}
                fullWidth
              />

            <input          
                id="image"
                name="image"     
                className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"          
                onChange={(e)=>handleImageChange(e,setFieldValue)}
                type="file"  
                accept="image/*"  
                fullWidth
              />

              <TextField
                error={!!errors.description}
                margin="dense"
                id="name"
                name="title"
                value={values.title}
                onChange={handleChange}
                label="title"
                type="text"
                variant="outlined"
                helperText={errors.title}
                fullWidth
              />

              <TextField
                error={!!errors.description}
                id="outlined-multiline-static"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                helperText={errors.description}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </Formik>
  );
};

export default connect("", { saveProduct, editProduct })(CreateForm);
