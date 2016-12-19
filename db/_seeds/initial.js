function truncate(knex, Promise, tables) {
  return Promise.each(tables,
    (table) => knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`));
}

const tables = [
  '"user"',
  'post',
  'role',
  'tag',
  'post_tag',
  'navigation',
  'link',
  'page',
  'navigation_link',
  'setting',
];

function seed(knex, Promise) {
  return truncate(knex, Promise, tables)
    .then(() => Promise.all([
      knex('role').insert({
        name: 'Member',
        description: 'A verified user without special privileges',
        uuid: 'a0664851-cada-44ed-a60c-7234f9bfa74d',
      }),
      knex('role').insert({
        name: 'Staff',
        description: 'Allows access to the CMS dashboard.',
        uuid: 'bf0cafe5-808f-4a87-932c-da26cb9bae31',
      }),
      knex('role').insert({
        name: 'Admin',
        description: 'Complete control over the CMS',
        uuid: '9b490322-26aa-4374-8840-1d010f406d8c',
      }),
    ]))
    .then(() => Promise.all([
      knex('user').insert({
        id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        email: 'admin@boldr.io',
        password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
        first_name: 'Joe',
        last_name: 'Gray',
        display_name: 'Joey',
        avatar_url: 'https://boldr.io/images/unknown-avatar.png',
        location: 'Colorado',
        bio: 'I am me.',
        website: 'https://boldr.io',
        profile_image: 'https://boldr.io/images/unknown-avatar.png',
        birthday: '01/01/1988',
        role: 3,
        verified: true,
      }),
      knex('user').insert({
        id: 'f4d869a6-1a75-469b-a9cc-965c552929e4',
        email: 'user@boldr.io',
        password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
        first_name: 'Jessica',
        last_name: 'Smith',
        display_name: 'Jess',
        avatar_url: 'https://boldr.io/images/unknown-avatar.png',
        location: 'Washington',
        bio: 'Just a person',
        website: 'https://boldr.io',
        profile_image: 'https://boldr.io/images/unknown-avatar.png',
        birthday: '01/01/1988',
        role: 1,
        verified: true,
      }),
      knex('user').insert({
        id: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
        email: 'demo@boldr.io',
        password: '$2a$10$F3/Xx3hWEpTdaP4fE/dIhOb.FtxRiYMuc80nQFPkSrsBH4L6B5.Ka',
        first_name: 'Sam',
        last_name: 'Hunt',
        display_name: 'Samus',
        avatar_url: 'https://boldr.io/images/unknown-avatar.png',
        location: 'California',
        bio: 'Someone doing things.',
        website: 'https://boldr.io',
        profile_image: 'https://boldr.io/images/unknown-avatar.png',
        birthday: '01/01/1988',
        role: 2,
        verified: true,
      }),
    ]))
    .then(() => Promise.all([
      knex('tag').insert({
        name: 'javascript',
        description: 'Something something JS',
        uuid: '53fbcad9-f76b-4267-8c7a-0b5f17c56386',
      }),
      knex('tag').insert({
        name: 'apple',
        description: 'Stuff about stuff.',
        uuid: 'd4743d4c-ff99-4ab5-962a-82f41cf7696c',
      }),
    ]))
    .then(() => Promise.all([
      knex('post').insert({
        id: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
        title: 'Just Another Post',
        slug: 'just-another-post',
        excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        feature_image: 'https://boldr.io/image1.jpg',
        meta: {},
        content: `<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>`,
        status: 'published',
        user_id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
      }),
      knex('post').insert({
        id: 'cb61bbae-c91e-4014-b665-3485734b88fb',
        title: 'Nother One',
        slug: 'nother-one',
        excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        feature_image: 'https://boldr.io/image3.jpg',
        meta: {},
        content: `<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>`,
        status: 'published',
        user_id: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
      }),
      knex('post').insert({
        id: 'ab33a0ca-b349-4cf8-947f-94f415149492',
        title: 'Random Post Title',
        slug: 'random-post-title',
        excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        feature_image: 'https://boldr.io/image2.jpg',
        meta: {},
        content: `<h1>Lorem ipsum dolor sit amet.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis sapien in est aliquam lacinia. Donec fringilla odio nulla, sagittis egestas dolor bibendum ut. Proin eget massa mattis, dictum enim vitae, facilisis eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum imperdiet varius ante. Maecenas sit amet luctus sapien, quis aliquet purus. Cras malesuada quam a dui pretium fermentum. Quisque tempor interdum quam, eu lacinia turpis interdum id. Curabitur non mauris lobortis, mattis nulla id, viverra nisi. Phasellus eget porttitor lorem. Quisque facilisis nec arcu eu fringilla. Vivamus elit ipsum, viverra eu maximus a, venenatis nec nibh.Suspendisse iaculis auctor fermentum. Sed suscipit ante nisl, nec iaculis magna consequat vel. Quisque viverra est a justo egestas, euismod egestas metus hendrerit.</p>
<p><br></p>
<blockquote>&nbsp;In ultricies sagittis ex a dapibus. Nunc feugiat lorem non tincidunt euismod. Duis quam nibh, volutpat sit amet enim non, eleifend ullamcorper diam. Etiam iaculis ante ut libero sollicitudin, eget eleifend nulla gravida. Pellentesque ut gravida augue. Donec nibh orci, rutrum nec sapien eu, lacinia pretium nulla. Nunc turpis sem, placerat ac velit sit amet, aliquet ultrices metus.Curabitur mollis venenatis lectus, at elementum felis dapibus non. Sed vel finibus mauris. Aenean semper arcu lectus, porta feugiat urna tincidunt congue. Ut euismod finibus massa quis condimentum. Vivamus interdum velit nec varius consectetur. Vivamus sodales commodo ante, vel fringilla nunc finibus et. Phasellus non sem finibus, congue nibh ut, ornare tortor.Curabitur sapien est, accumsan at justo a, porta malesuada risus. Integer facilisis viverra mauris condimentum finibus.</blockquote>
<p><br></p>
<p>&nbsp;Donec eget tortor id ipsum maximus commodo nec eu quam. Aliquam erat volutpat. Nunc tincidunt est sit amet justo placerat egestas. Vestibulum efficitur, neque tempor feugiat lacinia, turpis ex efficitur urna, ullamcorper porta ligula lorem id neque. Quisque interdum risus at nisl finibus varius. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.In euismod gravida tortor in placerat. Aenean blandit blandit efficitur. Cras a accumsan augue, at tincidunt massa. Vivamus eleifend sem sed nibh tempor laoreet. Quisque blandit turpis vitae bibendum mattis. Nulla sagittis quam eget diam feugiat ultricies. Aliquam varius tellus et turpis viverra tempus. Nam sit amet ex suscipit, convallis tortor at, malesuada felis. Vestibulum arcu eros, bibendum sit amet tempus placerat, pharetra nec tortor. Ut scelerisque quam non magna tincidunt, nec varius massa blandit.</p>
<p><br></p>`,
        status: 'published',
        user_id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
      }),
    ]))
    .then(() => Promise.all([
      knex('post_tag').insert({
        post_id: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
        tag_id: 2,
      }),
      knex('post_tag').insert({
        post_id: 'cb61bbae-c91e-4014-b665-3485734b88fb',
        tag_id: 1,
      }),
      knex('post_tag').insert({
        post_id: 'ab33a0ca-b349-4cf8-947f-94f415149492',
        tag_id: 2,
      }),
    ]))
    .then(() => Promise.all([
      knex('navigation').insert({
        name: 'Main',
        uuid: '908db7f1-05b8-451f-b756-2fbe28c15976',
        label: 'main',
        restricted: false,
        location: 'header',
        dropdown: {},
      }),
    ]))
    .then(() => Promise.all([
      knex('link').insert({
        name: 'About',
        uuid: '39daff4d-fbc4-438b-9d85-cdb7bb9770b8',
        label: 'about',
        position: 1,
        href: '/about',
        icon: 'info',
      }),
      knex('link').insert({
        name: 'Blog',
        uuid: '45f9dcb6-5843-412f-8079-43e55c651e38',
        label: 'blog',
        position: 2,
        href: '/blog',
        icon: 'info',
      }),
    ]))
    .then(() => Promise.all([
      knex('navigation_link').insert({
        navigation_id: 1,
        link_id: 1,
      }),
      knex('navigation_link').insert({
        navigation_id: 1,
        link_id: 2,
      }),
    ]))
    .then(() => Promise.all([
      knex('page').insert({
        id: 'c23891fb-88c2-4e91-b95d-c652f15eab0c',
        name: 'Home',
        label: 'home',
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
    ]))
    .then(() => Promise.all([
      knex('setting').insert({
        key: 'site_name',
        value: 'Boldr',
        description: 'The website name.',
        uuid: '96cbccae-bb62-4895-961a-7966839146aa',
      }),
      knex('setting').insert({
        key: 'site_url',
        value: 'http://localhost:3000',
        description: 'The address used to access your website.',
        uuid: '0c60d1e4-cc19-459c-a31c-2e7cf91fc4f4',
      }),
      knex('setting').insert({
        key: 'site_logo',
        value: 'https://boldr.io/logo.png',
        description: 'The logo is displayed in the header area.',
        uuid: 'd54d7c6f-5869-414f-a2e1-b0458a2fb828',
      }),
      knex('setting').insert({
        key: 'site_description',
        value: 'A modern CMS',
        description: 'Meta header for search results.',
        uuid: 'e8ed37d2-2b72-4777-8839-4ff12b15c1b4',
      }),
      knex('setting').insert({
        key: 'favicon',
        value: 'https://boldr.io/favicon.ico',
        description: 'Favicon to use for your website.',
        uuid: 'a746b40a-3939-45d7-a3e0-35b26a4c3707',
      }),
      knex('setting').insert({
        key: 'google_analytics',
        value: 'UA-323432',
        description: 'Google Analytics tracking code',
        uuid: 'e5cf6945-3ba1-4cf6-a7e6-eb836b652d54',
      }),
      knex('setting').insert({
        key: 'allow_registration',
        value: true,
        description: 'Toggle allowing user\'s to register for accounts.',
        uuid: 'b86c5e47-71f6-4946-b0b7-546abedf74ae',
      }),
    ]));
}

module.exports = { seed };
