import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import {
  createAdminNotification,
  createConfirmationEmail,
} from "./_lib/email-templates";
import { reservationSchema } from "@/lib/schemas";

// SendGrid API キーを設定
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/**
 * 事前予約を処理するPOSTエンドポイント
 *
 * リクエストボディから予約情報を受け取り、バリデーション後に
 * 確認メールとユーザーへの確認メールを送信します。
 */
export async function POST(request: NextRequest) {
  try {
    // 必要な環境変数が設定されているかチェック
    if (!process.env.SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY is not set");
      return NextResponse.json(
        { error: "SendGrid API key is not configured" },
        { status: 500 }
      );
    }

    if (!process.env.SENDGRID_FROM_EMAIL) {
      console.error("SENDGRID_FROM_EMAIL is not set");
      return NextResponse.json(
        { error: "SendGrid from email is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Zodスキーマを使用してリクエストデータを検証
    const validationResult = reservationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, interests } = validationResult.data;

    // ユーザー向けの予約確認メールを送信
    const confirmationEmail = createConfirmationEmail(name, interests || []);
    confirmationEmail.to = email;

    await sgMail.send(confirmationEmail);

    // 管理者向けの新規予約通知メールを送信
    const adminNotification = createAdminNotification(
      name,
      email,
      interests || []
    );
    await sgMail.send(adminNotification);

    return NextResponse.json({
      message: "Reservation successful and confirmation email sent",
      data: { name, email, interests },
    });
  } catch (error) {
    console.error("SendGrid Error:", error);

    return NextResponse.json(
      {
        error: "Failed to send confirmation email",
        // 開発環境でのみエラーの詳細を返す
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
