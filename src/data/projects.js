function createMedia(source, defaults = {}) {
  if (!source) {
    return { ...defaults }
  }

  if (typeof source === 'string') {
    return {
      ...defaults,
      type: 'image',
      src: source,
    }
  }

  return {
    ...defaults,
    ...source,
  }
}

function createProjectLayout({
  hero,
  galleryPrimary,
  gallerySecondary,
  featureShowcase,
  wireframePrimary,
  wireframeSecondary,
}) {
  return {
    hero: createMedia(hero, {
      alt: 'Hero preview',
      objectFit: 'contain',
      objectPosition: 'center',
    }),
    galleryTop: [
      createMedia(galleryPrimary, {
        alt: 'Desktop preview',
        objectFit: 'contain',
        objectPosition: 'center',
      }),
      createMedia(gallerySecondary, {
        alt: 'Secondary mockup',
        objectFit: 'contain',
        objectPosition: 'center',
      }),
    ],
    featureShowcase: createMedia(featureShowcase, {
      alt: 'Feature showcase',
      aspectRatio: '1.72 / 1',
      objectFit: 'contain',
      objectPosition: 'center',
    }),
    wireframeGallery: [
      createMedia(wireframePrimary, {
        alt: 'Wireframe primary',
        objectFit: 'contain',
        objectPosition: 'center',
      }),
      createMedia(wireframeSecondary, {
        alt: 'Wireframe secondary',
        objectFit: 'contain',
        objectPosition: 'center',
      }),
    ],
  }
}

export const projects = [
  {
    num: '01',
    slug: 'smart-mannequin-research-project',
    title: 'Smart Mannequin Research Project',
    titleLines: ['SMART MANNEQUIN', 'RESEARCH PROJECT'],
    shortType: 'IoT · Research · Smart System',
    tags: ['IOT HARDWARE ENGINEER', 'DATA ANALYST', 'RESEARCH'],
    detailRoles: ['IoT Hardware Engineer', 'Data Analyst', 'Research'],
    year: '2022',
    img: '/images/sm photo.png',
    overlayLabel: 'SMART MANNEQUIN',
    description:
      'Smart Mannequin is a smart dummy with the anthropometry of Indonesian soldiers, designed to measure the ergonomic factors of combat vehicles. It measures comfort and safety factors, focusing on passenger safety and occupational health in combat vehicles. Developed and researched by CoE STAS RG.',
    layout: createProjectLayout({
      hero: {
        type: 'video',
        src: '/video/SM clip.mp4',
        poster: '/images/sm photo.png',
        objectFit: 'cover',
      },
      galleryPrimary: '/images/smart_mannequin/sm_primary.png',
      gallerySecondary: '/images/smart_mannequin/sm_secondary.png',
      featureShowcase: '/images/smart_mannequin/sm_third.png',
      wireframePrimary: '/images/smart_mannequin/sm_fourth.png',
      wireframeSecondary: '/images/smart_mannequin/sm_fifth.png',
    }),
  },
  {
    num: '02',
    slug: 'sm-monitoring-dashboard-ui-design',
    title: 'SM Monitoring Dashboard UI Design',
    titleLines: ['SM MONITORING', 'DASHBOARD UI DESIGN'],
    shortType: 'UI Design · Dashboard',
    tags: ['UI DESIGN', 'DASHBOARD DESIGN', 'DATA VISUALIZATION'],
    detailRoles: ['UI/UX Designer', 'Data Visualization Analyst'],
    year: '2023',
    img: '/images/dashboard photo.png',
    overlayLabel: 'SM DASHBOARD',
    description:
      'Smart Mannequin Monitoring Dashboard is an intuitive interface built to visualize real-time data from smart mannequin systems. The design focuses on clarity, responsiveness, and usability, allowing users to monitor sensor activity, analyze performance, and gain insights through clean data visualization and thoughtful interaction design.',
    layout: createProjectLayout({
      hero: '/images/dashboard/Frame 241.png',
      galleryPrimary: '/images/dashboard/Frame 244.png',
      gallerySecondary: '/images/dashboard/Frame 243.png',
      featureShowcase: '/images/dashboard/Frame 242.png',
      wireframePrimary: '/images/dashboard/Frame 246.png',
      wireframeSecondary: '/images/dashboard/Frame 245.png',
    }),
  },
  {
    num: '03',
    slug: 'vr-research-product-overview',
    title: 'VR Research Product Overview',
    titleLines: ['VR RESEARCH', 'PRODUCT OVERVIEW'],
    shortType: 'VR · UI Design',
    tags: ['VIRTUAL REALITY', 'VR UI DESIGN', 'OVERVIEW'],
    detailRoles: ['UI/UX Designer', 'VR UI Designer'],
    year: '2024',
    img: '/images/vr photo.png',
    overlayLabel: 'VR RESEARCH',
    description:
      'VR Research Product Overview is a virtual interface designed to showcase multiple research innovations through immersive storytelling. Built with user experience in mind, the design bridges technology and interactivity, enabling audiences to explore products such as Smart Mannequin and Automation Weapon Rack in a fully virtual environment that enhances understanding and engagement.',
    layout: createProjectLayout({
      hero: '/images/vr/vr_hero.png',
      galleryPrimary: '/images/vr/vr_primary.png',
      gallerySecondary: '/images/vr/vr_secondary.png',
      featureShowcase: '/images/vr/vr_third.png',
      wireframePrimary: '/images/vr/vr_fourth.png',
      wireframeSecondary: '/images/vr/vr_fifth.png',
    }),
  },
  {
    num: '04',
    slug: 'siptech-company-profile-web-design',
    title: 'Siptech Company Profile Web Design',
    titleLines: ['SIPTECH', 'COMPANY PROFILE WEB DESIGN'],
    shortType: 'Web Design · Company Profile',
    tags: ['COMPANY PROFILE', 'WEB DESIGN', 'BRANDING'],
    detailRoles: ['UI/UX Designer', 'Web Designer'],
    year: '2025',
    img: '/images/siptech/siptech_photo.png',
    overlayLabel: 'SIPTECH',
    description:
      'PT Sintesa Persada Teknologi is a company operating in the information technology sector, specialising in the development of digital solutions to support clients, operational needs, and business transformation.',
    layout: createProjectLayout({
      hero: {
        type: 'video',
        src: '/video/mockup siptech clip.mp4',
        poster: '/images/siptech/siptech_hero.png',
        objectFit: 'cover',
      },
      galleryPrimary: '/images/siptech/siptech_primary.png',
      gallerySecondary: '/images/siptech/siptech_secondary.png',
      featureShowcase: '/images/siptech/siptech_third.png',
      wireframePrimary: '/images/siptech/siptech_fourth.png',
      wireframeSecondary: '/images/siptech/siptech_fifth.png',
    }),
  },
  {
    num: '05',
    slug: 'medisin-product-web-design',
    title: 'Medisin Product Web Design',
    titleLines: ['MEDISIN', 'WEB DESIGN'],
    shortType: 'Web Design · Product Profile',
    tags: ['PRODUCT PROFILE', 'WEB DESIGN', 'BRANDING'],
    detailRoles: ['UI/UX Designer', 'Web Designer'],
    year: '2025',
    img: '/images/medisin/medisin_photo.png',
    overlayLabel: 'MEDISIN',
    description:
      'Medisin is a healthcare management platform—comprising an Electronic Medical Records (EMR) application and a Management Information System—specifically designed to meet the needs of private practices, clinics, community health centres, laboratories and hospitals in managing patient data, examinations, administration and reporting in an integrated and efficient manner.',
    layout: createProjectLayout({
      hero: '/images/medisin/medisin_hero.png',
      galleryPrimary: '/images/medisin/medisin_primary.png',
      gallerySecondary: '/images/medisin/medisin_secondary.png',
      featureShowcase: '/images/medisin/medisin_third.png',
      wireframePrimary: '/images/medisin/medisin_fourth.png',
      wireframeSecondary: '/images/medisin/medisin_fifth.png',
    }),
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
