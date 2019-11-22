import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import LoadingIndicator from '../LoadingIndicator';import Grid from '@material-ui/core/Grid';
import { useRoles } from '../../hooks';
import Sortable from '../Sortable';
import HitoCard from './HitoCard';

const useStyles = makeStyles(theme => ({
  box_panel: {
    padding: theme.spacing(5, 0, 10, 0)
  }
}));

// const HitoList = ({ hitos, onSort, refetch }) => {
//   const { usuario } = useRoles();
//   const classes = useStyles();

//   const SortableItem = SortableElement(({ value }) => (
//     <HitoCard key={value.id} hito={value} refetch={refetch} />
//   ));

//   const SortableList = SortableContainer(({ items = [] }) => {
//     return (
//       <Box className={classes.box_panel}>
//         {items.map((value, index) => (
//           <SortableItem key={`hito-${value.id}`} index={index} value={value} />
//         ))}
//       </Box>
//     );
//   });

//   return (
//     <div className="vertical-margin-bottom">
//       <h2>Hitos</h2>
//       <hr className="line" />
//       <SortableList
//         axis="xy"
//         pressDelay={200}
//         shouldCancelStart={() => !usuario.administrador}
//         items={hitos}
//         onSortEnd={onSort}
//       />
//     </div>
//   );
// };

// export default HitoList;

const LIST_QUERY = loader('../../queries/HitoList.graphql');

const HitoList = ({ where }) => {
  const { data: { items: hitos } = {}, loading, error, refetch } = useQuery(
    LIST_QUERY,
    {
      variables: {
        where
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !hitos) return <LoadingIndicator />;
  if (!hitos) return null;

  return (
    <div className="vertical-margin-bottom">
      <h2>Hitos</h2>
      <hr className="line" />
      <Sortable
        items={hitos}
        itemComponent={HitoCard}
        itemProps={{}}
        containerComponent={Grid}
        containerProps={{
          direction: 'row',
          justify: 'space-between',
          alignItems: 'flex-start',
          container: true
        }}
        refetch={refetch}
        axis="y"
      />
    </div>
  );
};

export default HitoList;

