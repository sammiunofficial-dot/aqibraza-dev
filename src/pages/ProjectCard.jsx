import React from 'react';
// Import the (unchanged) hook
import useIntersectionObserver from './useIntersectionObserver'; 
// Import the card-specific CSS Module
import cStyles from './ProjectCard.module.css'; 

function ProjectCard({ project, style }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
  });

  // Conditionally apply the 'is-visible' class from the module
  const cardClassName = `${cStyles.flipCard} ${
    isIntersecting ? cStyles.isVisible : ''
  }`;

  return (
    <div ref={ref} className={cardClassName} style={style}>
      <div className={cStyles.flipCardInner}>
        {/* --- Card Front --- */}
        <div
          className={cStyles.flipCardFront}
          style={{
            // The gradient overlay is applied on top of the theme-aware background
            backgroundImage: `linear-gradient(rgba(30,30,30,0.8), rgba(30,30,30,0.9)), url("${project.imageUrl}")`,
          }}
        >
          <span className={cStyles.cardTag}>{project.tag}</span>
          <h3 className={cStyles.cardTitleFront}>{project.title}</h3>
        </div>

        {/* --- Card Back --- */}
        <div className={cStyles.flipCardBack}>
          <h4 className={cStyles.cardTitleBack}>{project.title.split(':')[0]}</h4>
          <p className={cStyles.cardDescription}>{project.description}</p>
          
          <div>
            <h5 className={cStyles.cardToolsHeading}>Methodologies & Tools</h5>
            <div className={cStyles.cardToolsPills}>
              {project.methodologies.map(tool => (
                <span key={tool} className={cStyles.cardToolPill}>{tool}</span>
              ))}
            </div>
          </div>

          <div className={cStyles.cardLinks}>
            {project.links.map(link => (
              <a key={link.label} href={link.url} className={cStyles.cardLinkButton}>
                <span className="material-symbols-outlined">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;