"use client";

/**
 * 管理者向けダッシュボード画面
 *
 * もくもくReactの事前登録者情報を管理・表示するための管理画面です。
 * 統計情報の表示、登録者一覧の表示、通知機能などを提供します。
 */

import { AdminNavigation } from "./_components/admin-navigation";
import { DashboardContent } from "./_components/dashboard-content";
import { useAdminDashboard } from "./_hooks/use-admin-dashboard";

export default function AdminDashboard() {
  const {
    reservations,
    notifications,
    paginatedReservations,
    stats,
    unreadNotifications,
    currentPage,
    totalPages,
    setCurrentPage,
    markNotificationAsRead,
    markAllAsRead,
    getInterestLabel,
  } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminNavigation
        notifications={notifications}
        unreadNotifications={unreadNotifications}
        onMarkAsRead={markNotificationAsRead}
        onMarkAllAsRead={markAllAsRead}
      />

      <DashboardContent
        reservations={reservations}
        paginatedReservations={paginatedReservations}
        stats={stats}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        getInterestLabel={getInterestLabel}
      />
    </div>
  );
}
