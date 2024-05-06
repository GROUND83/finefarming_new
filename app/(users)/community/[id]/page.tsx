import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

async function getIsOwner(authorId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === authorId;
  }
  return false;
}

// async function getJournal(id: number) {
//   //
//   //   await new Promise((resolve) => setTimeout(resolve, 10000));
//   const journal = await db.journal.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       author: {
//         select: {
//           username: true,
//         },
//       },
//     },
//   });
//   return journal;
// }

export default async function JournalDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  // const journal = await getJournal(id);
  // if (!journal) {
  //   return notFound();
  // }
  // console.log(journal);
  return <span>저널 디테일 {id}</span>;
}
