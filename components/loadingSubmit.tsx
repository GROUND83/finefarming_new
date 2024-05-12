import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

//
export default function LoadingSumnitButton({ loading }: { loading: boolean }) {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? <Loader2 className="size-4 animate-spin" /> : "로그인"}
    </Button>
  );
}
