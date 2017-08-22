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
          title: 'Just Another Post',
          slug: 'just-another-post',
          featured: true,
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: 'https://boldr.io/image1.jpg',
          meta: {},
          content: `<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>`,
          published: true,
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        }),
        knex('article').insert({
          id: 'cb61bbae-c91e-4014-b665-3485734b88fb',
          title: 'Nother One',
          slug: 'nother-one',
          featured: false,
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: 'https://boldr.io/image3.jpg',
          meta: {},
          content: `<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>`,
          published: false,
          userId: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
        }),
        knex('article').insert({
          id: 'ab33a0ca-b349-4cf8-947f-94f415149492',
          title: 'Random Post Title',
          slug: 'random-post-title',
          featured: false,
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: 'https://boldr.io/image2.jpg',
          meta: {},
          content: `<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>`,
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
