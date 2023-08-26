import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const carRoute = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
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
        });

        const newData = await ctx.prisma.cars.create({
          data: {
            category,
            protocol,
            sign,
            isBurned,
            createdAt,
            isPresent,
            leavedAt,
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
});
