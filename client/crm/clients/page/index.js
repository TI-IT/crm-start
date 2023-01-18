import React from 'react';
import TableaddClients from '../form';

export default function ClientsPage({ server_host }) {
  return (
    <>
      <TableaddClients server_host={server_host} />
    </>
  );
}
