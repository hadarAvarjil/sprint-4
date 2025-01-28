import { setFilter } from '../store/actions/gig.actions.js'
import { httpService } from './http.service.js'
const BASE_URL = 'gig/'

export const gigService = {
  query,
  remove,
  save,
  getById,
  getDefaultFilter,
  getFilterFromParams,
}

function getFilterFromParams(searchParams) {
  const newFilterBy = gigService.getDefaultFilter()
  const isNewRefresh = false
  for (const [key, value] of searchParams) {
    newFilterBy[key] = value
    if (newFilterBy[key]) !isNewRefresh
  }
  if (isNewRefresh) setFilter({ ...filterBy, ...newFilterBy })
  return newFilterBy
}

async function query(filterBy = {}) {
  try {
    return await httpService.get(BASE_URL, filterBy)
  } catch (error) {
    console.error('Error querying gigs:', error)
    throw error
  }
}

async function getById(gigId) {
  try {
    const gig = await httpService.get(`gig/${gigId}`)
    return gig
  } catch (err) {
    console.error(`Failed to fetch gig with ID ${gigId}:`, err)
    throw err
  }
}

function remove(gigId) {
  return httpService.delete(BASE_URL + gigId)
}

function save(gig) {
  const savedGig = gig._id
    ? httpService.put(`${BASE_URL}${gig._id}`, gig)
    : httpService.post(BASE_URL, gig)
  return savedGig
}

function getDefaultFilter() {
  return {
    title: '',
    cat: '',
    min: '',
    max: '',
    level: '',
    tag: '',
    time: '',
    page: 1,
    proOnly: false,
  };
}

export const filterKeyMap = {
  search: 'search',
  time: 'time',
  min: 'min',
  max: 'max',
  level: 'level',
  cat: 'cat',
  tag: 'tag',
}
export const deliveryTime = ['Express 24H', 'Up to 3 days', 'Up to 7 days']
export const levels = ['New Seller', 'Level 1', 'Level 2', 'Pro Talent']
export const budget = ['min', 'max']

export const category = [
  'Graphics & Design',
  'Programming & Tech',
  'Digital Marketing',
  'Video & Animation',
  'Writing & Translation',
  'Music & Audio',
  'Business',
  'Data',
  'Photography',
  'AI Services',
]
export const subcategories = {
  Graphics_And_Design: [
    'Logo & Brand Identity',
    'Art & Illustration',
    'Web & App Design',
    'Product & Gaming',
    'Print Design',
    'Visual Design',
    'Marketing Design',
    'Packaging & Covers',
    'Architecture & Building Design',
    'Fashion & Merchandise',
    '3D Design',
  ],
  Programming_And_Tech: [
    'Website Development',
    'Website Platforms',
    'Website Maintenance',
    'Software Development',
    'Software Developers',
    'QA & Review',
    'Mobile App Development',
    'Game Development',
    'Support & Cybersecurity',
    'AI Development',
    'Chatbots',
  ],
  Digital_Marketing: [
    'Search Marketing',
    'Social Marketing',
    'Methods & Techniques',
    'Analytics & Strategy',
    'Industry & Purpose-Specific',
  ],
  Video_And_Animation: [
    'Editing & Post-Production',
    'Social & Marketing Videos',
    'Animation',
    'Filmed Video Production',
    'Explainer Videos',
    'Product Videos',
    'AI Video',
  ],
  Writing_And_Translation: [
    'Content Writing',
    'Editing & Critique',
    'Business & Marketing Copy',
    'Translation & Transcription',
  ],
  Music_And_Audio: [
    'Music Production & Writing',
    'Audio Engineering & Post Production',
    'Voice Over & Narration',
    'Streaming & Audio',
    'DJing',
    'Sound Design',
    'Lessons & Transcriptions',
  ],
  Business: [
    'Business Formation',
    'Business Growth',
    'General & Administrative',
    'Legal Services',
    'Sales & Customer Care',
    'Professional Development',
    'Accounting & Finance',
  ],
  Data: [
    'Data Science & ML',
    'Data Analysis',
    'Data Collection',
    'Data Management',
  ],
  Photography: ['Products & Lifestyle', 'People & Scenes', 'Local Photography'],
  AI_Services: [
    'Build your AI app',
    'Refine AI with experts',
    'AI Artists',
    'Creative services',
    'Data Science & ML',
    'Get your data right',
  ],
}
export const packages = {
  basic: {
    price: 173.18,
    description: '3 logo designs with white and transparent backgrounds (JPEG PNG) + Source file (.ai)',
    delivery: '4-day delivery',
    deliveryTime: 4,
    revisions: '3 Revisions',
    features: ['3 logo designs', 'Transparent backgrounds', 'Source file (.ai)'],
  },
  standard: {
    price: 350.00,
    description: '5 logo designs with multiple variations, white & transparent backgrounds (JPEG PNG) + Source file (.ai)',
    delivery: '3-day delivery',
    deliveryTime: 3,
    revisions: '5 Revisions',
    features: ['5 logo designs', 'Multiple variations', 'Transparent backgrounds', 'Source file (.ai)'],
  },
  premium: {
    price: 600.00,
    description: 'Unlimited logo designs with premium support, white & transparent backgrounds (JPEG PNG) + Source file (.ai)',
    delivery: '2-day delivery',
    deliveryTime: 2,
    revisions: 'Unlimited Revisions',
    features: ['Unlimited designs', 'Premium support', 'Transparent backgrounds', 'Source file (.ai)'],
  },
}