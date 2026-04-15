"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileUp, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { importPendudukAction } from "./actions";
import { useRouter } from "next/navigation";

export function ImportButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: number; errors?: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDownloadTemplate = () => {
    const headers = [
      ["Format Import Penduduk (Sesuai Kartu Keluarga)"],
      ["No", "No. KK", "Nama Lengkap", "NIK", "Jenis Kelamin", "Tempat Lahir", "Tanggal Lahir", "Agama", "Pendidikan", "Jenis Pekerjaan", "Status Perkawinan", "Status Hubungan Dalam Keluarga", "Kewarganegaraan", "Ayah", "Ibu"],
      [1, "1234567890123456", "BUDI SANTOSO", "1234567890123456", "Laki-laki", "PADANG LAWAS", "1990-01-01", "ISLAM", "SLTA/SEDERAJAT", "WIRASWASTA", "KAWIN", "KEPALA KELUARGA", "WNI", "AYAH BUDI", "IBU BUDI"]
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(headers);
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Template_Import_Penduduk_KK.xlsx");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        // Skip header lines (first 2 rows)
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }).slice(2) as any[][];

        if (data.length === 0) throw new Error("File kosong atau format salah");

        // Simple validation & mapping
        const residents = data.filter(row => row[1] && row[2] && row[3]).map(row => ({
          no_kk: String(row[1] || ""),
          nama_lengkap: String(row[2] || "").toUpperCase(),
          nik: String(row[3] || ""),
          jenis_kelamin: String(row[4] || "").toUpperCase().startsWith("L") ? "L" : "P",
          tempat_lahir: String(row[5] || ""),
          tanggal_lahir: row[6] ? new Date(row[6]) : null,
          agama: String(row[7] || ""),
          pekerjaan: String(row[9] || ""),
          status_perkawinan: String(row[10] || ""),
        }));

        const res = await importPendudukAction(residents);
        setResult(res);
        if (res.success > 0) {
          router.refresh();
        }
      } catch (err: any) {
        setResult({ success: 0, failed: 0, errors: [err.message] });
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadTemplate}>
          <Download className="w-4 h-4" /> Template
        </Button>
        <Button variant="secondary" className="flex items-center gap-2" onClick={() => setOpen(true)}>
          <FileUp className="w-4 h-4" /> Import Excel
        </Button>
      </div>

      <Dialog open={open} onOpenChange={(v) => { if(!loading) setOpen(v); if(!v) setResult(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Import Data Penduduk</DialogTitle>
            <DialogDescription>
              Unggah file Excel dengan format Kartu Keluarga untuk menambahkan data secara massal.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-sm font-medium text-slate-600">Memproses data...</p>
              </div>
            ) : result ? (
              <div className="flex flex-col items-center text-center px-4">
                {result.success > 0 ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                ) : (
                  <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                )}
                <h3 className="font-bold text-slate-800">Import Selesai</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Berhasil: <span className="text-emerald-600 font-bold">{result.success}</span> | 
                  Gagal: <span className="text-red-600 font-bold">{result.failed}</span>
                </p>
                {result.errors && result.errors.length > 0 && (
                  <div className="mt-4 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-100 max-h-32 overflow-y-auto w-full text-left">
                    {result.errors.map((e, i) => <div key={i}>• {e}</div>)}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-white rounded-full shadow-sm text-blue-500">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <Button variant="link" onClick={() => fileInputRef.current?.click()}>Pilih File Excel</Button>
                  <p className="text-xs text-slate-400">Gunakan file .xlsx atau .xls</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </div>

          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
              {result ? "Tutup" : "Batal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
