const axios = require('axios');

async function login(username, password) {
  // Kiểm tra thiếu thông tin đăng nhập
  if (!username) {
    throw new Error('Thiếu tên người dùng');
  }
  if (!password) {
    throw new Error('Thiếu mật khẩu');
  }

  try {
    const response = await axios.post('https://api.example.com/login', { username, password });
    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('Không có dữ liệu trả về');
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = login;
