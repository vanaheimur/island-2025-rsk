CREATE TABLE "vehicle" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vehicle_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"licensePlate" varchar(255) NOT NULL,
	"yearOfPurchase" integer NOT NULL,
	"value" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "other_debt" ADD COLUMN "description" varchar(255) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;