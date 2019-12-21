import React from 'react';
import { useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';

const GET_QUERY = loader('../../queries/CompromisoGetBySlug.graphql');

const defaultHeaderProps = {
  image: '/assets/images/planes_de_accion.jpg',
  className: 'medium',
  subheading: null,
  headerArrow: false
};

const Header = ({ headerProps }) => {
  const { compromisoSlug } = useParams();

  const { data: { item: [compromiso] = [] } = {} } = useQuery(GET_QUERY, {
    skip: !compromisoSlug,
    variables: {
      id: compromisoSlug
    }
  });

  const finalHeaderProps = {
    ...defaultHeaderProps,
    ...headerProps
  };

  const imageUrl = compromiso?.metadatos?.imagen || finalHeaderProps.image;

  return (
    <section
      id='banner'
      className={finalHeaderProps.className}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Box className='content image-content-- pattern4'>
        <header>
          <h2 className='big shadow-text'>{finalHeaderProps.heading}</h2>
          {finalHeaderProps.subheading && (
            <h4 className='mt-4 lead shadow-text'>
              {finalHeaderProps.subheading}
            </h4>
          )}
        </header>
      </Box>
      {finalHeaderProps.headerArrow && (
        <a href='#one' className='goto-next scrolly'>
          Siguiente
        </a>
      )}
    </section>
  );
};

export default Header;
