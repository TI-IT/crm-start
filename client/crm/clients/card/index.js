import React from 'react';
import { useRouter } from 'next/router';
import styles from './Card.module.scss';

export default function Card({ propsCardData, message, changeClients }) {
  console.log(propsCardData);
  return (
    <>
      <div>{message}</div>
      <div>
        {propsCardData.titles.surname}
        <div>
          <input
            type={'text'}
            name={'surname'}
            placeholder={'Фамилия'}
            onChange={(e) => changeClients('surname', e.target.value)}
            value={propsCardData.clients.surname}
          ></input>
        </div>
      </div>
    </>
  );
}
