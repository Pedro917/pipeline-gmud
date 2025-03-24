'use server'

import { prisma } from '@/server/db/client';
import { BuildStatus, RequestType, ScriptStatus } from '@prisma/client';

export interface CreateRequestInput {
    squad: string;
    requester: string;
    releaseNotes: string;
    azureLink: string;
    observation?: string;
    type: RequestType;
    tags?: string[];
    scriptSolicitation?: {
        scriptLink: string;
        objectName: string;
        status?: ScriptStatus;
    };
    buildSolicitation?: {
        buildLink: string;
        application: string;
        rollbackBuild: string;
        status?: BuildStatus;
    };
}

export async function createRequest(data: CreateRequestInput) {
    const { scriptSolicitation, buildSolicitation, tags, ...requestData } = data;
    const result = await prisma.request.create({
        data: {
            ...requestData,
            scriptSolicitation: scriptSolicitation
                ? { create: { ...scriptSolicitation, status: scriptSolicitation.status ?? "PENDING" } }
                : undefined,
            buildSolicitation: buildSolicitation
                ? { create: { ...buildSolicitation, status: buildSolicitation.status ?? "PENDING" } }
                : undefined,
            tags: tags ? { connect: tags.map((tagId) => ({ id: tagId })) } : undefined,
        },
        include: {
            scriptSolicitation: true,
            buildSolicitation: true,
            tags: true,
        },
    });

    return result;
}