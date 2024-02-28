The app GrappleCosmos is for journaling your thoughts. It sorts thoughts by date so that you can go back in time to see what thoughts you had that day. Thoughts are stored in a PostgresSQL instance (Supabase). Auth is via Supabase too.

Written in React Native (Expo). Using [minds.com's](https://github.com/Minds/mobile-native). React Native app as a starting point in the codebase, but modified to work as a personal journal.

```Demo:```

[![Watch the video](https://i.stack.imgur.com/Vp2cE.png)](https://ganuzewclofznngefedc.supabase.co/storage/v1/object/public/test/RPReplay_Final1709158869.mov?t=2024-02-28T22%3A32%3A33.542Z)

```How to Install```

1. Make sure to have Expo installed.
2. Create a Supabase project: supabase.com
3. Please check out the companion backend [here](https://github.com/timothygorer/grapplecosmos-backend), read its readme, and run the postgres migration files so that your Supabase instance gets updated.

Create a .env with:

```
REACT_APP_SUPABASE_URL=<SUPABASE URL>
REACT_APP_SUPABASE_ANON_KEY=<SUPABASE ANON KEY>
```

1. ```yarn install```
2. ```npx expo start```


   
