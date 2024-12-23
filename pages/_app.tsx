import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '../src/styles/globals.css';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';
import { ConnectionProvider } from '../src/context/ConnectionContext';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { UserProvider } from '../src/context/UserContext';
import { SHOULD_USE_FIREBASE_EMULATOR } from '../src/dev_constants';

const firebaseConfig = {
  apiKey: 'AIzaSyA3ZkrucMoR-PnaPb7S-JkvhGya7gT9vTs',
  authDomain: 'ideinnit.firebaseapp.com',
  databaseURL: 'https://ideinnit-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ideinnit',
  storageBucket: 'ideinnit.firebasestorage.app',
  messagingSenderId: '549016679692',
  appId: '1:549016679692:web:e89c4cbff08f96430c4529',
  measurementId: 'G-QX26M61BKM',
};

if (!firebase.apps?.length) {
  if (SHOULD_USE_FIREBASE_EMULATOR) {
    firebase.initializeApp({
      ...firebaseConfig,
      authDomain: 'localhost:9099',
      databaseURL: 'http://127.0.0.1:9000?ns=ideinnit-default-rtdb',
    });
    firebase.auth().useEmulator('http://localhost:9099');
    firebase.database().useEmulator('localhost', 9000);
  } else {
    firebase.initializeApp(firebaseConfig);
    if (typeof window !== 'undefined' && firebase.analytics) {
      firebase.analytics();
    }
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="bottom-right" />
      <UserProvider>
        <ConnectionProvider>
          <Component {...pageProps} />
        </ConnectionProvider>
      </UserProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
