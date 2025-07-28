"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ReservationSchema,
  type Reservation,
  interestOptions,
  type Interest,
} from "@/lib/schemas";

export default function ReservePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // React Hook Formでフォーム管理とバリデーションを設定
  const form = useForm({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      name: "",
      email: "",
      interests: [],
    },
  });

  /**
   * フォーム送信処理
   *
   * APIエンドポイントへのデータ送信、ローカルストレージへの保存、
   * 管理画面用の通知データ作成を行います。
   */
  const onSubmit = async (data: Reservation) => {
    setIsLoading(true);

    try {
      // 予約APIエンドポイントにデータを送信
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit reservation");
      }

      // 管理画面での表示用にローカルストレージに予約データを保存
      const reservations = JSON.parse(
        localStorage.getItem("reservations") || "[]"
      );
      const newReservation = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      reservations.push(newReservation);
      localStorage.setItem("reservations", JSON.stringify(reservations));

      // 管理画面の通知用データも作成・保存
      const notifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );
      const newNotification = {
        id: Date.now().toString(),
        type: "new_registration",
        title: "新規登録",
        message: `${data.name}さんが事前登録しました`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      notifications.unshift(newNotification); // 新しい通知を先頭に追加
      localStorage.setItem("notifications", JSON.stringify(notifications));

      toast.success("登録完了！", {
        description: "事前登録が完了しました。確認メールをご確認ください。",
      });

      router.push("/confirmation");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("エラー", {
        description: "登録中にエラーが発生しました。もう一度お試しください。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* ナビゲーション */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-slate-400" />
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-white">
                もくもくReact
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            もくもくReactに事前登録する
          </h1>
          <p className="text-slate-300">
            ウェイティングリストに登録し、先行アクセス権とお知らせを受け取りましょう。
          </p>
        </div>

        {/* 登録フォーム */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">登録情報</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* 名前入力フィールド */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="name" className="text-slate-200">お名前</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          {...field}
                          placeholder="山田 太郎"
                          className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* メールアドレス入力フィールド */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="email" className="text-slate-200">メールアドレス</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="メールアドレスを入力"
                          className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 興味のあるサービス選択フィールド */}
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem className="space-y-4 data-[error=true]:text-destructive">
                      <FormLabel className="text-slate-200">興味のあるサービス</FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          {Object.entries(interestOptions).map(([idString, label]) => {
                            const id = idString as Interest;
                            return (
                              <FormItem
                                key={id}
                                className="flex items-center space-x-3"
                              >
                                <FormControl>
                                  <Checkbox
                                    id={id}
                                    checked={field.value.includes(id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, id])
                                        : field.onChange(field.value.filter((value) => value !== id))
                                    }}
                                    className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor={id}
                                  className="text-slate-300 cursor-pointer"
                                >
                                  {label}
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 送信ボタン */}
                <Button
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-80 text-lg py-3 rounded-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      処理中...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      事前登録する
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
