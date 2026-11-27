# Calculator

Máy tính chạy trên trình duyệt, tính đúng thứ tự ưu tiên phép toán.

**Demo:** https://taminhduc987.github.io/web-nhom4/calculator/

## Tính năng

- Bốn phép tính `+ − × ÷`, nhân chia trước, cộng trừ sau
- Ngoặc lồng nhiều tầng, tự đóng ngoặc khi bấm `=`
- Đổi dấu kiểu Casio với phím `(−)`
- Báo `Lỗi` khi chia cho 0
- Dùng được bằng chuột và bàn phím, hiển thị tốt trên điện thoại

## Công nghệ

HTML, CSS, JavaScript thuần, Bootstrap 5.

## Chạy trên máy

Mở `index.html` bằng trình duyệt, hoặc dùng Live Server trong VS Code.

## Cấu trúc

```
calculator/
├── index.html
├── css/style.css
└── js/
    ├── calculator.js   xử lý nhập liệu và tính toán
    ├── app.js          bắt sự kiện, cập nhật màn hình
    └── thu.js          test
```

## Test

```bash
cd js
node thu.js
```

## Phân công

| Thành viên | Phụ trách |
|---|---|
| Đức | Xử lý tính toán (`calculator.js`) |
| Diệp | Giao diện (`index.html`, `style.css`) |
| Phương | Bắt sự kiện (`app.js`) |

## Quy trình làm việc

Cả nhóm làm trên nhánh `main`, mỗi người chỉ sửa file của mình.

```bash
git pull
git add <file>
git commit -m "feat: mô tả ngắn"
git pull
git push origin main
```

- Luôn `git pull` trước khi làm và trước khi push.
- Tiền tố commit: `feat`, `fix`, `style`, `docs`.
- Muốn đổi tên hàm, `id` hay `data-action` mà file khác đang dùng thì báo cả nhóm trước.
