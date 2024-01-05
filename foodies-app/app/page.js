import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
      </h1>
      <h1>
        <Link href="/meals">Meals</Link>
      </h1>
      <h1>
        <Link href="/meals/share">Share Meal</Link>
      </h1>
      <h1>
        <Link href="/community">Community</Link>
      </h1>
    </main>
  );
}
