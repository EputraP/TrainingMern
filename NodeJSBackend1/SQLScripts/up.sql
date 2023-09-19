CREATE TABLE public.country_list (
	id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
	country varchar NOT NULL,
	value varchar NOT NULL,
	role varchar,
	created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);