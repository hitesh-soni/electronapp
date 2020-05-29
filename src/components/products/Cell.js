import React from "react";
import { Grid, Paper, makeStyles, Button } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: theme.spacing(45),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Cell({ value, index,handleEdit,handleDelete }) {
  const classes = useStyles();

  return (
    <Grid key={index} item className={classes.root}>
      <Paper elevation={3}>
        <div className="cardboxParent">
          <div
            className="cardboxBg"
            style={{
              backgroundImage:
                `url(${value.image})`,
              backgroundPosition: "cover",
              height: "200px",
            }}
          ></div>
          <div className="cardboxContent">
            <div className="cardTitle">
          <h3>{value.title}</h3>
            </div>
            <div className="cardContent">
              <p>
              {value.description}
              </p>
            </div>

            <div>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={()=>handleEdit(value,index)}
                >
                  Edit
              </Button>
              <Button
              size="small"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={()=>handleDelete(index)}
>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default Cell;
