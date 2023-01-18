import React from 'react';

export default function FormGroupSelect() {
  return (
    <div className={styles.gridInputButton}>
      <span>
        <input placeholder={'Input'} />
      </span>
      <div>
        <button>Button</button>
      </div>
    </div>
  );
}
