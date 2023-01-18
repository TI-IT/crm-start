import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Directory.module.scss';
import { Menu } from '../../conponents/Menu';
import { BasicTable } from './../../conponents/Table/table_basic';
import { BasicTableGroupColumns } from './../../conponents/Table/table_basic_group_columns';
import { SortingTable } from './../../conponents/Table/table_sorting';
import { FilteringTable } from './../../conponents/Table/table_filter/global';
import { FilteringTableColumn } from './../../conponents/Table/table_filter/column';
import { PaginationTable } from './../../conponents/Table/table_pagination';

export default function Directory({ server_host }) {
  return (
    <>
      <Head>
        <title>Справочник</title>
      </Head>
      <Menu />
      <BasicTable />
      <BasicTableGroupColumns />
      <SortingTable />
      <FilteringTable />
      <FilteringTableColumn />
      <PaginationTable />
    </>
  );
}
