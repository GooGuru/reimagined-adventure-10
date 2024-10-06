const { Circle, Square, Triangle } = require('./shapes');

describe('Shapes', () => {
  test('Circle renders correctly', () => {
    const circle = new Circle('red');
    expect(circle.render()).toBe('<circle cx="150" cy="100" r="80" fill="red" />');
  });

  test('Square renders correctly', () => {
    const square = new Square('blue');
    expect(square.render()).toBe('<rect x="50" y="50" width="200" height="200" fill="blue" />');
  });

  test('Triangle renders correctly', () => {
    const triangle = new Triangle('green');
    expect(triangle.render()).toBe('<polygon points="150,50 250,200 50,200" fill="green" />');
  });
});
