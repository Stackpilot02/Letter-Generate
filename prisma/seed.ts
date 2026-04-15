import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Admin User
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password_hash: adminPasswordHash,
      nama: 'Administrator Desa',
      jabatan: 'Admin Sistem',
      role: 'admin',
      is_active: true,
    },
  });
  console.log(`Created admin user with id: ${admin.id}`);

  // 2. Create Dummy Penduduk
  const pendudukData = [
    {
      nik: '1234567890123456',
      no_kk: '1234567890123450',
      nama_lengkap: 'Budi Santoso',
      tempat_lahir: 'Ujungbatu',
      tanggal_lahir: new Date('1980-01-01'),
      jenis_kelamin: 'L' as const,
      agama: 'Islam',
      status_perkawinan: 'Kawin',
      pekerjaan: 'Petani',
      alamat: 'Jl. Merdeka No. 1',
      rt: '01',
      rw: '02',
      dusun: 'Dusun Sukamaju',
      status_hidup: 'Hidup' as const,
    },
    {
      nik: '1234567890123457',
      no_kk: '1234567890123450',
      nama_lengkap: 'Siti Aminah',
      tempat_lahir: 'Medan',
      tanggal_lahir: new Date('1982-05-15'),
      jenis_kelamin: 'P' as const,
      agama: 'Islam',
      status_perkawinan: 'Kawin',
      pekerjaan: 'Ibu Rumah Tangga',
      alamat: 'Jl. Merdeka No. 1',
      rt: '01',
      rw: '02',
      dusun: 'Dusun Sukamaju',
      status_hidup: 'Hidup' as const,
    }
  ];

  for (const p of pendudukData) {
    await prisma.penduduk.upsert({
      where: { nik: p.nik },
      update: {},
      create: p,
    });
  }
  console.log('Seeded dummy penduduk');

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
