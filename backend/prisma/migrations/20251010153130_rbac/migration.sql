-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "public"."Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
