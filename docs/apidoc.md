# boldr-api v0.6.5

Your dreams are bold. Your thoughts are bold. So why shouldn&#39;t your CMS be a little Boldr?

- [Activity](#activity)
	- [Create activity](#create-activity)
	- [Retrieve all latest activities](#retrieve-all-latest-activities)
	- [Retrieve activity](#retrieve-activity)
	
- [Attachment](#attachment)
	- [Remove attachment from database and S3](#remove-attachment-from-database-and-s3)
	- [Returns all items in S3 bucket.](#returns-all-items-in-s3-bucket.)
	- [Get all attachment files](#get-all-attachment-files)
	- [Get a specific file by its id](#get-a-specific-file-by-its-id)
	- [Upload an attachment associating with a dashboard upload](#upload-an-attachment-associating-with-a-dashboard-upload)
	
- [Auth](#auth)
	- [Login](#login)
	- [Signup](#signup)
	- [Check](#check)
	- [Verify](#verify)
	
- [Blocks](#blocks)
	- [Get all blocks](#get-all-blocks)
	- [Get a specific by its id.](#get-a-specific-by-its-id.)
	
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
	
- [Role](#role)
	- [Get information for the specific role](#get-information-for-the-specific-role)
	- [Get a list of all roles](#get-a-list-of-all-roles)
	
- [Settings](#settings)
	- [Add an additional setting](#add-an-additional-setting)
	- [Get a specific setting](#get-a-specific-setting)
	- [Get all settings objects](#get-all-settings-objects)
	- [Update a specific setting](#update-a-specific-setting)
	
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
| Authorization			| String			|  <p>The user's token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| uuid			| String			|  <p>a v4 spec UUID</p>							|
| account_id			| String			|  <p>The account id of the creator</p>							|
| action			| String			|  <p>What the action was</p>							|
| type			| Enum[String]			|  <p>create,update,delete,register</p>							|
| data			| Object			|  <p>The data of the action</p>							|
| entry_table			| String			|  <p>The table name of the action</p>							|
| entry_uuid			| String			|  <p>The UUID of the action</p>							|

## Retrieve all latest activities



	GET /activities


## Retrieve activity



	GET /activities/:id


# Attachment

## Remove attachment from database and S3



	DELETE /attachments/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

## Returns all items in S3 bucket.



	GET /attachments/aws/bucket

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

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

## Upload an attachment associating with a dashboard upload



	POST /attachments/dashboard


# Auth

## Login



	POST /auth/login

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Bearer {token}</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>User email address</p>							|
| password			| String			|  <p>User password</p>							|

### Success Response

Success-Response:

```

HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYjA",
  "user": {
  "id": "1b062e26-df71-48ce-b363-4ae9b966e7a0",
  "email": "admin@boldr.io",
  "first_name": "Joe",
  "last_name": "Gray",
  "display_name": "Joey",
  "avatar_url": "https://boldr.io/images/unknown-avatar.png",
  "verified": true,
  "role": [{
        "id": 3,
        "name": "Admin",
        "image": null,
        "description": "Complete control over the CMS",
        "created_at": "2016-11-21T19:49:59.653Z",
        "updated_at": "2016-11-21T19:49:59.653Z"
        }]
   }
 }
```
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
| avatar_url			| String			|  <p>Url for the user's avatar</p>							|

## Check



	GET /auth/check

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

## Verify



	GET /auth/verification/:verifToken


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| verification			| String			|  <VerificationToken>							|

# Blocks

## Get all blocks



	GET /blocks


## Get a specific by its id.



	GET /blocks/:id


# Links

## Create a new navigation link



	POST /links

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

## Delete a link



	DELETE /links/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

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



	PATCH /links/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the link</p>							|

# Navigation

## Create a new navigation



	POST /navigations

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

## Delete a navigation



	DELETE /navigations/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

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



	PUT /navigations/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

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
| Authorization			| String			|  <p>The user's token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| title			| String			|  <p>The title of the post</p>							|
| excerpt			| String			|  <p>A short description or snippet of the post</p>							|
| content			| String			|  <p>The content of the post</p>							|
| feature_image			| String			|  <p>The URL for an image to use with the post</p>							|
| tags			| String			|  <p>Comma separated tags for the post</p>							|
| status			| String			|  <p>One of: draft / published / archived</p>							|

## Retrieve a post by its id.



	GET /posts/pid/:id


## Retrieve a post by its slug.



	GET /posts/slug/:slug


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| slug			| String			|  <p>The slug of the post</p>							|

## Retrieve all posts



	GET /posts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| include			| String[]			|  <p>Return associated models with the request</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|

# Role

## Get information for the specific role



	GET /roles/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>the role id</p>							|

## Get a list of all roles



	GET /roles


# Settings

## Add an additional setting



	POST /settings

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| key			| String			|  <p>The setting's key</p>							|
| value			| String			|  <p>The data related to the setting</p>							|
| description			| String			|  <p>What the setting is for</p>							|

## Get a specific setting



	GET /settings/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| id			| Number			|  <p>The id of the setting requested.</p>							|

## Get all settings objects



	GET /settings


## Update a specific setting



	PUT /settings/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| key			| String			|  <p>The setting's key</p>							|
| value			| String			|  <p>The data related to the setting</p>							|
| description			| String			|  <p>What the setting is for</p>							|

# Tag

## Retrieve all tags



	GET /tags


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| include			| String[]			|  <p>Return associated models with the request</p>							|
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
| Authorization			| String			|  <p>The user's token</p>							|

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
| Authorization			| String			|  <p>The user's token</p>							|

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
| Authorization			| String			|  <p>The user's token</p>							|

## Retrieve user



	GET /users/:id


## Retrieve all users



	GET /users


## Update user



	PUT /users/:id

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>The user's token</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			| **optional** <p>User's email.</p>							|
| password			| String			| **optional** <p>User's password.</p>							|


