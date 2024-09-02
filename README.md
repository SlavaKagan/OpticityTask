# OpticityTask

## Contact
**Email:** slava.kagan.ht@gmail.com

## General info about the task
**GitHub repository (Forked):** https://github.com/SlavaKagan/OpticityTask <br />

## Backend
**Programming Language:** (Typescript) 5.5 version https://www.typescriptlang.org/ <br />
**Framework:** Express- Node.js web application framework https://expressjs.com/ <br />

## Database
**Database:** (NoSQL)-MongoDB - https://cloud.mongodb.com/ <br />
**Database Name:** OpticityTask <br />
**MONGODB_URI:** MongoDB connection string saved in the .env file <br />
**Database Collection:** tasks <br />

## Frontend
**Programming Language:** (Javascript) ES6 version https://www.javascript.com/ <br />
**Framework:** React 18 version https://react.dev/ <br />

## Abstract

Tasks service. Creation of a list of tasks shown in the table. Access to the list will be password protected,
And the list will be editable according to the requirements below

1. For each saved assignment, it will be possible to create more than one description, so that a "description history" is created per assignment.
2. The assignments will be displayed in the list in descending order according to the order of their entry (ie the assignment entered last will be displayed first). The list will show the last 10 assignments and contain browsing (ie if there are 70 assignments then we will show 7 pages of browsing).
3. An "Edit" button will appear next to each task in the list, which allows editing the name of the task.
4. Clicking on the name of the assignment itself will open a Modal Popup displaying the list of descriptions ("description history") of that assignment. The pop-up will contain a scroll, as long as the list of descriptions is longer than the length of the screen.
5. Next to each description in the description popup, a "trash-can" icon will appear on the left, allowing you to delete the description from the assignment.
6. Above the list of descriptions will appear a "plus" symbol that allows you to add a description that will be associated with the current assignment (the same description will be "added to the history" of the assignment), and in the upper corner an "X" symbol will appear that allows you to close the pop-up.
7. Access to the table / editing will be protected with a permanent name and password: user lstech and password LStech123
8. When someone enters the name and password then they are authorized to access for two hours. Two hours later he was required to retype them. The mechanism must be implemented using a jwt-token (or any other time-limited token) that will be transferred to the API side using the Bearer method in the Headers and will contain a validity.
