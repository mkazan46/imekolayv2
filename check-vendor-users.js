const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkVendorUsers() {
  try {
    const users = await prisma.vendorUser.findMany();
    console.log('VendorUsers:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVendorUsers();