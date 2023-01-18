import React from 'react';
import Input from './input';

export default function MiniCard(styles) {
  return (
    <div className={styles.miniCard}>
      <Input styles={styles} />
    </div>
  );
}
