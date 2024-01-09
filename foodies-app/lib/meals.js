import fs from "node:fs";

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

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  // 데이터베이스에는 모든 meal에 slug를 저장해야 하는데 이것은 form에서 받아오지 않음. 대신에 title을 기반으로 만들고 싶음.
  // xss(cross site scripting) - 웹 사이트의 관리자가 아닌 악의적인 목적을 가진 제 3자가 악성 스크립트를 삽입하여 의도하지 않은 명령을 실행 시키거나
  // 세션 등을 탈취할 수 있는 취약점임.

  const extension = meal.image.name.split(".").pop(); // 확장자명 pop
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`); // 어떤 파일에 데이터를 쓸 수 있도록 해주는 stream을 생성함.
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  }); // 첫 번째 인수는 저장할 파일이고, 두 번째 인수는 쓰기를 마치면 실행될 함수.

  meal.image = `/images/${fileName}`; // public을 없앤 이유는 모든 이미지에 관한 요청은 자동적으로 public 폴더로 보내지기 때문임.

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
  // (?, ?, ?, ?, ?)를 이용할 수 있지만 better-sqlite가 제공하는 필드의 이름을 이용하여 특정 필드에 연결 가능함.
  // 그리고 나중에 prepare된 위 db에서 run 함수에 객체를 인수로 전달하는 것임.
}
