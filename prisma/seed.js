const { Prisma, PrismaClient } = require("@prisma/client");

/**
 * @param {string | any[]} arr
 */
function choice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

function randomizeBool() {
  const bool = Math.floor(Math.random() * 2);
  if (bool == 1) return true;
  return false;
}

const prisma = new PrismaClient();
async function seedDB() {
  console.log("seeding database...");
  //   const data = [
  //     {
  //       protocol: `Protocol ${Math.floor(
  //         Math.random() * Math.floor(Math.random() * Date.now())
  //       )}`,
  //       costumerName: choice(["ProAuto", "Velox", "Particular"]),
  //       modelName: choice(["sedan", "minivan", "hatch", "caminhonete"]),
  //       createdAt: new Date(),
  //       sign: "BQR3577",
  //       isBurned: randomizeBool(),
  //       isPresent: true,
  //     },
  //   ];
  //   for (let index = 0; index < 100; index++) {
  //     data.push({
  //       protocol: `Protocol ${Math.floor(
  //         Math.random() * Math.floor(Math.random() * Date.now())
  //       )}`,
  //       costumerName: choice(["ProAuto", "Velox", "Particular"]),
  //       modelName: choice(["sedan", "minivan", "hatch", "caminhonete"]),
  //       createdAt: new Date(),
  //       sign: "BQR3577",
  //       isBurned: randomizeBool(),
  //       isPresent: true,
  //     });
  //   }
  try {
    for (let index = 0; index < 47; index++) {
      let costumerName = choice(["Proauto", "Velox", "Particular"]);
      let modelName = choice([
        "Chevette",
        "Monza",
        "Fusca",
        "Kadett",
        "Sandero",
        "Vectra",
        "Brasilia",
        "Saveiro",
        "Opala",
      ]);
      try {
        await prisma.vehicles.create({
          data: {
            protocol: `Protocol ${Math.floor(
              Math.random() * Math.floor(Math.random() * Date.now())
            )}`,
            createdAt: new Date(),
            isMotorcycle: randomizeBool(),
            isPresent: true,
            sign: "BQR3577",
            costumer: {
              connectOrCreate: {
                where: {
                  name: costumerName,
                },
                create: {
                  name: costumerName,
                },
              },
            },
            model: {
              connectOrCreate: {
                where: {
                  name: modelName,
                },
                create: {
                  name: modelName,
                },
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    // await prisma.vehicles.createMany({
    //     data
    // });
    // await prisma.costumer.createMany({
    //   data: [
    //     {
    //       name: "ProAuto",
    //     },
    //     {
    //       name: "Velox",
    //     },
    //     {
    //       name: "Particular",
    //     },
    //   ],
    // });
    // console.log("costumer created sucessfully");

    // await prisma.vehicles.createMany({
    //   data: [
    //     {
    //       protocol: "Protocolo1",
    //       costumerName: "ProAuto",
    //       category: "sedan",
    //       createdAt: new Date(),
    //       sign: "BQR3577",
    //       isBurned: false,
    //       isPresent: true,
    //     },
    //     {
    //       protocol: "Protocolo2",
    //       costumerName: "Velox",
    //       category: "minivan",
    //       createdAt: new Date(),
    //       leavedAt: new Date(),
    //       sign: "BQR35778",
    //       isBurned: false,
    //       isPresent: false,
    //       more: "Scenic",
    //     },
    //     {
    //       protocol: "Protocolo3",
    //       costumerName: "Particular",
    //       category: "minivan",
    //       createdAt: new Date(),
    //       leavedAt: new Date(),
    //       sign: "BQR35778",
    //       isBurned: false,
    //       isPresent: false,
    //       more: "Scenic",
    //     },
    //   ],
    // });
    console.log("vehicles created successfully");
  } catch (error) {
    console.log({ error });
  } finally {
    await prisma.$disconnect();
  }
}

seedDB();
