import React from 'react';
import styles from './addSupplyTable.module.scss';
import { useRouter } from 'next/router';

export const TableaddSupply = ({ server_host, loadProducts }) => {
  const [product, setProduct] = React.useState({
    contractor: '',
    type: '',
    category: '',
    subCategory: '',
    name: '',
    article: '',
    finishing: '',
    unit: '',
    costPrice: '',
    urlImage: '',
  });

  const [message, setMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const router = useRouter('/');

  function addSupplyTable(name, value) {
    setProduct({
      ...product,
      [name]: value,
    });
  }

  async function addProduct() {
    setDisabled(true);
    setMessage('');
    if (
      !product.contractor ||
      !product.type ||
      !product.category ||
      !product.subCategory ||
      !product.name ||
      !product.article ||
      !product.finishing ||
      !product.unit ||
      !product.costPrice ||
      !product.urlImage
    ) {
      setMessage('Заполните все поля');
      setDisabled(false);
      return;
    }

    const res = await fetch(server_host + '/products/add', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data.ok) {
      setMessage('Продукт добавлен');
      loadProducts();
      // router.push('/dashboard');
    } else {
      setDisabled(false);
      setMessage('Ошибка попробуйте другие данные');
    }
  }

  return (
    <>
      <div>{message}</div>
      <div className={styles.containerTable}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№ПП</th>
                <th>Код</th>
                <th>Наименование</th>
                <th>Отделка</th>
                <th>Кол-во</th>
                <th>Ед. изм.</th>
                <th>Цена руб.</th>
                <th>Сумма руб.</th>
                <th>Рисунок</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Body №ПП</td>
                <td>Body Код</td>
                <td>Body Наименование</td>
                <td>Body Отделка</td>
                <td>Body Кол-во</td>
                <td>Body Ед. изм.</td>
                <td>Body Цена руб.</td>
                <td>Body Сумма руб.</td>
                <td>Body Рисунок</td>
              </tr>
              <tr>
                <td>Body №ПП</td>
                <td>Body Код</td>
                <td>Body Наименование</td>
                <td>Body Отделка</td>
                <td>Body Кол-во</td>
                <td>Body Ед. изм.</td>
                <td>Body Цена руб.</td>
                <td>Body Сумма руб.</td>
                <td>Body Рисунок</td>
              </tr>
              <tr>
                <td>Body №ПП</td>
                <td>Body Код</td>
                <td>Body Наименование</td>
                <td>Body Отделка</td>
                <td>Body Кол-во</td>
                <td>Body Ед. изм.</td>
                <td>Body Цена руб.</td>
                <td>Body Сумма руб.</td>
                <td>Body Рисунок</td>
              </tr>
              <tr>
                <td>Body №ПП</td>
                <td>Body Код</td>
                <td>Body Наименование</td>
                <td>Body Отделка</td>
                <td>Body Кол-во</td>
                <td>Body Ед. изм.</td>
                <td>Body Цена руб.</td>
                <td>Body Сумма руб.</td>
                <td>Body Рисунок</td>
              </tr>
              <tr>
                <td>Body №ПП</td>
                <td>Body Код</td>
                <td>Body Наименование</td>
                <td>Body Отделка</td>
                <td>Body Кол-во</td>
                <td>Body Ед. изм.</td>
                <td>Body Цена руб.</td>
                <td>Body Сумма руб.</td>
                <td>Body Рисунок</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
