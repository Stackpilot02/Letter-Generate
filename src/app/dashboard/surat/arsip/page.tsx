import { prisma } from "@/lib/prisma";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export const metadata = {
  title: "Arsip Surat | Administrasi Surat Desa",
};

export default async function ArsipSuratPage() {
  const surats = await prisma.surat.findMany({
    include: {
      pemohon: true,
      pembuat: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Arsip Surat</h1>
        <p className="mt-1 text-sm text-gray-500">
          Riwayat seluruh surat yang telah diterbitkan oleh sistem.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pembuatan Dokumen</CardTitle>
          <CardDescription>Pilih dokumen untuk mencetak ulang bentuk fisiknya (dalam PDF).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomor Surat</TableHead>
                  <TableHead>Jenis Surat</TableHead>
                  <TableHead>Pemohon</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead>Petugas</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {surats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-gray-500">
                      Belum ada surat yang diterbitkan.
                    </TableCell>
                  </TableRow>
                ) : (
                  surats.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.nomor_surat}</TableCell>
                      <TableCell>{s.jenis_surat}</TableCell>
                      <TableCell>{s.pemohon.nama_lengkap}</TableCell>
                      <TableCell>{s.created_at.toLocaleDateString("id-ID")}</TableCell>
                      <TableCell>{s.pembuat.nama}</TableCell>
                      <TableCell className="text-right">
                        {/* Di MVP ini actionnya cuma dummy print alert karena UI Print ada di client form */}
                        <Button variant="outline" size="sm">
                          <Printer className="w-4 h-4 mr-1" /> Cetak Ulang
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
