"use client";

export default function Page({ params }: { params: { userId: string } }) {
  return (
    <div>
      <p>마이 리뷰 {params.userId}</p>
    </div>
  );
}
