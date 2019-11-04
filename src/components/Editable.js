import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useRoles } from '../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0.5em 0 2em 0',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const Editable = ({
  object: { __typename: typename, id } = {},
  path,
  valueType = 'String',
  onUpdate,
  children
}) => {
  const classes = useStyles();
  const { usuario: { administrador } = {} } = useRoles();
  const [value, setValue] = useState();
  const [field, subField] = path.split('.');
  const {
    data: { queryResult } = {},
    loading: queryLoading,
    error: queryError
  } = useQuery(getQuery({ typename, field, subField }), {
    variables: { id },
    skip: !administrador
  });

  const [executeMutation, { data: mutationData }] = useMutation(
    getMutation({ typename, field, subField, valueType })
  );

  const handleSubmit = () => {
    executeMutation({
      variables: {
        id,
        value: subField ? { [subField]: value } : value
      }
    }).then(() => {
      if (onUpdate) {
        onUpdate({ id, value });
      }
    });
  };

  const handleChange = value => {
    setValue(value);
  };

  useEffect(() => {
    if (queryResult) {
      setValue(_.get(queryResult, path, ''));
    }
  }, [queryResult, path]);

  if (!administrador) return <div>{children}</div>;

  return (
    <div>
      {children}
      <Paper className={classes.root}>
       <EditIcon />
        <TextareaAutosize
          value={value}
          aria-label="minimum height"
          rows={1}
          fullWidth
          label={subField || field}
          placeholder={subField || field}
          onChange={({ target: { value } = {} }) => handleChange(value)}
        />
        <IconButton onClick={handleSubmit} className={classes.iconButton}>
          <SaveIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        {/* <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}
      </Paper>
    </div>
  );
};

const getQuery = ({ typename, field, subField }) => {
  return gql`
    query QueryField($id: uuid!) {
      queryResult: ${typename}_by_pk(
        id: $id
      ) {
        ${field}
      }
    }
  `;
};

const getMutation = ({ typename, field, subField, valueType = 'String' }) => {
  return gql`
    mutation MutateField($id: uuid!, $value: ${subField ? 'jsonb' : valueType}) {
      mutationResult: update_${typename}(
        where: {
          id: { _eq: $id }
        }

        ${subField ? '_append' : '_set'}: {
          ${field}: $value
        }
      ) {
        affected_rows
      }
    }
  `;
};

Editable.propTypes = {
  field: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  metadatos: PropTypes.object,
  valueType: PropTypes.string,
  onUpdate: PropTypes.func,
  object: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired
  })
};

export default Editable;
