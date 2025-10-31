import React from 'react';
// Make sure this hook is in the same folder or update the path
import useIntersectionObserver from './useIntersectionObserver'; 
import styles from './Certificates.module.css';

function CertificateCard({ title, issuer, imageUrl, verifyUrl, index }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Stagger the animation delay
  const style = {
    transitionDelay: `${index * 100}ms`,
  };

  const className = `${styles.certCard} ${
    isIntersecting ? styles.isVisible : ''
  }`;

  return (
    <div ref={ref} className={className} style={style}>
      <div className={styles.cardImageContainer}>
        <img src={imageUrl} alt={`${issuer} logo`} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardIssuer}>{issuer}</p>
        <a 
          href={verifyUrl} 
          className={styles.verifyLink} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Show Credential
        </a>
      </div>
    </div>
  );
}

export default CertificateCard;