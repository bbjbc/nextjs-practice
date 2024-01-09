"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { saveMeal } from "./meals";

// server action이라는 것을 생성함. 오직 서버에서만 실행되는 함수임. async까지 붙여줘야 진짜 server action이 됨.

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  // console.log(meal);
  await saveMeal(meal); // saveMeal()함수는 promise를 반환하므로 async-await.
  revalidatePath("/meals"); // 이 함수는 NextJS가 특정 path에 속하는 캐시의 유효성 재검사를 하게 됨.
  // layout이 두 번째 인수로 들어오면 /meals에 중첩된 모든 페이지를 검사하게 됨. default는 page로 단일 페이지만 재검사하는 것임.
  // 하지만 여기서는 /meals 페이지만 재검사하면 됨.
  redirect("/meals");
}
