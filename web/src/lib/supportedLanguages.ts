import {
  FR,
  DE,
  US,
  IN,
  CZ,
  ES,
  IT,
  CN,
  KR,
  NL,
  TR,
  SE,
  ID,
  PH,
  JP,
  UA,
  GR,
  SK,
  FI,
  RO,
  DK,
  BG,
  MY,
  HR,
  SA,
  PL,
  PT,
  TA,
  VN
} from 'country-flag-icons/react/3x2';
import type { FlagComponent } from 'country-flag-icons/react/3x2'

// Add proper type definition
export interface Language {
  code: string
  name: string
  native_name: string
  icon: FlagComponent
  locale: string
}

export const supportedLanguages: Language[] = [
  // Existing Languages
  { code: 'US', name: 'English', native_name: 'English', icon: US, locale: 'en' },
  { code: 'FR', name: 'French', native_name: 'Français', icon: FR, locale: 'fr' },
  { code: 'DE', name: 'German', native_name: 'Deutsch', icon: DE, locale: 'de' },
  { code: 'IN', name: 'Hindi', native_name: 'हिन्दी', icon: IN, locale: 'hi' },
  { code: 'CZ', name: 'Czech', native_name: 'Čeština', icon: CZ, locale: 'cs' },
  { code: 'ES', name: 'Spanish', native_name: 'Español', icon: ES, locale: 'es' },
  { code: 'IT', name: 'Italian', native_name: 'Italiano', icon: IT, locale: 'it' },
  { code: 'CN', name: 'Chinese', native_name: '中文', icon: CN, locale: 'zh' },
  { code: 'KR', name: 'Korean', native_name: '한국어', icon: KR, locale: 'ko' },
  { code: 'NL', name: 'Dutch', native_name: 'Nederlands', icon: NL, locale: 'nl' },
  { code: 'TR', name: 'Turkish', native_name: 'Türkçe', icon: TR, locale: 'tr' },
  { code: 'SE', name: 'Swedish', native_name: 'Svenska', icon: SE, locale: 'sv' },
  { code: 'ID', name: 'Indonesian', native_name: 'Bahasa Indonesia', icon: ID, locale: 'id' },
  { code: 'PH', name: 'Filipino', native_name: 'Filipino', icon: PH, locale: 'fil' },
  { code: 'JP', name: 'Japanese', native_name: '日本語', icon: JP, locale: 'ja' },
  { code: 'UA', name: 'Ukrainian', native_name: 'Українська', icon: UA, locale: 'uk' },
  { code: 'GR', name: 'Greek', native_name: 'Ελληνικά', icon: GR, locale: 'el' },
  { code: 'SK', name: 'Slovak', native_name: 'Slovenčina', icon: SK, locale: 'sk' },
  { code: 'FI', name: 'Finnish', native_name: 'Suomi', icon: FI, locale: 'fi' },
  { code: 'RO', name: 'Romanian', native_name: 'Română', icon: RO, locale: 'ro' },
  { code: 'DK', name: 'Danish', native_name: 'Dansk', icon: DK, locale: 'da' },
  { code: 'BG', name: 'Bulgarian', native_name: 'Български', icon: BG, locale: 'bg' },
  { code: 'MY', name: 'Malay', native_name: 'Bahasa Melayu', icon: MY, locale: 'ms' },
  { code: 'HR', name: 'Croatian', native_name: 'Hrvatski', icon: HR, locale: 'hr' },
  { code: 'SA', name: 'Arabic', native_name: 'العربية الفصحى', icon: SA, locale: 'ar' },
  { code: 'TA', name: 'Tamil', native_name: 'தமிழ்', icon: TA, locale: 'ta' },
  { code: 'PT', name: 'Portuguese', native_name: 'Português', icon: PT, locale: 'pt' },
  { code: 'PL', name: 'Polish', native_name: 'Polski', icon: PL, locale: 'pl' },
  { code: 'VN', name: 'Vietnamese', native_name: 'Tiếng Việt', icon: VN, locale: 'vi' },
]; 