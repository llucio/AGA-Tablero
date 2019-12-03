import React from 'react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import locale from '@uppy/locales/lib/es_ES';
import DashboardModal from '@uppy/react/lib/DashboardModal';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

// .use(, {
//   trigger: '.UppyModalOpenerBtn',
//   inline: true,
//   target: '.DashboardContainer',
//   replaceTargetContent: true,
//   showProgressDetails: true,
//   note: 'Images and video only, 2–3 files, up to 1 MB',
//   height: 470,
//   metaFields: [
//     { id: 'name', name: 'Name', placeholder: 'file name' },
//     {
//       id: 'caption',
//       name: 'Caption',
//       placeholder: 'describe what the image is about'
//     }
//   ],
//   browserBackButtonClose: true
// });
// // .use(GoogleDrive, {
// //   target: Dashboard,
// //   companionUrl: 'https://companion.uppy.io'
// // })
// // .use(Dropbox, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
// // .use(Instagram, {
// //   target: Dashboard,
// //   companionUrl: 'https://companion.uppy.io'
// // })
// // .use(Facebook, {
// //   target: Dashboard,
// //   companionUrl: 'https://companion.uppy.io'
// // })
// // .use(Webcam, { target: Dashboard })
// // .use(Tus, { endpoint: 'https://master.tus.io/files/' });

class UploadButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: true,
      newValue: null
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.uppy = Uppy({
      debug: true,
      locale,
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: 1
        // minNumberOfFiles: 1
        // allowedFileTypes: ['image/*', 'video/*']
      }
    }).use(AwsS3, {
      limit: 1,
      companionUrl: 'https://aga-companion.apps.funcionpublica.gob.mx'
    });

    this.uppy.on('complete', result => {
      console.log('successful files:', result.successful);
      console.log('failed files:', result.failed);
    });
  }

  handleOpen() {
    this.setState({
      modalOpen: true
    });
  }

  handleClose() {
    this.setState({
      modalOpen: false
    });
  }

  render() {
    return (
      <div>
        {this.props.value && <img src={this.props.value} height={100} />}
        {this.state.newValue && <img src={this.state.newValue} />}
        <button onClick={this.handleOpen}>Cargar nuevo archivo</button>
        <DashboardModal
          uppy={this.uppy}
          closeModalOnClickOutside
          open={this.state.modalOpen}
          closeAfterFinish
          proudlyDisplayPoweredByUppy={false}
          onRequestClose={this.handleClose}
        />
      </div>
    );
  }
}

export default UploadButton;
