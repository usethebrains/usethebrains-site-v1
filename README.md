# usethebrains - Learning Management System

usethebrains is a modern, feature-rich Learning Management System (LMS) built with Next.js, React, and TypeScript. It provides a comprehensive platform for creating, managing, and delivering online courses.

## Features

- 🎓 Course Management
  - Rich content editor with support for text, video, and quizzes
  - Progress tracking and analytics
  - Student enrollment and management
  - Course preview and access control

- 👥 Community Features
  - Discussion forums
  - Student groups
  - Direct messaging
  - Event management

- 💰 Monetization
  - Course pricing
  - Subscription management
  - Revenue analytics
  - Payout processing

- 📊 Analytics Dashboard
  - Student engagement metrics
  - Revenue tracking
  - Course performance
  - User analytics

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── courses/          # Course-related pages
│   ├── dashboard/        # Dashboard pages
│   └── ...              # Other app routes
├── components/           # React components
│   ├── course/          # Course-related components
│   ├── dashboard/       # Dashboard components
│   ├── marketing/       # Marketing page components
│   ├── navigation/      # Navigation components
│   ├── theme/           # Theme components
│   └── ui/             # UI components (shadcn/ui)
├── data/                # Mock data files
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared code
│   ├── data.ts         # Data fetching utilities
│   ├── store.ts        # Global state management
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

## Authentication Flow

### Sign Up Process

1. User fills out registration form (`/register`)
   - Required fields: email, password, first name, last name
   - Optional: role selection (student/creator)

2. Form validation
   - Email format validation
   - Password requirements (min 8 characters)
   - Terms of service acceptance

3. Account creation
   - User data stored in database
   - Welcome email sent
   - Redirect to onboarding flow

### Login Implementation

- JWT-based authentication
- Token stored in HTTP-only cookies
- Protected routes handled via middleware
- Automatic token refresh
- Session management through cookies

### Protected Routes

All `/dashboard` routes are protected:
- `/dashboard/student/*` - Student-only access
- `/dashboard/creator/*` - Creator-only access
- `/dashboard/settings` - Authenticated users only

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/usethebrains.git
cd usethebrains
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=your-database-url
```

## Data Models

### User
```typescript
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'student' | 'creator';
  avatar_url?: string;
  created_at: string;
}
```

### Course
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  price: number;
  is_free: boolean;
  thumbnail_url: string;
  level: string;
  duration: {
    blended: string;
    video: string;
    text: string;
  };
  content: {
    modules: Module[];
  };
}
```

### Progress Tracking
```typescript
interface CourseProgress {
  courseId: string;
  moduleId: string;
  lessonId: string;
  completed: boolean;
  lastAccessed: string;
  selectedTrack: 'blended' | 'video' | 'text';
}
```

## Component Library

usethebrains uses [shadcn/ui](https://ui.shadcn.com/) for its component library. Key components:

- `Button` - Interactive buttons with variants
- `Card` - Content containers
- `Dialog` - Modal dialogs
- `Form` - Form components with validation
- `Navigation` - Navigation menus and bars
- `Progress` - Progress indicators
- `Tabs` - Tabbed interfaces

## State Management

Global state is managed using Zustand:

- Course progress tracking
- User preferences
- Theme settings
- Authentication state

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details#   u s e t h e b r a i n s - s i t e - v 1  
 #   u s e t h e b r a i n s - s i t e - v 1  
 