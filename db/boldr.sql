--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.0
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS boldr;
--
-- Name: boldr; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE boldr WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE boldr OWNER TO postgres;

\connect boldr

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: action_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE action_type (
    id integer NOT NULL,
    type text NOT NULL,
    CONSTRAINT action_type_type_check CHECK ((type = ANY (ARRAY['create'::text, 'update'::text, 'delete'::text, 'register'::text])))
);


ALTER TABLE action_type OWNER TO postgres;

--
-- Name: action_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE action_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE action_type_id_seq OWNER TO postgres;

--
-- Name: action_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE action_type_id_seq OWNED BY action_type.id;


--
-- Name: activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE activity (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    action_type_id integer NOT NULL,
    activity_post uuid,
    activity_user uuid,
    activity_attachment uuid,
    activity_tag integer,
    activity_menu_detail integer,
    activity_template integer,
    activity_page uuid,
    activity_role integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE activity OWNER TO postgres;

--
-- Name: attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE attachment (
    id uuid NOT NULL,
    file_name character varying(255) NOT NULL,
    original_name character varying(255),
    file_description character varying(255),
    file_type character varying(255),
    user_id uuid NOT NULL,
    url character varying(255) NOT NULL,
    s3_key character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE attachment OWNER TO postgres;

--
-- Name: attachment_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE attachment_category (
    category_id uuid NOT NULL,
    attachment_id uuid NOT NULL
);


ALTER TABLE attachment_category OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    type text,
    description character varying(255),
    icon character varying(255),
    slug character varying(255),
    CONSTRAINT category_type_check CHECK ((type = ANY (ARRAY['article'::text, 'project'::text, 'page'::text, 'media'::text, 'file'::text])))
);


ALTER TABLE category OWNER TO postgres;

--
-- Name: gallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE gallery (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255),
    description character varying(255),
    restricted boolean DEFAULT false,
    status text DEFAULT 'draft'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    CONSTRAINT gallery_status_check CHECK ((status = ANY (ARRAY['published'::text, 'draft'::text, 'archived'::text])))
);


ALTER TABLE gallery OWNER TO postgres;

--
-- Name: gallery_attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE gallery_attachment (
    gallery_id uuid NOT NULL,
    attachment_id uuid NOT NULL
);


ALTER TABLE gallery_attachment OWNER TO postgres;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE knex_migrations_id_seq OWNED BY knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE knex_migrations_lock (
    is_locked integer
);


ALTER TABLE knex_migrations_lock OWNER TO postgres;

--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    name character varying(255) NOT NULL,
    label character varying(255) NOT NULL,
    attributes json,
    restricted boolean DEFAULT false,
    "order" integer NOT NULL
);


ALTER TABLE menu OWNER TO postgres;

--
-- Name: menu_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu_detail (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    label character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    attribute character varying(255),
    "position" integer,
    parent_id integer,
    link character varying(255) NOT NULL,
    icon character varying(255)
);


ALTER TABLE menu_detail OWNER TO postgres;

--
-- Name: menu_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE menu_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE menu_detail_id_seq OWNER TO postgres;

--
-- Name: menu_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE menu_detail_id_seq OWNED BY menu_detail.id;


--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE menu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE menu_id_seq OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE menu_id_seq OWNED BY menu.id;


--
-- Name: menu_menu_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu_menu_detail (
    menu_id integer NOT NULL,
    menu_detail_id integer NOT NULL
);


ALTER TABLE menu_menu_detail OWNER TO postgres;

--
-- Name: page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE page (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    label character varying(255),
    url character varying(255) NOT NULL,
    layout json,
    data json,
    status text DEFAULT 'draft'::text,
    restricted boolean DEFAULT false,
    meta json,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    CONSTRAINT page_status_check CHECK ((status = ANY (ARRAY['published'::text, 'draft'::text, 'archived'::text])))
);


ALTER TABLE page OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post (
    id uuid NOT NULL,
    title character varying(140) NOT NULL,
    slug character varying(255) NOT NULL,
    feature_image character varying(255),
    attachments json,
    meta json,
    featured boolean DEFAULT false,
    content text NOT NULL,
    excerpt text NOT NULL,
    user_id uuid NOT NULL,
    published boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE post OWNER TO postgres;

--
-- Name: post_attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post_attachment (
    post_id uuid NOT NULL,
    attachment_id uuid NOT NULL
);


ALTER TABLE post_attachment OWNER TO postgres;

--
-- Name: post_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post_tag (
    id integer NOT NULL,
    post_id uuid NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE post_tag OWNER TO postgres;

--
-- Name: post_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE post_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE post_tag_id_seq OWNER TO postgres;

--
-- Name: post_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE post_tag_id_seq OWNED BY post_tag.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE role (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    name character varying(64) NOT NULL,
    image character varying(200),
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- Name: setting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE setting (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    key character varying(100) NOT NULL,
    label character varying(100) NOT NULL,
    value character varying(255) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE setting OWNER TO postgres;

--
-- Name: setting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE setting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE setting_id_seq OWNER TO postgres;

--
-- Name: setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE setting_id_seq OWNED BY setting.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tag (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);


ALTER TABLE tag OWNER TO postgres;

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tag_id_seq OWNER TO postgres;

--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tag_id_seq OWNED BY tag.id;


--
-- Name: template; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE template (
    id integer NOT NULL,
    uuid uuid,
    name character varying(100) NOT NULL,
    label character varying(100) NOT NULL,
    resource character varying(255) NOT NULL,
    meta json,
    content json,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE template OWNER TO postgres;

--
-- Name: template_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE template_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE template_id_seq OWNER TO postgres;

--
-- Name: template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE template_id_seq OWNED BY template.id;


--
-- Name: template_page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE template_page (
    id integer NOT NULL,
    page_id uuid NOT NULL,
    template_id integer NOT NULL
);


ALTER TABLE template_page OWNER TO postgres;

--
-- Name: template_page_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE template_page_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE template_page_id_seq OWNER TO postgres;

--
-- Name: template_page_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE template_page_id_seq OWNED BY template_page.id;


--
-- Name: token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE token (
    id integer NOT NULL,
    user_verification_token character varying(255),
    reset_password_token character varying(255),
    reset_password_expiration timestamp with time zone,
    oauth_token character varying(255),
    user_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE token OWNER TO postgres;

--
-- Name: token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE token_id_seq OWNER TO postgres;

--
-- Name: token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE token_id_seq OWNED BY token.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id uuid NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(64) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    display_name character varying(115) NOT NULL,
    avatar_url character varying(255) DEFAULT 'https://boldr.io/images/unknown-avatar.png'::character varying,
    profile_image character varying(255),
    location character varying(100),
    bio text,
    birthday date,
    website character varying(100),
    verified boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_role (
    id integer NOT NULL,
    user_id uuid NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE user_role OWNER TO postgres;

--
-- Name: user_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_role_id_seq OWNER TO postgres;

--
-- Name: user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_role_id_seq OWNED BY user_role.id;


--
-- Name: action_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY action_type ALTER COLUMN id SET DEFAULT nextval('action_type_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY knex_migrations ALTER COLUMN id SET DEFAULT nextval('knex_migrations_id_seq'::regclass);


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu ALTER COLUMN id SET DEFAULT nextval('menu_id_seq'::regclass);


--
-- Name: menu_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail ALTER COLUMN id SET DEFAULT nextval('menu_detail_id_seq'::regclass);


--
-- Name: post_tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_tag ALTER COLUMN id SET DEFAULT nextval('post_tag_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- Name: setting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY setting ALTER COLUMN id SET DEFAULT nextval('setting_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tag ALTER COLUMN id SET DEFAULT nextval('tag_id_seq'::regclass);


--
-- Name: template id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template ALTER COLUMN id SET DEFAULT nextval('template_id_seq'::regclass);


--
-- Name: template_page id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page ALTER COLUMN id SET DEFAULT nextval('template_page_id_seq'::regclass);


--
-- Name: token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token ALTER COLUMN id SET DEFAULT nextval('token_id_seq'::regclass);


--
-- Name: user_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role ALTER COLUMN id SET DEFAULT nextval('user_role_id_seq'::regclass);


--
-- Data for Name: action_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO action_type (id, type) VALUES (1, 'create');
INSERT INTO action_type (id, type) VALUES (2, 'update');
INSERT INTO action_type (id, type) VALUES (3, 'delete');
INSERT INTO action_type (id, type) VALUES (4, 'register');


--
-- Name: action_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('action_type_id_seq', 1, false);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('fceab321-7e3c-42eb-b74d-b8daf8d3874b', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, 'fa390bf5-cd67-48bb-afbe-ee5cb2cd3241', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-23 22:42:08.81+00', '2017-01-23 22:42:08.81+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('d268174e-f2f3-4af6-b6ce-fe2517474af5', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, 'ba0ae362-6dfe-4553-914f-a01810d0a069', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 19:21:14.462+00', '2017-01-24 19:21:14.462+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('1cbd3abe-9da2-4771-8fa4-64942325be93', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, 'c97be611-ccf6-4c1b-9778-714d89d4b60b', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 19:26:02.559+00', '2017-01-24 19:26:02.559+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('c85a8919-a690-4232-bdd0-40b367c20be6', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, 'c2e7bc83-1b78-4f2d-9fbd-3231fe26cb59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 19:28:23.002+00', '2017-01-24 19:28:23.002+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('0cbc9118-2518-4078-8e94-2b730a9e2bf2', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '8dea85f0-7056-41f4-8e85-e0700b57b042', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 19:34:22.308+00', '2017-01-24 19:34:22.308+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('62683a34-a59e-4e43-a408-7ea6e4a2a8b5', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '5e2e21ca-fe44-46c9-a4a6-54b26c14e750', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 19:35:50.774+00', '2017-01-24 19:35:50.774+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('dd5fa3c1-46b7-4c11-9287-398c36e96a6f', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '6bebc65c-3c67-44ec-94fb-a1bdbed5a826', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 19:54:25.615+00', '2017-01-24 19:54:25.615+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('5d549fb1-66ce-426a-bd01-ca195c53aa43', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, NULL, NULL, 'a9a806cd-a7ab-4e82-8a43-eebcb880efdf', NULL, NULL, NULL, NULL, NULL, '2017-01-24 20:13:00.355+00', '2017-01-24 20:13:00.355+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('eb55daa3-ae0d-4d51-931d-1775689a6070', '2303d3e1-4c09-4d5d-bdbf-215c074d142e', 4, NULL, '2303d3e1-4c09-4d5d-bdbf-215c074d142e', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 20:19:12.514+00', '2017-01-24 20:19:12.514+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('a3f5cdbb-3453-45fd-a32c-dda8f0005f43', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '762caae8-5866-42ab-a3f4-0928ba17d539', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:13:52.865+00', '2017-01-24 22:13:52.865+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('c4284809-db56-4897-9a92-26bcc2a68daf', '2c9e73e0-9c7b-4559-aee5-aedddda57837', 4, NULL, '2c9e73e0-9c7b-4559-aee5-aedddda57837', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:13:53.091+00', '2017-01-24 22:13:53.091+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('dbea55ca-509e-4eee-bd2e-d7a80db7855e', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, 'f1d83f5c-53d1-44a5-ad72-69e1bd95e67d', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:14:35.927+00', '2017-01-24 22:14:35.927+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('a3730ed3-9b67-4fd3-9474-eb1f955ceddf', 'bed5eeeb-4393-4c18-88ca-87da0c3c1a6b', 4, NULL, 'bed5eeeb-4393-4c18-88ca-87da0c3c1a6b', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:14:35.965+00', '2017-01-24 22:14:35.965+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('4bd3a462-39ca-4d90-a726-72a9814b0376', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '39a48056-478c-4298-88a3-25fb6454a0ce', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:16:36.286+00', '2017-01-24 22:16:36.286+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('fb9e9b8f-138e-4fac-a9c9-5d7295aa260c', '1b565538-3bb0-4bfa-bfca-060203335519', 4, NULL, '1b565538-3bb0-4bfa-bfca-060203335519', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:16:36.544+00', '2017-01-24 22:16:36.544+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('49474e08-a878-49b5-8a36-c5f65a04c2af', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '74c32a44-2d04-4f2f-bbb1-16e5ac2ed8d4', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:19:33.21+00', '2017-01-24 22:19:33.21+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('5fafa380-c002-4b6a-b96c-41b00947c6c3', 'af3710fe-5922-4641-8c97-5ea7e64ce81c', 4, NULL, 'af3710fe-5922-4641-8c97-5ea7e64ce81c', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:19:33.376+00', '2017-01-24 22:19:33.376+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('934396b6-91c8-4995-80c1-6321fa8a91ef', '3392e959-956e-4c4a-8fb9-11317d9d2d52', 4, NULL, '3392e959-956e-4c4a-8fb9-11317d9d2d52', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:21:07.69+00', '2017-01-24 22:21:07.69+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('3513706d-46e1-4696-9048-0b256b945bf2', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '43229c1b-6878-4278-97fb-f60a0f44d653', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:21:07.851+00', '2017-01-24 22:21:07.851+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('dd2e8c20-c94d-482d-b0db-e4f28d024fb4', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, 'a2622ac8-3496-4dad-b60f-ae3e47890dab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:21:45.702+00', '2017-01-24 22:21:45.702+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('fe43a348-3a01-43ee-9de5-6a9b78536419', 'cd7e4c67-a842-4f88-9f7a-7d6219fea01a', 4, NULL, 'cd7e4c67-a842-4f88-9f7a-7d6219fea01a', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 22:21:45.921+00', '2017-01-24 22:21:45.921+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('a34d0fd2-534e-4bd7-bd60-33e4aa547dae', 'bdef92e0-3aea-4755-95f1-e4ac92ae194d', 4, NULL, 'bdef92e0-3aea-4755-95f1-e4ac92ae194d', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 23:46:04.894+00', '2017-01-24 23:46:04.894+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('5ed3bd3d-4ac7-46e8-924d-b400f715fbd4', 'dd7ef3a8-56c8-4e26-bf24-8e9d8440c37d', 4, NULL, 'dd7ef3a8-56c8-4e26-bf24-8e9d8440c37d', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-24 23:58:21.746+00', '2017-01-24 23:58:21.746+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('3131d528-bea2-4504-84d8-6a8affaae5e0', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 1, '780098d0-2c3e-4a7c-b7a0-088b1898ad1f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-25 00:00:35.651+00', '2017-01-25 00:00:35.651+00');
INSERT INTO activity (id, user_id, action_type_id, activity_post, activity_user, activity_attachment, activity_tag, activity_menu_detail, activity_template, activity_page, activity_role, created_at, updated_at) VALUES ('948e8ee8-8c39-4572-81c4-b27c4c11e917', 'd5bb07dd-f6f3-4aae-bd97-8f88fc76a35f', 4, NULL, 'd5bb07dd-f6f3-4aae-bd97-8f88fc76a35f', NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-25 00:00:36.7+00', '2017-01-25 00:00:36.7+00');


--
-- Data for Name: attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO attachment (id, file_name, original_name, file_description, file_type, user_id, url, s3_key, created_at, updated_at) VALUES ('a9a806cd-a7ab-4e82-8a43-eebcb880efdf', 'ea8b71ec-0d69-476c-981b-41fba715ee9d_logo-small.png', 'logo-small.png', NULL, NULL, '1b062e26-df71-48ce-b363-4ae9b966e7a0', 'https://boldrcms.s3-us-west-1.amazonaws.com/ea8b71ec-0d69-476c-981b-41fba715ee9d_logo-small.png', 'ea8b71ec-0d69-476c-981b-41fba715ee9d_logo-small.png', '2017-01-24 20:13:00.301+00', '2017-01-24 20:13:00.301+00');


--
-- Data for Name: attachment_category; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: gallery_attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (1, '2016112314552_action_type.js', 1, '2017-01-23 22:31:19.386+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (2, '20161201161418_role.js', 1, '2017-01-23 22:31:19.587+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (3, '20161201161500_users.js', 1, '2017-01-23 22:31:19.759+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (4, '20161201161829_token.js', 1, '2017-01-23 22:31:19.912+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (5, '20161201161945_tag.js', 1, '2017-01-23 22:31:20.096+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (6, '20161201162020_post.js', 1, '2017-01-23 22:31:20.315+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (7, '20161201162134_attachment.js', 1, '2017-01-23 22:31:20.42+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (8, '20161201162138_setting.js', 1, '2017-01-23 22:31:20.578+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (9, '20161201162143_navigation.js', 1, '2017-01-23 22:31:20.749+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (10, '20161201162148_link.js', 1, '2017-01-23 22:31:20.935+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (11, '20161201162227_navigation_link.js', 1, '2017-01-23 22:31:20.989+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (12, '20161201162231_gallery.js', 1, '2017-01-23 22:31:21.095+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (13, '20161201162257_post_attachment.js', 2, '2017-01-23 22:33:29.341+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (14, '20161201162305_category.js', 2, '2017-01-23 22:33:29.495+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (15, '20161201162311_attachment_category.js', 2, '2017-01-23 22:33:29.552+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (16, '20161201162328_galley_attachment.js', 2, '2017-01-23 22:33:29.618+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (17, '20161201162346_post_tag.js', 2, '2017-01-23 22:33:29.703+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (18, '20170104170148_template.js', 2, '2017-01-23 22:33:29.895+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (19, '20170105135503_userrole.js', 2, '2017-01-23 22:33:29.977+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (20, '20170110144655_page.js', 2, '2017-01-23 22:33:30.137+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (21, '20170110144742_template_page.js', 2, '2017-01-23 22:33:30.225+00');
INSERT INTO knex_migrations (id, name, batch, migration_time) VALUES (22, '20170118162240_activity.js', 2, '2017-01-23 22:33:30.3+00');


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('knex_migrations_id_seq', 22, true);


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO knex_migrations_lock (is_locked) VALUES (0);


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu (id, uuid, name, label, attributes, restricted, "order") VALUES (1, '908db7f1-05b8-451f-b756-2fbe28c15976', 'Main', 'main', '{}', false, 0);


--
-- Data for Name: menu_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu_detail (id, uuid, label, name, attribute, "position", parent_id, link, icon) VALUES (2, '45f9dcb6-5843-412f-8079-43e55c651e38', 'blog', 'Blog', NULL, 1, NULL, '/blog', 'info');
INSERT INTO menu_detail (id, uuid, label, name, attribute, "position", parent_id, link, icon) VALUES (1, '39daff4d-fbc4-438b-9d85-cdb7bb9770b8', 'about', 'About', NULL, 2, NULL, '/about', 'info');


--
-- Name: menu_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('menu_detail_id_seq', 2, true);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('menu_id_seq', 1, true);


--
-- Data for Name: menu_menu_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu_menu_detail (menu_id, menu_detail_id) VALUES (1, 1);
INSERT INTO menu_menu_detail (menu_id, menu_detail_id) VALUES (1, 2);


--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO page (id, name, label, url, layout, data, status, restricted, meta, created_at, updated_at) VALUES ('87d1e9b3-b32e-474e-9246-6dce1b21a72d', 'Home', 'home', 'home', '{"showHero":true,"showPosts":true}', '{}', 'published', false, '{"title":"Home","description":"The home page"}', '2017-01-23 22:33:37.216782+00', NULL);
INSERT INTO page (id, name, label, url, layout, data, status, restricted, meta, created_at, updated_at) VALUES ('0a277a50-b482-4b86-b0e7-83fdd3a372af', 'About', 'about', 'about', '{"showHero":true,"showPosts":true}', '{}', 'published', false, '{"title":"About","description":"The about page"}', '2017-01-23 22:33:37.229584+00', NULL);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'Just Another Post', 'just-another-post', 'https://boldr.io/image1.jpg', NULL, '{}', false, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-23 22:33:36.976638+00', NULL);
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('cb61bbae-c91e-4014-b665-3485734b88fb', 'Nother One', 'nother-one', 'https://boldr.io/image3.jpg', NULL, '{}', false, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', false, '2017-01-23 22:33:36.992731+00', NULL);
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('ab33a0ca-b349-4cf8-947f-94f415149492', 'Random Post Title', 'random-post-title', 'https://boldr.io/image2.jpg', NULL, '{}', false, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-23 22:33:37.010779+00', NULL);
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('fa390bf5-cd67-48bb-afbe-ee5cb2cd3241', 'heyaaa hey hey ho', 'heyaaa-hey-hey-ho', 'https://boldr.io/boldr.png', NULL, NULL, false, 'aaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaa', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-23 22:42:08.712+00', '2017-01-23 22:42:08.712+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('ba0ae362-6dfe-4553-914f-a01810d0a069', 'District Tactics Manager', 'District-Tactics-Manager', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Architecto explicabo rerum quia voluptas molestias ipsum praesentium sunt. Omnis dolorem minus sit corrupti autem aut non quas. Aliquid sint quas. In optio ex.
 Iure dolore enim. Unde autem velit ea exercitationem qui fugit consequuntur. Quis libero modi perferendis voluptatem hic eligendi et. Quis in officiis voluptatibus facere voluptatem est magnam ut reiciendis.
 Provident a ipsa velit aut numquam sint velit facere voluptate. Saepe sit eum esse. Saepe quisquam quo labore officia non facilis similique deserunt. Sint magni nemo commodi. A non accusantium tenetur quia officia ex exercitationem consequuntur.', 'Hic commodi deserunt. Repellendus fugiat ad. Molestiae aut ipsam minima autem harum iure et beatae. Id fugit enim deserunt atque praesentium libero aliquam excepturi.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 19:21:14.369+00', '2017-01-24 19:21:14.369+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('c97be611-ccf6-4c1b-9778-714d89d4b60b', 'Internal Web Specialist', 'Internal-Web-Specialist', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Eligendi quae fugiat enim ea assumenda. Illum voluptatem sapiente earum est architecto est dolor. Et quisquam tenetur. Voluptatum magnam eaque. Maxime iste eius nesciunt vero ex quo. Ducimus et cupiditate laborum magni quia pariatur perferendis sunt.
 Architecto sint alias. Id eius rerum et nisi placeat quasi non ut. Reiciendis non harum expedita architecto est repellendus.
 Et aliquid est id sint ipsam exercitationem et et voluptatem. Nihil at adipisci. Est voluptas enim ea est consequatur.', 'Qui omnis ex eaque. Id non et sequi maiores. Quia sit architecto consequatur. Eum debitis ut placeat iusto provident et omnis. Aut perferendis ipsam voluptatibus quos.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 19:26:02.508+00', '2017-01-24 19:26:02.508+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('c2e7bc83-1b78-4f2d-9fbd-3231fe26cb59', 'Corporate Applications Officer', 'Corporate-Applications-Officer', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Nostrum ut magni labore est dolorum temporibus unde fugit. Hic laudantium qui. Culpa occaecati ea sapiente. Recusandae sint quis rerum eligendi quidem sint ab odio.
 In facere mollitia atque nemo esse quia. Excepturi aut laudantium. Et voluptatem veritatis explicabo aspernatur nesciunt nihil fugiat. Dolorum qui maiores ipsam. Rerum nam qui ratione.
 A explicabo labore repudiandae quia sed nemo qui. Aut minima alias qui dolorem quae voluptatum. Voluptas sunt non quia. Omnis magnam velit est numquam ratione expedita tempore voluptatem quos. Voluptatum voluptatem ex sed ab voluptatum. Odit rem architecto autem sapiente aperiam.', 'Enim voluptate consequatur ratione dolores non eligendi sunt. Perferendis voluptatum unde. Non assumenda odit. Provident et eum illum sint. Quo vitae deserunt ut. Doloribus adipisci et atque ut perferendis at omnis voluptatem est.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 19:28:22.952+00', '2017-01-24 19:28:22.952+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('8dea85f0-7056-41f4-8e85-e0700b57b042', 'Regional Infrastructure Manager', 'Regional-Infrastructure-Manager', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Ipsam enim sed magni officia et non et a. Sapiente eligendi quam optio odit necessitatibus in amet tempore quidem. Odit non culpa fugiat repudiandae officiis qui consequuntur quaerat velit. Non dolorem consequuntur. Hic quo officiis rerum natus et sunt et sit. Eos perferendis sequi tenetur rem qui.
 Est molestiae eum quod quisquam. Eos odit illo dolores ut aut labore sed repellendus similique. Sequi impedit voluptatibus aliquam libero et aspernatur repudiandae unde consequatur. Accusantium accusamus fuga.
 Earum est perferendis iste laboriosam temporibus et aspernatur ut laboriosam. Voluptate iure qui voluptas. In cupiditate et occaecati error eaque. Aut voluptates omnis. Quae sint dicta quia velit debitis nostrum quia recusandae vel. Voluptate sunt voluptatem rerum est culpa atque consectetur exercitationem earum.', 'Ducimus amet autem doloribus deserunt dolor quo. Sapiente et tempora ea inventore suscipit facere assumenda. Natus omnis culpa. Voluptatibus et voluptatum enim. Doloremque vel aut similique.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 19:34:22.256+00', '2017-01-24 19:34:22.256+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('5e2e21ca-fe44-46c9-a4a6-54b26c14e750', 'Direct Solutions Supervisor', 'Direct-Solutions-Supervisor', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Mollitia quasi placeat magnam officiis. Illum perferendis adipisci non ratione autem qui nemo est aperiam. Cumque ex autem rerum. Ea tempore qui quae accusamus unde eum.
 Officiis ut delectus architecto rem quia beatae. Id dignissimos voluptatem. Magnam dolorem repellendus est adipisci rerum quasi sunt. Quod aspernatur voluptates saepe dignissimos nihil quis. A nemo at ipsum accusantium qui dolore sed eius. Quam tempora consequatur itaque sunt dolores eveniet dolor consequatur dicta.
 Harum reprehenderit id. Quae aliquam eveniet. Perspiciatis voluptate nihil.', 'Et aut tempora ut soluta ullam ipsa sed soluta dolorum. Iste aliquid et quod amet hic. Veritatis accusamus et sunt ut optio dicta.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 19:35:50.728+00', '2017-01-24 19:35:50.728+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('6bebc65c-3c67-44ec-94fb-a1bdbed5a826', 'Human Creative Facilitator', 'Human-Creative-Facilitator', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Ex aspernatur quo molestiae sint exercitationem sed perspiciatis iste qui. Cum quia velit officia. Libero est et ipsa repellat inventore quibusdam expedita culpa exercitationem. Sequi quia asperiores vel. Deserunt voluptatum aut.
 Minima facere et ut rem eveniet ratione. Autem molestiae aperiam. Ex similique dolorem velit dolorem quam esse vero.
 Provident fuga sed incidunt velit. Quos quo mollitia. In aut doloremque tempore. Animi tenetur cupiditate magni. Tenetur nobis sint autem perspiciatis et quidem.', 'Dolor voluptatem et reprehenderit perferendis dolore sequi qui. Id in nulla quis rerum molestiae aperiam maiores nihil delectus. Similique non enim et perferendis. Non incidunt molestiae amet fugiat unde accusantium qui nesciunt.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 19:54:25.557+00', '2017-01-24 19:54:25.558+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('762caae8-5866-42ab-a3f4-0928ba17d539', 'Dynamic Metrics Liason', 'Dynamic-Metrics-Liason', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Est quibusdam perferendis illum rem. Commodi qui eum. Autem non consequatur sed et molestiae.
 Fugit et provident distinctio officiis maiores aut qui aliquam perferendis. Voluptatum repellat non et. Dolores eum ipsa voluptatem dolor expedita et eos eum quis. Vitae eos ratione autem nulla. Error nobis non expedita incidunt. Velit quia quae praesentium et.
 Accusamus explicabo in iste magnam nihil voluptas id voluptas aut. Eos ut quia et non. Minima excepturi consequatur dignissimos unde necessitatibus cumque officia placeat enim. Ea voluptatem quae quia. Ad quas reiciendis magnam dolore dolores voluptatem similique rerum facilis.', 'Vero est fugit veritatis veritatis pariatur placeat. Quas omnis deleniti eum unde ad labore debitis quod. Aliquid labore aut doloremque rerum tenetur. Magni optio rerum cumque sint quia distinctio.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 22:13:52.811+00', '2017-01-24 22:13:52.811+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('f1d83f5c-53d1-44a5-ad72-69e1bd95e67d', 'Future Solutions Producer', 'Future-Solutions-Producer', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Eum doloremque et. Cupiditate et illo eveniet vitae. Eaque nesciunt esse hic. Omnis sunt et expedita impedit veritatis.
 Qui et amet eos consequuntur autem voluptates velit culpa doloribus. Est id sit sequi. Occaecati tenetur eius et ut debitis. Omnis assumenda natus odit illo officia optio. Consectetur et quasi velit. Vel eaque sit voluptatem.
 Officiis voluptatem illum suscipit cumque consequuntur ea ut. Dolore repudiandae quaerat natus ut excepturi inventore ullam a et. Qui dolore quo atque veritatis optio facilis minima autem. Et corrupti rerum quibusdam asperiores natus quia.', 'Sunt rem quas velit quo est. Porro laudantium fuga aut. Ullam incidunt dolores quis numquam ut. Ut aut est omnis incidunt inventore. Facilis commodi saepe consequuntur. Omnis sapiente facere dolores saepe enim exercitationem.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 22:14:35.869+00', '2017-01-24 22:14:35.869+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('39a48056-478c-4298-88a3-25fb6454a0ce', 'Internal Integration Technician', 'Internal-Integration-Technician', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Sint eum qui et eveniet eaque quia impedit harum. Et voluptatem est hic et dolorem non et. Amet incidunt quibusdam.
 Laudantium in ut beatae quos iste. Quo officiis est labore. Ipsam iusto aliquid. Optio tenetur officiis nemo rerum repellat suscipit incidunt. Optio officia voluptatem sint laboriosam quia qui aperiam libero. Doloribus sit tempora.
 Sed voluptatem quasi rem ipsa aut consectetur beatae. Eum cupiditate omnis quidem debitis quia eligendi quod dicta qui. Dolorem fuga illo qui quisquam. Quia voluptatem qui delectus ea aspernatur dolores voluptatem doloribus quasi. Est dolores qui suscipit. Corporis aliquam alias iste voluptates fugiat tempore quasi quia.', 'Officia id enim odit et delectus nobis. Quos magni sunt consequuntur quia velit. Aliquid quia provident et ducimus assumenda enim officia. Fugiat ipsam ex eligendi qui sed sint id provident. Dolorum sit nostrum sit cum fugiat qui velit.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 22:16:36.237+00', '2017-01-24 22:16:36.237+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('74c32a44-2d04-4f2f-bbb1-16e5ac2ed8d4', 'Product Intranet Strategist', 'Product-Intranet-Strategist', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Sunt quod consequatur minima et. Voluptates libero officia aut nihil quia delectus totam assumenda eius. Culpa rerum sed eveniet veniam non et dolore.
 Minus ullam quos cum architecto asperiores dignissimos non officia. Quidem ut suscipit qui vero. Dolores dolores maiores architecto eligendi perspiciatis exercitationem doloremque reprehenderit.
 Deleniti suscipit voluptas veniam. Iusto repudiandae consectetur repellendus. Dolore in minima est unde. Dolorem dolor est dolores facere nam.', 'Ut eligendi minima optio neque provident commodi quis beatae. Ut id veniam id itaque recusandae quia pariatur numquam sed. Ex voluptatem sint accusamus minus eum dolorem ut.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 22:19:33.148+00', '2017-01-24 22:19:33.148+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('43229c1b-6878-4278-97fb-f60a0f44d653', 'Global Security Manager', 'Global-Security-Manager', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Itaque voluptate aut officia cumque id repellendus distinctio autem. Saepe et dolor optio voluptatibus sequi. Occaecati in quis sit. Nostrum quod corrupti nemo. Autem repudiandae et ab praesentium possimus eaque. Voluptatem fuga et est repellat natus tenetur dicta sint.
 Provident commodi sit odit. Ullam numquam deserunt nobis eaque ut id quis. Enim dolorem error. Vitae fugiat nisi nihil repellendus magnam.
 Quia quam molestiae molestiae et. Ut aliquam ut illo ut voluptatem voluptas. Explicabo consequatur dolore dicta. Neque repudiandae esse dolore assumenda molestias architecto eos. Id pariatur facilis ut repellat eos et.', 'In impedit velit doloremque ut maiores vel odit tempore officia. Omnis aut voluptates. Consectetur sapiente similique quia debitis dolore est est. Qui odio rerum nesciunt quis. Fugit ut sit itaque expedita fuga aut sit.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 22:21:07.796+00', '2017-01-24 22:21:07.796+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('a2622ac8-3496-4dad-b60f-ae3e47890dab', 'Regional Branding Planner', 'Regional-Branding-Planner', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Sapiente ea veritatis in id autem itaque velit voluptatem numquam. At doloribus et pariatur eaque hic. Fugiat consectetur et temporibus tenetur. Sint non nobis fugit non eum. Quam vel dolorum officia aliquam porro nesciunt assumenda sunt. Dolorem maiores similique iusto nisi laudantium illum a magni.
 Voluptatum blanditiis sit necessitatibus ullam impedit quia. Omnis quasi optio. Est aspernatur quod delectus est molestias quam qui consequatur. Omnis exercitationem at et tempora nemo. Ullam excepturi impedit optio sunt consequuntur veniam cupiditate et. Rerum aut et.
 Nesciunt et ipsa inventore aliquam et. Sint occaecati dolore blanditiis quas inventore enim corporis nam. Sed rerum est enim sit. Quod nam facere dicta officia eaque earum. Repudiandae distinctio debitis laborum.', 'Possimus fugit consequatur eos. Laborum est ratione est quas at consectetur reprehenderit id ab. Placeat molestiae eius dolores qui sunt sit perspiciatis. Cum itaque aut. Cupiditate sit in ut. Est voluptas earum numquam perspiciatis quia.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-24 22:21:45.651+00', '2017-01-24 22:21:45.651+00');
INSERT INTO post (id, title, slug, feature_image, attachments, meta, featured, content, excerpt, user_id, published, created_at, updated_at) VALUES ('780098d0-2c3e-4a7c-b7a0-088b1898ad1f', 'Investor Operations Officer', 'Investor-Operations-Officer', 'http://lorempixel.com/640/480', NULL, NULL, false, 'Distinctio culpa natus illo voluptas qui. Inventore quo repellat numquam ad exercitationem. Provident omnis est aut tempora doloribus placeat non. Et rem sed. Et odio ut atque unde dignissimos.
 Quasi sed fugit aut voluptatum officia est sunt. Et quae rerum in dolorum quam ipsa officiis. Repellat cumque eum repellat praesentium. Totam optio cum et blanditiis nihil qui.
 Quas odio ab aut debitis sed ea. Optio accusantium et rerum ut mollitia qui eveniet. In praesentium sed ut dolores et rem. Iure quod adipisci nulla odio hic ut sequi quisquam.', 'Itaque nam facere facilis ipsa est et. Exercitationem est molestias placeat non in. Autem similique dolorem hic in quis quia laudantium corporis voluptas. Quia animi autem vitae corporis occaecati consequuntur. Quas earum ipsam magni totam magnam cum sed. Velit nobis rem iusto cupiditate eum perferendis ad.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-01-25 00:00:35.61+00', '2017-01-25 00:00:35.61+00');


--
-- Data for Name: post_attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: post_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO post_tag (id, post_id, tag_id) VALUES (1, '5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 2);
INSERT INTO post_tag (id, post_id, tag_id) VALUES (2, 'cb61bbae-c91e-4014-b665-3485734b88fb', 1);
INSERT INTO post_tag (id, post_id, tag_id) VALUES (3, 'ab33a0ca-b349-4cf8-947f-94f415149492', 2);


--
-- Name: post_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('post_tag_id_seq', 3, true);


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO role (id, uuid, name, image, description, created_at, updated_at) VALUES (1, 'a0664851-cada-44ed-a60c-7234f9bfa74d', 'Member', NULL, 'A verified user without special privileges', '2017-01-23 22:33:36.858918+00', NULL);
INSERT INTO role (id, uuid, name, image, description, created_at, updated_at) VALUES (2, 'bf0cafe5-808f-4a87-932c-da26cb9bae31', 'Staff', NULL, 'Allows access to the CMS dashboard.', '2017-01-23 22:33:36.872452+00', NULL);
INSERT INTO role (id, uuid, name, image, description, created_at, updated_at) VALUES (3, '9b490322-26aa-4374-8840-1d010f406d8c', 'Admin', NULL, 'Complete control over the CMS', '2017-01-23 22:33:36.88413+00', NULL);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('role_id_seq', 3, true);


--
-- Data for Name: setting; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO setting (id, uuid, key, label, value, description) VALUES (1, '96cbccae-bb62-4895-961a-7966839146aa', 'site_name', 'Site Name', 'Boldr', 'The website name.');
INSERT INTO setting (id, uuid, key, label, value, description) VALUES (2, '0c60d1e4-cc19-459c-a31c-2e7cf91fc4f4', 'site_url', 'Site URL', 'http://localhost:3000', 'The address used to access your website.');
INSERT INTO setting (id, uuid, key, label, value, description) VALUES (3, 'd54d7c6f-5869-414f-a2e1-b0458a2fb828', 'site_logo', 'Site Logo', 'https://boldr.io/boldr.png', 'The logo is displayed in the header area.');
INSERT INTO setting (id, uuid, key, label, value, description) VALUES (4, 'e8ed37d2-2b72-4777-8839-4ff12b15c1b4', 'site_description', 'Site Description', 'A modern CMS', 'Meta header for search results.');
INSERT INTO setting (id, uuid, key, label, value, description) VALUES (5, 'a746b40a-3939-45d7-a3e0-35b26a4c3707', 'favicon', 'Favicon', 'https://boldr.io/favicon.ico', 'Favicon to use for your website.');
INSERT INTO setting (id, uuid, key, label, value, description) VALUES (6, 'e5cf6945-3ba1-4cf6-a7e6-eb836b652d54', 'google_analytics', 'Google Analytics ID', 'UA-323432', 'Google Analytics tracking code');
INSERT INTO setting (id, uuid, key, label, value, description) VALUES (7, 'b86c5e47-71f6-4946-b0b7-546abedf74ae', 'allow_registration', 'Allow Registration', 'true', 'Toggle allowing user''s to register for accounts.');


--
-- Name: setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('setting_id_seq', 7, true);


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tag (id, uuid, name, description) VALUES (1, '53fbcad9-f76b-4267-8c7a-0b5f17c56386', 'javascript', 'Something something JS');
INSERT INTO tag (id, uuid, name, description) VALUES (2, 'd4743d4c-ff99-4ab5-962a-82f41cf7696c', 'apple', 'Stuff about stuff.');


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tag_id_seq', 2, true);


--
-- Data for Name: template; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO template (id, uuid, name, label, resource, meta, content, created_at, updated_at) VALUES (1, 'c23891fb-88c2-4e91-b95d-c652f15eab0c', 'base', 'Base', '/', '{}', '{}', '2017-01-23 22:33:37.187984+00', NULL);
INSERT INTO template (id, uuid, name, label, resource, meta, content, created_at, updated_at) VALUES (2, 'd42f91fb-88c2-4e91-b95d-c652f15eab0c', 'content', 'Content', 'content', '{}', '{}', '2017-01-23 22:33:37.201943+00', NULL);


--
-- Name: template_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('template_id_seq', 1, false);


--
-- Data for Name: template_page; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO template_page (id, page_id, template_id) VALUES (1, '87d1e9b3-b32e-474e-9246-6dce1b21a72d', 1);
INSERT INTO template_page (id, page_id, template_id) VALUES (2, '0a277a50-b482-4b86-b0e7-83fdd3a372af', 2);


--
-- Name: template_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('template_page_id_seq', 2, true);


--
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (8, '$2a$10$cqSxQDe0/Dp8lsPGjYy6mOhyEianT1JRbRVBi8LKI0TbmpQs39BdK', NULL, NULL, NULL, '2303d3e1-4c09-4d5d-bdbf-215c074d142e', '2017-01-24 20:19:12.478+00', '2017-01-24 20:19:12.478+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (9, '$2a$10$hL3RFd6Z0W0xgsflTWp9LucF4EHaUFzj3EfZ6j.n7iMxx44C2Xq1W', NULL, NULL, NULL, '2c9e73e0-9c7b-4559-aee5-aedddda57837', '2017-01-24 22:13:53.069+00', '2017-01-24 22:13:53.069+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (10, '$2a$10$TOZ/.weQJ/bxvj4jOcCKJ.WCIvBeJGcQ1bAkomCAEUUEgf/KX1W/u', NULL, NULL, NULL, 'bed5eeeb-4393-4c18-88ca-87da0c3c1a6b', '2017-01-24 22:14:35.944+00', '2017-01-24 22:14:35.944+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (11, '$2a$10$gYlpkutPcFnUNzBJJ5pnCeiNhCz3fCVzQhiP1Xe3izONHih7/C4Oi', NULL, NULL, NULL, '1b565538-3bb0-4bfa-bfca-060203335519', '2017-01-24 22:16:36.52+00', '2017-01-24 22:16:36.52+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (12, '$2a$10$gPu1NivoSd4VEYMwzpeEy.Pa7xcqY3rsd48rdEQL45h.0yidsPyM2', NULL, NULL, NULL, 'af3710fe-5922-4641-8c97-5ea7e64ce81c', '2017-01-24 22:19:33.349+00', '2017-01-24 22:19:33.349+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (13, '$2a$10$yn8i3AOe8KBCeOsY/uO1qOGtvGUfsXVhQbCCSVTGQk8DTkCPF9Gc.', NULL, NULL, NULL, '3392e959-956e-4c4a-8fb9-11317d9d2d52', '2017-01-24 22:21:07.662+00', '2017-01-24 22:21:07.662+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (14, '$2a$10$57qzeG/eKkiJiSGxWBU4Fe/rIcebCPsakXT8Mc/bNf9V44duzLKRa', NULL, NULL, NULL, 'cd7e4c67-a842-4f88-9f7a-7d6219fea01a', '2017-01-24 22:21:45.898+00', '2017-01-24 22:21:45.898+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (15, '$2a$10$Kbcqv6T.1FtT1UAaxg9Vl.Y.EQLDHlPAI3ylsz3mfOyFBHuBYrf32', NULL, NULL, NULL, 'bdef92e0-3aea-4755-95f1-e4ac92ae194d', '2017-01-24 23:46:04.868+00', '2017-01-24 23:46:04.868+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (16, '$2a$10$z4Mjx6NUrR0/IR1nPuARLuzz1xhpsLVIT5MPxlKIsrrQSlePWeRh2', NULL, NULL, NULL, 'dd7ef3a8-56c8-4e26-bf24-8e9d8440c37d', '2017-01-24 23:58:21.73+00', '2017-01-24 23:58:21.73+00');
INSERT INTO token (id, user_verification_token, reset_password_token, reset_password_expiration, oauth_token, user_id, created_at, updated_at) VALUES (17, '$2a$10$2CoWeHVoaVqe4l8DrcRU5O4zM3Q0zz8s8jJOkGcBfVMGhn5mELAOu', NULL, NULL, NULL, 'd5bb07dd-f6f3-4aae-bd97-8f88fc76a35f', '2017-01-25 00:00:36.678+00', '2017-01-25 00:00:36.678+00');


--
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('token_id_seq', 17, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('1b062e26-df71-48ce-b363-4ae9b966e7a0', 'admin@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Joe', 'Gray', 'Joey', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Colorado', 'I am me.', '1988-01-01', 'https://boldr.io', true, '2017-01-23 22:33:36.903307+00', NULL);
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'demo@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Sam', 'Hunt', 'Samus', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'California', 'Someone doing things.', '1988-01-01', 'https://boldr.io', true, '2017-01-23 22:33:36.931741+00', NULL);
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('f4d869a6-1a75-469b-a9cc-965c552929e4', 'user@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Jessica', 'Smith', 'Jess', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Washington', 'Just a person', '1988-01-01', 'https://boldr.io', true, '2017-01-23 22:33:36.916554+00', NULL);
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('2303d3e1-4c09-4d5d-bdbf-215c074d142e', 'steven@strues.io', '$2a$10$SXj4AbmeLBYaArIek3U0rOIsaRS3GOwkW1y6n4we8D8zxh7Sj5N42', 'Steven', 'Tru', 'Strues', 'https://boldr.io/images/unknown-avatar.png', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 20:19:12.039+00', '2017-01-24 20:19:12.039+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('2c9e73e0-9c7b-4559-aee5-aedddda57837', 'ottilie_sporer13@hotmail.com', '$2a$10$d8RzfXSmbWtmoN6fWb1zV.V1xHORMFsOnRCao03rDSmMraFaH/Mkm', 'Pauline', 'Bartoletti', 'Myles80', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 22:13:52.495+00', '2017-01-24 22:13:52.495+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('bed5eeeb-4393-4c18-88ca-87da0c3c1a6b', 'rubye29@hotmail.com', '$2a$10$l0oaw6MxWTOwgnHuleceWOzWdcPRKcoJBtis/.eXgIYph8uxyPeHa', 'Tyra', 'Abernathy', 'Dion27', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 22:14:35.333+00', '2017-01-24 22:14:35.333+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('1b565538-3bb0-4bfa-bfca-060203335519', 'jaredlangosh@gmail.com', '$2a$10$mYRXulj7PDVWDKIxAGiZdOs5UloIGERSyaPIzkQ/d0Cc8uqqOwC/O', 'Alessia', 'Veum', 'Ebony_Harvey37', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 22:16:35.905+00', '2017-01-24 22:16:35.905+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('af3710fe-5922-4641-8c97-5ea7e64ce81c', 'mariela84@gmail.com', '$2a$10$Cvesbfg0LT5DSCCyRglBGe7yDrPaPRWovt.5V8RKvSqxnHdYvqlAa', 'Lexus', 'Kuhic', 'Cyrus_Gibson46', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 22:19:32.748+00', '2017-01-24 22:19:32.748+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('3392e959-956e-4c4a-8fb9-11317d9d2d52', 'rudy16@hotmail.com', '$2a$10$nQ0FSJ0UwofXEDg3NB6UXOUx/BUskrsY1PfNfw0cJuJGBbeWuYMjm', 'Janis', 'Kovacek', 'Giuseppe.Ortiz20', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 22:21:07.071+00', '2017-01-24 22:21:07.071+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('cd7e4c67-a842-4f88-9f7a-7d6219fea01a', 'conor.hackett@hotmail.com', '$2a$10$lEKozkyjK/ltlcSDV7.aj.kbDNs9Hqk805.P3mSvrCuSr7KfJn.L6', 'Nicola', 'McLaughlin', 'Ryley_Krajcik', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 22:21:45.256+00', '2017-01-24 22:21:45.256+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('bdef92e0-3aea-4755-95f1-e4ac92ae194d', 'ruthie.raynor@yahoo.com', '$2a$10$KoEqDbA5Jn5zsNfYKwC6GOIlMUTFa8hAHaNxPIbZTmsE7eKki1ZrK', 'Gabrielle', 'Lueilwitz', 'Alfredo45', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 23:46:04.4+00', '2017-01-24 23:46:04.4+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('dd7ef3a8-56c8-4e26-bf24-8e9d8440c37d', 'taryn13@yahoo.com', '$2a$10$ATWREzgLmxh9LZjvXKPrDephNSnCOtjiRXTUrySFFguOoqWWCNCyC', 'Estefania', 'Bode', 'Bradley.Gusikowski70', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-24 23:58:21.283+00', '2017-01-24 23:58:21.283+00');
INSERT INTO "user" (id, email, password, first_name, last_name, display_name, avatar_url, profile_image, location, bio, birthday, website, verified, created_at, updated_at) VALUES ('d5bb07dd-f6f3-4aae-bd97-8f88fc76a35f', 'elinore19@hotmail.com', '$2a$10$7ZWmq2g0IGgIUdy0PGhAvu0.dqEBlfQ4An4tzkCguvW/g1cbe6UBG', 'Rogers', 'Carroll', 'Deshaun.Raynor76', 'http://lorempixel.com/640/480', NULL, NULL, NULL, NULL, NULL, false, '2017-01-25 00:00:36.258+00', '2017-01-25 00:00:36.258+00');


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_role (id, user_id, role_id) VALUES (1, '1b062e26-df71-48ce-b363-4ae9b966e7a0', 3);
INSERT INTO user_role (id, user_id, role_id) VALUES (6, 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (7, 'f4d869a6-1a75-469b-a9cc-965c552929e4', 2);
INSERT INTO user_role (id, user_id, role_id) VALUES (15, '2303d3e1-4c09-4d5d-bdbf-215c074d142e', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (16, '2c9e73e0-9c7b-4559-aee5-aedddda57837', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (17, 'bed5eeeb-4393-4c18-88ca-87da0c3c1a6b', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (18, '1b565538-3bb0-4bfa-bfca-060203335519', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (19, 'af3710fe-5922-4641-8c97-5ea7e64ce81c', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (20, '3392e959-956e-4c4a-8fb9-11317d9d2d52', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (21, 'cd7e4c67-a842-4f88-9f7a-7d6219fea01a', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (22, 'bdef92e0-3aea-4755-95f1-e4ac92ae194d', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (23, 'dd7ef3a8-56c8-4e26-bf24-8e9d8440c37d', 1);
INSERT INTO user_role (id, user_id, role_id) VALUES (24, 'd5bb07dd-f6f3-4aae-bd97-8f88fc76a35f', 1);


--
-- Name: user_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_role_id_seq', 24, true);


--
-- Name: action_type action_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY action_type
    ADD CONSTRAINT action_type_pkey PRIMARY KEY (id);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: attachment_category attachment_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment_category
    ADD CONSTRAINT attachment_category_pkey PRIMARY KEY (category_id, attachment_id);


--
-- Name: attachment attachment_file_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_file_name_unique UNIQUE (file_name);


--
-- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id);


--
-- Name: category category_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_name_unique UNIQUE (name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: gallery_attachment gallery_attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY gallery_attachment
    ADD CONSTRAINT gallery_attachment_pkey PRIMARY KEY (gallery_id, attachment_id);


--
-- Name: gallery gallery_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY gallery
    ADD CONSTRAINT gallery_name_unique UNIQUE (name);


--
-- Name: gallery gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY gallery
    ADD CONSTRAINT gallery_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: menu_detail menu_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_pkey PRIMARY KEY (id);


--
-- Name: menu_detail menu_detail_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_uuid_unique UNIQUE (uuid);


--
-- Name: menu_menu_detail menu_menu_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_menu_detail
    ADD CONSTRAINT menu_menu_detail_pkey PRIMARY KEY (menu_id, menu_detail_id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: menu menu_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu
    ADD CONSTRAINT menu_uuid_unique UNIQUE (uuid);


--
-- Name: page page_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY page
    ADD CONSTRAINT page_name_unique UNIQUE (name);


--
-- Name: page page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY page
    ADD CONSTRAINT page_pkey PRIMARY KEY (id);


--
-- Name: page page_url_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY page
    ADD CONSTRAINT page_url_unique UNIQUE (url);


--
-- Name: post_attachment post_attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_attachment
    ADD CONSTRAINT post_attachment_pkey PRIMARY KEY (post_id, attachment_id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: post post_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_slug_unique UNIQUE (slug);


--
-- Name: post_tag post_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_tag
    ADD CONSTRAINT post_tag_pkey PRIMARY KEY (id);


--
-- Name: post_tag post_tag_post_id_tag_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_tag
    ADD CONSTRAINT post_tag_post_id_tag_id_unique UNIQUE (post_id, tag_id);


--
-- Name: post post_title_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_title_unique UNIQUE (title);


--
-- Name: role role_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_name_unique UNIQUE (name);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: role role_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_uuid_unique UNIQUE (uuid);


--
-- Name: setting setting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY setting
    ADD CONSTRAINT setting_pkey PRIMARY KEY (id);


--
-- Name: setting setting_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY setting
    ADD CONSTRAINT setting_uuid_unique UNIQUE (uuid);


--
-- Name: tag tag_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_name_unique UNIQUE (name);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: tag tag_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_uuid_unique UNIQUE (uuid);


--
-- Name: template template_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template
    ADD CONSTRAINT template_name_unique UNIQUE (name);


--
-- Name: template_page template_page_page_id_template_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page
    ADD CONSTRAINT template_page_page_id_template_id_unique UNIQUE (page_id, template_id);


--
-- Name: template_page template_page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page
    ADD CONSTRAINT template_page_pkey PRIMARY KEY (id);


--
-- Name: template template_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template
    ADD CONSTRAINT template_pkey PRIMARY KEY (id);


--
-- Name: token token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- Name: user user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_user_id_role_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_user_id_role_id_unique UNIQUE (user_id, role_id);


--
-- Name: action_type_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX action_type_type_index ON action_type USING btree (type);


--
-- Name: category_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX category_name_index ON category USING btree (name);


--
-- Name: category_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX category_type_index ON category USING btree (type);


--
-- Name: menu_detail_label_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_label_index ON menu_detail USING btree (label);


--
-- Name: menu_detail_link_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_link_index ON menu_detail USING btree (link);


--
-- Name: menu_detail_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_uuid_index ON menu_detail USING btree (uuid);


--
-- Name: menu_label_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_label_index ON menu USING btree (label);


--
-- Name: menu_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_uuid_index ON menu USING btree (uuid);


--
-- Name: page_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX page_name_index ON page USING btree (name);


--
-- Name: post_created_at_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX post_created_at_index ON post USING btree (created_at);


--
-- Name: post_published_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX post_published_index ON post USING btree (published);


--
-- Name: post_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX post_slug_index ON post USING btree (slug);


--
-- Name: role_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX role_name_index ON role USING btree (name);


--
-- Name: role_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX role_uuid_index ON role USING btree (uuid);


--
-- Name: setting_key_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX setting_key_index ON setting USING btree (key);


--
-- Name: setting_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX setting_uuid_index ON setting USING btree (uuid);


--
-- Name: tag_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tag_name_index ON tag USING btree (name);


--
-- Name: tag_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tag_uuid_index ON tag USING btree (uuid);


--
-- Name: template_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_name_index ON template USING btree (name);


--
-- Name: template_resource_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_resource_index ON template USING btree (resource);


--
-- Name: template_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_uuid_index ON template USING btree (uuid);


--
-- Name: token_reset_password_token_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX token_reset_password_token_index ON token USING btree (reset_password_token);


--
-- Name: token_user_verification_token_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX token_user_verification_token_index ON token USING btree (user_verification_token);


--
-- Name: user_email_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_email_index ON "user" USING btree (email);


--
-- Name: user_verified_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_verified_index ON "user" USING btree (verified);


--
-- Name: activity activity_action_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_action_type_id_foreign FOREIGN KEY (action_type_id) REFERENCES action_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_attachment_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_attachment_foreign FOREIGN KEY (activity_attachment) REFERENCES attachment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_menu_detail_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_menu_detail_foreign FOREIGN KEY (activity_menu_detail) REFERENCES menu_detail(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_page_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_page_foreign FOREIGN KEY (activity_page) REFERENCES page(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_post_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_post_foreign FOREIGN KEY (activity_post) REFERENCES post(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_role_foreign FOREIGN KEY (activity_role) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_tag_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_tag_foreign FOREIGN KEY (activity_tag) REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_template_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_template_foreign FOREIGN KEY (activity_template) REFERENCES template(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activity_user_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activity_user_foreign FOREIGN KEY (activity_user) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attachment_category attachment_category_attachment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment_category
    ADD CONSTRAINT attachment_category_attachment_id_foreign FOREIGN KEY (attachment_id) REFERENCES attachment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attachment_category attachment_category_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment_category
    ADD CONSTRAINT attachment_category_category_id_foreign FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attachment attachment_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gallery_attachment gallery_attachment_attachment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY gallery_attachment
    ADD CONSTRAINT gallery_attachment_attachment_id_foreign FOREIGN KEY (attachment_id) REFERENCES attachment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gallery_attachment gallery_attachment_gallery_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY gallery_attachment
    ADD CONSTRAINT gallery_attachment_gallery_id_foreign FOREIGN KEY (gallery_id) REFERENCES gallery(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: menu_menu_detail menu_menu_detail_menu_detail_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_menu_detail
    ADD CONSTRAINT menu_menu_detail_menu_detail_id_foreign FOREIGN KEY (menu_detail_id) REFERENCES menu_detail(id);


--
-- Name: menu_menu_detail menu_menu_detail_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_menu_detail
    ADD CONSTRAINT menu_menu_detail_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES menu(id);


--
-- Name: post_attachment post_attachment_attachment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_attachment
    ADD CONSTRAINT post_attachment_attachment_id_foreign FOREIGN KEY (attachment_id) REFERENCES attachment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_attachment post_attachment_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_attachment
    ADD CONSTRAINT post_attachment_post_id_foreign FOREIGN KEY (post_id) REFERENCES post(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_tag post_tag_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_tag
    ADD CONSTRAINT post_tag_post_id_foreign FOREIGN KEY (post_id) REFERENCES post(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_tag post_tag_tag_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_tag
    ADD CONSTRAINT post_tag_tag_id_foreign FOREIGN KEY (tag_id) REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post post_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post
    ADD CONSTRAINT post_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: template_page template_page_page_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page
    ADD CONSTRAINT template_page_page_id_foreign FOREIGN KEY (page_id) REFERENCES page(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: template_page template_page_template_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page
    ADD CONSTRAINT template_page_template_id_foreign FOREIGN KEY (template_id) REFERENCES template(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: token token_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token
    ADD CONSTRAINT token_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role user_role_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_role_id_foreign FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role user_role_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

