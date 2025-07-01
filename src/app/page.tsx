import { ArrowRight, Users, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

/**
 * サービスの主要機能を表現するための特徴データ
 * アイコン、タイトル、説明文をセット化してUIに統一感を持たせる
 */
const features = [
  {
    icon: Zap,
    title: "習慣化チャレンジ",
    description:
      "仲間と一緒に、毎日の積み上げやアウトプットなどを習慣化しましょう。",
  },
  {
    icon: Users,
    title: "仲間との作業通話",
    description: "同じ課題に取り組む仲間と、ボイスチャットで相談できます。",
  },
  {
    icon: Calendar,
    title: "ユーザーイベント",
    description: "ユーザー同士でイベントを開催し、仲間との交流を深めましょう。",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* ナビゲーション */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-white">
                もくもくReact
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                asChild
                variant="ghost"
                className="text-slate-300 hover:opacity-80 rounded-full"
              >
                <Link href="/admin">管理画面</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-80 rounded-full"
              >
                <Link href="/reserve">事前登録する</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
              🚀 近日公開
            </Badge>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              React 学習を
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                もっと楽しく効果的に
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              もくもく React は、作業仲間と繋がるためのプラットフォームです。
              <br />
              モチベーションを維持しながら、React スキルを効率的に習得できます。
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-80 rounded-full text-lg !px-8 !py-6"
            >
              <Link href="/reserve">
                今すぐ事前登録する
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              １人では、どうしてもサボってしまうあなたに。
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl">
              効率的に学び、モチベーションを維持するための仲間と繋がりましょう。
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="aspect-square bg-slate-700/50 border-slate-700 hover:bg-slate-700/70 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center space-y-6">
                  <div className="w-36 h-36 bg-gradient-to-r mx-auto from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl p-12 border border-blue-500/20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              仲間と一緒に学習を加速させましょう。
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              事前登録をすることで、サービス公開時の特別割引と優先アクセス権を入手できます。
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-80 rounded-full text-lg !px-8 !py-6"
            >
              <Link href="/reserve">
                今すぐ事前登録する
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-white">
                もくもくReact
              </span>
            </div>
            <div className="text-slate-400">
              © {new Date().getFullYear()}. Created by @handle.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
