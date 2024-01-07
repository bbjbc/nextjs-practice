import { Suspense } from "react";
import Link from "next/link";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
// suspense는 리액트에서 제공되는 컴포넌트임.
// 일부 데이터 또는 리소스가 불릴 때까지 로딩 상태를 처리하고 대체 콘텐츠를 표시할 수 있음.
// suspense 컴포넌트 안에 fallback을 세팅하고, 래핑된 컴포넌트가 일부 데이터를 로딩하는 동안 표시되어야 할 대체 컨텐츠를 찾음.
