const fs = require('fs');
const path = require('path');

const portfolios = [
  'cultural',
  'designing',
  'treasury',
  'hospitality',
  'social_media_promotions',
  'public_relations',
  'production',
  'documentation',
  'marketing'
];

const publicDir = path.join(__dirname, 'public', 'portfolios');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

portfolios.forEach(p => {
  const pDir = path.join(publicDir, p);
  fs.mkdirSync(path.join(pDir, 'leads'), { recursive: true });
  fs.mkdirSync(path.join(pDir, 'oc'), { recursive: true });
  
  const data = {
    title: p.toUpperCase().replace(/_/g, ' '),
    leads: [
      { id: `${p}-lead-1`, name: "Lead 1", role: "LEAD", image: `/portfolios/${p}/leads/1.png` },
      { id: `${p}-lead-2`, name: "Lead 2", role: "LEAD", image: `/portfolios/${p}/leads/2.png` },
      { id: `${p}-lead-3`, name: "Lead 3", role: "LEAD", image: `/portfolios/${p}/leads/3.png` }
    ],
    oc: [
      { id: `${p}-oc-1`, name: "OC 1", role: "ORGANISING COMMITTEE", image: `/portfolios/${p}/oc/1.png` },
      { id: `${p}-oc-2`, name: "OC 2", role: "ORGANISING COMMITTEE", image: `/portfolios/${p}/oc/2.png` },
      { id: `${p}-oc-3`, name: "OC 3", role: "ORGANISING COMMITTEE", image: `/portfolios/${p}/oc/3.png` },
      { id: `${p}-oc-4`, name: "OC 4", role: "ORGANISING COMMITTEE", image: `/portfolios/${p}/oc/4.png` },
      { id: `${p}-oc-5`, name: "OC 5", role: "ORGANISING COMMITTEE", image: `/portfolios/${p}/oc/5.png` }
    ]
  };

  fs.writeFileSync(path.join(pDir, 'data.json'), JSON.stringify(data, null, 2));
});
console.log('Folders created successfully');
