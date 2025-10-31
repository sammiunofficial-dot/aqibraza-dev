import React from 'react';
import CertificateCard from './CertificateCard';
import styles from './Certificates.module.css';

// --- Add your certificate data here ---
const certificatesData = [
    {
    id: 1,
    title: 'Machine Learning',
    issuer: 'Coursera & Stanford University',
    imageUrl: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~OW064EHAY4RK/CERTIFICATE_LANDING_PAGE~OW064EHAY4RK.jpeg',
    verifyUrl: 'https://coursera.org/share/46e33d7e42b9b37f544e62e732bcda2f',
  },
  {
    id: 2,
    title: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'Coursera & Stanford University',
    imageUrl: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~TEWOW81JBMIH/CERTIFICATE_LANDING_PAGE~TEWOW81JBMIH.jpeg',
    verifyUrl: 'https://coursera.org/share/826ae507d8c3153108f41915ea95b1f8', // <-- Replace with your real verification link
  },
  {
    id: 3,
    title: 'Advanced Learning Algorithms',
    issuer: 'Coursera & Stanford University',
    imageUrl: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~U00A6BAJ72IR/CERTIFICATE_LANDING_PAGE~U00A6BAJ72IR.jpeg',
    verifyUrl: 'https://coursera.org/share/c8d85ecac62f9634bfa7e9119b46e84f',
  },
  {
    id: 4,
    title: 'Unsupervised Learning, Recommenders, Reinforcement Learning',
    issuer: 'Coursera & Stanford University',
    imageUrl: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~MRN9TQYUM2FU/CERTIFICATE_LANDING_PAGE~MRN9TQYUM2FU.jpeg',
    verifyUrl: 'https://coursera.org/share/b9d4db4cc5e6321caeeca69bc7bade5b',
  },
  {
    id: 5,
    title: 'Neural Networks and Deep Learning',
    issuer: 'Coursera & Stanford University',
    imageUrl: 'https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~Y0123BAHB2FA/CERTIFICATE_LANDING_PAGE~Y0123BAHB2FA.jpeg',
    verifyUrl: 'https://coursera.org/share/bcd79d40a2ea3c43e21567880a1000d1',
  },
];
// ----------------------------------------

function Certificates() {
  return (
    <section id="certificates" className={styles.certificatesSection}>
      <h2 className={styles.certificatesHeadline}>Licenses & Certificates</h2>
      
      <div className={styles.certificateGrid}>
        {certificatesData.map((cert, index) => (
          <CertificateCard
            key={cert.id}
            title={cert.title}
            issuer={cert.issuer}
            imageUrl={cert.imageUrl}
            verifyUrl={cert.verifyUrl}
            index={index} // Used for animation stagger
          />
        ))}
      </div>
    </section>
  );
}

export default Certificates;