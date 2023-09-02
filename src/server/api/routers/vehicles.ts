import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const vehiclesRoute = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
      })
    )
    .query(async ({ ctx, input: { cursor = 0 } }) => {
      const vehicles = await ctx.prisma.vehicles.findMany({
        take: 11,
        skip: 10 * cursor,
        orderBy: [{ updatedAt: "desc" }],
      });
      // console.log(vehicles);

      let nextCursor: typeof cursor | undefined;
      if (vehicles.length > 10) {
        const nextPost = vehicles.pop();
        if (nextPost != null) {
          nextCursor = cursor + 1;
        }
      }
      return {
        vehicles,
        nextCursor,
      };
    }),

  getCostumers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.costumer.findMany({
      select: { name: true },
    });
  }),
  getModels: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.model.findMany({
      select: { name: true },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        modelName: z.string(),
        protocol: z.string(),
        sign: z.string(),
        costumerName: z.string(),
        isBurned: z.boolean(),
        isPresent: z.boolean(),
        createdAt: z.coerce.date(),
        leavedAt: z.coerce.date().optional(),
        more: z.string().optional(),
      })
    )
    .mutation(
      async ({
        ctx,
        input: {
          modelName,
          protocol,
          isBurned,
          createdAt,
          isPresent,
          costumerName,
          leavedAt,
          sign,
          more,
        },
      }) => {
        console.log({
          modelName,
          protocol,
          isBurned,
          createdAt,
          leavedAt,
          isPresent,
          costumerName,
          sign,
          more,
        });
        if (protocol == "" || sign == "" || !costumerName || modelName == "") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Há campos vazios. Defina todos os campos",
          });
        }
        if (
          (!isPresent && !leavedAt) ||
          !(isPresent && leavedAt == undefined)
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Se o veículo não está no patio você deve definir a data de saída",
          });
        }
        const newData = await ctx.prisma.vehicles.create({
          data: {
            protocol,
            sign,
            isBurned,
            createdAt,
            isPresent,
            leavedAt,
            more,
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
        return newData;
      }
    ),
  getTotal: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const TotalBurnedVehicles = await ctx.prisma.vehicles.count({
      where: {
        isBurned: true,
      },
    });
    const totalCostumers = await ctx.prisma.costumer.count();

    const totalVehiclesPresent = await ctx.prisma.vehicles.count({
      where: {
        isPresent: true,
      },
    });

    const totalRegisteredVehicles = await ctx.prisma.vehicles.count();

    return {
      totalRegisteredVehicles,
      TotalBurnedVehicles,
      totalCostumers,
      totalVehiclesPresent,
    };
  }),
});
