import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function CompromisoComboBox({label}) {
  
  const options = [`${label} 1`, `${label} 2`, `${label} 3`, `${label} 4`];

  return (
    <Autocomplete
      id="custom-input-demo"
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <input style={{ marginLeft: 20 , width: 320 }} type="text" {...params.inputProps}  placeholder= {` Seleccione ${label}`} />
        </div>
      )}
    />
  );
}
