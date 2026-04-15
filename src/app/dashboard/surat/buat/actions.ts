"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function saveSuratAction(data: {
  nik_pemohon: string;
  jenis_surat: string;
  keperluan: string;
  nomor_surat: string;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  // Find user in DB to get numeric ID
  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.surat.create({
    data: {
      nomor_surat: data.nomor_surat,
      jenis_surat: data.jenis_surat,
      nik_pemohon: data.nik_pemohon,
      tanggal_terbit: new Date(),
      keperluan: data.keperluan,
      dibuat_oleh_id: user.id,
    },
  });

  revalidatePath("/dashboard/surat/arsip");
  return { success: true, data: result };
}

export async function getNextNomorSuratAction() {
  const currentYear = new Date().getFullYear();
  
  // Count letters in the current year
  const count = await prisma.surat.count({
    where: {
      tanggal_terbit: {
        gte: new Date(`${currentYear}-01-01`),
        lte: new Date(`${currentYear}-12-31`),
      }
    }
  });

  const nextNumber = (count + 1).toString().padStart(3, '0');
  return `145/${nextNumber}/${currentYear}`;
}
