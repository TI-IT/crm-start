import React from 'react';

export default function Input(styles) {
  return (
    <div className={styles.gridInput}>
      <span>
        <input placeholder={'Input'} />
      </span>
    </div>
  );
}
