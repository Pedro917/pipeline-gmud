import { ReleaseTable } from "@/components/relases-requested/data-table";


export default function Home() {
  return (
    <>
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Acompanhamento de Builds Solicitadas</h1>
      <div className="space-y-2.5">
        <ReleaseTable />
      </div>
    </div>
    </>
  );
}