import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.scss';

export const Menu = () => {
  const [loading, setLoading] = React.useState(true);
  const [authorised, setAuthorised] = React.useState(undefined);
  const [role, setRole] = React.useState(undefined);

  const server_host =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:9001'
      : 'https://crm.servertiit.keenetic.pro';

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
      setAuthorised(true);
      setRole(data.role);
    } else {
      setLoading(false);
    }
  }
  return (
    <div className={styles.menu}>
      <button>
        <Link href={'/'}>Главная</Link>
      </button>
      <button>
        <Link href={'/clients'}>Клиенты</Link>
      </button>
      <button>
        <Link href={'/applications'}>Заявки</Link>
      </button>
      <button>
        <Link href={'/products'}>Товары</Link>
      </button>
      <button>
        <Link href={'/supply'}>Снабжение</Link>
      </button>
      <button>
        <Link href={'/tasks'}>Карточки</Link>
      </button>
      <button>
        <Link href={'/dashboard'}>Личный кабинет</Link>
      </button>
      <button>{!authorised && <Link href={'/login'}>Вход</Link>}</button>
      <button>
        <Link href={'/signup'}>Регистрация</Link>
      </button>
      {role === 'admin' && (
        <button>
          <Link href={'/admin'}>Admin</Link>
        </button>
      )}
      {authorised && (
        <button>
          <a href={server_host + '/users/logout'}>Выход</a>
        </button>
      )}
      <button>
        <Link href={'https://js-course.ru/courses/show/62b1824805964a1386560a8e'}>
          Lesson 3.11.17
        </Link>
      </button>
      <button>
        <Link href={'/directory'}>Справочник</Link>
      </button>
    </div>
  );
};
