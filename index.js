// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
  // ******************************** User Info **********************************
  {
    type: 'input',
    name: 'github',
    message: 'Please enter your github URL (required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your github URL!');
        return false;
      }
    },
  },
  {
    type: 'input',
    name: 'email',
    message: 'Please enter your email address',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your email address!');
        return false;
      }
    },
  },
  // ********************************  TITLE **********************************
  {
    type: 'input',
    name: 'title',
    message: 'What is you Project Title? (required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your Project name!');
        return false;
      }
    },
  },
  // ******************************** DESCRIPTION **********************************
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description of your project',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your Description!');
        return false;
      }
    },
  },
  // ******************************** INSTALLATION *******************************************
  {
    type: 'confirm',
    name: 'add_Install_Instructions',
    default: 'true',
  },
  {
    type: 'editor',
    name: 'installation',
    message: `What are the steps required to install your project? (required)
          Provide a step-by-step description of how to get the development environment running.
          If you're familiar with markdown, you can enter it into your editor and the program will read it.
          Enter your text, save and close the editor.
          `,
    when: ({ add_Install_Instructions }) => {
      if (add_Install_Instructions) {
        return true;
      } else {
        return false;
      }
    },
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your app installation instructions');
        return false;
      }
    },
  },
  // ******************************** USAGE *******************************************
  {
    type: 'editor',
    name: 'usage',
    message: `Provide instructions and examples for use of your application. (required)
          If you're familiar with markdown, you can enter it into your editor and the program will read it.
          Enter your text, save and close the editor.
          `,
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log(
          'Most High-Quality README File have a Usage section. Please add something to yours!'
        );
        return false;
      }
    },
  },
  // ******************************** SCREENSHOTS *******************************************
  {
    type: 'editor',
    name: 'screenshots',
    message: `Enter the path to your app's screenshots. (required)
          Example: ![alt text](assets/images/screenshot.png).
          If you're familiar with markdown, you can enter it into your editor and the program will read it.
          Enter your text, save and close the editor.
          `,
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log(
          'Most High-Quality README File have a Screenshot section. Please add something to yours!'
        );
        return false;
      }
    },
  },
  // ******************************** LICENSE *******************************************
  {
    type: 'confirm',
    name: 'confirmLicense',
    default: 'true',
  },
  {
    type: 'checkbox',
    name: 'license',
    message: 'Please select a license',
    choices: ['MIT'],
    when: ({ confirmLicense }) => {
      if (confirmLicense) {
        return true;
      } else {
        return false;
      }
    },
    validate: License => {
      if (License.length > 0) {
        return true;
      } else {
        console.log('Please select a license!');
        return false;
      }
    },
  },
  // ******************************** TABLE OF CONTENTS *******************************************
  {
    type: 'checkbox',
    name: 'tableOfContents',
    message: "What's included in your table of contents? (required)",
    choices: ['Installation', 'Usage', 'Screenshots', 'License'],
    validate: tableOfContents => {
      if (tableOfContents.length === 4) {
        return true;
      } else {
        console.log('Selected table of contents');
        return false;
      }
    },
  },
];

/** PROMPT QUESTIONS FUNCTIONS --------------------------------
 **************************************************************************************************/
const promptUser = async readmeData => {
  // let data;
  await inquirer
    .prompt(questions) // ? can i include a forEach loop here
    .then(answers => {
      readmeData = answers;
      if (readmeData) {
        console.log('here is your data', readmeData);
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  return readmeData;
};

// TODO: Create a function to write README file
function writeToFile(readmeData) {
  fs.writeFile('./README.md', generatePage(readmeData), err => {
    if (err) throw error;
    console.log('The file has been successfully written!');
  });
}

// TODO: Create a function to initialize app
function init() {
  console.log(`Hi there!
=========================
`);
  promptUser().then(readmeData => {
    return writeToFile(readmeData);
  });
}
init();
