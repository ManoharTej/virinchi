const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'portfolios');

const portfoliosData = {
  cultural: {
    title: 'CULTURAL',
    leads: [
      { id: 'cultural-colead-1', name: 'Shreeshma Netha', role: 'CO-LEAD', image: '/portfolios/cultural/leads/colead1.png' },
      { id: 'cultural-lead-1', name: 'Vijitha Bachu', role: 'LEAD', image: '/portfolios/cultural/leads/lead.png' },
      { id: 'cultural-colead-2', name: 'N Komal Kanishik', role: 'CO-LEAD', image: '/portfolios/cultural/leads/colead2.png' }
    ],
    oc: [
      { id: 'cultural-oc-1', name: 'M Hasini', role: 'ORGANISING COMMITTEE', image: '/portfolios/cultural/oc/1.png' },
      { id: 'cultural-oc-2', name: 'G Divyasri', role: 'ORGANISING COMMITTEE', image: '/portfolios/cultural/oc/2.png' },
      { id: 'cultural-oc-3', name: 'P Siddharth', role: 'ORGANISING COMMITTEE', image: '/portfolios/cultural/oc/3.png' }
    ]
  },
  documentation: {
    title: 'DOCUMENTATION',
    leads: [
      { id: 'doc-lead-1', name: 'P Rishitha', role: 'LEAD', image: '/portfolios/documentation/leads/lead.png' },
      { id: 'doc-colead-1', name: 'U Sai Charan', role: 'CO-LEAD', image: '/portfolios/documentation/leads/colead1.png' }
    ],
    oc: [
      { id: 'doc-oc-1', name: 'A. Shiva Sai', role: 'ORGANISING COMMITTEE', image: '/portfolios/documentation/oc/1.png' },
      { id: 'doc-oc-2', name: 'M Sri Harshini', role: 'ORGANISING COMMITTEE', image: '/portfolios/documentation/oc/2.png' },
      { id: 'doc-oc-3', name: 'B Sahasra', role: 'ORGANISING COMMITTEE', image: '/portfolios/documentation/oc/3.png' }
    ]
  },
  social_media_promotions: {
    title: 'SOCIAL MEDIA PROMOTIONS',
    leads: [
      { id: 'smp-colead-1', name: 'Moses', role: 'CO-LEAD', image: '/portfolios/social_media_promotions/leads/colead1.png' },
      { id: 'smp-lead-1', name: 'Saiteja Kathi', role: 'LEAD', image: '/portfolios/social_media_promotions/leads/lead.png' },
      { id: 'smp-colead-2', name: 'T Vinay', role: 'CO-LEAD', image: '/portfolios/social_media_promotions/leads/colead2.png' }
    ],
    oc: [
      { id: 'smp-oc-1', name: 'Nikhil Chirra', role: 'ORGANISING COMMITTEE', image: '/portfolios/social_media_promotions/oc/1.png' },
      { id: 'smp-oc-2', name: 'P Hansh Sagar', role: 'ORGANISING COMMITTEE', image: '/portfolios/social_media_promotions/oc/2.png' },
      { id: 'smp-oc-3', name: 'S Deepak', role: 'ORGANISING COMMITTEE', image: '/portfolios/social_media_promotions/oc/3.png' }
    ]
  },
  public_relations: {
    title: 'PUBLIC RELATIONS',
    leads: [
      { id: 'pr-lead-1', name: 'E Praharshith', role: 'LEAD', image: '/portfolios/public_relations/leads/lead.png' },
      { id: 'pr-colead-1', name: 'T Veni', role: 'CO-LEAD', image: '/portfolios/public_relations/leads/colead1.png' }
    ],
    oc: [
      { id: 'pr-oc-1', name: 'B Hansika', role: 'ORGANISING COMMITTEE', image: '/portfolios/public_relations/oc/1.png' }
    ]
  },
  marketing: {
    title: 'MARKETING',
    leads: [
      { id: 'mkt-lead-1', name: 'Satvika Shetty', role: 'LEAD', image: '/portfolios/marketing/leads/lead.png' },
      { id: 'mkt-colead-1', name: 'Sriteja Goudi', role: 'CO-LEAD', image: '/portfolios/marketing/leads/colead1.png' }
    ],
    oc: [
      { id: 'mkt-oc-1', name: 'Kruthi kuntla', role: 'ORGANISING COMMITTEE', image: '/portfolios/marketing/oc/1.png' },
      { id: 'mkt-oc-2', name: 'N Yasaswini', role: 'ORGANISING COMMITTEE', image: '/portfolios/marketing/oc/2.png' },
      { id: 'mkt-oc-3', name: 'Rohith', role: 'ORGANISING COMMITTEE', image: '/portfolios/marketing/oc/3.png' }
    ]
  },
  hospitality: {
    title: 'HOSPITALITY',
    leads: [
      { id: 'hosp-lead-1', name: 'K Suraj Rao', role: 'LEAD', image: '/portfolios/hospitality/leads/lead.png' },
      { id: 'hosp-colead-1', name: 'G Varun Kumar', role: 'CO-LEAD', image: '/portfolios/hospitality/leads/colead1.png' }
    ],
    oc: [
      { id: 'hosp-oc-1', name: 'K Vasavi', role: 'ORGANISING COMMITTEE', image: '/portfolios/hospitality/oc/1.png' },
      { id: 'hosp-oc-2', name: 'Ch. Akshaya Reddy', role: 'ORGANISING COMMITTEE', image: '/portfolios/hospitality/oc/2.png' }
    ]
  },
  production: {
    title: 'PRODUCTION',
    leads: [
      { id: 'prod-colead-1', name: 'M Aravind', role: 'CO-LEAD', image: '/portfolios/production/leads/colead1.png' },
      { id: 'prod-lead-1', name: 'A Jayanth', role: 'LEAD', image: '/portfolios/production/leads/lead.png' },
      { id: 'prod-colead-2', name: 'Bharath Kumar', role: 'CO-LEAD', image: '/portfolios/production/leads/colead2.png' }
    ],
    oc: [
      { id: 'prod-oc-1', name: 'R Manikesh', role: 'ORGANISING COMMITTEE', image: '/portfolios/production/oc/1.png' },
      { id: 'prod-oc-2', name: 'G Harshith', role: 'ORGANISING COMMITTEE', image: '/portfolios/production/oc/2.png' },
      { id: 'prod-oc-3', name: 'V Manasa', role: 'ORGANISING COMMITTEE', image: '/portfolios/production/oc/3.png' }
    ]
  },
  designing: {
    title: 'DESIGNING',
    leads: [
      { id: 'des-colead-1', name: 'K. Abhilash', role: 'CO-LEAD', image: '/portfolios/designing/leads/colead1.png' },
      { id: 'des-lead-1', name: 'P Shruthi', role: 'LEAD', image: '/portfolios/designing/leads/lead.png' },
      { id: 'des-colead-2', name: 'G. Harshal', role: 'CO-LEAD', image: '/portfolios/designing/leads/colead2.png' }
    ],
    oc: [
      { id: 'des-oc-1', name: 'S Bhavana Keerthi', role: 'ORGANISING COMMITTEE', image: '/portfolios/designing/oc/1.png' },
      { id: 'des-oc-2', name: 'Dharma Vardhan', role: 'ORGANISING COMMITTEE', image: '/portfolios/designing/oc/2.png' },
      { id: 'des-oc-3', name: 'Harshitha Chowdary', role: 'ORGANISING COMMITTEE', image: '/portfolios/designing/oc/3.png' }
    ]
  },
  treasury: {
    title: 'TREASURY',
    leads: [
      { id: 'treas-lead-1', name: 'Abhiram', role: 'LEAD', image: '/portfolios/treasury/leads/lead.png' }
    ],
    oc: [
      { id: 'treas-oc-1', name: 'Ajay kumar', role: 'ORGANISING COMMITTEE', image: '/portfolios/treasury/oc/1.png' },
      { id: 'treas-oc-2', name: 'Manishchary', role: 'ORGANISING COMMITTEE', image: '/portfolios/treasury/oc/2.png' }
    ]
  }
};

Object.entries(portfoliosData).forEach(([p, data]) => {
  const pDir = path.join(publicDir, p);
  fs.writeFileSync(path.join(pDir, 'data.json'), JSON.stringify(data, null, 2));
});
console.log('Updated JSON files');
