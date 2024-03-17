import React from 'react';
import MainLayout from '../Components/MainLayout';
import { styles } from '../styles';

const AboutUsPage = () => {
  // Sample data for project team members
  const projectTeamMembers = [
    { name: 'John Doe', role: 'Frontend Developer', image: 'john-doe.jpg' },
    { name: 'Jane Smith', role: 'Backend Developer', image: 'jane-smith.jpg' },
    { name: 'Emily Johnson', role: 'UI/UX Designer', image: 'emily-johnson.jpg' },
    { name: 'Michael Brown', role: 'Project Manager', image: 'michael-brown.jpg' },
  ];

  return (
    <MainLayout>
        <div className="about-us-page mt-24">
      <h2 className='text-3xl font-bold text-center'>About Us</h2>
      <section className="website-info flex justify-center items-center">
        <div>
        <h3>About our website</h3>
        <p>This website is dedicated to providing valuable information and services to our users.</p>
        <p>Our mission is to [insert mission statement here].</p>
        </div>
      </section>
      <section className="project-team">
        <h3 className={`${styles.sectionHeadText}`}>Project Team</h3>
        <div className="team-members">
          {projectTeamMembers.map((member, index) => (
            <div className="team-member-card" key={index}>
              <img src={member.image} alt={member.name} />
              <div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </MainLayout>
  );
};

export default AboutUsPage;
