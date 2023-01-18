import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Products.module.scss';
import { Menu } from '../../conponents/Menu';
import ProductsPage from '../../crm/products/page';

export default function Products({ server_host }) {
  return (
    <>
      <Head>
        <title>Товары ProductsPage</title>
      </Head>
      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <Menu />
        </div>
        <div className={styles.gridSidebar}></div>
        <div className={styles.gridContent}>
          <h2>Njdfhs</h2>
          <ProductsPage server_host={server_host} />
        </div>
        <div className="gridFooter">
          <h1>Footer</h1>
        </div>
      </div>
    </>
  );
}
