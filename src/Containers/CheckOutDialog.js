import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CheckOutDialog = props => {

  return (
    <>
      <Dialog
        open={props.handle}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>

          {props.children}

        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Yes
          </Button>
          <Button onClick={props.close} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CheckOutDialog;