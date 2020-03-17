import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import Spanish from '@uppy/locales/lib/es_ES';
import DashboardModal from '@uppy/react/lib/DashboardModal';
import Dashboard from '@uppy/react/lib/Dashboard';
import uuidv4 from 'uuid/v4';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/url/dist/style.css';

const companionUrl =
  process.env.REACT_APP_COMPANION_URL ||
  'https://aga-companion.apps.funcionpublica.gob.mx';

const locale = {
  ...Spanish,
  strings: {
    ...Spanish.strings,
    dropPasteImport: 'Arrastra o pega archivo aquí, %{browse} o importa desde:',
    browse: 'selecciona archivo',
    myDevice: 'Subir archivo',
    done: 'Hecho',
    failedToFetch:
      'No se ha podido descargar archivo. Verifica que la URL sea correcta'
  }
};

const uppy = Uppy({
  debug: false,
  autoProceed: true,
  restrictions: {
    maxFileSize: null,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: null
  },
  locale,
  onBeforeFileAdded: file => ({
    ...file,
    name: uuidv4()
  })
}).use(AwsS3, { companionUrl });

const UploadButton = ({
  value,
  handleChange,
  label = 'Cambiar archivo',
  modal = true
}) => {
  const [open, setOpen] = useState(!value);

  useEffect(() => {
    const onComplete = result => {
      const [file] = result.successful;
      if (file) {
        handleChange(file.uploadURL);
      }
      setOpen(false);
    };

    uppy.reset();

    uppy.on('complete', onComplete);

    return () => {
      uppy.off('complete', onComplete);
    };
  }, [handleChange]);

  return (
    <div>
      {!!value && modal && (
        <Box>
          <Button
            className="openmodal,"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            {label}
          </Button>
        </Box>
      )}
      {modal ? (
        <DashboardModal
          uppy={uppy}
          open={open}
          trigger=".openmodal"
          target="body"
          onRequestClose={() => {
            handleChange(value || '');
            setOpen(false);
          }}
          closeModalOnClickOutside
          proudlyDisplayPoweredByUppy={false}
        />
      ) : (
        <Dashboard
          uppy={uppy}
          height="200"
          inline={true}
          proudlyDisplayPoweredByUppy={false}
        />
      )}
    </div>
  );
};
export default UploadButton;
