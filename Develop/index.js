// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./utils/generateMarkdown");

// TODO: store user input in an Array
const tableOfContentsFilter = [];

// TODO: Create an array of questions for user input
const questions = [
  // ******************************** WHO ARE YOU? **********************************
  {
    type: "input",
    name: "userName",
    message: "Please enter your username (required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your user name!");
        return false;
      }
    },
  },
  // ********************************  TITLE **********************************
  {
    type: "input",
    name: "title",
    message: "What is you Project Title? (required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your Project name!");
        return false;
      }
    },
  },
  // ******************************** DESCRIPTION **********************************
  {
    type: "input",
    name: "description",
    message: "Provide a short description of your project",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your Description!");
        return false;
      }
    },
  },
  // ******************************** INSTALLATION *******************************************
  {
    type: "editor",
    name: "installation",
    message: `What are the steps required to install your project? (required)
          Provide a step-by-step description of how to get the development environment running.
          If you're familiar with markdown, you can enter it into your editor and the program will read it.
          Enter your text, save and close the editor.
          `,
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter your app installation instructions");
        return false;
      }
    },
  },
  // ******************************** USAGE *******************************************
  {
    type: "editor",
    name: "usage",
    message: `Provide instructions and examples for use of your application. (required)
          Include screenshots as needed.
          If you're familiar with markdown, you can enter it into your editor and the program will read it.
          Enter your text, save and close the editor.
          `,
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log(
          "Most High-Quality README File have a Usage section. Please add something to yours!"
        );
        return false;
      }
    },
  },
  // ******************************** LICENSE *******************************************
  //   {},
];

/** PROMPT QUESTIONS FUNCTIONS --------------------------------
 **************************************************************************************************/
// TODO: I would like to filter User's responses to the Table of Contents prompt and have the program only send prompt based on user's table of contents
const promptUserSection1 = async () => {
  let data;
  await inquirer
    .prompt(questions)
    .then((answers) => {
      data = answers;
      if (answers.confirmTableOfContents === false) {
        console.log("No Table of Contents");
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });

  console.log(
    "Hello, " + data.userName + "." + " Here's your answers Object!",
    data
  );
  return data;
};

// TODO: Create a function to write README file
function writeToFile(data) {
  fs.writeFile("../README.md", generatePage(data), (err) => {
    if (err) throw error;
    console.log("The file has been successfully written!");
  });
}

// TODO: Create a function to initialize app
function init() {
  console.log(`Hi there!
=========================
`);
  promptUserSection1().then((data) => {
    console.log("This is the line being printed", data);
    writeToFile(data);
  });
}
init();
