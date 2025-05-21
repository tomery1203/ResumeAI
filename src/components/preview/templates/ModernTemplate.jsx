import React from "react";

export default function ModernTemplate({ data }) {
  return (
    <div className="grid grid-cols-3 gap-6 p-8 text-gray-800 font-sans min-h-full">
      {/* Left sidebar */}
      <div className="col-span-1 bg-gray-50 p-6 rounded-lg">
        {/* Profile */}
        <div className="mb-8 text-center">
          <div className="w-24 h-24 bg-indigo-100 mx-auto rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-indigo-600">
              {data.personal_info.full_name ? data.personal_info.full_name.charAt(0) : "?"}
            </span>
          </div>
          <h1 className="text-xl font-bold">{data.personal_info.full_name || "Your Name"}</h1>
          <p className="text-indigo-600 font-medium mt-1">{data.title || "Professional Title"}</p>
        </div>
        
        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-indigo-600">Contact</h2>
          <div className="space-y-2 text-sm">
            {data.personal_info.email && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info.phone && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info.location && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info.linkedin && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info.website && (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" x2="22" y1="12" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>{data.personal_info.website}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-indigo-600">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="inline-block text-xs px-2 py-1 bg-white rounded border border-gray-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-indigo-600">Languages</h2>
            <div className="space-y-3">
              {data.languages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{lang.language}</span>
                    <span className="text-xs">{getProficiencyLabel(lang.proficiency)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: getProficiencyPercentage(lang.proficiency) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-indigo-600">Certifications</h2>
            <div className="space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{cert.name}</div>
                  <div className="text-xs text-gray-600">
                    {cert.issuer}
                    {cert.date && <span> • {cert.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="col-span-2">
        {/* Summary */}
        {data.personal_info.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-3 pb-1 border-b border-indigo-200 text-indigo-800">PROFILE</h2>
            <p className="text-sm">{data.personal_info.summary}</p>
          </section>
        )}
        
        {/* Experience */}
        {data.work_experience && data.work_experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 pb-1 border-b border-indigo-200 text-indigo-800">WORK EXPERIENCE</h2>
            
            <div className="space-y-6">
              {data.work_experience.map((job, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-indigo-100 ml-2">
                  <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base">{job.position}</h3>
                      <h4 className="text-sm text-indigo-600">{job.company}{job.location ? ` • ${job.location}` : ""}</h4>
                    </div>
                    <div className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                      {job.start_date} - {job.current ? "Present" : job.end_date}
                    </div>
                  </div>
                  
                  {job.description && (
                    <p className="text-sm mt-2">{job.description}</p>
                  )}
                  
                  {job.achievements && job.achievements.length > 0 && (
                    <ul className="text-sm mt-2 space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
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
            <h2 className="text-lg font-bold mb-4 pb-1 border-b border-indigo-200 text-indigo-800">EDUCATION</h2>
            
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="relative pl-4 border-l-2 border-indigo-100 ml-2">
                  <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base">{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ""}</h3>
                      <h4 className="text-sm text-indigo-600">{edu.institution}{edu.location ? ` • ${edu.location}` : ""}</h4>
                    </div>
                    <div className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                      {edu.start_date} - {edu.current ? "Present" : edu.end_date}
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-sm mt-2">{edu.description}</p>
                  )}
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="text-sm mt-2 space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 pb-1 border-b border-indigo-200 text-indigo-800">PROJECTS</h2>
            
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base">{project.name}</h3>
                    {(project.start_date || project.end_date) && (
                      <div className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
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
                        <span key={i} className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-800 rounded-lg">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {project.url && (
                    <div className="text-sm mt-2">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        View Project
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function getProficiencyLabel(proficiency) {
  const labels = {
    elementary: "Basic",
    limited_working: "Conversational",
    professional_working: "Professional",
    full_professional: "Advanced",
    native: "Native"
  };
  return labels[proficiency] || proficiency;
}

function getProficiencyPercentage(proficiency) {
  const percentages = {
    elementary: "20%",
    limited_working: "40%",
    professional_working: "60%",
    full_professional: "80%",
    native: "100%"
  };
  return percentages[proficiency] || "50%";
}