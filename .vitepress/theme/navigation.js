export const serviceNav = [
  { text: 'Evaluate', href: '/getting-started/what-is-hof' },
  { text: 'Start building', href: '/getting-started/create-new-hof-service' },
  { text: 'Guides', href: '/building-services/application-structure' },
  { text: 'Behaviours', href: '/behaviours/' },
  { text: 'Reference', href: '/reference/configuration' },
  { text: 'Operations', href: '/operations/sessions-and-redis' }
];

export const sections = [
  {
    text: 'Evaluate HOF',
    items: [
      { text: 'What is HOF?', href: '/getting-started/what-is-hof' },
      { text: 'What HOF offers', href: '/getting-started/what-hof-offers' },
      { text: 'Is HOF right for me?', href: '/getting-started/is-hof-right-for-me' },
      { text: 'Core concepts', href: '/getting-started/core-concepts' },
      { text: 'Requirements', href: '/getting-started/requirements' }
    ]
  },
  {
    text: 'Start building',
    items: [
      { text: 'Create a new HOF service', href: '/getting-started/create-new-hof-service' },
      { text: 'First application', href: '/getting-started/first-application' },
      { text: 'Build a simple form', href: '/tutorials/build-a-simple-form' },
      { text: 'Add conditional routing', href: '/tutorials/add-conditional-routing' },
      { text: 'Submit data to an API', href: '/tutorials/submit-data-to-an-api' }
    ]
  },
  {
    text: 'Building services',
    items: [
      { text: 'Application structure', href: '/building-services/application-structure' },
      { text: 'Routes, steps and fields', href: '/building-services/routes-steps-fields' },
      { text: 'Validation', href: '/building-services/validation' },
      { text: 'Formatters', href: '/building-services/formatters' },
      { text: 'Conditional routing and fields', href: '/building-services/conditional-routing-and-fields' },
      { text: 'Static pages', href: '/building-services/static-pages' },
      { text: 'Translations', href: '/building-services/translations' }
    ]
  },
  {
    text: 'Extending HOF',
    items: [
      { text: 'Controller lifecycle', href: '/extending-hof/controller-lifecycle' },
      { text: 'Models and API integration', href: '/extending-hof/models-and-api-integration' },
      { text: 'Middleware', href: '/extending-hof/middleware' }
    ]
  },
  {
    text: 'Behaviours and components',
    items: [
      { text: 'Behaviours overview', href: '/behaviours/' },
      { text: 'Built-in behaviours and components', href: '/behaviours/built-in' },
      { text: 'Complete', href: '/behaviours/complete' },
      { text: 'Summary', href: '/behaviours/summary' },
      { text: 'Clear session', href: '/behaviours/clear-session' },
      { text: 'Notify', href: '/behaviours/notify' },
      { text: 'Session timeout warning', href: '/behaviours/session-timeout-warning' },
      { text: 'Address lookup', href: '/behaviours/address-lookup' },
      { text: 'Combine and loop fields', href: '/behaviours/combine-and-loop-fields' },
      { text: 'Home Office countries', href: '/behaviours/homeoffice-countries' },
      { text: 'Date component', href: '/behaviours/date' },
      { text: 'Amount with unit select', href: '/behaviours/amount-with-unit-select' }
    ]
  },
  {
    text: 'Reference',
    items: [
      { text: 'Configuration', href: '/reference/configuration' },
      { text: 'Validators', href: '/reference/validators' },
      { text: 'Formatters', href: '/reference/formatters' },
      { text: 'Deprecations', href: '/reference/deprecations' }
    ]
  },
  {
    text: 'Operations',
    items: [
      { text: 'Sessions and Redis', href: '/operations/sessions-and-redis' },
      { text: 'Security', href: '/operations/security' },
      { text: 'Health checks', href: '/operations/health-checks' },
      { text: 'Deployment', href: '/operations/deployment' },
      { text: 'Troubleshooting', href: '/operations/troubleshooting' }
    ]
  },
  {
    text: 'Architecture and migration',
    items: [
      { text: 'Framework overview', href: '/architecture/framework-overview' },
      { text: 'Request lifecycle', href: '/architecture/request-lifecycle' },
      { text: 'Upgrading HOF', href: '/migration/upgrading-hof' },
      { text: 'Version 24', href: '/migration/v24' },
      { text: 'Documentation standards', href: '/contributing/documentation-standards' }
    ]
  }
];

export const flatDocs = sections.flatMap(section =>
  section.items.map(item => ({ ...item, section: section.text }))
);
