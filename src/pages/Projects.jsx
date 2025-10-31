import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
// Import the CSS Module
import styles from './Projects.module.css'; 

// (Project data remains the same)
const allProjects = [
  {
    id: 1,
    category: 'ML',
    tag: 'PyTorch',
    title: 'Project Cerebrum: Generative Text Models',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHT5Iu86vc56lhnUytqMrxrRVUIDZqqZKAXHofqueItGpb2Fkg1y-lqqr1IdBGMvbfYrV2XamGy-6LM1W3YnwdiNQjxSZnImIbh5zXIiqe1-zDIhddi58JTSoHJViQPnM0c3m6HqOb1XV3N6f6Zkey7e3iiDpm2TC0cYsoSYCJ2O7ghb3fvkmPxqfldxt_z-GEMes6nbw0cRDRk9RcaXryMSnk5w7J4pbf-nILi5WVJ6Q8djlJiigNUov6ajjXwFpBZLwckQoXCSAu',
    description: 'A cutting-edge generative model trained to understand and produce human-like text for summarization and content creation.',
    methodologies: ['Transformer Architecture', 'Python', 'Hugging Face'],
    links: [
      { label: 'Code Repository', icon: 'code', url: '#' },
      { label: 'Research Paper', icon: 'article', url: '#' },
    ],
  },
  {
    id: 2,
    category: 'DL',
    tag: 'TensorFlow',
    title: 'VisionX: Real-time Object Detection',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHT5Iu86vc56lhnUytqMrxrRVUIDZqqZKAXHofqueItGpb2Fkg1y-lqqr1IdBGMvbfYrV2XamGy-6LM1W3YnwdiNQjxSZnImIbh5zXIiqe1-zDIhddi58JTSoHJViQPnM0c3m6HqOb1XV3N6f6Zkey7e3iiDpm2TC0cYsoSYCJ2O7ghb3fvkmPxqfldxt_z-GEMes6nbw0cRDRk9RcaXryMSnk5w7J4pbf-nILi5WVJ6Q8djlJiigNUov6ajjXwFpBZLwckQoXCSAu',
    description: 'An optimized model for detecting and classifying objects in video streams with high accuracy and low latency, suitable for edge devices.',
    methodologies: ['CNNs', 'YOLOv5', 'OpenCV'],
    links: [
      { label: 'Code Repository', icon: 'code', url: '#' },
      { label: 'Research Paper', icon: 'article', url: '#' },
    ],
  },
    {
    id: 3,
    category: 'DL',
    tag: 'JAX',
    title: 'AlphaPath: RL for Logistics',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHT5Iu86vc56lhnUytqMrxrRVUIDZqqZKAXHofqueItGpb2Fkg1y-lqqr1IdBGMvbfYrV2XamGy-6LM1W3YnwdiNQjxSZnImIbh5zXIiqe1-zDIhddi58JTSoHJViQPnM0c3m6HqOb1XV3N6f6Zkey7e3iiDpm2TC0cYsoSYCJ2O7ghb3fvkmPxqfldxt_z-GEMes6nbw0cRDRk9RcaXryMSnk5w7J4pbf-nILi5WVJ6Q8djlJiigNUov6ajjXwFpBZLwckQoXCSAu',
    description: 'Using reinforcement learning to solve complex vehicle routing problems, significantly reducing fuel consumption and delivery times.',
    methodologies: ['Deep Q-Learning', 'RLlib', 'Gymnasium'],
    links: [
      { label: 'Code Repository', icon: 'code', url: '#' },
      { label: 'Research Paper', icon: 'article', url: '#' },
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