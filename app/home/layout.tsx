"use client";

import { useState } from "react";
import IntroSplash from "@/components/ui/intro-splash";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);



  return (
    <>
      {!ready && <IntroSplash onFinish={() => setReady(true)} />}
      {ready && children}
    </>
  );
}
