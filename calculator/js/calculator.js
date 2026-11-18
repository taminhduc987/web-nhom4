/**
 * calculator.js - Logic tính toán (phụ trách: Đức)
 *
 * Quy tắc: KHÔNG thao tác DOM trong file này.
 * app.js chỉ được gọi các phương thức công khai dưới đây ("hợp đồng").
 * Muốn đổi tên/tham số phương thức thì báo cả nhóm trước.
 */
class Calculator {
  constructor() {
    this.history = []; // ví dụ: ['2 + 3 = 5', '10 / 4 = 2.5']
    this.clear();
  }

  /** Nhập một chữ số, digit là chuỗi '0'–'9'. */
  inputDigit(digit) {
    // TODO (Đức)
  }

  /** Nhập dấu thập phân. Bỏ qua nếu số đang nhập đã có dấu '.'. */
  inputDecimal() {
    // TODO (Đức)
  }

  /** Chọn phép tính, op là một trong '+', '-', '*', '/'. */
  setOperator(op) {
    // TODO (Đức)
  }

  /**
   * Bấm '='. Thêm phép tính vào this.history.
   * Chia cho 0 -> hiển thị 'Lỗi' thay vì Infinity.
   * Chú ý sai số số thực: 0.1 + 0.2 phải ra 0.3.
   */
  evaluate() {
    // TODO (Đức)
  }

  /** Chia số hiện tại cho 100. */
  percent() {
    // TODO (Đức)
  }

  /** Đổi dấu số hiện tại. */
  toggleSign() {
    // TODO (Đức)
  }

  /** Xoá toàn bộ (AC). Không xoá lịch sử. */
  clear() {
    this.current = '0';     // số đang nhập / kết quả, dạng chuỗi
    this.previous = null;   // số đứng trước phép tính
    this.operator = null;   // '+', '-', '*', '/' hoặc null
  }

  /** Chuỗi để hiển thị trên màn hình (chưa định dạng dấu phẩy nghìn). */
  getDisplay() {
    return this.current;
  }

  /** Bản sao danh sách lịch sử phép tính. */
  getHistory() {
    return [...this.history];
  }
}
