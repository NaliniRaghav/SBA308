README for SBA308

Overview
This project is a JavaScript-based application that processes data from a course, assignment groups, and learner submissions to calculate learners' weighted average scores. The system takes into account late submissions and excludes assignments that are not yet due. The application is built to handle various error scenarios and ensures data integrity.

Project Description
The Script (index308.js file) processes course, assignment, and submission data to calculate a learner's weighted average across multiple assignments. Each learner's average score is calculated by considering the possible points for each assignment and how many points they scored. Additionally, late submissions are penalized by 10%, and assignments not yet due are excluded from the results.

The script returns an array of objects, where each object represents a learner. The object contains:
- The learner's ID.
- Their average weighted score.
- The percentage they scored on each completed assignment.
The index308.html and styles308.css files are used along with index308.js.
Css file is used to style the webpage.

Features
 Course Info Validation: Validates the course data provided.
 Assignment Validation: Checks if assignments belong to the correct course and handles various conditions (e.g., late submissions).
 Error Handling: Handles invalid data gracefully using `try/catch`.
 Score Calculation: Computes the average weighted score of each learner, taking into account late penalties and excluding upcoming assignments.

 Data Format:

The application takes in three types of data objects:

### CourseInfo Object

```javascript
{
  "id": number, // Course ID
  "name": string // Course Name
}
```

### AssignmentGroup Object

```javascript
{
  "id": number, // Assignment Group ID
  "name": string, // Assignment Group Name
  "course_id": number, // Associated Course ID
  "group_weight": number, // Weight of Assignment Group
  "assignments": [AssignmentInfo] // Array of Assignments
}
```

### LearnerSubmission Object

```javascript
{
  "learner_id": number, // Learner's ID
  "assignment_id": number, // ID of the assignment submitted
  "submission": {
    "submitted_at": Date string, // Submission date
    "score": number // Score the learner received
  }
}
```

 How to Run

1. Clone the respository
2. Open the `index308.js` file and run it using any JavaScript environment or your browser's developer console.

3. The script will process the data and output the learners' scores in the desired format.

4. You can modify the input data within the script (i.e., the `CourseInfo`, `AssignmentGroup`, and `LearnerSubmissions` objects) to test different cases.

 
 Data structure :
* A CourseInfo object, which looks like this:
{
"id": number,
"name": string,
}
* An AssignmentGroup object, which looks like this:
{
"id": number,
"name": string,
// the ID of the course the assignment group belongs to
"course_id": number,
// the percentage weight of the entire assignment group
"group_weight": number,
"assignments": [AssignmentInfo],
}
* Each AssignmentInfo object within the assignments array looks like this:
{
"id": number,
"name": string,
// the due date for the assignment
"due_at": Date string,
// the maximum points possible for the assignment
"points_possible": number,
}
* An array of LearnerSubmission objects, which each look like this:
{
"learner_id": number,
"assignment_id": number,
"submission": {
"submitted_at": Date string,
"score": number
}
}
Sample data used from the following site.
 https://codesandbox.io/p/sandbox/sba-308-example-26sg4j

Functions
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
Processes the learner submissions to calculate their scores and averages.
Validates that the AssignmentGroup belongs to the correct course.
Computes scores, applying penalties for late submissions.
Aggregates scores for each learner and calculates their average.
calculateAverage(learner, AssignmentGroup)
Calculates the average score for a learner based on their valid submissions.
displayResults(results, title)
Dynamically displays the results of the data processing on the webpage.
Usage
Valid Data Processing:
Processes the provided CourseInfo, AssignmentGroup, and LearnerSubmissions to calculate and display the results.
Invalid Data Processing:
Handles and displays errors when invalid data is provided, ensuring robust error handling.
Error Handling
If the AssignmentGroup does not match the CourseInfo, or if there are invalid submissions (e.g., non-existent assignments, negative scores), the application will catch these errors and display them on the page.
Output
The results, including the calculated scores and errors, will be displayed in a designated section on the HTML page, providing a clear view of both successful and failed data processing attempts.

The files can be downloaded from 
Github link : https://github.com/NaliniRaghav/SBA308

