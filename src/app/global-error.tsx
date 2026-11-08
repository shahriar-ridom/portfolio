"use client";

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "5rem 2rem", color: "#353535" }}>
        <h1>Something went wrong.</h1>
        <p>The site couldn&apos;t load. Try again in a moment.</p>
        <button type="button" onClick={() => retry()}>Try again</button>
      </body>
    </html>
  );
}
