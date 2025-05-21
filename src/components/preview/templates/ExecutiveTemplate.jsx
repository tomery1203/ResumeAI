import React from "react";

export default function ExecutiveTemplate({ data }) {
  return (
    <div className="font-serif p-10 text-gray-800 min-h-full">
      {/* Header */}
      <header className="text-center mb-8 border-b border-gray-300 pb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">{data.personal_info.full_name || "Your Name"}</h1>
        <h2 className="text-lg text-gray-600 mb-4">{data.title || "Executive Professional"}</h2>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
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
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 uppercase">Executive Summary</h2>
          <p className="text-base leading-relaxed">{data.personal_info.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {data.work_experience && data.work_experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4 uppercase">Professional Experience</h2>
          
          <div className="space-y-6">
            {data.work_experience.map((job, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <div>
                    <h3 className="text-base font-bold uppercase">{job.company}</h3>
                    <h4 className="text-base italic">{job.position}</h4>
                  </div>
                  <div className="text-sm font-medium">
                    {job.start_date} - {job.current ? "Present" : job.end_date}
                  </div>
                </div>
                
                {job.location && (
                  <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                )}
                
                {job.description && (
                  <p className="text-sm mb-3">{job.description}</p>
                )}
                
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="text-sm list-disc pl-5 space-y-1">
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
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4 uppercase">Education</h2>
          
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                  <div>
                    <h3 className="text-base font-bold">{edu.institution}</h3>
                    <h4 className="text-base">{edu.degree}{edu.field_of_study ? `, ${edu.field_of_study}` : ""}</h4>
                  </div>
                  <div className="text-sm font-medium">
                    {edu.start_date} - {edu.current ? "Present" : edu.end_date}
                  </div>
                </div>
                
                {edu.location && (
                  <p className="text-sm text-gray-600 mb-2">{edu.location}</p>
                )}
                
                {edu.description && (
                  <p className="text-sm mb-2">{edu.description}</p>
                )}
                
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="text-sm list-disc pl-5 space-y-1">
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
      
      {/* Skills section */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 uppercase">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-sm">
                • {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Two column layout for additional sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 uppercase">Certifications</h2>
            <div className="space-y-3">
              {data.certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-gray-600">
                    {cert.issuer}{cert.date ? `, ${cert.date}` : ""}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3 uppercase">Languages</h2>
            <div className="space-y-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{lang.language}:</span> {getProficiencyLabel(lang.proficiency)}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Projects - if applicable */}
      {data.projects && data.projects.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-4 uppercase">Notable Projects</h2>
          
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="text-base font-bold">{project.name}</h3>
                
                {(project.start_date || project.end_date) && (
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {project.start_date} {project.end_date && `- ${project.end_date}`}
                  </div>
                )}
                
                {project.description && (
                  <p className="text-sm mb-2">{project.description}</p>
                )}
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="text-sm mb-1">
                    <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
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
    elementary: "Basic Proficiency",
    limited_working: "Working Proficiency",
    professional_working: "Professional Proficiency",
    full_professional: "Full Professional Proficiency",
    native: "Native or Bilingual Proficiency"
  };
  return labels[proficiency] || proficiency;
}