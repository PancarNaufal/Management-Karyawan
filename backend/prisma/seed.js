const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  console.log('Creating roles...');
  
  const rolesData = [
    {
      nama: 'Admin',
      gajiPokok: 10000000,
      deskripsi: 'Administrator sistem dengan akses penuh'
    },
    {
      nama: 'Cashier',
      gajiPokok: 5000000,
      deskripsi: 'Kasir restoran, handle transaksi dan pembayaran'
    },
    {
      nama: 'Employee',
      gajiPokok: 4000000,
      deskripsi: 'Karyawan biasa, staff operasional'
    }
  ];

  for (const roleData of rolesData) {
    await prisma.role.upsert({
      where: { nama: roleData.nama },
      update: {
        gajiPokok: roleData.gajiPokok,
        deskripsi: roleData.deskripsi
      },
      create: roleData
    });
  }

  console.log(`✅ Roles created/updated`);

  const allRoles = await prisma.role.findMany();
  console.log('\n📋 Current roles in database:');
  allRoles.forEach(role => {
    console.log(`   ID: ${role.id} | ${role.nama} | Rp ${role.gajiPokok.toLocaleString('id-ID')} | ${role.deskripsi}`);
  });

  console.log('\n✨ Seed completed!');
  console.log('\n💡 Gunakan roleId berikut untuk register user:');
  allRoles.forEach(role => {
    console.log(`   - roleId: ${role.id} untuk ${role.nama}`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
