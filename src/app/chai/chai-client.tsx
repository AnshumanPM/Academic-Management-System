"use client";

import { useRouter } from "next/navigation";
import { Coffee, ExternalLink, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function ChaiClient() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground gap-1.5"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </div>

        <Card className="border-border shadow-lg gap-5 py-6">
          <CardHeader className="items-center pb-0 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Buy a Chai
            </CardTitle>
            <p className="text-muted-foreground mt-2.5 text-xs leading-relaxed">
              If you enjoy my work and would like to support, your contribution is greatly appreciated.
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4.5 text-sm dark:bg-amber-500/10">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="space-y-2.5 text-foreground/90">
                  <p className="font-semibold text-amber-900 dark:text-amber-200">
                    Please Note:
                  </p>
                  <ul className="text-muted-foreground space-y-2 pl-4 text-xs leading-relaxed list-disc">
                    <li>
                      <span className="font-medium text-foreground">
                        It&apos;s completely optional
                      </span>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        You&apos;ll receive no extra features, benefits, or special
                        privileges in return
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2.5 pt-0">
            <Button
              asChild
              className="w-full gap-2 font-semibold shadow-sm"
              size="lg"
            >
              <a
                href="https://chai.anshumanpm.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="size-4" />
                Proceed to Buy a Chai
                <ExternalLink className="ml-auto size-4" />
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground w-full"
              size="sm"
            >
              Maybe later
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
