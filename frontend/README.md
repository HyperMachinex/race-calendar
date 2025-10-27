# Event Calendar Frontend

Next.js 14 frontend application with TypeScript and shadcn/ui.

## 🏗️ Structure

```
frontend/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── calendar.tsx    # Calendar component
│   ├── sidebar.tsx     # Sidebar navigation
│   ├── event-dialog.tsx
│   └── theme-provider.tsx
├── hooks/               # Custom React hooks
│   ├── use-toast.ts
│   └── use-mobile.ts
├── lib/                 # Utility functions
│   └── utils.ts        # CN helper, etc.
├── services/            # API service layer
│   ├── api.ts          # Base API client
│   ├── events.service.ts
│   └── categories.service.ts
├── public/              # Static assets
├── styles/              # Additional styles
├── Dockerfile           # Docker configuration
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on http://localhost:5000

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your API URL
```

### Development

```bash
# Start development server
npm run dev

# Application runs on http://localhost:3000
```

### Production

```bash
# Build application
npm run build

# Start production server
npm start
```

## 🎨 UI Components

Built with shadcn/ui and Radix UI:
- Accordion
- Alert Dialog
- Avatar
- Badge
- Button
- Calendar
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Form
- Input
- Label
- Popover
- Select
- Sheet
- Sidebar
- Switch
- Tabs
- Textarea
- Toast
- Tooltip
- And more...

## 📡 API Integration

### Service Layer Architecture

The frontend uses a clean service layer pattern:

```typescript
// services/api.ts - Base API client
const api = new ApiService();

// services/events.service.ts
export const eventsService = {
  getAll: async (query?) => api.get('/events'),
  getById: async (id) => api.get(`/events/${id}`),
  create: async (event) => api.post('/events', event),
  update: async (id, event) => api.patch(`/events/${id}`, event),
  delete: async (id) => api.delete(`/events/${id}`),
};
```

### Usage in Components

```typescript
import { eventsService } from '@/services/events.service';

// Fetch events
const response = await eventsService.getAll({
  categoryId: 'category-id',
  startDate: '2025-01-01',
  endDate: '2025-12-31'
});

if (response.success) {
  const events = response.data;
}
```

## 🎨 Styling

### Tailwind CSS
Utility-first CSS framework with custom configuration.

### CSS Variables
Theme colors defined in `app/globals.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

### Dark Mode
Automatic dark mode support via `next-themes`:
```typescript
import { ThemeProvider } from '@/components/theme-provider';
```

## 🔌 Real-time Updates (Future)

Socket.IO client integration for real-time event updates:

```typescript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');
socket.emit('join:calendar');
socket.on('event:created', (event) => {
  // Handle new event
});
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐳 Docker

```bash
# Build Docker image
docker build -t event-calendar-frontend .

# Run container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://backend:5000/api/v1 event-calendar-frontend
```

## 🔧 Environment Variables

```env
NEXT_PUBLIC_APP_NAME="Event Calendar"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

**Note:** All public variables must be prefixed with `NEXT_PUBLIC_`

## 📦 Key Dependencies

### Core
- next 14.2.16
- react 18
- react-dom 18
- typescript 5

### UI
- @radix-ui/* - UI primitives
- tailwindcss 4.1.9
- lucide-react - Icons
- next-themes - Theme switching

### Forms & Validation
- react-hook-form
- @hookform/resolvers
- zod

### Date Handling
- date-fns
- react-day-picker

### Utilities
- clsx
- tailwind-merge
- class-variance-authority

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 📝 Code Organization

### Components
- Keep components focused and small
- Extract reusable logic to hooks
- Use TypeScript for props
- Follow naming conventions

### Services
- All API calls go through service layer
- Handle errors gracefully
- Return typed responses

### Hooks
- Custom hooks for reusable logic
- Prefix with `use`
- Keep hooks pure when possible

### Utilities
- Helper functions in `lib/utils.ts`
- Keep utilities pure and testable

## 🎯 Best Practices

1. **TypeScript** - Always define types for props and data
2. **Components** - Keep UI and logic separated
3. **Services** - Use service layer for API calls
4. **Error Handling** - Always handle API errors
5. **Loading States** - Show loading indicators
6. **Accessibility** - Use semantic HTML and ARIA
7. **Performance** - Use React.memo when needed
8. **Code Style** - Follow ESLint rules

## 🔜 Future Enhancements

- [ ] State management (Zustand/Redux)
- [ ] Real-time updates with Socket.IO
- [ ] Drag and drop events
- [ ] Export to calendar formats
- [ ] Print view
- [ ] Email reminders
- [ ] Multi-language support
- [ ] PWA support
- [ ] Offline mode
- [ ] Calendar sharing

## 🎨 Customization

### Adding New UI Components

```bash
npx shadcn@latest add [component-name]
```

### Changing Theme Colors

Edit `tailwind.config.ts` and `app/globals.css`

### Adding New Pages

Create files in `app/` directory following App Router conventions.

---

For questions or issues, please open an issue on GitHub.
