import React from 'react';
import useIntersectionObserver from './useIntersectionObserver'; // The hook from our previous conversation
import styles from './Skills.module.css'; // We'll use the same CSS file

function SkillCard({ name, icon, index }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true, // Make sure it only animates once
  });

  // Stagger the animation
  const style = {
    transitionDelay: `${index * 50}ms`,
  };

  const className = `${styles.skillCard} ${
    isIntersecting ? styles.isVisible : ''
  }`;

  return (
    <div ref={ref} className={className} style={style}>
      <div className={styles.skillIcon}>{icon}</div>
      <h4 className={styles.skillName}>{name}</h4>
    </div>
  );
}

export default SkillCard;