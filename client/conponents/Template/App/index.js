import React from 'react';
import { Menu } from '../../Menu';
import styles from './Template.module.scss';
import ClientsPage from '../../../crm/clients/page';

export default function TemplateApp() {
  return (
    <div className={styles.container}>
      <h1>Template</h1>
      <Menu />
    </div>
  );
}
