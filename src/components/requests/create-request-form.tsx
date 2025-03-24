"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTag, getTags, Tag } from "@/server/actions/tags";
import { createRequest } from "@/server/actions/requests";
import Script from "next/script";

// Enums para os tipos de requisição e status
enum RequestType {
  SCRIPT = "SCRIPT",
  BUILD = "BUILD",
}

// Schema de validação
const requestFormSchema = z.object({
  squad: z.string().min(1, "Squad é obrigatório"),
  requester: z.string().min(1, "Solicitante é obrigatório"),
  releaseNotes: z.string().min(1, "Release notes são obrigatórias"),
  azureLink: z.string().url("Link do Azure deve ser uma URL válida"),
  observation: z.string().optional(),
  type: z.nativeEnum(RequestType),
  tags: z.array(z.string()).optional(),
  
  // Campos específicos para ScriptSolicitation
  scriptLink: z.string().url("Link do script deve ser uma URL válida").optional(),
  objectName: z.string().optional(),
  
  // Campos específicos para BuildSolicitation
  buildLink: z.string().url("Link do build deve ser uma URL válida").optional(),
  application: z.string().optional(),
  rollbackBuild: z.string().optional(),
}).refine(data => {
  if (data.type === RequestType.SCRIPT) {
    return !!data.scriptLink && !!data.objectName;
  }
  if (data.type === RequestType.BUILD) {
    return !!data.buildLink && !!data.application && !!data.rollbackBuild;
  }
  return true;
}, {
  message: "Preencha todos os campos específicos do tipo de solicitação",
  path: ["type"],
});

type RequestFormValues = z.infer<typeof requestFormSchema>;

export default function CreateRequestForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      squad: "",
      requester: "",
      releaseNotes: "",
      azureLink: "",
      observation: "",
      type: RequestType.SCRIPT,
      tags: [],
    },
  });

  const requestType = form.watch("type");

  useEffect(() => {
    handleGetTags();
  }, []);

  const onSubmit = async (data: RequestFormValues) => {
    try {
      setIsSubmitting(true);
      
      const result = await createRequest({
        azureLink: data.azureLink,
        observation: data.observation,
        releaseNotes: data.releaseNotes,
        requester: data.requester,
        squad: data.squad,
        type: data.type,
        tags: data.tags,
        scriptSolicitation: {
          scriptLink: data.scriptLink ?? "",
          objectName: data.scriptLink ?? "",
        }
        // scriptSolicitation: data.type === RequestType.SCRIPT ? {
        //   objectName: data.objectName,
        //   scriptLink: data.scriptLink,
        // } : undefined,
        // buildSolicitation: data.type === RequestType.BUILD ? {
        //   application: data.application,
        //   buildLink: data.buildLink,
        //   rollbackBuild: data.rollbackBuild,
        // } : undefined
      });

      console.log(result);

      setIsSubmitting(false);


    } catch (error) {
      
    }
  }

  const handleGetTags = async () => {
    const tags = await getTags();
    setAvailableTags(tags);
  }

//   const onSubmit = async (data: RequestFormValues) => {
//     try {
//       setIsSubmitting(true);
      
//       // Aqui usamos Server Action do Next.js
//     //   const result = await createRequest(data);
      
//       if (result.success) {
//         // toast({
//         //   title: "Solicitação criada",
//         //   description: "Solicitação criada com sucesso",
//         // });
        
//         // Resetar o formulário
//         form.reset();
        
//         // Redirecionar para a página de listagem de solicitações
//         router.push("/requests");
//         router.refresh(); // Atualiza os dados da página
//       } else {
//         // toast({
//         //   title: "Erro",
//         //   description: result.error || "Ocorreu um erro ao criar a solicitação",
//         //   variant: "destructive",
//         // });
//       }
//     } catch (error) {
//       console.error("Erro ao enviar formulário:", error);
//     //   toast({
//     //     title: "Erro",
//     //     description: "Ocorreu um erro ao criar a solicitação",
//     //     variant: "destructive",
//     //   });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detalhes da Solicitação</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="squad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Squad</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da squad" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solicitante</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do solicitante" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Solicitação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={RequestType.SCRIPT}>Script</SelectItem>
                      <SelectItem value={RequestType.BUILD}>Build</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Escolha o tipo de solicitação para habilitar os campos específicos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releaseNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações da release"
                      className="min-h-32 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="azureLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Indicente/Feature</FormLabel>
                  <FormControl>
                    <Input placeholder="https://dev.azure.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detalhes Específicos</h3>
              
              {requestType === RequestType.SCRIPT && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detalhes do Script</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="scriptLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link do Script</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="objectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Objeto</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do objeto" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {requestType === RequestType.BUILD && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detalhes do Build</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="buildLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link do Build</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="application"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aplicação</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da aplicação" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rollbackBuild"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Build de Rollback</FormLabel>
                          <FormControl>
                            <Input placeholder="Informação de rollback" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observações adicionais"
                      className="min-h-20 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableTags.map((tag) => {
                      const isSelected = field.value?.includes(tag.id);
                      return (
                        <Badge
                          key={tag.id}
                          variant={isSelected ? "default" : "outline"}
                          className={`cursor-pointer ${isSelected ? "" : "hover:bg-secondary"}`}
                          onClick={() => {
                            const currentTags = field.value || [];
                            if (isSelected) {
                              field.onChange(currentTags.filter(id => id !== tag.id));
                            } else {
                              field.onChange([...currentTags, tag.id]);
                            }
                          }}
                        >
                          {tag.name}
                        </Badge>
                      );
                    })}
                  </div>
                  <FormDescription>
                    Selecione as tags relacionadas a esta solicitação
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={ () => router.push("/") }
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" >
                {isSubmitting ? "Enviando..." : "Criar Solicitação"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}