import React from 'react';
import { isString } from 'lodash';

/*
Renderea HTML si 'children' es un string
TODO: Sanitizar para evitar exponer a usuarios a araques XSS
*/

const RawHtml = ({ children, as = 'div', ...props }) => {
  return isString(children) ? (
    <as
      {...props}
      dangerouslySetInnerHTML={{
        __html: children.replace(/\n/g, '<br />')
      }}
    />
  ) : (
    <div>
      {children}
    </div>
  );
};
export default RawHtml;
