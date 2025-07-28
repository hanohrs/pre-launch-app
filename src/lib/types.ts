import { type Reservation } from "@/lib/schemas";

// データベースに保存される予約情報の型
export interface ReservationEntity extends Reservation {
  id: string;
  createdAt: string;
}

// 管理画面で使用される通知情報の型
export interface NotificationEntity {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
