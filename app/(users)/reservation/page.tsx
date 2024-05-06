import ListJournal from "@/components/list-Journal";
import db from "@/lib/db";

async function getJournal() {
  // const journals = await db.journal.findMany({
  //   select: {
  //     title: true,
  //     description: true,
  //     mainImage: true,
  //     created_at: true,
  //     id: true,
  //   },
  // });
  // return journals;
}

export default async function Page() {
  // const journals = await getJournal();
  // console.log("journals", journals);
  return (
    <div>
      <p>예약 완료 </p>
    </div>
  );
}
