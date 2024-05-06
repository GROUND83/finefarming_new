import { formatToTimeAgo } from "@/lib/utiles";
import Image from "next/image";
import Link from "next/link";

interface ListListJournalProps {
  title: string;
  description: string;
  mainImage: string;
  created_at: Date;
  id: number;
}

export default function ListJournal({
  title,
  description,
  mainImage,
  created_at,
  id,
}: ListListJournalProps) {
  return (
    <Link href={`/journal/${id}`} className="flex gap-5 flex-col  w-80 ">
      <div className="relative w-80 h-80 ">
        <Image src={mainImage} alt={title} fill />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-lg  font-semibold">{title}</span>
        <span className="text-neutral-500">{description}</span>
        <span>{formatToTimeAgo(created_at.toString())}</span>
      </div>
    </Link>
  );
}
