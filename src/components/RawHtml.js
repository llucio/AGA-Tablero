import React from 'react';
import { isString } from 'lodash';

/*
Renderea HTML si 'children' es un string
TODO: Sanitizar para evitar exponer a usuarios a araques XSS
*/

const RawHtml = ({ children, as: Component = 'div', ...props }) => {
  return isString(children) ? (
    <Component
      {...props}
      dangerouslySetInnerHTML={{
        __html: children.replace(/\n/g, '<br />')
      }}
    />
  ) : (
    <Component>{children}</Component>
  );
};
export default RawHtml;
