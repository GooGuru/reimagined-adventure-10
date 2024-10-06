const inquirer = require('inquirer');
const fs = require('fs');
const { generateSVG } = require('./lib/generateSVG');

const promptUser = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: (input) => input.length <= 3 || 'Text must be 3 characters or less.'
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):'
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'square', 'triangle']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):'
    }
  ]).then((answers) => {
    const svgContent = generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
    fs.writeFileSync('./examples/logo.svg', svgContent);
    console.log('Generated logo.svg');
  });
};

promptUser();
