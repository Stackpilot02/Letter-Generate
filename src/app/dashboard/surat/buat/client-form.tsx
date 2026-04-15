"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Printer, 
  Loader2, 
  CheckCircle2, 
  Search, 
  User, 
  FileEdit, 
  AlertCircle,
  Eye,
  Settings2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  MousePointer2,
  FileCheck2,
  Download
} from "lucide-react";
import { saveSuratAction, getNextNomorSuratAction } from "./actions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PendudukList = {
  id: number;
  nik: string;
  nama_lengkap: string;
  dusun: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: Date | null;
  jenis_kelamin?: string | null;
  pekerjaan?: string | null;
}[];

const JENIS_SURAT = [
  "Surat Keterangan Domisili",
  "Surat Keterangan Tidak Mampu (SKTM)",
  "Surat Keterangan Usaha",
  "Surat Keterangan Kelahiran",
  "Surat Keterangan Kematian",
  "Surat Keterangan Belum Menikah",
  "Surat Pengantar KTP/KK",
  "Surat Keterangan Pindah",
];

export function BuatSuratClient({ pendudukList }: { pendudukList: PendudukList }) {
  const [jenisSurat, setJenisSurat] = useState("");
  const [nikPemilik, setNikPemilik] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const router = useRouter();

  useEffect(() => {
    async function fetchNextNumber() {
      const nextNum = await getNextNomorSuratAction();
      setNomorSurat(nextNum);
    }
    fetchNextNumber();
  }, []);

  const filteredPenduduk = useMemo(() => {
    if (!searchQuery) return [];
    return pendudukList.filter(p => 
      p.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.nik.includes(searchQuery)
    ).slice(0, 5);
  }, [searchQuery, pendudukList]);

  const wargsTerpilih = useMemo(() => 
    pendudukList.find(p => p.nik === nikPemilik), 
  [nikPemilik, pendudukList]);

  const handleSaveAndPrint = async () => {
    if (!jenisSurat || !nikPemilik) return;
    
    setLoading(true);
    try {
      if (!saved) {
        await saveSuratAction({
          nik_pemohon: nikPemilik,
          jenis_surat: jenisSurat,
          keperluan: keperluan || "Mengurus Keperluan Administrasi",
          nomor_surat: nomorSurat,
        });
        setSaved(true);
      }
      setTimeout(() => {
        window.print();
        router.push("/dashboard/surat/arsip");
      }, 1000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndDownloadPDF = async () => {
    if (!jenisSurat || !nikPemilik) return;
    
    setLoading(true);
    try {
      if (!saved) {
        await saveSuratAction({
          nik_pemohon: nikPemilik,
          jenis_surat: jenisSurat,
          keperluan: keperluan || "Mengurus Keperluan Administrasi",
          nomor_surat: nomorSurat,
        });
        setSaved(true);
      }

      // @ts-ignore - html2pdf doesn't have official types out of the box in this setup
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('printable-area');
      
      const opt = {
        margin:       0,
        filename:     `Surat_${wargsTerpilih?.nama_lengkap || 'Warga'}_${nomorSurat.replace(/\//g, '-')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      // We need to temporarily remove the scale transform from the preview so it renders perfectly
      const originalTransform = element?.style.transform;
      if (element) element.style.transform = "scale(1)";

      await html2pdf().set(opt).from(element).save();
      
      if (element && originalTransform) element.style.transform = originalTransform;

      setTimeout(() => {
        router.push("/dashboard/surat/arsip");
      }, 1500);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row flex-1 gap-0 overflow-hidden min-h-0 bg-slate-900 -mx-4 lg:-mx-8">
      {/* Left Panel: Sidebar Editor (Width fixed, modern dark sidebar look) */}
      <div className="w-full lg:w-[450px] flex flex-col bg-slate-950/50 border-r border-slate-800/50 backdrop-blur-3xl overflow-y-auto custom-scrollbar">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                <FileEdit className="w-5 h-5" />
              </div>
              Editor Surat
            </h2>
            <div className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full font-bold border border-emerald-500/20">
              LIVE SYNC
            </div>
          </div>

          {/* Section: Config */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Settings2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Dokumen Basis</span>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[11px] text-slate-500 font-bold uppercase">Template Surat</Label>
                <Select onValueChange={(val) => setJenisSurat(val || "")} value={jenisSurat}>
                  <SelectTrigger className="h-12 bg-slate-900/50 border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800 hover:border-slate-700 transition-all focus:ring-blue-500">
                    <SelectValue placeholder="Pilih Jenis..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-slate-300 rounded-xl">
                    {JENIS_SURAT.map(s => (
                      <SelectItem key={s} value={s} className="hover:bg-slate-800 focus:bg-slate-800 cursor-pointer">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] text-slate-500 font-bold uppercase">Nomor Registrasi</Label>
                <Input 
                  value={nomorSurat} 
                  onChange={e => setNomorSurat(e.target.value)}
                  className="h-12 bg-slate-900/50 border-slate-800 text-slate-200 rounded-xl focus:ring-blue-500 font-mono text-sm"
                  placeholder="Contoh: 140/001/2024"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <User className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Penerima Layanan</span>
              </div>
              
              <div className="space-y-2 relative">
                <Label className="text-[11px] text-slate-500 font-bold uppercase">Cari Warga (Nama/NIK)</Label>
                <div className="relative">
                  <Input 
                    value={wargsTerpilih ? wargsTerpilih.nama_lengkap : searchQuery}
                    onChange={e => {
                      if (wargsTerpilih) {
                        setNikPemilik("");
                        setSearchQuery(e.target.value);
                      } else {
                        setSearchQuery(e.target.value);
                      }
                      setShowSearchDropdown(true);
                    }}
                    onFocus={() => setShowSearchDropdown(true)}
                    className={cn(
                      "h-12 bg-slate-900/50 border-slate-800 text-slate-200 rounded-xl pl-10 transition-all",
                      wargsTerpilih && "border-blue-500/50 bg-blue-500/5 font-bold text-blue-400"
                    )}
                    placeholder="Ketik nama..."
                  />
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                </div>

                {/* Dropdown Results */}
                {showSearchDropdown && searchQuery && !wargsTerpilih && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-800">
                    {filteredPenduduk.map(p => (
                      <div 
                        key={p.nik}
                        onClick={() => {
                          setNikPemilik(p.nik);
                          setShowSearchDropdown(false);
                        }}
                        className="p-4 hover:bg-slate-800 cursor-pointer group"
                      >
                        <div className="text-sm font-bold text-slate-200 group-hover:text-blue-400">{p.nama_lengkap}</div>
                        <div className="text-[10px] text-slate-500 font-mono tracking-tighter">{p.nik} • {p.dusun}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <FileCheck2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Isi Pernyataan</span>
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] text-slate-500 font-bold uppercase">Keperluan Surat</Label>
                <textarea 
                  value={keperluan} 
                  onChange={e => setKeperluan(e.target.value)} 
                  rows={4}
                  className="w-full text-sm p-4 bg-slate-900/50 border border-slate-800 text-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none shadow-inner"
                  placeholder="Contoh: Mengurus Persyaratan CPNS..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Button 
              onClick={handleSaveAndPrint} 
              disabled={!jenisSurat || !nikPemilik || loading}
              className={cn(
                "w-full h-12 font-bold rounded-xl shadow-lg transition-all active:scale-95 gap-2",
                saved 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
              )}
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4 text-white" />
              ) : saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  TERSIPAN & DICETAK
                </>
              ) : (
                <>
                  <Printer className="w-4 h-4" />
                  SIMPAN & CETAK
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleSaveAndDownloadPDF} 
              disabled={!jenisSurat || !nikPemilik || loading}
              variant="outline"
              className={cn(
                "w-full h-12 font-bold rounded-xl transition-all active:scale-95 gap-2 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600"
              )}
            >
              <Download className="w-4 h-4 text-slate-400" />
              SIMPAN & UNDUH PDF
            </Button>

            <p className="text-[10px] text-center text-slate-600 mt-2 font-medium uppercase tracking-widest">
              Gunakan Google Chrome untuk hasil cetak terbaik
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Workstation Canvas (A4 Simulation) */}
      <div className="flex-1 flex flex-col items-center overflow-y-auto custom-scrollbar bg-slate-800/80 relative p-8 lg:p-12">
        {/* Floating Toolbar */}
        <div className="sticky top-0 z-20 mb-10 w-full max-w-[210mm] flex items-center justify-between px-6 py-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl backdrop-saturate-150">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                className="p-1.5 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-bold text-slate-400 w-12 text-center">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
                className="p-1.5 hover:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <button className="flex items-center gap-2 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">
              <Maximize2 className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Focus</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/20 group cursor-default">
                <MousePointer2 className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.1em]">WYSIWYG Mode</span>
             </div>
          </div>
        </div>

        {/* The Paper Component */}
        <div 
          className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition-all duration-300 transform-gpu origin-top flex flex-col pb-20"
          style={{ 
            fontFamily: "'Times New Roman', serif",
            transform: `scale(${zoomLevel/100})`,
            padding: "2.5cm 2cm"
          }}
          id="printable-area"
        >
          {/* Official Letterhead (Refined) */}
          <div className="flex items-start gap-4 border-b-[5px] border-double border-slate-900 pb-2 mb-6 relative">
            <div className="relative w-[85px] h-[95px] flex-shrink-0">
               <Image 
                 src="/logo-daerah.png" 
                 alt="Logo Daerah" 
                 fill
                 unoptimized
                 className="object-contain"
               />
            </div>
            <div className="flex-1 flex flex-col items-center text-center pr-[85px]">
              <h1 className="text-[1.1rem] font-bold uppercase tracking-tight leading-tight">Pemerintah Kabupaten Padang Lawas</h1>
              <h1 className="text-[1.1rem] font-bold uppercase tracking-tight leading-tight">Kecamatan Barumun</h1>
              <h1 className="text-[1.6rem] font-black uppercase tracking-tight leading-none mt-1 mb-1 scale-x-105">Pemerintah Desa Ujungbatu III</h1>
              <p className="text-[0.8rem] font-sans font-medium text-slate-800 tracking-tight italic">Alamat: Jalan Lintas Sumatera, Desa Ujungbatu III, Kode Pos 22763</p>
            </div>
          </div>

          <div className="text-center mt-6 mb-10 group relative">
            <h2 className="text-[1.3rem] font-bold underline uppercase tracking-widest">{jenisSurat || "SURAT KETERANGAN"}</h2>
            <div className="flex items-center justify-center gap-1 mt-1 font-serif text-[1.1rem]">
              <span>Nomor:</span>
              <span 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => setNomorSurat(e.currentTarget.textContent || "")}
                className="focus:outline-none focus:bg-blue-50 px-1 rounded transition-colors border-b border-transparent hover:border-blue-200 cursor-text min-w-[50px]"
              >
                {nomorSurat || ".... / .... / .... / ...." }
              </span>
            </div>
          </div>

          <div className="flex-1 text-[1.15rem] leading-[1.8] text-justify space-y-8">
            <p className="indent-12">Yang bertanda tangan di bawah ini Kepala Desa Ujungbatu III Kecamatan Barumun Kabupaten Padang Lawas, dengan ini menerangkan dengan sebenarnya bahwa warga yang bersangkutan adalah:</p>
            
            <div className="px-12 space-y-4">
              <div className="flex gap-4">
                <span className="w-48 flex-shrink-0">Nama Lengkap</span>
                <span className="font-bold">: {wargsTerpilih?.nama_lengkap || "................................................"}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-48 flex-shrink-0">NIK</span>
                <span className="font-mono">: {wargsTerpilih?.nik || "................................................"}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-48 flex-shrink-0">Tempat, Tanggal Lahir</span>
                <span>: {wargsTerpilih?.tempat_lahir || "............"}, {wargsTerpilih?.tanggal_lahir ? new Date(wargsTerpilih.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "............"}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-48 flex-shrink-0">Jenis Kelamin</span>
                <span>: {wargsTerpilih?.jenis_kelamin || "............"}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-48 flex-shrink-0">Pekerjaan</span>
                <span>: {wargsTerpilih?.pekerjaan || "............"}</span>
              </div>
              <div className="flex gap-4">
                <span className="w-48 flex-shrink-0">Alamat / Dusun</span>
                <span>: Dusun {wargsTerpilih?.dusun || ".............."}, Desa Ujungbatu III</span>
              </div>
            </div>

            <p className="indent-12">
              Adalah benar yang bersangkutan penduduk Desa Ujungbatu III, dan surat keterangan ini diberikan atas dasar permohonan yang bersangkutan guna{" "}
              <strong 
                contentEditable 
                suppressContentEditableWarning
                onBlur={(e) => setKeperluan(e.currentTarget.textContent || "")}
                className="focus:outline-none focus:bg-blue-50 px-1 rounded transition-colors border-b border-black font-serif italic cursor-text min-w-[100px] inline-block"
              >
                {keperluan || "Mengurus Keperluan Administrasi"}
              </strong>.
            </p>
            
            <p className="indent-12">Demikian surat keterangan ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
          </div>

          {/* Footer / Signature Area */}
          <div className="flex justify-between items-end mt-16 px-12">
            <div className="w-[120px] h-[130px] border border-slate-100 flex flex-col items-center justify-center bg-slate-50/50 rounded-lg">
               <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest text-center px-4">Pas Foto 3x4 (Optional)</span>
            </div>
            <div className="text-center min-w-[240px]">
              <p className="mb-0 text-[1.1rem]">Ujungbatu III, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-bold mb-28 uppercase text-[1.1rem] leading-tight">Kepala Desa Ujungbatu III</p>
              <p className="font-bold underline text-[1.2rem] uppercase leading-none">MARDANSYAH HARAHAP</p>
            </div>
          </div>
        </div>

        {/* CSS Magic for Print & UI */}
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body { background: white !important; margin: 0 !important; }
            * { visibility: hidden !important; border-color: black !important; color: black !important; box-shadow: none !important; }
            #printable-area, #printable-area * { visibility: visible !important; }
            #printable-area { 
              position: fixed !important; 
              left: 0 !important; top: 0 !important; 
              width: 210mm !important; 
              height: 297mm !important; 
              padding: 2.5cm !important; 
              margin: 0 !important; 
              transform: scale(1) !important;
              background: white !important;
              border: none !important;
            }
          }
          @page { size: A4; margin: 0; }
          .custom-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        `}} />
      </div>
    </div>
  );
}
