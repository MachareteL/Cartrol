import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const carRoute = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
      })
    )
    .query(async ({ ctx, input: { cursor = 0 } }) => {
      const cars = await ctx.prisma.cars.findMany({
        take: 11,
        skip: 10 * cursor,
        orderBy: [{ updatedAt: "desc" }],
      });
      // console.log(cars);

      let nextCursor: typeof cursor | undefined;
      if (cars.length > 10) {
        const nextPost = cars.pop();
        if (nextPost != null) {
          nextCursor = cursor + 1;
        }
      }
      return {
        cars,
        nextCursor,
      };
    }),

  getCostumers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.costumer.findMany();
  }),

  create: protectedProcedure
    .input(
      z.object({
        category: z.enum(["sedan", "minivan"]),
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
          category,
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
          category,
          protocol,
          isBurned,
          createdAt,
          leavedAt,
          isPresent,
          costumerName,
          sign,
          more,
        });
        if (protocol == "" || sign == "" || costumerName == "") {
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
        const newData = await ctx.prisma.cars.create({
          data: {
            category,
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
          },
        });
        return newData;
      }
    ),
  getTotal: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const TotalBurnedVehicles = await ctx.prisma.cars.count({
      where: {
        isBurned: true,
      },
    });
    const totalCostumers = await ctx.prisma.costumer.count();

    const totalVehiclesPresent = await ctx.prisma.cars.count({
      where: {
        isPresent: true,
      },
    });

    const totalRegisteredVehicles = await ctx.prisma.cars.count();

    return {
      totalRegisteredVehicles,
      TotalBurnedVehicles,
      totalCostumers,
      totalVehiclesPresent,
    };
  }),
});
