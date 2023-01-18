import React from 'react';

export default function FormGroupSelect() {
  return (
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
          <option>{clients}</option>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
