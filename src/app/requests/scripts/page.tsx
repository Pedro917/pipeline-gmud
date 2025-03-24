import { ReleaseTable } from "@/components/relases-requested/data-table";


export default function ScriptsPage() {
  return (
    <>
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Acompanhamento de Scripts Solicitados</h1>
      <div className="space-y-2.5">
        <ReleaseTable />
      </div>
    </div>
    </>
  );
}