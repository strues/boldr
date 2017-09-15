--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.5


DROP DATABASE IF EXISTS boldr;
--
-- Name: boldr_test; Type: DATABASE; Schema: -; Owner: postgres
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

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    verified boolean DEFAULT false,
    ip character varying(32),
    reset_token character varying(255),
    reset_token_exp timestamp with time zone,
    verification_token character varying(255),
    verification_token_exp timestamp with time zone,
    last_login timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE account OWNER TO postgres;

--
-- Name: account_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account_role (
    id integer NOT NULL,
    account_id uuid NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE account_role OWNER TO postgres;

--
-- Name: account_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE account_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_role_id_seq OWNER TO postgres;

--
-- Name: account_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_role_id_seq OWNED BY account_role.id;


--
-- Name: article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    title character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    image character varying(255),
    hero_image character varying(255),
    meta json,
    raw_content json NOT NULL,
    content text NOT NULL,
    excerpt text NOT NULL,
    featured boolean DEFAULT false,
    published boolean DEFAULT true,
    status text,
    author_id uuid NOT NULL,
    category_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT article_status_check CHECK ((status = ANY (ARRAY['published'::text, 'archived'::text, 'draft'::text])))
);


ALTER TABLE article OWNER TO postgres;

--
-- Name: COLUMN article.raw_content; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN article.raw_content IS 'Raw immutable JSON content block';


--
-- Name: COLUMN article.content; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN article.content IS 'Content is the rawContent converted to HTML';


--
-- Name: article_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article_media (
    article_id uuid NOT NULL,
    media_id uuid NOT NULL
);


ALTER TABLE article_media OWNER TO postgres;

--
-- Name: article_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article_tag (
    id integer NOT NULL,
    article_id uuid NOT NULL,
    tag_id uuid NOT NULL
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
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    name character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    icon character varying(140),
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE category OWNER TO postgres;

--
-- Name: content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE content_type (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    name character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    icon character varying(140),
    description text,
    restricted boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE content_type OWNER TO postgres;

--
-- Name: entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE entity (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    title character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    image character varying(255),
    meta json,
    raw_content json,
    content text,
    excerpt text,
    status text NOT NULL,
    content_type_id uuid NOT NULL,
    author_id uuid,
    category_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT entity_status_check CHECK ((status = ANY (ARRAY['published'::text, 'archived'::text, 'draft'::text])))
);


ALTER TABLE entity OWNER TO postgres;

--
-- Name: entity_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE entity_tag (
    id integer NOT NULL,
    tag_id uuid NOT NULL,
    entity_id uuid NOT NULL
);


ALTER TABLE entity_tag OWNER TO postgres;

--
-- Name: entity_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE entity_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE entity_tag_id_seq OWNER TO postgres;

--
-- Name: entity_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE entity_tag_id_seq OWNED BY entity_tag.id;


--
-- Name: file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE file (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    name character varying(128) NOT NULL,
    type character varying(32) NOT NULL,
    url character varying(125) NOT NULL,
    path character varying(255) NOT NULL,
    size integer,
    safe_name character varying(128) NOT NULL,
    thumb_name character varying(128),
    file_description character varying(255),
    owner_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE file OWNER TO postgres;

--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE media (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    name character varying(128) NOT NULL,
    safe_name character varying(128) NOT NULL,
    thumb_name character varying(128),
    size integer,
    file_description character varying(255),
    type character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    owner_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE media OWNER TO postgres;

--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    name character varying(64) NOT NULL,
    safe_name character varying(64) NOT NULL,
    restricted boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE menu OWNER TO postgres;

--
-- Name: menu_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu_detail (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    safe_name character varying(50) NOT NULL,
    title character varying(50) NOT NULL,
    has_dropdown boolean DEFAULT false,
    is_dropdown boolean DEFAULT false,
    css_classname character varying(32),
    "order" integer,
    href character varying(255) NOT NULL,
    icon character varying(255),
    parent_id uuid,
    menu_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE menu_detail OWNER TO postgres;

--
-- Name: COLUMN menu_detail.has_dropdown; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN menu_detail.has_dropdown IS 'hasDropdown is true if the item has dropdownItems.';


--
-- Name: COLUMN menu_detail.is_dropdown; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN menu_detail.is_dropdown IS 'isDropdown is true if the item in question has a parentId.';


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
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    url character varying(255),
    meta jsonb,
    blocks jsonb,
    markup text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE page OWNER TO postgres;

--
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE profile (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    first_name character varying(64) NOT NULL,
    last_name character varying(128) NOT NULL,
    username character varying(64) NOT NULL,
    avatar_url character varying(255) DEFAULT 'https://boldr.io/images/unknown-avatar.png'::character varying,
    profile_image character varying(255),
    location character varying(100),
    bio text,
    birthday date,
    sex text DEFAULT 'unknown'::text NOT NULL,
    website character varying(255),
    language character varying(5) DEFAULT 'en_US'::character varying NOT NULL,
    account_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT profile_sex_check CHECK ((sex = ANY (ARRAY['male'::text, 'female'::text, 'unknown'::text])))
);


ALTER TABLE profile OWNER TO postgres;

--
-- Name: profile_social_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE profile_social_media (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    profile_id uuid NOT NULL,
    facebook_url character varying(255),
    twitter_url character varying(255),
    github_url character varying(255),
    linkedin_url character varying(255),
    google_url character varying(255),
    stackoverflow_url character varying(255)
);


ALTER TABLE profile_social_media OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE role (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    icon character varying(140),
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
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
-- Name: route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE route (
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    name character varying(50) NOT NULL,
    slug character varying(50) NOT NULL,
    uri_parts character varying(255) NOT NULL,
    uri_pattern character varying(255) NOT NULL,
    template character varying(255)
);


ALTER TABLE route OWNER TO postgres;

--
-- Name: setting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE setting (
    id integer NOT NULL,
    key character varying(100) NOT NULL,
    label character varying(100) NOT NULL,
    value character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
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
    id uuid DEFAULT uuid_generate_v1mc() NOT NULL,
    name character varying(32) NOT NULL,
    safe_name character varying(32) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE tag OWNER TO postgres;

--
-- Name: account_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role ALTER COLUMN id SET DEFAULT nextval('account_role_id_seq'::regclass);


--
-- Name: article_tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag ALTER COLUMN id SET DEFAULT nextval('article_tag_id_seq'::regclass);


--
-- Name: entity_tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag ALTER COLUMN id SET DEFAULT nextval('entity_tag_id_seq'::regclass);


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu ALTER COLUMN id SET DEFAULT nextval('menu_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY migrations ALTER COLUMN id SET DEFAULT nextval('migrations_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- Name: setting id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY setting ALTER COLUMN id SET DEFAULT nextval('setting_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO account (id, email, password, verified, ip, reset_token, reset_token_exp, verification_token, verification_token_exp, last_login, created_at, updated_at, deleted_at) VALUES ('90d49682-96a2-11e7-abc4-cec278b6b50a', 'user@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', true, '127.0.0.1', NULL, NULL, NULL, NULL, NULL, '2017-09-11 19:37:27.772835+00', NULL, NULL);
INSERT INTO account (id, email, password, verified, ip, reset_token, reset_token_exp, verification_token, verification_token_exp, last_login, created_at, updated_at, deleted_at) VALUES ('90d49b28-96a2-11e7-abc4-cec278b6b50a', 'demo@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', true, '127.0.0.1', NULL, NULL, NULL, NULL, NULL, '2017-09-11 19:37:27.77302+00', NULL, NULL);
INSERT INTO account (id, email, password, verified, ip, reset_token, reset_token_exp, verification_token, verification_token_exp, last_login, created_at, updated_at, deleted_at) VALUES ('90d4924a-96a2-11e7-abc4-cec278b6b50a', 'admin@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', true, '127.0.0.1', NULL, NULL, NULL, NULL, '2017-09-11 20:47:53.713+00', '2017-09-11 19:37:27.77263+00', '2017-09-11 20:47:53.734+00', NULL);


--
-- Data for Name: account_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO account_role (id, account_id, role_id) VALUES (1, '90d4924a-96a2-11e7-abc4-cec278b6b50a', 3);
INSERT INTO account_role (id, account_id, role_id) VALUES (2, '90d49682-96a2-11e7-abc4-cec278b6b50a', 2);
INSERT INTO account_role (id, account_id, role_id) VALUES (3, '90d49b28-96a2-11e7-abc4-cec278b6b50a', 1);


--
-- Name: account_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_role_id_seq', 9, true);


--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO article (id, title, slug, image, hero_image, meta, raw_content, content, excerpt, featured, published, status, author_id, category_id, created_at, updated_at, deleted_at) VALUES ('5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'Building From Scratch', 'building-from-scratch', 'http://i.magaimg.net/img/18en.png', 'http://i.magaimg.net/img/18en.png', '{}', '{"entityMap":{},"blocks":[{"key":"64vtl","text":"This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":278,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"aiim1","text":"I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction. Many developers will tell you not to even try; that it is not worth the headache.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":242,"length":83,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"339vf","text":" I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the next level thinking, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":298,"length":20,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"5vgli","text":"The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}', '<p>This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is <strong>hard. </strong></p><p>I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction<strong>. Many developers will tell you not to even try; that it is not worth the headache.</strong></p><p> I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the<em> next level thinking</em>, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.</p><p>The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…</p>', 'This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard.', true, true, 'published', '90d4924a-96a2-11e7-abc4-cec278b6b50a', '5b446ed5-46dc-4b03-b84b-715d8d5cac11', '2017-09-11 19:37:27.784648+00', NULL, NULL);
INSERT INTO article (id, title, slug, image, hero_image, meta, raw_content, content, excerpt, featured, published, status, author_id, category_id, created_at, updated_at, deleted_at) VALUES ('cb61bbae-c91e-4014-b665-3485734b88fb', 'Setup a Universal React Application', 'setup-a-universal-react-application', 'https://cdn-images-1.medium.com/max/800/1*tnh7IIZ1PrNQ-PzOMijBTQ.png', 'https://cdn-images-1.medium.com/max/800/1*tnh7IIZ1PrNQ-PzOMijBTQ.png', '{}', '{"entityMap":{},"blocks":[{"key":"39eg7","text":"Getting Started.","type":"header-two","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fbjrk","text":"JavaScript is the most popular programming language in the world. It’s ubiquitous with the web we know. The rise in popularity of Node.js and a desire to make experiences across multiple platforms as seamless as possible has led to the emergence of this concept of universal JavaScript applications.Sometimes referred to as Isomorphic, Universal JavaScript applications, deliver the capability of rendering JavaScript on the server before it gets sent to the user’s browser. The benefits of rendering on the server are huge for many reasons; like search engine optimization (SEO), faster loading times, and fallbacks for when a user might have JavaScript disabled.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dh8q4","text":"Unfortunately the barrier of entry for setting up a universal JavaScript application is quite high. There are a decent amount of starter projects on GitHub that are great to look at and analyze, but not much can be found explaining the why or the how things need to be done.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}', '<p>This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is <strong>hard. </strong></p><p>I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction<strong>. Many developers will tell you not to even try; that it is not worth the headache.</strong></p><p> I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the<em> next level thinking</em>, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.</p><p>The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…</p>', 'This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard.', false, false, 'draft', '90d4924a-96a2-11e7-abc4-cec278b6b50a', 'f3898f47-62fa-4b8e-895d-d29e7d5278cf', '2017-09-11 19:37:27.784891+00', NULL, NULL);
INSERT INTO article (id, title, slug, image, hero_image, meta, raw_content, content, excerpt, featured, published, status, author_id, category_id, created_at, updated_at, deleted_at) VALUES ('ab33a0ca-b349-4cf8-947f-94f415149492', 'Flowtype Opaque Types', 'flowtype-opaque-types', 'https://cdn-images-1.medium.com/max/2000/1*DQJCnm07c_MxpsFYarwwEg.jpeg', 'https://cdn-images-1.medium.com/max/2000/1*DQJCnm07c_MxpsFYarwwEg.jpeg', '{}', '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://github.com/babel/babel/pull/5990","rel":"nofollow noopener","target":"_blank","url":"https://github.com/babel/babel/pull/5990"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://flow.org/en/docs/types/opaque-types/","rel":"nofollow noopener","target":"_blank","url":"https://flow.org/en/docs/types/opaque-types/"}}},"blocks":[{"key":"5ctuu","text":"Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":73,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9887i","text":"Do you ever wish that you could hide your implementation details away from your users?Well, now all of your dreams have finally come true! Flow 0.51.0 added support for opaque type aliases, with babel support coming in the next week or so. Opaque type aliases are type aliases that hide their underlying type. You can only see an opaque type’s underlying type in the file which declares the opaque type. They’re already documented here, so we’ll spend the rest of this blog post showing just how powerful opaque type aliases can be.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":195,"length":14,"key":0},{"offset":431,"length":4,"key":1}],"data":{}},{"key":"12bhl","text":"Maintaining Invariants with Opaque Types","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ct6ko","text":"Opaque type aliases are really useful for maintaining invariants in your code. Whenever you find yourself wanting to express “things of type T where X is true,” you might want to consider using an opaque type alias.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d53nf","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a5fs","text":"As a simple example, lets consider a type for non-negative numbers:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5s25s","text":"NonNeg.js:","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"7aehc","text":"// @flow","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f0io4","text":"opaque type NonNeg = number;","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"BOLD"},{"offset":7,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}]}', '<h1><strong>Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature</strong></h1><p>Do you ever wish that you could hide your implementation details away from your users?Well, now all of your dreams have finally come true! Flow 0.51.0 added support for opaque type aliases, with <a href="https://github.com/babel/babel/pull/5990" target="_blank">babel support </a>coming in the next week or so. Opaque type aliases are type aliases that hide their underlying type. You can only see an opaque type’s underlying type in the file which declares the opaque type. They’re already documented <a href="https://flow.org/en/docs/types/opaque-types/" target="_blank">here</a>, so we’ll spend the rest of this blog post showing just how powerful opaque type aliases can be.</p><h3><strong>Maintaining Invariants with Opaque Types</strong></h3><p>Opaque type aliases are really useful for maintaining invariants in your code. Whenever you find yourself wanting to express “things of type T where X is true,” you might want to consider using an opaque type alias.</p><p></p><p>As a simple example, lets consider a type for non-negative numbers:</p><blockquote><em>NonNeg.js:</em></blockquote><blockquote>// @flow</blockquote><blockquote><strong>opaque</strong> <strong>type</strong> NonNeg = number;</blockquote>', 'Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature', false, true, 'published', '90d49682-96a2-11e7-abc4-cec278b6b50a', 'f9614827-99c0-4686-8ab1-605588122616', '2017-09-11 19:37:27.785156+00', NULL, NULL);


--
-- Data for Name: article_media; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: article_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO article_tag (id, article_id, tag_id) VALUES (1, '5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'b1c0d816-e8c0-4a0d-a63a-5215f02b423e');
INSERT INTO article_tag (id, article_id, tag_id) VALUES (2, 'cb61bbae-c91e-4014-b665-3485734b88fb', '517e9975-9dd8-44fc-80cf-cb907964a06b');
INSERT INTO article_tag (id, article_id, tag_id) VALUES (3, 'ab33a0ca-b349-4cf8-947f-94f415149492', 'b1c0d816-e8c0-4a0d-a63a-5215f02b423e');


--
-- Name: article_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('article_tag_id_seq', 3, true);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO category (id, name, slug, icon, description, created_at, updated_at, deleted_at) VALUES ('5b446ed5-46dc-4b03-b84b-715d8d5cac11', 'Web Development', 'web-development', 'code', 'Related to making things for the internet.', '2017-09-11 19:37:27.766995+00', NULL, NULL);
INSERT INTO category (id, name, slug, icon, description, created_at, updated_at, deleted_at) VALUES ('f3898f47-62fa-4b8e-895d-d29e7d5278cf', 'Music', 'music', 'music', 'Music news, thoughts, reviews and more.', '2017-09-11 19:37:27.767249+00', NULL, NULL);
INSERT INTO category (id, name, slug, icon, description, created_at, updated_at, deleted_at) VALUES ('f9614827-99c0-4686-8ab1-605588122616', 'Thoughts and Ramblings', 'thoughts-and-ramblings', 'cloud', 'Anything and everything', '2017-09-11 19:37:27.767398+00', NULL, NULL);


--
-- Data for Name: content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO content_type (id, name, slug, icon, description, restricted, created_at, updated_at, deleted_at) VALUES ('29dd6b62-3e73-407b-9324-9c959f9bdbd2', 'Project', 'project', 'briefcase', 'a project description', false, '2017-09-11 19:37:27.801908+00', NULL, NULL);


--
-- Data for Name: entity; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: entity_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: entity_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('entity_tag_id_seq', 1, false);


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO media (id, name, safe_name, thumb_name, size, file_description, type, url, path, owner_id, created_at, updated_at) VALUES ('a38b002c-972e-11e7-92f1-a7453ee8a639', 'Hykzl_V9Z.png', 'Hykzl_V9Z.png', 'Hykzl_V9Zthumb.png', NULL, 'mountains at sunset', 'image/png', '/uploads/media/Hykzl_V9Z.png', '/Users/steventruesdell/Projects/Boldr/boldr/packages/server/public/uploads/media/Hykzl_V9Z.png', '90d4924a-96a2-11e7-abc4-cec278b6b50a', '2017-09-11 20:20:22.606+00', '2017-09-11 20:20:32.962+00');


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu (id, uuid, name, safe_name, restricted, created_at, updated_at, deleted_at) VALUES (1, 'a4d3c370-9728-11e7-a6d0-a7064596877f', 'Main', 'main', false, '2017-09-11 19:37:27.791449+00', NULL, NULL);


--
-- Data for Name: menu_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu_detail (id, safe_name, title, has_dropdown, is_dropdown, css_classname, "order", href, icon, parent_id, menu_id, created_at, updated_at, deleted_at) VALUES ('c0b0ea44-8d9d-4081-9655-871399b970fe', 'about', 'About', true, false, 'about-link', 1, '/about', 'info', NULL, 1, '2017-09-11 19:37:27.793347+00', NULL, NULL);
INSERT INTO menu_detail (id, safe_name, title, has_dropdown, is_dropdown, css_classname, "order", href, icon, parent_id, menu_id, created_at, updated_at, deleted_at) VALUES ('5fe0bd37-440a-47d8-aab4-6bda56ce731f', 'setup', 'Setup', false, true, 'blog-link', 2, '/about/setup', 'info', 'c0b0ea44-8d9d-4081-9655-871399b970fe', 1, '2017-09-11 19:37:27.796598+00', NULL, NULL);
INSERT INTO menu_detail (id, safe_name, title, has_dropdown, is_dropdown, css_classname, "order", href, icon, parent_id, menu_id, created_at, updated_at, deleted_at) VALUES ('b82deb8b-6303-407a-ba6d-23e9a314b18c', 'technologies', 'Technologies', false, true, 'blog-link', 1, '/about/technologies', 'info', 'c0b0ea44-8d9d-4081-9655-871399b970fe', 1, '2017-09-11 19:37:27.796406+00', NULL, NULL);
INSERT INTO menu_detail (id, safe_name, title, has_dropdown, is_dropdown, css_classname, "order", href, icon, parent_id, menu_id, created_at, updated_at, deleted_at) VALUES ('79b3e678-c6d8-4824-bb50-f71a7d45be87', 'blog', 'Blog', false, false, 'blog-link', 2, '/blog', 'info', NULL, 1, '2017-09-11 19:37:27.793545+00', NULL, NULL);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('menu_id_seq', 1, true);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO migrations (id, name, batch, migration_time) VALUES (1, '201701270219_initial.js', 1, '2017-09-11 19:36:23.81+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (2, '201704120543_media.js', 1, '2017-09-11 19:36:23.829+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (3, '201705101823_social.js', 1, '2017-09-11 19:36:23.837+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (4, '201705270719_tsv-article.js', 1, '2017-09-11 19:36:23.839+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (5, '201706291706_page.js', 1, '2017-09-11 19:36:23.85+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (6, '201707140206_routes.js', 1, '2017-09-11 19:36:23.861+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (7, '201708222054_entity-content.js', 1, '2017-09-11 19:36:23.899+00');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('migrations_id_seq', 7, true);


--
-- Data for Name: migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO migrations_lock (is_locked) VALUES (0);


--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO page (id, title, slug, url, meta, blocks, markup, created_at, updated_at, deleted_at) VALUES ('a4cf89ae-9728-11e7-bf75-b789b021cad5', 'Home', 'home', '/', NULL, NULL, NULL, '2017-09-11 19:37:27.763294+00', NULL, NULL);
INSERT INTO page (id, title, slug, url, meta, blocks, markup, created_at, updated_at, deleted_at) VALUES ('a4cf8e2c-9728-11e7-b488-23341f1c2164', 'About', 'about', '/about', NULL, NULL, NULL, '2017-09-11 19:37:27.763577+00', NULL, NULL);
INSERT INTO page (id, title, slug, url, meta, blocks, markup, created_at, updated_at, deleted_at) VALUES ('a4cf8f8a-9728-11e7-a6d0-47e40cca96a9', 'Portfolio', 'portfolio', '/portfolio', NULL, NULL, NULL, '2017-09-11 19:37:27.763764+00', NULL, NULL);


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO profile (id, first_name, last_name, username, avatar_url, profile_image, location, bio, birthday, sex, website, language, account_id, created_at, updated_at, deleted_at) VALUES ('1b062e26-df71-48ce-b363-4ae9b966e7a0', 'Joe', 'Gray', 'Joey', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Colorado', 'I am me.', '1988-01-01', 'male', 'https://boldr.io', 'en_US', '90d4924a-96a2-11e7-abc4-cec278b6b50a', '2017-09-11 19:37:27.775385+00', NULL, NULL);
INSERT INTO profile (id, first_name, last_name, username, avatar_url, profile_image, location, bio, birthday, sex, website, language, account_id, created_at, updated_at, deleted_at) VALUES ('f4d869a6-1a75-469b-a9cc-965c552929e4', 'Jessica', 'Smith', 'Jess', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Washington', 'Just a person', '1988-01-01', 'female', 'https://boldr.io', 'en_US', '90d49682-96a2-11e7-abc4-cec278b6b50a', '2017-09-11 19:37:27.775609+00', NULL, NULL);
INSERT INTO profile (id, first_name, last_name, username, avatar_url, profile_image, location, bio, birthday, sex, website, language, account_id, created_at, updated_at, deleted_at) VALUES ('f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'Sam', 'Hunt', 'Samus', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'California', 'Someone doing things.', '1988-01-01', 'male', 'https://boldr.io', 'en_US', '90d49b28-96a2-11e7-abc4-cec278b6b50a', '2017-09-11 19:37:27.775809+00', NULL, NULL);


--
-- Data for Name: profile_social_media; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO profile_social_media (id, profile_id, facebook_url, twitter_url, github_url, linkedin_url, google_url, stackoverflow_url) VALUES ('a4d1ce9e-9728-11e7-bf75-3f19faf7ae57', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 'https://www.facebook.com', 'https://www.twitter.com', 'https://www.github.com', 'https://linkedin.com', 'https://www.google.com', 'https://www.stackoverflow.com');
INSERT INTO profile_social_media (id, profile_id, facebook_url, twitter_url, github_url, linkedin_url, google_url, stackoverflow_url) VALUES ('a4d1d7ea-9728-11e7-a6d0-13e48ac6560e', 'f4d869a6-1a75-469b-a9cc-965c552929e4', 'https://www.facebook.com', 'https://www.twitter.com', 'https://www.github.com', 'https://linkedin.com', 'https://www.google.com', 'https://www.stackoverflow.com');
INSERT INTO profile_social_media (id, profile_id, facebook_url, twitter_url, github_url, linkedin_url, google_url, stackoverflow_url) VALUES ('a4d1e078-9728-11e7-b488-0f33d22042f3', 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'https://www.facebook.com', 'https://www.twitter.com', 'https://www.github.com', 'https://linkedin.com', 'https://www.google.com', 'https://www.stackoverflow.com');


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO role (id, name, icon, description, created_at, updated_at, deleted_at) VALUES (1, 'Member', NULL, 'A verified user without special privileges', '2017-09-11 19:37:27.769852+00', NULL, NULL);
INSERT INTO role (id, name, icon, description, created_at, updated_at, deleted_at) VALUES (3, 'Admin', NULL, 'Complete control over the CMS', '2017-09-11 19:37:27.770205+00', NULL, NULL);
INSERT INTO role (id, name, icon, description, created_at, updated_at, deleted_at) VALUES (2, 'Staff', NULL, 'Allows access to the CMS dashboard.', '2017-09-11 19:37:27.770002+00', NULL, NULL);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('role_id_seq', 3, true);


--
-- Data for Name: route; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: setting; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO setting (id, key, label, value, description, created_at, updated_at, deleted_at) VALUES (1, 'siteName', 'Site Name', 'Boldr', 'The website name.', '2017-09-11 19:37:27.804577+00', NULL, NULL);
INSERT INTO setting (id, key, label, value, description, created_at, updated_at, deleted_at) VALUES (2, 'siteUrl', 'Site URL', 'http://localhost:3000', 'The address used to access your website.', '2017-09-11 19:37:27.804723+00', NULL, NULL);
INSERT INTO setting (id, key, label, value, description, created_at, updated_at, deleted_at) VALUES (3, 'siteLogo', 'Site Logo', 'https://boldr.io/assets/boldr-text-logo.png', 'The logo is displayed in the header area.', '2017-09-11 19:37:27.804885+00', NULL, NULL);
INSERT INTO setting (id, key, label, value, description, created_at, updated_at, deleted_at) VALUES (4, 'siteDescription', 'Site Description', 'A modern CMS', 'Meta header for search results.', '2017-09-11 19:37:27.806836+00', NULL, NULL);
INSERT INTO setting (id, key, label, value, description, created_at, updated_at, deleted_at) VALUES (5, 'favicon', 'Favicon', 'https://boldr.io/favicon.ico', 'Favicon to use for your website.', '2017-09-11 19:37:27.807259+00', NULL, NULL);
INSERT INTO setting (id, key, label, value, description, created_at, updated_at, deleted_at) VALUES (6, 'googleAnalytics', 'Google Analytics ID', 'UA-323432', 'Google Analytics tracking code', '2017-09-11 19:37:27.807768+00', NULL, NULL);
INSERT INTO setting (id, key, label, value, description, created_at, updated_at, deleted_at) VALUES (7, 'allowRegistration', 'Allow Registration', 'true', 'Toggle allowing user''s to register for accounts.', '2017-09-11 19:37:27.808599+00', NULL, NULL);


--
-- Name: setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('setting_id_seq', 7, true);


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tag (id, name, safe_name, created_at, updated_at, deleted_at) VALUES ('b1c0d816-e8c0-4a0d-a63a-5215f02b423e', 'JavaScript', 'javascript', '2017-09-11 19:37:27.781654+00', NULL, NULL);
INSERT INTO tag (id, name, safe_name, created_at, updated_at, deleted_at) VALUES ('9a067f54-9729-11e7-aa71-f3faeac8d119', 'Temp', 'temp', '2017-09-11 19:44:19.155+00', '2017-09-11 19:44:19.155+00', NULL);
INSERT INTO tag (id, name, safe_name, created_at, updated_at, deleted_at) VALUES ('517e9975-9dd8-44fc-80cf-cb907964a06b', 'Stuff', 'stuff', '2017-09-11 19:37:27.781724+00', NULL, NULL);


--
-- Name: account account_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_email_unique UNIQUE (email);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: account_role account_role_account_id_role_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role
    ADD CONSTRAINT account_role_account_id_role_id_unique UNIQUE (account_id, role_id);


--
-- Name: account_role account_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role
    ADD CONSTRAINT account_role_pkey PRIMARY KEY (id);


--
-- Name: article_media article_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_media
    ADD CONSTRAINT article_media_pkey PRIMARY KEY (article_id, media_id);


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
-- Name: article_tag article_tag_article_id_tag_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag
    ADD CONSTRAINT article_tag_article_id_tag_id_unique UNIQUE (article_id, tag_id);


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
-- Name: category category_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_slug_unique UNIQUE (slug);


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
-- Name: content_type content_type_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY content_type
    ADD CONSTRAINT content_type_slug_unique UNIQUE (slug);


--
-- Name: entity entity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_pkey PRIMARY KEY (id);


--
-- Name: entity entity_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_slug_unique UNIQUE (slug);


--
-- Name: entity_tag entity_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag
    ADD CONSTRAINT entity_tag_pkey PRIMARY KEY (id);


--
-- Name: entity_tag entity_tag_tag_id_entity_id_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag
    ADD CONSTRAINT entity_tag_tag_id_entity_id_unique UNIQUE (tag_id, entity_id);


--
-- Name: entity entity_title_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_title_unique UNIQUE (title);


--
-- Name: file file_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file
    ADD CONSTRAINT file_name_unique UNIQUE (name);


--
-- Name: file file_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file
    ADD CONSTRAINT file_pkey PRIMARY KEY (id);


--
-- Name: media media_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_name_unique UNIQUE (name);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: menu_detail menu_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_pkey PRIMARY KEY (id);


--
-- Name: menu_detail menu_detail_safe_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_safe_name_unique UNIQUE (safe_name);


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
-- Name: page page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY page
    ADD CONSTRAINT page_pkey PRIMARY KEY (id);


--
-- Name: page page_title_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY page
    ADD CONSTRAINT page_title_unique UNIQUE (title);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: profile_social_media profile_social_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_social_media
    ADD CONSTRAINT profile_social_media_pkey PRIMARY KEY (id);


--
-- Name: profile profile_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile
    ADD CONSTRAINT profile_username_unique UNIQUE (username);


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
-- Name: route route_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY route
    ADD CONSTRAINT route_name_unique UNIQUE (name);


--
-- Name: route route_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY route
    ADD CONSTRAINT route_pkey PRIMARY KEY (id);


--
-- Name: route route_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY route
    ADD CONSTRAINT route_slug_unique UNIQUE (slug);


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
-- Name: tag tag_safe_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_safe_name_unique UNIQUE (safe_name);


--
-- Name: account_email_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_email_index ON account USING btree (email);


--
-- Name: account_verified_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_verified_index ON account USING btree (verified);


--
-- Name: article_author_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_author_id_index ON article USING btree (author_id);


--
-- Name: article_category_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_category_id_index ON article USING btree (category_id);


--
-- Name: article_created_at_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_created_at_index ON article USING btree (created_at);


--
-- Name: article_published_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_published_index ON article USING btree (published);


--
-- Name: article_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_slug_index ON article USING btree (slug);


--
-- Name: article_status_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX article_status_index ON article USING btree (status);


--
-- Name: category_created_at_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX category_created_at_index ON category USING btree (created_at);


--
-- Name: category_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX category_name_index ON category USING btree (name);


--
-- Name: category_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX category_slug_index ON category USING btree (slug);


--
-- Name: content_type_created_at_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_type_created_at_index ON content_type USING btree (created_at);


--
-- Name: content_type_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_type_slug_index ON content_type USING btree (slug);


--
-- Name: entity_author_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX entity_author_id_index ON entity USING btree (author_id);


--
-- Name: entity_category_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX entity_category_id_index ON entity USING btree (category_id);


--
-- Name: entity_content_type_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX entity_content_type_id_index ON entity USING btree (content_type_id);


--
-- Name: entity_created_at_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX entity_created_at_index ON entity USING btree (created_at);


--
-- Name: entity_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX entity_slug_index ON entity USING btree (slug);


--
-- Name: entity_status_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX entity_status_index ON entity USING btree (status);


--
-- Name: file_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX file_name_index ON file USING btree (name);


--
-- Name: file_path_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX file_path_index ON file USING btree (path);


--
-- Name: file_url_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX file_url_index ON file USING btree (url);


--
-- Name: media_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_name_index ON media USING btree (name);


--
-- Name: media_owner_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_owner_id_index ON media USING btree (owner_id);


--
-- Name: media_url_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_url_index ON media USING btree (url);


--
-- Name: menu_detail_href_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_href_index ON menu_detail USING btree (href);


--
-- Name: menu_detail_menu_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_menu_id_index ON menu_detail USING btree (menu_id);


--
-- Name: menu_detail_parent_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_parent_id_index ON menu_detail USING btree (parent_id);


--
-- Name: menu_detail_safe_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_safe_name_index ON menu_detail USING btree (safe_name);


--
-- Name: menu_detail_title_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_detail_title_index ON menu_detail USING btree (title);


--
-- Name: menu_uuid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX menu_uuid_index ON menu USING btree (uuid);


--
-- Name: page_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX page_slug_index ON page USING btree (slug);


--
-- Name: page_url_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX page_url_index ON page USING btree (url);


--
-- Name: profile_account_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX profile_account_id_index ON profile USING btree (account_id);


--
-- Name: profile_social_media_profile_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX profile_social_media_profile_id_index ON profile_social_media USING btree (profile_id);


--
-- Name: profile_username_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX profile_username_index ON profile USING btree (username);


--
-- Name: role_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX role_name_index ON role USING btree (name);


--
-- Name: route_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX route_name_index ON route USING btree (name);


--
-- Name: route_uri_parts_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX route_uri_parts_index ON route USING btree (uri_parts);


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
-- Name: tsv_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tsv_idx ON article USING gin (title gin_trgm_ops);


--
-- Name: account_role account_role_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role
    ADD CONSTRAINT account_role_account_id_foreign FOREIGN KEY (account_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: account_role account_role_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_role
    ADD CONSTRAINT account_role_role_id_foreign FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article article_author_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article
    ADD CONSTRAINT article_author_id_foreign FOREIGN KEY (author_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article article_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article
    ADD CONSTRAINT article_category_id_foreign FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_media article_media_article_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_media
    ADD CONSTRAINT article_media_article_id_foreign FOREIGN KEY (article_id) REFERENCES article(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_media article_media_media_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_media
    ADD CONSTRAINT article_media_media_id_foreign FOREIGN KEY (media_id) REFERENCES media(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_tag article_tag_article_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag
    ADD CONSTRAINT article_tag_article_id_foreign FOREIGN KEY (article_id) REFERENCES article(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_tag article_tag_tag_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY article_tag
    ADD CONSTRAINT article_tag_tag_id_foreign FOREIGN KEY (tag_id) REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity entity_author_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_author_id_foreign FOREIGN KEY (author_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity entity_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_category_id_foreign FOREIGN KEY (category_id) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity entity_content_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_content_type_id_foreign FOREIGN KEY (content_type_id) REFERENCES content_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity_tag entity_tag_entity_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag
    ADD CONSTRAINT entity_tag_entity_id_foreign FOREIGN KEY (entity_id) REFERENCES entity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity_tag entity_tag_tag_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag
    ADD CONSTRAINT entity_tag_tag_id_foreign FOREIGN KEY (tag_id) REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: file file_owner_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file
    ADD CONSTRAINT file_owner_id_foreign FOREIGN KEY (owner_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: media media_owner_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY media
    ADD CONSTRAINT media_owner_id_foreign FOREIGN KEY (owner_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: menu_detail menu_detail_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES menu(id);


--
-- Name: menu_detail menu_detail_parent_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY menu_detail
    ADD CONSTRAINT menu_detail_parent_id_foreign FOREIGN KEY (parent_id) REFERENCES menu_detail(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profile profile_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile
    ADD CONSTRAINT profile_account_id_foreign FOREIGN KEY (account_id) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: profile_social_media profile_social_media_profile_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profile_social_media
    ADD CONSTRAINT profile_social_media_profile_id_foreign FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

