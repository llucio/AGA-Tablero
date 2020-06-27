import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Deletable = ({ item, typename, refetch }) => {
  const [open, setOpen] = useState(false);
  const [execute] = useMutation(gql`
    mutation DeleteField($id: uuid!) {
      result: update_${typename}(
        _set: { fecha_eliminacion: true }
        where: { id: { _eq: $id } }
      ) {
        affected_rows
      }
    }
  `);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    execute({
      variables: { id: item.id },
    }).then(() => refetch());
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        size="small"
        variant="danger"
        className="mt-4"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Seguro que deseas eliminar el siguiente elemento?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>{item.titulo}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="danger" autoFocus>
            Sí, eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Deletable;
