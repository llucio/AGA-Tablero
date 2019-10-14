import React from 'react';
import { useRoles } from '../hooks';

const UserMenu = () => {
  const { loading, authenticated, usuario, login, logout } = useRoles();

  if (loading) return null;

  return authenticated ? (
    <div className="authenticated">
      {usuario.name} {usuario.email}
      <button type="button" onClick={() => logout()}>
        Cerrar sesión
      </button>
    </div>
  ) : (
    <div className="anonymous">
      <button type="button" onClick={() => login()}>
        Identificarse
      </button>
    </div>
  );
};

export default UserMenu;
