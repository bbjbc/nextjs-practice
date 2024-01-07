import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
  // run()은 데이터를 주입시킬 때, 데이터를 바꿀 때 사용함
  // all()은 데이터를 가져올 때, 이 문장에 의해 가져오는 모든 행을 가져올 때 사용함
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
