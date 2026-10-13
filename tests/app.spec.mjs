import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost:3000';

test.describe('Todo App Priority & Filter Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Truy cập trang web trước mỗi test case
    await page.goto(APP_URL);
    // Xóa sạch localStorage để đảm bảo môi trường test sạch
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('SC-01: Thêm công việc mới với các mức độ ưu tiên khác nhau', async ({ page }) => {
    // Thêm công việc High Priority
    await page.fill('#todo-input', 'Nhiệm vụ khẩn cấp');
    await page.selectOption('#priority-select', 'high');
    await page.click('#add-btn');

    // Thêm công việc Low Priority
    await page.fill('#todo-input', 'Nhiệm vụ thong thả');
    await page.selectOption('#priority-select', 'low');
    await page.click('#add-btn');

    // Kiểm tra xem cả 2 đã xuất hiện trong danh sách chưa
    const items = page.locator('#todo-list .todo-item');
    await expect(items).toHaveCount(2);

    // Kiểm tra badge ưu tiên tương ứng
    await expect(page.locator('.priority-badge.high')).toContainText('Cao');
    await expect(page.locator('.priority-badge.low')).toContainText('Thấp');
  });

  test('SC-02: Lọc công việc theo mức độ ưu tiên', async ({ page }) => {
    // Thêm 1 High và 1 Low
    await page.fill('#todo-input', 'Task Cao');
    await page.selectOption('#priority-select', 'high');
    await page.click('#add-btn');

    await page.fill('#todo-input', 'Task Thấp');
    await page.selectOption('#priority-select', 'low');
    await page.click('#add-btn');

    // Click lọc "Cao"
    await page.click('.filter-btn[data-filter="high"]');
    await expect(page.locator('#todo-list .todo-item')).toHaveCount(1);
    await expect(page.locator('.todo-text').first()).toHaveText('Task Cao');

    // Click lọc "Thấp"
    await page.click('.filter-btn[data-filter="low"]');
    await expect(page.locator('#todo-list .todo-item')).toHaveCount(1);
    await expect(page.locator('.todo-text').first()).toHaveText('Task Thấp');
  });

  test('SC-03: Lưu trữ và khôi phục dữ liệu từ localStorage', async ({ page }) => {
    // Thêm công việc
    await page.fill('#todo-input', 'Công việc lưu trữ');
    await page.selectOption('#priority-select', 'medium');
    await page.click('#add-btn');

    // Tải lại trang
    await page.reload();

    // Kiểm tra xem công việc có còn tồn tại không
    await expect(page.locator('.todo-text')).toHaveText('Công việc lưu trữ');
  });
});
```

---