import React from 'react';
import SkillCard from './SkillCard'; // We will create this next
import styles from './Skills.module.css'; // And this CSS module

// Import the icons you need
import { DiPython, DiGit, DiDocker } from 'react-icons/di';
import { FcScatterPlot } from "react-icons/fc";
import {
  SiPandas,
  SiNumpy,
  SiMongodb,
  SiScikitlearn,
  SiTensorflow,
  SiKeras,
  SiPytorch,
  SiJupyter,
  SiFastapi,
//   SiMatplotlib,
  SiPlotly
} from 'react-icons/si';

// Define your skills data in a clean, manageable way
const skillsData = [
  {
    category: 'Programming & Data',
    items: [
      { name: 'Python', icon: <DiPython /> },
      { name: 'Pandas', icon: <SiPandas /> },
      { name: 'NumPy', icon: <SiNumpy /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'FastApi', icon: <SiFastapi />}
    ],
  },
  {
    category: 'ML / Deep Learning',
    items: [
      { name: 'Scikit-learn', icon: <SiScikitlearn /> },
      { name: 'TensorFlow', icon: <SiTensorflow /> },
      { name: 'Keras', icon: <SiKeras /> },
      { name: 'PyTorch', icon: <SiPytorch /> },
    ],
  },
  {
    category: 'Data Visualization',
    items: [
      { name: 'Matplotlib', icon: <FcScatterPlot /> },
      { name: 'Seaborn', icon: <SiPlotly /> },
      // You can add Seaborn here, e.g., using SiPlotly as a stand-in
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Jupyter', icon: <SiJupyter /> },
      { name: 'Git', icon: <DiGit /> },
      { name: 'Docker', icon: <DiDocker /> },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <h2 className={styles.skillsHeadline}>My Skills & Toolkit</h2>
      <p className={styles.skillsSubheadline}>
        The technologies and tools I use to build data-driven solutions.
      </p>

      {skillsData.map((category) => (
        <div key={category.category} className={styles.skillCategory}>
          <h3 className={styles.categoryTitle}>{category.category}</h3>
          <div className={styles.skillGrid}>
            {category.items.map((item, index) => (
              <SkillCard
                key={item.name}
                name={item.name}
                icon={item.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;