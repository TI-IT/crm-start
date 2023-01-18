import React from 'react';

export const FilterColumn = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Филтор: {''} <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
};
