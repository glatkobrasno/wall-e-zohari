-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 0.9.4
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: "KuhajIT" | type: DATABASE --
-- DROP DATABASE IF EXISTS "KuhajIT";
CREATE DATABASE "KuhajIT";
-- ddl-end --


-- object: public."Dijeta" | type: TABLE --
-- DROP TABLE IF EXISTS public."Dijeta" CASCADE;
CREATE TABLE public."Dijeta" (
	"ImeDijeta" varchar(200) NOT NULL,
	"Opis" varchar(2048),
	"MinEnergija" numeric,
	"MaxEnergija" numeric,
	"MinMasnoce" numeric,
	"MaxMasnoce" numeric,
	"MinZMKiseline" numeric,
	"MaxZMKiseline" numeric,
	"MinUgljikohidrati" numeric,
	"MaxUgljikohidrati" numeric,
	"MinSeceri" numeric,
	"MaxSeceri" numeric,
	"MinBjelancevine" numeric,
	"MaxBjelancevine" numeric,
	"MinSol" numeric,
	"MaxSol" numeric,
	"DnevniMaxEnergija" numeric,
	"DnevniMaxMasnoce" numeric,
	"DnevniMaxZMKiseline" numeric,
	"DnevniMaxUgljikohidrati" numeric,
	"DnevniMaxSeceri" numeric,
	"DnevniMaxBjelancevine" numeric,
	"DnevniMaxSol" numeric,
	CONSTRAINT "Dijeta_pk" PRIMARY KEY ("ImeDijeta")
);
-- ddl-end --
ALTER TABLE public."Dijeta" OWNER TO postgres;
-- ddl-end --

-- object: public."Slike" | type: TABLE --
-- DROP TABLE IF EXISTS public."Slike" CASCADE;
CREATE TABLE public."Slike" (
	"IDslika" integer NOT NULL,
	"Slika" bytea,
	CONSTRAINT "Slike_pk" PRIMARY KEY ("IDslika")
);
-- ddl-end --
ALTER TABLE public."Slike" OWNER TO postgres;
-- ddl-end --

-- object: public."Korisnik" | type: TABLE --
-- DROP TABLE IF EXISTS public."Korisnik" CASCADE;
CREATE TABLE public."Korisnik" (
	"KorisnickoIme" varchar(50) NOT NULL,
	"Lozinka" varchar(200),
	"Ime" varchar(50),
	"Prezime" varchar(50),
	"ImeDijeta" varchar(50),
	"RazinaPrivilegije" integer,
	CONSTRAINT "Korisnik_pk" PRIMARY KEY ("KorisnickoIme")
);
-- ddl-end --
ALTER TABLE public."Korisnik" OWNER TO postgres;
-- ddl-end --

-- object: public."PrivilegiraniKorisnik" | type: TABLE --
-- DROP TABLE IF EXISTS public."PrivilegiraniKorisnik" CASCADE;
CREATE TABLE public."PrivilegiraniKorisnik" (
	"KorisnickoIme" varchar(50) NOT NULL,
	"Email" varchar(200),
	"Biografija" varchar(2048),
	"IDslika" integer,
	CONSTRAINT "KorisnickoImeN_pk" PRIMARY KEY ("KorisnickoIme")
);
-- ddl-end --
ALTER TABLE public."PrivilegiraniKorisnik" OWNER TO postgres;
-- ddl-end --

-- object: public."PratiKorisnika" | type: TABLE --
-- DROP TABLE IF EXISTS public."PratiKorisnika" CASCADE;
CREATE TABLE public."PratiKorisnika" (
	"KorisnickoIme_1" varchar(50) NOT NULL,
	"KorisnickoIme_2" varchar(50) NOT NULL,
	CONSTRAINT "Klijent_pk_cp" PRIMARY KEY ("KorisnickoIme_1","KorisnickoIme_2")
);
-- ddl-end --
ALTER TABLE public."PratiKorisnika" OWNER TO postgres;
-- ddl-end --

-- object: public."Proizvod" | type: TABLE --
-- DROP TABLE IF EXISTS public."Proizvod" CASCADE;
CREATE TABLE public."Proizvod" (
	"IDproizvod" integer NOT NULL,
	"ImeProizvod" varchar(200),
	"EnergijaPr" numeric,
	"MasnocePr" numeric,
	"BjelancevinePr" numeric,
	"UgljikohidratiPr" numeric,
	"SolPr" numeric,
	"MasaPr" numeric,
	"ZMKiselinePr" numeric,
	"SeceriPr" numeric,
	"IDslika" integer,
	CONSTRAINT "Proizvod_pk" PRIMARY KEY ("IDproizvod")
);
-- ddl-end --
ALTER TABLE public."Proizvod" OWNER TO postgres;
-- ddl-end --

-- object: public."DodatneOznake" | type: TABLE --
-- DROP TABLE IF EXISTS public."DodatneOznake" CASCADE;
CREATE TABLE public."DodatneOznake" (
	"IDOzn" integer NOT NULL,
	"OpisOzn" varchar(2048),
	CONSTRAINT "DodatneOznake_pk" PRIMARY KEY ("IDOzn")
);
-- ddl-end --
ALTER TABLE public."DodatneOznake" OWNER TO postgres;
-- ddl-end --

-- object: public."Restrikcija" | type: TABLE --
-- DROP TABLE IF EXISTS public."Restrikcija" CASCADE;
CREATE TABLE public."Restrikcija" (
	"ImeDijeta" varchar(200) NOT NULL,
	"IDOzn" integer NOT NULL,
	CONSTRAINT "Restrikcija_pk" PRIMARY KEY ("ImeDijeta","IDOzn")
);
-- ddl-end --
ALTER TABLE public."Restrikcija" OWNER TO postgres;
-- ddl-end --

-- object: public."OznakeProizvoda" | type: TABLE --
-- DROP TABLE IF EXISTS public."OznakeProizvoda" CASCADE;
CREATE TABLE public."OznakeProizvoda" (
	"IDProizvod" integer NOT NULL,
	"IDOzn" integer NOT NULL,
	CONSTRAINT "OznakeProizvoda_pk" PRIMARY KEY ("IDProizvod","IDOzn")
);
-- ddl-end --
ALTER TABLE public."OznakeProizvoda" OWNER TO postgres;
-- ddl-end --

-- object: public."Recept" | type: TABLE --
-- DROP TABLE IF EXISTS public."Recept" CASCADE;
CREATE TABLE public."Recept" (
	"IDrecept" integer NOT NULL,
	"ImeRecept" varchar(200),
	"VelicinaPorcija" integer,
	"VrijemePripreme" time,
	"DatumIzrade" date,
	"KorisnickoIme" varchar(50),
	CONSTRAINT "Recept_pk" PRIMARY KEY ("IDrecept")
);
-- ddl-end --
ALTER TABLE public."Recept" OWNER TO postgres;
-- ddl-end --

-- object: public."PotrebniSastojci" | type: TABLE --
-- DROP TABLE IF EXISTS public."PotrebniSastojci" CASCADE;
CREATE TABLE public."PotrebniSastojci" (
	"IDrecept" integer NOT NULL,
	"IDproizvod" integer NOT NULL,
	"Kolicina" numeric,
	CONSTRAINT "PotrebniSastojci_pk" PRIMARY KEY ("IDrecept","IDproizvod")
);
-- ddl-end --
ALTER TABLE public."PotrebniSastojci" OWNER TO postgres;
-- ddl-end --

-- object: public."Kuharica" | type: TABLE --
-- DROP TABLE IF EXISTS public."Kuharica" CASCADE;
CREATE TABLE public."Kuharica" (
	"IDKuharica" integer NOT NULL,
	"Naslov" varchar(200),
	"DatumIzrade" date,
	"KorisnickoIme" varchar(50),
	CONSTRAINT "Kuharica_pk" PRIMARY KEY ("IDKuharica")
);
-- ddl-end --
ALTER TABLE public."Kuharica" OWNER TO postgres;
-- ddl-end --

-- object: public."Korak" | type: TABLE --
-- DROP TABLE IF EXISTS public."Korak" CASCADE;
CREATE TABLE public."Korak" (
	"IDrecept" integer NOT NULL,
	"IDslika" integer NOT NULL,
	"OpisSl" varchar(2048),
	"OpisKorak" varchar(2048),
	CONSTRAINT "Korak_pk" PRIMARY KEY ("IDrecept","IDslika")
);
-- ddl-end --
ALTER TABLE public."Korak" OWNER TO postgres;
-- ddl-end --

-- object: public."Sadrzi" | type: TABLE --
-- DROP TABLE IF EXISTS public."Sadrzi" CASCADE;
CREATE TABLE public."Sadrzi" (
	"IDRecept" integer NOT NULL,
	"IDKuharica" integer NOT NULL,
	CONSTRAINT "Sadrzi_pk" PRIMARY KEY ("IDRecept","IDKuharica")
);
-- ddl-end --
ALTER TABLE public."Sadrzi" OWNER TO postgres;
-- ddl-end --

-- object: public."Konzumirao" | type: TABLE --
-- DROP TABLE IF EXISTS public."Konzumirao" CASCADE;
CREATE TABLE public."Konzumirao" (
	"KorisnickoIme" varchar(50) NOT NULL,
	"IDrecept" integer NOT NULL,
	"Datum" date,
	CONSTRAINT "Konzumirao_pk" PRIMARY KEY ("KorisnickoIme","IDrecept")
);
-- ddl-end --
ALTER TABLE public."Konzumirao" OWNER TO postgres;
-- ddl-end --

-- object: public."KomentarRecept" | type: TABLE --
-- DROP TABLE IF EXISTS public."KomentarRecept" CASCADE;
CREATE TABLE public."KomentarRecept" (
	"KorisnickoIme" varchar(50) NOT NULL,
	"IDrecept" integer NOT NULL,
	"SadrzajKomentaraR" varchar(2048),
	"OdgovorNaKomentarR" varchar(2048),
	"OcjenaR" integer,
	CONSTRAINT "KomentarRecept_pk" PRIMARY KEY ("KorisnickoIme","IDrecept")
);
-- ddl-end --
ALTER TABLE public."KomentarRecept" OWNER TO postgres;
-- ddl-end --

-- object: public."KomentarKuharica" | type: TABLE --
-- DROP TABLE IF EXISTS public."KomentarKuharica" CASCADE;
CREATE TABLE public."KomentarKuharica" (
	"KorisnickoIme" varchar(50) NOT NULL,
	"IDKuharica" integer NOT NULL,
	"SadrzajKomentaraR" varchar(2048),
	"OdgovorNaKomentarR" varchar(2048),
	"OcjenaK" integer,
	CONSTRAINT "KomentarRecept_pk_cp" PRIMARY KEY ("KorisnickoIme","IDKuharica")
);
-- ddl-end --
ALTER TABLE public."KomentarKuharica" OWNER TO postgres;
-- ddl-end --

-- object: "ImeDijeta_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Korisnik" DROP CONSTRAINT IF EXISTS "ImeDijeta_fk" CASCADE;
ALTER TABLE public."Korisnik" ADD CONSTRAINT "ImeDijeta_fk" FOREIGN KEY ("ImeDijeta")
REFERENCES public."Dijeta" ("ImeDijeta") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoIme_fk" | type: CONSTRAINT --
-- ALTER TABLE public."PrivilegiraniKorisnik" DROP CONSTRAINT IF EXISTS "KorisnickoIme_fk" CASCADE;
ALTER TABLE public."PrivilegiraniKorisnik" ADD CONSTRAINT "KorisnickoIme_fk" FOREIGN KEY ("KorisnickoIme")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDslika_fk" | type: CONSTRAINT --
-- ALTER TABLE public."PrivilegiraniKorisnik" DROP CONSTRAINT IF EXISTS "IDslika_fk" CASCADE;
ALTER TABLE public."PrivilegiraniKorisnik" ADD CONSTRAINT "IDslika_fk" FOREIGN KEY ("IDslika")
REFERENCES public."Slike" ("IDslika") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoIme_1_fk" | type: CONSTRAINT --
-- ALTER TABLE public."PratiKorisnika" DROP CONSTRAINT IF EXISTS "KorisnickoIme_1_fk" CASCADE;
ALTER TABLE public."PratiKorisnika" ADD CONSTRAINT "KorisnickoIme_1_fk" FOREIGN KEY ("KorisnickoIme_1")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoIme_2_fk" | type: CONSTRAINT --
-- ALTER TABLE public."PratiKorisnika" DROP CONSTRAINT IF EXISTS "KorisnickoIme_2_fk" CASCADE;
ALTER TABLE public."PratiKorisnika" ADD CONSTRAINT "KorisnickoIme_2_fk" FOREIGN KEY ("KorisnickoIme_2")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDSlika_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Proizvod" DROP CONSTRAINT IF EXISTS "IDSlika_fk" CASCADE;
ALTER TABLE public."Proizvod" ADD CONSTRAINT "IDSlika_fk" FOREIGN KEY ("IDslika")
REFERENCES public."Slike" ("IDslika") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "ImeDijeta_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Restrikcija" DROP CONSTRAINT IF EXISTS "ImeDijeta_fk" CASCADE;
ALTER TABLE public."Restrikcija" ADD CONSTRAINT "ImeDijeta_fk" FOREIGN KEY ("ImeDijeta")
REFERENCES public."Dijeta" ("ImeDijeta") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDOzn_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Restrikcija" DROP CONSTRAINT IF EXISTS "IDOzn_fk" CASCADE;
ALTER TABLE public."Restrikcija" ADD CONSTRAINT "IDOzn_fk" FOREIGN KEY ("IDOzn")
REFERENCES public."DodatneOznake" ("IDOzn") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDOzn_fk" | type: CONSTRAINT --
-- ALTER TABLE public."OznakeProizvoda" DROP CONSTRAINT IF EXISTS "IDOzn_fk" CASCADE;
ALTER TABLE public."OznakeProizvoda" ADD CONSTRAINT "IDOzn_fk" FOREIGN KEY ("IDOzn")
REFERENCES public."DodatneOznake" ("IDOzn") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDproizvod_fk" | type: CONSTRAINT --
-- ALTER TABLE public."OznakeProizvoda" DROP CONSTRAINT IF EXISTS "IDproizvod_fk" CASCADE;
ALTER TABLE public."OznakeProizvoda" ADD CONSTRAINT "IDproizvod_fk" FOREIGN KEY ("IDProizvod")
REFERENCES public."Proizvod" ("IDproizvod") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoIme_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Recept" DROP CONSTRAINT IF EXISTS "KorisnickoIme_fk" CASCADE;
ALTER TABLE public."Recept" ADD CONSTRAINT "KorisnickoIme_fk" FOREIGN KEY ("KorisnickoIme")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDrecept_fk" | type: CONSTRAINT --
-- ALTER TABLE public."PotrebniSastojci" DROP CONSTRAINT IF EXISTS "IDrecept_fk" CASCADE;
ALTER TABLE public."PotrebniSastojci" ADD CONSTRAINT "IDrecept_fk" FOREIGN KEY ("IDrecept")
REFERENCES public."Recept" ("IDrecept") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDproizvod_fk" | type: CONSTRAINT --
-- ALTER TABLE public."PotrebniSastojci" DROP CONSTRAINT IF EXISTS "IDproizvod_fk" CASCADE;
ALTER TABLE public."PotrebniSastojci" ADD CONSTRAINT "IDproizvod_fk" FOREIGN KEY ("IDproizvod")
REFERENCES public."Proizvod" ("IDproizvod") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoImeAutor_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Kuharica" DROP CONSTRAINT IF EXISTS "KorisnickoImeAutor_fk" CASCADE;
ALTER TABLE public."Kuharica" ADD CONSTRAINT "KorisnickoImeAutor_fk" FOREIGN KEY ("KorisnickoIme")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDslikaKorak_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Korak" DROP CONSTRAINT IF EXISTS "IDslikaKorak_fk" CASCADE;
ALTER TABLE public."Korak" ADD CONSTRAINT "IDslikaKorak_fk" FOREIGN KEY ("IDslika")
REFERENCES public."Slike" ("IDslika") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDreceptKorak_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Korak" DROP CONSTRAINT IF EXISTS "IDreceptKorak_fk" CASCADE;
ALTER TABLE public."Korak" ADD CONSTRAINT "IDreceptKorak_fk" FOREIGN KEY ("IDrecept")
REFERENCES public."Recept" ("IDrecept") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDreceptSadrzi_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Sadrzi" DROP CONSTRAINT IF EXISTS "IDreceptSadrzi_fk" CASCADE;
ALTER TABLE public."Sadrzi" ADD CONSTRAINT "IDreceptSadrzi_fk" FOREIGN KEY ("IDRecept")
REFERENCES public."Recept" ("IDrecept") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDKuharicaSadrzi_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Sadrzi" DROP CONSTRAINT IF EXISTS "IDKuharicaSadrzi_fk" CASCADE;
ALTER TABLE public."Sadrzi" ADD CONSTRAINT "IDKuharicaSadrzi_fk" FOREIGN KEY ("IDKuharica")
REFERENCES public."Kuharica" ("IDKuharica") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoImeKonzumirao_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Konzumirao" DROP CONSTRAINT IF EXISTS "KorisnickoImeKonzumirao_fk" CASCADE;
ALTER TABLE public."Konzumirao" ADD CONSTRAINT "KorisnickoImeKonzumirao_fk" FOREIGN KEY ("KorisnickoIme")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDreceptKonzumirao_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Konzumirao" DROP CONSTRAINT IF EXISTS "IDreceptKonzumirao_fk" CASCADE;
ALTER TABLE public."Konzumirao" ADD CONSTRAINT "IDreceptKonzumirao_fk" FOREIGN KEY ("IDrecept")
REFERENCES public."Recept" ("IDrecept") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoImeKomentarRecept_fk" | type: CONSTRAINT --
-- ALTER TABLE public."KomentarRecept" DROP CONSTRAINT IF EXISTS "KorisnickoImeKomentarRecept_fk" CASCADE;
ALTER TABLE public."KomentarRecept" ADD CONSTRAINT "KorisnickoImeKomentarRecept_fk" FOREIGN KEY ("KorisnickoIme")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDreceptKomentarRecept" | type: CONSTRAINT --
-- ALTER TABLE public."KomentarRecept" DROP CONSTRAINT IF EXISTS "IDreceptKomentarRecept" CASCADE;
ALTER TABLE public."KomentarRecept" ADD CONSTRAINT "IDreceptKomentarRecept" FOREIGN KEY ("IDrecept")
REFERENCES public."Recept" ("IDrecept") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "KorisnickoImeKomentarRecept_fk_cp" | type: CONSTRAINT --
-- ALTER TABLE public."KomentarKuharica" DROP CONSTRAINT IF EXISTS "KorisnickoImeKomentarRecept_fk_cp" CASCADE;
ALTER TABLE public."KomentarKuharica" ADD CONSTRAINT "KorisnickoImeKomentarRecept_fk_cp" FOREIGN KEY ("KorisnickoIme")
REFERENCES public."Korisnik" ("KorisnickoIme") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "IDKuharicaKomentarKuharica_fk" | type: CONSTRAINT --
-- ALTER TABLE public."KomentarKuharica" DROP CONSTRAINT IF EXISTS "IDKuharicaKomentarKuharica_fk" CASCADE;
ALTER TABLE public."KomentarKuharica" ADD CONSTRAINT "IDKuharicaKomentarKuharica_fk" FOREIGN KEY ("IDKuharica")
REFERENCES public."Kuharica" ("IDKuharica") MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


