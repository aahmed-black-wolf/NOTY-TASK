# TASKLLIZAI Web Application

## Description

TASKLLIZAI is a web application built using React with React Router, React Icons, Tailwind CSS, Cypress, and other technologies. It allows users to manage tasks, including adding, deleting, recovering, completing, and clearing tasks. The application also utilizes the Context API and LocalStorage API to manage data. Additionally, it provides toast notifications for invalid data inputs or any errors, and it sends reminders before 30 minutes of a task's ending time.

## Features

<table>
  <tr>
    <th>Feature</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>1. Add Task</td>
    <td>Users can add new tasks to the application.</td>
  </tr>
  <tr>
    <td>2. Delete Task with Route Page Recovery</td>
    <td>Users can delete tasks, and the application provides a route page to recover deleted tasks.</td>
  </tr>
  <tr>
    <td>3. Complete Task with Route Page Deletion</td>
    <td>Users can mark tasks as completed, and the application automatically deletes completed tasks and provides a route page to view deleted tasks.</td>
  </tr>
  <tr>
    <td>4. Delete Task</td>
    <td>Users can permanently delete tasks without the option to recover.</td>
  </tr>
  <tr>
    <td>5. Clear Data and Locate All Data</td>
    <td>Users can clear all data and locate all existing tasks.</td>
  </tr>
  <tr>
    <td>6. Data Management with Context API and LocalStorage</td>
    <td>The application utilizes the Context API and LocalStorage API to manage task data.</td>
  </tr>
  <tr>
    <td>7. Toast Notifications</td>
    <td>Users receive toast notifications for invalid data inputs or any errors that occur.</td>
  </tr>
  <tr>
    <td>8. Task Ending Time Notifications</td>
    <td>Users receive notifications before 30 minutes of a task's ending time.</td>
  </tr>
</table>

## Technology

<table>
  <tr>
    <th>Technology</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>React</td>
    <td>JavaScript library for building user interfaces. <img width="30px" height="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React"></td>
  </tr>
  <tr>
    <td>React Router</td>
    <td>Library for handling routing in a React application. <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouterdom/reactrouterdom-plain.svg" alt="React Router"></td>
  </tr>
  <tr>
    <td>Tailwind CSS</td>
    <td>Utility-first CSS framework for rapidly building custom user interfaces. <img width="40px" height="40px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS"></td>
  </tr>
  <tr>
    <td>Cypress</td>
    <td>JavaScript end-to-end testing framework for web applications. <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-plain.svg" alt="Cypress"></td>
  </tr>
<table/>

table>

## Installation and Setup

To set up and run TASKLLIZAI locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/TASKLLIZAI.git`
2. Change to the project directory: `cd TASKLLIZAI`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`

The application will be accessible at `http://localhost:3000` in your browser.

## Testing

To run end-to-end tests using Cypress, execute the following steps:

1. Ensure that the development server is running.
2. Open a new terminal window.
3. Change to the project directory if not already in it: `cd TASKLLIZAI`
4. Run the Cypress tests: `npm run test:e2e`

Cypress will open and execute the tests in a separate window.

## Contributing

Contributions to TASKLLIZAI are welcome! If you find any bugs or have suggestions for additional features, please open an issue or submit a pull request to the repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the code for personal and commercial purposes.

## Acknowledgements

The TASKLLIZAI application was created by **_Abdelrhman Ahmed_**
