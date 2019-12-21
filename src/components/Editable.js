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
// import ClearIcon from '@material-ui/icons/Delete';
import ColorHash from 'color-hash';
import { useAuth } from '../hooks';
import HtmlEditor from './HtmlEditor';
import UploadButton from './UploadButton';
import moment from '../utils/moment';

const colorHash = new ColorHash();

const useStyles = makeStyles(theme => ({
  adminWrapper: {
    border: `1px dashed`,
    width: '100%',
    margin: '6px 0',
    padding: '3px'
    // margin: '3px'
  },
  root: {
    // margin: '0 0 2em 0',
    display: 'flex',
    fontFamily: '"Montserrat", sans-serif !important',
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
  upload = false,
  label,
  uploadType = 'image',
  type
}) => {
  const [open, setOpen] = useState(false);
  const { usuario: { administrador } = {} } = useAuth();
  const [value, setValue] = useState();
  const [field, subField] = path.split('.');
  const { data: { queryResult } = {}, refetch } = useQuery(
    getQuery({ typename, field, subField }),
    {
      variables: { id },
      skip: !id || (open && !administrador),
      fetchPolicy: 'cache-and-network'
    }
  );
  const classes = useStyles();

  const [executeMutation] = useMutation(
    getMutation({ typename, field, subField, valueType })
  );

  const handleSubmit = (event, val) => {
    if (event) event.stopPropagation();
    const finalValue = val || value;
    executeMutation({
      variables: {
        id,
        value: subField ? { [subField]: finalValue } : finalValue
      }
    }).then(() => {
      onUpdate && onUpdate();
      autoClose && setOpen(false);
      setValue(finalValue);
      _.isFunction(refetch) && refetch().catch(() => console.error('error'));
    });
  };

  const handleChange = value => {
    setValue(value);
  };

  // const handleClear = () => {
  //   handleSubmit(null, '');
  // };

  const handleToggle = event => {
    event.stopPropagation();
    setOpen(!open);
  };

  useEffect(
    () => {
      if (queryResult) {
        setValue(_.get(queryResult, path, ''));
      }
    },
    [queryResult, path, open]
  );

  if (!administrador) {
    return (
      !adminOnly &&
      !!value &&
      <span>
        {children}
      </span>
    );
  }

  return (
    <div
      style={administrador ? { borderColor: colorHash.hex(typename) } : {}}
      className={administrador ? classes.adminWrapper : ''}
      onClick={event => event.stopPropagation()}
    >
      {!open && !!value && (children || value)}
      <div className={classes.root}>
        <IconButton
          fontSize="small"
          onClick={handleToggle}
          color={open ? 'secondary' : 'primary'}
          className={classes.iconButton}
        >
          {open ? <CloseIcon /> : <EditIcon />}
        </IconButton>
        {!open &&
          <span className={classes.editLabel}>
            <small>
              {label || subField || field}
            </small>
          </span>}
        {open &&
          <Fragment>
            {!!type
              ? <Input
                  type={type}
                  value={
                    type === 'date'
                      ? value && moment(value).utc().format(moment.HTML5_FMT.DATE)
                      : value
                  }
                  autoFocus
                  label={label || subField || field}
                  placeholder={label || subField || field}
                  onChange={({ target: { value } = {} }) => handleChange(value)}
                />
              : html
                ? <HtmlEditor
                    value={value}
                    onChange={({ target: { value } = {} }) => handleChange(value)}
                  />
                : upload
                  ? <div>
                      {value &&
                        (uploadType === 'image'
                          ? <img src={value} height={100} alt="imagen" />
                          : <p>
                              Archivo actual:
                              <br />
                              <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                {value}
                              </a>
                            </p>)}
                      <UploadButton
                        value={value}
                        handleChange={value => {
                          setValue(value);
                          handleSubmit(null, value);
                        }}
                      />
                    </div>
                  : <TextareaAutosize
                      value={value}
                      autoFocus
                      aria-label="minimum height"
                      rows={1}
                      label={label || subField || field}
                      placeholder={label || subField || field}
                      onChange={({ target: { value } = {} }) => handleChange(value)}
                    />}
            <IconButton onClick={handleSubmit} className={classes.iconButton}>
              <SaveIcon color="success" />
            </IconButton>
            {/*<IconButton onClick={handleClear} className={classes.iconButton}>
              <ClearIcon />
            </IconButton>*/}
          </Fragment>}
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
  field: PropTypes.oneOf([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
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
