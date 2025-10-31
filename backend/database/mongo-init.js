// MongoDB initialization script for Race Calendar
db = db.getSiblingDB('race_calendar');

// Create collections
db.createCollection('events');
db.createCollection('categories');

// Create indexes for events
db.events.createIndex({ date: 1, categoryId: 1 });
db.events.createIndex({ title: 'text', description: 'text' });

// Create indexes for categories
db.categories.createIndex({ name: 1 }, { unique: true });

// Insert default Motorsports categories
db.categories.insertMany([
  {
    name: 'Formula 1',
    color: '#e10600',
    icon: '🏎️',
    description: 'Formula 1 Grand Prix races',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'MotoGP',
    color: '#ff6600',
    icon: '🏍️',
    description: 'MotoGP motorcycle racing events',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'NASCAR',
    color: '#ffd700',
    icon: '🏁',
    description: 'NASCAR Cup Series races',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'WEC',
    color: '#0066cc',
    icon: '🏆',
    description: 'World Endurance Championship',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Rally',
    color: '#00a650',
    icon: '🚗',
    description: 'WRC and rally championships',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'IndyCar',
    color: '#001489',
    icon: '🏎️',
    description: 'IndyCar Series races',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Formula E',
    color: '#00aaff',
    icon: '⚡',
    description: 'Formula E electric racing',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Other',
    color: '#6b7280',
    icon: '🏁',
    description: 'Other motorsports events',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Race Calendar MongoDB initialized successfully with Motorsports categories');
