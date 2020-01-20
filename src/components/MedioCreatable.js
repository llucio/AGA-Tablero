import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadButton from './UploadButton';

const Creatable = ({ typename, parentKey, parentId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [execute] = useMutation(gql`
    mutation CreateMutation($titulo: String, $archivos: jsonb) {
      result: insert_${typename}(
        objects: { titulo: $titulo, archivos: $archivos, ${parentKey}: "${parentId}" }
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
      variables: { titulo, archivos: [archivos] }
    })
      .then(() => refetch())
      .then(handleClose);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} size="small" color="secondary">
        <AddIcon /> Añadir {typename}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">{`Añadir nuevo medio de verificación`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Input
              placeholder="Título"
              style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}
              autoFocus
              label="Título"
              color="secondary"
              onChange={event => setTitulo(event.target.value)}
            />
            <UploadButton
              label="Seleccionar archivo(s)"
              restrictions={{
                maxNumberOfFiles: null
              }}
              modal={false}
              handleChange={setArchivos}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            disabled={!archivos.length || !titulo.trim()}
            onClick={handleConfirm}
            color="danger"
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Creatable;
