// データベースに保存される予約情報の型
export interface Reservation {
  id: string;
  name: string;
  email: string;
  interests: string[];
  createdAt: string;
}

// 管理画面で使用される通知情報の型
export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
