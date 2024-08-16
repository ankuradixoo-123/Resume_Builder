import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeTemplate = ({ resumeData }) => {
  const generatePDF = () => {
    const input = document.getElementById('resume-template');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('resume.pdf');
    });
  };

  return (
    <div>
      <div id="resume-template" style={{ padding: '20px' }}>
        <h1>{resumeData.name}</h1>
        <p>Phone: {resumeData.phone}</p>
        <p>Email: {resumeData.email}</p>
        <p>City: {resumeData.city}</p>
        <h2>Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index}>
            <p>College: {edu.college}</p>
            <p>Course: {edu.course}</p>
            <p>From: {edu.from}</p>
            <p>To: {edu.to}</p>
          </div>
        ))}
        <h2>Skills</h2>
        {resumeData.skills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}
        <h2>Languages</h2>
        {resumeData.languages.map((language, index) => (
          <p key={index}>{language}</p>
        ))}
        <h2>Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index}>
            <p>Organization: {exp.organization}</p>
            <p>Designation: {exp.designation}</p>
            <p>Description: {exp.description}</p>
            <p>From: {exp.from}</p>
            <p>To: {exp.to}</p>
          </div>
        ))}
        <h2>Additional Fields</h2>
        {resumeData.additionalFields.map((field, index) => (
          <div key={index}>
            <p>Title: {field.title}</p>
            <p>Description: {field.description}</p>
          </div>
        ))}
      </div>
      <button onClick={generatePDF}>Download Resume</button>
    </div>
  );
};

export default ResumeTemplate;
