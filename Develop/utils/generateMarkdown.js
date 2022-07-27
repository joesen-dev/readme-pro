// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(confirmLicense) {
  if (!confirmLicense) {
    return "";
  }

  return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) {
    return "";
  }
  return (this.name =
    'Licensed under the <a href="/microsoft/vscode/blob/main/LICENSE.txt">MIT</a> license.');
}
// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(confirmLicense) {
  if (!confirmLicense) {
    return "";
  }

  return `
  MIT License 
  
  Copyright (c) 2022 Joseph 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.  
   
  `;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(templateData) {
  const { confirmLicense, tableOfContents, license, email } = templateData;
  if (!tableOfContents) {
    return "";
  }
  function myFunction(item, index, arr) {
    arr[index] = item;
  }
  tableOfContents.forEach(myFunction);
  const item = tableOfContents.join(" ").split(" ");
  var item1 = item[0];
  var item2 = item[1];
  var item3 = item[2];

  return `
  # ${templateData.title}
  ${renderLicenseBadge(confirmLicense)}
  ## Description
  ${templateData.description}
  ## Table of Contents
  - ${"[" + item1 + "]" + "(" + "#" + item1.toLowerCase() + ")"}
  - ${"[" + item2 + "]" + "(" + "#" + item2.toLowerCase() + ")"}
  - ${"[" + item3 + "]" + "(" + "#" + item3.toLowerCase() + ")"}
  ## Installation
  ${templateData.installation}
  ## Usage
  ${templateData.usage}
  
  ## License
  ${renderLicenseSection(confirmLicense)}
  ${renderLicenseLink(license)}

  #### Questions
  **How to reach me**
  - <a href="${templateData.github}">Github</a>
  - Email ${templateData.email}
   
  `;
}

module.exports = (templateData) => {
  return `
    ${generateMarkdown(templateData)}
  `;
};
