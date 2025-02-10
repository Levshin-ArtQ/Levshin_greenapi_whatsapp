module.exports = {
  testEnvironment: 'jsdom', // Для тестирования React-компонентов
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Файл с настройками
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Поддержка алиасов (если используете)
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Транспиляция кода
  },
  testPathIgnorePatterns: ['/node_modules/'],
};