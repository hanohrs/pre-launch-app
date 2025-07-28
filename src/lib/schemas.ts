import * as z from "zod";

const locale = navigator.languages
  .map((lang) => lang.replaceAll("-", "") as keyof typeof z.locales)
  .find((lang) => z.locales[lang]);

z.config(locale && z.locales[locale]() || z.locales.ja());

/**
 * 興味分野の選択肢定義
 *
 * アプリケーション全体で使用される興味分野の選択肢
 * フォーム表示、バリデーション、管理画面で共通して使用される
 */
export const InterestOptions = z.strictObject({
  habit: "習慣化プログラム",
  work: "作業配信",
  event: "ユーザーイベント",
  content: "学習コンテンツ",
  project: "共同プロジェクト",
});

const InterestEnum = InterestOptions.keyof();

/**
 * 事前登録フォームのバリデーションスキーマ
 *
 * Zodを使用してフォーム入力値の検証ルールを定義
 * フロントエンドとバックエンドで共通して使用される
 */
export const ReservationSchema = z.object({
  name: z.string()
    .min(2)
    .max(50),
  email: z.email(),
  interests: z.array(InterestEnum).nonempty(),
});

// バリデーションスキーマから型を自動生成
export type Interest = z.infer<typeof InterestEnum>;
export type Reservation = z.infer<typeof ReservationSchema>;
