import { prisma } from '../src/lib/db';

async function main() {
  console.log('Database ready for seeding');
}

main().catch(console.error);
