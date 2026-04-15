"use server";

import { prisma } from "@/lib/prisma";
import { JenisKelamin } from "@prisma/client";

export async function importPendudukAction(residents: any[]) {
  let successCount = 0;
  let failedCount = 0;
  const errors: string[] = [];

  for (const data of residents) {
    try {
      await prisma.penduduk.upsert({
        where: { nik: data.nik },
        update: {
          no_kk: data.no_kk,
          nama_lengkap: data.nama_lengkap,
          tempat_lahir: data.tempat_lahir,
          tanggal_lahir: data.tanggal_lahir,
          jenis_kelamin: data.jenis_kelamin as JenisKelamin,
          agama: data.agama,
          pekerjaan: data.pekerjaan,
          status_perkawinan: data.status_perkawinan,
        },
        create: {
          nik: data.nik,
          no_kk: data.no_kk,
          nama_lengkap: data.nama_lengkap,
          tempat_lahir: data.tempat_lahir,
          tanggal_lahir: data.tanggal_lahir,
          jenis_kelamin: data.jenis_kelamin as JenisKelamin,
          agama: data.agama,
          pekerjaan: data.pekerjaan,
          status_perkawinan: data.status_perkawinan,
          status_hidup: "Hidup",
        },
      });
      successCount++;
    } catch (err: any) {
      failedCount++;
      errors.push(`NIK ${data.nik}: ${err.message}`);
    }
  }

  return {
    success: successCount,
    failed: failedCount,
    errors: errors.length > 5 ? [...errors.slice(0, 5), `...dan ${errors.length - 5} lainnya`] : errors,
  };
}
