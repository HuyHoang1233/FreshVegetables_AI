import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() { return <main className="grid min-h-screen place-items-center p-6 text-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">404</p><h1 className="mt-3 text-3xl font-bold">This page is not here.</h1><p className="mt-3 text-muted-foreground">The link may be out of date, or the page has moved.</p><Link className="mt-7 inline-block" href="/"><Button>Return home</Button></Link></div></main>; }
