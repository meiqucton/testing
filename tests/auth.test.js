const axios = require('axios');
const login = require('../src/auth');

// Mock axios.post
jest.mock('axios');

describe('Đăng nhập', () => {
  it('nên đăng nhập thành công với thông tin đăng nhập đúng', async () => {
    // Mock phản hồi thành công từ API
    axios.post.mockResolvedValue({
      data: { token: 'fake-jwt-token' }
    });

    const username = 'testuser';
    const password = 'password123';
    const result = await login(username, password);

    expect(result.token).toBe('fake-jwt-token');
    expect(axios.post).toHaveBeenCalledWith('https://api.example.com/login', { username, password });
  });

  it('nên ném lỗi khi thông tin đăng nhập không đúng', async () => {
    // Mock phản hồi lỗi từ API (ví dụ: sai mật khẩu)
    axios.post.mockRejectedValue({
      response: { data: { message: 'Thông tin đăng nhập không đúng' } }
    });

    const username = 'testuser';
    const password = 'wrongpassword';
    await expect(login(username, password)).rejects.toThrow('Thông tin đăng nhập không đúng');
  });

  it('nên ném lỗi mạng khi không có kết nối internet', async () => {
    // Mock lỗi không thể kết nối (lỗi mạng)
    axios.post.mockRejectedValue(new Error('Lỗi mạng'));

    const username = 'testuser';
    const password = 'password123';
    await expect(login(username, password)).rejects.toThrow('Lỗi mạng');
  });

  it('nên ném lỗi khi thiếu tên người dùng', async () => {
    const username = '';
    const password = 'password123';
    await expect(login(username, password)).rejects.toThrow('Thiếu tên người dùng');
  });

  it('nên ném lỗi khi thiếu mật khẩu', async () => {
    const username = 'testuser';
    const password = '';
    await expect(login(username, password)).rejects.toThrow('Thiếu mật khẩu');
  });

  it('nên ném lỗi khi server trả về lỗi 500', async () => {
    axios.post.mockRejectedValue({
      response: { status: 500, data: { message: 'Lỗi máy chủ' } }
    });

    const username = 'testuser';
    const password = 'password123';
    await expect(login(username, password)).rejects.toThrow('Lỗi máy chủ');
  });

  it('nên ném lỗi khi API không trả về dữ liệu', async () => {
    axios.post.mockResolvedValue({
      data: {}
    });

    const username = 'testuser';
    const password = 'password123';
    await expect(login(username, password)).rejects.toThrow('Không có dữ liệu trả về');
  });
});
