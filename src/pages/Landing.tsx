import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const Landing = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for sharing your idea with us!"
      });
      setFeedback("");
      setDialogOpen(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Continuous Assessment User Test
          </h1>
          <p className="text-lg text-gray-600">
            Track your progress and master key concepts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Button variant="outline" className="h-24 text-lg font-medium hover:bg-gray-100" onClick={() => navigate("/concept1")}>
            <LayoutGrid className="mr-2 h-5 w-5" />
            Line Chart
          </Button>

          <Button variant="outline" className="h-24 text-lg font-medium hover:bg-gray-100" onClick={() => navigate("/concept2")}>
            <LayoutGrid className="mr-2 h-5 w-5" />
            Performance Gauge
          </Button>

          <Button variant="outline" className="h-24 text-lg font-medium hover:bg-gray-100" onClick={() => navigate("/concept3")}>
            <LayoutGrid className="mr-2 h-5 w-5" />
            Exam Readiness
          </Button>

          <Button variant="outline" className="h-24 text-lg font-medium hover:bg-gray-100" onClick={() => navigate("/concept4")}>
            <LayoutGrid className="mr-2 h-5 w-5" />
            Performance Bar Chart
          </Button>

          <Button variant="outline" onClick={() => navigate("/concept5")} className="h-24 text-lg font-medium hover:bg-gray-100 px-0 rounded-md">
            <LayoutGrid className="mr-2 h-5 w-5" />
            Peer Group
          </Button>

          <Button variant="outline" className="h-24 text-lg font-medium hover:bg-gray-100" onClick={() => navigate("/concept6")}>
            <LayoutGrid className="mr-2 h-5 w-5" />
            Topic Breakdown
          </Button>

          <Button variant="outline" className="h-24 text-lg font-medium hover:bg-gray-100" onClick={() => navigate("/report")}>
            <LayoutGrid className="mr-2 h-5 w-5" />
            Full Report
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-24 text-lg font-medium border-dashed border-2 border-gray-300 bg-gray-50/50 hover:bg-gray-100 flex flex-col items-center justify-center space-y-1">
                <div className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  <span>None of the above?</span>
                </div>
                <span className="text-gray-600 text-base">Tell us more.</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>What do you think?</DialogTitle>
                <DialogDescription>
                  Share your idea with us. We're always looking to improve and add new features.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Textarea placeholder="Describe your idea here..." value={feedback} onChange={e => setFeedback(e.target.value)} className="min-h-[100px]" />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitFeedback}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>;
};
export default Landing;