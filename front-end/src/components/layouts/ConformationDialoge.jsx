import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConformationDialog(props) {
    const { open, onClose, DialogTitleHeading, DialogDescription, onDelete } = props;


    const handleClose = () => {
        onClose(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{DialogTitleHeading}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {DialogDescription}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => {
                        handleClose();
                        onDelete();
                    }} color="primary" autoFocus>
                        Delete
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}