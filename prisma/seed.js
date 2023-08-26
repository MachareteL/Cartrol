const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
async function seedDB() {
  console.log("seeding database...");
  try {
    await prisma.costumer.createMany({
      data: [
        {
          name: "ProAuto",
        },
        {
          name: "Velox",
        },
        {
          name: "Particular",
        },
      ],
    });
    console.log("costumer created sucessfully");

    await prisma.cars.createMany({
      data: [
        {
          protocol: "Protocolo1",
          costumerName: "ProAuto",
          category: "sedan",
          createdAt: new Date(),
          sign: "BQR3577",
          isBurned: false,
          isPresent: true,
        },
        {
          protocol: "Protocolo2",
          costumerName: "Velox",
          category: "minivan",
          createdAt: new Date(),
          leavedAt: new Date(),
          sign: "BQR35778",
          isBurned: false,
          isPresent: false,
          more: "Scenic",
        },
        {
          protocol: "Protocolo3",
          costumerName: "Particular",
          category: "minivan",
          createdAt: new Date(),
          leavedAt: new Date(),
          sign: "BQR35778",
          isBurned: false,
          isPresent: false,
          more: "Scenic",
        },
      ],
    });
    console.log("cars created successfully");
  } catch (error) {
    console.log({ error });
  } finally {
    await prisma.$disconnect();
  }
}

seedDB();
