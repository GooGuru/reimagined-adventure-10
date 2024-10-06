const { Circle, Triangle, Square } = require('./shapes');

const generateSVG = (text, textColor, shape, shapeColor) => {
  let shapeElement;
  
  switch (shape) {
    case 'circle':
      shapeElement = new Circle(shapeColor).render();
      break;
    case 'square':
      shapeElement = new Square(shapeColor).render();
      break;
    case 'triangle':
      shapeElement = new Triangle(shapeColor).render();
      break;
    default:
      throw new Error('Invalid shape');
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeElement}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;
};

module.exports = { generateSVG };
