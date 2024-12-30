├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── agents/    # Agent-specific components
│   │   │   ├── presets/   # Preset configurations
│   │   │   ├── sections/  # Page sections
│   │   │   ├── ui/        # UI components (shadcn)
│   │   │   ├── visualizations/  # Data visualization
│   │   │   └── wizard/    # Deployment wizard
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Route pages
│   │   └── types/        # TypeScript definitions
├── db/                    # Database configuration
│   ├── migrations/       # Database migrations
│   └── schema.ts         # Database schema
└── server/               # Backend server
    ├── routes.ts         # API routes
    └── vite.ts          # Vite configuration