const uuid = require('uuid');
/* eslint-disable */
function truncate(knex, Promise, tables) {
  return Promise.each(tables, table =>
  // prettier-ignore
    knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`)
  );
}

const tables = [
  'page',
  '"user"',
  'article',
  'role',
  'tag',
  'user_role',
  'article_tag',
  'menu',
  'menu_detail',
  'menu_menu_detail',
  'setting',
];

function seed(knex, Promise) {
  return truncate(knex, Promise, tables)
  .then(() =>
    Promise.all([
      knex('page').insert({
        title: 'Home',
        slug: 'home',
        url: '/',
      }),
      knex('page').insert({
        title: 'About',
        slug: 'about',
        url: '/about',
      }),
      knex('page').insert({
        title: 'Portfolio',
        slug: 'portfolio',
        url: '/portfolio',
      }),
      // prettier-ignore
    ])
  )
    .then(() =>
      Promise.all([
        knex('role').insert({
          name: 'Member',
          description: 'A verified user without special privileges',
        }),
        knex('role').insert({
          name: 'Staff',
          description: 'Allows access to the CMS dashboard.',
        }),
        knex('role').insert({
          name: 'Admin',
          description: 'Complete control over the CMS',
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('user').insert({
          id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
          email: 'admin@boldr.io',
          password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
          firstName: 'Joe',
          lastName: 'Gray',
          username: 'Joey',
          avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
          location: 'Colorado',
          bio: 'I am me.',
          website: 'https://boldr.io',
          profileImage: 'https://boldr.io/images/unknown-avatar.png',
          birthday: '01/01/1988',
          language: 'en_US',
          verified: true,
        }),
        knex('user').insert({
          id: 'f4d869a6-1a75-469b-a9cc-965c552929e4',
          email: 'user@boldr.io',
          password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
          firstName: 'Jessica',
          lastName: 'Smith',
          username: 'Jess',
          avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
          location: 'Washington',
          bio: 'Just a person',
          website: 'https://boldr.io',
          profileImage: 'https://boldr.io/images/unknown-avatar.png',
          birthday: '01/01/1988',
          language: 'en_US',
          verified: true,
        }),
        knex('user').insert({
          id: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
          email: 'demo@boldr.io',
          password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
          firstName: 'Sam',
          lastName: 'Hunt',
          username: 'Samus',
          avatarUrl: 'https://boldr.io/images/unknown-avatar.png',
          location: 'California',
          bio: 'Someone doing things.',
          website: 'https://boldr.io',
          profileImage: 'https://boldr.io/images/unknown-avatar.png',
          birthday: '01/01/1988',
          language: 'en_US',
          verified: true,
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('user_social_media').insert({
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
          facebookUrl: 'https://facebook.com',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          googleUrl: 'https://google.com',
          stackoverflowUrl: 'https://stackoverflow.com',
        }),
        knex('user_social_media').insert({
          userId: 'f4d869a6-1a75-469b-a9cc-965c552929e4',
          facebookUrl: 'https://facebook.com',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          googleUrl: 'https://google.com',
          stackoverflowUrl: 'https://stackoverflow.com',
        }),
        knex('user_social_media').insert({
          userId: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
          facebookUrl: 'https://facebook.com',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          googleUrl: 'https://google.com',
          stackoverflowUrl: 'https://stackoverflow.com',
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('tag').insert({
          id: 'b1c0d816-e8c0-4a0d-a63a-5215f02b423e',
          name: 'javascript',
          description: 'Something something JS',
        }),
        knex('tag').insert({
          id: '517e9975-9dd8-44fc-80cf-cb907964a06b',
          name: 'stuff',
          description: 'Stuff about stuff.',
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('article').insert({
          id: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
          title: 'Building From Scratch',
          slug: 'building-from-scratch',
          featured: true,
          excerpt: 'This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard.',
          image: 'http://i.magaimg.net/img/18en.png',
          meta: {},
          rawContent: {
            "entityMap":{},"blocks":[{"key":"64vtl","text":"This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":278,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"aiim1","text":"I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction. Many developers will tell you not to even try; that it is not worth the headache.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":242,"length":83,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"339vf","text":" I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the next level thinking, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":298,"length":20,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"5vgli","text":"The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]
          },

          content: `<p>This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is <strong>hard. </strong></p><p>I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction<strong>. Many developers will tell you not to even try; that it is not worth the headache.</strong></p><p> I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the<em> next level thinking</em>, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.</p><p>The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…</p>`,
          published: true,
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        }),
        knex('article').insert({
          id: 'cb61bbae-c91e-4014-b665-3485734b88fb',
          title: 'Setup a Universal React Application',
          slug: 'setup-a-universal-react-application',
          featured: false,
          excerpt: 'This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is hard.',
          image: 'https://cdn-images-1.medium.com/max/800/1*tnh7IIZ1PrNQ-PzOMijBTQ.png',
          meta: {},
          rawContent: {
            "entityMap":{},"blocks":[{"key":"39eg7","text":"Getting Started.","type":"header-two","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fbjrk","text":"JavaScript is the most popular programming language in the world. It’s ubiquitous with the web we know. The rise in popularity of Node.js and a desire to make experiences across multiple platforms as seamless as possible has led to the emergence of this concept of universal JavaScript applications.Sometimes referred to as Isomorphic, Universal JavaScript applications, deliver the capability of rendering JavaScript on the server before it gets sent to the user’s browser. The benefits of rendering on the server are huge for many reasons; like search engine optimization (SEO), faster loading times, and fallbacks for when a user might have JavaScript disabled.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dh8q4","text":"Unfortunately the barrier of entry for setting up a universal JavaScript application is quite high. There are a decent amount of starter projects on GitHub that are great to look at and analyze, but not much can be found explaining the why or the how things need to be done.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]
        },
          content: `<p>This is the first of a to-be-determined series about building Boldr, a custom CMS and my experiences. I’ll be covering topics like build processes, developer experience, authentication, and all the headaches that come with security.Building a content management system (CMS) is <strong>hard. </strong></p><p>I’m not referring to building anything nearly as feature packed as WordPress or even its slimmed down Node.js cousin, Ghost. When I say building a CMS, I’m speaking about crud functionality, authentication, authorization, and user interaction<strong>. Many developers will tell you not to even try; that it is not worth the headache.</strong></p><p> I guess I somewhat of a masochist because I’m certainly enjoying it.About two or three years ago, I was moving into the “not quite advanced, but awkwardly more than intermediate” skill level of node development. I learn best by doing. In order to break down whatever barrier was between me and the<em> next level thinking</em>, I so desired, I thought it would be an excellent learning experience to build a basic CMS for my World of Warcraft guild. I accomplished everything I had hoped with this project.Fast-forward to the present.</p><p>The company I previously worked for, spent a lot of time doing custom builds for client’s using Umbraco (a .NET CMS), as the core of the project. Whenever I assisted on a project that used Umbraco, I hated it. My hatred stemmed from all of the hoops you are required to jump through in order to get most standard frontend build tools to work correctly on a Windows environment. One day, a co-worker jokingly said to me, “why don’t you just build us a node based CMS?”. A few days later, I started doing just that.…</p>`,
          published: false,
          userId: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
        }),
        knex('article').insert({
          id: 'ab33a0ca-b349-4cf8-947f-94f415149492',
          title: 'Flowtype Opaque Types',
          slug: 'flowtype-opaque-types',
          featured: false,
          excerpt: 'Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature',
          image: 'https://cdn-images-1.medium.com/max/2000/1*DQJCnm07c_MxpsFYarwwEg.jpeg',
          meta: {},
          rawContent: {
            "entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://github.com/babel/babel/pull/5990","rel":"nofollow noopener","target":"_blank","url":"https://github.com/babel/babel/pull/5990"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://flow.org/en/docs/types/opaque-types/","rel":"nofollow noopener","target":"_blank","url":"https://flow.org/en/docs/types/opaque-types/"}}},"blocks":[{"key":"5ctuu","text":"Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":73,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9887i","text":"Do you ever wish that you could hide your implementation details away from your users?Well, now all of your dreams have finally come true! Flow 0.51.0 added support for opaque type aliases, with babel support coming in the next week or so. Opaque type aliases are type aliases that hide their underlying type. You can only see an opaque type’s underlying type in the file which declares the opaque type. They’re already documented here, so we’ll spend the rest of this blog post showing just how powerful opaque type aliases can be.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":195,"length":14,"key":0},{"offset":431,"length":4,"key":1}],"data":{}},{"key":"12bhl","text":"Maintaining Invariants with Opaque Types","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":40,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ct6ko","text":"Opaque type aliases are really useful for maintaining invariants in your code. Whenever you find yourself wanting to express “things of type T where X is true,” you might want to consider using an opaque type alias.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d53nf","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a5fs","text":"As a simple example, lets consider a type for non-negative numbers:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5s25s","text":"NonNeg.js:","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"7aehc","text":"// @flow","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f0io4","text":"opaque type NonNeg = number;","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"BOLD"},{"offset":7,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}}]
          },
          content: `<h1><strong>Hiding Implementation Details With Flow’s New Opaque Type Aliases Feature</strong></h1><p>Do you ever wish that you could hide your implementation details away from your users?Well, now all of your dreams have finally come true! Flow 0.51.0 added support for opaque type aliases, with <a href="https://github.com/babel/babel/pull/5990" target="_blank">babel support </a>coming in the next week or so. Opaque type aliases are type aliases that hide their underlying type. You can only see an opaque type’s underlying type in the file which declares the opaque type. They’re already documented <a href="https://flow.org/en/docs/types/opaque-types/" target="_blank">here</a>, so we’ll spend the rest of this blog post showing just how powerful opaque type aliases can be.</p><h3><strong>Maintaining Invariants with Opaque Types</strong></h3><p>Opaque type aliases are really useful for maintaining invariants in your code. Whenever you find yourself wanting to express “things of type T where X is true,” you might want to consider using an opaque type alias.</p><p></p><p>As a simple example, lets consider a type for non-negative numbers:</p><blockquote><em>NonNeg.js:</em></blockquote><blockquote>// @flow</blockquote><blockquote><strong>opaque</strong> <strong>type</strong> NonNeg = number;</blockquote>`,
          published: true,
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('article_tag').insert({
          articleId: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
          tagId: 'b1c0d816-e8c0-4a0d-a63a-5215f02b423e',
        }),
        knex('article_tag').insert({
          articleId: 'cb61bbae-c91e-4014-b665-3485734b88fb',
          tagId: '517e9975-9dd8-44fc-80cf-cb907964a06b',
        }),
        knex('article_tag').insert({
          articleId: 'ab33a0ca-b349-4cf8-947f-94f415149492',
          tagId: 'b1c0d816-e8c0-4a0d-a63a-5215f02b423e',
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('menu').insert({
          name: 'Main',
          restricted: false,
          attributes: {},
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('menu_detail').insert({
          id: 'c0b0ea44-8d9d-4081-9655-871399b970fe',
          title: 'About',
          safeName: 'About',
          cssClassname: 'about-link',
          hasDropdown: true,
          order: 1,
          mobileHref: '/about',
          href: '/about',
          icon: 'info',
          children: {
            key: 'about-menu',
            items: [
              {
                title: 'Tech',
                safeName: 'Tech',
                id: uuid.v4(),
                href: '/about/tech',
                icon: 'change_history',
              },
              {
                title: 'Setup',
                safeName: 'Setup',
                id:  uuid.v4(),
                href: '/about/setup',
                icon: 'phonelink_setup',
              },
            ],
          },
        }),
        knex('menu_detail').insert({
          id: '79b3e678-c6d8-4824-bb50-f71a7d45be87',
          title: 'Blog',
          safeName: 'Blog',
          cssClassname: 'blog-link',
          hasDropdown: false,
          order: 2,
          mobileHref: '/blog',
          href: '/blog',
          icon: 'info',
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('menu_menu_detail').insert({
          menuId: 1,
          menuDetailId: 'c0b0ea44-8d9d-4081-9655-871399b970fe',
        }),
        knex('menu_menu_detail').insert({
          menuId: 1,
          menuDetailId: '79b3e678-c6d8-4824-bb50-f71a7d45be87',
        }),
        // prettier-ignore
      ])
    )
    .then(() =>
      Promise.all([
        knex('user_role').insert({
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
          roleId: 3,
        }),
        knex('user_role').insert({
          userId: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
          roleId: 2,
        }),
        knex('user_role').insert({
          userId: 'f4d869a6-1a75-469b-a9cc-965c552929e4',
          roleId: 1,
        }),
        // prettier-ignore
      ])
    )

    .then(() =>
      Promise.all([
        knex('setting').insert({
          key: 'siteName',
          label: 'Site Name',
          value: 'Boldr',
          description: 'The website name.',
        }),
        knex('setting').insert({
          key: 'siteUrl',
          label: 'Site URL',
          value: 'http://localhost:3000',
          description: 'The address used to access your website.',
        }),
        knex('setting').insert({
          key: 'siteLogo',
          label: 'Site Logo',
          value: 'https://boldr.io/assets/boldr-text-logo.png',
          description: 'The logo is displayed in the header area.',
        }),
        knex('setting').insert({
          key: 'siteDescription',
          label: 'Site Description',
          value: 'A modern CMS',
          description: 'Meta header for search results.',
        }),
        knex('setting').insert({
          key: 'favicon',
          label: 'Favicon',
          value: 'https://boldr.io/favicon.ico',
          description: 'Favicon to use for your website.',
        }),
        knex('setting').insert({
          key: 'googleAnalytics',
          label: 'Google Analytics ID',
          value: 'UA-323432',
          description: 'Google Analytics tracking code',
        }),
        knex('setting').insert({
          key: 'allowRegistration',
          label: 'Allow Registration',
          value: true,
          description: "Toggle allowing user's to register for accounts.",
        }),
        // prettier-ignore
      ])
    );
}

module.exports = { seed };
