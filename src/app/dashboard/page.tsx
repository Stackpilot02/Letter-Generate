import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { FileText, Users, Clock } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Dashboard | Administrasi Surat Desa Ujungbatu III",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Fetch some stats from database
  const totalPenduduk = await prisma.penduduk.count();
  const totalSurat = await prisma.surat.count();
  
  // Calculate today's letters
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const suratHariIni = await prisma.surat.count({
    where: {
      created_at: {
        gte: today,
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Selamat datang, <span className="font-semibold">{session?.user?.name}</span>. Berikut adalah ringkasan sistem hari ini.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <Card className="relative overflow-hidden border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 rounded-2xl group bg-white border">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.4)] opacity-80 group-hover:opacity-100 transition-opacity"></div>
          
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10 pl-6">
            <CardTitle className="text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors duration-300">Total Penduduk</CardTitle>
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100/50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-2 pb-6 pl-6">
            <div className="text-4xl font-extrabold text-slate-800 tracking-tight">{totalPenduduk}</div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Terdaftar dalam sistem
            </p>
          </CardContent>
        </Card>
        
        {/* Card 2 */}
        <Card className="relative overflow-hidden border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 rounded-2xl group bg-white border">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.4)] opacity-80 group-hover:opacity-100 transition-opacity"></div>
          
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10 pl-6">
            <CardTitle className="text-sm font-medium text-slate-500 group-hover:text-emerald-600 transition-colors duration-300">Total Surat Diterbitkan</CardTitle>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-2 pb-6 pl-6">
            <div className="text-4xl font-extrabold text-slate-800 tracking-tight">{totalSurat}</div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Keseluruhan arsip
            </p>
          </CardContent>
        </Card>
        
        {/* Card 3 */}
        <Card className="relative overflow-hidden border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 rounded-2xl group bg-white border">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.4)] opacity-80 group-hover:opacity-100 transition-opacity"></div>

          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10 pl-6">
            <CardTitle className="text-sm font-medium text-slate-500 group-hover:text-amber-600 transition-colors duration-300">Surat Hari Ini</CardTitle>
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-2 pb-6 pl-6">
            <div className="text-4xl font-extrabold text-slate-800 tracking-tight">{suratHariIni}</div>
            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Dibuat sejak pukul 00:00
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-10">
        {/* Panduan Cepat Card */}
        <Card className="col-span-1 shadow-sm border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 group relative border">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <div className="bg-white/50 backdrop-blur-sm border-b border-slate-100/80 px-6 py-4 relative z-10">
            <CardTitle className="text-lg text-slate-800 font-bold flex items-center gap-2 group-hover:text-blue-600 transition-colors">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              Panduan Cepat
            </CardTitle>
          </div>
          <CardContent className="p-6 space-y-6 relative z-10 bg-white">
            <div className="space-y-3 group/item">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-3">
                <span className="bg-slate-100 text-slate-600 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:scale-110 group-hover/item:shadow-md transition-all duration-300">1</span>
                Mulai Pembuatan Surat
              </h3>
              <div className="pl-10 text-sm text-slate-500 leading-relaxed border-l-2 border-slate-100 ml-3 group-hover/item:border-blue-200 transition-colors duration-300">
                Pilih menu <strong className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-xs mx-1">Buat Surat</strong> di samping kiri. Tentukan jenis template surat dan ketik nama Warga yang dituju. Dokumen PDF akan siap dicetak dalam hitungan detik.
              </div>
            </div>
            <div className="space-y-3 group/item">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-3">
                <span className="bg-slate-100 text-slate-600 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold group-hover/item:bg-emerald-600 group-hover/item:text-white group-hover/item:scale-110 group-hover/item:shadow-md transition-all duration-300">2</span>
                Pencetakan Riwayat Arsip
              </h3>
              <div className="pl-10 text-sm text-slate-500 leading-relaxed border-l-2 border-slate-100 ml-3 group-hover/item:border-emerald-200 transition-colors duration-300">
                Kehilangan surat fisik? Tidak masalah. Seluruh riwayat surat dapat di-download dan diprint ulang kapan saja melalui menu <strong className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-xs mx-1">Arsip Surat</strong>.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
