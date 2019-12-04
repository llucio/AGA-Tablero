import React, { useState } from 'react';
import _ from 'lodash';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import arrayMove from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { useRoles } from '../hooks';

const SortableList = ({
  items,
  refetch,
  containerComponent: ContainerComponent = Box,
  containerProps = {},
  itemComponent: ItemComponent,
  itemProps = {},
  ...options
}) => {
  console.log('rendeting list');
  const typename = _.get(items, '0.__typename', '');
  const [loading, setLoading] = useState(false);
  const { usuario } = useRoles();
  const [mutateOrden] = useMutation(
    gql`
    mutation setOrden($id: uuid!, $orden: Int!) {
      update_${typename}(where: { id: { _eq: $id } }, _set: { orden: $orden }) {
        affected_rows
      }
    }
  `
  );
  const onSort = ({ oldIndex, newIndex }) => {
    setLoading(true);
    Promise.all(
      arrayMove(items, oldIndex, newIndex).map(({ id, orden }, index) => {
        if (orden === index) {
          return Promise.resolve();
        }
        return mutateOrden({
          awaitRefetchQueries: true,
          variables: { id, orden: index }
        });
      })
    )
      .then(() => {
        refetch().then(() => setLoading(false));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return null;
  }

  const SortableItem = SortableElement(({ value }) => (
    <ItemComponent item={value} refetch={refetch} {...itemProps} />
  ));

  const Container = SortableContainer(({ items }) => {
    return (
      <ContainerComponent {...containerProps}>
        {items.map((value, index) => (
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
    <Container
      axis="x"
      pressDelay={200}
      shouldCancelStart={() => !usuario.administrador}
      items={items}
      onSortEnd={onSort}
      {...options}
    />
  );
};

export default SortableList;