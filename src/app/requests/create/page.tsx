import CreateRequestForm from "@/components/requests/create-request-form";

export default function CreateRequests() {
  return (
    <>
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Nova solicitação</h1>
      <div className="space-y-2.5">
        <CreateRequestForm />
      </div>
    </div>
    </>
  );
}