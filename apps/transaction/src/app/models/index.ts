import { BidvSizeS } from "@bidv-ui/core";

export interface IconLabel {
  name: string;
  class: string;
  key: string;
}

export interface CustomElementOptions {
  size?: BidvSizeS;
  class?: string;
  shape?: string;
  appearance?: string;
  icon?:string
}

export interface CustomElement {
  type: string; // Loại custom element, ví dụ: 'badge', 'button', v.v.
  options?: CustomElementOptions; // Tùy chọn thêm cho custom element
}

export interface SubDetail {
  key: string; // Key để lấy giá trị từ `data`
  label: string; // Nhãn hiển thị
  iconLabel: IconLabel[]; // Danh sách các biểu tượng
  class?: string; // Class CSS bổ sung
  customElement?: CustomElement; // Thẻ HTML tùy chỉnh
}
export interface DetailItem {
  title: string; // Tiêu đề của danh mục
  subDetails: SubDetail[]; // Danh sách các chi tiết con
}
