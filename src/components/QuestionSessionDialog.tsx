
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

interface QuestionSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

const QuestionSessionDialog = ({
  open,
  onOpenChange,
  title = "Question Session",
  description = "Ready to continue with your practice questions?",
  buttonText = "Start Session"
}: QuestionSessionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        <DialogDescription className="py-4 text-base">
          {description}
        </DialogDescription>
        <DialogFooter className="flex gap-6 sm:gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="font-lato text-base">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="default" className="font-lato text-base">
              {buttonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionSessionDialog;
