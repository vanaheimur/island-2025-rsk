CREATE TYPE "public"."status" AS ENUM('submitted', 'in_progress', 'completed');--> statement-breakpoint
CREATE TABLE "asset" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "asset_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"landNumber" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"amount" numeric NOT NULL,
	"isForeign" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "income" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "income_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"description" varchar(255) NOT NULL,
	"amount" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" integer NOT NULL,
	"incomeCategoryId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "income_category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "income_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "mortgage" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "mortgage_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"yearOfPurchase" integer NOT NULL,
	"residentialLocation" varchar(255) NOT NULL,
	"lenderName" varchar(255) NOT NULL,
	"lenderNationalId" varchar(10) NOT NULL,
	"loanNumber" varchar(255) NOT NULL,
	"loanDate" timestamp NOT NULL,
	"loanTermInYears" integer NOT NULL,
	"totalPaymentsForTheYear" numeric NOT NULL,
	"installmentOfNominalValue" numeric NOT NULL,
	"interestExpenses" numeric NOT NULL,
	"remainingDebt" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "other_debt" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "other_debt_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"interestExpenses" numeric NOT NULL,
	"remainingDebt" numeric NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tax_return" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tax_return_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"year" integer NOT NULL,
	"status" "status" NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"nationalId" varchar(10) NOT NULL,
	"address" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "asset" ADD CONSTRAINT "asset_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "income" ADD CONSTRAINT "income_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "income" ADD CONSTRAINT "income_incomeCategoryId_income_category_id_fk" FOREIGN KEY ("incomeCategoryId") REFERENCES "public"."income_category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mortgage" ADD CONSTRAINT "mortgage_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "other_debt" ADD CONSTRAINT "other_debt_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tax_return" ADD CONSTRAINT "tax_return_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;