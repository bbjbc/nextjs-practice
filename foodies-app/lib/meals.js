import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

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

export function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  // 데이터베이스에는 모든 meal에 slug를 저장해야 하는데 이것은 form에서 받아오지 않음. 대신에 title을 기반으로 만들고 싶음.
  // xss(cross site scripting) - 웹 사이트의 관리자가 아닌 악의적인 목적을 가진 제 3자가 악성 스크립트를 삽입하여 의도하지 않은 명령을 실행 시키거나
  // 세션 등을 탈취할 수 있는 취약점임.
}
