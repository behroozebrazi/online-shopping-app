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

- https://ui.shadcn.com/docs/components/base/button -> Button
  npx shadcn@latest add button
- https://ui.shadcn.com/docs/components/base/dropdown-menu -> Dropdown Menu
  npx shadcn@latest add dropdown-menu
- https://ui.shadcn.com/docs/components/base/card -> Card
  npx shadcn@latest add card
- https://ui.shadcn.com/docs/components/base/badge
  npx shadcn@latest add badge
- https://ui.shadcn.com/docs/components/base/input
  npx shadcn@latest add input
- https://ui.shadcn.com/docs/components/base/label
  npx shadcn@latest add label
- https://ui.shadcn.com/docs/components/base/skeleton
  npx shadcn@latest add skeleton
- https://ui.shadcn.com/docs/components/base/table
  npx shadcn@latest add table
- https://ui.shadcn.com/docs/forms
  https://ui.shadcn.com/docs/forms/react-hook-form
  https://ui.shadcn.com/docs/components/base/field
  npx shadcn@latest add field
- https://ui.shadcn.com/docs/components/base/radio-group
  npx shadcn@latest add radio-group

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

1. Install Prisma in the project
   npm install prisma@prev @types/node @types/better-sqlite3 -D
   npm install @prisma/client@7 @prisma/adapter-better-sqlite3 dotenv
   npx prisma
   npx prisma init --datasource-provider sqlite --output ../generated/prisma
2. Create your first migration to set up the database tables
   . It deletes the previous tables and set up a new ones
   npx prisma migrate dev --name init
3. Generate the Prisma Client API after any changes in /prisma/schema.prisma
   . It generates new API's Client to connect to the database (SQLite)
   npx prisma generate
4. Instantiate Prisma Client
   . Pass an instance of the Prisma ORM driver adapter to the PrismaClient constructor
   /lib/prisma.ts
   import "dotenv/config";
   import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
   import { PrismaClient } from "../generated/prisma/client";
   const connectionString = `${process.env.DATABASE_URL}`;
   const adapter = new PrismaBetterSqlite3({ url: connectionString });
   const prisma = new PrismaClient({ adapter });
   export { prisma };
5. Seed the database from a local file such as ./data/products.ts and ./data/users.ts
   . npx tsx ./data/seed.ts
6. npx prisma generate
   npx prisma migrate dev --name add_user

// Actions ==> work with database
. actions functions run on server side -> "use server"
. ./lib/actions/product.actions.ts

// Zod ==>
. TypeScript-first schema validation with static type inference. Define modals & Define data structure
.. form inputs & API and backend validation
https://zod.dev/
npm install zod
. ./lib/validators.ts
. ./types/index.ts
https://zod.dev/basics
https://zod.dev/api

// bcrypt ==>
https://www.npmjs.com/package/bcryptjs
npm install bcryptjs
npm install --save-dev @types/bcryptjs

// Authentication for the Web ==> Auth.js and add Modals
https://authjs.dev/
https://authjs.dev/getting-started
https://authjs.dev/getting-started/installation
https://authjs.dev/getting-started/adapters/prisma
. Naming Conventions -> schema.prisma --> ./prisma/schema.prisma
npx prisma generate
npx prisma migrate dev --name add_user_based_tables

// Authentication for Next.js
https://authjs.dev/getting-started/installation?framework=Next.js

1. npm install next-auth@beta
   npm install next-auth@beta --legacy-peer-deps
2. Adaptor Prisma for Authjs:
   npm install @auth/prisma-adapter
3. Generate a key and add 3 lines to .env file:
   openssl rand -base64 32
   Modify file .env with:
   NEXTAUTH_SECRET="EK+db8siA22aCf07tMfe4WpXi4YwdNVM2fPqH3ZBWMA="
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_URL_INTERNAL=http://localhost:3000
4. Config authentication in Next.js:
   Create ./auth.ts in root
   Create app/api/auth/[...nextauth]/route.ts in root

// Adding data to app and database:

- update prisma/schema.prisma
- update lib/validators.ts
- update lib/actions/...
- update UI form

//
npm install axios
// ./lib/actions/otp.actions.ts

// Adding card and card item to the app

- => update {cartItemSchema, insertCartSchema} -> lib/validators.ts
- => update {CartItem, Cart} -> types/index.ts
- => update database {} -> prisma/schema.prisma
- npx prisma generate
- npx prisma migrate dev --name add_cart
- => add action {} -> lib/actions/cart.actions.ts
- => add cart component -> components/shared/product/addToCart.tsx

// React Hook Form
npm install react-hook-form @hookform/resolvers
npm install react-hook-form @hookform/resolvers zod
