"use client";

export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}

// error.js 파일은 클라이언트 컴포넌트여야 함.
// NextJS는 기본적으로 클라이언트 측에서 발생하는 오류를 포함한, 해당 컴포넌트의 모든 오류를 잡을 수 있도록 보장하기 때문임.
