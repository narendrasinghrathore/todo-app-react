import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import DialogContent from '@material-ui/core/DialogContent';
import './Dialog.css';
import { IDialogProps } from '../../../interfaces/Dialog';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  dialog: {
    width: 'xl'
  }
});
export function SimpleDialog(props: IDialogProps | any) {
  const classes = useStyles();

  const { onClose, selectedValue, open } = props;

  let [fullWidth] = useState(true);
  let [width] = useState<DialogProps['maxWidth']>('xl');

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      maxWidth={width}
      aria-labelledby={props.ariaLabel}
      open={open}
      fullWidth={fullWidth}
    >
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <DialogContent className={classes.root}>{props.children}</DialogContent>
    </Dialog>
  );
}
