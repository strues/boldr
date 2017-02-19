--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.2

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


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE activity (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    type text NOT NULL,
    activity_post uuid,
    activity_user uuid,
    activity_attachment uuid,
    activity_tag integer,
    activity_menu_detail integer,
    activity_template integer,
    activity_page uuid,
    activity_role integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    CONSTRAINT activity_type_check CHECK ((type = ANY (ARRAY['create'::text, 'update'::text, 'delete'::text, 'register'::text])))
);


ALTER TABLE activity OWNER TO postgres;

--
-- Name: attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE attachment (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    file_name character varying(255),
    safe_name character varying(255),
    file_description character varying(255),
    file_type character varying(255),
    user_id uuid NOT NULL,
    url character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE attachment OWNER TO postgres;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE comment (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    content text NOT NULL,
    raw_content json,
    likes integer,
    dislikes integer,
    reported boolean DEFAULT false,
    comment_author_id uuid NOT NULL,
    comment_author_ip character varying(255),
    comment_parent_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE comment OWNER TO postgres;

--
-- Name: gallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE gallery (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
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
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    safe_name character varying(255) NOT NULL,
    attributes json,
    restricted boolean DEFAULT false
);


ALTER TABLE menu OWNER TO postgres;

--
-- Name: menu_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu_detail (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    safe_name character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    css_classname character varying(255),
    has_dropdown boolean DEFAULT false,
    "order" integer,
    mobile_href character varying(255),
    href character varying(255) NOT NULL,
    icon character varying(255),
    children json
);


ALTER TABLE menu_detail OWNER TO postgres;

--
-- Name: COLUMN menu_detail.mobile_href; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN menu_detail.mobile_href IS 'Mobile href is applicable in cases where the item is a dropdown trigger on desktop. Without a mobile href, it will only be text.';


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
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE migrations_id_seq OWNED BY migrations.id;


--
-- Name: migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE migrations_lock (
    is_locked integer
);


ALTER TABLE migrations_lock OWNER TO postgres;

--
-- Name: page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE page (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255),
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
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    title character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    feature_image character varying(255),
    background_image character varying(255),
    attachments json,
    meta json,
    featured boolean DEFAULT false,
    raw_content text,
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
-- Name: post_comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post_comment (
    id integer NOT NULL,
    post_id uuid NOT NULL,
    comment_id uuid NOT NULL
);


ALTER TABLE post_comment OWNER TO postgres;

--
-- Name: post_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE post_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE post_comment_id_seq OWNER TO postgres;

--
-- Name: post_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE post_comment_id_seq OWNED BY post_comment.id;


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
-- Name: reset_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reset_token (
    id integer NOT NULL,
    ip character varying(32),
    token character varying(255),
    expiration timestamp with time zone,
    used boolean DEFAULT false,
    user_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE reset_token OWNER TO postgres;

--
-- Name: COLUMN reset_token.token; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN reset_token.token IS 'hashed token';


--
-- Name: reset_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE reset_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE reset_token_id_seq OWNER TO postgres;

--
-- Name: reset_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE reset_token_id_seq OWNED BY reset_token.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE role (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
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
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
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
    slug character varying(110) NOT NULL,
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
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(64) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    username character varying(115) NOT NULL,
    avatar_url character varying(255) DEFAULT 'https://boldr.io/images/unknown-avatar.png'::character varying,
    profile_image character varying(255),
    location character varying(100),
    bio text,
    birthday date,
    website character varying(100),
    language character varying(10) DEFAULT 'en_US'::character varying NOT NULL,
    social json,
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
-- Name: verification_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE verification_token (
    id integer NOT NULL,
    ip character varying(32),
    token character varying(255),
    used boolean DEFAULT false,
    user_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE verification_token OWNER TO postgres;

--
-- Name: verification_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE verification_token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE verification_token_id_seq OWNER TO postgres;

--
-- Name: verification_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE verification_token_id_seq OWNED BY verification_token.id;


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu ALTER COLUMN id SET DEFAULT nextval('menu_id_seq'::regclass);


--
-- Name: menu_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail ALTER COLUMN id SET DEFAULT nextval('menu_detail_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY migrations ALTER COLUMN id SET DEFAULT nextval('migrations_id_seq'::regclass);


--
-- Name: post_comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_comment ALTER COLUMN id SET DEFAULT nextval('post_comment_id_seq'::regclass);


--
-- Name: post_tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_tag ALTER COLUMN id SET DEFAULT nextval('post_tag_id_seq'::regclass);


--
-- Name: reset_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reset_token ALTER COLUMN id SET DEFAULT nextval('reset_token_id_seq'::regclass);


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
-- Name: user_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role ALTER COLUMN id SET DEFAULT nextval('user_role_id_seq'::regclass);


--
-- Name: verification_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_token ALTER COLUMN id SET DEFAULT nextval('verification_token_id_seq'::regclass);


--
-- Data for Name: activity; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO attachment (id, file_name, safe_name, file_description, file_type, user_id, url, created_at, updated_at) VALUES ('668e14aa-ebe6-11e6-8ebf-4f81f17749d5', 'file.png', 'file.png', NULL, NULL, '1b062e26-df71-48ce-b363-4ae9b966e7a0', '/files/file.png', '2017-02-17 21:24:00.456817+00', '2017-02-17 21:24:00.456817+00');


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: gallery; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu (id, uuid, name, safe_name, attributes, restricted) VALUES (1, '83fc2c45-75bb-448e-ad32-75f7830ea972', 'Main', 'main', '{}', false);


--
-- Data for Name: menu_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu_detail (id, uuid, safe_name, name, css_classname, has_dropdown, "order", mobile_href, href, icon, children) VALUES (1, 'da3155bc-fc59-41c0-89fb-2938a1638122', 'about', 'About', 'about-link', true, 1, 'about', 'about', 'info', '{"key":"about-menu","items":[{"name":"Tech","id":"tech","href":"about/tech","icon":"change_history"},{"name":"Setup","id":"setup","href":"about/setup","icon":"phonelink_setup"}]}');
INSERT INTO menu_detail (id, uuid, safe_name, name, css_classname, has_dropdown, "order", mobile_href, href, icon, children) VALUES (2, 'f13c290d-d14d-4609-b6f4-6e617598df76', 'blog', 'Blog', 'blog-link', false, 2, 'blog', 'blog', 'info', NULL);


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
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO migrations (id, name, batch, migration_time) VALUES (1, '201701270219_initial.js', 1, '2017-02-17 21:23:54.045+00');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('migrations_id_seq', 1, true);


--
-- Data for Name: migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO migrations_lock (is_locked) VALUES (0);


--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO page (id, name, slug, url, layout, data, status, restricted, meta, created_at, updated_at) VALUES ('87d1e9b3-b32e-474e-9246-6dce1b21a72d', 'Home', 'home', 'home', '{"showHero":true,"showPosts":true}', '{}', 'published', false, '{"title":"Home","description":"The home page"}', '2017-02-17 21:24:00.424156+00', NULL);
INSERT INTO page (id, name, slug, url, layout, data, status, restricted, meta, created_at, updated_at) VALUES ('0a277a50-b482-4b86-b0e7-83fdd3a372af', 'About', 'about', 'about', '{"showHero":true,"showPosts":true}', '{}', 'published', false, '{"title":"About","description":"The about page"}', '2017-02-17 21:24:00.425767+00', NULL);


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO post (id, title, slug, feature_image, background_image, attachments, meta, featured, raw_content, content, excerpt, user_id, published, created_at, updated_at) VALUES ('5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'Just Another Post', 'just-another-post', 'https://boldr.io/image1.jpg', 'https://boldr.io/image1.jpg', NULL, '{}', true, NULL, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-02-17 21:24:00.162812+00', NULL);
INSERT INTO post (id, title, slug, feature_image, background_image, attachments, meta, featured, raw_content, content, excerpt, user_id, published, created_at, updated_at) VALUES ('cb61bbae-c91e-4014-b665-3485734b88fb', 'Nother One', 'nother-one', 'https://boldr.io/image3.jpg', 'https://boldr.io/image3.jpg', NULL, '{}', false, NULL, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', false, '2017-02-17 21:24:00.164931+00', NULL);
INSERT INTO post (id, title, slug, feature_image, background_image, attachments, meta, featured, raw_content, content, excerpt, user_id, published, created_at, updated_at) VALUES ('ab33a0ca-b349-4cf8-947f-94f415149492', 'Random Post Title', 'random-post-title', 'https://boldr.io/image2.jpg', 'https://boldr.io/image2.jpg', NULL, '{}', false, NULL, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-02-17 21:24:00.167307+00', NULL);


--
-- Data for Name: post_attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: post_comment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: post_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('post_comment_id_seq', 1, false);


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
-- Data for Name: reset_token; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: reset_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('reset_token_id_seq', 1, false);


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO role (id, uuid, name, image, description, created_at, updated_at) VALUES (1, 'c9474143-2bc1-441b-9ceb-7c4dcc6f5038', 'Member', NULL, 'A verified user without special privileges', '2017-02-17 21:24:00.041575+00', NULL);
INSERT INTO role (id, uuid, name, image, description, created_at, updated_at) VALUES (2, '8282b97b-a477-4f8b-875d-b83c6322148d', 'Staff', NULL, 'Allows access to the CMS dashboard.', '2017-02-17 21:24:00.047681+00', NULL);
INSERT INTO role (id, uuid, name, image, description, created_at, updated_at) VALUES (3, '35325973-24ed-4e13-b0b3-e727378186a0', 'Admin', NULL, 'Complete control over the CMS', '2017-02-17 21:24:00.050811+00', NULL);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('role_id_seq', 3, true);


--
-- Data for Name: setting; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO setting (id, key, label, value, description) VALUES (1, 'site_name', 'Site Name', 'Boldr', 'The website name.');
INSERT INTO setting (id, key, label, value, description) VALUES (2, 'site_url', 'Site URL', 'http://localhost:3000', 'The address used to access your website.');
INSERT INTO setting (id, key, label, value, description) VALUES (3, 'site_logo', 'Site Logo', 'https://boldr.io/boldr.png', 'The logo is displayed in the header area.');
INSERT INTO setting (id, key, label, value, description) VALUES (4, 'site_description', 'Site Description', 'A modern CMS', 'Meta header for search results.');
INSERT INTO setting (id, key, label, value, description) VALUES (5, 'favicon', 'Favicon', 'https://boldr.io/favicon.ico', 'Favicon to use for your website.');
INSERT INTO setting (id, key, label, value, description) VALUES (6, 'google_analytics', 'Google Analytics ID', 'UA-323432', 'Google Analytics tracking code');
INSERT INTO setting (id, key, label, value, description) VALUES (7, 'allow_registration', 'Allow Registration', 'true', 'Toggle allowing user''s to register for accounts.');


--
-- Name: setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('setting_id_seq', 7, true);


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tag (id, uuid, name, description) VALUES (1, '89f50883-1018-4ed9-bef7-b3fe90cb3ea9', 'javascript', 'Something something JS');
INSERT INTO tag (id, uuid, name, description) VALUES (2, '17d218d4-0ea0-4532-bce9-32d1a1138fa4', 'apple', 'Stuff about stuff.');


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tag_id_seq', 2, true);


--
-- Data for Name: template; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO template (id, uuid, name, slug, meta, content, created_at, updated_at) VALUES (1, 'c23891fb-88c2-4e91-b95d-c652f15eab0c', 'Base', 'base', '{}', '{}', '2017-02-17 21:24:00.38723+00', NULL);
INSERT INTO template (id, uuid, name, slug, meta, content, created_at, updated_at) VALUES (2, 'd42f91fb-88c2-4e91-b95d-c652f15eab0c', 'Content', 'content', '{}', '{}', '2017-02-17 21:24:00.389857+00', NULL);


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
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user" (id, email, password, first_name, last_name, username, avatar_url, profile_image, location, bio, birthday, website, language, social, verified, created_at, updated_at) VALUES ('1b062e26-df71-48ce-b363-4ae9b966e7a0', 'admin@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Joe', 'Gray', 'Joey', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Colorado', 'I am me.', '1988-01-01', 'https://boldr.io', 'en_US', '{"facebook":{"url":"www.facebook.com"},"twitter":{"url":"www.twitter.com"},"linkedin":{"url":"www.linkedin.com"},"github":{"url":"www.github.com"},"google":{"url":"www.google.com"}}', true, '2017-02-17 21:24:00.077505+00', NULL);
INSERT INTO "user" (id, email, password, first_name, last_name, username, avatar_url, profile_image, location, bio, birthday, website, language, social, verified, created_at, updated_at) VALUES ('f4d869a6-1a75-469b-a9cc-965c552929e4', 'user@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Jessica', 'Smith', 'Jess', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Washington', 'Just a person', '1988-01-01', 'https://boldr.io', 'en_US', '{"facebook":{"url":"www.facebook.com"},"twitter":{"url":"www.twitter.com"},"linkedin":{"url":"www.linkedin.com"},"github":{"url":"www.github.com"},"google":{"url":"www.google.com"}}', true, '2017-02-17 21:24:00.079496+00', NULL);
INSERT INTO "user" (id, email, password, first_name, last_name, username, avatar_url, profile_image, location, bio, birthday, website, language, social, verified, created_at, updated_at) VALUES ('f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'demo@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Sam', 'Hunt', 'Samus', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'California', 'Someone doing things.', '1988-01-01', 'https://boldr.io', 'en_US', '{"facebook":{"url":"www.facebook.com"},"twitter":{"url":"www.twitter.com"},"linkedin":{"url":"www.linkedin.com"},"github":{"url":"www.github.com"},"google":{"url":"www.google.com"}}', true, '2017-02-17 21:24:00.081346+00', NULL);


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_role (id, user_id, role_id) VALUES (1, '1b062e26-df71-48ce-b363-4ae9b966e7a0', 3);
INSERT INTO user_role (id, user_id, role_id) VALUES (2, 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 2);
INSERT INTO user_role (id, user_id, role_id) VALUES (3, 'f4d869a6-1a75-469b-a9cc-965c552929e4', 1);


--
-- Name: user_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_role_id_seq', 3, true);


--
-- Data for Name: verification_token; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: verification_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('verification_token_id_seq', 1, false);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


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
-- Name: menu_detail menu_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_pkey PRIMARY KEY (id);


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
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


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
-- Name: page page_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY page
    ADD CONSTRAINT page_slug_unique UNIQUE (slug);


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
-- Name: post_comment post_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_pkey PRIMARY KEY (id);


--
-- Name: post_comment post_comment_post_id_comment_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_post_id_comment_id_unique UNIQUE (post_id, comment_id);


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
-- Name: reset_token reset_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reset_token
    ADD CONSTRAINT reset_token_pkey PRIMARY KEY (id);


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
-- Name: setting setting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY setting
    ADD CONSTRAINT setting_pkey PRIMARY KEY (id);


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
-- Name: user user_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_username_unique UNIQUE (username);


--
-- Name: verification_token verification_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_token
    ADD CONSTRAINT verification_token_pkey PRIMARY KEY (id);


--
-- Name: menu_detail_href_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_href_index ON menu_detail USING btree (href);


--
-- Name: menu_detail_safe_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_safe_name_index ON menu_detail USING btree (safe_name);


--
-- Name: menu_detail_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_uuid_index ON menu_detail USING btree (uuid);


--
-- Name: menu_safe_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_safe_name_index ON menu USING btree (safe_name);


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
-- Name: reset_token_token_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reset_token_token_index ON reset_token USING btree (token);


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
-- Name: setting_value_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX setting_value_index ON setting USING btree (value);


--
-- Name: tag_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tag_name_index ON tag USING btree (name);


--
-- Name: template_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_slug_index ON template USING btree (slug);


--
-- Name: template_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX template_uuid_index ON template USING btree (uuid);


--
-- Name: user_email_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_email_index ON "user" USING btree (email);


--
-- Name: user_username_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_username_index ON "user" USING btree (username);


--
-- Name: user_verified_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_verified_index ON "user" USING btree (verified);


--
-- Name: verification_token_token_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX verification_token_token_index ON verification_token USING btree (token);


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
-- Name: attachment attachment_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment comment_comment_author_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_comment_author_id_foreign FOREIGN KEY (comment_author_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment comment_comment_parent_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_comment_parent_id_foreign FOREIGN KEY (comment_parent_id) REFERENCES comment(id);


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
-- Name: post_comment post_comment_comment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_comment_id_foreign FOREIGN KEY (comment_id) REFERENCES comment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_comment post_comment_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_comment
    ADD CONSTRAINT post_comment_post_id_foreign FOREIGN KEY (post_id) REFERENCES post(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: reset_token reset_token_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reset_token
    ADD CONSTRAINT reset_token_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: verification_token verification_token_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_token
    ADD CONSTRAINT verification_token_user_id_foreign FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
