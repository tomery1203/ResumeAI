import React from "react";

export default function MinimalTemplate({ data }) {
  return (
    <div className="p-8 text-gray-800 font-sans tracking-tight min-h-full">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{data.personal_info.full_name || "Your Name"}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {data.personal_info.email && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              {data.personal_info.email}
            </div>
          )}
          {data.personal_info.phone && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              {data.personal_info.phone}
            </div>
          )}
          {data.personal_info.location && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {data.personal_info.location}
            </div>
          )}
          {data.personal_info.linkedin && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              {data.personal_info.linkedin}
            </div>
          )}
          {data.personal_info.website && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" x2="22" y1="12" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              {data.personal_info.website}
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {data.personal_info.summary && (
        <section className="mb-6">
          <p className="text-sm">{data.personal_info.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {data.work_experience && data.work_experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Experience</h2>
          
          <div className="space-y-5">
            {data.work_experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-md">{job.position}</h3>
                    <h4 className="text-sm text-gray-600">{job.company}{job.location ? ` • ${job.location}` : ""}</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    {job.start_date} - {job.current ? "Present" : job.end_date}
                  </div>
                </div>
                
                {job.description && (
                  <p className="text-sm mt-2">{job.description}</p>
                )}
                
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="text-sm mt-2 ml-4 list-disc space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Education</h2>
          
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-md">{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ""}</h3>
                    <h4 className="text-sm text-gray-600">{edu.institution}{edu.location ? ` • ${edu.location}` : ""}</h4>
                  </div>
                  <div className="text-sm text-gray-600">
                    {edu.start_date} - {edu.current ? "Present" : edu.end_date}
                  </div>
                </div>
                
                {edu.description && (
                  <p className="text-sm mt-2">{edu.description}</p>
                )}
                
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="text-sm mt-2 ml-4 list-disc space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index} 
                className="inline-block text-sm px-2 py-1 bg-gray-100 rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{lang.language}</span>
                <span className="text-gray-600"> • {getProficiencyLabel(lang.proficiency)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{cert.name}</span>
                {cert.issuer && <span className="text-gray-600"> • {cert.issuer}</span>}
                {cert.date && <span className="text-gray-600"> • {cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Projects</h2>
          
          <div className="space-y-5">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-md">{project.name}</h3>
                  {(project.start_date || project.end_date) && (
                    <div className="text-sm text-gray-600">
                      {project.start_date} {project.end_date && `- ${project.end_date}`}
                    </div>
                  )}
                </div>
                
                {project.description && (
                  <p className="text-sm mt-2">{project.description}</p>
                )}
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {project.url && (
                  <div className="text-sm mt-2 text-blue-600">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                      Project Link
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function getProficiencyLabel(proficiency) {
  const labels = {
    elementary: "Elementary",
    limited_working: "Limited Working",
    professional_working: "Professional Working",
    full_professional: "Full Professional",
    native: "Native / Bilingual"
  };
  return labels[proficiency] || proficiency;
}