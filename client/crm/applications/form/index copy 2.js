import React from 'react';
import { useRouter } from 'next/router';
import styles from './Form.module.scss';
import FormGroupSelect from '../components/formGroupSelect';

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
      <h3 className={styles.center}>Заявка Клиента</h3>
      <div className={styles.center}>{message}</div>
      <div className={styles.form}>
        <div className={styles.form1}>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.client}</label>
            </div>
            <div className={styles.inputRight}>
              <input
                type={'text'}
                name={'client'}
                placeholder={'Клиент'}
                onChange={(e) => changeNewApplications('client', e.target.value)}
                value={newApplications.client}
                onClick={displayHide}
              ></input>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.name}</label>
            </div>
            <div className={styles.inputRight}>
              <input
                className={styles.red}
                type={'text'}
                name={'name'}
                placeholder={'Имя'}
                onChange={(e) => changeNewApplications('name', e.target.value)}
                value={newApplications.name}
                onClick={displayHide}
              ></input>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.patronymic}</label>
            </div>
            <div className={styles.inputRight}>
              <input
                type={'text'}
                name={'patronymic'}
                placeholder={'Отчество'}
                onChange={(e) => changeNewApplications('patronymic', e.target.value)}
                value={newApplications.patronymic}
                onClick={displayHide}
              ></input>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.phone}</label>
            </div>
            <div className={styles.inputRight}>
              <input
                className={styles.red}
                type={'number'}
                name={'phone'}
                placeholder={'Телефон'}
                onChange={(e) => changeNewApplications('phone', e.target.value)}
                value={newApplications.phone}
                onClick={displayHide}
              ></input>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.email}</label>
            </div>
            <div className={styles.inputRight}>
              <input
                type={'text'}
                name={'email'}
                placeholder={'Email'}
                onChange={(e) => changeNewApplications('email', e.target.value)}
                value={newApplications.email}
                onClick={displayHide}
              ></input>
            </div>
          </div>
        </div>

        <div className={styles.form2}>
          <FormGroupSelect
            styles={styles}
            titles={titles}
            clients={clients}
            displayShow={displayShow}
            hide={hide}
          />
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.organization}</label>
            </div>
            <div className={styles.inputRight}>
              <input
                className={styles.red}
                type={'text'}
                name={'organization'}
                placeholder={'Организация'}
                onChange={(e) => changeNewApplications('organization', e.target.value)}
                value={newApplications.organization}
                onClick={displayHide}
              ></input>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.city}</label>
            </div>
            <div className={styles.inputRight}>
              <select
                className={styles.select}
                onChange={(e) => changeNewApplications('city', e.target.value)}
              >
                <option>{''}</option>
                {citys.map((city, id) => (
                  <option key={id}>{city}</option>
                ))}
              </select>
              <div className={styles.buttonGroup}>
                <button className={styles.button} type={'button'} onClick={displayShow}>
                  +
                </button>
                <div className={hide}>
                  <div className={styles.GroupChildren}>
                    <input
                      type={'text'}
                      name={'city'}
                      placeholder={'Город'}
                      onChange={(e) => changeCity('city', e.target.value)}
                      // value={addCity.city}
                    ></input>
                    <div className={styles.GroupChildrenButton}>
                      <button className={styles.button} type={'button'} onClick={directoryAddCity}>
                        добавить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.address}</label>
            </div>
            <div className={styles.inputRight}>
              <textarea
                className={styles.textarea}
                type={'text'}
                name={'address'}
                placeholder={'Адрес'}
                onChange={(e) => changeNewApplications('address', e.target.value)}
                value={newApplications.address}
                onClick={displayHide}
              ></textarea>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.labelLeft}>
              <label>{titles.notes}</label>
            </div>
            <div className={styles.inputRight}>
              <textarea
                className={styles.textarea}
                type={'text'}
                name={'notes'}
                placeholder={'Примечания'}
                onChange={(e) => changeNewApplications('notes', e.target.value)}
                value={newApplications.notes}
                onClick={displayHide}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <div>
          <button
            className={styles.button}
            type={'button'}
            onClick={addClients}
            disabled={disabled}
          >
            Добавить
          </button>
        </div>
      </div>
    </>
  );
}
