import React from 'react';
import { useRouter } from 'next/router';
import styles from './Form.module.scss';
import Card from '../components/card';

export default function ApplicationsForm({ server_host }) {
  const [citys, setCitys] = React.useState([]);
  const [addCity, setAddCity] = React.useState({});
  const [hide, sethide] = React.useState(styles.hide);
  const [titles, setTitles] = React.useState({
    client: 'Клиент',
    name: 'Имя',
    patronymic: 'Отчество',
    phone: 'Телефон',
    email: 'Email',
    organization: 'Организация',
    city: 'Город',
    address: 'Адрес',
    notes: 'Примечания',
  });
  const [newApplications, setNewApplications] = React.useState({
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
  const [clients, setClients] = React.useState([
    {
      surname: '',
      name: '',
      patronymic: '',
      phone: '',
      email: '',
      organization: '',
      city: '',
      address: '',
      notes: '',
    },
  ]);
  const [message, setMessage] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);
  const router = useRouter('/');

  function changeNewApplications(name, value) {
    setNewApplications({
      ...newApplications,
      [name]: value,
    });
  }

  function changeCity(name, value) {
    setAddCity({
      ...addCity,
      [name]: value,
    });
  }

  React.useEffect(loadCitys, []);

  function loadCitys() {
    fetch(server_host + '/directory/citys/get/all', {
      method: 'get',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.ok) {
          setCitys(data.citys);
        }
      });
  }

  async function addClients() {
    setDisabled(true);
    setMessage('');
    if (!newApplications.name || !newApplications.phone || !newApplications.organization) {
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
      // router.push('/applications');
    } else {
      setDisabled(false);
      setMessage('Ошибка попробуйте другие данные');
    }
  }

  function displayShow() {
    sethide(styles.show);
  }
  function displayHide() {
    sethide(styles.hide);
  }
  async function directoryAddCity() {
    sethide(styles.hide);
    try {
      const res = await fetch(server_host + '/directory/city/add', {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(addCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.ok) {
        setMessage('Город добавлен');
        loadCitys();
        setDisabled(false);
      } else {
        setDisabled(false);
        setMessage('Ошибка попробуйте другие данные');
      }
    } catch (error) {
      alert('Сервер не отвечает');
    }
  }

  return (
    <>
      <Card />
    </>
  );
}
