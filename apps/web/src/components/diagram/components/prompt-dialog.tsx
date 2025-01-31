import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Client from "~/components/shared/client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { TextInputField } from "~/components/ui/form";

export function PromptDialog() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.ctrlKey) {
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);



  const methods = useForm({
    defaultValues: {
      prompt:
        "online store, orders table, product table, users table, relations between tables",
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Client>
        <DialogTrigger>
          <Button
            variant="ghost"
            size="sm"
            className="text-lg"
            onClick={() => setOpen(true)}
          >
            🤖 ⌘K
          </Button>
        </DialogTrigger>
      </Client>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Describe your Database Schema to your AI assistant 🤖
          </DialogTitle>
          <FormProvider {...methods}>
           
              <TextInputField name="prompt" label="Prompt" />

              <Button
                type="submit"
                className="mt-5 w-full"
              >
                Apply
              </Button>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
