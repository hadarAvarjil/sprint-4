import React, { useState } from 'react'

export function UserSkills({ skills = [], extraSkills }) {
  const [showAllSkills, setShowAllSkills] = useState(false)

  const displayedSkills = skills.slice(0, 5);
  const remainingSkills = skills.length > 5 ? skills.slice(5) : []

  return (
    <div className="user-skills">
      <h2>Skills</h2>
      <div className="skills-list">
        {displayedSkills.map((skill, idx) => (
          <span key={idx} className="skill">
            {skill}
          </span>
        ))}
        {remainingSkills.length > 0 && !showAllSkills && (
          <span
            className="skill more-skills"
            onClick={() => setShowAllSkills(true)}
          >
            +{remainingSkills.length}
          </span>
        )}
        {showAllSkills &&
          remainingSkills.map((skill, idx) => (
            <span key={idx} className="skill">
              {skill}
            </span>
          ))}
      </div>
    </div>
  )
}
