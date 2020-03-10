import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import esMessages from '@atlaskit/editor-core/dist/cjs/i18n/es';
import * as es from 'react-intl/locale-data/es';

addLocaleData(es);

const IntlProviderWrapper = ({ children, ...props }) => {
  return (
    <IntlProvider locale="es" messages={esMessages} {...props}>
      {children}
    </IntlProvider>
  );
};

export default IntlProviderWrapper;
