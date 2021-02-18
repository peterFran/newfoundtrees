import React, { ReactFragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface ProgressButtonProps {
    loading: boolean,
    disabled: boolean,
    children: ReactFragment,
    className: string,
    fullWidth: boolean,
    variant: "contained",
    color : "primary" | "secondary"
    onClick?: () => void
}

const ProgressButton = ({ loading, disabled, children, className, fullWidth, variant, color, onClick }: ProgressButtonProps) => {
  const classes = useStyles();

  return (
    <Button disabled={loading || disabled} {...{className, fullWidth, variant, color, onClick}}>
      {children}
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </Button>
  );
};

export default ProgressButton;
