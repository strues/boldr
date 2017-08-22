--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

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
-- Name: assetindexdata; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE assetindexdata (
    id integer NOT NULL,
    "sessionId" character varying(36) DEFAULT ''::character varying NOT NULL,
    "volumeId" integer NOT NULL,
    uri text,
    size bigint,
    "timestamp" timestamp(0) without time zone,
    "recordId" integer,
    "inProgress" boolean DEFAULT false,
    completed boolean DEFAULT false,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE assetindexdata OWNER TO craft3beta;

--
-- Name: assetindexdata_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE assetindexdata_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assetindexdata_id_seq OWNER TO craft3beta;

--
-- Name: assetindexdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE assetindexdata_id_seq OWNED BY assetindexdata.id;


--
-- Name: assets; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE assets (
    id integer NOT NULL,
    "volumeId" integer,
    "folderId" integer NOT NULL,
    filename character varying(255) NOT NULL,
    kind character varying(50) DEFAULT 'unknown'::character varying NOT NULL,
    width integer,
    height integer,
    size bigint,
    "focalPoint" character varying(13) DEFAULT NULL::character varying,
    "dateModified" timestamp(0) without time zone,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE assets OWNER TO craft3beta;

--
-- Name: assettransformindex; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE assettransformindex (
    id integer NOT NULL,
    "assetId" integer NOT NULL,
    filename character varying(255),
    format character varying(255),
    location character varying(255) NOT NULL,
    "volumeId" integer,
    "fileExists" boolean DEFAULT false NOT NULL,
    "inProgress" boolean DEFAULT false NOT NULL,
    "dateIndexed" timestamp(0) without time zone,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE assettransformindex OWNER TO craft3beta;

--
-- Name: assettransformindex_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE assettransformindex_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assettransformindex_id_seq OWNER TO craft3beta;

--
-- Name: assettransformindex_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE assettransformindex_id_seq OWNED BY assettransformindex.id;


--
-- Name: assettransforms; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE assettransforms (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    mode character varying(255) DEFAULT 'crop'::character varying NOT NULL,
    "position" character varying(255) DEFAULT 'center-center'::character varying NOT NULL,
    width integer,
    height integer,
    format character varying(255),
    quality integer,
    "dimensionChangeTime" timestamp(0) without time zone,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL,
    CONSTRAINT assettransforms_mode_check CHECK (((mode)::text = ANY ((ARRAY['stretch'::character varying, 'fit'::character varying, 'crop'::character varying])::text[]))),
    CONSTRAINT assettransforms_position_check CHECK ((("position")::text = ANY ((ARRAY['top-left'::character varying, 'top-center'::character varying, 'top-right'::character varying, 'center-left'::character varying, 'center-center'::character varying, 'center-right'::character varying, 'bottom-left'::character varying, 'bottom-center'::character varying, 'bottom-right'::character varying])::text[])))
);


ALTER TABLE assettransforms OWNER TO craft3beta;

--
-- Name: assettransforms_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE assettransforms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assettransforms_id_seq OWNER TO craft3beta;

--
-- Name: assettransforms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE assettransforms_id_seq OWNED BY assettransforms.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE categories (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE categories OWNER TO craft3beta;

--
-- Name: categorygroups; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE categorygroups (
    id integer NOT NULL,
    "structureId" integer NOT NULL,
    "fieldLayoutId" integer,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE categorygroups OWNER TO craft3beta;

--
-- Name: categorygroups_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE categorygroups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE categorygroups_id_seq OWNER TO craft3beta;

--
-- Name: categorygroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE categorygroups_id_seq OWNED BY categorygroups.id;


--
-- Name: categorygroups_sites; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE categorygroups_sites (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    "siteId" integer NOT NULL,
    "hasUrls" boolean DEFAULT true NOT NULL,
    "uriFormat" text,
    template character varying(500),
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE categorygroups_sites OWNER TO craft3beta;

--
-- Name: categorygroups_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE categorygroups_sites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE categorygroups_sites_id_seq OWNER TO craft3beta;

--
-- Name: categorygroups_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE categorygroups_sites_id_seq OWNED BY categorygroups_sites.id;


--
-- Name: content; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE content (
    id integer NOT NULL,
    "elementId" integer NOT NULL,
    "siteId" integer NOT NULL,
    title character varying(255),
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE content OWNER TO craft3beta;

--
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE content_id_seq OWNER TO craft3beta;

--
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE content_id_seq OWNED BY content.id;


--
-- Name: deprecationerrors; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE deprecationerrors (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    fingerprint character varying(255) NOT NULL,
    "lastOccurrence" timestamp(0) without time zone NOT NULL,
    file character varying(255) NOT NULL,
    line smallint NOT NULL,
    message character varying(255),
    traces text,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE deprecationerrors OWNER TO craft3beta;

--
-- Name: deprecationerrors_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE deprecationerrors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE deprecationerrors_id_seq OWNER TO craft3beta;

--
-- Name: deprecationerrors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE deprecationerrors_id_seq OWNED BY deprecationerrors.id;


--
-- Name: elementindexsettings; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE elementindexsettings (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    settings text,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE elementindexsettings OWNER TO craft3beta;

--
-- Name: elementindexsettings_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE elementindexsettings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE elementindexsettings_id_seq OWNER TO craft3beta;

--
-- Name: elementindexsettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE elementindexsettings_id_seq OWNED BY elementindexsettings.id;


--
-- Name: elements; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE elements (
    id integer NOT NULL,
    "fieldLayoutId" integer,
    type character varying(255) NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE elements OWNER TO craft3beta;

--
-- Name: elements_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE elements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE elements_id_seq OWNER TO craft3beta;

--
-- Name: elements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE elements_id_seq OWNED BY elements.id;


--
-- Name: elements_sites; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE elements_sites (
    id integer NOT NULL,
    "elementId" integer NOT NULL,
    "siteId" integer NOT NULL,
    slug character varying(255),
    uri character varying(255),
    enabled boolean DEFAULT true NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE elements_sites OWNER TO craft3beta;

--
-- Name: elements_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE elements_sites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE elements_sites_id_seq OWNER TO craft3beta;

--
-- Name: elements_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE elements_sites_id_seq OWNED BY elements_sites.id;


--
-- Name: entries; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE entries (
    id integer NOT NULL,
    "sectionId" integer NOT NULL,
    "typeId" integer NOT NULL,
    "authorId" integer,
    "postDate" timestamp(0) without time zone,
    "expiryDate" timestamp(0) without time zone,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE entries OWNER TO craft3beta;

--
-- Name: entrydrafts; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE entrydrafts (
    id integer NOT NULL,
    "entryId" integer NOT NULL,
    "sectionId" integer NOT NULL,
    "creatorId" integer NOT NULL,
    "siteId" integer NOT NULL,
    name character varying(255) NOT NULL,
    notes text,
    data text NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE entrydrafts OWNER TO craft3beta;

--
-- Name: entrydrafts_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE entrydrafts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE entrydrafts_id_seq OWNER TO craft3beta;

--
-- Name: entrydrafts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE entrydrafts_id_seq OWNED BY entrydrafts.id;


--
-- Name: entrytypes; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE entrytypes (
    id integer NOT NULL,
    "sectionId" integer NOT NULL,
    "fieldLayoutId" integer,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    "hasTitleField" boolean DEFAULT true NOT NULL,
    "titleLabel" character varying(255) DEFAULT 'Title'::character varying,
    "titleFormat" character varying(255),
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE entrytypes OWNER TO craft3beta;

--
-- Name: entrytypes_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE entrytypes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE entrytypes_id_seq OWNER TO craft3beta;

--
-- Name: entrytypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE entrytypes_id_seq OWNED BY entrytypes.id;


--
-- Name: entryversions; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE entryversions (
    id integer NOT NULL,
    "entryId" integer NOT NULL,
    "sectionId" integer NOT NULL,
    "creatorId" integer,
    "siteId" integer NOT NULL,
    num smallint NOT NULL,
    notes text,
    data text NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE entryversions OWNER TO craft3beta;

--
-- Name: entryversions_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE entryversions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE entryversions_id_seq OWNER TO craft3beta;

--
-- Name: entryversions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE entryversions_id_seq OWNED BY entryversions.id;


--
-- Name: fieldgroups; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE fieldgroups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE fieldgroups OWNER TO craft3beta;

--
-- Name: fieldgroups_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE fieldgroups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fieldgroups_id_seq OWNER TO craft3beta;

--
-- Name: fieldgroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE fieldgroups_id_seq OWNED BY fieldgroups.id;


--
-- Name: fieldlayoutfields; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE fieldlayoutfields (
    id integer NOT NULL,
    "layoutId" integer NOT NULL,
    "tabId" integer NOT NULL,
    "fieldId" integer NOT NULL,
    required boolean DEFAULT false NOT NULL,
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE fieldlayoutfields OWNER TO craft3beta;

--
-- Name: fieldlayoutfields_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE fieldlayoutfields_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fieldlayoutfields_id_seq OWNER TO craft3beta;

--
-- Name: fieldlayoutfields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE fieldlayoutfields_id_seq OWNED BY fieldlayoutfields.id;


--
-- Name: fieldlayouts; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE fieldlayouts (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE fieldlayouts OWNER TO craft3beta;

--
-- Name: fieldlayouts_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE fieldlayouts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fieldlayouts_id_seq OWNER TO craft3beta;

--
-- Name: fieldlayouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE fieldlayouts_id_seq OWNED BY fieldlayouts.id;


--
-- Name: fieldlayouttabs; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE fieldlayouttabs (
    id integer NOT NULL,
    "layoutId" integer NOT NULL,
    name character varying(255) NOT NULL,
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE fieldlayouttabs OWNER TO craft3beta;

--
-- Name: fieldlayouttabs_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE fieldlayouttabs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fieldlayouttabs_id_seq OWNER TO craft3beta;

--
-- Name: fieldlayouttabs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE fieldlayouttabs_id_seq OWNED BY fieldlayouttabs.id;


--
-- Name: fields; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE fields (
    id integer NOT NULL,
    "groupId" integer,
    name character varying(255) NOT NULL,
    handle character varying(64) NOT NULL,
    context character varying(255) DEFAULT 'global'::character varying NOT NULL,
    instructions text,
    "translationMethod" character varying(255) DEFAULT 'none'::character varying NOT NULL,
    "translationKeyFormat" text,
    type character varying(255) NOT NULL,
    settings text,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL,
    CONSTRAINT "fields_translationMethod_check" CHECK ((("translationMethod")::text = ANY ((ARRAY['none'::character varying, 'language'::character varying, 'site'::character varying, 'custom'::character varying])::text[])))
);


ALTER TABLE fields OWNER TO craft3beta;

--
-- Name: fields_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE fields_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fields_id_seq OWNER TO craft3beta;

--
-- Name: fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE fields_id_seq OWNED BY fields.id;


--
-- Name: globalsets; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE globalsets (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    "fieldLayoutId" integer,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE globalsets OWNER TO craft3beta;

--
-- Name: globalsets_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE globalsets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE globalsets_id_seq OWNER TO craft3beta;

--
-- Name: globalsets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE globalsets_id_seq OWNED BY globalsets.id;


--
-- Name: info; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE info (
    id integer NOT NULL,
    version character varying(50) NOT NULL,
    "schemaVersion" character varying(15) NOT NULL,
    edition smallint NOT NULL,
    timezone character varying(30),
    name character varying(255) NOT NULL,
    "on" boolean DEFAULT false NOT NULL,
    maintenance boolean DEFAULT false NOT NULL,
    "fieldVersion" character(12) DEFAULT '000000000000'::bpchar NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE info OWNER TO craft3beta;

--
-- Name: info_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE info_id_seq OWNER TO craft3beta;

--
-- Name: info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE info_id_seq OWNED BY info.id;


--
-- Name: matrixblocks; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE matrixblocks (
    id integer NOT NULL,
    "ownerId" integer NOT NULL,
    "ownerSiteId" integer,
    "fieldId" integer NOT NULL,
    "typeId" integer NOT NULL,
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE matrixblocks OWNER TO craft3beta;

--
-- Name: matrixblocktypes; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE matrixblocktypes (
    id integer NOT NULL,
    "fieldId" integer NOT NULL,
    "fieldLayoutId" integer,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE matrixblocktypes OWNER TO craft3beta;

--
-- Name: matrixblocktypes_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE matrixblocktypes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE matrixblocktypes_id_seq OWNER TO craft3beta;

--
-- Name: matrixblocktypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE matrixblocktypes_id_seq OWNED BY matrixblocktypes.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE migrations (
    id integer NOT NULL,
    "pluginId" integer,
    type character varying(255) DEFAULT 'app'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    "applyTime" timestamp(0) without time zone NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL,
    CONSTRAINT migrations_type_check CHECK (((type)::text = ANY ((ARRAY['app'::character varying, 'plugin'::character varying, 'content'::character varying])::text[])))
);


ALTER TABLE migrations OWNER TO craft3beta;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE migrations_id_seq OWNER TO craft3beta;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE migrations_id_seq OWNED BY migrations.id;


--
-- Name: plugins; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE plugins (
    id integer NOT NULL,
    handle character varying(255) NOT NULL,
    version character varying(255) NOT NULL,
    "schemaVersion" character varying(255) NOT NULL,
    "licenseKey" character(24),
    "licenseKeyStatus" character varying(255) DEFAULT 'unknown'::character varying NOT NULL,
    settings text,
    "installDate" timestamp(0) without time zone NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL,
    CONSTRAINT "plugins_licenseKeyStatus_check" CHECK ((("licenseKeyStatus")::text = ANY ((ARRAY['valid'::character varying, 'invalid'::character varying, 'mismatched'::character varying, 'unknown'::character varying])::text[])))
);


ALTER TABLE plugins OWNER TO craft3beta;

--
-- Name: plugins_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE plugins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE plugins_id_seq OWNER TO craft3beta;

--
-- Name: plugins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE plugins_id_seq OWNED BY plugins.id;


--
-- Name: relations; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE relations (
    id integer NOT NULL,
    "fieldId" integer NOT NULL,
    "sourceId" integer NOT NULL,
    "sourceSiteId" integer,
    "targetId" integer NOT NULL,
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE relations OWNER TO craft3beta;

--
-- Name: relations_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE relations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE relations_id_seq OWNER TO craft3beta;

--
-- Name: relations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE relations_id_seq OWNED BY relations.id;


--
-- Name: routes; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE routes (
    id integer NOT NULL,
    "siteId" integer,
    "uriParts" character varying(255) NOT NULL,
    "uriPattern" character varying(255) NOT NULL,
    template character varying(500) NOT NULL,
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE routes OWNER TO craft3beta;

--
-- Name: routes_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE routes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE routes_id_seq OWNER TO craft3beta;

--
-- Name: routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE routes_id_seq OWNED BY routes.id;


--
-- Name: searchindex; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE searchindex (
    "elementId" integer NOT NULL,
    attribute character varying(25) NOT NULL,
    "fieldId" integer NOT NULL,
    "siteId" integer NOT NULL,
    keywords text NOT NULL,
    keywords_vector tsvector NOT NULL
);


ALTER TABLE searchindex OWNER TO craft3beta;

--
-- Name: sections; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE sections (
    id integer NOT NULL,
    "structureId" integer,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    type character varying(255) DEFAULT 'channel'::character varying NOT NULL,
    "enableVersioning" boolean DEFAULT false NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL,
    CONSTRAINT sections_type_check CHECK (((type)::text = ANY ((ARRAY['single'::character varying, 'channel'::character varying, 'structure'::character varying])::text[])))
);


ALTER TABLE sections OWNER TO craft3beta;

--
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE sections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sections_id_seq OWNER TO craft3beta;

--
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE sections_id_seq OWNED BY sections.id;


--
-- Name: sections_sites; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE sections_sites (
    id integer NOT NULL,
    "sectionId" integer NOT NULL,
    "siteId" integer NOT NULL,
    "enabledByDefault" boolean DEFAULT true NOT NULL,
    "hasUrls" boolean DEFAULT true NOT NULL,
    "uriFormat" text,
    template character varying(500),
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE sections_sites OWNER TO craft3beta;

--
-- Name: sections_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE sections_sites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sections_sites_id_seq OWNER TO craft3beta;

--
-- Name: sections_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE sections_sites_id_seq OWNED BY sections_sites.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character(100) NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE sessions OWNER TO craft3beta;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sessions_id_seq OWNER TO craft3beta;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE sessions_id_seq OWNED BY sessions.id;


--
-- Name: shunnedmessages; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE shunnedmessages (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    message character varying(255) NOT NULL,
    "expiryDate" timestamp(0) without time zone,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE shunnedmessages OWNER TO craft3beta;

--
-- Name: shunnedmessages_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE shunnedmessages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE shunnedmessages_id_seq OWNER TO craft3beta;

--
-- Name: shunnedmessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE shunnedmessages_id_seq OWNED BY shunnedmessages.id;


--
-- Name: sites; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE sites (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    language character varying(12) NOT NULL,
    "hasUrls" boolean DEFAULT false NOT NULL,
    "baseUrl" character varying(255),
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE sites OWNER TO craft3beta;

--
-- Name: sites_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE sites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sites_id_seq OWNER TO craft3beta;

--
-- Name: sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE sites_id_seq OWNED BY sites.id;


--
-- Name: structureelements; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE structureelements (
    id integer NOT NULL,
    "structureId" integer NOT NULL,
    "elementId" integer,
    root integer,
    lft integer NOT NULL,
    rgt integer NOT NULL,
    level smallint NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE structureelements OWNER TO craft3beta;

--
-- Name: structureelements_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE structureelements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE structureelements_id_seq OWNER TO craft3beta;

--
-- Name: structureelements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE structureelements_id_seq OWNED BY structureelements.id;


--
-- Name: structures; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE structures (
    id integer NOT NULL,
    "maxLevels" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE structures OWNER TO craft3beta;

--
-- Name: structures_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE structures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE structures_id_seq OWNER TO craft3beta;

--
-- Name: structures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE structures_id_seq OWNED BY structures.id;


--
-- Name: systemmessages; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE systemmessages (
    id integer NOT NULL,
    language character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    subject text NOT NULL,
    body text NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE systemmessages OWNER TO craft3beta;

--
-- Name: systemmessages_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE systemmessages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE systemmessages_id_seq OWNER TO craft3beta;

--
-- Name: systemmessages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE systemmessages_id_seq OWNED BY systemmessages.id;


--
-- Name: systemsettings; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE systemsettings (
    id integer NOT NULL,
    category character varying(15) NOT NULL,
    settings text,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE systemsettings OWNER TO craft3beta;

--
-- Name: systemsettings_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE systemsettings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE systemsettings_id_seq OWNER TO craft3beta;

--
-- Name: systemsettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE systemsettings_id_seq OWNED BY systemsettings.id;


--
-- Name: taggroups; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE taggroups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    "fieldLayoutId" integer,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE taggroups OWNER TO craft3beta;

--
-- Name: taggroups_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE taggroups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE taggroups_id_seq OWNER TO craft3beta;

--
-- Name: taggroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE taggroups_id_seq OWNED BY taggroups.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE tags (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE tags OWNER TO craft3beta;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE tasks (
    id integer NOT NULL,
    root integer,
    lft integer NOT NULL,
    rgt integer NOT NULL,
    level smallint NOT NULL,
    "currentStep" integer,
    "totalSteps" integer,
    status character varying(255),
    type character varying(255) NOT NULL,
    description character varying(255),
    settings text NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL,
    CONSTRAINT tasks_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'error'::character varying, 'running'::character varying])::text[])))
);


ALTER TABLE tasks OWNER TO craft3beta;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_seq OWNER TO craft3beta;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE tasks_id_seq OWNED BY tasks.id;


--
-- Name: templatecacheelements; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE templatecacheelements (
    "cacheId" integer NOT NULL,
    "elementId" integer NOT NULL
);


ALTER TABLE templatecacheelements OWNER TO craft3beta;

--
-- Name: templatecachequeries; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE templatecachequeries (
    id integer NOT NULL,
    "cacheId" integer NOT NULL,
    type character varying(255) NOT NULL,
    query text NOT NULL
);


ALTER TABLE templatecachequeries OWNER TO craft3beta;

--
-- Name: templatecachequeries_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE templatecachequeries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE templatecachequeries_id_seq OWNER TO craft3beta;

--
-- Name: templatecachequeries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE templatecachequeries_id_seq OWNED BY templatecachequeries.id;


--
-- Name: templatecaches; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE templatecaches (
    id integer NOT NULL,
    "siteId" integer NOT NULL,
    "cacheKey" character varying(255) NOT NULL,
    path character varying(255),
    "expiryDate" timestamp(0) without time zone NOT NULL,
    body text NOT NULL
);


ALTER TABLE templatecaches OWNER TO craft3beta;

--
-- Name: templatecaches_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE templatecaches_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE templatecaches_id_seq OWNER TO craft3beta;

--
-- Name: templatecaches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE templatecaches_id_seq OWNED BY templatecaches.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE tokens (
    id integer NOT NULL,
    token character(32) NOT NULL,
    route text,
    "usageLimit" smallint,
    "usageCount" smallint,
    "expiryDate" timestamp(0) without time zone NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE tokens OWNER TO craft3beta;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tokens_id_seq OWNER TO craft3beta;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE tokens_id_seq OWNED BY tokens.id;


--
-- Name: usergroups; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE usergroups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE usergroups OWNER TO craft3beta;

--
-- Name: usergroups_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE usergroups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usergroups_id_seq OWNER TO craft3beta;

--
-- Name: usergroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE usergroups_id_seq OWNED BY usergroups.id;


--
-- Name: usergroups_users; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE usergroups_users (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    "userId" integer NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE usergroups_users OWNER TO craft3beta;

--
-- Name: usergroups_users_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE usergroups_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usergroups_users_id_seq OWNER TO craft3beta;

--
-- Name: usergroups_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE usergroups_users_id_seq OWNED BY usergroups_users.id;


--
-- Name: userpermissions; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE userpermissions (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE userpermissions OWNER TO craft3beta;

--
-- Name: userpermissions_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE userpermissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userpermissions_id_seq OWNER TO craft3beta;

--
-- Name: userpermissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE userpermissions_id_seq OWNED BY userpermissions.id;


--
-- Name: userpermissions_usergroups; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE userpermissions_usergroups (
    id integer NOT NULL,
    "permissionId" integer NOT NULL,
    "groupId" integer NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE userpermissions_usergroups OWNER TO craft3beta;

--
-- Name: userpermissions_usergroups_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE userpermissions_usergroups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userpermissions_usergroups_id_seq OWNER TO craft3beta;

--
-- Name: userpermissions_usergroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE userpermissions_usergroups_id_seq OWNED BY userpermissions_usergroups.id;


--
-- Name: userpermissions_users; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE userpermissions_users (
    id integer NOT NULL,
    "permissionId" integer NOT NULL,
    "userId" integer NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE userpermissions_users OWNER TO craft3beta;

--
-- Name: userpermissions_users_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE userpermissions_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userpermissions_users_id_seq OWNER TO craft3beta;

--
-- Name: userpermissions_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE userpermissions_users_id_seq OWNED BY userpermissions_users.id;


--
-- Name: userpreferences; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE userpreferences (
    "userId" integer NOT NULL,
    preferences text
);


ALTER TABLE userpreferences OWNER TO craft3beta;

--
-- Name: userpreferences_userId_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE "userpreferences_userId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "userpreferences_userId_seq" OWNER TO craft3beta;

--
-- Name: userpreferences_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE "userpreferences_userId_seq" OWNED BY userpreferences."userId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    "photoId" integer,
    "firstName" character varying(100),
    "lastName" character varying(100),
    email character varying(255) NOT NULL,
    password character varying(255),
    admin boolean DEFAULT false NOT NULL,
    client boolean DEFAULT false NOT NULL,
    locked boolean DEFAULT false NOT NULL,
    suspended boolean DEFAULT false NOT NULL,
    pending boolean DEFAULT false NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    "lastLoginDate" timestamp(0) without time zone,
    "lastLoginAttemptIp" character varying(45),
    "invalidLoginWindowStart" timestamp(0) without time zone,
    "invalidLoginCount" smallint,
    "lastInvalidLoginDate" timestamp(0) without time zone,
    "lockoutDate" timestamp(0) without time zone,
    "verificationCode" character varying(255),
    "verificationCodeIssuedDate" timestamp(0) without time zone,
    "unverifiedEmail" character varying(255),
    "passwordResetRequired" boolean DEFAULT false NOT NULL,
    "lastPasswordChangeDate" timestamp(0) without time zone,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE users OWNER TO craft3beta;

--
-- Name: volumefolders; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE volumefolders (
    id integer NOT NULL,
    "parentId" integer,
    "volumeId" integer,
    name character varying(255) NOT NULL,
    path character varying(255),
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE volumefolders OWNER TO craft3beta;

--
-- Name: volumefolders_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE volumefolders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE volumefolders_id_seq OWNER TO craft3beta;

--
-- Name: volumefolders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE volumefolders_id_seq OWNED BY volumefolders.id;


--
-- Name: volumes; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE volumes (
    id integer NOT NULL,
    "fieldLayoutId" integer,
    name character varying(255) NOT NULL,
    handle character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    "hasUrls" boolean DEFAULT true NOT NULL,
    url character varying(255),
    settings text,
    "sortOrder" smallint,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE volumes OWNER TO craft3beta;

--
-- Name: volumes_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE volumes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE volumes_id_seq OWNER TO craft3beta;

--
-- Name: volumes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE volumes_id_seq OWNED BY volumes.id;


--
-- Name: widgets; Type: TABLE; Schema: public; Owner: craft3beta
--

CREATE TABLE widgets (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    type character varying(255) NOT NULL,
    "sortOrder" smallint,
    colspan boolean DEFAULT false NOT NULL,
    settings text,
    enabled boolean DEFAULT true NOT NULL,
    "dateCreated" timestamp(0) without time zone NOT NULL,
    "dateUpdated" timestamp(0) without time zone NOT NULL,
    uid character(36) DEFAULT '0'::bpchar NOT NULL
);


ALTER TABLE widgets OWNER TO craft3beta;

--
-- Name: widgets_id_seq; Type: SEQUENCE; Schema: public; Owner: craft3beta
--

CREATE SEQUENCE widgets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE widgets_id_seq OWNER TO craft3beta;

--
-- Name: widgets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: craft3beta
--

ALTER SEQUENCE widgets_id_seq OWNED BY widgets.id;


--
-- Name: assetindexdata id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assetindexdata ALTER COLUMN id SET DEFAULT nextval('assetindexdata_id_seq'::regclass);


--
-- Name: assettransformindex id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assettransformindex ALTER COLUMN id SET DEFAULT nextval('assettransformindex_id_seq'::regclass);


--
-- Name: assettransforms id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assettransforms ALTER COLUMN id SET DEFAULT nextval('assettransforms_id_seq'::regclass);


--
-- Name: categorygroups id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups ALTER COLUMN id SET DEFAULT nextval('categorygroups_id_seq'::regclass);


--
-- Name: categorygroups_sites id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups_sites ALTER COLUMN id SET DEFAULT nextval('categorygroups_sites_id_seq'::regclass);


--
-- Name: content id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY content ALTER COLUMN id SET DEFAULT nextval('content_id_seq'::regclass);


--
-- Name: deprecationerrors id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY deprecationerrors ALTER COLUMN id SET DEFAULT nextval('deprecationerrors_id_seq'::regclass);


--
-- Name: elementindexsettings id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elementindexsettings ALTER COLUMN id SET DEFAULT nextval('elementindexsettings_id_seq'::regclass);


--
-- Name: elements id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elements ALTER COLUMN id SET DEFAULT nextval('elements_id_seq'::regclass);


--
-- Name: elements_sites id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elements_sites ALTER COLUMN id SET DEFAULT nextval('elements_sites_id_seq'::regclass);


--
-- Name: entrydrafts id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrydrafts ALTER COLUMN id SET DEFAULT nextval('entrydrafts_id_seq'::regclass);


--
-- Name: entrytypes id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrytypes ALTER COLUMN id SET DEFAULT nextval('entrytypes_id_seq'::regclass);


--
-- Name: entryversions id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entryversions ALTER COLUMN id SET DEFAULT nextval('entryversions_id_seq'::regclass);


--
-- Name: fieldgroups id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldgroups ALTER COLUMN id SET DEFAULT nextval('fieldgroups_id_seq'::regclass);


--
-- Name: fieldlayoutfields id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayoutfields ALTER COLUMN id SET DEFAULT nextval('fieldlayoutfields_id_seq'::regclass);


--
-- Name: fieldlayouts id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayouts ALTER COLUMN id SET DEFAULT nextval('fieldlayouts_id_seq'::regclass);


--
-- Name: fieldlayouttabs id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayouttabs ALTER COLUMN id SET DEFAULT nextval('fieldlayouttabs_id_seq'::regclass);


--
-- Name: fields id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fields ALTER COLUMN id SET DEFAULT nextval('fields_id_seq'::regclass);


--
-- Name: globalsets id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY globalsets ALTER COLUMN id SET DEFAULT nextval('globalsets_id_seq'::regclass);


--
-- Name: info id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY info ALTER COLUMN id SET DEFAULT nextval('info_id_seq'::regclass);


--
-- Name: matrixblocktypes id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocktypes ALTER COLUMN id SET DEFAULT nextval('matrixblocktypes_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY migrations ALTER COLUMN id SET DEFAULT nextval('migrations_id_seq'::regclass);


--
-- Name: plugins id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY plugins ALTER COLUMN id SET DEFAULT nextval('plugins_id_seq'::regclass);


--
-- Name: relations id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY relations ALTER COLUMN id SET DEFAULT nextval('relations_id_seq'::regclass);


--
-- Name: routes id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY routes ALTER COLUMN id SET DEFAULT nextval('routes_id_seq'::regclass);


--
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sections ALTER COLUMN id SET DEFAULT nextval('sections_id_seq'::regclass);


--
-- Name: sections_sites id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sections_sites ALTER COLUMN id SET DEFAULT nextval('sections_sites_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sessions ALTER COLUMN id SET DEFAULT nextval('sessions_id_seq'::regclass);


--
-- Name: shunnedmessages id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY shunnedmessages ALTER COLUMN id SET DEFAULT nextval('shunnedmessages_id_seq'::regclass);


--
-- Name: sites id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sites ALTER COLUMN id SET DEFAULT nextval('sites_id_seq'::regclass);


--
-- Name: structureelements id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY structureelements ALTER COLUMN id SET DEFAULT nextval('structureelements_id_seq'::regclass);


--
-- Name: structures id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY structures ALTER COLUMN id SET DEFAULT nextval('structures_id_seq'::regclass);


--
-- Name: systemmessages id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY systemmessages ALTER COLUMN id SET DEFAULT nextval('systemmessages_id_seq'::regclass);


--
-- Name: systemsettings id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY systemsettings ALTER COLUMN id SET DEFAULT nextval('systemsettings_id_seq'::regclass);


--
-- Name: taggroups id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY taggroups ALTER COLUMN id SET DEFAULT nextval('taggroups_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY tasks ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);


--
-- Name: templatecachequeries id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecachequeries ALTER COLUMN id SET DEFAULT nextval('templatecachequeries_id_seq'::regclass);


--
-- Name: templatecaches id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecaches ALTER COLUMN id SET DEFAULT nextval('templatecaches_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY tokens ALTER COLUMN id SET DEFAULT nextval('tokens_id_seq'::regclass);


--
-- Name: usergroups id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY usergroups ALTER COLUMN id SET DEFAULT nextval('usergroups_id_seq'::regclass);


--
-- Name: usergroups_users id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY usergroups_users ALTER COLUMN id SET DEFAULT nextval('usergroups_users_id_seq'::regclass);


--
-- Name: userpermissions id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions ALTER COLUMN id SET DEFAULT nextval('userpermissions_id_seq'::regclass);


--
-- Name: userpermissions_usergroups id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_usergroups ALTER COLUMN id SET DEFAULT nextval('userpermissions_usergroups_id_seq'::regclass);


--
-- Name: userpermissions_users id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_users ALTER COLUMN id SET DEFAULT nextval('userpermissions_users_id_seq'::regclass);


--
-- Name: userpreferences userId; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpreferences ALTER COLUMN "userId" SET DEFAULT nextval('"userpreferences_userId_seq"'::regclass);


--
-- Name: volumefolders id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY volumefolders ALTER COLUMN id SET DEFAULT nextval('volumefolders_id_seq'::regclass);


--
-- Name: volumes id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY volumes ALTER COLUMN id SET DEFAULT nextval('volumes_id_seq'::regclass);


--
-- Name: widgets id; Type: DEFAULT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY widgets ALTER COLUMN id SET DEFAULT nextval('widgets_id_seq'::regclass);


--
-- Data for Name: assetindexdata; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: assetindexdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('assetindexdata_id_seq', 1, false);


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Data for Name: assettransformindex; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: assettransformindex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('assettransformindex_id_seq', 1, false);


--
-- Data for Name: assettransforms; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: assettransforms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('assettransforms_id_seq', 1, false);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO categories VALUES (2, 1, '2017-07-16 07:10:12', '2017-07-16 07:10:12', 'eb7261be-ac97-4f7e-bfdc-d1247feef811');


--
-- Data for Name: categorygroups; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO categorygroups VALUES (1, 1, 1, 'test', 'test', '2017-07-16 07:08:43', '2017-07-16 07:08:43', '633445bc-6c5d-44de-987d-bb1e5ba0fc41');


--
-- Name: categorygroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('categorygroups_id_seq', 1, true);


--
-- Data for Name: categorygroups_sites; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO categorygroups_sites VALUES (1, 1, 1, false, NULL, NULL, '2017-07-16 07:08:43', '2017-07-16 07:08:43', '5d28094f-4a79-4dc4-bd49-ae05e2a17547');


--
-- Name: categorygroups_sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('categorygroups_sites_id_seq', 1, true);


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO content VALUES (1, 1, 1, NULL, '2017-07-16 07:06:52', '2017-07-16 07:06:52', '3a75acee-d737-45d8-9d68-7081c917713e');
INSERT INTO content VALUES (2, 2, 1, 'demio', '2017-07-16 07:10:12', '2017-07-16 07:10:12', '60b200be-007f-4086-8efa-c4de948265c4');


--
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('content_id_seq', 2, true);


--
-- Data for Name: deprecationerrors; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: deprecationerrors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('deprecationerrors_id_seq', 1, false);


--
-- Data for Name: elementindexsettings; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: elementindexsettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('elementindexsettings_id_seq', 1, false);


--
-- Data for Name: elements; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO elements VALUES (1, NULL, 'craft\elements\User', true, false, '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'd80d6fb5-6b7a-45b2-9433-868d34d99030');
INSERT INTO elements VALUES (2, 1, 'craft\elements\Category', true, false, '2017-07-16 07:10:12', '2017-07-16 07:10:12', '1a726bf5-4e18-4fec-a211-df95c8a55d40');


--
-- Name: elements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('elements_id_seq', 2, true);


--
-- Data for Name: elements_sites; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO elements_sites VALUES (1, 1, 1, NULL, NULL, true, '2017-07-16 07:06:52', '2017-07-16 07:06:52', '3a3169c0-7e54-42a0-961e-88efbcdb0a86');
INSERT INTO elements_sites VALUES (2, 2, 1, 'demio', NULL, true, '2017-07-16 07:10:12', '2017-07-16 07:10:12', '72562dc8-d0a4-4ebd-9afd-ce85f6aafc12');


--
-- Name: elements_sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('elements_sites_id_seq', 2, true);


--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Data for Name: entrydrafts; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: entrydrafts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('entrydrafts_id_seq', 1, false);


--
-- Data for Name: entrytypes; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: entrytypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('entrytypes_id_seq', 1, false);


--
-- Data for Name: entryversions; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: entryversions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('entryversions_id_seq', 1, false);


--
-- Data for Name: fieldgroups; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO fieldgroups VALUES (1, 'post', '2017-07-16 07:10:39', '2017-07-16 07:10:39', '2eaf8914-e883-406c-91e2-e6024b0823f1');


--
-- Name: fieldgroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('fieldgroups_id_seq', 1, true);


--
-- Data for Name: fieldlayoutfields; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: fieldlayoutfields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('fieldlayoutfields_id_seq', 1, false);


--
-- Data for Name: fieldlayouts; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO fieldlayouts VALUES (1, 'craft\elements\Category', '2017-07-16 07:08:43', '2017-07-16 07:08:43', 'd5b508fd-b4cf-4af1-b21c-1d653b4b2c3f');


--
-- Name: fieldlayouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('fieldlayouts_id_seq', 1, true);


--
-- Data for Name: fieldlayouttabs; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: fieldlayouttabs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('fieldlayouttabs_id_seq', 1, false);


--
-- Data for Name: fields; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('fields_id_seq', 1, false);


--
-- Data for Name: globalsets; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: globalsets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('globalsets_id_seq', 1, false);


--
-- Data for Name: info; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO info VALUES (1, '3.0.0-beta.22', '3.0.51', 0, 'America/Los_Angeles', 'Boldr', true, false, '3sPQH9au3M7k', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '1af5ea78-5940-44dc-93e4-756ed536ff3d');


--
-- Name: info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('info_id_seq', 1, true);


--
-- Data for Name: matrixblocks; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Data for Name: matrixblocktypes; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: matrixblocktypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('matrixblocktypes_id_seq', 1, false);


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO migrations VALUES (1, NULL, 'app', 'Install', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'd8504d35-4822-4fb2-b40c-b8514ee03377');
INSERT INTO migrations VALUES (2, NULL, 'app', 'm150403_183908_migrations_table_changes', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'c18f9f06-0301-40a7-bc0f-6012d8bf0d01');
INSERT INTO migrations VALUES (3, NULL, 'app', 'm150403_184247_plugins_table_changes', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'd7ce0c2d-8115-4fa4-9c6d-cbf910a463d6');
INSERT INTO migrations VALUES (4, NULL, 'app', 'm150403_184533_field_version', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '96b3c043-4012-49ca-b1e1-d87f4dff8068');
INSERT INTO migrations VALUES (5, NULL, 'app', 'm150403_184729_type_columns', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2fad9963-1008-4adf-bc5d-5b2549568c6d');
INSERT INTO migrations VALUES (6, NULL, 'app', 'm150403_185142_volumes', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'bd7df809-3082-4145-8bed-62bd7cedbd82');
INSERT INTO migrations VALUES (7, NULL, 'app', 'm150428_231346_userpreferences', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '92a36b8f-1ef4-4f29-b98a-1a7e35edc598');
INSERT INTO migrations VALUES (8, NULL, 'app', 'm150519_150900_fieldversion_conversion', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'fde50706-bbaf-4567-8a01-0862c641dd6d');
INSERT INTO migrations VALUES (9, NULL, 'app', 'm150617_213829_update_email_settings', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '12a02a95-fe81-4f3f-a093-1f894f6f7855');
INSERT INTO migrations VALUES (10, NULL, 'app', 'm150721_124739_templatecachequeries', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '3ffbe64e-0f12-488f-a0f6-2198217aa0bc');
INSERT INTO migrations VALUES (11, NULL, 'app', 'm150724_140822_adjust_quality_settings', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '02150afb-d5b9-4aee-8691-695bfeda7d93');
INSERT INTO migrations VALUES (12, NULL, 'app', 'm150815_133521_last_login_attempt_ip', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'cd483700-da56-4f23-9bfb-5e189a124856');
INSERT INTO migrations VALUES (13, NULL, 'app', 'm151002_095935_volume_cache_settings', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '17f82d5a-9600-41f4-8ef1-0dd7ee34ea05');
INSERT INTO migrations VALUES (14, NULL, 'app', 'm151005_142750_volume_s3_storage_settings', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '7f5b738c-ae73-4c1f-9b28-78caf74ac9e4');
INSERT INTO migrations VALUES (15, NULL, 'app', 'm151016_133600_delete_asset_thumbnails', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '7de85c04-56b8-4404-9c90-7d81e7731e53');
INSERT INTO migrations VALUES (16, NULL, 'app', 'm151209_000000_move_logo', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '0a46b1ae-667a-4424-8bb8-ff0239c55a10');
INSERT INTO migrations VALUES (17, NULL, 'app', 'm151211_000000_rename_fileId_to_assetId', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '3ebc6c8c-34bf-470f-910e-d57a363ec86e');
INSERT INTO migrations VALUES (18, NULL, 'app', 'm151215_000000_rename_asset_permissions', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '7303e6d9-de90-4882-a3c4-e853b5736832');
INSERT INTO migrations VALUES (19, NULL, 'app', 'm160707_000001_rename_richtext_assetsource_setting', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'e06bba23-40ff-4034-9fbe-0c88b202842b');
INSERT INTO migrations VALUES (20, NULL, 'app', 'm160708_185142_volume_hasUrls_setting', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '5160c8ca-7e37-43d4-ae35-d555c4ac1f42');
INSERT INTO migrations VALUES (21, NULL, 'app', 'm160714_000000_increase_max_asset_filesize', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'bd3f4e35-83f5-4a63-a665-b4dd63cdb856');
INSERT INTO migrations VALUES (22, NULL, 'app', 'm160727_194637_column_cleanup', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '90fde59e-095d-4d1b-a2e1-d7e9dcd83d99');
INSERT INTO migrations VALUES (23, NULL, 'app', 'm160804_110002_userphotos_to_assets', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2bd8294b-6db7-4a36-8f8f-a8af5939f579');
INSERT INTO migrations VALUES (24, NULL, 'app', 'm160807_144858_sites', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '79147190-dd52-4a83-b23b-36cf04c73f85');
INSERT INTO migrations VALUES (25, NULL, 'app', 'm160817_161600_move_assets_cache', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'd02841aa-33b1-4325-a49b-eee73d9abee8');
INSERT INTO migrations VALUES (26, NULL, 'app', 'm160829_000000_pending_user_content_cleanup', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '621926b8-d6e8-4abf-8b0e-55ef7d2968b4');
INSERT INTO migrations VALUES (27, NULL, 'app', 'm160830_000000_asset_index_uri_increase', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'd5b5ffb4-9ddf-43be-adba-2937e0bc6b16');
INSERT INTO migrations VALUES (28, NULL, 'app', 'm160912_230520_require_entry_type_id', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'b1ce441b-f48a-4635-8299-6950e78f2080');
INSERT INTO migrations VALUES (29, NULL, 'app', 'm160913_134730_require_matrix_block_type_id', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '25dbf1c7-cc94-469e-b5fb-b1285db0a190');
INSERT INTO migrations VALUES (30, NULL, 'app', 'm160920_174553_matrixblocks_owner_site_id_nullable', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'b305ace5-c8bd-494c-999b-c42a6327488d');
INSERT INTO migrations VALUES (31, NULL, 'app', 'm160920_231045_usergroup_handle_title_unique', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'cf9b2af5-762e-4d0f-8d6c-7e485fa1e2ad');
INSERT INTO migrations VALUES (32, NULL, 'app', 'm160925_113941_route_uri_parts', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'aa01463f-3c62-4627-bf13-ad5d82300bb7');
INSERT INTO migrations VALUES (33, NULL, 'app', 'm161006_205918_schemaVersion_not_null', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'd8d16720-2cd8-45e9-909d-0092006f4367');
INSERT INTO migrations VALUES (34, NULL, 'app', 'm161007_130653_update_email_settings', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '09afdb08-099c-4cc9-8b21-fbcb0e5f7557');
INSERT INTO migrations VALUES (35, NULL, 'app', 'm161013_175052_newParentId', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '84214107-c788-4d43-9068-e3fb32ef0d79');
INSERT INTO migrations VALUES (36, NULL, 'app', 'm161021_102916_fix_recent_entries_widgets', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '32369744-220d-4c2d-a4d4-a61713883ae5');
INSERT INTO migrations VALUES (37, NULL, 'app', 'm161021_182140_rename_get_help_widget', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '49c15e32-b530-447f-945b-7d7728319042');
INSERT INTO migrations VALUES (38, NULL, 'app', 'm161025_000000_fix_char_columns', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'c1e008f8-a7e3-4d89-830d-dff1a3174fd6');
INSERT INTO migrations VALUES (39, NULL, 'app', 'm161029_124145_email_message_languages', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'f3f4634c-e115-4431-94d1-99fa336b5bf6');
INSERT INTO migrations VALUES (40, NULL, 'app', 'm161108_000000_new_version_format', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '98683ea6-d92f-4160-a538-c0a19b9fe5f3');
INSERT INTO migrations VALUES (41, NULL, 'app', 'm161109_000000_index_shuffle', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '301b0b17-60e7-4b66-926d-9387631518d7');
INSERT INTO migrations VALUES (42, NULL, 'app', 'm161122_185500_no_craft_app', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'f5fb54cf-851d-4c5e-a9f0-840817ec83c2');
INSERT INTO migrations VALUES (43, NULL, 'app', 'm161125_150752_clear_urlmanager_cache', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '405cc0fb-3d87-409b-acae-7171c2cf0f4b');
INSERT INTO migrations VALUES (44, NULL, 'app', 'm161220_000000_volumes_hasurl_notnull', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '291aabb2-9294-47f7-b022-da342656a6ee');
INSERT INTO migrations VALUES (45, NULL, 'app', 'm170114_161144_udates_permission', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'a42d1344-21c3-4154-8ca4-d7ca8f226e96');
INSERT INTO migrations VALUES (46, NULL, 'app', 'm170120_000000_schema_cleanup', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '02e12b54-a67e-40e4-a7d2-1f48e4a48904');
INSERT INTO migrations VALUES (47, NULL, 'app', 'm170126_000000_assets_focal_point', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '5751fcc4-ce82-4ebc-bd18-a28943a72851');
INSERT INTO migrations VALUES (48, NULL, 'app', 'm170206_142126_system_name', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'd5f66876-138e-4d56-a57e-4f5ba93650d3');
INSERT INTO migrations VALUES (49, NULL, 'app', 'm170217_044740_category_branch_limits', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '72a26a55-34b2-42ee-bdeb-70e6c2c825b3');
INSERT INTO migrations VALUES (50, NULL, 'app', 'm170217_120224_asset_indexing_columns', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'c0b560fc-5fe9-4752-8ff4-463072afbf2f');
INSERT INTO migrations VALUES (51, NULL, 'app', 'm170223_224012_plain_text_settings', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '68631f32-6752-490e-ae74-e1371fbc7b18');
INSERT INTO migrations VALUES (52, NULL, 'app', 'm170227_120814_focal_point_percentage', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '8228ab4e-e966-4614-a622-536f71c4fd4d');
INSERT INTO migrations VALUES (53, NULL, 'app', 'm170228_171113_system_messages', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '400ed2c2-be63-4275-aa8a-42a03b1ad43d');
INSERT INTO migrations VALUES (54, NULL, 'app', 'm170303_140500_asset_field_source_settings', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '05afe7bd-c8d4-42bb-87be-85d23aae1b62');
INSERT INTO migrations VALUES (55, NULL, 'app', 'm170306_150500_asset_temporary_uploads', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '22282eb9-595c-4583-b4bc-f9fee0a6f4e1');
INSERT INTO migrations VALUES (56, NULL, 'app', 'm170414_162429_rich_text_config_setting', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '88bc7d72-c019-4650-84bd-c5f520aca151');
INSERT INTO migrations VALUES (57, NULL, 'app', 'm170523_190652_element_field_layout_ids', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', 'b43df2cd-b636-42c2-98e4-aa0bd7bb1acb');
INSERT INTO migrations VALUES (58, NULL, 'app', 'm170612_000000_route_index_shuffle', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '013fb5bd-9c04-47cc-9dec-a5a8cd901506');
INSERT INTO migrations VALUES (59, NULL, 'app', 'm170620_203910_no_disabled_plugins', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '6393bf57-98bd-432c-bbbc-8f7e59693719');
INSERT INTO migrations VALUES (60, NULL, 'app', 'm170621_195237_format_plugin_handles', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '6e11fb46-dfbe-4e55-80b2-c575fea05677');
INSERT INTO migrations VALUES (61, NULL, 'app', 'm170630_161028_deprecation_changes', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '3c39d7f0-0894-431b-b67a-71d06860185c');
INSERT INTO migrations VALUES (62, NULL, 'app', 'm170703_181539_plugins_table_tweaks', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '7f7e7d28-fed5-4118-8d5e-2e29de79dbde');
INSERT INTO migrations VALUES (63, NULL, 'app', 'm170704_134916_sites_tables', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '6b6cefca-a55e-484f-8763-632cdd9be2d9');
INSERT INTO migrations VALUES (64, NULL, 'app', 'm170706_183216_rename_sequences', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '2017-07-16 07:06:53', 'aba4da70-af4e-44f9-947b-16a8b3572900');
INSERT INTO migrations VALUES (65, NULL, 'app', 'm170707_094758_delete_compiled_traits', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '276ba3f3-2ae2-4a87-ab39-cc53ebb68e68');
INSERT INTO migrations VALUES (66, NULL, 'app', 'm170707_131841_fix_db_routes', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '2017-07-16 07:06:53', '73a571da-4e7b-4f05-8351-a270d121c958');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('migrations_id_seq', 66, true);


--
-- Data for Name: plugins; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: plugins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('plugins_id_seq', 1, false);


--
-- Data for Name: relations; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: relations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('relations_id_seq', 1, false);


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO routes VALUES (1, NULL, '{"1":["month","(?:0?[1-9]|1[012])"],"3":["number","\\d+"],"5":["page","\\d+"],"6":"/","7":["year","\\d{4}"]}', '<month:(?:0?[1-9]|1[012])><number:\d+><page:\d+>\/<year:\d{4}>', '/', 1, '2017-07-16 07:12:58', '2017-07-16 07:12:58', '2efc5e6f-ffe2-4b4b-98db-ddfe880aa2eb');


--
-- Name: routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('routes_id_seq', 1, true);


--
-- Data for Name: searchindex; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO searchindex VALUES (1, 'username', 0, 1, ' admin ', '''admin''');
INSERT INTO searchindex VALUES (1, 'firstname', 0, 1, '', '');
INSERT INTO searchindex VALUES (1, 'lastname', 0, 1, '', '');
INSERT INTO searchindex VALUES (1, 'fullname', 0, 1, '', '');
INSERT INTO searchindex VALUES (1, 'email', 0, 1, ' admin boldr io ', '''admin'' ''boldr'' ''io''');
INSERT INTO searchindex VALUES (1, 'slug', 0, 1, '', '');
INSERT INTO searchindex VALUES (2, 'slug', 0, 1, ' demio ', '''demio''');
INSERT INTO searchindex VALUES (2, 'title', 0, 1, ' demio ', '''demio''');


--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('sections_id_seq', 1, false);


--
-- Data for Name: sections_sites; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: sections_sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('sections_sites_id_seq', 1, false);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('sessions_id_seq', 1, false);


--
-- Data for Name: shunnedmessages; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: shunnedmessages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('shunnedmessages_id_seq', 1, false);


--
-- Data for Name: sites; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO sites VALUES (1, 'Boldr', 'default', 'en-US', true, 'http://localhost:8000/', 1, '2017-07-16 07:06:52', '2017-07-16 07:06:52', '964c2b48-b159-445f-9da4-42322b1455a2');


--
-- Name: sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('sites_id_seq', 1, true);


--
-- Data for Name: structureelements; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO structureelements VALUES (1, 1, NULL, 1, 1, 4, 0, '2017-07-16 07:10:12', '2017-07-16 07:10:12', 'bdfb2f4f-729d-4b29-ad41-f275e22bfdeb');
INSERT INTO structureelements VALUES (2, 1, 2, 1, 2, 3, 1, '2017-07-16 07:10:12', '2017-07-16 07:10:12', 'deb041c7-52f2-4c3f-8eb4-967967dc469a');


--
-- Name: structureelements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('structureelements_id_seq', 2, true);


--
-- Data for Name: structures; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO structures VALUES (1, NULL, '2017-07-16 07:08:43', '2017-07-16 07:08:43', '349440b5-0366-457b-a4d5-93bbaec32d30');


--
-- Name: structures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('structures_id_seq', 1, true);


--
-- Data for Name: systemmessages; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: systemmessages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('systemmessages_id_seq', 1, false);


--
-- Data for Name: systemsettings; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO systemsettings VALUES (1, 'email', '{"fromEmail":"admin@boldr.io","fromName":"Boldr","transportType":"craft\\mail\\transportadapters\\Php"}', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '30900770-dcfb-4c21-8b7f-7145f6ca4ec6');
INSERT INTO systemsettings VALUES (2, 'mailer', '{"class":"craft\\mail\\Mailer","from":{"admin@boldr.io":"Boldr"},"transport":{"class":"Swift_MailTransport"}}', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2fbb48ae-4605-45ab-b4da-ff359301fb67');


--
-- Name: systemsettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('systemsettings_id_seq', 2, true);


--
-- Data for Name: taggroups; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: taggroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('taggroups_id_seq', 1, false);


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('tasks_id_seq', 3, true);


--
-- Data for Name: templatecacheelements; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Data for Name: templatecachequeries; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: templatecachequeries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('templatecachequeries_id_seq', 1, false);


--
-- Data for Name: templatecaches; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: templatecaches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('templatecaches_id_seq', 1, false);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('tokens_id_seq', 1, false);


--
-- Data for Name: usergroups; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: usergroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('usergroups_id_seq', 1, false);


--
-- Data for Name: usergroups_users; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: usergroups_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('usergroups_users_id_seq', 1, false);


--
-- Data for Name: userpermissions; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: userpermissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('userpermissions_id_seq', 1, false);


--
-- Data for Name: userpermissions_usergroups; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: userpermissions_usergroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('userpermissions_usergroups_id_seq', 1, false);


--
-- Data for Name: userpermissions_users; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: userpermissions_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('userpermissions_users_id_seq', 1, false);


--
-- Data for Name: userpreferences; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: userpreferences_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('"userpreferences_userId_seq"', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO users VALUES (1, 'admin', NULL, NULL, NULL, 'admin@boldr.io', '$2y$13$oMRka8pxESnw2Qh9kjeByuw9wABy/j4y14LevLCFvetcBvttH3aJO', true, false, false, false, false, false, '2017-07-16 07:06:52', '172.20.0.1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, false, '2017-07-16 07:06:52', '2017-07-16 07:06:52', '2017-07-16 07:06:52', '23998717-9110-444a-9cd4-ed749438834f');


--
-- Data for Name: volumefolders; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: volumefolders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('volumefolders_id_seq', 1, false);


--
-- Data for Name: volumes; Type: TABLE DATA; Schema: public; Owner: craft3beta
--



--
-- Name: volumes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('volumes_id_seq', 1, false);


--
-- Data for Name: widgets; Type: TABLE DATA; Schema: public; Owner: craft3beta
--

INSERT INTO widgets VALUES (1, 1, 'craft\widgets\RecentEntries', 1, false, '{"section":"*","siteId":1,"limit":10}', true, '2017-07-16 07:06:58', '2017-07-16 07:06:58', 'db95275d-3176-4ad0-9be0-46e654225032');
INSERT INTO widgets VALUES (2, 1, 'craft\widgets\CraftSupport', 2, false, '[]', true, '2017-07-16 07:06:58', '2017-07-16 07:06:58', '261c732d-f019-4ce9-8fef-8156325d7934');
INSERT INTO widgets VALUES (3, 1, 'craft\widgets\Updates', 3, false, '[]', true, '2017-07-16 07:06:58', '2017-07-16 07:06:58', 'ed9d9885-f150-4982-baa5-3a9fced83d21');
INSERT INTO widgets VALUES (4, 1, 'craft\widgets\Feed', 4, false, '{"url":"https://craftcms.com/news.rss","title":"Craft News","limit":5}', true, '2017-07-16 07:06:58', '2017-07-16 07:06:58', '09de3e21-c9e4-4f6e-aa5f-279869fdf6e8');


--
-- Name: widgets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: craft3beta
--

SELECT pg_catalog.setval('widgets_id_seq', 4, true);


--
-- Name: assetindexdata assetindexdata_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assetindexdata
    ADD CONSTRAINT assetindexdata_pkey PRIMARY KEY (id);


--
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);


--
-- Name: assettransformindex assettransformindex_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assettransformindex
    ADD CONSTRAINT assettransformindex_pkey PRIMARY KEY (id);


--
-- Name: assettransforms assettransforms_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assettransforms
    ADD CONSTRAINT assettransforms_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categorygroups categorygroups_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups
    ADD CONSTRAINT categorygroups_pkey PRIMARY KEY (id);


--
-- Name: categorygroups_sites categorygroups_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups_sites
    ADD CONSTRAINT categorygroups_sites_pkey PRIMARY KEY (id);


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: deprecationerrors deprecationerrors_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY deprecationerrors
    ADD CONSTRAINT deprecationerrors_pkey PRIMARY KEY (id);


--
-- Name: elementindexsettings elementindexsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elementindexsettings
    ADD CONSTRAINT elementindexsettings_pkey PRIMARY KEY (id);


--
-- Name: elements elements_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elements
    ADD CONSTRAINT elements_pkey PRIMARY KEY (id);


--
-- Name: elements_sites elements_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elements_sites
    ADD CONSTRAINT elements_sites_pkey PRIMARY KEY (id);


--
-- Name: entries entries_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entries
    ADD CONSTRAINT entries_pkey PRIMARY KEY (id);


--
-- Name: entrydrafts entrydrafts_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrydrafts
    ADD CONSTRAINT entrydrafts_pkey PRIMARY KEY (id);


--
-- Name: entrytypes entrytypes_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrytypes
    ADD CONSTRAINT entrytypes_pkey PRIMARY KEY (id);


--
-- Name: entryversions entryversions_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entryversions
    ADD CONSTRAINT entryversions_pkey PRIMARY KEY (id);


--
-- Name: fieldgroups fieldgroups_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldgroups
    ADD CONSTRAINT fieldgroups_pkey PRIMARY KEY (id);


--
-- Name: fieldlayoutfields fieldlayoutfields_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayoutfields
    ADD CONSTRAINT fieldlayoutfields_pkey PRIMARY KEY (id);


--
-- Name: fieldlayouts fieldlayouts_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayouts
    ADD CONSTRAINT fieldlayouts_pkey PRIMARY KEY (id);


--
-- Name: fieldlayouttabs fieldlayouttabs_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayouttabs
    ADD CONSTRAINT fieldlayouttabs_pkey PRIMARY KEY (id);


--
-- Name: fields fields_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fields
    ADD CONSTRAINT fields_pkey PRIMARY KEY (id);


--
-- Name: globalsets globalsets_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY globalsets
    ADD CONSTRAINT globalsets_pkey PRIMARY KEY (id);


--
-- Name: info info_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY info
    ADD CONSTRAINT info_pkey PRIMARY KEY (id);


--
-- Name: matrixblocks matrixblocks_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocks
    ADD CONSTRAINT matrixblocks_pkey PRIMARY KEY (id);


--
-- Name: matrixblocktypes matrixblocktypes_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocktypes
    ADD CONSTRAINT matrixblocktypes_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: plugins plugins_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY plugins
    ADD CONSTRAINT plugins_pkey PRIMARY KEY (id);


--
-- Name: relations relations_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY relations
    ADD CONSTRAINT relations_pkey PRIMARY KEY (id);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- Name: searchindex searchindex_elementId_attribute_fieldId_siteId_unq_idx; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY searchindex
    ADD CONSTRAINT "searchindex_elementId_attribute_fieldId_siteId_unq_idx" PRIMARY KEY ("elementId", attribute, "fieldId", "siteId");


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- Name: sections_sites sections_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sections_sites
    ADD CONSTRAINT sections_sites_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shunnedmessages shunnedmessages_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY shunnedmessages
    ADD CONSTRAINT shunnedmessages_pkey PRIMARY KEY (id);


--
-- Name: sites sites_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sites
    ADD CONSTRAINT sites_pkey PRIMARY KEY (id);


--
-- Name: structureelements structureelements_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY structureelements
    ADD CONSTRAINT structureelements_pkey PRIMARY KEY (id);


--
-- Name: structures structures_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY structures
    ADD CONSTRAINT structures_pkey PRIMARY KEY (id);


--
-- Name: systemmessages systemmessages_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY systemmessages
    ADD CONSTRAINT systemmessages_pkey PRIMARY KEY (id);


--
-- Name: systemsettings systemsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY systemsettings
    ADD CONSTRAINT systemsettings_pkey PRIMARY KEY (id);


--
-- Name: taggroups taggroups_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY taggroups
    ADD CONSTRAINT taggroups_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: templatecachequeries templatecachequeries_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecachequeries
    ADD CONSTRAINT templatecachequeries_pkey PRIMARY KEY (id);


--
-- Name: templatecaches templatecaches_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecaches
    ADD CONSTRAINT templatecaches_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: usergroups usergroups_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY usergroups
    ADD CONSTRAINT usergroups_pkey PRIMARY KEY (id);


--
-- Name: usergroups_users usergroups_users_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY usergroups_users
    ADD CONSTRAINT usergroups_users_pkey PRIMARY KEY (id);


--
-- Name: userpermissions userpermissions_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions
    ADD CONSTRAINT userpermissions_pkey PRIMARY KEY (id);


--
-- Name: userpermissions_usergroups userpermissions_usergroups_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_usergroups
    ADD CONSTRAINT userpermissions_usergroups_pkey PRIMARY KEY (id);


--
-- Name: userpermissions_users userpermissions_users_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_users
    ADD CONSTRAINT userpermissions_users_pkey PRIMARY KEY (id);


--
-- Name: userpreferences userpreferences_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpreferences
    ADD CONSTRAINT userpreferences_pkey PRIMARY KEY ("userId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: volumefolders volumefolders_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY volumefolders
    ADD CONSTRAINT volumefolders_pkey PRIMARY KEY (id);


--
-- Name: volumes volumes_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY volumes
    ADD CONSTRAINT volumes_pkey PRIMARY KEY (id);


--
-- Name: widgets widgets_pkey; Type: CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY widgets
    ADD CONSTRAINT widgets_pkey PRIMARY KEY (id);


--
-- Name: assetindexdata_sessionId_volumeId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "assetindexdata_sessionId_volumeId_idx" ON assetindexdata USING btree ("sessionId", "volumeId");


--
-- Name: assetindexdata_volumeId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "assetindexdata_volumeId_idx" ON assetindexdata USING btree ("volumeId");


--
-- Name: assets_filename_folderId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "assets_filename_folderId_unq_idx" ON assets USING btree (filename, "folderId");


--
-- Name: assets_folderId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "assets_folderId_idx" ON assets USING btree ("folderId");


--
-- Name: assets_volumeId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "assets_volumeId_idx" ON assets USING btree ("volumeId");


--
-- Name: assettransformindex_volumeId_assetId_location_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "assettransformindex_volumeId_assetId_location_idx" ON assettransformindex USING btree ("volumeId", "assetId", location);


--
-- Name: assettransforms_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX assettransforms_handle_unq_idx ON assettransforms USING btree (handle);


--
-- Name: assettransforms_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX assettransforms_name_unq_idx ON assettransforms USING btree (name);


--
-- Name: categories_groupId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "categories_groupId_idx" ON categories USING btree ("groupId");


--
-- Name: categorygroups_fieldLayoutId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "categorygroups_fieldLayoutId_idx" ON categorygroups USING btree ("fieldLayoutId");


--
-- Name: categorygroups_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX categorygroups_handle_unq_idx ON categorygroups USING btree (handle);


--
-- Name: categorygroups_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX categorygroups_name_unq_idx ON categorygroups USING btree (name);


--
-- Name: categorygroups_sites_groupId_siteId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "categorygroups_sites_groupId_siteId_unq_idx" ON categorygroups_sites USING btree ("groupId", "siteId");


--
-- Name: categorygroups_sites_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "categorygroups_sites_siteId_idx" ON categorygroups_sites USING btree ("siteId");


--
-- Name: categorygroups_structureId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "categorygroups_structureId_idx" ON categorygroups USING btree ("structureId");


--
-- Name: content_elementId_siteId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "content_elementId_siteId_unq_idx" ON content USING btree ("elementId", "siteId");


--
-- Name: content_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "content_siteId_idx" ON content USING btree ("siteId");


--
-- Name: content_title_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX content_title_idx ON content USING btree (title);


--
-- Name: deprecationerrors_key_fingerprint_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX deprecationerrors_key_fingerprint_unq_idx ON deprecationerrors USING btree (key, fingerprint);


--
-- Name: elementindexsettings_type_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX elementindexsettings_type_unq_idx ON elementindexsettings USING btree (type);


--
-- Name: elements_archived_dateCreated_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "elements_archived_dateCreated_idx" ON elements USING btree (archived, "dateCreated");


--
-- Name: elements_enabled_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX elements_enabled_idx ON elements USING btree (enabled);


--
-- Name: elements_fieldLayoutId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "elements_fieldLayoutId_idx" ON elements USING btree ("fieldLayoutId");


--
-- Name: elements_sites_elementId_siteId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "elements_sites_elementId_siteId_unq_idx" ON elements_sites USING btree ("elementId", "siteId");


--
-- Name: elements_sites_enabled_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX elements_sites_enabled_idx ON elements_sites USING btree (enabled);


--
-- Name: elements_sites_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "elements_sites_siteId_idx" ON elements_sites USING btree ("siteId");


--
-- Name: elements_sites_slug_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "elements_sites_slug_siteId_idx" ON elements_sites USING btree (slug, "siteId");


--
-- Name: elements_sites_uri_siteId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "elements_sites_uri_siteId_unq_idx" ON elements_sites USING btree (uri, "siteId");


--
-- Name: elements_type_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX elements_type_idx ON elements USING btree (type);


--
-- Name: entries_authorId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entries_authorId_idx" ON entries USING btree ("authorId");


--
-- Name: entries_expiryDate_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entries_expiryDate_idx" ON entries USING btree ("expiryDate");


--
-- Name: entries_postDate_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entries_postDate_idx" ON entries USING btree ("postDate");


--
-- Name: entries_sectionId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entries_sectionId_idx" ON entries USING btree ("sectionId");


--
-- Name: entries_typeId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entries_typeId_idx" ON entries USING btree ("typeId");


--
-- Name: entrydrafts_creatorId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entrydrafts_creatorId_idx" ON entrydrafts USING btree ("creatorId");


--
-- Name: entrydrafts_entryId_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entrydrafts_entryId_siteId_idx" ON entrydrafts USING btree ("entryId", "siteId");


--
-- Name: entrydrafts_sectionId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entrydrafts_sectionId_idx" ON entrydrafts USING btree ("sectionId");


--
-- Name: entrydrafts_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entrydrafts_siteId_idx" ON entrydrafts USING btree ("siteId");


--
-- Name: entrytypes_fieldLayoutId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entrytypes_fieldLayoutId_idx" ON entrytypes USING btree ("fieldLayoutId");


--
-- Name: entrytypes_handle_sectionId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "entrytypes_handle_sectionId_unq_idx" ON entrytypes USING btree (handle, "sectionId");


--
-- Name: entrytypes_name_sectionId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "entrytypes_name_sectionId_unq_idx" ON entrytypes USING btree (name, "sectionId");


--
-- Name: entrytypes_sectionId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entrytypes_sectionId_idx" ON entrytypes USING btree ("sectionId");


--
-- Name: entryversions_creatorId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entryversions_creatorId_idx" ON entryversions USING btree ("creatorId");


--
-- Name: entryversions_entryId_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entryversions_entryId_siteId_idx" ON entryversions USING btree ("entryId", "siteId");


--
-- Name: entryversions_sectionId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entryversions_sectionId_idx" ON entryversions USING btree ("sectionId");


--
-- Name: entryversions_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "entryversions_siteId_idx" ON entryversions USING btree ("siteId");


--
-- Name: fieldgroups_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX fieldgroups_name_unq_idx ON fieldgroups USING btree (name);


--
-- Name: fieldlayoutfields_fieldId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "fieldlayoutfields_fieldId_idx" ON fieldlayoutfields USING btree ("fieldId");


--
-- Name: fieldlayoutfields_layoutId_fieldId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "fieldlayoutfields_layoutId_fieldId_unq_idx" ON fieldlayoutfields USING btree ("layoutId", "fieldId");


--
-- Name: fieldlayoutfields_sortOrder_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "fieldlayoutfields_sortOrder_idx" ON fieldlayoutfields USING btree ("sortOrder");


--
-- Name: fieldlayoutfields_tabId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "fieldlayoutfields_tabId_idx" ON fieldlayoutfields USING btree ("tabId");


--
-- Name: fieldlayouts_type_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX fieldlayouts_type_idx ON fieldlayouts USING btree (type);


--
-- Name: fieldlayouttabs_layoutId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "fieldlayouttabs_layoutId_idx" ON fieldlayouttabs USING btree ("layoutId");


--
-- Name: fieldlayouttabs_sortOrder_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "fieldlayouttabs_sortOrder_idx" ON fieldlayouttabs USING btree ("sortOrder");


--
-- Name: fields_context_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX fields_context_idx ON fields USING btree (context);


--
-- Name: fields_groupId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "fields_groupId_idx" ON fields USING btree ("groupId");


--
-- Name: fields_handle_context_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX fields_handle_context_unq_idx ON fields USING btree (handle, context);


--
-- Name: globalsets_fieldLayoutId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "globalsets_fieldLayoutId_idx" ON globalsets USING btree ("fieldLayoutId");


--
-- Name: globalsets_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX globalsets_handle_unq_idx ON globalsets USING btree (handle);


--
-- Name: globalsets_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX globalsets_name_unq_idx ON globalsets USING btree (name);


--
-- Name: matrixblocks_fieldId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "matrixblocks_fieldId_idx" ON matrixblocks USING btree ("fieldId");


--
-- Name: matrixblocks_ownerId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "matrixblocks_ownerId_idx" ON matrixblocks USING btree ("ownerId");


--
-- Name: matrixblocks_ownerSiteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "matrixblocks_ownerSiteId_idx" ON matrixblocks USING btree ("ownerSiteId");


--
-- Name: matrixblocks_sortOrder_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "matrixblocks_sortOrder_idx" ON matrixblocks USING btree ("sortOrder");


--
-- Name: matrixblocks_typeId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "matrixblocks_typeId_idx" ON matrixblocks USING btree ("typeId");


--
-- Name: matrixblocktypes_fieldId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "matrixblocktypes_fieldId_idx" ON matrixblocktypes USING btree ("fieldId");


--
-- Name: matrixblocktypes_fieldLayoutId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "matrixblocktypes_fieldLayoutId_idx" ON matrixblocktypes USING btree ("fieldLayoutId");


--
-- Name: matrixblocktypes_handle_fieldId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "matrixblocktypes_handle_fieldId_unq_idx" ON matrixblocktypes USING btree (handle, "fieldId");


--
-- Name: matrixblocktypes_name_fieldId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "matrixblocktypes_name_fieldId_unq_idx" ON matrixblocktypes USING btree (name, "fieldId");


--
-- Name: migrations_pluginId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "migrations_pluginId_idx" ON migrations USING btree ("pluginId");


--
-- Name: migrations_type_pluginId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "migrations_type_pluginId_idx" ON migrations USING btree (type, "pluginId");


--
-- Name: plugins_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX plugins_handle_unq_idx ON plugins USING btree (handle);


--
-- Name: relations_fieldId_sourceId_sourceSiteId_targetId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "relations_fieldId_sourceId_sourceSiteId_targetId_unq_idx" ON relations USING btree ("fieldId", "sourceId", "sourceSiteId", "targetId");


--
-- Name: relations_sourceId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "relations_sourceId_idx" ON relations USING btree ("sourceId");


--
-- Name: relations_sourceSiteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "relations_sourceSiteId_idx" ON relations USING btree ("sourceSiteId");


--
-- Name: relations_targetId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "relations_targetId_idx" ON relations USING btree ("targetId");


--
-- Name: routes_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "routes_siteId_idx" ON routes USING btree ("siteId");


--
-- Name: routes_uriPattern_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "routes_uriPattern_idx" ON routes USING btree ("uriPattern");


--
-- Name: searchindex_keywords_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX searchindex_keywords_idx ON searchindex USING btree (keywords);


--
-- Name: searchindex_keywords_vector_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX searchindex_keywords_vector_idx ON searchindex USING gin (keywords_vector) WITH (fastupdate=yes);


--
-- Name: sections_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX sections_handle_unq_idx ON sections USING btree (handle);


--
-- Name: sections_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX sections_name_unq_idx ON sections USING btree (name);


--
-- Name: sections_sites_sectionId_siteId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "sections_sites_sectionId_siteId_unq_idx" ON sections_sites USING btree ("sectionId", "siteId");


--
-- Name: sections_sites_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "sections_sites_siteId_idx" ON sections_sites USING btree ("siteId");


--
-- Name: sections_structureId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "sections_structureId_idx" ON sections USING btree ("structureId");


--
-- Name: sessions_dateUpdated_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "sessions_dateUpdated_idx" ON sessions USING btree ("dateUpdated");


--
-- Name: sessions_token_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX sessions_token_idx ON sessions USING btree (token);


--
-- Name: sessions_uid_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX sessions_uid_idx ON sessions USING btree (uid);


--
-- Name: sessions_userId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "sessions_userId_idx" ON sessions USING btree ("userId");


--
-- Name: shunnedmessages_userId_message_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "shunnedmessages_userId_message_unq_idx" ON shunnedmessages USING btree ("userId", message);


--
-- Name: sites_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX sites_handle_unq_idx ON sites USING btree (handle);


--
-- Name: sites_sortOrder_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "sites_sortOrder_idx" ON sites USING btree ("sortOrder");


--
-- Name: structureelements_elementId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "structureelements_elementId_idx" ON structureelements USING btree ("elementId");


--
-- Name: structureelements_level_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX structureelements_level_idx ON structureelements USING btree (level);


--
-- Name: structureelements_lft_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX structureelements_lft_idx ON structureelements USING btree (lft);


--
-- Name: structureelements_rgt_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX structureelements_rgt_idx ON structureelements USING btree (rgt);


--
-- Name: structureelements_root_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX structureelements_root_idx ON structureelements USING btree (root);


--
-- Name: structureelements_structureId_elementId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "structureelements_structureId_elementId_unq_idx" ON structureelements USING btree ("structureId", "elementId");


--
-- Name: systemmessages_key_language_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX systemmessages_key_language_unq_idx ON systemmessages USING btree (key, language);


--
-- Name: systemmessages_language_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX systemmessages_language_idx ON systemmessages USING btree (language);


--
-- Name: systemsettings_category_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX systemsettings_category_unq_idx ON systemsettings USING btree (category);


--
-- Name: taggroups_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX taggroups_handle_unq_idx ON taggroups USING btree (handle);


--
-- Name: taggroups_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX taggroups_name_unq_idx ON taggroups USING btree (name);


--
-- Name: tags_groupId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "tags_groupId_idx" ON tags USING btree ("groupId");


--
-- Name: tasks_level_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX tasks_level_idx ON tasks USING btree (level);


--
-- Name: tasks_lft_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX tasks_lft_idx ON tasks USING btree (lft);


--
-- Name: tasks_rgt_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX tasks_rgt_idx ON tasks USING btree (rgt);


--
-- Name: tasks_root_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX tasks_root_idx ON tasks USING btree (root);


--
-- Name: templatecacheelements_cacheId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "templatecacheelements_cacheId_idx" ON templatecacheelements USING btree ("cacheId");


--
-- Name: templatecacheelements_elementId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "templatecacheelements_elementId_idx" ON templatecacheelements USING btree ("elementId");


--
-- Name: templatecachequeries_cacheId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "templatecachequeries_cacheId_idx" ON templatecachequeries USING btree ("cacheId");


--
-- Name: templatecachequeries_type_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX templatecachequeries_type_idx ON templatecachequeries USING btree (type);


--
-- Name: templatecaches_expiryDate_cacheKey_siteId_path_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "templatecaches_expiryDate_cacheKey_siteId_path_idx" ON templatecaches USING btree ("expiryDate", "cacheKey", "siteId", path);


--
-- Name: templatecaches_siteId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "templatecaches_siteId_idx" ON templatecaches USING btree ("siteId");


--
-- Name: tokens_expiryDate_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "tokens_expiryDate_idx" ON tokens USING btree ("expiryDate");


--
-- Name: tokens_token_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX tokens_token_unq_idx ON tokens USING btree (token);


--
-- Name: usergroups_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX usergroups_handle_unq_idx ON usergroups USING btree (handle);


--
-- Name: usergroups_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX usergroups_name_unq_idx ON usergroups USING btree (name);


--
-- Name: usergroups_users_groupId_userId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "usergroups_users_groupId_userId_unq_idx" ON usergroups_users USING btree ("groupId", "userId");


--
-- Name: usergroups_users_userId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "usergroups_users_userId_idx" ON usergroups_users USING btree ("userId");


--
-- Name: userpermissions_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX userpermissions_name_unq_idx ON userpermissions USING btree (name);


--
-- Name: userpermissions_usergroups_groupId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "userpermissions_usergroups_groupId_idx" ON userpermissions_usergroups USING btree ("groupId");


--
-- Name: userpermissions_usergroups_permissionId_groupId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "userpermissions_usergroups_permissionId_groupId_unq_idx" ON userpermissions_usergroups USING btree ("permissionId", "groupId");


--
-- Name: userpermissions_users_permissionId_userId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "userpermissions_users_permissionId_userId_unq_idx" ON userpermissions_users USING btree ("permissionId", "userId");


--
-- Name: userpermissions_users_userId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "userpermissions_users_userId_idx" ON userpermissions_users USING btree ("userId");


--
-- Name: users_email_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX users_email_unq_idx ON users USING btree (email);


--
-- Name: users_uid_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX users_uid_idx ON users USING btree (uid);


--
-- Name: users_username_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX users_username_unq_idx ON users USING btree (username);


--
-- Name: users_verificationCode_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "users_verificationCode_idx" ON users USING btree ("verificationCode");


--
-- Name: volumefolders_name_parentId_volumeId_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX "volumefolders_name_parentId_volumeId_unq_idx" ON volumefolders USING btree (name, "parentId", "volumeId");


--
-- Name: volumefolders_parentId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "volumefolders_parentId_idx" ON volumefolders USING btree ("parentId");


--
-- Name: volumefolders_volumeId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "volumefolders_volumeId_idx" ON volumefolders USING btree ("volumeId");


--
-- Name: volumes_fieldLayoutId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "volumes_fieldLayoutId_idx" ON volumes USING btree ("fieldLayoutId");


--
-- Name: volumes_handle_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX volumes_handle_unq_idx ON volumes USING btree (handle);


--
-- Name: volumes_name_unq_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE UNIQUE INDEX volumes_name_unq_idx ON volumes USING btree (name);


--
-- Name: widgets_userId_idx; Type: INDEX; Schema: public; Owner: craft3beta
--

CREATE INDEX "widgets_userId_idx" ON widgets USING btree ("userId");


--
-- Name: assetindexdata assetindexdata_volumeId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assetindexdata
    ADD CONSTRAINT "assetindexdata_volumeId_fk" FOREIGN KEY ("volumeId") REFERENCES volumes(id) ON DELETE CASCADE;


--
-- Name: assets assets_folderId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assets
    ADD CONSTRAINT "assets_folderId_fk" FOREIGN KEY ("folderId") REFERENCES volumefolders(id) ON DELETE CASCADE;


--
-- Name: assets assets_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assets
    ADD CONSTRAINT assets_id_fk FOREIGN KEY (id) REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: assets assets_volumeId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY assets
    ADD CONSTRAINT "assets_volumeId_fk" FOREIGN KEY ("volumeId") REFERENCES volumes(id) ON DELETE CASCADE;


--
-- Name: categories categories_groupId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT "categories_groupId_fk" FOREIGN KEY ("groupId") REFERENCES categorygroups(id) ON DELETE CASCADE;


--
-- Name: categories categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_id_fk FOREIGN KEY (id) REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: categorygroups categorygroups_fieldLayoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups
    ADD CONSTRAINT "categorygroups_fieldLayoutId_fk" FOREIGN KEY ("fieldLayoutId") REFERENCES fieldlayouts(id) ON DELETE SET NULL;


--
-- Name: categorygroups_sites categorygroups_sites_groupId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups_sites
    ADD CONSTRAINT "categorygroups_sites_groupId_fk" FOREIGN KEY ("groupId") REFERENCES categorygroups(id) ON DELETE CASCADE;


--
-- Name: categorygroups_sites categorygroups_sites_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups_sites
    ADD CONSTRAINT "categorygroups_sites_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: categorygroups categorygroups_structureId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY categorygroups
    ADD CONSTRAINT "categorygroups_structureId_fk" FOREIGN KEY ("structureId") REFERENCES structures(id) ON DELETE CASCADE;


--
-- Name: content content_elementId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY content
    ADD CONSTRAINT "content_elementId_fk" FOREIGN KEY ("elementId") REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: content content_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY content
    ADD CONSTRAINT "content_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: elements elements_fieldLayoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elements
    ADD CONSTRAINT "elements_fieldLayoutId_fk" FOREIGN KEY ("fieldLayoutId") REFERENCES fieldlayouts(id) ON DELETE SET NULL;


--
-- Name: elements_sites elements_sites_elementId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elements_sites
    ADD CONSTRAINT "elements_sites_elementId_fk" FOREIGN KEY ("elementId") REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: elements_sites elements_sites_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY elements_sites
    ADD CONSTRAINT "elements_sites_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entries entries_authorId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entries
    ADD CONSTRAINT "entries_authorId_fk" FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: entries entries_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entries
    ADD CONSTRAINT entries_id_fk FOREIGN KEY (id) REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: entries entries_sectionId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entries
    ADD CONSTRAINT "entries_sectionId_fk" FOREIGN KEY ("sectionId") REFERENCES sections(id) ON DELETE CASCADE;


--
-- Name: entries entries_typeId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entries
    ADD CONSTRAINT "entries_typeId_fk" FOREIGN KEY ("typeId") REFERENCES entrytypes(id) ON DELETE CASCADE;


--
-- Name: entrydrafts entrydrafts_creatorId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrydrafts
    ADD CONSTRAINT "entrydrafts_creatorId_fk" FOREIGN KEY ("creatorId") REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: entrydrafts entrydrafts_entryId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrydrafts
    ADD CONSTRAINT "entrydrafts_entryId_fk" FOREIGN KEY ("entryId") REFERENCES entries(id) ON DELETE CASCADE;


--
-- Name: entrydrafts entrydrafts_sectionId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrydrafts
    ADD CONSTRAINT "entrydrafts_sectionId_fk" FOREIGN KEY ("sectionId") REFERENCES sections(id) ON DELETE CASCADE;


--
-- Name: entrydrafts entrydrafts_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrydrafts
    ADD CONSTRAINT "entrydrafts_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: entrytypes entrytypes_fieldLayoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrytypes
    ADD CONSTRAINT "entrytypes_fieldLayoutId_fk" FOREIGN KEY ("fieldLayoutId") REFERENCES fieldlayouts(id) ON DELETE SET NULL;


--
-- Name: entrytypes entrytypes_sectionId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entrytypes
    ADD CONSTRAINT "entrytypes_sectionId_fk" FOREIGN KEY ("sectionId") REFERENCES sections(id) ON DELETE CASCADE;


--
-- Name: entryversions entryversions_creatorId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entryversions
    ADD CONSTRAINT "entryversions_creatorId_fk" FOREIGN KEY ("creatorId") REFERENCES users(id) ON DELETE SET NULL;


--
-- Name: entryversions entryversions_entryId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entryversions
    ADD CONSTRAINT "entryversions_entryId_fk" FOREIGN KEY ("entryId") REFERENCES entries(id) ON DELETE CASCADE;


--
-- Name: entryversions entryversions_sectionId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entryversions
    ADD CONSTRAINT "entryversions_sectionId_fk" FOREIGN KEY ("sectionId") REFERENCES sections(id) ON DELETE CASCADE;


--
-- Name: entryversions entryversions_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY entryversions
    ADD CONSTRAINT "entryversions_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fieldlayoutfields fieldlayoutfields_fieldId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayoutfields
    ADD CONSTRAINT "fieldlayoutfields_fieldId_fk" FOREIGN KEY ("fieldId") REFERENCES fields(id) ON DELETE CASCADE;


--
-- Name: fieldlayoutfields fieldlayoutfields_layoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayoutfields
    ADD CONSTRAINT "fieldlayoutfields_layoutId_fk" FOREIGN KEY ("layoutId") REFERENCES fieldlayouts(id) ON DELETE CASCADE;


--
-- Name: fieldlayoutfields fieldlayoutfields_tabId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayoutfields
    ADD CONSTRAINT "fieldlayoutfields_tabId_fk" FOREIGN KEY ("tabId") REFERENCES fieldlayouttabs(id) ON DELETE CASCADE;


--
-- Name: fieldlayouttabs fieldlayouttabs_layoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fieldlayouttabs
    ADD CONSTRAINT "fieldlayouttabs_layoutId_fk" FOREIGN KEY ("layoutId") REFERENCES fieldlayouts(id) ON DELETE CASCADE;


--
-- Name: fields fields_groupId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY fields
    ADD CONSTRAINT "fields_groupId_fk" FOREIGN KEY ("groupId") REFERENCES fieldgroups(id) ON DELETE CASCADE;


--
-- Name: globalsets globalsets_fieldLayoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY globalsets
    ADD CONSTRAINT "globalsets_fieldLayoutId_fk" FOREIGN KEY ("fieldLayoutId") REFERENCES fieldlayouts(id) ON DELETE SET NULL;


--
-- Name: globalsets globalsets_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY globalsets
    ADD CONSTRAINT globalsets_id_fk FOREIGN KEY (id) REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: matrixblocks matrixblocks_fieldId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocks
    ADD CONSTRAINT "matrixblocks_fieldId_fk" FOREIGN KEY ("fieldId") REFERENCES fields(id) ON DELETE CASCADE;


--
-- Name: matrixblocks matrixblocks_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocks
    ADD CONSTRAINT matrixblocks_id_fk FOREIGN KEY (id) REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: matrixblocks matrixblocks_ownerId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocks
    ADD CONSTRAINT "matrixblocks_ownerId_fk" FOREIGN KEY ("ownerId") REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: matrixblocks matrixblocks_ownerSiteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocks
    ADD CONSTRAINT "matrixblocks_ownerSiteId_fk" FOREIGN KEY ("ownerSiteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: matrixblocks matrixblocks_typeId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocks
    ADD CONSTRAINT "matrixblocks_typeId_fk" FOREIGN KEY ("typeId") REFERENCES matrixblocktypes(id) ON DELETE CASCADE;


--
-- Name: matrixblocktypes matrixblocktypes_fieldId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocktypes
    ADD CONSTRAINT "matrixblocktypes_fieldId_fk" FOREIGN KEY ("fieldId") REFERENCES fields(id) ON DELETE CASCADE;


--
-- Name: matrixblocktypes matrixblocktypes_fieldLayoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY matrixblocktypes
    ADD CONSTRAINT "matrixblocktypes_fieldLayoutId_fk" FOREIGN KEY ("fieldLayoutId") REFERENCES fieldlayouts(id) ON DELETE SET NULL;


--
-- Name: migrations migrations_pluginId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY migrations
    ADD CONSTRAINT "migrations_pluginId_fk" FOREIGN KEY ("pluginId") REFERENCES plugins(id) ON DELETE CASCADE;


--
-- Name: relations relations_fieldId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY relations
    ADD CONSTRAINT "relations_fieldId_fk" FOREIGN KEY ("fieldId") REFERENCES fields(id) ON DELETE CASCADE;


--
-- Name: relations relations_sourceId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY relations
    ADD CONSTRAINT "relations_sourceId_fk" FOREIGN KEY ("sourceId") REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: relations relations_sourceSiteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY relations
    ADD CONSTRAINT "relations_sourceSiteId_fk" FOREIGN KEY ("sourceSiteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: relations relations_targetId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY relations
    ADD CONSTRAINT "relations_targetId_fk" FOREIGN KEY ("targetId") REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: routes routes_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY routes
    ADD CONSTRAINT "routes_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sections_sites sections_sites_sectionId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sections_sites
    ADD CONSTRAINT "sections_sites_sectionId_fk" FOREIGN KEY ("sectionId") REFERENCES sections(id) ON DELETE CASCADE;


--
-- Name: sections_sites sections_sites_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sections_sites
    ADD CONSTRAINT "sections_sites_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sections sections_structureId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sections
    ADD CONSTRAINT "sections_structureId_fk" FOREIGN KEY ("structureId") REFERENCES structures(id) ON DELETE SET NULL;


--
-- Name: sessions sessions_userId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT "sessions_userId_fk" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: shunnedmessages shunnedmessages_userId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY shunnedmessages
    ADD CONSTRAINT "shunnedmessages_userId_fk" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: structureelements structureelements_elementId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY structureelements
    ADD CONSTRAINT "structureelements_elementId_fk" FOREIGN KEY ("elementId") REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: structureelements structureelements_structureId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY structureelements
    ADD CONSTRAINT "structureelements_structureId_fk" FOREIGN KEY ("structureId") REFERENCES structures(id) ON DELETE CASCADE;


--
-- Name: taggroups taggroups_fieldLayoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY taggroups
    ADD CONSTRAINT "taggroups_fieldLayoutId_fk" FOREIGN KEY ("fieldLayoutId") REFERENCES fieldlayouts(id) ON DELETE SET NULL;


--
-- Name: tags tags_groupId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT "tags_groupId_fk" FOREIGN KEY ("groupId") REFERENCES taggroups(id) ON DELETE CASCADE;


--
-- Name: tags tags_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_id_fk FOREIGN KEY (id) REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: templatecacheelements templatecacheelements_cacheId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecacheelements
    ADD CONSTRAINT "templatecacheelements_cacheId_fk" FOREIGN KEY ("cacheId") REFERENCES templatecaches(id) ON DELETE CASCADE;


--
-- Name: templatecacheelements templatecacheelements_elementId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecacheelements
    ADD CONSTRAINT "templatecacheelements_elementId_fk" FOREIGN KEY ("elementId") REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: templatecachequeries templatecachequeries_cacheId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecachequeries
    ADD CONSTRAINT "templatecachequeries_cacheId_fk" FOREIGN KEY ("cacheId") REFERENCES templatecaches(id) ON DELETE CASCADE;


--
-- Name: templatecaches templatecaches_siteId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY templatecaches
    ADD CONSTRAINT "templatecaches_siteId_fk" FOREIGN KEY ("siteId") REFERENCES sites(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: usergroups_users usergroups_users_groupId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY usergroups_users
    ADD CONSTRAINT "usergroups_users_groupId_fk" FOREIGN KEY ("groupId") REFERENCES usergroups(id) ON DELETE CASCADE;


--
-- Name: usergroups_users usergroups_users_userId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY usergroups_users
    ADD CONSTRAINT "usergroups_users_userId_fk" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: userpermissions_usergroups userpermissions_usergroups_groupId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_usergroups
    ADD CONSTRAINT "userpermissions_usergroups_groupId_fk" FOREIGN KEY ("groupId") REFERENCES usergroups(id) ON DELETE CASCADE;


--
-- Name: userpermissions_usergroups userpermissions_usergroups_permissionId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_usergroups
    ADD CONSTRAINT "userpermissions_usergroups_permissionId_fk" FOREIGN KEY ("permissionId") REFERENCES userpermissions(id) ON DELETE CASCADE;


--
-- Name: userpermissions_users userpermissions_users_permissionId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_users
    ADD CONSTRAINT "userpermissions_users_permissionId_fk" FOREIGN KEY ("permissionId") REFERENCES userpermissions(id) ON DELETE CASCADE;


--
-- Name: userpermissions_users userpermissions_users_userId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpermissions_users
    ADD CONSTRAINT "userpermissions_users_userId_fk" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: userpreferences userpreferences_userId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY userpreferences
    ADD CONSTRAINT "userpreferences_userId_fk" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: users users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_id_fk FOREIGN KEY (id) REFERENCES elements(id) ON DELETE CASCADE;


--
-- Name: users users_photoId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY users
    ADD CONSTRAINT "users_photoId_fk" FOREIGN KEY ("photoId") REFERENCES assets(id) ON DELETE SET NULL;


--
-- Name: volumefolders volumefolders_parentId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY volumefolders
    ADD CONSTRAINT "volumefolders_parentId_fk" FOREIGN KEY ("parentId") REFERENCES volumefolders(id) ON DELETE CASCADE;


--
-- Name: volumefolders volumefolders_volumeId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY volumefolders
    ADD CONSTRAINT "volumefolders_volumeId_fk" FOREIGN KEY ("volumeId") REFERENCES volumes(id) ON DELETE CASCADE;


--
-- Name: volumes volumes_fieldLayoutId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY volumes
    ADD CONSTRAINT "volumes_fieldLayoutId_fk" FOREIGN KEY ("fieldLayoutId") REFERENCES fieldlayouts(id) ON DELETE SET NULL;


--
-- Name: widgets widgets_userId_fk; Type: FK CONSTRAINT; Schema: public; Owner: craft3beta
--

ALTER TABLE ONLY widgets
    ADD CONSTRAINT "widgets_userId_fk" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

