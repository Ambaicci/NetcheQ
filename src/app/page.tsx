import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to NetcheQ</CardTitle>
          <CardDescription>
            The modern way to issue and manage digital cheques.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Create an Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}