const fs = require('fs');
const path = require('path');

function getUsers() {
  const filePath = path.join(__dirname, '../data/users.json');
  
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        console.error('Ошибка при чтении файла:', error);
        reject(error);
        return;
      }
      
      try {
        const users = JSON.parse(data);
        resolve(users);
      } catch (parseError) {
        console.error('Ошибка при парсинге JSON:', parseError);
        reject(parseError);
      }
    });
  });
}

module.exports = {
  getUsers
};