const project = "https://tbucqnuyvwwhuqebboev.supabase.co"; // your supabase project id

export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) {
  return `${src}?width=${width}&quality=${quality || 75}`;
}
