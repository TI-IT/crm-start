import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Task.module.scss';
import { Menu } from '../../conponents/Menu';

export default function Tasks({ server_host }) {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(loadTasks, []);

  function loadTasks() {
    try {
      fetch(server_host + '/tasks/getalltasks', {
        method: 'get',
        credentials: 'include',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data) {
            setTasks(data.tasks);
          }
        });
    } catch (error) {
      console.log('Нет ответа от сервера');
    }
  }

  return (
    <>
      <Head>
        <title>Карточки tasks</title>
      </Head>
      <div className={styles.gridContainer}>
        <div className={styles.gridHeader}>
          <Menu />
        </div>
        <div className={styles.gridSidebar}></div>
        <div className={styles.gridContent}>
          <div>
            <a href="https://www.youtube.com/watch?v=nEabP9CYCAQ&t=726s">
              Урок 12. JavaScript. Методы массивов (forEach, map, filter, reduce, find, findIndex).
              Js Массивы.
            </a>
            <h2>Карточки</h2>
            <div>
              <a href="https://yougile.com/api-v2#/">YOUGILE API2</a>
            </div>
          </div>
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Название</th>
                  <th>Описание задачи</th>
                  <th>Время создания задачи</th>
                  <th>Id колонки родителя</th>
                  <th>Задача выполнена</th>
                  <th>Массив Id подзадач</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, id) => (
                  <tr key={id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.timestamp}</td>
                    <td>{task.columnId}</td>
                    <td>{task.completed}</td>
                    <td>{task.subtasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
