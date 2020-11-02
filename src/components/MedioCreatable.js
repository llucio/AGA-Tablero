import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadButton from './UploadButton';

const AddActividadArchivos = ({ actividad, refetch }) => {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [archivo, setArchivo] = useState();
  const [executeAddArchivo] = useMutation(gql`
    mutation AddArchivo(
      $actividadId: uuid!
      $titulo: String!
      $archivos: jsonb
    ) {
      insert_medio_verificacion(
        objects: {
          actividad_id: $actividadId
          archivos: $archivos
          titulo: $titulo
        }
      ) {
        affected_rows
        returning {
          id
        }
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
    executeAddArchivo({
      variables: { actividadId: actividad.id, archivos: [archivo], titulo },
    })
      .then(() => refetch())
      .then(handleClose);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} size="small" color="secondary">
        <AddIcon /> Añadir Medio de verificación
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle>Añadir nuevo medio de verificación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Input
              placeholder="Descripción del archivo"
              style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}
              autoFocus
              label="Descripción"
              color="secondary"
              onChange={(event) => setTitulo(event.target.value)}
            />
            <UploadButton
              label="Seleccionar archivo(s)"
              restrictions={{
                maxNumberOfFiles: null,
              }}
              modal={false}
              handleChange={setArchivo}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            variant="contained"
            disabled={!archivo || !titulo.trim()}
            onClick={handleConfirm}
            color="primary"
          >
            Añadir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddActividadArchivos;
