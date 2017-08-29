--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.4

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
-- Name: article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    title character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    image character varying(255),
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
    "mediaId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE article_media OWNER TO postgres;

--
-- Name: article_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE article_tag (
    id integer NOT NULL,
    "articleId" uuid NOT NULL,
    "tagId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
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
-- Name: content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE content_type (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    icon character varying(140),
    description text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE content_type OWNER TO postgres;

--
-- Name: entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE entity (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    title character varying(140) NOT NULL,
    slug character varying(140) NOT NULL,
    image character varying(255),
    meta json,
    "rawContent" json,
    content text NOT NULL,
    excerpt text,
    status text NOT NULL,
    "ctId" uuid NOT NULL,
    "userId" uuid,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    CONSTRAINT entity_status_check CHECK ((status = ANY (ARRAY['published'::text, 'archived'::text, 'draft'::text])))
);


ALTER TABLE entity OWNER TO postgres;

--
-- Name: entity_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE entity_tag (
    id integer NOT NULL,
    "tagId" uuid NOT NULL,
    "entityId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
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
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(128) NOT NULL,
    type character varying(32) NOT NULL,
    url character varying(125) NOT NULL,
    path character varying(255) NOT NULL,
    size integer,
    "safeName" character varying(128) NOT NULL,
    "thumbName" character varying(128),
    "fileDescription" character varying(255),
    "ownerId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE file OWNER TO postgres;

--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE media (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(128) NOT NULL,
    "safeName" character varying(128) NOT NULL,
    "thumbName" character varying(128),
    size integer,
    "fileDescription" character varying(255),
    type character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    "userId" uuid,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE media OWNER TO postgres;

--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu (
    id integer NOT NULL,
    uuid uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    attributes json,
    restricted boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE menu OWNER TO postgres;

--
-- Name: menu_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE menu_detail (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "safeName" character varying(50) NOT NULL,
    title character varying(50) NOT NULL,
    "hasDropdown" boolean DEFAULT false,
    "cssClassname" character varying(255),
    "order" integer,
    "mobileHref" character varying(255),
    href character varying(255) NOT NULL,
    icon character varying(255),
    children jsonb,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE menu_detail OWNER TO postgres;

--
-- Name: COLUMN menu_detail."mobileHref"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN menu_detail."mobileHref" IS 'Mobile href is applicable in cases where the item is a dropdowntrigger on desktop. Without a mobile href, it will only be text.';


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
    "menuDetailId" uuid NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
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
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    url character varying(255),
    meta jsonb,
    blocks jsonb,
    markup text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
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
-- Name: route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE route (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100),
    "uriParts" character varying(255) NOT NULL,
    "uriPattern" character varying(255) NOT NULL,
    template character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
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
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
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
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(32) NOT NULL,
    description character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE tag OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(60) NOT NULL,
    "firstName" character varying(64) NOT NULL,
    "lastName" character varying(64) NOT NULL,
    username character varying(64) NOT NULL,
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
    "roleId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
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
-- Name: user_social_media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_social_media (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    "facebookUrl" character varying(255),
    "twitterUrl" character varying(255),
    "githubUrl" character varying(255),
    "linkedinUrl" character varying(255),
    "googleUrl" character varying(255),
    "stackoverflowUrl" character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone
);


ALTER TABLE user_social_media OWNER TO postgres;

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
-- Name: user_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_role ALTER COLUMN id SET DEFAULT nextval('user_role_id_seq'::regclass);


--
-- Name: verification_token id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_token ALTER COLUMN id SET DEFAULT nextval('verification_token_id_seq'::regclass);


--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO article (id, title, slug, image, meta, featured, "rawContent", content, excerpt, "userId", published, "createdAt", "updatedAt", "deletedAt") VALUES ('cb61bbae-c91e-4014-b665-3485734b88fb', 'Setup a Universal React Application', 'setup-a-universal-react-application', 'https://cdn-images-1.medium.com/max/800/1*tnh7IIZ1PrNQ-PzOMijBTQ.png', '{}', false, '{"entityMap":{},"blocks":[{"key":"39eg7","text":"Getting Started.","type":"header-two","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fbjrk","text":"JavaScript is the most popular programming language in the world. It’s ubiquitous with the web we know. The rise in popularity of Node.js and a desire to make experiences across multiple platforms as seamless as possible has led to the emergence of this concept of universal JavaScript applications.Sometimes referred to as Isomorphic, Universal JavaScript applications, deliver the capability of rendering JavaScript on the server before it gets sent to the user’s browser. The benefits of rendering on the server are huge for many reasons; like search engine optimization (SEO), faster loading times, and fallbacks for when a user might have JavaScript disabled.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dh8q4","text":"Unfortunately the barrier of entry for setting up a universal JavaScript application is quite high. There are a decent amount of starter projects on GitHub that are great to look at and analyze, but not much can be found explaining the why or the how things need to be done.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}', '<p>This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is <strong>hard. </strong></p><p>I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction<strong>. Many developers will tell you not to even try; that it is not worth the headache.</strong></p><p> I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the<em> next level thinking</em>, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.</p><p>The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…</p>', 'This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard.', 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', false, '2017-08-23 01:38:46.885398+00', NULL, NULL);
INSERT INTO article (id, title, slug, image, meta, featured, "rawContent", content, excerpt, "userId", published, "createdAt", "updatedAt", "deletedAt") VALUES ('5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'Building From Scratch', 'building-from-scratch', 'http://i.magaimg.net/img/18en.png', '{}', true, '{"entityMap":{},"blocks":[{"key":"64vtl","text":"This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":278,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"aiim1","text":"I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction. Many developers will tell you not to even try; that it is not worth the headache.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":242,"length":83,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"339vf","text":" I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the next level thinking, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":298,"length":20,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"5vgli","text":"The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}', '<p>This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is <strong>hard. </strong></p><p>I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction<strong>. Many developers will tell you not to even try; that it is not worth the headache.</strong></p><p> I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the<em> next level thinking</em>, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.</p><p>The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…</p>', 'This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard.', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-08-23 01:38:46.885194+00', '2017-08-25 07:01:24.459+00', NULL);
INSERT INTO article (id, title, slug, image, meta, featured, "rawContent", content, excerpt, "userId", published, "createdAt", "updatedAt", "deletedAt") VALUES ('ab33a0ca-b349-4cf8-947f-94f415149492', 'Flowtype Opaque Types', 'flowtype-opaque-types', 'https://cdn-images-1.medium.com/max/2000/1*DQJCnm07c_MxpsFYarwwEg.jpeg', '{}', false, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://github.com/babel/babel/pull/5990","rel":"nofollow noopener","target":"_blank","url":"https://github.com/babel/babel/pull/5990"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://flow.org/en/docs/types/opaque-types/","rel":"nofollow noopener","target":"_blank","url":"https://flow.org/en/docs/types/opaque-types/"}}},"blocks":[{"key":"5ctuu","text":"Flow’s New Opaque Type Aliases Feature","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":38,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9887i","text":"Do you ever wish that you could hide your implementation details away from your users?Well, now all of your dreams have finally come true! Flow 0.51.0 added support for opaque type aliases, with babel support coming in the next week or so. Opaque type aliases are type aliases that hide their underlying type. You can only see an opaque type’s underlying type in the file which declares the opaque type. They’re already documented here, so we’ll spend the rest of this blog post showing just how powerful opaque type aliases can be.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":195,"length":14,"key":0},{"offset":431,"length":4,"key":1}],"data":{}},{"key":"12bhl","text":"Maintaining Invariants with Opaque Types","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ct6ko","text":"Opaque type aliases are really useful for maintaining invariants in your code. Whenever you find yourself wanting to express “things of type T where X is true,” you might want to consider using an opaque type alias.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d53nf","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a5fs","text":"As a simple example, lets consider a type for non-negative numbers:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5s25s","text":"NonNeg.js:","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"7aehc","text":"// @flow","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f0io4","text":"opaque type NonNeg = number;","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"BOLD"},{"offset":7,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}]}', '<h1><strong>Flow’s New Opaque Type Aliases Feature</strong></h1><p>Do you ever wish that you could hide your implementation details away from your users?Well, now all of your dreams have finally come true! Flow 0.51.0 added support for opaque type aliases, with <a href="https://github.com/babel/babel/pull/5990" target="_blank">babel support </a>coming in the next week or so. Opaque type aliases are type aliases that hide their underlying type. You can only see an opaque type’s underlying type in the file which declares the opaque type. They’re already documented <a href="https://flow.org/en/docs/types/opaque-types/" target="_blank">here</a>, so we’ll spend the rest of this blog post showing just how powerful opaque type aliases can be.</p><h3><strong>Maintaining Invariants with Opaque Types</strong></h3><p>Opaque type aliases are really useful for maintaining invariants in your code. Whenever you find yourself wanting to express “things of type T where X is true,” you might want to consider using an opaque type alias.</p><p></p><p>As a simple example, lets consider a type for non-negative numbers:</p><blockquote><em>NonNeg.js:</em></blockquote><blockquote>// @flow</blockquote><blockquote><strong>opaque</strong> <strong>type</strong> NonNeg = number;</blockquote>', 'Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature', '1b062e26-df71-48ce-b363-4ae9b966e7a0', true, '2017-08-23 01:38:46.885665+00', '2017-08-23 02:01:18.94+00', NULL);


--
-- Data for Name: article_media; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: article_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO article_tag (id, "articleId", "tagId", "createdAt", "updatedAt") VALUES (1, '5c9ed236-79f0-4ff7-93bd-2815f06c74b4', 'b1c0d816-e8c0-4a0d-a63a-5215f02b423e', '2017-08-23 01:38:46.888866+00', NULL);
INSERT INTO article_tag (id, "articleId", "tagId", "createdAt", "updatedAt") VALUES (2, 'cb61bbae-c91e-4014-b665-3485734b88fb', '517e9975-9dd8-44fc-80cf-cb907964a06b', '2017-08-23 01:38:46.889029+00', NULL);
INSERT INTO article_tag (id, "articleId", "tagId", "createdAt", "updatedAt") VALUES (3, 'ab33a0ca-b349-4cf8-947f-94f415149492', 'b1c0d816-e8c0-4a0d-a63a-5215f02b423e', '2017-08-23 01:38:46.889552+00', NULL);


--
-- Name: article_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('article_tag_id_seq', 4, true);


--
-- Data for Name: content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO content_type (id, name, slug, icon, description, "createdAt", "updatedAt", "deletedAt") VALUES ('88a679f3-7b34-44c4-8d07-61582a7570e5', 'Article', 'article', 'article', 'An article is a blog post', '2017-08-28 21:47:21.091+00', '2017-08-28 21:47:21.091+00', NULL);


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

INSERT INTO media (id, name, "safeName", "thumbName", size, "fileDescription", type, url, path, "userId", "createdAt", "updatedAt") VALUES ('5d21c7ef-9b6b-4fe9-aba3-3202e06ec2bd', 'HyjYhAjdZ.png', 'HyjYhAjdZ.png', 'HyjYhAjdZthumb.png', NULL, NULL, 'image/png', '/uploads/media/HyjYhAjdZ.png', '/Users/steventruesdell/Projects/Boldr/boldr/packages/server/public/uploads/media/HyjYhAjdZ.png', '1b062e26-df71-48ce-b363-4ae9b966e7a0', '2017-08-24 04:56:34.68+00', '2017-08-24 04:56:34.68+00');
INSERT INTO media (id, name, "safeName", "thumbName", size, "fileDescription", type, url, path, "userId", "createdAt", "updatedAt") VALUES ('234393cd-153e-4469-99dc-bea33653a15a', 'S1Fv6RsOb.png', 'S1Fv6RsOb.png', 'S1Fv6RsObthumb.png', NULL, NULL, 'image/png', '/uploads/media/S1Fv6RsOb.png', '/Users/steventruesdell/Projects/Boldr/boldr/packages/server/public/uploads/media/S1Fv6RsOb.png', '1b062e26-df71-48ce-b363-4ae9b966e7a0', '2017-08-24 05:00:16.931+00', '2017-08-24 05:00:16.931+00');
INSERT INTO media (id, name, "safeName", "thumbName", size, "fileDescription", type, url, path, "userId", "createdAt", "updatedAt") VALUES ('2394f7a9-4fd2-49ab-b6ca-813ecb557a12', 'BJEiXWztW.png', 'BJEiXWztW.png', 'BJEiXWztWthumb.png', NULL, NULL, 'image/png', '/uploads/media/BJEiXWztW.png', '/Users/steventruesdell/Projects/Boldr/boldr/packages/server/public/uploads/media/BJEiXWztW.png', '1b062e26-df71-48ce-b363-4ae9b966e7a0', '2017-08-28 20:56:59.647+00', '2017-08-28 20:56:59.647+00');


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu (id, uuid, name, attributes, restricted, "createdAt", "updatedAt") VALUES (1, '7323a99d-5069-4111-bcb8-35ba0a2e4555', 'Main', '{}', false, '2017-08-23 01:38:46.891896+00', NULL);


--
-- Data for Name: menu_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu_detail (id, "safeName", title, "hasDropdown", "cssClassname", "order", "mobileHref", href, icon, children, "createdAt", "updatedAt", "deletedAt") VALUES ('c0b0ea44-8d9d-4081-9655-871399b970fe', 'About', 'About', true, 'about-link', 1, '/about', '/about', 'info', '{"key": "about-menu", "items": [{"id": "775d5519-60e1-489f-90d1-1f1f34e2b712", "href": "/about/tech", "icon": "change_history", "title": "Tech", "safeName": "Tech"}, {"id": "eab16467-997c-4aaf-862e-5ae902ac94f9", "href": "/about/setup", "icon": "phonelink_setup", "title": "Setup", "safeName": "Setup"}]}', '2017-08-23 01:38:46.893997+00', NULL, NULL);
INSERT INTO menu_detail (id, "safeName", title, "hasDropdown", "cssClassname", "order", "mobileHref", href, icon, children, "createdAt", "updatedAt", "deletedAt") VALUES ('79b3e678-c6d8-4824-bb50-f71a7d45be87', 'Blog', 'Blog', false, 'blog-link', 2, '/blog', '/blog', 'info', NULL, '2017-08-23 01:38:46.894201+00', NULL, NULL);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('menu_id_seq', 1, true);


--
-- Data for Name: menu_menu_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO menu_menu_detail ("menuId", "menuDetailId", "createdAt", "updatedAt") VALUES (1, 'c0b0ea44-8d9d-4081-9655-871399b970fe', '2017-08-23 01:38:46.896336+00', NULL);
INSERT INTO menu_menu_detail ("menuId", "menuDetailId", "createdAt", "updatedAt") VALUES (1, '79b3e678-c6d8-4824-bb50-f71a7d45be87', '2017-08-23 01:38:46.89648+00', NULL);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO migrations (id, name, batch, migration_time) VALUES (1, '201701270219_initial.js', 1, '2017-08-23 01:38:27.136+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (2, '201704120543_media.js', 1, '2017-08-23 01:38:27.161+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (3, '201705101823_social.js', 1, '2017-08-23 01:38:27.169+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (4, '201705270719_tsv-article.js', 1, '2017-08-23 01:38:27.172+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (5, '201706291706_page.js', 1, '2017-08-23 01:38:27.183+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (6, '201707140206_routes.js', 1, '2017-08-23 01:38:27.194+00');
INSERT INTO migrations (id, name, batch, migration_time) VALUES (7, '201708222054_entity-content.js', 1, '2017-08-23 01:38:27.232+00');


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

INSERT INTO page (id, title, slug, url, meta, blocks, markup, "createdAt", "updatedAt", "deletedAt") VALUES ('dc43374e-6a9d-4f50-8c8d-698ba28bce0a', 'About', 'about', '/about', NULL, NULL, NULL, '2017-08-23 01:38:46.868732+00', NULL, NULL);
INSERT INTO page (id, title, slug, url, meta, blocks, markup, "createdAt", "updatedAt", "deletedAt") VALUES ('76f5707d-2585-470c-9a3f-dd029582c740', 'Home', 'home', '/', NULL, NULL, NULL, '2017-08-23 01:38:46.868412+00', NULL, NULL);
INSERT INTO page (id, title, slug, url, meta, blocks, markup, "createdAt", "updatedAt", "deletedAt") VALUES ('a29f6fa7-a331-4d09-85c5-4bc880436703', 'Portfolio', 'portfolio', '/portfolio', NULL, NULL, NULL, '2017-08-23 01:38:46.869912+00', NULL, NULL);


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

INSERT INTO role (id, uuid, name, image, description, "createdAt", "updatedAt") VALUES (1, '08283e3f-ddb4-41d4-95e0-59cb9903fd02', 'Member', NULL, 'A verified user without special privileges', '2017-08-23 01:38:46.872985+00', NULL);
INSERT INTO role (id, uuid, name, image, description, "createdAt", "updatedAt") VALUES (2, 'd4453244-244d-427c-af48-2931ef311662', 'Staff', NULL, 'Allows access to the CMS dashboard.', '2017-08-23 01:38:46.873161+00', NULL);
INSERT INTO role (id, uuid, name, image, description, "createdAt", "updatedAt") VALUES (3, 'd482b67e-994a-41d5-ad56-10d504a44a2e', 'Admin', NULL, 'Complete control over the CMS', '2017-08-23 01:38:46.873463+00', NULL);


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

INSERT INTO setting (id, key, label, value, description, "createdAt", "updatedAt") VALUES (1, 'siteName', 'Site Name', 'Boldr', 'The website name.', '2017-08-23 01:38:46.902699+00', NULL);
INSERT INTO setting (id, key, label, value, description, "createdAt", "updatedAt") VALUES (2, 'siteUrl', 'Site URL', 'http://localhost:3000', 'The address used to access your website.', '2017-08-23 01:38:46.902884+00', NULL);
INSERT INTO setting (id, key, label, value, description, "createdAt", "updatedAt") VALUES (3, 'siteLogo', 'Site Logo', 'https://boldr.io/assets/boldr-text-logo.png', 'The logo is displayed in the header area.', '2017-08-23 01:38:46.903026+00', NULL);
INSERT INTO setting (id, key, label, value, description, "createdAt", "updatedAt") VALUES (4, 'siteDescription', 'Site Description', 'A modern CMS', 'Meta header for search results.', '2017-08-23 01:38:46.905117+00', NULL);
INSERT INTO setting (id, key, label, value, description, "createdAt", "updatedAt") VALUES (5, 'favicon', 'Favicon', 'https://boldr.io/favicon.ico', 'Favicon to use for your website.', '2017-08-23 01:38:46.905515+00', NULL);
INSERT INTO setting (id, key, label, value, description, "createdAt", "updatedAt") VALUES (6, 'googleAnalytics', 'Google Analytics ID', 'UA-323432', 'Google Analytics tracking code', '2017-08-23 01:38:46.905963+00', NULL);
INSERT INTO setting (id, key, label, value, description, "createdAt", "updatedAt") VALUES (7, 'allowRegistration', 'Allow Registration', 'true', 'Toggle allowing user''s to register for accounts.', '2017-08-23 01:38:46.906864+00', NULL);


--
-- Name: setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('setting_id_seq', 7, true);


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO tag (id, name, description, "createdAt", "updatedAt", "deletedAt") VALUES ('b1c0d816-e8c0-4a0d-a63a-5215f02b423e', 'javascript', 'Something something JS', '2017-08-23 01:38:46.882355+00', NULL, NULL);
INSERT INTO tag (id, name, description, "createdAt", "updatedAt", "deletedAt") VALUES ('517e9975-9dd8-44fc-80cf-cb907964a06b', 'stuff', 'Stuff about stuff.', '2017-08-23 01:38:46.882511+00', NULL, NULL);
INSERT INTO tag (id, name, description, "createdAt", "updatedAt", "deletedAt") VALUES ('ad524da0-88ce-41c9-a70e-f057c7bf51c2', 'apple', NULL, '2017-08-28 20:34:25.586065+00', NULL, NULL);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user" (id, email, password, "firstName", "lastName", username, "avatarUrl", "profileImage", location, bio, birthday, website, language, verified, "createdAt", "updatedAt", "deletedAt") VALUES ('1b062e26-df71-48ce-b363-4ae9b966e7a0', 'admin@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Joe', 'Gray', 'Joey', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Colorado', 'I am me.', '1988-01-01', 'https://boldr.io', 'en_US', true, '2017-08-23 01:38:46.876013+00', NULL, NULL);
INSERT INTO "user" (id, email, password, "firstName", "lastName", username, "avatarUrl", "profileImage", location, bio, birthday, website, language, verified, "createdAt", "updatedAt", "deletedAt") VALUES ('f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'demo@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Sam', 'Hunt', 'Samus', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'California', 'Someone doing things.', '1988-01-01', 'https://boldr.io', 'en_US', true, '2017-08-23 01:38:46.876424+00', NULL, NULL);
INSERT INTO "user" (id, email, password, "firstName", "lastName", username, "avatarUrl", "profileImage", location, bio, birthday, website, language, verified, "createdAt", "updatedAt", "deletedAt") VALUES ('f4d869a6-1a75-469b-a9cc-965c552929e4', 'user@boldr.io', '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka', 'Jessica', 'Smith', 'Jess', 'https://boldr.io/images/unknown-avatar.png', 'https://boldr.io/images/unknown-avatar.png', 'Washington', 'Just a person', '1988-01-01', 'https://boldr.io', 'en_US', true, '2017-08-23 01:38:46.876612+00', NULL, NULL);
INSERT INTO "user" (id, email, password, "firstName", "lastName", username, "avatarUrl", "profileImage", location, bio, birthday, website, language, verified, "createdAt", "updatedAt", "deletedAt") VALUES ('7e77cbec-adb0-4dc7-8f91-d0ac7b698a83', 'steven@trues.io', '$2a$10$8QEOev6UkeRqzoN9hTgVwu2z3/1x4E/wojVohYyKQrCfQItvX0ZUa', 'Steven', 'Smith', 'Smith', 'https://boldr.io/images/unknown-avatar.png', NULL, NULL, NULL, NULL, NULL, 'en_US', true, '2017-08-25 16:32:33.229+00', '2017-08-25 16:35:29.568+00', NULL);


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_role (id, "userId", "roleId", "createdAt", "updatedAt") VALUES (1, '1b062e26-df71-48ce-b363-4ae9b966e7a0', 3, '2017-08-23 01:38:46.899159+00', NULL);
INSERT INTO user_role (id, "userId", "roleId", "createdAt", "updatedAt") VALUES (2, 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 2, '2017-08-23 01:38:46.899317+00', NULL);
INSERT INTO user_role (id, "userId", "roleId", "createdAt", "updatedAt") VALUES (3, 'f4d869a6-1a75-469b-a9cc-965c552929e4', 1, '2017-08-23 01:38:46.899504+00', NULL);
INSERT INTO user_role (id, "userId", "roleId", "createdAt", "updatedAt") VALUES (4, '7e77cbec-adb0-4dc7-8f91-d0ac7b698a83', 1, '2017-08-25 16:32:33.393815+00', NULL);


--
-- Name: user_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_role_id_seq', 4, true);


--
-- Data for Name: user_social_media; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO user_social_media (id, "userId", "facebookUrl", "twitterUrl", "githubUrl", "linkedinUrl", "googleUrl", "stackoverflowUrl", "createdAt", "updatedAt") VALUES ('3df1ef01-dbe0-4e05-ba91-2fd81fb49a32', '1b062e26-df71-48ce-b363-4ae9b966e7a0', 'https://facebook.com', 'https://twitter.com', 'https://github.com', 'https://linkedin.com', 'https://google.com', 'https://stackoverflow.com', '2017-08-23 01:38:46.879023+00', NULL);
INSERT INTO user_social_media (id, "userId", "facebookUrl", "twitterUrl", "githubUrl", "linkedinUrl", "googleUrl", "stackoverflowUrl", "createdAt", "updatedAt") VALUES ('bd2449f5-7271-4bd3-9508-e51e2af3af77', 'f4d869a6-1a75-469b-a9cc-965c552929e4', 'https://facebook.com', 'https://twitter.com', 'https://github.com', 'https://linkedin.com', 'https://google.com', 'https://stackoverflow.com', '2017-08-23 01:38:46.879213+00', NULL);
INSERT INTO user_social_media (id, "userId", "facebookUrl", "twitterUrl", "githubUrl", "linkedinUrl", "googleUrl", "stackoverflowUrl", "createdAt", "updatedAt") VALUES ('09748b34-56a5-4e9f-8dbe-17df67869946', 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f', 'https://facebook.com', 'https://twitter.com', 'https://github.com', 'https://linkedin.com', 'https://google.com', 'https://stackoverflow.com', '2017-08-23 01:38:46.879803+00', NULL);


--
-- Data for Name: verification_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO verification_token (id, ip, token, used, "userId", "createdAt", "updatedAt") VALUES (1, '::1', '9dc474d6-41ca-464a-8857-962228dbf487', false, '7e77cbec-adb0-4dc7-8f91-d0ac7b698a83', '2017-08-25 16:32:33.411+00', '2017-08-25 16:32:33.411+00');


--
-- Name: verification_token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('verification_token_id_seq', 1, true);


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
-- Name: entity_tag entity_tag_tagid_entityid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag
    ADD CONSTRAINT entity_tag_tagid_entityid_unique UNIQUE ("tagId", "entityId");


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
-- Name: user_social_media user_social_media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_social_media
    ADD CONSTRAINT user_social_media_pkey PRIMARY KEY (id);


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
-- Name: content_type_createdat_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_type_createdat_index ON content_type USING btree ("createdAt");


--
-- Name: content_type_slug_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX content_type_slug_index ON content_type USING btree (slug);


--
-- Name: entity_createdat_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX entity_createdat_index ON entity USING btree ("createdAt");


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
-- Name: route_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX route_name_index ON route USING btree (name);


--
-- Name: route_uriparts_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX route_uriparts_index ON route USING btree ("uriParts");


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
-- Name: user_email_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_email_index ON "user" USING btree (email);


--
-- Name: user_social_media_userid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_social_media_userid_index ON user_social_media USING btree ("userId");


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
-- Name: entity entity_ctid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_ctid_foreign FOREIGN KEY ("ctId") REFERENCES content_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity_tag entity_tag_entityid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag
    ADD CONSTRAINT entity_tag_entityid_foreign FOREIGN KEY ("entityId") REFERENCES entity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity_tag entity_tag_tagid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity_tag
    ADD CONSTRAINT entity_tag_tagid_foreign FOREIGN KEY ("tagId") REFERENCES tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entity entity_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY entity
    ADD CONSTRAINT entity_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: file file_ownerid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY file
    ADD CONSTRAINT file_ownerid_foreign FOREIGN KEY ("ownerId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: user_social_media user_social_media_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_social_media
    ADD CONSTRAINT user_social_media_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: verification_token verification_token_userid_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY verification_token
    ADD CONSTRAINT verification_token_userid_foreign FOREIGN KEY ("userId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
