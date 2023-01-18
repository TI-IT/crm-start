import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from './Supply.module.scss';
import { Menu } from '../../conponents/Menu';
import SupplyPage from '../../crm/supply/page';
import logoImage from '../../public/logo/logo.png';

export default function Supply({ server_host }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(test, []);

  function test() {
    // fetch(server_host + '/tasks/getalltasks', {
    //   method: 'get',
    //   credentials: 'include',
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     if (data) {
    //       setTasks(data.tasks);
    //     }
    //   });
  }

  return (
    <>
      <Head>
        <title>Снабжение Supply</title>
      </Head>
      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <Menu />
        </div>
        <div className={styles.gridSidebar}></div>
        <div className={styles.gridContent}>
          <h2>Снабжение</h2>
          <SupplyPage />
        </div>
        <div className="gridFooter">
          <h1>Footer</h1>
        </div>
      </div>
    </>
  );
}
