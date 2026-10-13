# Todo App with Priority Levels & LocalStorage

Ứng dụng quản lý công việc (Todo App) hiện đại, hỗ trợ phân loại mức độ ưu tiên (High/Medium/Low), lọc thông minh và tự động lưu trữ dữ liệu vào trình duyệt (`localStorage`).

## Tính năng nổi bật
- **Phân loại ưu tiên**: Gán mức độ Cao (High), Trung bình (Medium), Thấp (Low) cho từng công việc.
- **Bộ lọc thông minh**: Lọc nhanh theo mức độ ưu tiên hoặc trạng thái hoàn thành.
- **Lưu trữ bền vững**: Tự động đồng bộ hóa danh sách công việc vào `localStorage`.
- **Giao diện Responsive**: Hiển thị tối ưu trên cả máy tính và thiết bị di động.

## Hướng dẫn cài đặt & Chạy ứng dụng

1. **Cài đặt các thư viện phụ thuộc**:
   ```bash
   npm install
   ```

2. **Khởi chạy Server**:
   ```bash
   npm start
   ```
   Truy cập ứng dụng tại địa chỉ: `http://localhost:3000`

3. **Chạy bộ kiểm thử tự động (Playwright)**:
   ```bash
   npx playwright install
   npm test
   ```