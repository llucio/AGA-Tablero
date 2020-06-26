import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import arrayMove from 'array-move';
import Box from '@material-ui/core/Box';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useAuth } from '../hooks';
import Deletable from './Deletable';
import Creatable from './Creatable';
import TextField from '@material-ui/core/TextField';

const SortableList = ({
  items,
  campoFilter,
  refetch,
  creatable,
  parentId,
  typename,
  deletable = false,
  containerComponent: ContainerComponent = Box,
  containerProps = {},
  itemComponent: ItemComponent,
  itemProps = {},
  ...sortableProps
}) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { administrador } = useAuth();
  const [mutateOrden] = useMutation(
    gql`
    mutation setOrden($id: uuid!, $orden: Int!) {
      update_${typename}(where: { id: { _eq: $id } }, _set: { orden: $orden }) {
        affected_rows
      }
    }
  `
  );

  let filteredData = items;
  if (campoFilter) {
    filteredData = items.filter((data) => {
      return (
        data.metadatos[campoFilter]
          .toLowerCase()
          .indexOf(search.toLowerCase()) !== -1
      );
    });
  }

  const onSort = ({ oldIndex, newIndex }) => {
    setLoading(true);
    Promise.all(
      arrayMove(filteredData, oldIndex, newIndex).map(
        ({ id, orden }, index) => {
          if (orden === index) {
            return Promise.resolve();
          }
          return mutateOrden({
            awaitRefetchQueries: true,
            variables: { id, orden: index },
          });
        }
      )
    )
      .then(() => {
        refetch().then(() => setLoading(false));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading || !items) {
    return null;
  }

  const SortableItem = SortableElement(
    ({ value }) =>
      (administrador && deletable && (
        <span>
          <Deletable item={value} typename={typename} refetch={refetch} />
          <ItemComponent item={value} refetch={refetch} {...itemProps} />
        </span>
      )) || <ItemComponent item={value} refetch={refetch} {...itemProps} />
  );

  const Container = SortableContainer(({ items }) => {
    return (
      <ContainerComponent {...containerProps}>
        {filteredData.map((value, index) => (
          <SortableItem
            key={`${typename}-${value.id}`}
            index={index}
            value={value}
          />
        ))}
      </ContainerComponent>
    );
  });

  return (
    <>
      <TextField
        id="standard-full-width"
        label=""
        style={{ margin: 1 }}
        placeholder="Filtra los Comprimisos Puede ser por:
        Dependencia Responsable, Institución de Organización Civil Responsable o
        Miembro del comité coordinador"
        helperText="Control para filtrar y/o ordenar compromisos"
        fullWidth
        margin="normal"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {administrador && creatable && (
        <Creatable
          parentKey={creatable}
          parentId={parentId}
          typename={typename}
          refetch={refetch}
        />
      )}
      <Container
        axis="x"
        pressDelay={200}
        shouldCancelStart={() => !administrador}
        items={items}
        onSortEnd={onSort}
        {...sortableProps}
      />
    </>
  );
};

export default SortableList;
