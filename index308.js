// Sample Data
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
      { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
      { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
    ]
  };
  
  const LearnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
    { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
    { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
    { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
  ];
  
  // Calculate the average score for each learner
  function calculateAverage(learner, AssignmentGroup) {
    let totalPoints = 0;
    let earnedPoints = 0;
  
    for (let a of AssignmentGroup.assignments) {
      if (learner[a.id] !== undefined) {
        totalPoints += a.points_possible;
        earnedPoints += (learner[a.id] / 100) * a.points_possible;
      }
    }
  
    return (earnedPoints / totalPoints) * 100;
  }
  
  // Function to get learner data
  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    // Validate assignment group course_id
    if (AssignmentGroup.course_id !== CourseInfo.id) {
      throw new Error('AssignmentGroup course_id does not match CourseInfo id.');
    }
  
    let learnerData = [];
  
    LearnerSubmissions.forEach(function (submission) {
      let assignment = AssignmentGroup.assignments.find(function (a) {
        return a.id === submission.assignment_id;
      });
  
      if (!assignment) {
        throw new Error('Assignment with id ' + submission.assignment_id + ' not found.');
      }
  
      // Calculate percentage score
      let score = submission.submission.score;
  
      // Extract the date part (YYYY-MM-DD) from due date and submitted date
      let dueDate = new Date(assignment.due_at).toISOString().split('T')[0];
      let submittedDate = new Date(submission.submission.submitted_at).toISOString().split('T')[0];
      const deductionAmount = assignment.points_possible * 0.1;
  
      // Deduct 10% for late submission if the submitted date is after the due date
      if (submittedDate > dueDate) {
        score -= deductionAmount;
      }
  
      // Ensure score does not go below zero
      if (score < 0) {
        score = 0;
      }
  
      let percentage = (score / assignment.points_possible) * 100;
  
      let learner = learnerData.find(function (l) {
        return l.id === submission.learner_id;
      });
      if (!learner) {
        learner = { id: submission.learner_id, avg: 0 };
        learnerData.push(learner);
      }
  
      // Update learner data
      learner[assignment.id] = percentage;
      learner.avg = calculateAverage(learner, AssignmentGroup);
    });
  
    return learnerData;
  }

  // Display results
  function displayResults(results, title) {
    let output = document.getElementById('output');
    output.innerHTML += '<h2>' + title + '</h2>';
  
    results.forEach(function (learner) {
      let learnerDiv = document.createElement('div');
      learnerDiv.classList.add('learner');
  
      let learnerId = document.createElement('h3');
      learnerId.textContent = 'Learner ID: ' + learner.id;
      learnerDiv.appendChild(learnerId);
  
      let avg = document.createElement('p');
      avg.textContent = 'Average Score: ' + learner.avg.toFixed(2) + '%';
      avg.style.color = 'blue';
      learnerDiv.appendChild(avg);
  
      let assignmentsList = document.createElement('ul');
  
      // Retrieve all keys from the learner object
      let keys = Object.keys(learner);
  
      // Process each key
      keys.forEach(key => {
        switch (key) {
          case 'id':
          case 'avg':
            break; // Skip these keys
          default:
            let listItem = document.createElement('li');
            listItem.textContent = 'Assignment ' + key + ': ' + learner[key].toFixed(2) + '%';
            assignmentsList.appendChild(listItem);
            break; // Continue to the next iteration
        }
      });
  
      learnerDiv.appendChild(assignmentsList);
      output.appendChild(learnerDiv);
    });
  }
  
  // Valid Data
  try {
    let results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    displayResults(results, 'Valid Data');
  } catch (error) {
    document.getElementById('output').innerHTML += '<p>Error with valid data: ' + error.message + '</p>';
  }
  
  // Invalid Data
  const invalidLearnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
    { learner_id: 125, assignment_id: 999, submission: { submitted_at: "2023-02-12", score: 150 } }, // Invalid assignment_id
    { learner_id: 999, assignment_id: 2, submission: { submitted_at: "2023-01-25", score: 400 } }, // Invalid learner_id
    { learner_id: 132, assignment_id: 3, submission: { submitted_at: "2023-01-24", score: 39 } }, // Invalid assignment_id
    { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: -10 } } // Invalid score
  ];
  
  try {
    let invalidResults = getLearnerData(CourseInfo, AssignmentGroup, invalidLearnerSubmissions);
    displayResults(invalidResults, 'Invalid Data');
  } catch (error) {
    document.getElementById('output').innerHTML += '<p class="average">Error with invalid data: ' + error.message + '</p>';
  }
  