import Link from "next/link";
import { ArrowRight, Shield, Zap, FileText, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/30">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Desa <span className="text-blue-600">Ujungbatu III</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 active:scale-95"
            >
              Masuk ke Sistem
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[50rem] w-[50rem] rounded-full bg-blue-100/50 blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] h-[40rem] w-[40rem] rounded-full bg-emerald-50/50 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Sistem Digitalisasi Desa Terpadu
          </div>
          
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
            Administrasi Surat <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Lebih Cepat & Efisien
            </span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Platform modern untuk pengelolaan dokumen kependudukan Desa Ujungbatu III. 
            Menerbitkan surat hanya dalam hitungan detik dengan sistem yang aman dan terintegrasi.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 text-lg font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-95 sm:w-auto"
            >
              Mulai Sekarang
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard"
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-8 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 sm:w-auto"
            >
              <LayoutDashboard className="h-5 w-5" />
              Buka Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-24 grid max-w-6xl gap-8 sm:grid-cols-3">
          {[
            {
              title: "Otomatis & Presisi",
              desc: "Generate surat kependudukan secara otomatis dengan format yang standar dan rapi.",
              icon: Zap,
              color: "bg-amber-100 text-amber-600",
            },
            {
              title: "Keamanan Data",
              desc: "Data penduduk tersimpan dengan aman dalam sistem basis data terenkripsi.",
              icon: Shield,
              color: "bg-emerald-100 text-emerald-600",
            },
            {
              title: "Arsip Digital",
              desc: "Simpan dan cari kembali riwayat surat yang pernah dibuat dengan mudah.",
              icon: FileText,
              color: "bg-blue-100 text-blue-600",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="leading-relaxed text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Pemerintah Desa Ujungbatu III. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
