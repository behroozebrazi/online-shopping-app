import Link from "next/link";

import { Button } from "@/components/ui/button";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl">
        Sorry, we couldn’t find the page you’re looking for.
      </h2>

      <Button
        className="m-10"
        variant="outline"
        nativeButton={false}
        render={<Link href="/" />}
      >
        Back to Home
      </Button>
    </div>
  );
}

export default NotFoundPage;
