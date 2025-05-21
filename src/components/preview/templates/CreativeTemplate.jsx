import React from "react";

export default function CreativeTemplate({ data }) {
  const accentColor = "bg-purple-600";
  const accentTextColor = "text-purple-600";
  const lightAccentColor = "bg-purple-100";
  
  return (
    <div className="font-sans text-gray-800 min-h-full">
      {/* Header with accent color */}
      <header className={`${accentColor} text-white p-8`}>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{data.personal_info.full_name || "Your Name"}</h1>
          <h2 className="text-xl mb-4 opacity-90">{data.title || "Your Professional Title"}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm mt-6">
            {data.personal_info.email && (
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info.phone && (
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info.location && (
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info.linkedin && (
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info.website && (
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" x2="22" y1="12" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>{data.personal_info.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="p-8 max-w-5xl mx-auto">
        {/* Summary */}
        {data.personal_info.summary && (
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <div className={`h-6 w-6 rounded-full ${accentColor} mr-2`}></div>
              <h2 className="text-xl font-bold">About Me</h2>
            </div>
            <p className="text-base leading-relaxed">{data.personal_info.summary}</p>
          </section>
        )}
        
        {/* Two column layout for the rest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-10">
            {/* Experience */}
            {data.work_experience && data.work_experience.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className={`h-6 w-6 rounded-full ${accentColor} mr-2`}></div>
                  <h2 className="text-xl font-bold">Work Experience</h2>
                </div>
                
                <div className="space-y-8">
                  {data.work_experience.map((job, index) => (
                    <div key={index} className="relative">
                      <div className={`absolute top-0 left-0 w-1 h-full ${lightAccentColor} rounded-full`}></div>
                      <div className="pl-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <h3 className="text-lg font-bold">{job.position}</h3>
                          <div className={`text-sm ${accentTextColor} font-medium mb-1 md:mb-0`}>
                            {job.start_date} - {job.current ? "Present" : job.end_date}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{job.company}{job.location ? ` | ${job.location}` : ""}</p>
                        
                        {job.description && (
                          <p className="text-sm mb-3">{job.description}</p>
                        )}
                        
                        {job.achievements && job.achievements.length > 0 && (
                          <ul className="text-sm space-y-1">
                            {job.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className={`${accentTextColor} mr-2`}>●</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className={`h-6 w-6 rounded-full ${accentColor} mr-2`}></div>
                  <h2 className="text-xl font-bold">Education</h2>
                </div>
                
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={index} className="relative">
                      <div className={`absolute top-0 left-0 w-1 h-full ${lightAccentColor} rounded-full`}></div>
                      <div className="pl-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <h3 className="text-lg font-bold">{edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ""}</h3>
                          <div className={`text-sm ${accentTextColor} font-medium mb-1 md:mb-0`}>
                            {edu.start_date} - {edu.current ? "Present" : edu.end_date}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{edu.institution}{edu.location ? ` | ${edu.location}` : ""}</p>
                        
                        {edu.description && (
                          <p className="text-sm mb-3">{edu.description}</p>
                        )}
                        
                        {edu.achievements && edu.achievements.length > 0 && (
                          <ul className="text-sm space-y-1">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <span className={`${accentTextColor} mr-2`}>●</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className={`h-6 w-6 rounded-full ${accentColor} mr-2`}></div>
                  <h2 className="text-xl font-bold">Projects</h2>
                </div>
                
                <div className="space-y-6">
                  {data.projects.map((project, index) => (
                    <div key={index} className={`p-4 rounded-lg ${lightAccentColor}`}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        {(project.start_date || project.end_date) && (
                          <div className="text-sm font-medium">
                            {project.start_date} {project.end_date && `- ${project.end_date}`}
                          </div>
                        )}
                      </div>
                      
                      {project.description && (
                        <p className="text-sm mb-3">{project.description}</p>
                      )}
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-white rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className={`text-sm ${accentTextColor} hover:underline flex items-center gap-1`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                          View Project
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="space-y-10">
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className={`h-6 w-6 rounded-full ${accentColor} mr-2`}></div>
                  <h2 className="text-xl font-bold">Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className={`inline-block text-sm px-3 py-1.5 rounded-full ${getSkillClass(skill.level, accentColor, lightAccentColor)}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
            
            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className={`h-6 w-6 rounded-full ${accentColor} mr-2`}></div>
                  <h2 className="text-xl font-bold">Languages</h2>
                </div>
                <div className="space-y-4">
                  {data.languages.map((lang, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{lang.language}</span>
                        <span className="text-xs">{getProficiencyLabel(lang.proficiency)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`${accentColor} h-1.5 rounded-full`} 
                          style={{ width: getProficiencyPercentage(lang.proficiency) }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className={`h-6 w-6 rounded-full ${accentColor} mr-2`}></div>
                  <h2 className="text-xl font-bold">Certifications</h2>
                </div>
                <div className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className={`p-3 rounded-lg ${lightAccentColor}`}>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-xs flex items-center justify-between mt-1">
                        <span>{cert.issuer}</span>
                        {cert.date && <span>{cert.date}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
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

function getSkillClass(level, accentColor, lightAccentColor) {
  switch (level) {
    case "expert":
      return accentColor + " text-white";
    case "advanced":
      return "bg-opacity-80 " + accentColor + " text-white";
    case "intermediate":
      return lightAccentColor + " text-gray-800";
    case "beginner":
      return "bg-gray-100 text-gray-800";
    default:
      return lightAccentColor + " text-gray-800";
  }
}