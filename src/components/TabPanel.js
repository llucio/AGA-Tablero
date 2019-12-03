import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const TabPanel = ({ children, value, index, ...rest }) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-force-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...rest}
  >
    <Box p={3} fontSize={17}>
      {children}
    </Box>
  </Typography>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default TabPanel;
