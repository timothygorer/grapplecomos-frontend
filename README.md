The app GrappleCosmos is for journaling your thoughts. It sorts thoughts by date so that you can go back in time to see what thoughts you had that day. Thoughts are stored in a PostgresSQL instance (Supabase). Auth is via Supabase too.

Written in React Native (Expo). Using [minds.com's](https://github.com/Minds/mobile-native). React Native app as a starting point in the codebase, but modified to work as a personal journal.

How to Install

Make sure to have Expo installed.
Create a Supabase project: supabase.com
Please check out the companion backend here, read its readme, and run the postgres migration files so that your Supabase instance gets updated.
Create a .env with:

REACT_APP_SUPABASE_URL=<SUPABASE URL>
REACT_APP_SUPABASE_ANON_KEY=<SUPABASE ANON KEY>
yarn install
npx expo start
