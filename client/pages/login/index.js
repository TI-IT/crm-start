import React from 'react';
import Head from 'next/head';
import { Menu } from '../../conponents/Menu';
import styles from './Login.module.scss';
import { useRouter } from 'next/router';

export default function Login({ server_host }) {
  const [user, setUser] = React.useState({ email: '', password: '' });
  const [message, setMessage] = React.useState('');
  const router = useRouter();

  function changeUser(name, value) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function login() {
    setMessage('');
    if (!user.email || !user.password) {
      setMessage('Заполните оба поля');
    }
    const res = await fetch(server_host + '/users/login', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.ok) {
      setMessage('Сейчас будет выполнена переадресация');
      router.push('/dashboard');
    } else {
      setMessage('Ошибка попробуйте другие данные');
    }
  }

  return (
    <>
      <Head>
        <title>Вход</title>
      </Head>
      <Menu />
      <div className={styles.container}>
        <div>
          <h2>Вход</h2>
        </div>
        <div>{message}</div>
        <form>
          <div>
            <input
              type={'text'}
              name={'email'}
              placeholder={'email'}
              onChange={(e) => changeUser('email', e.target.value)}
              value={user.email}
            />
          </div>
          <div>
            <input
              type={'password'}
              name={'password'}
              placeholder={'пароль'}
              onChange={(e) => changeUser('password', e.target.value)}
              value={user.password}
            />
          </div>
          <button className={styles.button} type={'button'} onClick={login}>
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
