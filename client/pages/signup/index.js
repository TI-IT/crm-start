import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Signup.module.scss';
import { Menu } from '../../conponents/Menu';
import emailValidator from 'email-validator';
import { useRouter } from 'next/router';

export default function Signup({ server_host }) {
  const [user, setUser] = React.useState({ email: '', password: '' });
  const [secondPassword, setSecondPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const router = useRouter('/');

  function changeUser(name, value) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function signUp() {
    setDisabled(true);
    setMessage('');
    if (!user.email || !user.password || !secondPassword) {
      setMessage('Заполните все поля');
      setDisabled(false);
      return;
    }
    if (secondPassword !== user.password) {
      setMessage('Пароли не совпадают');
      setDisabled(false);
      return;
    }
    if (!emailValidator.validate(user.email)) {
      setMessage('Email не корректный');
      setDisabled(false);
      return;
    }

    const res = await fetch(server_host + '/users/signup', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data.ok) {
      setMessage('Регистрация прошла успешно. перенаправление в личный кабинет');
      router.push('/dashboard');
    } else {
      setDisabled(false);
      setMessage('Ошибка попробуйте другие данные');
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Menu />
      <div className={styles.container}>
        <div>
          <h2>Регистрация</h2>
        </div>
        <div>{message}</div>
        <form>
          <div>
            <div>
              <input
                type={'text'}
                name={'email'}
                onChange={(e) => changeUser('email', e.target.value)}
                value={user.email}
                placeholder={'email'}
              />
            </div>
          </div>
          <div>
            <div>
              <input
                type={'password'}
                onChange={(e) => changeUser('password', e.target.value)}
                value={user.password}
                placeholder={'пароль'}
              />
            </div>
          </div>
          <div>
            <div>
              <input
                type={'password'}
                onChange={(e) => setSecondPassword(e.target.value)}
                placeholder={'Повторение пароля'}
              />
            </div>
          </div>
          <div>
            <button type={'button'} onClick={signUp} className={styles.button} disabled={disabled}>
              Зарегистрироватся
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
