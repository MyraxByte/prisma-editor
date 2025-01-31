import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { ReactFlowProvider } from "reactflow";
import { shallow } from "zustand/shallow";
import Diagram from "~/components/diagram/diagram";
import { CodeEditor } from "~/components/editor";
import Layout from "~/components/layout";
import ResizeHandle from "~/components/layout/resizePanels/ResizeHandles";
import LoadingScreen from "~/components/shared/loading-screen";
import { useSchemaStore } from "~/components/store/schemaStore";

const Schema = () => {
  const { restoreSavedSchema } = useSchemaStore()(
    (state) => ({
      isParseDmmfLoading: state.isParseDmmfLoading,
      isRestoreSavedSchemaLoading: state.isRestoreSavedSchemaLoading,
      restoreSavedSchema: state.restoreSavedSchema,
    }),
    shallow
  );

  const router = useRouter();

  const isPlayground =
    isNaN(+(router.query.id as string)) &&
    typeof router.query.id !== "undefined";

  const isNotPlayground =
    !isNaN(+(router.query.id as string)) &&
    typeof router.query.id !== "undefined";

  const [isRestoreSchemaDone, setIsRestoreSchemaDone] = useState(false);

  useEffect(() => {
    if (isNotPlayground) {
      void restoreSavedSchema((router.query.token || "") as string).finally(
        () => {
          setIsRestoreSchemaDone(true);
        }
      );
    }
  }, [isNotPlayground, restoreSavedSchema, router.query.token]);

  if (!isPlayground && (!isRestoreSchemaDone)) {
    return (
      <Layout className="h-screen">
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout className="h-screen">
      <Head>
        <title>Edit Schema | Prisma Editor</title>
      </Head>
      <div className="h-[calc(100%-48px)] overflow-hidden">
        <PanelGroup autoSaveId="example" direction="horizontal">
          <Panel defaultSize={20} minSize={0}>
            <div className="h-full w-full overflow-hidden bg-slate-100 dark:bg-black/25">
              <CodeEditor key="code" />
            </div>
          </Panel>
          <ResizeHandle />
          <Panel minSize={0}>
            <div className="h-full w-full overflow-hidden bg-slate-100 dark:bg-black/25">
              <ReactFlowProvider>
                <Diagram />
              </ReactFlowProvider>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </Layout>
  );
};

export default Schema;
