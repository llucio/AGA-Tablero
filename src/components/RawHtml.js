import { isString } from 'lodash';

/*
Renderea HTML si 'children' es un string
TODO: Sanitizar para evitar exponer a usuarios a araques XSS
*/

const RawHtml = ({ children, as: Component = 'div', ...props }) => {
  return isString(children) ? (
    console.log('aaamxi') || (
      <Component
        {...props}
        dangerouslySetInnerHTML={{
          __html: children
            .replace(/\n/g, '')
            .replace(/font-family:[^;]+;/g, ''),
        }}
      />
    )
  ) : (
    <Component>{children}</Component>
  );
};
export default RawHtml;
