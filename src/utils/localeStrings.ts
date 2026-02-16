import { SupportedLocale } from './locale';

export interface LocaleStrings {
  placeholder: string;
  headerTitle: string;
  searchPlaceholder: string;
  emptyListText: string;
  closeButtonText: string;
  // Calling Code Mode
  callingCodePlaceholder: string;
  callingCodeHeaderTitle: string;
}

const strings: Record<SupportedLocale, LocaleStrings> = {
  en: {
    placeholder: 'Select a country',
    headerTitle: 'Select Country',
    searchPlaceholder: 'Search countries...',
    emptyListText: 'No countries found',
    closeButtonText: 'Done',
    callingCodePlaceholder: 'Code',
    callingCodeHeaderTitle: 'Select Country Code',
  },
  de: {
    placeholder: 'Land auswählen',
    headerTitle: 'Land auswählen',
    searchPlaceholder: 'Länder suchen...',
    emptyListText: 'Keine Länder gefunden',
    closeButtonText: 'Fertig',
    callingCodePlaceholder: 'Code',
    callingCodeHeaderTitle: 'Landesvorwahl auswählen',
  },
  fr: {
    placeholder: 'Sélectionner un pays',
    headerTitle: 'Sélectionner un pays',
    searchPlaceholder: 'Rechercher des pays...',
    emptyListText: 'Aucun pays trouvé',
    closeButtonText: 'Terminé',
    callingCodePlaceholder: 'Code',
    callingCodeHeaderTitle: 'Sélectionner l\'indicatif',
  },
  es: {
    placeholder: 'Seleccionar un país',
    headerTitle: 'Seleccionar país',
    searchPlaceholder: 'Buscar países...',
    emptyListText: 'No se encontraron países',
    closeButtonText: 'Listo',
    callingCodePlaceholder: 'Código',
    callingCodeHeaderTitle: 'Seleccionar código de país',
  },
  pt: {
    placeholder: 'Selecionar um país',
    headerTitle: 'Selecionar país',
    searchPlaceholder: 'Pesquisar países...',
    emptyListText: 'Nenhum país encontrado',
    closeButtonText: 'Concluído',
    callingCodePlaceholder: 'Código',
    callingCodeHeaderTitle: 'Selecionar código do país',
  },
  it: {
    placeholder: 'Seleziona un paese',
    headerTitle: 'Seleziona paese',
    searchPlaceholder: 'Cerca paesi...',
    emptyListText: 'Nessun paese trovato',
    closeButtonText: 'Fatto',
    callingCodePlaceholder: 'Codice',
    callingCodeHeaderTitle: 'Seleziona prefisso',
  },
  nl: {
    placeholder: 'Selecteer een land',
    headerTitle: 'Selecteer land',
    searchPlaceholder: 'Landen zoeken...',
    emptyListText: 'Geen landen gevonden',
    closeButtonText: 'Klaar',
    callingCodePlaceholder: 'Code',
    callingCodeHeaderTitle: 'Selecteer landcode',
  },
  ru: {
    placeholder: 'Выберите страну',
    headerTitle: 'Выберите страну',
    searchPlaceholder: 'Поиск стран...',
    emptyListText: 'Страны не найдены',
    closeButtonText: 'Готово',
    callingCodePlaceholder: 'Код',
    callingCodeHeaderTitle: 'Выберите код страны',
  },
  pl: {
    placeholder: 'Wybierz kraj',
    headerTitle: 'Wybierz kraj',
    searchPlaceholder: 'Szukaj krajów...',
    emptyListText: 'Nie znaleziono krajów',
    closeButtonText: 'Gotowe',
    callingCodePlaceholder: 'Kod',
    callingCodeHeaderTitle: 'Wybierz kod kraju',
  },
  uk: {
    placeholder: 'Виберіть країну',
    headerTitle: 'Виберіть країну',
    searchPlaceholder: 'Шукати країни...',
    emptyListText: 'Країни не знайдено',
    closeButtonText: 'Готово',
    callingCodePlaceholder: 'Код',
    callingCodeHeaderTitle: 'Виберіть код країни',
  },
  cs: {
    placeholder: 'Vyberte zemi',
    headerTitle: 'Vyberte zemi',
    searchPlaceholder: 'Hledat země...',
    emptyListText: 'Žádné země nenalezeny',
    closeButtonText: 'Hotovo',
    callingCodePlaceholder: 'Kód',
    callingCodeHeaderTitle: 'Vyberte předvolbu země',
  },
  da: {
    placeholder: 'Vælg et land',
    headerTitle: 'Vælg land',
    searchPlaceholder: 'Søg lande...',
    emptyListText: 'Ingen lande fundet',
    closeButtonText: 'Færdig',
    callingCodePlaceholder: 'Kode',
    callingCodeHeaderTitle: 'Vælg landekode',
  },
  be: {
    placeholder: 'Выберыце краіну',
    headerTitle: 'Выберыце краіну',
    searchPlaceholder: 'Шукаць краіны...',
    emptyListText: 'Краіны не знойдзены',
    closeButtonText: 'Гатова',
    callingCodePlaceholder: 'Код',
    callingCodeHeaderTitle: 'Выберыце код краіны',
  },
  ro: {
    placeholder: 'Selectați o țară',
    headerTitle: 'Selectați țara',
    searchPlaceholder: 'Căutați țări...',
    emptyListText: 'Nu s-au găsit țări',
    closeButtonText: 'Gata',
    callingCodePlaceholder: 'Cod',
    callingCodeHeaderTitle: 'Selectați codul țării',
  },
  bg: {
    placeholder: 'Изберете държава',
    headerTitle: 'Изберете държава',
    searchPlaceholder: 'Търсене на държави...',
    emptyListText: 'Няма намерени държави',
    closeButtonText: 'Готово',
    callingCodePlaceholder: 'Код',
    callingCodeHeaderTitle: 'Изберете код на държава',
  },
  'zh-hans': {
    placeholder: '选择国家',
    headerTitle: '选择国家',
    searchPlaceholder: '搜索国家...',
    emptyListText: '未找到国家',
    closeButtonText: '完成',
    callingCodePlaceholder: '区号',
    callingCodeHeaderTitle: '选择国家区号',
  },
  'zh-hant': {
    placeholder: '選擇國家',
    headerTitle: '選擇國家',
    searchPlaceholder: '搜尋國家...',
    emptyListText: '未找到國家',
    closeButtonText: '完成',
    callingCodePlaceholder: '區號',
    callingCodeHeaderTitle: '選擇國家區號',
  },
  ko: {
    placeholder: '국가 선택',
    headerTitle: '국가 선택',
    searchPlaceholder: '국가 검색...',
    emptyListText: '국가를 찾을 수 없습니다',
    closeButtonText: '완료',
    callingCodePlaceholder: '코드',
    callingCodeHeaderTitle: '국가 코드 선택',
  },
  ja: {
    placeholder: '国を選択',
    headerTitle: '国を選択',
    searchPlaceholder: '国を検索...',
    emptyListText: '国が見つかりません',
    closeButtonText: '完了',
    callingCodePlaceholder: 'コード',
    callingCodeHeaderTitle: '国コードを選択',
  },
  et: {
    placeholder: 'Vali riik',
    headerTitle: 'Vali riik',
    searchPlaceholder: 'Otsi riike...',
    emptyListText: 'Riike ei leitud',
    closeButtonText: 'Valmis',
    callingCodePlaceholder: 'Kood',
    callingCodeHeaderTitle: 'Vali riigi kood',
  },
  he: {
    placeholder: 'בחר מדינה',
    headerTitle: 'בחר מדינה',
    searchPlaceholder: 'חפש מדינות...',
    emptyListText: 'לא נמצאו מדינות',
    closeButtonText: 'סיום',
    callingCodePlaceholder: 'קוד',
    callingCodeHeaderTitle: 'בחר קוד מדינה',
  },
  el: {
    placeholder: 'Επιλέξτε χώρα',
    headerTitle: 'Επιλέξτε χώρα',
    searchPlaceholder: 'Αναζήτηση χωρών...',
    emptyListText: 'Δεν βρέθηκαν χώρες',
    closeButtonText: 'Τέλος',
    callingCodePlaceholder: 'Κωδικός',
    callingCodeHeaderTitle: 'Επιλέξτε κωδικό χώρας',
  },
  ar: {
    placeholder: 'اختر دولة',
    headerTitle: 'اختر دولة',
    searchPlaceholder: 'البحث عن الدول...',
    emptyListText: 'لم يتم العثور على دول',
    closeButtonText: 'تم',
    callingCodePlaceholder: 'الرمز',
    callingCodeHeaderTitle: 'اختر رمز الدولة',
  },
  tr: {
    placeholder: 'Ülke seçin',
    headerTitle: 'Ülke seçin',
    searchPlaceholder: 'Ülke ara...',
    emptyListText: 'Ülke bulunamadı',
    closeButtonText: 'Tamam',
    callingCodePlaceholder: 'Kod',
    callingCodeHeaderTitle: 'Ülke kodu seçin',
  },
  hu: {
    placeholder: 'Válasszon országot',
    headerTitle: 'Válasszon országot',
    searchPlaceholder: 'Országok keresése...',
    emptyListText: 'Nem található ország',
    closeButtonText: 'Kész',
    callingCodePlaceholder: 'Kód',
    callingCodeHeaderTitle: 'Válasszon országkódot',
  },
};

/**
 * Get localized strings for a specific locale
 */
export const getLocaleStrings = (locale: SupportedLocale): LocaleStrings => {
  return strings[locale] || strings.en;
};

export default strings;
