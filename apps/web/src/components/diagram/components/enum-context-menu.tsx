import { type FC, type ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import AddOrUpdateEnumFieldDialog from "./add-or-update-enum-field-dialog";
import { createSchemaStore } from "~/components/store/schemaStore";
import { shallow } from "zustand/shallow";
import AddOrUpdateEnumDialog from "./add-or-update-enum-dialog";

const EnumContextMenu: FC<{ children: ReactNode; model: string }> = ({
  children,
  model,
}) => {
  const { removeEnum } = createSchemaStore(
    (state) => ({
      removeEnum: state.removeEnum,
    }),
    shallow
  );
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <AddOrUpdateEnumDialog enumName={model}>
          <ContextMenuItem
            inset
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            Update Model
          </ContextMenuItem>
        </AddOrUpdateEnumDialog>
        <AddOrUpdateEnumFieldDialog model={model}>
          <ContextMenuItem
            inset
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            Add Field
          </ContextMenuItem>
        </AddOrUpdateEnumFieldDialog>
        <ContextMenuItem
          inset
          onSelect={() => {
            void removeEnum(model);
          }}
        >
          Remove Enum
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EnumContextMenu;