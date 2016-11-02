function truncate(knex, Promise, tables) {
  return Promise.each(tables,
    (table) => knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`));
}

const tables = [
  '"user"',
  'post',
  'role',
  'user_role',
  'tag',
  'post_tag',
  'navigation',
  'link',
  'page',
  'navigation_link',
  'setting'
];

exports.seed = function(knex, Promise) {
  return truncate(knex, Promise, tables)
    .then(() => Promise.all([
      knex('role').insert({
        name: 'Member',
        description: 'A verified user without special privileges'
      }),
      knex('role').insert({
        name: 'Staff',
        description: 'Allows access to the CMS dashboard.'
      }),
      knex('role').insert({
        name: 'Admin',
        description: 'Complete control over the CMS'
      })
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
        facebook_profile: 'https://www.facebook.com',
        linkedin_profile: 'https://www.linkedin.com',
        github_profile: 'https://www.github.com',
        google_profile: 'https://www.google.com',
        twitter_profile: 'https://www.twitter.com',
        verified: true
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
        facebook_profile: 'https://www.facebook.com',
        linkedin_profile: 'https://www.linkedin.com',
        github_profile: 'https://www.github.com',
        google_profile: 'https://www.google.com',
        twitter_profile: 'https://www.twitter.com',
        verified: true
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
        facebook_profile: 'https://www.facebook.com',
        linkedin_profile: 'https://www.linkedin.com',
        github_profile: 'https://www.github.com',
        google_profile: 'https://www.google.com',
        twitter_profile: 'https://www.twitter.com',
        verified: true
      })
    ]))
    .then(() => Promise.all([
      knex('user_role').insert({
        user_id: '1b062e26-df71-48ce-b363-4ae9b966e7a0',
        role_id: 3
      }),
      knex('user_role').insert({
        user_id: 'f4d869a6-1a75-469b-a9cc-965c552929e4',
        role_id: 1
      }),
      knex('user_role').insert({
        user_id: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f',
        role_id: 2
      })
    ]))
    .then(() => Promise.all([
      knex('tag').insert({
        name: 'javascript',
        uuid: 'e00b70ec-2032-4e3f-8374-4ad544b318df',
        description: 'Something something JS'
      }),
      knex('tag').insert({
        name: 'apple',
        uuid: '4fa3b033-11c5-4500-af00-f094ef63d546',
        description: 'Stuff about stuff.'
      })
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
        background_image: 'https://boldr.io/images/dashboard.png',
        meta: {},
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when',
        status: 'published',
        user_id: '1b062e26-df71-48ce-b363-4ae9b966e7a0'
      }),
      knex('post').insert({
        id: 'cb61bbae-c91e-4014-b665-3485734b88fb',
        title: 'Nother One',
        slug: 'nother-one',
        excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        feature_image: 'https://boldr.io/image3.jpg',
        background_image: 'https://boldr.io/images/postlisting.png',
        meta: {},
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when',
        status: 'published',
        user_id: 'f11d3ebf-4ae6-4578-ba65-0c8f48b7f41f'
      }),
      knex('post').insert({
        id: 'ab33a0ca-b349-4cf8-947f-94f415149492',
        title: 'Random Post Title',
        slug: 'random-post-title',
        excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        feature_image: 'https://boldr.io/image2.jpg',
        background_image: 'https://boldr.io/images/singlepost.png',
        meta: {},
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'an unknown printer took a galley of type and scrambled it to make a type specimen book.' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when' +
        'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when',
        status: 'published',
        user_id: '1b062e26-df71-48ce-b363-4ae9b966e7a0'
      })
    ]))
    .then(() => Promise.all([
      knex('post_tag').insert({
        post_id: '5c9ed236-79f0-4ff7-93bd-2815f06c74b4',
        tag_id: 2
      }),
      knex('post_tag').insert({
        post_id: 'cb61bbae-c91e-4014-b665-3485734b88fb',
        tag_id: 1
      }),
      knex('post_tag').insert({
        post_id: 'ab33a0ca-b349-4cf8-947f-94f415149492',
        tag_id: 2
      })
    ]))
    .then(() => Promise.all([
      knex('navigation').insert({
        name: 'Main',
        uuid: '908db7f1-05b8-451f-b756-2fbe28c15976',
        label: 'main',
        restricted: false,
        location: 'header',
        dropdown: {}
      })
    ]))
    .then(() => Promise.all([
      knex('link').insert({
        name: 'About',
        uuid: '39daff4d-fbc4-438b-9d85-cdb7bb9770b8',
        label: 'about',
        position: 1,
        href: '/about',
        icon: 'info'
      }),
      knex('link').insert({
        name: 'Blog',
        uuid: '45f9dcb6-5843-412f-8079-43e55c651e38',
        label: 'blog',
        position: 2,
        href: '/blog',
        icon: 'info'
      })
    ]))
    .then(() => Promise.all([
      knex('navigation_link').insert({
        navigation_id: 1,
        link_id: 1
      }),
      knex('navigation_link').insert({
        navigation_id: 1,
        link_id: 2
      })
    ]))
    .then(() => Promise.all([
      knex('page').insert({
        id: 'c23891fb-88c2-4e91-b95d-c652f15eab0c',
        name: 'Home',
        url: 'home',
        layout: {
          showHero: true,
          showPosts: true
        },
        data: {},
        status: 'published',
        restricted: false,
        meta: {
          title: 'Home',
          description: 'The home page'
        }
      })
    ]))
    .then(() => Promise.all([
      knex('setting').insert({
        key: 'site_name',
        value: 'Boldr',
        description: 'The website name.'
      }),
      knex('setting').insert({
        key: 'site_url',
        value: 'http://localhost:3000',
        description: 'The address used to access your website.'
      }),
      knex('setting').insert({
        key: 'site_logo',
        value: 'https://boldr.io/logo.png',
        description: 'The logo is displayed in the header area.'
      }),
      knex('setting').insert({
        key: 'site_description',
        value: 'A modern CMS',
        description: 'Meta header for search results.'
      }),
      knex('setting').insert({
        key: 'favicon',
        value: 'https://boldr.io/favicon.ico',
        description: 'Favicon to use for your website.'
      }),
      knex('setting').insert({
        key: 'google_analytics',
        value: 'UA-323432',
        description: 'Google Analytics tracking code'
      })
    ]));
};
