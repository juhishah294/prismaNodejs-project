const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create multiple users
  const users = await prisma.user.createMany({
    data: [
      { name: "Juhi", email: "juhi@example.com" },
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ],
    // Set `skipDuplicates` to true to skip inserting duplicate records
    skipDuplicates: true,
  });

  console.log("New users created:", users);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
