--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.3

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
    "userId" uuid NOT NULL,
    type text NOT NULL,
    "activityArticle" uuid,
    "activityUser" uuid,
    "activityAttachment" uuid,
    "activityTag" integer,
    "activityMenuDetail" integer,
    "activityTemplate" integer,
    "activityPage" uuid,
    "activityRole" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    CONSTRAINT activity_type_check CHECK ((type = ANY (ARRAY['create'::text, 'update'::text, 'delete'::text, 'register'::text])))
);


ALTER TABLE activity OWNER TO postgres;

--
-- Name: article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    title character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    "featureImage" character varying(255),
    meta json,
    featured boolean DEFAULT false,
    "rawContent" json,
    content text NOT NULL,
    excerpt text NOT NULL,
    "userId" uuid NOT NULL,
    published boolean DEFAULT true,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE article OWNER TO postgres;

--
-- Name: article_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article_media (
    "articleId" uuid NOT NULL,
    "mediaId" uuid NOT NULL
);


ALTER TABLE article_media OWNER TO postgres;

--
-- Name: article_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article_tag (
    id integer NOT NULL,
    "articleId" uuid NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE article_tag OWNER TO postgres;

--
-- Name: article_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE article_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE article_tag_id_seq OWNER TO postgres;

--
-- Name: article_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE article_tag_id_seq OWNED BY article_tag.id;


--
-- Name: attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE attachment (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "fileName" character varying(255) NOT NULL,
    "safeName" character varying(255) NOT NULL,
    "fileDescription" character varying(255),
    "fileType" character varying(255),
    path character varying(255),
    "userId" uuid NOT NULL,
    url character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE attachment OWNER TO postgres;

--
-- Name: block; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE block (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "contentTypeId" integer,
    key character varying(64),
    content jsonb,
    entities jsonb,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE block OWNER TO postgres;

--
-- Name: block_relation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE block_relation (
    id integer NOT NULL,
    "parentId" uuid,
    "childId" uuid
);


ALTER TABLE block_relation OWNER TO postgres;

--
-- Name: block_relation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE block_relation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE block_relation_id_seq OWNER TO postgres;

--
-- Name: block_relation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE block_relation_id_seq OWNED BY block_relation.id;


--
-- Name: content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE content_type (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(64) NOT NULL,
    "safeName" character varying(64) NOT NULL,
    image character varying(200),
    description text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE content_type OWNER TO postgres;

--
-- Name: content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE content_type_id_seq OWNER TO postgres;

--
-- Name: content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE content_type_id_seq OWNED BY content_type.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE media (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "fileName" character varying(128) NOT NULL,
    "safeName" character varying(128) NOT NULL,
    "thumbName" character varying(128),
    "fileDescription" character varying(255),
    "mediaType" integer,
    mimetype character varying(255),
    url character varying(255) NOT NULL,
    path character varying(255),
    "userId" uuid,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE media OWNER TO postgres;

--
-- Name: media_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE media_type (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    "mediaType" character varying(32) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE media_type OWNER TO postgres;

--
-- Name: media_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE media_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE media_type_id_seq OWNER TO postgres;

--
-- Name: media_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE media_type_id_seq OWNED BY media_type.id;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    "safeName" character varying(255) NOT NULL,
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
    "safeName" character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    "cssClassname" character varying(255),
    "hasDropdown" boolean DEFAULT false,
    "order" integer,
    "mobileHref" character varying(255),
    href character varying(255) NOT NULL,
    icon character varying(255),
    children json
);


ALTER TABLE menu_detail OWNER TO postgres;

--
-- Name: COLUMN menu_detail."mobileHref"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN menu_detail."mobileHref" IS 'Mobile href is applicable in cases where the item is a dropdowntrigger on desktop. Without a mobile href, it will only be text.';


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
    "menuId" integer NOT NULL,
    "menuDetailId" integer NOT NULL
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
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    CONSTRAINT page_status_check CHECK ((status = ANY (ARRAY['published'::text, 'draft'::text, 'archived'::text])))
);


ALTER TABLE page OWNER TO postgres;

--
-- Name: reset_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE reset_token (
    id integer NOT NULL,
    ip character varying(32),
    token character varying(255),
    expiration timestamp with time zone,
    used boolean DEFAULT false,
    "userId" uuid,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
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
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
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
-- Name: social; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE social (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    "facebookUrl" character varying(255),
    "twitterUrl" character varying(255),
    "githubUrl" character varying(255),
    "linkedinUrl" character varying(255),
    "googleUrl" character varying(255),
    "stackoverflowUrl" character varying(255)
);


ALTER TABLE social OWNER TO postgres;

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
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
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
    "pageId" uuid NOT NULL,
    "templateId" integer NOT NULL
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
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    username character varying(115) NOT NULL,
    "avatarUrl" character varying(255) DEFAULT 'https://boldr.io/images/unknown-avatar.png'::character varying,
    "profileImage" character varying(255),
    location character varying(100),
    bio text,
    birthday date,
    website character varying(100),
    language character varying(10) DEFAULT 'en_US'::character varying NOT NULL,
    verified boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_role (
    id integer NOT NULL,
    "userId" uuid NOT NULL,
    "roleId" integer NOT NULL
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
    "userId" uuid,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
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
-- Name: article_tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag ALTER COLUMN id SET DEFAULT nextval('article_tag_id_seq'::regclass);


--
-- Name: block_relation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY block_relation ALTER COLUMN id SET DEFAULT nextval('block_relation_id_seq'::regclass);


--
-- Name: content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY content_type ALTER COLUMN id SET DEFAULT nextval('content_type_id_seq'::regclass);


--
-- Name: media_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media_type ALTER COLUMN id SET DEFAULT nextval('media_type_id_seq'::regclass);


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
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO article VALUES ('5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'Just Another Post', 'just-another-post', 'https://boldr.io/image1.jpg', '{}', true, NULL, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-05-17 06:49:29.561909+00', NULL, NULL);
INSERT INTO article VALUES ('cb61bbae-c91e-4014-b665-3485734b88fb', 'Nother One', 'nother-one', 'https://boldr.io/image3.jpg', '{}', false, NULL, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', false, '2017-05-17 06:49:29.56376+00', NULL, NULL);
INSERT INTO article VALUES ('ab33a0ca-b349-4cf8-947f-94f415149492', 'Random Post Title', 'random-post-title', 'https://boldr.io/image2.jpg', '{}', false, NULL, '<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, whenan unknown printer took a galley of type and scrambled it to make a type specimen book.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-05-17 06:49:29.566102+00', NULL, NULL);


--
-- Data for Name: article_media; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: article_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO article_tag VALUES (1, '5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 2);
INSERT INTO article_tag VALUES (2, 'cb61bbae-c91e-4014-b665-3485734b88fb', 1);
INSERT INTO article_tag VALUES (3, 'ab33a0ca-b349-4cf8-947f-94f415149492', 2);


--
-- Name: article_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('article_tag_id_seq', 3, true);


--
-- Data for Name: attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: block; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: block_relation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: block_relation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('block_relation_id_seq', 1, false);


--
-- Data for Name: content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO content_type VALUES (1, '29f45e4b-9c66-4083-8daa-279921ec71e7', 'Page', 'page', NULL, NULL, '2017-05-17 06:49:29.715725+00', NULL, NULL);
INSERT INTO content_type VALUES (2, '524d6cfd-b447-443b-b758-4afee35aab50', 'Post', 'post', NULL, NULL, '2017-05-17 06:49:29.717836+00', NULL, NULL);
INSERT INTO content_type VALUES (3, '943d6b80-948e-4d93-a555-6f13bf581046', 'FAQ', 'faq', NULL, NULL, '2017-05-17 06:49:29.719964+00', NULL, NULL);
INSERT INTO content_type VALUES (4, '93a98080-fb1d-437c-9731-a66ebaece248', 'Project', 'project', NULL, NULL, '2017-05-17 06:49:29.725329+00', NULL, NULL);
INSERT INTO content_type VALUES (5, 'e2d2689d-d265-4e5b-b8f4-8df0feea2e05', 'Link', 'link', NULL, NULL, '2017-05-17 06:49:29.729615+00', NULL, NULL);
INSERT INTO content_type VALUES (6, '3f4aaba7-5835-4493-82c3-f341d5ba9c09', 'Hero', 'hero', NULL, NULL, '2017-05-17 06:49:29.731648+00', NULL, NULL);
INSERT INTO content_type VALUES (7, '132ee9d4-f653-4097-a311-1cc56a8629fd', 'Carousel', 'carousel', NULL, NULL, '2017-05-17 06:49:29.735544+00', NULL, NULL);


--
-- Name: content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('content_type_id_seq', 1, false);


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: media_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO media_type VALUES (1, '51ad0cb8-39e9-4ee5-80ca-50ebb35b372c', 'image', '2017-05-17 06:49:29.74834+00', NULL);
INSERT INTO media_type VALUES (2, '78614bdc-fd05-418e-b02c-a65e71075e70', 'video', '2017-05-17 06:49:29.749848+00', NULL);
INSERT INTO media_type VALUES (3, '3f9bb6d3-241b-4087-885f-117ead57bc73', 'audio', '2017-05-17 06:49:29.751574+00', NULL);


--
-- Name: media_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('media_type_id_seq', 1, false);


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu VALUES (1, 'f54cc9a0-4601-46b7-91b3-b62c0b094859', 'Main', 'main', '{}', false);


--
-- Data for Name: menu_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu_detail VALUES (1, '45b74dfd-be50-455e-8fdb-207a80b6f948', 'about', 'About', 'about-link', true, 1, 'about', 'about', 'info', '{"key":"about-menu","items":[{"name":"Tech","id":"tech","href":"about/tech","icon":"change_history"},{"name":"Setup","id":"setup","href":"about/setup","icon":"phonelink_setup"}]}');
INSERT INTO menu_detail VALUES (2, 'c77e0d52-6bd4-4a72-bbf4-ac8068f666a3', 'blog', 'Blog', 'blog-link', false, 2, 'blog', 'blog', 'info', NULL);


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

INSERT INTO menu_menu_detail VALUES (1, 1);
INSERT INTO menu_menu_detail VALUES (1, 2);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO migrations VALUES (1, '201701270219_initial.js', 1, '2017-05-17 06:49:25.529+00');
INSERT INTO migrations VALUES (2, '201704120543_content.js', 1, '2017-05-17 06:49:25.648+00');
INSERT INTO migrations VALUES (3, '201705101823_social.js', 1, '2017-05-17 06:49:25.673+00');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('migrations_id_seq', 3, true);


--
-- Data for Name: migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO migrations_lock VALUES (0);


--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO page VALUES ('87d1e9b3-b32e-474e-9246-6dce1b21a72d', 'Home', 'home', 'home', '{"showHero":true,"showPosts":true}', '{}', 'published', false, '{"title":"Home","description":"The home page"}', '2017-05-17 06:49:29.66966+00', NULL);
INSERT INTO page VALUES ('0a277a50-b482-4b86-b0e7-83fdd3a372af', 'About', 'about', 'about', '{"showHero":true,"showPosts":true}', '{}', 'published', false, '{"title":"About","description":"The about page"}', '2017-05-17 06:49:29.671244+00', NULL);


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

INSERT INTO role VALUES (1, 'bf48138a-afa7-41b0-ac31-7185ab837678', 'Member', NULL, 'A verified user without special privileges', '2017-05-17 06:49:29.474848+00', NULL);
INSERT INTO role VALUES (2, 'cc337c32-2d29-4eae-b013-3ffc7aa0cfd0', 'Staff', NULL, 'Allows access to the CMS dashboard.', '2017-05-17 06:49:29.480467+00', NULL);
INSERT INTO role VALUES (3, 'e27f8f37-196f-43cb-94dd-aca0c51b68f2', 'Admin', NULL, 'Complete control over the CMS', '2017-05-17 06:49:29.484451+00', NULL);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('role_id_seq', 3, true);


--
-- Data for Name: setting; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO setting VALUES (1, 'siteName', 'Site Name', 'Boldr', 'The website name.');
INSERT INTO setting VALUES (2, 'siteUrl', 'Site URL', 'http://localhost:3000', 'The address used to access your website.');
INSERT INTO setting VALUES (3, 'siteLogo', 'Site Logo', 'https://boldr.io/assets/boldr-text-logo.png', 'The logo is displayed in the header area.');
INSERT INTO setting VALUES (4, 'siteDescription', 'Site Description', 'A modern CMS', 'Meta header for search results.');
INSERT INTO setting VALUES (5, 'favicon', 'Favicon', 'https://boldr.io/favicon.ico', 'Favicon to use for your website.');
INSERT INTO setting VALUES (6, 'googleAnalytics', 'Google Analytics ID', 'UA-323432', 'Google Analytics tracking code');
INSERT INTO setting VALUES (7, 'allowRegistration', 'Allow Registration', 'true', 'Toggle allowing user''s to register for accounts.');


--
-- Name: setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('setting_id_seq', 7, true);


--
-- Data for Name: social; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO social VALUES ('17c309f6-4223-4e2b-92d4-6af107fd9144', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 'https://facebook.com', 'https://twitter.com', 'https://github.com', 'https://linkedin.com', 'https://google.com', 'https://stackoverflow.com');
INSERT INTO social VALUES ('1529f256-8b9b-4afb-a32b-1d819b603683', 'f4d869a6-1a75-469b-a9cc-965c552929e4', 'https://facebook.com', 'https://twitter.com', 'https://github.com', 'https://linkedin.com', 'https://google.com', 'https://stackoverflow.com');
INSERT INTO social VALUES ('70dc0fda-eaf5-43ac-b9c8-7319e8c14574', 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'https://facebook.com', 'https://twitter.com', 'https://github.com', 'https://linkedin.com', 'https://google.com', 'https://stackoverflow.com');


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tag VALUES (1, '6ecc2999-9a22-4c88-88ba-60179f87b9f3', 'javascript', 'Something something JS');
INSERT INTO tag VALUES (2, '81237ead-7757-4112-b087-5f04d8813650', 'apple', 'Stuff about stuff.');


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tag_id_seq', 2, true);


--
-- Data for Name: template; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO template VALUES (1, 'c23891fb-88c2-4e91-b95d-c652f15eab0c', 'Base', 'base', '{}', '{}', '2017-05-17 06:49:29.657109+00', NULL);
INSERT INTO template VALUES (2, 'd42f91fb-88c2-4e91-b95d-c652f15eab0c', 'Content', 'content', '{}', '{}', '2017-05-17 06:49:29.658725+00', NULL);


--
-- Name: template_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('template_id_seq', 1, false);


--
-- Data for Name: template_page; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO template_page VALUES (1, '87d1e9b3-b32e-474e-9246-6dce1b21a72d', 1);
INSERT INTO template_page VALUES (2, '0a277a50-b482-4b86-b0e7-83fdd3a372af', 2);


--
-- Name: template_page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('template_page_id_seq', 2, true);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user" VALUES ('1b062e26-df71-48ce-b363-4ae9b966e7a0', 'admin@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Joe', 'Gray', 'Joey', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Colorado', 'I am me.', '1988-01-01', 'https://boldr.io', 'en_US', true, '2017-05-17 06:49:29.499646+00', NULL, NULL);
INSERT INTO "user" VALUES ('f4d869a6-1a75-469b-a9cc-965c552929e4', 'user@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Jessica', 'Smith', 'Jess', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Washington', 'Just a person', '1988-01-01', 'https://boldr.io', 'en_US', true, '2017-05-17 06:49:29.501179+00', NULL, NULL);
INSERT INTO "user" VALUES ('f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'demo@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Sam', 'Hunt', 'Samus', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'California', 'Someone doing things.', '1988-01-01', 'https://boldr.io', 'en_US', true, '2017-05-17 06:49:29.50423+00', NULL, NULL);


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_role VALUES (1, '1b062e26-df71-48ce-b363-4ae9b966e7a0', 3);
INSERT INTO user_role VALUES (2, 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 2);
INSERT INTO user_role VALUES (3, 'f4d869a6-1a75-469b-a9cc-965c552929e4', 1);


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
-- Name: article_media article_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_media
    ADD CONSTRAINT article_media_pkey PRIMARY KEY ("articleId", "mediaId");


--
-- Name: article article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article
    ADD CONSTRAINT article_pkey PRIMARY KEY (id);


--
-- Name: article article_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article
    ADD CONSTRAINT article_slug_unique UNIQUE (slug);


--
-- Name: article_tag article_tag_articleid_tagid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag
    ADD CONSTRAINT article_tag_articleid_tagid_unique UNIQUE ("articleId", "tagId");


--
-- Name: article_tag article_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag
    ADD CONSTRAINT article_tag_pkey PRIMARY KEY (id);


--
-- Name: article article_title_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article
    ADD CONSTRAINT article_title_unique UNIQUE (title);


--
-- Name: attachment attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_pkey PRIMARY KEY (id);


--
-- Name: block block_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY block
    ADD CONSTRAINT block_pkey PRIMARY KEY (id);


--
-- Name: block_relation block_relation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY block_relation
    ADD CONSTRAINT block_relation_pkey PRIMARY KEY (id);


--
-- Name: content_type content_type_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY content_type
    ADD CONSTRAINT content_type_name_unique UNIQUE (name);


--
-- Name: content_type content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY content_type
    ADD CONSTRAINT content_type_pkey PRIMARY KEY (id);


--
-- Name: content_type content_type_safename_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY content_type
    ADD CONSTRAINT content_type_safename_unique UNIQUE ("safeName");


--
-- Name: media media_filename_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_filename_unique UNIQUE ("fileName");


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: media_type media_type_mediatype_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media_type
    ADD CONSTRAINT media_type_mediatype_unique UNIQUE ("mediaType");


--
-- Name: media_type media_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media_type
    ADD CONSTRAINT media_type_pkey PRIMARY KEY (id);


--
-- Name: menu_detail menu_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_pkey PRIMARY KEY (id);


--
-- Name: menu_menu_detail menu_menu_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_menu_detail
    ADD CONSTRAINT menu_menu_detail_pkey PRIMARY KEY ("menuId", "menuDetailId");


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
-- Name: social social_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY social
    ADD CONSTRAINT social_pkey PRIMARY KEY (id);


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
-- Name: template_page template_page_pageid_templateid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page
    ADD CONSTRAINT template_page_pageid_templateid_unique UNIQUE ("pageId", "templateId");


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
-- Name: user_role user_role_userid_roleid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_userid_roleid_unique UNIQUE ("userId", "roleId");


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
-- Name: article_createdat_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_createdat_index ON article USING btree ("createdAt");


--
-- Name: article_published_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_published_index ON article USING btree (published);


--
-- Name: article_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_slug_index ON article USING btree (slug);


--
-- Name: content_type_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_type_name_index ON content_type USING btree (name);


--
-- Name: content_type_safename_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_type_safename_index ON content_type USING btree ("safeName");


--
-- Name: content_type_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_type_uuid_index ON content_type USING btree (uuid);


--
-- Name: media_filename_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_filename_index ON media USING btree ("fileName");


--
-- Name: media_mediatype_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_mediatype_index ON media USING btree ("mediaType");


--
-- Name: media_type_mediatype_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_type_mediatype_index ON media_type USING btree ("mediaType");


--
-- Name: media_type_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_type_uuid_index ON media_type USING btree (uuid);


--
-- Name: media_url_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_url_index ON media USING btree (url);


--
-- Name: menu_detail_href_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_href_index ON menu_detail USING btree (href);


--
-- Name: menu_detail_safename_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_safename_index ON menu_detail USING btree ("safeName");


--
-- Name: menu_detail_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_uuid_index ON menu_detail USING btree (uuid);


--
-- Name: menu_safename_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_safename_index ON menu USING btree ("safeName");


--
-- Name: menu_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_uuid_index ON menu USING btree (uuid);


--
-- Name: page_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX page_name_index ON page USING btree (name);


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
-- Name: social_userid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX social_userid_index ON social USING btree ("userId");


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
-- Name: activity activity_activityarticle_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activityarticle_foreign FOREIGN KEY ("activityArticle") REFERENCES article(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activityattachment_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activityattachment_foreign FOREIGN KEY ("activityAttachment") REFERENCES attachment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activitymenudetail_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activitymenudetail_foreign FOREIGN KEY ("activityMenuDetail") REFERENCES menu_detail(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activitypage_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activitypage_foreign FOREIGN KEY ("activityPage") REFERENCES page(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activityrole_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activityrole_foreign FOREIGN KEY ("activityRole") REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activitytag_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activitytag_foreign FOREIGN KEY ("activityTag") REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activitytemplate_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activitytemplate_foreign FOREIGN KEY ("activityTemplate") REFERENCES template(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_activityuser_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_activityuser_foreign FOREIGN KEY ("activityUser") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity activity_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_media article_media_articleid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_media
    ADD CONSTRAINT article_media_articleid_foreign FOREIGN KEY ("articleId") REFERENCES article(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_media article_media_mediaid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_media
    ADD CONSTRAINT article_media_mediaid_foreign FOREIGN KEY ("mediaId") REFERENCES media(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_tag article_tag_articleid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag
    ADD CONSTRAINT article_tag_articleid_foreign FOREIGN KEY ("articleId") REFERENCES article(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_tag article_tag_tagid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag
    ADD CONSTRAINT article_tag_tagid_foreign FOREIGN KEY ("tagId") REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article article_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article
    ADD CONSTRAINT article_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: attachment attachment_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY attachment
    ADD CONSTRAINT attachment_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: block block_contenttypeid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY block
    ADD CONSTRAINT block_contenttypeid_foreign FOREIGN KEY ("contentTypeId") REFERENCES content_type(id);


--
-- Name: block_relation block_relation_childid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY block_relation
    ADD CONSTRAINT block_relation_childid_foreign FOREIGN KEY ("childId") REFERENCES block(id) ON DELETE CASCADE;


--
-- Name: block_relation block_relation_parentid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY block_relation
    ADD CONSTRAINT block_relation_parentid_foreign FOREIGN KEY ("parentId") REFERENCES block(id) ON DELETE CASCADE;


--
-- Name: media media_mediatype_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_mediatype_foreign FOREIGN KEY ("mediaType") REFERENCES media_type(id);


--
-- Name: media media_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id);


--
-- Name: menu_menu_detail menu_menu_detail_menudetailid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_menu_detail
    ADD CONSTRAINT menu_menu_detail_menudetailid_foreign FOREIGN KEY ("menuDetailId") REFERENCES menu_detail(id);


--
-- Name: menu_menu_detail menu_menu_detail_menuid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_menu_detail
    ADD CONSTRAINT menu_menu_detail_menuid_foreign FOREIGN KEY ("menuId") REFERENCES menu(id);


--
-- Name: reset_token reset_token_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reset_token
    ADD CONSTRAINT reset_token_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: social social_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY social
    ADD CONSTRAINT social_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: template_page template_page_pageid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page
    ADD CONSTRAINT template_page_pageid_foreign FOREIGN KEY ("pageId") REFERENCES page(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: template_page template_page_templateid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template_page
    ADD CONSTRAINT template_page_templateid_foreign FOREIGN KEY ("templateId") REFERENCES template(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role user_role_roleid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_roleid_foreign FOREIGN KEY ("roleId") REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_role user_role_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: verification_token verification_token_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_token
    ADD CONSTRAINT verification_token_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

