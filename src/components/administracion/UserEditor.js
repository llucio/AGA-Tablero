import React from 'react';
import gql from 'graphql-tag';
// import { useQuery, useMutation } from '@apollo/react-hooks';
import { apolloClient } from '../../apollo';
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from 'react-crud-table';
import './UserEditor.css';

const QUERY = gql`
  query AdministracionQuery {
    usuarios: usuario {
      email
      nombre
      metadatos
    }
  }
`;

const INSERT_USUARIO = gql`
  mutation InsertUsuario($email: String!, $nombre: String!) {
    affected_rows
  }
`;

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [
  {
    id: 1,
    title: 'Create an example',
    description: 'Create an example of how to use the component'
  },
  {
    id: 2,
    title: 'Improve',
    description: 'Improve the component!'
  }
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter =
      data.direction === 'ascending'
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === 'ascending'
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
const service = {
  fetchItems: payload => {
    return apolloClient
      .query({
        query: QUERY
      })
      .then(({ data }) => {
        console.log(data);
        return data.usuarios;
      });
    // let result = Array.from(tasks);
    // result = result.sort(getSorter(payload.sort));
    // return Promise.resolve(result);
  },
  create: task => {
    return apolloClient.mutate({
      mutation: INSERT_USUARIO
    });
  },
  update: data => {
    const task = tasks.find(t => t.id === data.id);
    task.title = data.title;
    task.description = data.description;
    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.id === data.id);
    tasks = tasks.filter(t => t.id !== task.id);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' }
};

const UserEditor = () => {
  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Tasks"
        fetchItems={payload => service.fetchItems(payload)}
      >
        <Fields>
          <Field name="email" label="email" />
          <Field name="nombre" label="Nombre" placeholder="Nombre" />
          {/* <Field
            name="description"
            label="Description"
            render={DescriptionRenderer}
          /> */}
        </Fields>
        <CreateForm
          title="Crear usuario"
          message="Crear un nuevo usuario"
          trigger="Crear usuario"
          onSubmit={task => service.create(task)}
          submitText="Create"
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Ingresa un correo electrónico válido';
            }

            if (!values.nombre) {
              errors.nombre = 'Ingresa un nombre';
            }

            return errors;
          }}
        />

        <UpdateForm
          title="Task Update Process"
          message="Update task"
          trigger="Update"
          onSubmit={task => service.update(task)}
          submitText="Update"
          validate={values => {
            const errors = {};

            if (!values.id) {
              errors.id = 'Please, provide id';
            }

            if (!values.title) {
              errors.title = "Please, provide task's title";
            }

            if (!values.description) {
              errors.description = "Please, provide task's description";
            }

            return errors;
          }}
        />

        <DeleteForm
          title="Task Delete Process"
          message="Are you sure you want to delete the task?"
          trigger="Delete"
          onSubmit={task => service.delete(task)}
          submitText="Delete"
          validate={values => {
            const errors = {};
            if (!values.id) {
              errors.id = 'Please, provide id';
            }
            return errors;
          }}
        />
      </CRUDTable>
    </div>
  );
};
export default UserEditor;
