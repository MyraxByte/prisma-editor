import { type Permission } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { string, z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const manageSchemaRouter = createTRPCRouter({
  createSchema: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const schema = await prisma.schema.create({
        data: {
          title: input.title
        },
        select: { id: true },
      });
      return schema.id;
    }),
  getSchema: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        token: z.string().optional(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      const schema = await prisma.schema.findUnique({
        where: { id: input.id },
        select: {
          schema: true,
          shareSchema: {
            select: {
              id: true,
              token: true,
              permission: true,
            },
          },
        },
      });

      return { schema: schema?.schema || "", permission: "UPDATE" };
    }),
  getSchemas: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.schema.findMany();
  }),
  updateSchema: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        schema: string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const permission: Permission = "UPDATE"
      if (permission !== "UPDATE") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "NO PERMISSION",
          cause: "NO PERMISSION",
        });
      }

      await prisma.schema.update({
        where: { id: input.id },
        data: { schema: input.schema },
        select: { id: true },
      });
      return true;
    }),
  deleteSchema: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      await prisma.schema.delete({
        where: { id: input.id },
      });
      return true;
    }),
});
