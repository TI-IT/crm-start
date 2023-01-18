import React from 'react';
import styles from './BasicTable.module.scss';
import { useTable, usePagination } from 'react-table';
import STUDENTS from '../student.json';
import { COLUMNS } from './columns';

export const PaginationTable = () => {
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => STUDENTS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
  );

  const { pageIndex } = state;

  return (
    <>
      <div>
        <h1>PaginationTable</h1>
        <button>
          <a href="https://www.youtube.com/watch?v=Kjj6Zi89gPc&list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz&index=11">
            React Table Tutorial - 11 - Pagination (Next and Previous)
          </a>
        </button>

        <hr></hr>
      </div>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup, id) => (
            <tr key={id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <th key={id} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, id) => {
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
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};
