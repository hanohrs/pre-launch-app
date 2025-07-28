"use client";

import { Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Interest } from "@/lib/schemas";
import { type ReservationEntity } from "@/lib/types";

interface DashboardStats {
  total: number;
  thisWeek: number;
  mostPopularInterest?: Interest;
}

interface DashboardContentProps {
  reservations: ReservationEntity[];
  paginatedReservations: ReservationEntity[];
  stats: DashboardStats;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getInterestLabel: (interestId: Interest) => string;
}

/**
 * 管理画面ダッシュボードコンテンツ
 *
 * 事前登録者の統計情報と登録者一覧を表示する管理画面のメインコンテンツです。
 * 統計カード、登録者テーブル、ページネーション機能を提供します。
 */
export const DashboardContent = ({
  reservations,
  paginatedReservations,
  stats,
  currentPage,
  totalPages,
  onPageChange,
  getInterestLabel,
}: DashboardContentProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          管理ダッシュボード
        </h1>
        <p className="text-slate-300">事前登録情報の管理</p>
      </div>

      {/* 統計カード：登録状況を一目で把握できるように3つの重要指標を表示 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* 総登録数 */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              総登録数
            </CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-xs text-slate-400">全期間</p>
          </CardContent>
        </Card>

        {/* 今週の新規登録数 */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              今週の登録
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {stats.thisWeek}
            </div>
            <p className="text-xs text-slate-400">新規登録</p>
          </CardContent>
        </Card>

        {/* 最も人気の興味分野 */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-200">
              人気の分野
            </CardTitle>
            <Badge className="bg-blue-500/20 text-blue-400">人気</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-white">
              {stats.mostPopularInterest && getInterestLabel(stats.mostPopularInterest) || "N/A"}
            </div>
            <p className="text-xs text-slate-400">最も選ばれている</p>
          </CardContent>
        </Card>
      </div>

      {/* 登録者一覧テーブル */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            登録者一覧 ({reservations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-200">名前</TableHead>
                <TableHead className="text-slate-200">メールアドレス</TableHead>
                <TableHead className="text-slate-200">興味のある分野</TableHead>
                <TableHead className="text-slate-200">登録日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReservations.map((reservation) => (
                <TableRow key={reservation.id} className="border-slate-700">
                  <TableCell className="text-white font-medium">
                    {reservation.name}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {reservation.email}
                  </TableCell>
                  <TableCell>
                    {/* 複数の興味分野をバッジで表示 */}
                    <div className="flex flex-wrap gap-1">
                      {reservation.interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-400 text-xs"
                        >
                          {getInterestLabel(interest)}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {new Date(reservation.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ページネーション：大量のデータを効率的に表示するため */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="border-slate-600 text-slate-300"
              >
                前へ
              </Button>
              <span className="text-slate-300">
                {currentPage} / {totalPages} ページ
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  onPageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="border-slate-600 text-slate-300"
              >
                次へ
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
