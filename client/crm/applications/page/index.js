import React from 'react';
import ApplicationsForm from '../form';

export default function ApplicationsPage({ server_host }) {
  return (
    <>
      <ApplicationsForm server_host={server_host} />
    </>
  );
}
