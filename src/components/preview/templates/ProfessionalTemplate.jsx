import React from "react";

export default function ProfessionalTemplate({ data }) {
  return (
    <div className="p-8 text-gray-800 font-sans tracking-normal leading-normal min-h-full">
      {/* Header */}
      <header className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-center mb-1">{data.personal_info.full_name || "Your Name"}</h1>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {data.personal_info.email && (
            <div>{data.personal_info.email}</div>
          )}
          {data.personal_info.phone && (
            <div>{data.personal_info.phone}</div>
          )}
          {data.personal_info.location && (
            <div>{data.personal_info.location}</div>
          )}
          {data.personal_info.linkedin && (
            <div>{data.personal_info.linkedin}</div>
          )}
          {data.personal_info.website && (
            <div>{data.personal_info.website}</div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {data.personal_info.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm">{data.personal_info.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {data.work_experience && data.work_experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-3">WORK EXPERIENCE</h2>
          
          <div className="space-y-4">
            {data.work_experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{job.position}</h3>
                    <h4 className="text-sm">{job.company}{job.location ? `, ${job.location}` : ""}</h4>
                  </div>
                  <div className="text-sm">
                    {job.start_date} - {job.current ? "Present" : job.end_date}
                  </div>
                </div>
                
                {job.description && (
                  <p className="text-sm mt-1">{job.description}</p>
                )}
                
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="text-sm mt-1 list-disc list-inside">
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
          <h2 className="text-lg font-bold border-b pb-1 mb-3">EDUCATION</h2>
          
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ""}</h3>
                    <h4 className="text-sm">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</h4>
                  </div>
                  <div className="text-sm">
                    {edu.start_date} - {edu.current ? "Present" : edu.end_date}
                  </div>
                </div>
                
                {edu.description && (
                  <p className="text-sm mt-1">{edu.description}</p>
                )}
                
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="text-sm mt-1 list-disc list-inside">
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
          <h2 className="text-lg font-bold border-b pb-1 mb-2">SKILLS</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((skill, index) => (
              <span key={index} className="text-sm">
                {skill.name}{index < data.skills.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">LANGUAGES</h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{lang.language}</span>
                <span> ({getProficiencyLabel(lang.proficiency)})</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-2">CERTIFICATIONS</h2>
          <div className="space-y-1">
            {data.certifications.map((cert, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{cert.name}</span>
                {cert.issuer && <span>, {cert.issuer}</span>}
                {cert.date && <span> ({cert.date})</span>}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b pb-1 mb-3">PROJECTS</h2>
          
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base">{project.name}</h3>
                  {(project.start_date || project.end_date) && (
                    <div className="text-sm">
                      {project.start_date} {project.end_date && `- ${project.end_date}`}
                    </div>
                  )}
                </div>
                
                {project.description && (
                  <p className="text-sm mt-1">{project.description}</p>
                )}
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="text-sm mt-1">
                    <span className="font-medium">Technologies: </span>
                    {project.technologies.join(", ")}
                  </div>
                )}
                
                {project.url && (
                  <div className="text-sm mt-1">
                    <span className="font-medium">URL: </span>
                    {project.url}
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