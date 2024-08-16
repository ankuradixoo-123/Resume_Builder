import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeTemplate = ({ resumeData }) => {
  const generatePDF = () => {
    const input = document.getElementById('resume-template');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');
    });
  };

  return (
    <div>
      <div id="resume-template">
        <h1>{resumeData.name}</h1>
        <p><strong>Phone:</strong> {resumeData.phone}</p>
        <p><strong>Email:</strong> {resumeData.email}</p>
        <p><strong>City:</strong> {resumeData.city}</p>

        <h2>Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index}>
            <p><strong>College:</strong> {edu.college}</p>
            <p><strong>Course:</strong> {edu.course}</p>
            <p><strong>From:</strong> {edu.from}</p>
            <p><strong>To:</strong> {edu.to}</p>
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
            <p><strong>Organization:</strong> {exp.organization}</p>
            <p><strong>Designation:</strong> {exp.designation}</p>
            <p><strong>Description:</strong> {exp.description}</p>
            <p><strong>From:</strong> {exp.from}</p>
            <p><strong>To:</strong> {exp.to}</p>
          </div>
        ))}

        <h2>Additional Fields</h2>
        {resumeData.additionalFields.map((field, index) => (
          <div key={index}>
            <p><strong>Title:</strong> {field.title}</p>
            <p><strong>Description:</strong> {field.description}</p>
          </div>
        ))}
      </div>
      <button onClick={generatePDF}>Download Resume</button>
    </div>
  );
};

export default ResumeTemplate;
