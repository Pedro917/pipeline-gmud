-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BatchRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "squad" TEXT NOT NULL,
    "requester" TEXT NOT NULL,
    "releaseNotes" TEXT NOT NULL,
    "azureLink" TEXT NOT NULL,
    "observation" TEXT,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "batchRequestId" TEXT,
    "scriptSolicitationId" TEXT,
    "buildSolicitationId" TEXT,
    CONSTRAINT "Request_batchRequestId_fkey" FOREIGN KEY ("batchRequestId") REFERENCES "BatchRequest" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Request_scriptSolicitationId_fkey" FOREIGN KEY ("scriptSolicitationId") REFERENCES "ScriptSolicitation" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Request_buildSolicitationId_fkey" FOREIGN KEY ("buildSolicitationId") REFERENCES "BuildSolicitation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ScriptSolicitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scriptLink" TEXT NOT NULL,
    "objectName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "BuildSolicitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buildLink" TEXT NOT NULL,
    "application" TEXT NOT NULL,
    "rollbackBuild" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sacTiId" TEXT,
    CONSTRAINT "Tag_sacTiId_fkey" FOREIGN KEY ("sacTiId") REFERENCES "SacTi" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SacTi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sacNumber" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_RequestTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RequestTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Request" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RequestTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SacTi_sacNumber_key" ON "SacTi"("sacNumber");

-- CreateIndex
CREATE UNIQUE INDEX "_RequestTags_AB_unique" ON "_RequestTags"("A", "B");

-- CreateIndex
CREATE INDEX "_RequestTags_B_index" ON "_RequestTags"("B");
