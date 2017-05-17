/* eslint-disable */
function truncate(knex, Promise, tables) {
  return Promise.each(tables, table => knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`));
}

const tables = [
  '"user"',
  'article',
  'role',
  'tag',
  'user_role',
  'article_tag',
  'menu',
  'menu_detail',
  'template',
  'page',
  'menu_menu_detail',
  'setting',
  'template_page',
  'content_type',
  'media_type',
];

function seed(knex, Promise) {
  return truncate(knex, Promise, tables)
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
      ]))
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
      ]))
      .then(() =>
        Promise.all([
        knex('social').insert({
          userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
          facebookUrl: 'https://facebook.com',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          googleUrl: 'https://google.com',
          stackoverflowUrl: 'https://stackoverflow.com',
        }),
        knex('social').insert({
          userId: 'f4d869a6-1a75-469b-a9cc-965c552929e4',
          facebookUrl: 'https://facebook.com',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          googleUrl: 'https://google.com',
          stackoverflowUrl: 'https://stackoverflow.com',
        }),
        knex('social').insert({
          userId: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
          facebookUrl: 'https://facebook.com',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          googleUrl: 'https://google.com',
          stackoverflowUrl: 'https://stackoverflow.com',
        }),
      ]))
    .then(() =>
      Promise.all([
        knex('tag').insert({
          name: 'javascript',
          description: 'Something something JS',
        }),
        knex('tag').insert({
          name: 'apple',
          description: 'Stuff about stuff.',
        }),
      ]))
    .then(() =>
      Promise.all([
        knex('article').insert({
          id: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
          title: 'Just Another Post',
          slug: 'just-another-post',
          featured: true,
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
            'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
            'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          featureImage: 'https://boldr.io/image1.jpg',
          featureImage: 'https://boldr.io/image1.jpg',
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
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
            'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
            'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          featureImage: 'https://boldr.io/image3.jpg',
          featureImage: 'https://boldr.io/image3.jpg',
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
          excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
            'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
            'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
          featureImage: 'https://boldr.io/image2.jpg',
          featureImage: 'https://boldr.io/image2.jpg',
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
      ]))
    .then(() =>
      Promise.all([
        knex('article_tag').insert({
          articleId: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
          tagId: 2,
        }),
        knex('article_tag').insert({
          articleId: 'cb61bbae-c91e-4014-b665-3485734b88fb',
          tagId: 1,
        }),
        knex('article_tag').insert({
          articleId: 'ab33a0ca-b349-4cf8-947f-94f415149492',
          tagId: 2,
        }),
      ]))
    .then(() =>
      Promise.all([
        knex('menu').insert({
          name: 'Main',
          safeName: 'main',
          restricted: false,
          attributes: {},
        }),
      ]))
    .then(() =>
      Promise.all([
        knex('menu_detail').insert({
          name: 'About',
          safeName: 'about',
          cssClassname: 'about-link',
          hasDropdown: true,
          order: 1,
          mobileHref: 'about',
          href: 'about',
          icon: 'info',
          children: {
            key: 'about-menu',
            items: [
              {
                name: 'Tech',
                id: 'tech',
                href: 'about/tech',
                icon: 'change_history',
              },
              {
                name: 'Setup',
                id: 'setup',
                href: 'about/setup',
                icon: 'phonelink_setup',
              },
            ],
          },
        }),
        knex('menu_detail').insert({
          name: 'Blog',
          safeName: 'blog',
          cssClassname: 'blog-link',
          hasDropdown: false,
          order: 2,
          mobileHref: 'blog',
          href: 'blog',
          icon: 'info',
        }),
      ]))
    .then(() =>
      Promise.all([
        knex('menu_menu_detail').insert({
          menuId: 1,
          menuDetailId: 1,
        }),
        knex('menu_menu_detail').insert({
          menuId: 1,
          menuDetailId: 2,
        }),
      ]))
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
      ]))
    .then(() =>
      Promise.all([
        knex('template').insert({
          id: 1,
          uuid: 'c23891fb-88c2-4e91-b95d-c652f15eab0c',
          slug: 'base',
          name: 'Base',
          meta: {},
          content: {},
        }),
        knex('template').insert({
          id: 2,
          uuid: 'd42f91fb-88c2-4e91-b95d-c652f15eab0c',
          slug: 'content',
          name: 'Content',
          meta: {},
          content: {},
        }),
      ]))
    .then(() =>
      Promise.all([
        knex('page').insert({
          id: '87d1e9b3-b32e-474e-9246-6dce1b21a72d',
          name: 'Home',
          slug: 'home',
          url: 'home',
          layout: {
            showHero: true,
            showPosts: true,
          },
          data: {},
          status: 'published',
          restricted: false,
          meta: {
            title: 'Home',
            description: 'The home page',
          },
        }),
        knex('page').insert({
          id: '0a277a50-b482-4b86-b0e7-83fdd3a372af',
          name: 'About',
          slug: 'about',
          url: 'about',
          layout: {
            showHero: true,
            showPosts: true,
          },
          data: {},
          status: 'published',
          restricted: false,
          meta: {
            title: 'About',
            description: 'The about page',
          },
        }),
      ]))
    // .then(() =>
    //   Promise.all([
    //     knex('attachment').insert({
    //       id: '668e14aa-ebe6-11e6-8ebf-4f81f17749d5',
    //       url: '/uploads/file.png',
    //       userId: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
    //       safeName: 'file.png',
    //       fileName: 'file.png',
    //     }),
    //   ]))
    .then(() =>
      Promise.all([
        knex('template_page').insert({
          templateId: 1,
          pageId: '87d1e9b3-b32e-474e-9246-6dce1b21a72d',
        }),
        knex('template_page').insert({
          templateId: 2,
          pageId: '0a277a50-b482-4b86-b0e7-83fdd3a372af',
        }),
      ]))
      .then(() =>
    Promise.all([
      knex('content_type').insert({
        id: 1,
        uuid: '29f45e4b-9c66-4083-8daa-279921ec71e7',
        name: 'Page',
        safeName: 'page'
      }),
      knex('content_type').insert({
        id: 2,
        uuid: '524d6cfd-b447-443b-b758-4afee35aab50',
        name: 'Post',
        safeName: 'post'
      }),
      knex('content_type').insert({
        id: 3,
        uuid: '943d6b80-948e-4d93-a555-6f13bf581046',
        name: 'FAQ',
        safeName: 'faq'
      }),
      knex('content_type').insert({
        id: 4,
        uuid: '93a98080-fb1d-437c-9731-a66ebaece248',
        name: 'Project',
        safeName: 'project'
      }),
      knex('content_type').insert({
        id: 5,
        uuid: 'e2d2689d-d265-4e5b-b8f4-8df0feea2e05',
        name: 'Link',
        safeName: 'link'
      }),
      knex('content_type').insert({
        id: 6,
        uuid: '3f4aaba7-5835-4493-82c3-f341d5ba9c09',
        name: 'Hero',
        safeName: 'hero'
      }),
      knex('content_type').insert({
        id: 7,
        uuid: '132ee9d4-f653-4097-a311-1cc56a8629fd',
        name: 'Carousel',
        safeName: 'carousel'
      }),
    ]))
    .then(() =>
  Promise.all([
    knex('media_type').insert({
      id: 1,
      uuid: '51ad0cb8-39e9-4ee5-80ca-50ebb35b372c',
      mediaType: 'image',
    }),
    knex('media_type').insert({
      id: 2,
      uuid: '78614bdc-fd05-418e-b02c-a65e71075e70',
      mediaType: 'video',
    }),
    knex('media_type').insert({
      id: 3,
      uuid: '3f9bb6d3-241b-4087-885f-117ead57bc73',
      mediaType: 'audio',
    })
  ]))
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
      ]));
}

module.exports = {seed};
