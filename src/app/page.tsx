import { HomeContainer } from "@/containers";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <HomeContainer />
    </Suspense>
  );
}
