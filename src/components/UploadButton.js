import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import Webcam from '@uppy/webcam';
import Url from '@uppy/url';
import Spanish from '@uppy/locales/lib/es_ES';
import DashboardModal from '@uppy/react/lib/DashboardModal';
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

const UploadButton = ({ value, handleChange }) => {
  const [open, setOpen] = useState(!value);
  const [newValue, setNewValue] = useState(null);

  const displayValue = value;
  console.log('saa', displayValue);

  useEffect(() => {
    const onComplete = result => {
      const [file] = result.successful;
      if (file) {
        setNewValue(file.uploadURL);
        handleChange(file.uploadURL);
      }
      setOpen(false);
      uppy.reset();
    };

    uppy.on('complete', onComplete);

    return () => {
      uppy.off('complete', onComplete);
    };
  }, [value]);

  return (
    <div>
      {!!value && (
        <div>
          <button onClick={() => setOpen(true)}>Cambiar archivo</button>
        </div>
      )}
      <DashboardModal
        uppy={uppy}
        open={open}
        onRequestClose={() => setOpen(false)}
        plugins={['Url']}
        closeModalOnClickOutside
        proudlyDisplayPoweredByUppy={false}
      />
    </div>
  );
};

export default UploadButton;
