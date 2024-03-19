import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const title = "Prisma Editor | Visualize and Edit Prisma Schemas";
  const description =
    "Prisma Editor: Prisma Schema Editor, Prisma Schema visualization, visualize and edit Prisma schemas.";
  const url = "https://prisma-editor.vercel.app";
  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          siteName: title,
        }}
        twitter={{
          handle: "@prisma_editor",
          site: "@prisma_editor",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "prisma visualizer, Prisma Editor, prisma schema generator, prisma schema builder, Prisma.io, Prisma Schema, prisma editor online, Prisma Schema Editor, Prisma schema visualization, Prisma schema editing, Database schema editor, Visual database schema design, Prisma schema generator, SQL generation from Prisma schema, PostgreSQL, MySQL, SQL Server, SQLite, MongoDB, CockroachDB",
          },
        ]}
      />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
        </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
