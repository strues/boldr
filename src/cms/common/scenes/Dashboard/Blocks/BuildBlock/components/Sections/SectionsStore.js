export default {
  get(section) {
    if (section === 'section1') {
      return {
        type: '1',
        data: {
          title: '',
          subTitle: '',
          linkImage: '',
        },
        edit: true,
      }
    }
    if (section === 'section2') {
      return {
        type: '2',
        data: {
          title: '',
          subTitle: '',
          backgroundColor: '',
          buttonLink: '',
          buttonTarget: '_self',
          buttonLabel: '',
        },
        edit: true,
      }
    }
    if (section === 'section3') {
      return {
        type: '3',
        data: {
          createdAt: '',
          linkImage1: '',
          linkImage2: '',
          linkImage3: '',
        },
        edit: true,
      }
    }

    throw new Error(`This section doesn't exist: ${section}`)
  },
}
