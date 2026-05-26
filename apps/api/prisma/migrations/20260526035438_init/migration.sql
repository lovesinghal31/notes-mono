-- CreateEnum
CREATE TYPE "NoteStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'TRASHED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folder" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalized_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "folder_id" TEXT,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "status" "NoteStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalized_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note_tag" (
    "note_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "note_tag_pkey" PRIMARY KEY ("note_id","tag_id")
);

-- CreateTable
CREATE TABLE "public_share" (
    "id" TEXT NOT NULL,
    "note_id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "public_share_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_id_idx" ON "user"("email", "id");

-- CreateIndex
CREATE INDEX "folder_user_id_idx" ON "folder"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "folder_user_id_normalized_name_key" ON "folder"("user_id", "normalized_name");

-- CreateIndex
CREATE INDEX "note_user_id_idx" ON "note"("user_id");

-- CreateIndex
CREATE INDEX "note_folder_id_idx" ON "note"("folder_id");

-- CreateIndex
CREATE INDEX "note_user_id_status_idx" ON "note"("user_id", "status");

-- CreateIndex
CREATE INDEX "note_user_id_is_pinned_idx" ON "note"("user_id", "is_pinned");

-- CreateIndex
CREATE INDEX "note_user_id_is_favorite_idx" ON "note"("user_id", "is_favorite");

-- CreateIndex
CREATE INDEX "note_created_at_idx" ON "note"("created_at");

-- CreateIndex
CREATE INDEX "tag_user_id_idx" ON "tag"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_user_id_normalized_name_key" ON "tag"("user_id", "normalized_name");

-- CreateIndex
CREATE INDEX "note_tag_note_id_idx" ON "note_tag"("note_id");

-- CreateIndex
CREATE INDEX "note_tag_tag_id_idx" ON "note_tag"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "public_share_note_id_key" ON "public_share"("note_id");

-- CreateIndex
CREATE UNIQUE INDEX "public_share_slug_key" ON "public_share"("slug");

-- AddForeignKey
ALTER TABLE "folder" ADD CONSTRAINT "folder_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_tag" ADD CONSTRAINT "note_tag_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_tag" ADD CONSTRAINT "note_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_share" ADD CONSTRAINT "public_share_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
