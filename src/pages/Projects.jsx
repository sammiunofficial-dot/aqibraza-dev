import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
// Import the CSS Module
import styles from './Projects.module.css'; 

// (Project data remains the same)
const allProjects = [
  {
  id: 1,
  category: 'ML',
  tag: 'Sklearn',
  title: 'Car Price Predictor: Intelligent Valuation System',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcR7HfJkNQZtQZ4sGz5oKMvG3kPQI2rE7C1vYgChFMLmE6FXW2M8uPtuqv6E3fXzA8oR8EeGQwhdUeJyzmCJSZ2Bg0vQ-1TT-8Pi4hXdbdKz7OG6Q5h9Z2V7Y_9zt4p5hV2lfxM7L4vbtq5DkH',  
  description: 'An advanced machine learning model that predicts car prices based on features like brand, year and mileage. Built with Sklearn for accurate regression modeling and real-world price estimation.',
  methodologies: ['Linear Regression', 'Scikit-learn', 'Data Preprocessing'],
  links: [
    { label: 'Code Repository', icon: 'code', url: 'https://github.com/aqibraza-dev/Car-Price-Predictor' },
    { label: 'Live Demo', icon: 'play_circle', url: 'https://car-price-eight.vercel.app/' },
  ],
},

  {
    id: 2,
    category: 'DL',
    tag: 'TensorFlow',
    title: 'MNIST Hand Digit Classification',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHT5Iu86vc56lhnUytqMrxrRVUIDZqqZKAXHofqueItGpb2Fkg1y-lqqr1IdBGMvbfYrV2XamGy-6LM1W3YnwdiNQjxSZnImIbh5zXIiqe1-zDIhddi58JTSoHJViQPnM0c3m6HqOb1XV3N6f6Zkey7e3iiDpm2TC0cYsoSYCJ2O7ghb3fvkmPxqfldxt_z-GEMes6nbw0cRDRk9RcaXryMSnk5w7J4pbf-nILi5WVJ6Q8djlJiigNUov6ajjXwFpBZLwckQoXCSAu',
    description: '',
    methodologies: ['Tensorflow', 'Dense', 'Regularization'],
    links: [
      { label: 'Code Repository', icon: 'code', url: 'https://github.com/aqibraza-dev/MNIST-Hand-Digit-Classification' },
      { label: 'Live Demo', icon: 'article', url: 'https://mnist-hand-digit-classification.vercel.app/' },
    ],
  },
    {
  id: 3,
  category: 'DL',
  tag: 'Tensorflow',
  title: 'Customer Churn Prediction',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHT5Iu86vc56lhnUytqMrxrRVUIDZqqZKAXHofqueItGpb2Fkg1y-lqqr1IdBGMvbfYrV2XamGy-6LM1W3YnwdiNQjxSZnImIbh5zXIiqe1-zDIhddi58JTSoHJViQPnM0c3m6HqOb1XV3N6f6Zkey7e3iiDpm2TC0cYsoSYCJ2O7ghb3fvkmPxqfldxt_z-GEMes6nbw0cRDRk9RcaXryMSnk5w7J4pbf-nILi5WVJ6Q8djlJiigNUov6ajjXwFpBZLwckQoXCSAu',
  description: 'A deep learning model that identifies customers likely to churn by analyzing behavioral, transactional, and engagement data. Designed to help businesses take proactive retention measures through predictive insights.',
  methodologies: ['Neural Networks', 'Feature Engineering', 'Imbalanced Data Handling'],
  links: [
    { label: 'Code Repository', icon: 'code', url: '#' },
    { label: 'Case Study', icon: 'article', url: '#' },
  ],
},

];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'ML', name: 'Machine Learning' },
  { id: 'DL', name: 'Deep Learning' },
  { id: 'RL', name: 'Reinforcement Learning' },
  { id: 'GEN', name: 'Generative Models' },
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    // Use the CSS module class names
    <main id="projects" className={styles.projectsMain}>
      <div className={styles.projectsHeadingContainer}>
        <h1 className={styles.projectsHeadline}>Explore Our AI Innovations</h1>
      </div>

      <div className={styles.chipsContainer}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            // Use template literals for conditional classes
            className={`${styles.chip} ${
              activeCategory === cat.id ? styles.active : ''
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className={styles.projectGrid}>
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            style={{ transitionDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </main>
  );
}

export default Projects;
