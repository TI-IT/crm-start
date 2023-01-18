import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Dashboard.module.scss';
import { Menu } from '../../conponents/Menu';

export default function Dashboard({ server_host }) {
  const [loading, setLoading] = React.useState(true);
  const [needAuth, setNeedAuth] = React.useState(false);
  const [user, setUser] = React.useState({ username: '', password: '' });
  const [message, setMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      await checkAuth();
    })();
  }, []);

  async function checkAuth() {
    const res = await fetch(server_host + '/users/check/auth', {
      method: 'post',
      credentials: 'include',
    });
    const data = await res.json();

    if (data.ok) {
      setLoading(false);
      await loadData();
    } else {
      setNeedAuth(true);
      setLoading(false);
    }
  }

  async function loadData() {
    const res = await fetch(server_host + '/users/me/', {
      method: 'get',
      credentials: 'include',
    });
    const data = await res.json();
    if (data.ok) {
      setUser(data.user);
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <h1>Загрузка</h1>
      </div>
    );
  }

  if (needAuth) {
    return (
      <div className={styles.container}>
        <h1>Необходимо войти</h1>
        <div>
          <Link href={'/login'}>Перйти на форму входа</Link>
        </div>
      </div>
    );
  }

  function changeUser(name, value) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function save() {
    setDisabled(true);
    setMessage('');
    const res = await fetch(server_host + '/users/update', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setDisabled(false);
    if (data.ok) {
      setMessage('Сохранено');
    } else {
      setMessage('Ошибка');
    }
  }

  async function savePassword() {
    setDisabled(true);
    setMessage('');
    const res = await fetch(server_host + '/users/updatePassword', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setDisabled(false);
    if (data.ok) {
      setMessage('Сохранено');
    } else {
      setMessage('Ошибка');
    }
  }

  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <Menu />
      <div>
        <h2>Личный кабинет</h2>
      </div>
      <div className={styles.container}>
        <div>{message}</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Емаил</th>
              <th>Пароль</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>
            <tr>
              <td>
                <input
                  type={'text'}
                  value={user.username}
                  onChange={(e) => changeUser('username', e.target.value)}
                />
              </td>
              <td></td>
              <td>
                <input
                  type={'text'}
                  value={user.password}
                  onChange={(e) => changeUser('password', e.target.value)}
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <button
                  type={'button'}
                  onClick={save}
                  className={styles.button}
                  disabled={disabled}
                >
                  Сохранить
                </button>
              </td>
              <td></td>
              <td>
                <button
                  type={'button'}
                  onClick={savePassword}
                  className={styles.button}
                  disabled={disabled}
                >
                  Сохранить пароль
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button className={styles.button}>
          <a href={server_host + '/users/logout'}>Выход</a>
        </button>
      </div>
    </>
  );
}
