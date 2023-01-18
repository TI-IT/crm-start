import React from 'react';
import MiniCard from './miniCard';

export default function BigCard(styles) {
  return (
    <div className={styles.miniCard}>
      <MiniCard styles={styles} />
      <MiniCard styles={styles} />
    </div>
  );
}
