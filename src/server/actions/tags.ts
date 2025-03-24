'use server'

import { prisma } from '@/server/db/client';

export interface Tag{
    id: string;
    name: string;
    createdAt: Date;
}

export async function getTags() {
    return prisma.tag.findMany({
        orderBy: { id: 'desc' }
    });
}

export async function createTag(data: { name: string }) {
    return prisma.tag.create({ data });
}
