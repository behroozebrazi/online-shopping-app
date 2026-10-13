// Next Project Libraries ==>>
https://nextjs.org/
npx create-next-app@latest online-shopping-app

// Fonts ==>>
https://rastikerdar.github.io/vazirmatn/
Vazirmatn[wght].woff2

// Components ==>>
https://tailwindcss.com/
https://ui.shadcn.com/
https://ui.shadcn.com/docs/components
npx shadcn@latest init
https://ui.shadcn.com/docs/components/base/button -> Button
npx shadcn@latest add button
https://ui.shadcn.com/docs/components/base/dropdown-menu -> Dropdown Menu
npx shadcn@latest add dropdown-menu
https://ui.shadcn.com/docs/components/base/card -> Card
npx shadcn@latest add card

// Icons ==>>
https://lucide.dev/
https://lucide.dev/guide/react/
npm install lucide-react

// Light / Dark / System Modes
https://www.npmjs.com/package/next-themes
npm install next-themes

// Prisma ==>>
https://www.prisma.io/docs/orm/v7
https://www.prisma.io/docs/orm/v7/prisma-schema/overview
https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite
npm install prisma@prev @types/node @types/better-sqlite3 -D
npm install @prisma/client@7 @prisma/adapter-better-sqlite3 dotenv
npx prisma
npx prisma init --datasource-provider sqlite --output ../generated/prisma
