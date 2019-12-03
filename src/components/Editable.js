import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import ColorHash from 'color-hash';
import { useRoles } from '../hooks';
import HtmlEditor from './HtmlEditor';
import moment from '../utils/moment';
import DataDisplay from './DataDisplay';

const colorHash = new ColorHash();

const useStyles = makeStyles(theme => ({
  adminWrapper: {
    border: `1px dashed`,
    marginLef: '2em',
    width: '100%'
    // margin: '3px'
  },
  root: {
    // margin: '0 0 2em 0',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '100%'
  },
  editLabel: {
    color: '#333333'
  },
  iconButton: {
    padding: '2px'
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const Editable = ({
  item: { __typename: typename, id } = {},
  path,
  valueType = 'String',
  onUpdate,
  autoClose = true,
  adminOnly = false,
  children,
  html = false,
  type
}) => {
  const [open, setOpen] = useState(false);
  const { usuario: { administrador } = {} } = useRoles();
  const [value, setValue] = useState();
  const [field, subField] = path.split('.');
  const { data: { queryResult } = {}, refetch } = useQuery(
    getQuery({ typename, field, subField }),
    {
      variables: { id },
      skip: !id || (open && !administrador)
      // fetchPolicy: 'network-only'
    }
  );
  const classes = useStyles();

  const [executeMutation] = useMutation(
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
      onUpdate && onUpdate();
      autoClose && setOpen(false);
      setValue(value);
      _.isFunction(refetch) &&
        refetch()
          .then(() => {
            // console.log('ais')
          })
          .catch(() => console.error('error'));
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
  }, [queryResult, path, open]);

  if (!administrador) {
    return !adminOnly && <span>{children}</span>;
  }

  return (
    <div
      style={administrador ? { borderColor: colorHash.hex(typename) } : {}}
      className={administrador ? classes.adminWrapper : ''}
      onClick={event => event.stopPropagation()}
    >
      {!open && (children || value)}
      <div className={classes.root}>
        <IconButton
        fontSize="small"
          onClick={handleToggle}
          color={open ? 'secondary' : 'primary'}
          className={classes.iconButton}
        >
          {open ? <CloseIcon /> : <EditIcon />}
        </IconButton>
        {!open && <span className={classes.editLabel}><small>{subField || field}</small></span>}
        {open && (
          <Fragment>
            {!!type ? (
              <Input
                type={type}
                value={
                  type === 'date'
                    ? value &&
                      moment(value)
                        .utc()
                        .format(moment.HTML5_FMT.DATE)
                    : value
                }
                autoFocus
                label={subField || field}
                placeholder={subField || field}
                onChange={({ target: { value } = {} }) => handleChange(value)}
              />
            ) : html ? (
              <HtmlEditor
                value={value}
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
            <IconButton  onClick={handleSubmit} className={classes.iconButton}>
              <SaveIcon />
            </IconButton>
          </Fragment>
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
  item: PropTypes.shape({
    __typename: PropTypes.string,
    id: PropTypes.any
  })
};

export default Editable;
