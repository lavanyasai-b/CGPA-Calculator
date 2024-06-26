document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const totalCourses = document.getElementById('totalCourses').value;
    const courseInputsContainer = document.getElementById('courseInputsContainer');
    courseInputsContainer.innerHTML = '';
    
    for (let i = 0; i < totalCourses; i++) {
        const div = document.createElement('div');
        div.classList.add('course-input');
        div.innerHTML = `
            <label for="courseCode${i}">Course Code:</label>
            <input type="text" id="courseCode${i}" name="courseCode${i}" required>
            <label for="grade${i}">Grade:</label>
            <input type="number" id="grade${i}" name="grade${i}" min="0" max="10" step="0.1" required>
        `;
        courseInputsContainer.appendChild(div);
    }

    document.getElementById('gradesForm').style.display = 'block';
});

document.getElementById('gradesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseCodes = [];
    const grades = [];
    const totalCourses = document.getElementById('totalCourses').value;
    
    for (let i = 0; i < totalCourses; i++) {
        courseCodes.push(document.getElementById(`courseCode${i}`).value);
        grades.push(parseFloat(document.getElementById(`grade${i}`).value));
    }

    calculateCGPA(courseCodes, grades);
});

const courseData = {
    "124BG": 3,
    "124BK": 3,
    "124BL": 3,
    "124BP": 3,
    "12425": 1.5,
    "12426": 1.5,
    "12424": 2,
    "12422": 0
    // Add more courses and their corresponding credit values here
};

function calculateCGPA(courseCodes, grades) {
    let totalCredits = 0;
    let weightedSum = 0;

    for (let i = 0; i < courseCodes.length; i++) {
        const courseCode = courseCodes[i];
        const grade = grades[i];
        const credit = courseData[courseCode];

        if (credit !== undefined) {
            weightedSum += grade * credit;
            totalCredits += credit;
        } else {
            alert(`Course code ${courseCode} not found in the data sheet.`);
            return;
        }
    }

    const cgpa = weightedSum / totalCredits;
    document.getElementById('result').textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
}