"use client";

import { ArrowLeft, Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Notification } from "@/lib/types";

interface AdminNavigationProps {
  notifications: Notification[];
  unreadNotifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

/**
 * 管理画面ナビゲーション
 *
 * 管理画面のヘッダーナビゲーションとして、通知機能とサイトへの
 * 戻りリンクを提供します。通知は未読数の表示と個別・一括既読機能を含みます。
 */
export const AdminNavigation = ({
  notifications,
  unreadNotifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: AdminNavigationProps) => {
  const unreadCount = unreadNotifications.length;

  return (
    <nav className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* メインサイトへの戻りリンク */}
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-slate-400" />
            <span className="text-2xl">🔥</span>
            <span className="text-xl font-bold text-white">
              もくもくReact 管理画面
            </span>
          </Link>

          {/* 通知ドロップダウンメニュー */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-slate-400 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  {/* 未読通知数のバッジ表示 */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80 bg-slate-800 border-slate-700"
                align="end"
              >
                <DropdownMenuLabel className="text-white font-semibold flex justify-between items-center">
                  通知
                  {/* 一括既読ボタン：未読通知がある場合のみ表示 */}
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onMarkAllAsRead}
                      className="text-xs text-slate-400 hover:text-white h-auto p-1"
                    >
                      全て既読
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-400">
                      通知がありません
                    </div>
                  ) : (
                    // 通知一覧：最新10件まで表示して、パフォーマンスを考慮
                    notifications.slice(0, 10).map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`p-3 cursor-pointer hover:bg-slate-700/50 ${
                          !notification.isRead ? "bg-blue-500/10" : ""
                        }`}
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium text-white">
                                {notification.title}
                              </h4>
                              {/* 未読通知インジケーター */}
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-slate-300 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                          {/* 既読通知のチェックマーク */}
                          {notification.isRead && (
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
