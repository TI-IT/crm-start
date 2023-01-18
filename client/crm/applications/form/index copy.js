import React from 'react';
import { useRouter } from 'next/router';
import styles from './Form.module.scss';

export default function TableaddClients({ server_host }) {
  const [titles, setTitles] = React.useState({
    surname: 'Фамилия',
    name: 'Имя',
    patronymic: 'Отчество',
    phone: 'Телефон',
    email: 'Email',
    organization: 'Организация',
    city: 'Город',
    address: 'Адрес',
    notes: 'Примечания',
  });
  const [clients, setClients] = React.useState({
    surname: '',
    name: '',
    patronymic: '',
    phone: '',
    email: '',
    organization: '',
    city: '',
    address: '',
    notes: '',
  });
  const [message, setMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const router = useRouter('/');

  function changeClients(name, value) {
    setClients({
      ...clients,
      [name]: value,
    });
  }

  async function addClients() {
    setDisabled(true);
    setMessage('');
    if (
      !clients.name ||
      !clients.phone ||
      !clients.organization ||
      !clients.city ||
      !clients.address
    ) {
      setMessage('Заполните нужные поля поля');
      setDisabled(false);
      return;
    }

    const res = await fetch(server_host + '/clients/add', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(clients),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.ok) {
      setMessage('Клиент добавлен');
      // loadClients(); //*************************** */
      setDisabled(false);
      setClients({
        surname: '',
        name: '',
        patronymic: '',
        phone: '',
        email: '',
        organization: '',
        city: '',
        address: '',
        notes: '',
      });
      router.push('/clients');
    } else {
      setDisabled(false);
      setMessage('Ошибка попробуйте другие данные');
    }
  }

  return (
    <>
      <div>
        <h2>Добавить Клиента</h2>
      </div>
      <div>{message}</div>
      <div className={styles.containerTable}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{titles.surname}</th>
                <th>{titles.name}</th>
                <th>{titles.patronymic}</th>
                <th>{titles.phone}</th>
                <th>{titles.email}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type={'text'}
                    name={'surname'}
                    placeholder={'Фамилия'}
                    onChange={(e) => changeClients('surname', e.target.value)}
                    value={clients.surname}
                  ></input>
                </td>
                <td>
                  <input
                    className={styles.red}
                    type={'text'}
                    name={'name'}
                    placeholder={'Имя'}
                    onChange={(e) => changeClients('name', e.target.value)}
                    value={clients.name}
                  ></input>
                </td>
                <td>
                  <input
                    type={'text'}
                    name={'patronymic'}
                    placeholder={'Отчество'}
                    onChange={(e) => changeClients('patronymic', e.target.value)}
                    value={clients.patronymic}
                  ></input>
                </td>
                <td>
                  <input
                    className={styles.red}
                    type={'number'}
                    name={'phone'}
                    placeholder={'Телефон'}
                    onChange={(e) => changeClients('phone', e.target.value)}
                    value={clients.phone}
                  ></input>
                </td>
                <td>
                  <input
                    className={styles.red}
                    type={'text'}
                    name={'email'}
                    placeholder={'Email'}
                    onChange={(e) => changeClients('email', e.target.value)}
                    value={clients.email}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <br></br>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{titles.organization}</th>
                <th>{titles.city}</th>
                <th>{titles.address}</th>
                <th>{titles.notes}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.red}>
                  <input
                    className={styles.textarea}
                    type={'text'}
                    name={'organization'}
                    placeholder={'Организация'}
                    onChange={(e) => changeClients('organization', e.target.value)}
                    value={clients.organization}
                  ></input>
                </td>
                <td className={styles.red}>
                  <input
                    className={styles.textarea}
                    type={'text'}
                    name={'city'}
                    placeholder={'Город'}
                    onChange={(e) => changeClients('city', e.target.value)}
                    value={clients.city}
                  ></input>
                </td>
                <td className={styles.red}>
                  <textarea
                    className={styles.textarea}
                    type={'text'}
                    name={'address'}
                    placeholder={'Адрес'}
                    onChange={(e) => changeClients('address', e.target.value)}
                    value={clients.address}
                  ></textarea>
                </td>
                <td>
                  <textarea
                    className={styles.textarea}
                    type={'text'}
                    name={'notes'}
                    placeholder={'Примечания'}
                    onChange={(e) => changeClients('notes', e.target.value)}
                    value={clients.notes}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br></br>
      <div>
        <div className={styles.container}>
          <button
            type={'button'}
            onClick={addClients}
            className={styles.button}
            disabled={disabled}
          >
            Добавить
          </button>
        </div>
      </div>
    </>
  );
}
