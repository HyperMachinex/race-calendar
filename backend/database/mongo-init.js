// MongoDB initialization script
db = db.getSiblingDB('event_calendar');

// Create collections
db.createCollection('events');
db.createCollection('categories');

// Create indexes for events
db.events.createIndex({ date: 1, categoryId: 1 });
db.events.createIndex({ title: 'text', description: 'text' });

// Create indexes for categories
db.categories.createIndex({ name: 1 }, { unique: true });

// Insert default categories
db.categories.insertMany([
  {
    name: 'EPL',
    color: '#8b5cf6',
    icon: '⚽',
    description: 'English Premier League events',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Personal',
    color: '#3b82f6',
    icon: '👤',
    description: 'Personal events and appointments',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Work',
    color: '#f97316',
    icon: '💼',
    description: 'Work-related events and meetings',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Holiday',
    color: '#10b981',
    icon: '🎉',
    description: 'Holidays and celebrations',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Birthday',
    color: '#ec4899',
    icon: '🎂',
    description: 'Birthday celebrations',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Meeting',
    color: '#6366f1',
    icon: '📅',
    description: 'Meetings and conferences',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Reminder',
    color: '#f59e0b',
    icon: '⏰',
    description: 'Important reminders',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Other',
    color: '#14b8a6',
    icon: '📌',
    description: 'Other events',
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('MongoDB initialized successfully with default categories');
