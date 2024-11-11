let students = [];
let skillsArray = [];

for (let z = 0; z < localStorage.length; z++) {
    let key = localStorage.key(z);
    let item = localStorage.getItem(key);

    item = JSON.parse(item);
    students.push(item);
}

class Projects {
    constructor(Title, GithubLink, Skills, RelDate) {
        this.Title = Title;
        this.GithubLink = GithubLink;
        this.Skills = Skills;
        this.RelDate = RelDate;
    }
}

class Student {
    constructor(Name, Surname, E_mail, Phone, Group, Projects = []) {
        this.Name = Name;
        this.Surname = Surname;
        this.E_mail = E_mail;
        this.Phone = Phone;
        this.Group = Group;
        this.Projects = Projects;
    }
}

// Student's info validation
function NextPage(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let group = document.getElementById('group').value;

    if (name === "") {
        alert('Name is required!');
        return false;
    }

    if (surname === "") {
        alert('Surname is required!');
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === "" || !emailPattern.test(email)) {
        alert('Please enter a valid email!');
        return false;
    }

    const phonePattern = /^\+212[0-9]{9}$/;
    if (phone === "" || !phonePattern.test(phone)) {
        alert('Please enter a valid phone number starting with +212');
        return false;
    }

    if (group === "") {
        alert('Please select a group!');
        return false;
    }

    let student = new Student(name, surname, email, phone, group);
    students.push(student);

    // Store the last student under the key "student"
    localStorage.setItem("student", JSON.stringify(student));

    clearStudentInfo();
    window.location.href = "projects.html";
}

// Projects Validation
function ValidateProjectsForm(event) {
    event.preventDefault();

    let title = document.getElementById('title').value;
    let githubLink = document.getElementById('githubLink').value;
    let htmlSkill = document.getElementById('html').checked;
    let cssSkill = document.getElementById('css').checked;
    let javascriptSkill = document.getElementById('javascript').checked;
    let realizationDate = document.getElementById('reldate').value;

    // Adding or removing skills from skillsArray
    if (htmlSkill) {
        if (skillsArray.indexOf("HTML") === -1) {
            skillsArray.push("HTML");
        }
    } else {
        let index = skillsArray.indexOf("HTML");
        if (index !== -1) {
            skillsArray.splice(index, 1);
        }
    }

    if (cssSkill) {
        if (skillsArray.indexOf("CSS") === -1) {
            skillsArray.push("CSS");
        }
    } else {
        let index = skillsArray.indexOf("CSS");
        if (index !== -1) {
            skillsArray.splice(index, 1);
        }
    }

    if (javascriptSkill) {
        if (skillsArray.indexOf("JAVASCRIPT") === -1) {
            skillsArray.push("JAVASCRIPT");
        }
    } else {
        let index = skillsArray.indexOf("JAVASCRIPT");
        if (index !== -1) {
            skillsArray.splice(index, 1);
        }
    }

    if (title === "") {
        alert('Title is required!');
        return false;
    }

    const githubPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (githubLink === "" || !githubPattern.test(githubLink)) {
        alert('Please enter a valid Github link!');
        return false;
    }

    if (skillsArray.length === 0) {
        alert('Please select at least one skill!');
        return false;
    }

    if (realizationDate === "") {
        alert('Realization Date is required!');
        return false;
    }

    // Create a new project and add it to the last student's projects
    let project = new Projects(title, githubLink, skillsArray.join(", "), realizationDate);
    let currentStudent = JSON.parse(localStorage.getItem("student"));
    currentStudent.Projects.push(project);
    localStorage.setItem("student", JSON.stringify(currentStudent));

    clearProjectForm();
    displayProject(project);
}

function displayProject(project) {
    let projectsListDiv = document.querySelector('.projectsList');

    let projectHTML = `
        <div class="project">
            <h3>Title: ${project.Title}</h3>
            <a href="${project.GithubLink}" target="_blank">GitHub Link</a>
            <p>Skills: ${project.Skills}</p>
            <p>Realization Date: ${project.RelDate}</p>
        </div>
    `;

    projectsListDiv.innerHTML += projectHTML;
}

function DoneButton() {
    window.location.href = "portfolio.html";
}

function clearProjectForm() {
    document.getElementById('title').value = '';
    document.getElementById('githubLink').value = '';
    document.getElementById('html').checked = false;
    document.getElementById('css').checked = false;
    document.getElementById('javascript').checked = false;
    document.getElementById('reldate').value = '';
}

function clearStudentInfo() {
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('group').value = '';
}

function displayStudentInfo() {

    let studentsInfoDiv = document.getElementById('StudentDisplay');
    studentsInfoDiv.innerHTML = ''; 

    // Loop through each student in the students array
    for (let i = 0; i < students.length; i++) {
        let student = students[i];

        let studentHTML = `
            <div class="student">
                <h2>${student.Name} ${student.Surname}</h2>
                <p>Email: ${student.E_mail}</p>
                <p>Phone: ${student.Phone}</p>
                <p>Group: ${student.Group}</p>
                <h3>Projects:</h3>
        `;

        // Add each project for the current student
        for (let j = 0; j < student.Projects.length; j++) {
            let project = student.Projects[j];
            studentHTML += `
                <div class="project">
                    <h4>Title: ${project.Title}</h4>
                    <a href="${project.GithubLink}" target="_blank">GitHub Link</a>
                    <p>Skills: ${project.Skills}</p>
                    <p>Realization Date: ${project.RelDate}</p>
                </div>
            `;
        }

        studentHTML += `</div>`; 

        // Append student info to the main container
        studentsInfoDiv.innerHTML += studentHTML;
    }
    
}
displayStudentInfo();