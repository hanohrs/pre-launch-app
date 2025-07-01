import { z } from "zod";

/**
 * 事前登録フォームのバリデーションスキーマ
 *
 * Zodを使用してフォーム入力値の検証ルールを定義
 * フロントエンドとバックエンドで共通して使用される
 */
export const reservationSchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .min(2, "お名前は2文字以上で入力してください")
    .max(50, "お名前は50文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  interests: z
    .array(z.string())
    .min(1, "少なくとも1つの興味のある分野を選択してください"),
});

// バリデーションスキーマから型を自動生成
export type ReservationFormData = z.infer<typeof reservationSchema>;

/**
 * 興味分野の選択肢定義
 *
 * アプリケーション全体で使用される興味分野の選択肢
 * フォーム表示、バリデーション、管理画面で共通して使用される
 */
export const interestOptions = [
  { id: "habit", label: "習慣化プログラム" },
  { id: "work", label: "作業配信" },
  { id: "event", label: "ユーザーイベント" },
  { id: "content", label: "学習コンテンツ" },
  { id: "project", label: "共同プロジェクト" },
] as const;
