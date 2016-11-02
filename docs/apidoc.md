# boldr v0.6.0-alpha.1

Your dreams are bold. Your thoughts are bold. So why shouldn&#39;t your CMS be a little Boldr?

- [Activity](#activity)
	- [Create activity](#create-activity)
	- [Retrieve all latest activities](#retrieve-all-latest-activities)
	- [Retrieve activity](#retrieve-activity)
	
- [Attachment](#attachment)
	- [Get all attachment files](#get-all-attachment-files)
	- [Get a specific file by its id](#get-a-specific-file-by-its-id)
	- [Upload an attachment](#upload-an-attachment)
	- [Upload an attachment associating with a dashboard upload](#upload-an-attachment-associating-with-a-dashboard-upload)
	
- [Auth](#auth)
	- [Login](#login)
	- [Signup](#signup)
	- [Check](#check)
	- [Initiate Facebook OAuth](#initiate-facebook-oauth)
	- [Facebook Callback](#facebook-callback)
	- [Initiate GitHub OAuth](#initiate-github-oauth)
	- [GitHub Callback](#github-callback)
	- [Verify](#verify)
	
- [Blocks](#blocks)
	- [Get all blocks](#get-all-blocks)
	
- [Links](#links)
	- [Create a new navigation link](#create-a-new-navigation-link)
	- [Delete a link](#delete-a-link)
	- [Return a list of all navigation links](#return-a-list-of-all-navigation-links)
	- [Return a specific link by its id.](#return-a-specific-link-by-its-id.)
	- [Update a link](#update-a-link)
	
- [Navigation](#navigation)
	- [Create a new navigation](#create-a-new-navigation)
	- [Delete a navigation](#delete-a-navigation)
	- [Return a list of all navigation blocks](#return-a-list-of-all-navigation-blocks)
	- [Return a specific navigation by its id.](#return-a-specific-navigation-by-its-id.)
	- [Update a navigation](#update-a-navigation)
	
- [Pages](#pages)
	- [Get all pages](#get-all-pages)
	
- [Post](#post)
	- [Create a new post](#create-a-new-post)
	- [Retrieve a post by its id.](#retrieve-a-post-by-its-id.)
	- [Retrieve a post by its slug.](#retrieve-a-post-by-its-slug.)
	- [Retrieve all posts](#retrieve-all-posts)
	
- [Settings](#settings)
	- [Get all settings objects](#get-all-settings-objects)
	
- [Tag](#tag)
	- [Retrieve all tags](#retrieve-all-tags)
	- [Get a specific tag by its id.](#get-a-specific-tag-by-its-id.)
	- [Create a new tag](#create-a-new-tag)
	- [Returns all posts associated with the tag.](#returns-all-posts-associated-with-the-tag.)
	- [Returns all posts associated with the tag.](#returns-all-posts-associated-with-the-tag.)
	- [Update a tag](#update-a-tag)
	
- [Token](#token)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve all users](#retrieve-all-users)
	- [Update user](#update-user)
	


# Activity

## Create activity



	POST /activities

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| uuid			| String			|  <p>a v4 spec UUID</p>							|
| account_id			| String			|  <p>The account id of the creator</p>							|
| action			| String			|  <p>What the action was</p>							|
| create			| Enum[String]			|  <p>,update,delete,register</p>							|
| data			| Object			|  <p>The data of the action</p>							|
| entry_table			| String			|  <p>The table name of the action</p>							|
| entry_uuid			| String			|  <p>The UUID of the action</p>							|

## Retrieve all latest activities



	GET /activities


## Retrieve activity



	GET /activities/:id


# Attachment

## Get all attachment files



	GET /attachments


### Examples

Example usage:

```
curl -i http://localhost:3000/api/v1/attachments
```

## Get a specific file by its id



	GET /attachments/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| String			|  <p>The medias's id.</p>							|

### Examples

Example usage:

```
curl -i http://localhost:3000/api/v1/attachments/1
```

## Upload an attachment



	POST /attachments


## Upload an attachment associating with a dashboard upload



	POST /attachments/dashboard


# Auth

## Login



	POST /auth/login

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User email address</p>							|
| password			| String			|  <p>User password</p>							|

## Signup



	POST /auth/signup


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User email address</p>							|
| password			| String			|  <p>User password</p>							|
| first_name			| String			|  <p>First name of the user</p>							|
| last_name			| String			|  <p>Last name of the user</p>							|
| display_name			| String			|  <p>The user's display name</p>							|
| location			| String			|  <p>City/State where the user is located</p>							|
| website			| String			|  <p>Personal website belonging to the user</p>							|
| avatar_url			| String			|  <p>Url for the user's avatar</p>							|
| bio			| String			|  <p>Information about the user</p>							|
| facebook_profile			| String			|  <p>Url to the user's facebook profile</p>							|
| github_profile			| String			|  <p>Url to the user's github profile</p>							|
| twitter_profile			| String			|  <p>Url to the user's twitter profile</p>							|
| google_profile			| String			|  <p>Url to the user's google profile</p>							|

## Check



	GET /auth/check

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Token</p>							|

## Initiate Facebook OAuth



	GET /auth/facebook


## Facebook Callback



	GET /auth/facebook/callback


## Initiate GitHub OAuth



	GET /auth/github


## GitHub Callback



	GET /auth/github/callback


## Verify



	GET /auth/verification/:verifToken


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| verification			| String			|  <p>{token}</p>							|

# Blocks

## Get all blocks



	GET /blocks


# Links

## Create a new navigation link



	POST /links


## Delete a link



	DELETE /links/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the link</p>							|

## Return a list of all navigation links



	GET /links


## Return a specific link by its id.



	GET /links/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the link</p>							|

## Update a link



	PUT /links/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the link</p>							|

# Navigation

## Create a new navigation



	POST /navigations


## Delete a navigation



	DELETE /navigations/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the navigation</p>							|

## Return a list of all navigation blocks



	GET /navigations


## Return a specific navigation by its id.



	GET /navigations/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the navigation</p>							|

## Update a navigation



	PATCH /navigations/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the link</p>							|

# Pages

## Get all pages



	GET /pages


# Post

## Create a new post



	POST /posts

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

## Retrieve a post by its id.



	GET /posts/pid/:id


## Retrieve a post by its slug.



	GET /posts/slug/:slug


## Retrieve all posts



	GET /posts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| include			| String[]			|  <p>Eager load relationships such as /posts?include=[author]</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|

# Settings

## Get all settings objects



	GET /settings


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| include			| String[]			|  <p>Eager load relationships such as /posts?include=[author]</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|

# Tag

## Retrieve all tags



	GET /tags


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| include			| String[]			|  <p>Eager load relationships such as /posts?include=[author]</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|

## Get a specific tag by its id.



	GET /tags/:id


## Create a new tag



	POST /tags

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

## Returns all posts associated with the tag.



	GET /tags/:id/posts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The tag id</p>							|

## Returns all posts associated with the tag.



	GET /tags/posts/:name


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| String			|  <p>The tag name</p>							|

## Update a tag



	PUT /tags/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The tag id</p>							|

# Token

## Send email



	POST /tokens/forgot-password


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	POST /tokens/reset-password/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>New account password</p>							|

# User

## Create user



	POST /users

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User's email address.</p>							|
| password			| String			|  <p>User's password.</p>							|

## Delete user



	DELETE /users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

## Retrieve user



	GET /users/:id


## Retrieve all users



	GET /users


## Update user



	PUT /users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>{token}</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			| **optional** <p>User's email.</p>							|
| password			| String			| **optional** <p>User's password.</p>							|


