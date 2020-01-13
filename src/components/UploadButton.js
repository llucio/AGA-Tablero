import React, { memo, useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import Webcam from '@uppy/webcam';
import Url from '@uppy/url';
import Spanish from '@uppy/locales/lib/es_ES';
import DashboardModal from '@uppy/react/lib/DashboardModal';
import Dashboard from '@uppy/react/lib/Dashboard';
import uuidv4 from 'uuid/v4';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/webcam/dist/style.css';
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
    // ...restrictions
  },
  locale,
  onBeforeFileAdded: file => ({
    ...file,
    name: uuidv4()
  })
})
  .use(AwsS3, { companionUrl })
  .use(Url, { companionUrl })
  .use(Webcam, { title: 'Cámara' });

const UploadButton = ({
  value,
  handleChange,
  label = 'Cambiar archivo',
  modal = true,
  restrictions = {}
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
  }, [value, open, handleChange]);

  return (
    <div>
      {!!value &&
        modal(
          <Box>
            <Button variant="contained" onClick={() => setOpen(true)}>
              {label}
            </Button>
          </Box>
        )}
      {modal ? (
        <DashboardModal
          uppy={uppy}
          open={open}
          onRequestClose={() => {
            handleChange(value || '');
            setOpen(false);
          }}
          plugins={['Url']}
          closeModalOnClickOutside
          proudlyDisplayPoweredByUppy={false}
        />
      ) : (
        <Dashboard
          uppy={uppy}
          // onRequestClose={() => {
          //   handleChange(value || '');
          //   setOpen(false);
          // }}
          height="300"
          inline={true}
          plugins={['Url']}
          proudlyDisplayPoweredByUppy={false}
        />
      )}
    </div>
  );
};
export default UploadButton;
