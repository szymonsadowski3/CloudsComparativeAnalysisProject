create table "user"
(
	id serial not null
		constraint user_pkey
			primary key,
	username varchar(255) not null,
	"avatarUrl" text not null
)
;

alter table "user" owner to postgres
;

create table "order"
(
	id serial not null
		constraint order_pkey
			primary key,
	user_id integer not null
		constraint order_user_id_fkey
			references "user",
	status varchar(255) not null,
	"shippingAddress" text not null,
	"createdAt" timestamp not null,
	"updatedAt" timestamp not null
)
;

alter table "order" owner to postgres
;

create index order_user_id
	on "order" (user_id)
;

create table product
(
	id serial not null
		constraint product_pkey
			primary key,
	name varchar(255) not null,
	description text,
	"currentPrice" numeric(10,5) not null,
	"illustrativeMediaUrl" text[] not null,
	"createdAt" timestamp not null,
	tags text[] not null,
	brand varchar(255) not null
)
;

alter table product owner to postgres
;

create index "product_illustrativeMediaUrl"
	on product ("illustrativeMediaUrl")
;

create index product_tags
	on product (tags)
;

create table orderproduct
(
	id serial not null
		constraint orderproduct_pkey
			primary key,
	order_id integer not null
		constraint orderproduct_order_id_fkey
			references "order",
	product_id integer not null
		constraint orderproduct_product_id_fkey
			references product
				on delete cascade,
	quantity integer not null,
	"singlePrice" numeric(10,5) not null
)
;

alter table orderproduct owner to postgres
;

create index orderproduct_order_id
	on orderproduct (order_id)
;

create index orderproduct_product_id
	on orderproduct (product_id)
;

create table rating
(
	id serial not null
		constraint rating_pkey
			primary key,
	rating integer not null,
	"ratedBy_id" integer not null
		constraint "rating_ratedBy_id_fkey"
			references "user",
	comment text,
	"createdAt" timestamp not null
)
;

alter table rating owner to postgres
;

create index "rating_ratedBy_id"
	on rating ("ratedBy_id")
;

create table productrating
(
	id serial not null
		constraint productrating_pkey
			primary key,
	product_id integer not null
		constraint productrating_product_id_fkey
			references product
				on delete cascade,
	rating_id integer not null
		constraint productrating_rating_id_fkey
			references rating
)
;

alter table productrating owner to postgres
;

create index productrating_product_id
	on productrating (product_id)
;

create index productrating_rating_id
	on productrating (rating_id)
;

