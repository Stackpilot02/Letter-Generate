import { LoginForm } from "./form";

export const metadata = {
  title: "Login | Administrasi Surat Desa Ujungbatu III",
  description: "Masuk ke sistem administrasi surat Desa Ujungbatu III",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen relative overflow-hidden bg-slate-900">
      {/* Background Gradient & Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[100px]" />
      </div>

      {/* Main Content Area */}
      <div className="flex w-full min-h-screen items-center justify-center p-6 z-10 mx-auto max-w-7xl">
        <div className="flex lg:grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Side: Branding / Info (Hidden on small screens) */}
          <div className="hidden lg:flex flex-col justify-center text-white lg:pr-10 xl:pr-20">
            <div className="mb-0">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-8 border border-white/10">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                Sistem Administrasi <br/> Surat Desa Raya
              </h1>
              <p className="text-lg xl:text-xl text-slate-300 leading-relaxed font-light max-w-xl">
                Layanan persuratan digital terpadu Desa Ujungbatu III untuk menerbitkan dokumen kependudukan secara efisien dan profesional.
              </p>
            </div>

            <div className="mt-14 flex flex-wrap gap-6 text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-3"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span> Sistem Cloud AKTIF</span>
              <span className="flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> Basis Data Aman</span>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="lg:hidden text-center mb-8 text-white">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Desa Ujungbatu III</h1>
              <p className="text-slate-300 mt-2 text-sm">Administrasi Surat Terpadu</p>
            </div>
            <LoginForm />
          </div>

        </div>
      </div>
    </div>
  );
}
