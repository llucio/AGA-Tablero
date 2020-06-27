import React from 'react';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import LoadingIndicator from '../LoadingIndicator';
import { LinkContainer } from 'react-router-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Hidden from '@material-ui/core/Hidden';

const GET_QUERY = loader('../../queries/CompromisoGetBySlug.graphql');

const BreadcrumbItem = () => {
  const compromisoSlug = useParams();

  const { data: { item: [item] = [] } = {}, loading, error } = useQuery(
    GET_QUERY,
    {
      variables: {
        id: compromisoSlug,
      },
    }
  );

  if (error) return <div>Error</div>;
  if (loading && !item) return <LoadingIndicator />;
  if (!item) return <h1>No encontrado</h1>;

  return (
    <LinkContainer to={`/compromiso/${item.id}`}>
      <Breadcrumb.Item>
        <span>
          <Hidden smDown>{item.titulo}</Hidden>
          <Hidden mdUp>Compromiso</Hidden>
        </span>
      </Breadcrumb.Item>
    </LinkContainer>
  );
};

export default BreadcrumbItem;
