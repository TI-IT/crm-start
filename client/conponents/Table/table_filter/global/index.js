import React from 'react';
import styles from './BasicTable.module.scss';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import STUDENTS from '../../student.json';
import { COLUMNS } from './columns';
import { GlobalFilter } from './filter/global';

export const FilteringTable = () => {
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => STUDENTS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
  );

  const { globalFilter } = state;

  return (
    <>
      <div>
        <h1>FilteringTable</h1>
        <button>
          <a href="https://www.youtube.com/watch?v=GsDP1bLoIQU&list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz&index=8">
            React Table Tutorial - 8 - Global Filtering
          </a>
        </button>

        <hr></hr>
      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup, id) => (
            <tr key={id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <th key={id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, id) => {
            prepareRow(row);
            return (
              <tr key={id} {...row.getRowProps()}>
                {row.cells.map((cell, id) => {
                  return (
                    <td key={id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
