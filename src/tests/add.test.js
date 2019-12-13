const add = (a,b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
  const result = add (4,3);
  expect(result).toBe(7);
});

test('should generate greeting for name', () => {
  const result = generateGreeting('John');
  expect(result).toBe('Hello John!');
});

test('should generate greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Anonymous!');
});




