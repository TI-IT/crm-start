import React from 'react';
import styles from './BasicTable.module.scss';
import { useTable } from 'react-table';
import STUDENTS from '../student.json';
import { COLUMNS } from './columns';

export const BasicTable = () => {
  const columns = React.useMemo(() => COLUMNS, []);
  const data = React.useMemo(() => STUDENTS, []);

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <div>
        <h1>BasicTable</h1>
        <button>
          <a href="https://www.youtube.com/watch?v=hson9BXU9F8&list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz&index=3">
            React Table Tutorial - 3 - Basic Table
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
