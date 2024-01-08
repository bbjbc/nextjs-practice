"use server"; // server action이라는 것을 생성함. 오직 서버에서만 실행되는 함수임. async까지 붙여줘야 진짜 server action이 됨.

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  console.log(meal);
}
