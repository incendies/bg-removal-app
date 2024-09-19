-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processingStatus" TEXT NOT NULL DEFAULT 'pending',
    "tags" TEXT[],

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
