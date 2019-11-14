import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { useRoles } from '../hooks';
import ColorHash from 'color-hash';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');


const colorHash = new ColorHash();

const useStyles = makeStyles(theme => ({
  adminWrapper: {
    border: `1px solid`,
    padding: '1em',
    margin: '3px'
  },
  root: {
    margin: '0 0 2em 0',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  editLabel: {
    color: '#333333'
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
  autoClose = true,
  adminOnly = false,
  children,
  type
}) => {
  const [open, setOpen] = useState(false);
  const { usuario: { administrador } = {} } = useRoles();
  const [value, setValue] = useState();
  const [field, subField] = path.split('.');
  const {
    data: { queryResult } = {},
    loading: queryLoading,
    error: queryError
  } = useQuery(getQuery({ typename, field, subField }), {
    variables: { id },
    skip: open && !administrador
  });
  const classes = useStyles();

  const [executeMutation, { data: mutationData }] = useMutation(
    getMutation({ typename, field, subField, valueType })
  );

  const handleSubmit = event => {
    event.stopPropagation();
    executeMutation({
      variables: {
        id,
        value: subField ? { [subField]: value } : value
      }
    }).then(() => {
      onUpdate && onUpdate({ id, value });
      autoClose && setOpen(false);
      setValue(value);
    });
  };

  const handleChange = value => {
    setValue(value);
  };

  const handleToggle = event => {
    event.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    if (queryResult) {
      setValue(_.get(queryResult, path, ''));
    }
  }, [queryResult, path]);

  if (!administrador) {
    return !adminOnly && <div>{children}</div>;
  }

  return (
    <div
      style={administrador ? { borderColor: colorHash.hex(typename) } : {}}
      className={administrador ? classes.adminWrapper : ''}
    >
      {children || value}
      <div className={classes.root}>
        <IconButton
          onClick={handleToggle}
          color={open ? 'secondary' : 'primary'}
          className={classes.iconButton}
        >
          {open ? <CloseIcon /> : <EditIcon />}
        </IconButton>
        <span className={classes.editLabel}>{subField || field}</span>
        {open && (
          <>
            {!!type ? (
              <Input
                type={type}
                value={type === 'date' ? value && moment(value).utc().format(moment.HTML5_FMT.DATE) : value}
                autoFocus
                label={subField || field}
                placeholder={subField || field}
                onChange={({ target: { value } = {} }) => handleChange(value)}
              />
            ) : (
              <TextareaAutosize
                value={value}
                autoFocus
                aria-label="minimum height"
                rows={1}
                label={subField || field}
                placeholder={subField || field}
                onChange={({ target: { value } = {} }) => handleChange(value)}
              />
            )}
            <IconButton onClick={handleSubmit} className={classes.iconButton}>
              <SaveIcon />
            </IconButton>
          </>
        )}
      </div>
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
  field: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  metadatos: PropTypes.object,
  valueType: PropTypes.string,
  onUpdate: PropTypes.func,
  adminOnly: PropTypes.bool,
  autoClose: PropTypes.bool,
  object: PropTypes.shape({
    __typename: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired
  })
};

export default Editable;
