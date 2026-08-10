-- Deduplicate any existing rows sharing a url before adding the unique index.
DELETE FROM "GalleryImage" a
USING "GalleryImage" b
WHERE a."url" = b."url" AND a."id" > b."id";

-- CreateIndex
CREATE UNIQUE INDEX "GalleryImage_url_key" ON "GalleryImage"("url");
