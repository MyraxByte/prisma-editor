import {
  dmmfToSchema,
  schemaToDmmf,
  type DMMF,
} from "@prisma-editor/prisma-dmmf-extended";
import { type ConfigMetaFormat } from "@prisma/internals";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const dmmfRouter = createTRPCRouter({
  dmmfToPrismaSchema: publicProcedure
    .input(
      z.object({
        dmmf: z.object({
          models: z.array(z.any()),
          enums: z.array(z.any()),
        }),
        config: z
          .object({
            datasources: z.array(z.any()),
            generators: z.array(z.any()),
          })
          .nullish(),
      })
    )
    .mutation(
      async ({ input }) =>
        await dmmfToSchema(
          input as {
            dmmf: DMMF.Document["datamodel"];
            config: ConfigMetaFormat;
          }
        )
    ),

  schemaToDmmf: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => await schemaToDmmf(input)),
});
