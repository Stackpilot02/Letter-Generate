import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImportButton } from "./import-button";

export const metadata = {
  title: "Data Penduduk | Administrasi Surat Desa",
};

export default async function PendudukPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || "";

  // Fetch from database with simple search
  const penduduk = await prisma.penduduk.findMany({
    where: {
      OR: [
        { nama_lengkap: { contains: query, mode: "insensitive" } },
        { nik: { contains: query } },
        { no_kk: { contains: query } },
      ],
    },
    orderBy: { nama_lengkap: "asc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manajemen Penduduk</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data kependudukan untuk digunakan dalam pembuatan surat.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ImportButton />
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Data
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Penduduk</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form Pencarian */}
          <form className="flex items-center gap-2 mb-4" method="GET">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                name="q"
                placeholder="Cari NIK, KK, atau Nama..."
                className="pl-8"
                defaultValue={query}
              />
            </div>
            <Button type="submit" variant="secondary">Cari</Button>
          </form>

          {/* Tabel Data */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIK</TableHead>
                  <TableHead>No. KK</TableHead>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>L/P</TableHead>
                  <TableHead>Alamat</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {penduduk.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-gray-500">
                      Tidak ada data penduduk yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  penduduk.map((p: any) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.nik}</TableCell>
                      <TableCell>{p.no_kk}</TableCell>
                      <TableCell>{p.nama_lengkap}</TableCell>
                      <TableCell>{p.jenis_kelamin}</TableCell>
                      <TableCell>{p.dusun}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          p.status_hidup === 'Hidup' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {p.status_hidup}
                        </span>
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
