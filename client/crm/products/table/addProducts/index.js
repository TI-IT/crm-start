import React from 'react';
import styles from './BasicTable.module.scss';
import { useRouter } from 'next/router';

export const TableAddProducts = ({ server_host, loadProducts }) => {
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

  function changeProduct(name, value) {
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
      <div>
        <h2>Добавить товар</h2>
      </div>
      <div>{message}</div>
      <form>
        <span>
          <input
            type={'text'}
            name={'contractor'}
            onChange={(e) => changeProduct('contractor', e.target.value)}
            value={product.contractor}
            placeholder={'Поставщик'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'type'}
            onChange={(e) => changeProduct('type', e.target.value)}
            value={product.type}
            placeholder={'Тип'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'category'}
            onChange={(e) => changeProduct('category', e.target.value)}
            value={product.category}
            placeholder={'category'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'subCategory'}
            onChange={(e) => changeProduct('subCategory', e.target.value)}
            value={product.subCategory}
            placeholder={'Подкатегория'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'name'}
            onChange={(e) => changeProduct('name', e.target.value)}
            value={product.name}
            placeholder={'Наименование'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'article'}
            onChange={(e) => changeProduct('article', e.target.value)}
            value={product.article}
            placeholder={'Артикул'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'finishing'}
            onChange={(e) => changeProduct('finishing', e.target.value)}
            value={product.finishing}
            placeholder={'Отделка'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'unit'}
            onChange={(e) => changeProduct('unit', e.target.value)}
            value={product.unit}
            placeholder={'Ед-изм.'}
          />
        </span>
        <span>
          <input
            type={'number'}
            name={'costPrice'}
            onChange={(e) => changeProduct('costPrice', e.target.value)}
            value={product.costPrice}
            placeholder={'Себестоимость'}
          />
        </span>
        <span>
          <input
            type={'text'}
            name={'urlImage'}
            onChange={(e) => changeProduct('urlImage', e.target.value)}
            value={product.urlImage}
            placeholder={'Сылка на фото'}
          />
        </span>

        <div>
          <button
            type={'button'}
            onClick={addProduct}
            className={styles.button}
            disabled={disabled}
          >
            Добавить
          </button>
        </div>
      </form>
    </>
  );
};
