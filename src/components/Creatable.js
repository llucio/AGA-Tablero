import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Creatable = ({ typename, parentKey, parentId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [execute] = useMutation(gql`
    mutation CreateMutation($titulo: String) {
      result: insert_${typename}(
        objects: { titulo: $titulo, ${parentKey}: "${parentId}" }
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
      variables: { titulo }
    })
      .then(() => refetch())
      .then(handleClose);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="light"
        size="small"
        color="secondary"
      >
        <AddIcon /> Añadir {typename}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Crear ${typename}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Input
              placeholder="Título"
              style={{ width: '400px' }}
              autoFocus
              onChange={event => setTitulo(event.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="danger">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Creatable;
