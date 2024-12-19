// src/index.js
const login = require('./auth');

// Ví dụ gọi hàm đăng nhập
async function main() {
  try {
    const result = await login('testuser', 'password123');
    console.log('Đăng nhập thành công:', result);
  } catch (error) {
    console.error('Lỗi đăng nhập:', error.message);
  }
}

main();
