import { prisma } from "@/lib/prisma";
import { BuatSuratClient } from "@/app/dashboard/surat/buat/client-form";

export const metadata = {
  title: "Buat Surat | Administrasi Surat Desa",
};

export default async function BuatSuratPage() {
  // Ambil semua data penduduk untuk opsi dropdown (atau search)
  // Dalam production asli, lebih baik pakai API / search berdasar ketikan agar tidak berat,
  // Tapi untuk MVP lokal dengan ribuan data, load semua ke client masih bisa dihandle (atau gunakan search API).
  const penduduk = await prisma.penduduk.findMany({
    where: { status_hidup: "Hidup" },
    select: { id: true, nik: true, nama_lengkap: true, dusun: true },
    orderBy: { nama_lengkap: "asc" }
  });

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
      <div className="px-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Buat Surat Baru</h1>
        <p className="mt-1 text-sm text-slate-500">
          Layanan persuratan digital terpadu Desa Ujungbatu III.
        </p>
      </div>
      
      {/* Client Component untuk interaktif Form & Preview */}
      <BuatSuratClient pendudukList={penduduk} />
    </div>
  );
}
