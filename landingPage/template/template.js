document.addEventListener("DOMContentLoaded", () => {
    const MAX_TEXT_LENGTH = 100;

    let resumeData = {
        name: "Jon Doe",
        jobTitle: "Computer Engineering Student",
        phone: "2222222222",
        email: "example@gmail.com",
        github: "github.com",
        linkedin: "linkedin.com/in",
        aboutMe: "I am a self-taught developer with experience in various technologies.",
        education: ["Ilia State University | 2024 - 2028"],
        workExperience: [
            "Assisted in setting up and managing network devices and ensuring system reliability.",
            "Worked on small-scale web development projects using React and Node.js."
        ],
        certifications: [
            "Google IT Support Professional Certificate",
            "Introduction to Cybersecurity - Cisco Networking Academy"
        ],
        skills: ["HTML", "CSS", "JavaScript"],
        languages: ["English", "Georgian"],
        image: null,
    };




    const enforceTextLimit = (element) => {
        element.addEventListener("input", () => {
            if (element.innerText.length > MAX_TEXT_LENGTH) {
                element.innerText = element.innerText.slice(0, MAX_TEXT_LENGTH);
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(element);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        });
    };

    const updateResumeDisplay = () => {
      document.querySelector('[data-key="name"]').innerText = resumeData.name;
        document.querySelector('[data-key="jobTitle"]').innerText = resumeData.jobTitle;
        document.querySelector('[data-key="phone"]').innerText = `Phone: ${resumeData.phone}`;
        document.querySelector('[data-key="email"]').innerHTML = `Email: <a href="mailto:${resumeData.email}">${resumeData.email}</a>`;
        document.querySelector('[data-key="github"]').innerHTML = `GitHub: <a href="https://github.com/${resumeData.github}">${resumeData.github}</a>`;
        document.querySelector('[data-key="linkedin"]').innerHTML = `LinkedIn: <a href="https://www.linkedin.com/in/${resumeData.linkedin}/">${resumeData.linkedin}</a>`;
        document.querySelector('[data-key="aboutMe"]').innerText = resumeData.aboutMe;

        // Update work experience
        const workExperienceContainer = document.querySelector('[data-key="workExperience"]');
        workExperienceContainer.innerHTML = '';
        resumeData.workExperience.forEach((work, index) => {
            const workItem = document.createElement('li');
            workItem.classList.add('editable');
            workItem.setAttribute('contenteditable', 'true');
            workItem.innerText = work;
            enforceTextLimit(workItem);

            workItem.addEventListener('input', () => {
                resumeData.workExperience[index] = workItem.innerText.trim();
            });

            workItem.addEventListener('blur', () => {
                if (workItem.innerText.trim() === '') {
                    workItem.remove();
                    resumeData.workExperience.splice(index, 1);
                }
            });

            workExperienceContainer.appendChild(workItem);
        });


        const educationContainer = document.querySelector('[data-key="education"]');
        educationContainer.innerHTML = '';
        resumeData.education.forEach((education, index) => {
            const educationItem = document.createElement('li');
            educationItem.classList.add('editable');
            educationItem.setAttribute('contenteditable', 'true');
            educationItem.innerText = education;
            enforceTextLimit(educationItem);

            educationItem.addEventListener('input', () => {
                resumeData.education[index] = educationItem.innerText.trim();
            });

            // Remove on blur if empty
            educationItem.addEventListener('blur', () => {
                if (educationItem.innerText.trim() === '') {
                    educationItem.remove();
                    resumeData.education.splice(index, 1);
                }
            });

            educationContainer.appendChild(educationItem);
        });

        // Update certifications
        const certificationsContainer = document.querySelector('[data-key="certifications"]');
        certificationsContainer.innerHTML = '';
        resumeData.certifications.forEach((cert, index) => {
            const certItem = document.createElement('li');
            certItem.setAttribute('contenteditable', 'true');
            certItem.classList.add('editable');
            certItem.innerText = cert;

            enforceTextLimit(certItem);

            certItem.addEventListener('input', () => {
                resumeData.certifications[index] = certItem.innerText.trim();
            });

            // Remove on blur if empty
            certItem.addEventListener('blur', () => {
                if (certItem.innerText.trim() === '') {
                    certItem.remove();
                    resumeData.certifications.splice(index, 1);
                }
            });

            certificationsContainer.appendChild(certItem);
        });

        // Update skills
        const skillsContainer = document.querySelector('[data-key="skills"]');
        skillsContainer.innerHTML = '';
        resumeData.skills.forEach((skill, index) => {
            const skillItem = document.createElement('span');
            skillItem.setAttribute('contenteditable', 'true');
            skillItem.innerText = skill;
            enforceTextLimit(skillItem);

            skillItem.addEventListener('input', () => {
                resumeData.skills[index] = skillItem.innerText.trim();
            });

            skillItem.addEventListener('blur', () => {
                if (skillItem.innerText.trim() === '') {
                    skillItem.remove();
                    resumeData.skills.splice(index, 1);
                }
            });

            skillsContainer.appendChild(skillItem);
        });

        // Update languages
        const languagesContainer = document.querySelector('[data-key="languages"]');
        languagesContainer.innerHTML = '';
        resumeData.languages.forEach((language, index) => {
            const languageItem = document.createElement('span');
            languageItem.setAttribute('contenteditable', 'true');
            languageItem.innerText = language;
            enforceTextLimit(languageItem);

            languageItem.addEventListener('input', () => {
                resumeData.languages[index] = languageItem.innerText.trim();
            });

            languagesContainer.appendChild(languageItem);
        });
    };

    // Adding new work experience
    document.querySelector('#addWork').addEventListener('click', function () {
        const workExperienceContainer = document.querySelector('[data-key="workExperience"]');
        const newWorkItem = document.createElement('li');
        newWorkItem.classList.add('editable');
        newWorkItem.setAttribute('contenteditable', 'true');
        newWorkItem.innerText = 'New Work Experience';
        enforceTextLimit(newWorkItem);

        resumeData.workExperience.push(newWorkItem.innerText.trim());

        newWorkItem.addEventListener('input', () => {
            const index = Array.from(workExperienceContainer.children).indexOf(newWorkItem);
            resumeData.workExperience[index] = newWorkItem.innerText.trim();
        });

        // Remove on blur if empty
        newWorkItem.addEventListener('blur', () => {
            if (newWorkItem.innerText.trim() === '') {
                const index = Array.from(workExperienceContainer.children).indexOf(newWorkItem);
                resumeData.workExperience.splice(index, 1);
                newWorkItem.remove();
            }
        });

        workExperienceContainer.appendChild(newWorkItem);
    });

    // add new Education
    document.querySelector('#addEducation').addEventListener('click', function () {
        console.log('click')
        const educationContainer = document.querySelector('[data-key="education"]');
        const newEducationItem = document.createElement('li');
        newEducationItem.classList.add('editable');
        newEducationItem.setAttribute('contenteditable', 'true');
        newEducationItem.innerText = 'New Education';
        enforceTextLimit(newEducationItem);

        resumeData.education.push(newEducationItem.innerText.trim());

        newEducationItem.addEventListener('input', () => {
            const index = Array.from(educationContainer.children).indexOf(newEducationItem);
            resumeData.education[index] = newEducationItem.innerText.trim();
        });

        // Remove on blur if empty
        newEducationItem.addEventListener('blur', () => {
            if (newEducationItem.innerText.trim() === '') {
                const index = Array.from(educationContainer.children).indexOf(newEducationItem);
                resumeData.education.splice(index, 1);
                newEducationItem.remove();
            }
        });

        educationContainer.appendChild(newEducationItem);
    });

    // Adding new certification
    document.querySelector('#addCertification').addEventListener('click', function () {
        const certificationsContainer = document.querySelector('[data-key="certifications"]');
        const newCertItem = document.createElement('li');
        newCertItem.setAttribute('contenteditable', 'true');
        newCertItem.innerText = 'New Certification';
        enforceTextLimit(newCertItem);

        resumeData.certifications.push(newCertItem.innerText.trim());

        newCertItem.addEventListener('input', () => {
            const index = Array.from(certificationsContainer.children).indexOf(newCertItem);
            resumeData.certifications[index] = newCertItem.innerText.trim();
        });

        // Remove on blur if empty
        newCertItem.addEventListener('blur', () => {
            if (newCertItem.innerText.trim() === '') {
                const index = Array.from(certificationsContainer.children).indexOf(newCertItem);
                resumeData.certifications.splice(index, 1);
                newCertItem.remove();
            }
        });

        certificationsContainer.appendChild(newCertItem);
    });

    // Adding new skill
    document.querySelector('#addSkill').addEventListener('click', function () {
        console.log('clicked');
        
        const skillsContainer = document.querySelector('[data-key="skills"]');
        const newSkillItem = document.createElement('span');
        newSkillItem.setAttribute('contenteditable', 'true');
        newSkillItem.classList.add('skillitem')
        newSkillItem.innerText = 'New Skill';

        enforceTextLimit(newSkillItem);

        resumeData.skills.push(newSkillItem.innerText.trim());

        newSkillItem.addEventListener('input', () => {
            const index = Array.from(skillsContainer.children).indexOf(newSkillItem);
            resumeData.skills[index] = newSkillItem.innerText.trim();
        });
        console.log(resumeData);
        

        newSkillItem.addEventListener('blur', () => {
            if (newSkillItem.innerText.trim() === '') {
                const index = Array.from(skillsContainer.children).indexOf(newSkillItem);
                resumeData.skills.splice(index, 1);
                newSkillItem.remove();
            }
        });

        skillsContainer.appendChild(newSkillItem);
    });

    // Adding new language
    document.querySelector('#addLanguage').addEventListener('click', function () {
        const languagesContainer = document.querySelector('[data-key="languages"]');
        const newLanguageItem = document.createElement('span');
        newLanguageItem.setAttribute('contenteditable', 'true');
        newLanguageItem.classList.add('sideeditable')
        newLanguageItem.innerText = 'New Language';
        enforceTextLimit(newLanguageItem);

        resumeData.languages.push(newLanguageItem.innerText.trim());

        newLanguageItem.addEventListener('input', () => {
            const index = Array.from(languagesContainer.children).indexOf(newLanguageItem);
            resumeData.languages[index] = newLanguageItem.innerText.trim();
        });

        newLanguageItem.addEventListener('blur', () => {
            if (newLanguageItem.innerText.trim() === '') {
                const index = Array.from(languagesContainer.children).indexOf(newLanguageItem);
                resumeData.languages.splice(index, 1);
                newLanguageItem.remove();
            }
        });

        languagesContainer.appendChild(newLanguageItem);
    });
    

    // PDF Download Functionality
    document.querySelector('.pdf-btn').addEventListener('click', function () {
        const resumeContainer = document.querySelector('.resume-container');
        
        // Hide buttons temporarily before screenshot
        document.querySelectorAll('.pdf-btn, #addSkill, #addWork, #addCertification, #addEducation, #addLanguage').forEach(button => {
            button.style.display = 'none';
        });


        html2canvas(resumeContainer).then(canvas => {
            const imageData = canvas.toDataURL('resume/png');  // Change 'image/png' to 'image/jpeg' if needed
            
            const link = document.createElement('a');
            link.href = imageData;
            link.download = 'resume_screenshot.png';
            link.click();

            // Restore buttons after screenshot
            document.querySelectorAll('.pdf-btn, #addSkill, #addWork, #addCertification, #addEducation, #addLanguage').forEach(button => {
                button.style.display = 'block';

            });
        });
    });

    const profileContainer = document.getElementById("profileContainer");
    const imageUpload = document.getElementById("imageUpload");
    const uploadText = document.querySelector('.upload-text');

    // Trigger file input on container click
    profileContainer.addEventListener("click", () => {
        imageUpload.click();
    });

    // Handle file selection and set background image
    imageUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profileContainer.style.backgroundImage = `url(${event.target.result})`;
                if (uploadText) {
                    uploadText.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }
    });

    console.log(resumeData);
    
    updateResumeDisplay();
});

