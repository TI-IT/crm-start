import Head from 'next/head';
import { Menu } from '../conponents/Menu';
import styles from './Index.module.scss';

export default function Home({ server_host }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <Menu />
        </div>
        <div className={styles.gridSidebar}></div>
        <div className={styles.gridContent}>
          <h2>Главная страница</h2>
        </div>
        <div className="gridFooter">
          <h1>Footer</h1>
        </div>
      </div>
    </>
  );
}
