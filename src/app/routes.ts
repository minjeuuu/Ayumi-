import { createBrowserRouter } from 'react-router';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import ReadPage from './pages/ReadPage';
import EditorPage from './pages/EditorPage';
import JournalPage from './pages/JournalPage';
import WorshipPage from './pages/WorshipPage';
import StudyPage from './pages/StudyPage';
import PrayerPage from './pages/PrayerPage';
import MediaPage from './pages/MediaPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'read',
        Component: ReadPage,
      },
      {
        path: 'editor',
        Component: EditorPage,
      },
      {
        path: 'journal',
        Component: JournalPage,
      },
      {
        path: 'worship',
        Component: WorshipPage,
      },
      {
        path: 'study',
        Component: StudyPage,
      },
      {
        path: 'prayer',
        Component: PrayerPage,
      },
      {
        path: 'media',
        Component: MediaPage,
      },
      {
        path: 'search',
        Component: SearchPage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
    ],
  },
]);
