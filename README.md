# web-nhom4

Repo bài tập nhóm môn Phát triển Web - **Nhóm 4**: Đức, Diệp, Phương.

## Bài 1: Calculator

Xây dựng một ứng dụng máy tính cầm tay chạy trên trình duyệt.

- **Công nghệ:** HTML, CSS, JavaScript thuần + Bootstrap 5.3.8 (nhúng qua CDN)
- **Chạy thử:** mở `calculator/index.html` bằng trình duyệt, hoặc dùng extension **Live Server** trong VS Code

### Cấu trúc thư mục

```
calculator/
├── index.html          cấu trúc trang: màn hình, các nút bấm (dùng class Bootstrap)
├── css/
│   └── style.css       CSS riêng, chỉ những gì Bootstrap không có sẵn
└── js/
    ├── calculator.js   logic tính toán, không thao tác giao diện
    └── app.js          bắt sự kiện click/bàn phím, nối giao diện với logic
```

### Phân công

| Thành viên | Phụ trách | File | Nhánh |
|---|---|---|---|
| Đức (trưởng nhóm) | Logic tính toán; review và merge Pull Request | `js/calculator.js` | `feature/logic` |
| Diệp | Giao diện bằng Bootstrap; lịch sử phép tính; chế độ sáng/tối | `index.html`, `css/style.css` | `feature/ui` |
| Phương | Bắt sự kiện click và bàn phím; định dạng số hiển thị; cập nhật README | `js/app.js`, `README.md` | `feature/events` |

### Yêu cầu chức năng

- Bốn phép tính `+ − × ÷`, số thập phân, `%`, đổi dấu `±`, xoá `AC`
- Dùng được bằng chuột và bàn phím
- Hiển thị tốt trên cả máy tính và điện thoại
- Lịch sử các phép tính đã làm
- Chế độ sáng/tối

### Quy trình làm việc với Git

```bash
# Lần đầu
git clone https://github.com/taminhduc987/web-nhom4.git
cd web-nhom4
git checkout -b feature/ui          # thay bằng nhánh của mình

# Mỗi lần làm xong một phần
git add .
git commit -m "feat: mô tả ngắn"
git push -u origin feature/ui
```

Sau khi push, lên GitHub mở **Pull Request** vào `main`. Cần ít nhất 1 thành viên khác duyệt mới được merge.

Quy ước:
- Không push thẳng vào `main`.
- Đầu mỗi buổi làm, lấy code mới nhất: `git checkout main && git pull`, rồi quay lại nhánh của mình và `git merge main`.
- Tiền tố commit: `feat:` tính năng mới, `fix:` sửa lỗi, `style:` giao diện, `docs:` tài liệu.
- Ai muốn đổi tên hàm hoặc cách đặt `id`/`class` mà người khác đang dùng thì báo cả nhóm trước.

### Checklist kiểm tra trước khi nộp

- [ ] `0.1 + 0.2` ra `0.3`
- [ ] Chia cho 0 báo lỗi, không hiện `Infinity`
- [ ] Bấm `=` nhiều lần liên tiếp không lỗi
- [ ] Không nhập được hai dấu `.` trong một số
- [ ] Số rất dài không làm vỡ giao diện
- [ ] Dùng được bằng bàn phím
- [ ] Hiển thị tốt trên điện thoại
- [ ] Lịch sử và chế độ sáng/tối hoạt động
