(function () {
  const data = window.TUNIHOME_DATA || window.DARNA_DATA || { listings: [], professionals: [], STORAGE_KEYS: {} };

  const appState = {
    home: {
      category: 'sale',
      type: 'all',
      region: '',
      location: '',
      maxPrice: Number.POSITIVE_INFINITY,
      minRooms: 0,
      minSurface: 0,
      professionalOnly: false,
      verifiedOnly: false,
      rentTags: [],
      amenities: [],
      visibleCount: 4
    },
    search: {
      category: 'sale',
      type: 'all',
      amenities: [],
      region: '',
      location: '',
      minPrice: 0,
      maxPrice: 1500000,
      professionalOnly: false,
      verifiedOnly: false,
      rentTags: [],
      minRooms: 0,
      minSurface: 0,
      mapMode: 'list',
      visibleCount: 9
    }
  };

  const TUNISIA_REGIONS = [
    { region: 'Ariana', cities: ['Ariana Ville', 'Cite Ettadhamen', 'Kalaat El Andalous', 'La Soukra', 'Mnihla', 'Raoued', 'Sidi Thabet'] },
    { region: 'Ben Arous', cities: ['Ben Arous', 'Bou Mhel El Bassatine', 'El Mourouj', 'Ezzahra', 'Fouchana', 'Hammam Chott', 'Hammam Lif', 'Medina Jedida', 'Megrine', 'Mohamedia', 'Mornag', 'Rades', 'Borj Cedria', 'Khulaydiyah', 'Naassen'] },
    { region: 'Beja', cities: ['Amdoun', 'Beja Nord', 'Beja Sud', 'Goubellat', 'Medjez El Bab', 'Nefza', 'Teboursouk', 'Testour', 'Thibar'] },
    { region: 'Bizerte', cities: ['Bizerte Nord', 'Bizerte Sud', 'El Alia', 'Ghar El Melh', 'Ghezala', 'Joumine', 'Mateur', 'Menzel Bourguiba', 'Menzel Jemil', 'Ras Jebel', 'Sejnane', 'Tinja', 'Utique', 'Zarzouna'] },
    { region: 'Gabes', cities: ['Dkhilet Toujane', 'El Hamma', 'Gabes Medina', 'Gabes Ouest', 'Gabes Sud', 'Ghannouch', 'Habib Thameur', 'Mareth', 'Matmata', 'Menzel El Habib', 'Metouia', 'Nouvelle Matmata', 'Oudhref'] },
    { region: 'Gafsa', cities: ['Belkhir', 'El Guettar', 'El Ksar', 'Gafsa Nord', 'Gafsa Sud', 'Mdhila', 'Metlaoui', 'Moulares', 'Redeyef', 'Sened', 'Sidi Aich', 'Sidi Boubaker', 'Zannouch'] },
    { region: 'Jendouba', cities: ['Ain Draham', 'Balta Bou Aouane', 'Bou Salem', 'Fernana', 'Ghardimaou', 'Jendouba', 'Jendouba Nord', 'Oued Meliz', 'Tabarka'] },
    { region: 'Kairouan', cities: ['Ain Djeloula', 'Bou Hajla', 'Chebika', 'Echrarda', 'El Alaa', 'Haffouz', 'Hajeb El Ayoun', 'Kairouan Nord', 'Kairouan Sud', 'Menzel Mehiri', 'Nasrallah', 'Oueslatia', 'Sbikha'] },
    { region: 'Kasserine', cities: ['El Ayoun', 'Ezzouhour', 'Feriana', 'Foussana', 'Haidra', 'Hassi El Ferid', 'Jedelienne', 'Kasserine Nord', 'Kasserine Sud', 'Majel Bel Abbes', 'Sbeitla', 'Sbiba', 'Thala'] },
    { region: 'Kebili', cities: ['Douz Nord', 'Douz Sud', 'Faouar', 'Kebili Nord', 'Kebili Sud', 'Rjim Maatoug', 'Souk Lahad'] },
    { region: 'Kef', cities: ['Dahmani', 'El Ksour', 'Jerissa', 'Kalaat Khasba', 'Kalaat Senan', 'Kef Est', 'Kef Ouest', 'Nebeur', 'Sakiet Sidi Youssef', 'Sers', 'Tajerouine', 'Touiref'] },
    { region: 'Mahdia', cities: ['Bou Merdes', 'Chebba', 'Chorbane', 'El Bradaa', 'El Jem', 'Essouassi', 'Hebira', 'Ksour Essef', 'Mahdia', 'Mellouleche', 'Ouled Chamekh', 'Rejiche', 'Sidi Alouane'] },
    { region: 'Manouba', cities: ['Borj El Amri', 'Djedeida', 'Douar Hicher', 'El Battan', 'Manouba', 'Mornaguia', 'Oued Ellil', 'Tebourba'] },
    { region: 'Medenine', cities: ['Ajim', 'Ben Gardane', 'Beni Khedache', 'Djerba', 'Houmt Souk', 'Medenine Nord', 'Medenine Sud', 'Midoun', 'Sidi Makhlouf', 'Zarzis'] },
    { region: 'Monastir', cities: ['Bekalta', 'Bembla', 'Beni Hassen', 'Jemmal', 'Ksar Hellal', 'Ksibet El Mediouni', 'Moknine', 'Monastir', 'Ouardanine', 'Sahline', 'Sayada Lamta Bou Hjar', 'Teboulba', 'Zeramdine'] },
    { region: 'Nabeul', cities: ['Beni Khalled', 'Beni Khiar', 'Bou Argoub', 'Dar Chaabane El Fehri', 'El Haouaria', 'El Mida', 'Grombalia', 'Hammamet', 'Hammam Ghezaz', 'Kelibia', 'Korba', 'Menzel Bouzelfa', 'Menzel Temime', 'Nabeul', 'Soliman', 'Takelsa'] },
    { region: 'Sfax', cities: ['Agareb', 'Bir Ali Ben Khalifa', 'El Amra', 'El Hencha', 'Graiba', 'Jebiniana', 'Kerkennah', 'Mahres', 'Menzel Chaker', 'Sakiet Eddaier', 'Sakiet Ezzit', 'Sfax Ouest', 'Sfax Sud', 'Sfax Ville', 'Skhira', 'Thyna'] },
    { region: 'Sidi Bouzid', cities: ['Bir El Hafey', 'Cebbala Ouled Asker', 'El Hichria', 'Essaida', 'Jilma', 'Meknassy', 'Menzel Bouzaiane', 'Mezzouna', 'Ouled Haffouz', 'Regueb', 'Sidi Ali Ben Aoun', 'Sidi Bouzid Est', 'Sidi Bouzid Ouest', 'Souk Jedid'] },
    { region: 'Siliana', cities: ['Bargou', 'Bou Arada', 'El Aroussa', 'El Krib', 'Gaafour', 'Kesra', 'Makthar', 'Rouhia', 'Sidi Bou Rouis', 'Siliana Nord', 'Siliana Sud'] },
    { region: 'Sousse', cities: ['Akouda', 'Bouficha', 'Enfidha', 'Hammam Sousse', 'Hergla', 'Kalaa Kebira', 'Kalaa Seghira', 'Kondar', 'Msaken', 'Sahloul', 'Sidi Bou Ali', 'Sidi El Hani', 'Sousse Jawhara', 'Sousse Medina', 'Sousse Riadh', 'Sousse Sidi Abdelhamid', 'Zaouiet Ksibet Thrayet'] },
    { region: 'Tataouine', cities: ['Beni Mhira', 'Bir Lahmar', 'Dehiba', 'Ghomrassen', 'Remada', 'Smar', 'Tataouine Nord', 'Tataouine Sud'] },
    { region: 'Tozeur', cities: ['Degache', 'El Hamma du Jerid', 'Hazoua', 'Nefta', 'Tamerza', 'Tozeur'] },
    { region: 'Tunis', cities: ['Bab El Bhar', 'Bab Souika', 'Carthage', 'Centre Urbain Nord', 'Cite El Khadra', 'Djebel Jelloud', 'El Hrairia', 'El Kabaria', 'El Manar', 'El Menzah', 'El Menzah 9', 'El Omrane', 'El Omrane Superieur', 'El Ouardia', 'Ettahrir', 'Ezzouhour', 'La Goulette', 'La Marsa', 'Lac 2', 'Le Bardo', 'Le Kram', 'Les Berges du Lac', 'Medina', 'Sejoumi', 'Sidi El Bechir', 'Sidi Hassine'] },
    { region: 'Zaghouan', cities: ['Bir Mcherga', 'El Fahs', 'Nadhour', 'Saouaf', 'Zaghouan', 'Zriba'] }
  ];

  const LANGUAGE_STORAGE_KEY = 'tunihome_ui_language';
  const AUTH_USERS_STORAGE_KEY = 'tunihome_auth_users';
  const AUTH_SESSION_STORAGE_KEY = 'tunihome_auth_session';
  const PROFILE_SETTINGS_STORAGE_KEY = 'tunihome_profile_settings';
  const PRICE_ALERTS_STORAGE_KEY = 'tunihome_price_alerts';
  const LISTING_REPORTS_STORAGE_KEY = 'tunihome_listing_reports';
  const LISTING_CONTACTS_STORAGE_KEY = 'tunihome_listing_contacts';
  const ADMIN_STATE_STORAGE_KEY = 'tunihome_admin_state';
  const ADMIN_ACCOUNTS_STORAGE_KEY = 'tunihome_admin_accounts';
  const LEGACY_STORAGE_KEYS = {
    language: 'darna_ui_language',
    authUsers: 'darna_auth_users',
    authSession: 'darna_auth_session',
    profileSettings: 'darna_profile_settings',
    recentSearches: 'darna_recent_searches',
    viewedListings: 'darna_viewed_listings',
    listedProperties: 'darna_listed_properties',
    savedListings: 'darna_saved_listings',
    savedAgencies: 'darna_saved_agencies',
    userPreferences: 'darna_user_preferences'
  };
  const FR_TRANSLATIONS = {
    'Language': 'Langue',
    'English': 'Anglais',
    'Français': 'Français',
    'Arabic': 'Arabe',
    'My account': 'Mon compte',
    'Go to home': "Aller a l'accueil",
    'Primary navigation': 'Navigation principale',
    'Home': 'Accueil',
    'Search': 'Recherche',
    'List': 'Publier',
    'My Listings': 'Mes annonces',
    'List your properties': 'Publier vos biens',
    'Create listing': 'Creer une annonce',
    'My listings': 'Mes annonces',
    'TuniHome | Home': 'TuniHome | Accueil',
    'Search Listings | TuniHome': 'Recherche de biens | TuniHome',
    'Property Details | TuniHome': 'Details du bien | TuniHome',
    'Create Listing | TuniHome': "Creer une annonce | TuniHome",
    'My Listings | TuniHome': 'Mes annonces | TuniHome',
    'Admin Analytics | TuniHome': 'Analyse admin | TuniHome',
    'Professional Profile | TuniHome': 'Profil professionnel | TuniHome',
    'Log in | TuniHome': 'Connexion | TuniHome',
    'Create account | TuniHome': 'Creer un compte | TuniHome',
    'Trusted homes across Tunisia': 'Des logements de confiance dans toute la Tunisie',
    'Find verified homes, apartments, villas, and vacation rentals across Tunisia with TuniHome.': 'Trouvez des maisons, appartements, villas et locations de vacances verifies partout en Tunisie avec TuniHome.',
    'Search homes for sale, rent, and vacation in Tunisia with advanced filters, map view, and trusted listings.': 'Recherchez des biens a vendre, a louer ou en vacances en Tunisie avec filtres avances, vue carte et annonces fiables.',
    'View listing photos, pricing, amenities, owner details, and map location before contacting the seller.': 'Consultez photos, prix, commodites, details du proprietaire et localisation avant de contacter le vendeur.',
    'Explore agency and promoter profiles, active listings, ratings, and contact details on TuniHome.': 'Explorez les profils agences et promoteurs, annonces actives, avis et coordonnees sur TuniHome.',
    'Publish your property listing in minutes with clear steps for details, media, contact, and location.': 'Publiez votre annonce en quelques minutes avec des etapes claires pour details, medias, contact et localisation.',
    'Manage your listings, activity, and publishing performance in one place.': 'Gerez vos annonces, votre activite et vos performances de publication au meme endroit.',
    'Review and manage your favorite listings and agencies.': 'Consultez et gerez vos annonces et agences favorites.',
    'Track listing verification progress and manage your published homes.': 'Suivez la progression de verification des annonces et gerez vos biens publies.',
    'Update your account details, verification request, and publishing profile settings.': 'Mettez a jour les details du compte, la demande de verification et les parametres du profil de publication.',
    'Log in to TuniHome to manage listings, profile settings, and favorites.': 'Connectez-vous a TuniHome pour gerer vos annonces, parametres de profil et favoris.',
    'Create a TuniHome account to publish listings and connect with buyers or renters.': 'Creez un compte TuniHome pour publier des annonces et echanger avec acheteurs ou locataires.',
    'Admin operations for moderation, verification, and platform controls.': 'Operations admin pour la moderation, la verification et les controles de la plateforme.',
    'Upgrade to Pro for more media uploads, analytics, and improved listing visibility.': 'Passez en Pro pour plus d uploads media, des statistiques et une meilleure visibilite des annonces.',
    'Find your next place with confidence.': 'Trouvez votre prochain logement en toute confiance.',
    'Find verified homes across Tunisia.': 'Trouvez des logements verifies partout en Tunisie.',
    'Browse verified villas, apartments, and vacation homes from trusted owners and agencies.': 'Parcourez des villas, appartements et residences de vacances verifies proposes par des proprietaires et agences fiables.',
    'Buy, rent, or book vacation stays from trusted owners and agencies.': 'Achetez, louez ou reservez des sejours de vacances aupres de proprietaires et agences de confiance.',
    'Premium': 'Premium',
    'Get more visibility with Premium': 'Gagnez plus de visibilite avec Premium',
    'Upgrade to Pro for stronger discovery, market insights, and priority support.': 'Passez a Pro pour une meilleure visibilite, des insights marche et un support prioritaire.',
    'More exposure': 'Plus de visibilite',
    'Show your listings higher in front of serious buyers and renters.': 'Affichez vos annonces plus haut devant des acheteurs et locataires qualifies.',
    'Better listing recommendations': 'Meilleures recommandations',
    'Follow tailored tips to improve performance and conversion.': 'Suivez des conseils adaptes pour ameliorer la performance et la conversion.',
    'Price and market insights': 'Prix et insights marche',
    'Track views, demand, and pricing signals in one place.': 'Suivez les vues, la demande et les signaux de prix au meme endroit.',
    'Priority support': 'Support prioritaire',
    'Get faster responses when you need help.': 'Obtenez des reponses plus rapides quand vous avez besoin d aide.',
    'View Pro plan': 'Voir l offre Pro',
    'Marketplace overview': 'Vue du marche',
    'Now in focus': 'En ce moment',
    'Local weather': 'Meteo locale',
    'Local time': 'Heure locale',
    'Listing mode': "Mode d'annonce",
    'Buy': 'Acheter',
    'Rent': 'Louer',
    'Vacation': 'Vacances',
    'Quick property search': 'Recherche rapide de biens',
    'Region': 'Region',
    'Where': 'Ou',
    'Search by city': 'Rechercher par ville',
    'Search by region': 'Rechercher par region',
    'Any region': 'Toute region',
    'Select region first': 'Selectionnez d abord une region',
    'Property type': 'Type de bien',
    'Price': 'Prix',
    'Owner': 'Proprietaire',
    'Any type': 'Tout type',
    'Apartment': 'Appartement',
    'Villa': 'Villa',
    'House': 'Maison',
    'Room': 'Chambre',
    'Studio': 'Studio',
    'Condo': 'Condo',
    'Townhouse': 'Maison de ville',
    'Budget': 'Budget',
    'Any budget': 'Tous budgets',
    'Any price': 'Tout prix',
    'Up to 1,200 TND': "Jusqu'a 1 200 TND",
    'Up to 2,500 TND': "Jusqu'a 2 500 TND",
    'Up to 5,000 TND': "Jusqu'a 5 000 TND",
    'Up to 10,000 TND': "Jusqu'a 10 000 TND",
    'Up to 20,000 TND': "Jusqu'a 20 000 TND",
    'Advanced Search': 'Recherche avancee',
    'Search homes': 'Rechercher des biens',
    'Search rentals': 'Rechercher des locations',
    'Search vacation': 'Rechercher des vacances',
    'TOP PICK': 'MEILLEURE SELECTION',
    'View all': 'Voir tout',
    'NEW PROPERTIES': 'NOUVEAUX BIENS',
    'Explore more': 'Voir tout',
    'TOP AGENCIES': 'MEILLEURES AGENCES',
    'Matches now': 'Biens disponibles',
    'Verified homes': 'Biens verifies',
    'Cities covered': 'Villes couvertes',
    'Trusted agencies': 'Agences fiables',
    '{count} listing': '{count} annonce',
    '{count} listings': '{count} annonces',
    'Open filters': 'Ouvrir les filtres',
    'Advanced Filters': 'Filtres avances',
    'Collapse filters': 'Replier les filtres',
    'Open filter panel': 'Ouvrir le panneau des filtres',
    'Close': 'Fermer',
    'Open': 'Ouvrir',
    'City': 'Ville',
    'Any city': 'Toute ville',
    'Price Range': 'Fourchette de prix',
    'Min price': 'Prix min',
    'Max price': 'Prix max',
    'Rooms and Beds': 'Pieces et lits',
    'Any': 'Tous',
    'Property Size (sqm)': 'Surface (m2)',
    'Amenities': 'Commodites',
    'Wifi': 'Wifi',
    'Aircon': 'Climatisation',
    'Washer': 'Machine a laver',
    'Dryer': 'Seche-linge',
    'Kitchen': 'Cuisine',
    'Heating': 'Chauffage',
    'Professional only': 'Professionnels uniquement',
    'Verified only': 'Verifies uniquement',
    'Clear All': 'Tout effacer',
    'Show homes': 'Afficher les biens',
    'Split': 'Partage',
    'Map': 'Carte',
    'Load more results': 'Charger plus de resultats',
    'Location': 'Localisation',
    'More filters': 'Plus de filtres',
    'Minimum rooms': 'Nombre minimum de pieces',
    'No minimum': 'Aucun minimum',
    '1 room+': '1 piece+',
    '2 rooms+': '2 pieces+',
    '3 rooms+': '3 pieces+',
    '4 rooms+': '4 pieces+',
    'Minimum surface (sqm)': 'Surface minimale (m2)',
    'Apply filters': 'Appliquer les filtres',
    '{count} RESULT': '{count} RESULTAT',
    '{count} RESULTS': '{count} RESULTATS',
    'Search intelligence': 'Vue intelligente de la recherche',
    'Results tailored to your filters': 'Resultats adaptes a vos filtres',
    'Adjust city, type, or budget to refine the list.': 'Ajustez la ville, le type ou le budget pour affiner la liste.',
    'Adjust region, city, type, or budget to refine the list.': 'Ajustez la region, la ville, le type ou le budget pour affiner la liste.',
    'Clear filters': 'Effacer les filtres',
    'Average ask': 'Prix moyen',
    'Top location': 'Zone dominante',
    'Verified share': 'Part verifies',
    '{count} home ready to explore': '{count} bien pret a explorer',
    '{count} homes ready to explore': '{count} biens prets a explorer',
    'No filters applied': 'Aucun filtre actif',
    'No matching properties for current filters.': 'Aucun bien ne correspond aux filtres actuels.',
    'No listings match your filters yet.': 'Aucun bien ne correspond encore a vos filtres.',
    'No listings available yet.': 'Aucune annonce disponible pour le moment.',
    'Overview': "Vue d'ensemble",
    'Ads': 'Publicites',
    'Verification': 'Verification',
    'Profiles': 'Profils',
    'Listings': 'Annonces',
    'Admin users': 'Comptes admin',
    'Admin accounts': 'Comptes admin',
    'Create / update admin': 'Creer / mettre a jour admin',
    'Save admin user': 'Enregistrer admin',
    'Create or manage admin access profiles': 'Creer ou gerer les acces admin',
    'No admin profiles yet.': 'Aucun profil admin pour le moment.',
    'Created by': 'Cree par',
    'Active': 'Actif',
    'Disabled': 'Desactive',
    'Disable': 'Desactiver',
    'Enable': 'Activer',
    'Admin panel': 'Panneau admin',
    'Admin': 'Admin',
    'Super admin': 'Super admin',
    'Moderator': 'Moderateur',
    'Owner avatar': 'Avatar du proprietaire',
    'Profile': 'Profil',
    'Call': 'Appeler',
    'WhatsApp': 'WhatsApp',
    'Schedule a visit': 'Planifier une visite',
    'View amenities': 'Voir les commodites',
    'Hide amenities': 'Masquer les commodites',
    'Video tour': 'Visite video',
    'Walk through this home before your visit.': 'Visitez ce bien en video avant votre rendez-vous.',
    'No video tour uploaded yet.': "Aucune visite video n'est encore disponible.",
    'No amenities provided.': 'Aucune commodite renseignee.',
    'Video preview': 'Apercu video',
    'Affordability (For Sale)': 'Simulation de financement (A vendre)',
    'Down payment (TND)': 'Apport initial (TND)',
    'Loan period': 'Duree du pret',
    '10 years': '10 ans',
    '15 years': '15 ans',
    '20 years': '20 ans',
    '25 years': '25 ans',
    'Interest rate (%)': "Taux d'interet (%)",
    'Estimated monthly payment: --': 'Paiement mensuel estime : --',
    'Listing not found.': 'Annonce introuvable.',
    'For Sale': 'A vendre',
    'Long-term rent': 'Location longue duree',
    'Short-term stay': 'Sejour courte duree',
    'Land': 'Terrain',
    'Office': 'Bureau',
    'Commercial space': 'Local commercial',
    'Professional listing': 'Annonce professionnelle',
    'Pro listing': 'Annonce Pro',
    'Agency listing': 'Annonce agence',
    'Promoter listing': 'Annonce promoteur',
    'Individual listing': 'Annonce particulier',
    '{count} rooms': '{count} pieces',
    '{count} baths': '{count} salles de bain',
    'Clear': 'Clair',
    'Mild': 'Doux',
    'Sea breeze': 'Brise marine',
    'Sunny': 'Ensoleille',
    'Dry': 'Sec',
    'Warm': 'Chaud',
    'Coastal': 'Côtier',
    'Pleasant': 'Agreable',
    'Availability: {value}': 'Disponibilite : {value}',
    'N/A': 'N/A',
    '{count} reviews': '{count} avis',
    'Direct owner': 'Proprietaire direct',
    'Estimated monthly payment: {value} TND': 'Paiement mensuel estime : {value} TND',
    'Publish your listing in minutes': 'Publiez votre annonce en quelques minutes',
    'Simple flow for individuals and professional agencies. Complete the steps and manage everything from your dashboard.': "Parcours simple pour particuliers et agences. Completez les etapes et gerez tout depuis votre tableau de bord.",
    'Simple flow to publish clean listings quickly. Manage account type and Pro access from your profile settings.': 'Parcours simple pour publier rapidement des annonces propres. Gerez le type de compte et l acces Pro depuis vos parametres de profil.',
    'Simple flow to publish clean listings quickly. Your profile settings control account tags automatically.': 'Parcours simple pour publier rapidement des annonces propres. Les parametres de votre profil controlent automatiquement les tags du compte.',
    'Modern home': 'Maison moderne',
    'Steps': 'Etapes',
    'Step 1: Account type': 'Etape 1 : Type de compte',
    'Choose how you want to publish your listing.': 'Choisissez comment publier votre annonce.',
    'Individual': 'Particulier',
    'Professional': 'Professionnel',
    'Pro': 'Pro',
    'Continue': 'Continuer',
    'Step 2: Sign in': 'Etape 2 : Connexion',
    'Frontend-only placeholder authentication.': "Authentification de demonstration cote client.",
    'Email': 'Email',
    'Password': 'Mot de passe',
    'Back': 'Retour',
    'Step 3: Property details': 'Etape 3 : Details du bien',
    'Category': 'Categorie',
    'Extra filters': 'Filtres supplementaires',
    'Rent Long-Term': 'Location longue duree',
    'Rent Short-Term': 'Location courte duree',
    'Address': 'Adresse',
    'Price (TND)': 'Prix (TND)',
    'Availability dates (short-term)': 'Dates de disponibilite (courte duree)',
    'Description': 'Description',
    'Upload images': 'Telecharger des images',
    'Agency name': "Nom de l'agence",
    'Agency logo/avatar URL': "URL du logo/avatar de l'agence",
    'Agency short bio': "Courte bio de l'agence",
    'Publish listing': "Publier l'annonce",
    'you@example.com': 'vous@exemple.com',
    'Area, City': 'Quartier, Ville',
    'June-August 2026': 'Juin-Aout 2026',
    'Describe your property': 'Decrivez votre bien',
    'Your agency': 'Votre agence',
    'https://...': 'https://...',
    'Short professional summary': 'Courte presentation professionnelle',
    'Manage your listings in one place': 'Gerez vos annonces en un seul endroit',
    'Switch between individual and professional modes, update status, and monitor listing activity.': 'Passez du mode particulier au mode professionnel, mettez a jour les statuts et suivez les performances.',
    'Professional tools unlock from profile settings. Track listing activity and performance in one place.': 'Les outils professionnels se debloquent depuis les parametres du profil. Suivez l activite et les performances des annonces au meme endroit.',
    'Dashboard mode': 'Mode tableau de bord',
    'Your listings': 'Vos annonces',
    'Add listing': 'Ajouter une annonce',
    'Professional tools': 'Outils professionnels',
    'Boost top listings for premium placement and agency visibility.': 'Mettez en avant les meilleures annonces pour une visibilite premium.',
    'Boost listing': "Booster l'annonce",
    'Open profile': 'Ouvrir le profil',
    'Open tracking dashboard': 'Ouvrir le tableau de suivi',
    'Agency / Promoter': 'Agence / Promoteur',
    'Professional mode requires Agency or Promoter account tag.': 'Le mode professionnel necessite un tag de compte Agence ou Promoteur.',
    'Open settings': 'Ouvrir les parametres',
    'Individual listings': 'Annonces particuliers',
    'Active listings': 'Annonces actives',
    'Pending verification': 'En attente de verification',
    'Inquiries': 'Demandes',
    'Saved by users': 'Sauvegardes',
    'No individual listings yet.': "Aucune annonce particulier pour l'instant.",
    'Professional listings': 'Annonces professionnelles',
    'Total listings': 'Total annonces',
    'Active campaigns': 'Campagnes actives',
    'Pending reviews': 'Avis en attente',
    'Client leads': 'Prospects clients',
    'No professional listings found.': 'Aucune annonce professionnelle trouvee.',
    'Featured/Sponsored': 'Mis en avant / Sponsorise',
    'Leads: {count}': 'Prospects : {count}',
    'Saves: {count}': 'Sauvegardes : {count}',
    'Platform tracking dashboard': 'Tableau de suivi de la plateforme',
    'Internal monitoring for listing volume, category performance, and top-performing inventory.': 'Suivi interne du volume des annonces, des performances par categorie et des meilleures annonces.',
    'Admin operations': 'Operations admin',
    'Moderate listings, review account verification, and manage sponsored ad content.': 'Moderez les annonces, verifiez les comptes et gerez les espaces sponsorises.',
    'Core KPIs': 'Indicateurs cles',
    'Live mock data': 'Donnees simulées en direct',
    'Live admin state': 'Etat admin en direct',
    'Traffic by category': 'Trafic par categorie',
    'Top performing listings': 'Annonces les plus performantes',
    'Sponsored ad sections': 'Espaces publicitaires sponsorises',
    'Profile verification queue': 'File de verification des profils',
    'Profile management': 'Gestion des profils',
    'Listing moderation': 'Moderation des annonces',
    'Home banner': 'Banniere accueil',
    'Search banner': 'Banniere recherche',
    'Listing details banner': 'Banniere fiche annonce',
    'Badge': 'Badge',
    'Title': 'Titre',
    'CTA label': 'Libelle bouton',
    'CTA link': 'Lien bouton',
    'Actions': 'Actions',
    'Requested': 'Demande',
    'Approve': 'Approuver',
    'Reject': 'Refuser',
    'Existing verified profiles': 'Profils verifies existants',
    'No agency/promoter profiles yet.': 'Aucun profil agence/promoteur pour le moment.',
    'Edit': 'Modifier',
    'Delete': 'Supprimer',
    'No pending profile verification requests.': 'Aucune demande de verification de profil en attente.',
    'No document': 'Aucun document',
    'No listings available.': 'Aucune annonce disponible.',
    'Listing': 'Annonce',
    'Status': 'Statut',
    'Ownership': 'Propriete',
    'Ownership requested': 'Propriete demandee',
    'Post review': "Revue d'annonce",
    'Post review requested': "Revue d'annonce demandee",
    'Not submitted': 'Non soumis',
    'Rejected': 'Refuse',
    'Pending': 'En attente',
    'View listing': "Voir l'annonce",
    'Verify post': "Verifier l'annonce",
    'Mark verified': 'Marquer verifie',
    'Pending profile verification': 'Verification profil en attente',
    'Professional listings': 'Annonces professionnelles',
    'Verified listings': 'Annonces verifiees',
    'Est. monthly GMV': 'GMV mensuel estime',
    'Rent Long': 'Location longue',
    'Rent Short': 'Location courte',
    'Active listings': 'Annonces actives',
    'Professional not found': 'Professionnel introuvable',
    'No profile information available.': 'Aucune information de profil disponible.',
    'No listings currently active.': 'Aucune annonce active actuellement.',
    '{count} active': '{count} active',
    'Please enter a valid email and password (6+ chars).': 'Veuillez entrer un email et un mot de passe valides (6+ caracteres).',
    'Please complete all required listing fields.': "Veuillez completer tous les champs obligatoires de l'annonce.",
    'Professional listings require an agency name.': "Les annonces professionnelles exigent un nom d'agence.",
    'Uploaded preview': 'Apercu telecharge',
    'Professional Listing - {type}': 'Annonce professionnelle - {type}',
    'Owner Listing - {type}': 'Annonce proprietaire - {type}',
    'New Individual Account': 'Nouveau compte particulier',
    'Flexible dates': 'Dates flexibles',
    'Immediate': 'Immediat',
    'User-submitted listing': 'Annonce soumise par utilisateur',
    'Pending verification': 'En attente de verification',
    'pending verification': 'en attente de verification',
    'Property submitted successfully. Redirecting you to My Listings dashboard...': 'Bien envoye avec succes. Redirection vers votre tableau Mes annonces...',
    'Professional': 'Professionnel',
    'Verified': 'Verifie',
    'Save listing': "Enregistrer l'annonce",
    '{count} photos': '{count} photos',
    '{count} Rooms': '{count} pieces',
    'Agency': 'Agence',
    'Individual': 'Particulier',
    'Close preview': "Fermer l'aperçu",
    'Sponsored': 'Sponsorise',
    'Promoted': 'Promotion',
    'Premium placement for agencies': 'Placement premium pour les agences',
    'Reach serious buyers and renters with high-visibility homepage placement.': "Touchez des acheteurs et locataires qualifies avec une visibilite premium sur la page d'accueil.",
    'Your banner could be here': 'Votre banniere peut etre ici',
    'Reach active buyers and renters directly inside search results.': 'Touchez des acheteurs et locataires actifs directement dans les resultats de recherche.',
    'Advertise with us': 'Annoncer chez nous',
    'Zoom in': 'Zoom avant',
    'Zoom out': 'Zoom arriere',
    'Show map': 'Afficher la carte',
    'View map': 'Voir la carte',
    'Hide map': 'Masquer la carte',
    'Map & location': 'Carte et localisation',
    'Open full map': 'Ouvrir la carte complete',
    'Price per m2': 'Prix par m2',
    'Homes for sale in Tunisia': 'Biens a vendre en Tunisie',
    'Watch video tour': 'Voir la visite video',
    'Send message': 'Envoyer un message',
    'Send message to owner': 'Envoyer un message au proprietaire',
    'Leave your contact details and message. The owner will reach out to you.': 'Laissez vos coordonnees et votre message. Le proprietaire vous contactera.',
    'Reach the owner directly by call, WhatsApp, or message.': 'Contactez directement le proprietaire par appel, WhatsApp ou message.',
    'Report': 'Signaler',
    'Share': 'Partager',
    'Share listing': "Partager l'annonce",
    '♡ Favorite': '♡ Favori',
    'Let me know if price drops': "M'avertir si le prix baisse",
    'Link copied': 'Lien copie',
    'Copy link': 'Copier le lien',
    'Amenities': 'Commodites',
    'Availability': 'Disponibilite',
    'Hosted by': 'Heberge par',
    'Show all photos': 'Voir toutes les photos',
    'Details': 'Details',
    'per listing': 'par annonce',
    'See profile': 'Voir le profil',
    'Similar listings': 'Annonces similaires',
    'No similar listings available yet.': "Aucune annonce similaire disponible pour l'instant.",
    'Advertise this property type': "Annoncez ce type de bien",
    'Reach active buyers and renters with premium placement in listing details.': 'Touchez des acheteurs et locataires actifs avec une mise en avant premium sur la fiche du bien.',
    'Previous photo': 'Photo precedente',
    'Next photo': 'Photo suivante',
    'Go to photo {count}': 'Aller a la photo {count}',
    'Previous image': 'Image precedente',
    'Next image': 'Image suivante',
    '{count} review': '{count} avis',
    '{value} TND / month': '{value} TND / mois',
    '{value} TND / night': '{value} TND / nuit',
    '{value} TND': '{value} TND',
    'Tunisia': 'Tunisie',
    'active': 'active',
    'Professional Account': 'Compte professionnel',
    'New professional profile with recently submitted listings.': 'Nouveau profil professionnel avec des annonces recemment soumises.',
    'Agency cover image': "Image de couverture de l'agence",
    'Website': 'Site web',
    'Instagram': 'Instagram',
    'Facebook': 'Facebook',
    'LinkedIn': 'LinkedIn',
    'Real Estate Agency': 'Agence immobiliere',
    'Create account': 'Creer un compte',
    'Log in': 'Connexion',
    'Welcome to TuniHome': 'Bienvenue chez TuniHome',
    'Find, manage, and publish homes with a clean workflow.': 'Trouvez, gerez et publiez des biens avec un parcours clair.',
    'Access saved listings, manage agency visibility, and respond to leads faster.': 'Accedez aux annonces enregistrees, gerez la visibilite de votre agence et repondez plus vite aux prospects.',
    'Save favorites and alerts': 'Enregistrez vos favoris et alertes',
    'Track listing performance': 'Suivez la performance des annonces',
    'Manage agency profile and social links': "Gerez le profil d'agence et les liens sociaux",
    'Welcome back': 'Bon retour',
    'Log in to continue managing your listings and account.': 'Connectez-vous pour continuer a gerer vos annonces et votre compte.',
    'Email or phone': 'Email ou telephone',
    'Stay connected': 'Rester connecte',
    'Show': 'Afficher',
    'Hide': 'Masquer',
    'New to TuniHome?': 'Nouveau sur TuniHome ?',
    'Invalid email or password.': 'Email ou mot de passe invalide.',
    'Invalid phone/email or password.': 'Telephone/email ou mot de passe invalide.',
    'Please enter phone/email and password (6+ chars).': 'Veuillez saisir telephone/email et mot de passe (6+ caracteres).',
    'Start in minutes': 'Commencez en quelques minutes',
    'Create your TuniHome account and manage listings with confidence.': 'Creez votre compte TuniHome et gerez vos annonces en toute confiance.',
    'Built for individuals and agencies with simple tools, clean controls, and fast publishing.': 'Concu pour les particuliers et agences avec des outils simples, des controles clairs et une publication rapide.',
    'One place for all listings': 'Un seul espace pour toutes les annonces',
    'Professional profile visibility': 'Visibilite du profil professionnel',
    'Quick publish and edit flow': 'Publication et modification rapides',
    'Create your account': 'Creez votre compte',
    'Join TuniHome to publish, save, and manage properties.': 'Rejoignez TuniHome pour publier, enregistrer et gerer des biens.',
    'Full name': 'Nom complet',
    'Role': 'Role',
    'Your name': 'Votre nom',
    'Phone number': 'Numero de telephone',
    'Email (optional)': 'Email (facultatif)',
    'Confirm password': 'Confirmer le mot de passe',
    'Already have an account?': 'Vous avez deja un compte ?',
    'Please enter your full name.': 'Veuillez saisir votre nom complet.',
    'Please enter a valid phone number.': 'Veuillez saisir un numero de telephone valide.',
    'Please enter a valid email (or leave it empty).': "Veuillez saisir un email valide (ou laissez vide).",
    'Passwords must match and be at least 6 characters.': 'Les mots de passe doivent correspondre et contenir au moins 6 caracteres.',
    'Account created successfully. Redirecting to your dashboard...': 'Compte cree avec succes. Redirection vers votre tableau de bord...',
    'Login successful. Redirecting to your dashboard...': 'Connexion reussie. Redirection vers votre tableau de bord...',
    'Account created successfully. Redirecting...': 'Compte cree avec succes. Redirection...',
    'Login successful. Redirecting...': 'Connexion reussie. Redirection...',
    'Explore': 'Explorer',
    'Buy homes': 'Acheter des biens',
    'Rent homes': 'Louer des biens',
    'Vacation homes': 'Maisons de vacances',
    'Services': 'Services',
    'Agency profiles': 'Profils agences',
    'My account': 'Mon compte',
    'Support': 'Support',
    'Help center': "Centre d'aide",
    'Contact us': 'Contactez-nous',
    'Contact Sales': 'Contacter les ventes',
    'Safety tips': 'Conseils de securite',
    'Follow us': 'Suivez-nous',
    'Company': 'Societe',
    'About TuniHome': 'A propos de TuniHome',
    'Terms': 'Conditions',
    'Privacy': 'Confidentialite',
    'All rights reserved.': 'Tous droits reserves.',
    'Log in to list': 'Connectez-vous pour publier',
    'Create a complete listing': 'Creez une annonce complete',
    'Listing setup': "Configuration de l'annonce",
    'Connected as {email}': 'Connecte en tant que {email}',
    'Profile publishing settings': 'Configuration de publication du profil',
    'Manage in profile': 'Gerer dans le profil',
    'Photo limit: {count}': 'Limite de photos : {count}',
    'Priority placement enabled': 'Positionnement prioritaire active',
    'Standard placement': 'Positionnement standard',
    'Account tags are managed in profile settings and applied automatically to your listing.': 'Les tags du compte sont geres dans les parametres du profil et appliques automatiquement a votre annonce.',
    'Account type': 'Type de compte',
    'Listing account type': "Type de compte d'annonce",
    'Property details': 'Details du bien',
    'Add the main information guests and buyers need first.': 'Ajoutez d abord les informations principales utiles aux visiteurs et acheteurs.',
    'Listing title': "Titre de l'annonce",
    'Example: Modern sea-view apartment': 'Exemple : Appartement moderne avec vue mer',
    'Rooms': 'Pieces',
    'Baths': 'Salles de bain',
    'Surface (sqm)': 'Surface (m2)',
    'Media uploads': 'Telechargement des medias',
    'Upload clear photos and one optional walkthrough video.': 'Ajoutez des photos claires et une video de visite facultative.',
    'Use image slots to build a clean gallery, then add one optional walkthrough video.': 'Utilisez des emplacements photo pour creer une galerie claire puis ajoutez une video de visite facultative.',
    'Upload photos': 'Telecharger des photos',
    'Image gallery': 'Galerie photos',
    'Tap a slot to attach photos.': 'Touchez un emplacement pour ajouter des photos.',
    'Tap a slot to attach photos. (Upgrade to Pro for higher limits and two videos.)': 'Touchez un emplacement pour ajouter des photos. (Passez en Pro pour plus de limites et deux videos.)',
    'Add photos': 'Ajouter des photos',
    'Add more photos': 'Ajouter plus de photos',
    'Slot {count}': 'Emplacement {count}',
    'Remove photo': 'Supprimer la photo',
    'Add up to 8 photos.': "Ajoutez jusqu'a 8 photos.",
    'Add up to {count} photos.': "Ajoutez jusqu'a {count} photos.",
    'Upload video (optional)': 'Telecharger une video (facultatif)',
    'Add a short walkthrough video.': 'Ajoutez une courte video de visite.',
    'Video URL (optional)': 'URL video (facultatif)',
    'Upload second video (optional)': 'Telecharger une deuxieme video (facultatif)',
    'Add a second angle or neighborhood walk.': 'Ajoutez un deuxieme angle ou une visite du quartier.',
    'Second video URL (optional)': 'Deuxieme URL video (facultatif)',
    'Pin exact map location': 'Placer la localisation exacte',
    'Click map to set listing location': "Cliquez sur la carte pour definir l'emplacement du bien",
    'Select your city, then click on the map to fine-tune the exact location.': 'Selectionnez votre ville puis cliquez sur la carte pour affiner la localisation exacte.',
    'Ownership proof screenshot / paper (admin only)': 'Capture / papier de preuve de propriete (admin uniquement)',
    'Upload one clear document screenshot so TuniHome admins can verify your listing faster.': 'Telechargez une capture claire d un document pour que les admins TuniHome verifient votre annonce plus rapidement.',
    'Optional but recommended: upload one clear document screenshot so TuniHome admins can verify your listing faster.': 'Optionnel mais recommande : telechargez une capture claire d un document pour que les admins TuniHome verifient votre annonce plus rapidement.',
    'Agency/promoter verification pending: this listing will publish as Individual until approved.': 'Verification agence/promoteur en attente : cette annonce sera publiee en Particulier jusqu a validation.',
    'Account verified for {tier}. Listings publish with this account tag.': 'Compte verifie pour {tier}. Les annonces publient avec ce tag de compte.',
    'Description & amenities': 'Description et commodites',
    'Write a short, honest description and select the key amenities.': 'Redigez une description claire et selectionnez les commodites principales.',
    'Amenities checklist': 'Liste des commodites',
    'Professional details': 'Details professionnels',
    'Add your agency branding and contact identity.': 'Ajoutez le branding de votre agence et son identite de contact.',
    'Please upload at least one photo.': 'Veuillez telecharger au moins une photo.',
    'Second video upload requires Pro subscription.': 'Le deuxieme telechargement video necessite un abonnement Pro.',
    'Please remove some photos before switching plan.': 'Veuillez supprimer quelques photos avant de changer de plan.',
    'Listing title is required.': "Le titre de l'annonce est requis.",
    'Please select a city.': 'Veuillez selectionner une ville.',
    'Please upload one ownership proof document for verification.': 'Veuillez telecharger un document de preuve de propriete pour la verification.',
    'Please enter a valid property price.': 'Veuillez entrer un prix valide pour le bien.',
    'Please enter a valid email and full name.': 'Veuillez saisir un email valide et votre nom complet.',
    'Please provide a short description (at least 20 characters).': 'Veuillez fournir une courte description (au moins 20 caracteres).',
    'Video ready: {name}': 'Video prete : {name}',
    'Video URL added.': 'URL video ajoutee.',
    'Cancel': 'Annuler',
    'Settings | TuniHome': 'Parametres | TuniHome',
    'My Listings | TuniHome': 'Mes annonces | TuniHome',
    'Profile settings': 'Parametres du profil',
    'Check listings': 'Verifier les annonces',
    'Log out': 'Se deconnecter',
    'Account menu': 'Menu du compte',
    'Open your settings page to update name, photo, and contact details.': 'Ouvrez votre page de parametres pour modifier le nom, la photo et les coordonnees.',
    'Open your listings page to review status and performance.': 'Ouvrez votre page annonces pour verifier le statut et les performances.',
    'Are you sure you want to sign out from your account?': 'Voulez-vous vraiment vous deconnecter de votre compte ?',
    'Open page': 'Ouvrir la page',
    'Sign out': 'Se deconnecter',
    'Log out successful. Redirecting...': 'Deconnexion reussie. Redirection...',
    'Manage your profile settings': 'Gerez les parametres de votre profil',
    'Update your account identity and contact details.': "Mettez a jour l'identite et les coordonnees de votre compte.",
    'Profile settings and plan saved successfully.': 'Parametres du profil et plan enregistres avec succes.',
    'Profile settings and account tag saved successfully.': 'Parametres du profil et tag de compte enregistres avec succes.',
    'Account plan': 'Plan du compte',
    'Individual plan': 'Plan particulier',
    'Pro plan': 'Plan Pro',
    'Manage account type and Pro subscription from profile settings.': 'Gerez le type de compte et l abonnement Pro depuis les parametres du profil.',
    'Manage plan': 'Gerer le plan',
    'Your current plan: {plan}': 'Votre plan actuel : {plan}',
    'Pro features: Pro tag, priority ranking, more photos, advanced stats.': 'Fonctionnalites Pro : badge Pro, priorite de classement, plus de photos, statistiques avancees.',
    'Listings with Pro plan get priority placement in search.': 'Les annonces avec plan Pro obtiennent une priorite dans la recherche.',
    'Account plans': 'Plans de compte',
    'Account tags': 'Tags de compte',
    'Choose your plan from profile settings. Pro is a paid subscription feature.': 'Choisissez votre plan depuis les parametres de profil. Pro est une fonctionnalite par abonnement payant.',
    'Choose your account tag from profile settings. Agency and promoter accounts require manual verification.': 'Choisissez votre tag de compte depuis les parametres du profil. Les comptes agence et promoteur necessitent une verification manuelle.',
    'Professional (Pro)': 'Professionnel (Pro)',
    'Agency': 'Agence',
    'Promoter': 'Promoteur',
    'Tag': 'Tag',
    'Paid monthly': 'Paiement mensuel',
    '29 TND / month': '29 TND / mois',
    'Standard listing tag': "Tag d'annonce standard",
    'Up to 8 photos per listing': "Jusqu'a 8 photos par annonce",
    'Standard listing placement': "Positionnement d'annonce standard",
    'Basic account view': 'Vue de compte basique',
    'Basic traffic': 'Trafic de base',
    'Pro tag on listings': 'Badge Pro sur les annonces',
    'Up to 16 photos per listing': "Jusqu'a 16 photos par annonce",
    'Priority listing placement': "Positionnement prioritaire de l'annonce",
    'Agency badge on listings': 'Badge agence sur les annonces',
    'Up to 20 photos per listing': "Jusqu'a 20 photos par annonce",
    'Higher ranking than standard Pro': 'Classement plus eleve que Pro standard',
    'Promoter badge on listings': 'Badge promoteur sur les annonces',
    'Up to 24 photos per listing': "Jusqu'a 24 photos par annonce",
    'Top ranking placement': 'Placement au rang prioritaire',
    'Advanced listing statistics': "Statistiques avancees d'annonce",
    'Use Individual': 'Utiliser Particulier',
    'Request verification': 'Demander la verification',
    'Start verification': 'Demarrer la verification',
    'Cancel request': 'Annuler la demande',
    'Verification pending': 'Verification en attente',
    'Verified profile active': 'Profil verifie actif',
    'Unlock Pro': 'Debloquer Pro',
    'Unlock paid plan': 'Debloquer une formule payante',
    'Pro Agency': 'Pro Agence',
    'Pro Promoter': 'Pro Promoteur',
    'Current plan: Individual': 'Plan actuel : Particulier',
    'Current plan: Agency': 'Plan actuel : Agence',
    'Current plan: Promoter': 'Plan actuel : Promoteur',
    'Current tag: Individual': 'Tag actuel : Particulier',
    'Current tag: Agency': 'Tag actuel : Agence',
    'Current tag: Promoter': 'Tag actuel : Promoteur',
    'Current plan: Pro': 'Plan actuel : Pro',
    'Current plan: Pro Agency': 'Plan actuel : Pro Agence',
    'Current plan: Pro Promoter': 'Plan actuel : Pro Promoteur',
    'Current plan: Professional (Pro)': 'Plan actuel : Professionnel (Pro)',
    'Pro statistics': 'Statistiques Pro',
    'Listing statistics': 'Statistiques des annonces',
    'Performance insights unlocked with your Pro subscription.': 'Insights de performance debloques avec votre abonnement Pro.',
    'Performance insights available for all account types.': 'Insights de performance disponibles pour tous les types de compte.',
    'Monthly impressions': 'Impressions mensuelles',
    'Lead requests': 'Demandes de contact',
    'Contact conversion': 'Conversion contact',
    'Professional mode requires Pro subscription.': "Le mode professionnel necessite l'abonnement Pro.",
    'Upgrade to Pro': 'Passer a Pro',
    'Upgrade to Pro | TuniHome': 'Passer a Pro | TuniHome',
    'Account type update | TuniHome': 'Mise a jour du type de compte | TuniHome',
    'Account type update': 'Mise a jour du type de compte',
    'Paid plans were removed. Choose Individual, Agency, or Promoter directly from profile settings.': 'Les formules payantes ont ete supprimees. Choisissez Particulier, Agence ou Promoteur directement depuis les parametres du profil.',
    'Manage account tags in settings': 'Gerer les tags de compte dans les parametres',
    'Agency and promoter accounts require manual verification by TuniHome.': 'Les comptes agence et promoteur necessitent une verification manuelle par TuniHome.',
    'Unlock premium visibility and analytics for your listings.': 'Debloquez une meilleure visibilite et des analyses pour vos annonces.',
    'Professional Pro Plan': 'Plan Professionnel Pro',
    '29 TND / month billed monthly. Cancel any time from profile settings.': '29 TND / mois, facturation mensuelle. Annulation possible a tout moment depuis les parametres du profil.',
    '{value} TND / month billed monthly. Cancel any time from profile settings.': '{value} TND / mois, facturation mensuelle. Annulation possible a tout moment depuis les parametres du profil.',
    'Pro tag on all your listings': 'Badge Pro sur toutes vos annonces',
    'Priority placement in search results': 'Positionnement prioritaire dans les resultats de recherche',
    'Views, visits, and time-spent analytics': 'Analyses des vues, visites et temps passe',
    'Cardholder name': 'Nom du titulaire de la carte',
    'Card number': 'Numero de carte',
    'Expiry': 'Expiration',
    'Pay 29 TND and activate Pro': 'Payer 29 TND et activer Pro',
    'Pay {price} TND and activate {plan}': 'Payer {price} TND et activer {plan}',
    'Back to settings': 'Retour aux parametres',
    'Views': 'Vues',
    'Visits': 'Visites',
    'Leads': 'Prospects',
    'Avg time': 'Temps moyen',
    'Avg time on listing': "Temps moyen sur l'annonce",
    'min': 'min',
    'Please complete all payment fields.': 'Veuillez remplir tous les champs de paiement.',
    'Pro plan activated successfully.': 'Plan Pro active avec succes.',
    'Pro plan activated successfully. Redirecting to settings...': 'Plan Pro active avec succes. Redirection vers les parametres...',
    'Manage Pro billing': 'Gerer la facturation Pro',
    'Manage paid billing': 'Gerer la facturation',
    'Paid account types': 'Types de comptes payants',
    'Verification status: Not required': 'Statut verification : Non requis',
    'Verification status: Document required': 'Statut verification : Document requis',
    'Verification status: Pending review': 'Statut verification : En attente de validation',
    'Verification status: Verified': 'Statut verification : Verifie',
    'Verification status: Rejected': 'Statut verification : Refuse',
    'Verification request sent. We will review your account.': 'Demande de verification envoyee. Nous allons examiner votre compte.',
    'Verification request is pending. Use cancel request first.': 'La demande de verification est deja en attente. Utilisez annuler la demande en premier.',
    'Currently under Individual profile while verification is pending. Cancel request to switch.': 'Le compte reste en profil particulier pendant la verification. Annulez la demande pour changer.',
    'Currently under Individual profile while verification is pending. Use cancel request to change.': 'Le compte reste en profil particulier pendant la verification. Utilisez annuler la demande pour modifier.',
    'Verification request already pending.': 'Demande de verification deja en attente.',
    'This account tag is already active and verified.': 'Ce tag de compte est deja actif et verifie.',
    'Switch to Individual first before requesting a new account tag.': 'Repassez en Particulier avant de demander un nouveau tag de compte.',
    'Please upload a verification document and choose Agency or Promoter.': 'Veuillez telecharger un document de verification et choisir Agence ou Promoteur.',
    'Verification request canceled. Account remains Individual.': 'Demande annulee. Le compte reste Particulier.',
    'Select Agency or Promoter first.': 'Selectionnez d abord Agence ou Promoteur.',
    'Verification document (agency/promoter)': 'Document de verification (agence/promoteur)',
    'Upload one legal proof document for manual review by TuniHome admins.': 'Telechargez un document legal de preuve pour la validation manuelle par les admins TuniHome.',
    'Manual verification required': 'Verification manuelle requise',
    'Agency identity shown on listings': 'Identite agence affichee sur les annonces',
    'Promoter identity shown on listings': 'Identite promoteur affichee sur les annonces',
    'Eligible for paid Pro add-on': "Eligible a l'option Pro payante",
    'Pro subscription': 'Abonnement Pro',
    'Unlock higher media limits, two videos, and advanced listing statistics.': 'Debloquez plus de medias, deux videos et des statistiques avancees.',
    'Unlock higher media limits, two videos, and priority placement.': 'Debloquez plus de medias, deux videos et un placement prioritaire.',
    'Standard': 'Standard',
    'Pro active': 'Pro actif',
    'Upgrade to Pro': 'Passer en Pro',
    'Manage Pro': 'Gerer Pro',
    'Agency or promoter account requires a verification document.': 'Un compte agence ou promoteur necessite un document de verification.',
    'Public profile': 'Profil public',
    'Agency cover URL': "URL de couverture agence",
    'Phone': 'Telephone',
    'Profile photo URL': 'URL photo de profil',
    'Start verification': 'Demarrer la verification',
    'Cancel verification request': 'Annuler la demande de verification',
    'Upload a legal document so TuniHome admins can review your account tag request.': 'Telechargez un document legal pour que les admins TuniHome verifient votre demande de tag de compte.',
    'Requested account tag': 'Tag de compte demande',
    'Verification document': 'Document de verification',
    'Review note (optional)': 'Note de verification (facultative)',
    'Your account will stay Individual and your pending request will be removed.': 'Votre compte restera Particulier et la demande en attente sera supprimee.',
    'Confirm cancel': 'Confirmer l annulation',
    'Save changes': 'Enregistrer les modifications',
    'Profile settings saved successfully.': 'Parametres du profil enregistres avec succes.',
    'Back to dashboard': 'Retour au tableau de bord',
    'My listings overview': 'Apercu de mes annonces',
    'Track and review all listings published from your account.': 'Suivez et verifiez toutes les annonces publiees depuis votre compte.',
    'Listing verification process': 'Processus de verification des annonces',
    'Each listing is checked to keep the marketplace accurate and trusted.': 'Chaque annonce est verifiee pour garder une marketplace fiable et precise.',
    'Upload ownership proof screenshots in listing creation so admins can verify faster.': 'Ajoutez des captures de preuve de propriete lors de la creation pour accelerer la verification admin.',
    'Verify ownership': 'Verifier la propriete',
    'Ownership proof document': 'Document de preuve de propriete',
    'Note (optional)': 'Note (facultatif)',
    'Upload a legal ownership proof for this listing. Admin review is required.': 'Telechargez une preuve legale de propriete pour cette annonce. Une revue admin est requise.',
    'Submitted': 'Soumise',
    'We received your listing and queued it for review.': 'Nous avons recu votre annonce et l avons placee en file de verification.',
    'Reviewing details': 'Verification des details',
    'Price, media quality, and location details are verified.': 'Le prix, la qualite des medias et les details de localisation sont verifies.',
    'Published': 'Publiee',
    'Approved listings go live and start appearing in search.': 'Les annonces approuvees sont publiees et apparaissent dans la recherche.',
    '{count} listings live · {pending} pending verification': '{count} annonces en ligne · {pending} en attente de verification',
    'No listings currently active for your account.': 'Aucune annonce active pour votre compte pour le moment.',
    'Save agency': "Enregistrer l'agence",
    'Favorites | TuniHome': 'Favoris | TuniHome',
    'Preferences | TuniHome': 'Preferences | TuniHome',
    'My favorites': 'Mes favoris',
    'Preferences': 'Preferences',
    'Open your favorites page to review saved listings and agencies.': 'Ouvrez la page favoris pour verifier les annonces et agences enregistrees.',
    'Open your preferences page to adjust notifications and search defaults.': 'Ouvrez la page preferences pour ajuster notifications et recherche par defaut.',
    'Your saved spaces': 'Vos espaces enregistres',
    'Review saved listings and agencies in one place.': 'Consultez vos annonces et agences enregistrees au meme endroit.',
    'Favorite listings': 'Annonces favorites',
    'Favorite agencies': 'Agences favorites',
    'No saved listings yet.': "Aucune annonce enregistree pour l'instant.",
    'No saved agencies yet.': "Aucune agence enregistree pour l'instant.",
    '{count} saved': '{count} enregistres',
    'Manage your account preferences': 'Gerez les preferences de votre compte',
    'Tune your notifications and default search behavior.': 'Ajustez vos notifications et vos comportements de recherche par defaut.',
    'Search defaults': 'Parametres de recherche par defaut',
    'Default search mode': 'Mode de recherche par defaut',
    'Default city': 'Ville par defaut',
    'No preference': 'Aucune preference',
    'Default max budget (TND)': 'Budget maximum par defaut (TND)',
    'Notification channels': 'Canaux de notification',
    'Receive email alerts': 'Recevoir les alertes email',
    'Receive WhatsApp updates': 'Recevoir les mises a jour WhatsApp',
    'Show professional listings first': 'Afficher les annonces professionnelles en premier',
    'Save preferences': 'Enregistrer les preferences',
    'Preferences saved successfully.': 'Preferences enregistrees avec succes.',
    'Rent tags': 'Tags location',
    'Group rent': 'Location groupe',
    'Couple rent': 'Location couple',
    'Family rent': 'Location famille',
    'Students rent': 'Location etudiants',
    'Ready by': 'Pret pour',
    '1. Basics': '1. Bases',
    'Step 1: Basics': 'Etape 1 : Bases',
    '2. Details': '2. Details',
    '3. Media & contact': '3. Medias et contact',
    '4. Location': '4. Localisation',
    'Step 2: Property details': 'Etape 2 : Details du bien',
    'Add type, surface, rooms, baths, and amenities.': 'Ajoutez type, surface, pieces, salles de bain et commodites.',
    'Step 3: Media & contact': 'Etape 3 : Medias et contact',
    'Step 4: Location': 'Etape 4 : Localisation',
    'Lot / Terrain': 'Lot / Terrain',
    'Next step': 'Etape suivante',
    'Contact number': 'Numero de contact',
    'Contact note (optional)': 'Note de contact (facultatif)',
    'Please add when the property will be ready.': 'Veuillez ajouter la date de disponibilite du bien.',
    'Please enter your contact phone number.': 'Veuillez entrer votre numero de contact.',
    'Under construction': 'En construction',
    'Price drop alert on': 'Alerte baisse de prix activee',
    'Price drop alert enabled for this listing.': 'Alerte de baisse de prix activee pour cette annonce.',
    'Price drop alert removed.': 'Alerte de baisse de prix supprimee.',
    'Please enter your contact details and message.': 'Veuillez saisir vos coordonnees et votre message.',
    'Message sent to listing owner.': "Message envoye au proprietaire de l'annonce.",
    'Please select a report reason.': 'Veuillez selectionner un motif de signalement.',
    'Report sent. Thank you for your feedback.': 'Signalement envoye. Merci pour votre retour.',
    'Parking': 'Parking',
    'Pool': 'Piscine',
    'Terrace': 'Terrasse',
    'Security': 'Securite',
    'Furnished': 'Meuble',
    'Sea view': 'Vue mer',
    'Clear': 'Clair',
    'Mild': 'Doux',
    'Sea breeze': 'Brise marine',
    'Sunny': 'Ensoleille',
    'Dry': 'Sec',
    'Coastal': 'Cotier',
    'Warm': 'Chaud',
    'Pleasant': 'Agreable'
  };
  const AR_TRANSLATIONS = {
    'Language': 'اللغة',
    'English': 'الإنجليزية',
    'Français': 'الفرنسية',
    'Arabic': 'العربية',
    'My account': 'حسابي',
    'Go to home': 'العودة إلى الرئيسية',
    'Primary navigation': 'التنقل الرئيسي',
    'Home': 'الرئيسية',
    'Search': 'بحث',
    'List': 'أضف',
    'My Listings': 'إعلاناتي',
    'List your properties': 'أضف عقاراتك',
    'Create listing': 'إنشاء إعلان',
    'My listings': 'إعلاناتي',
    'TuniHome | Home': 'TuniHome | الرئيسية',
    'Search Listings | TuniHome': 'البحث عن العقارات | TuniHome',
    'Property Details | TuniHome': 'تفاصيل العقار | TuniHome',
    'Create Listing | TuniHome': 'إنشاء إعلان | TuniHome',
    'My Listings | TuniHome': 'إعلاناتي | TuniHome',
    'Professional Profile | TuniHome': 'الملف المهني | TuniHome',
    'Log in | TuniHome': 'تسجيل الدخول | TuniHome',
    'Create account | TuniHome': 'إنشاء حساب | TuniHome',
    'Settings | TuniHome': 'الإعدادات | TuniHome',
    'Favorites | TuniHome': 'المفضلة | TuniHome',
    'Trusted homes across Tunisia': 'منازل موثوقة في كل تونس',
    'Find verified homes, apartments, villas, and vacation rentals across Tunisia with TuniHome.': 'اعثر على منازل وشقق وفيلات وإيجارات موسمية موثقة في تونس مع TuniHome.',
    'Search homes for sale, rent, and vacation in Tunisia with advanced filters, map view, and trusted listings.': 'ابحث عن عقارات للبيع أو للإيجار أو للعطلات في تونس مع فلاتر متقدمة وخريطة وإعلانات موثوقة.',
    'View listing photos, pricing, amenities, owner details, and map location before contacting the seller.': 'اطلع على صور العقار والسعر والمزايا وبيانات المالك والموقع قبل التواصل.',
    'Explore agency and promoter profiles, active listings, ratings, and contact details on TuniHome.': 'استكشف ملفات الوكالات والمطورين وإعلاناتهم النشطة وتقييماتهم وبيانات التواصل على TuniHome.',
    'Publish your property listing in minutes with clear steps for details, media, contact, and location.': 'انشر إعلان عقارك خلال دقائق بخطوات واضحة للتفاصيل والصور ووسائل التواصل والموقع.',
    'Manage your listings, activity, and publishing performance in one place.': 'أدر إعلاناتك ونشاطك وأداء النشر في مكان واحد.',
    'Review and manage your favorite listings and agencies.': 'راجع وأدر إعلاناتك ووكالاتك المفضلة.',
    'Update your account details, verification request, and publishing profile settings.': 'حدّث بيانات حسابك وطلب التحقق وإعدادات ملف النشر.',
    'Find your next place with confidence.': 'اعثر على منزلك القادم بثقة.',
    'Find verified homes across Tunisia.': 'اعثر على عقارات موثقة في كامل تونس.',
    'Browse verified villas, apartments, and vacation homes from trusted owners and agencies.': 'تصفح فيلات وشقق وبيوت عطلات موثقة من ملاك ووكالات موثوقين.',
    'Buy, rent, or book vacation stays from trusted owners and agencies.': 'اشترِ أو استأجر أو احجز إقامة عطلة من ملاك ووكالات موثوقة.',
    'Premium': 'بريميوم',
    'Get more visibility with Premium': 'احصل على ظهور أكبر مع بريميوم',
    'Upgrade to Pro for stronger discovery, market insights, and priority support.': 'قم بالترقية إلى Pro للحصول على ظهور أقوى ومؤشرات سوق ودعم أسرع.',
    'More exposure': 'ظهور أكبر',
    'Show your listings higher in front of serious buyers and renters.': 'اعرض إعلاناتك بشكل أوضح أمام المشترين والمستأجرين الجادين.',
    'Better listing recommendations': 'توصيات أفضل للإعلان',
    'Follow tailored tips to improve performance and conversion.': 'اتبع نصائح مخصصة لتحسين الأداء والتحويل.',
    'Price and market insights': 'رؤى الأسعار والسوق',
    'Track views, demand, and pricing signals in one place.': 'تابع المشاهدات والطلب وإشارات الأسعار في مكان واحد.',
    'Priority support': 'دعم ذو أولوية',
    'Get faster responses when you need help.': 'احصل على ردود أسرع عندما تحتاج إلى المساعدة.',
    'View Pro plan': 'عرض خطة Pro',
    'Listing mode': 'نمط الإعلان',
    'Buy': 'شراء',
    'Rent': 'إيجار',
    'Vacation': 'عطلات',
    'Quick property search': 'بحث سريع عن العقارات',
    'Region': 'الولاية',
    'Where': 'أين',
    'Search by city': 'ابحث حسب المدينة',
    'Search by region': 'ابحث حسب الولاية',
    'Any region': 'أي ولاية',
    'Select region first': 'اختر الولاية أولاً',
    'Property type': 'نوع العقار',
    'Price': 'السعر',
    'Owner': 'المالك',
    'Any type': 'أي نوع',
    'Apartment': 'شقة',
    'Villa': 'فيلا',
    'House': 'منزل',
    'Room': 'غرفة',
    'Studio': 'استوديو',
    'Condo': 'كوندو',
    'Townhouse': 'تاون هاوس',
    'Budget': 'الميزانية',
    'Any budget': 'أي ميزانية',
    'Any price': 'أي سعر',
    'Up to 1,200 TND': 'حتى 1,200 د.ت',
    'Up to 2,500 TND': 'حتى 2,500 د.ت',
    'Up to 5,000 TND': 'حتى 5,000 د.ت',
    'Up to 10,000 TND': 'حتى 10,000 د.ت',
    'Up to 20,000 TND': 'حتى 20,000 د.ت',
    'Advanced Search': 'بحث متقدم',
    'Search homes': 'ابحث عن العقارات',
    'Search rentals': 'ابحث عن الإيجارات',
    'Search vacation': 'ابحث عن العطلات',
    'TOP PICK': 'أفضل اختيار',
    'View all': 'عرض الكل',
    'NEW PROPERTIES': 'عقارات جديدة',
    'Explore more': 'استكشف المزيد',
    'TOP AGENCIES': 'أفضل الوكالات',
    'Matches now': 'نتائج الآن',
    'Verified homes': 'عقارات موثقة',
    'Cities covered': 'مدن مغطاة',
    'Trusted agencies': 'وكالات موثوقة',
    '{count} listing': '{count} إعلان',
    '{count} listings': '{count} إعلانات',
    'Open filters': 'افتح الفلاتر',
    'Advanced Filters': 'فلاتر متقدمة',
    'Collapse filters': 'إخفاء الفلاتر',
    'Open filter panel': 'افتح لوحة الفلاتر',
    'Close': 'إغلاق',
    'Open': 'فتح',
    'City': 'المدينة',
    'Any city': 'أي مدينة',
    'Price Range': 'نطاق السعر',
    'Min price': 'أقل سعر',
    'Max price': 'أعلى سعر',
    'Rooms and Beds': 'الغرف والأسرة',
    'Any': 'أي',
    'Property Size (sqm)': 'المساحة (م²)',
    'Amenities': 'المزايا',
    'Wifi': 'واي فاي',
    'Aircon': 'تكييف',
    'Washer': 'غسالة',
    'Dryer': 'مجفف',
    'Kitchen': 'مطبخ',
    'Heating': 'تدفئة',
    'Professional only': 'احترافي فقط',
    'Verified only': 'موثق فقط',
    'Clear All': 'مسح الكل',
    'Show homes': 'عرض العقارات',
    'Split': 'مقسّم',
    'Map': 'الخريطة',
    'Load more results': 'تحميل المزيد من النتائج',
    'Location': 'الموقع',
    'More filters': 'المزيد من الفلاتر',
    'Minimum rooms': 'الحد الأدنى للغرف',
    'No minimum': 'بدون حد أدنى',
    '1 room+': 'غرفة واحدة+',
    '2 rooms+': 'غرفتان+',
    '3 rooms+': '3 غرف+',
    '4 rooms+': '4 غرف+',
    'Minimum surface (sqm)': 'الحد الأدنى للمساحة (م²)',
    'Apply filters': 'تطبيق الفلاتر',
    '{count} RESULT': '{count} نتيجة',
    '{count} RESULTS': '{count} نتائج',
    'Search intelligence': 'نظرة البحث',
    'Results tailored to your filters': 'نتائج مناسبة لفلاترك',
    'Adjust city, type, or budget to refine the list.': 'عدّل المدينة أو النوع أو الميزانية لتحسين النتائج.',
    'Adjust region, city, type, or budget to refine the list.': 'عدّل الولاية أو المدينة أو النوع أو الميزانية لتحسين النتائج.',
    'Clear filters': 'امسح الفلاتر',
    'Average ask': 'متوسط السعر',
    'Top location': 'أبرز منطقة',
    'Verified share': 'نسبة الموثق',
    '{count} home ready to explore': '{count} عقار جاهز للاستكشاف',
    '{count} homes ready to explore': '{count} عقارات جاهزة للاستكشاف',
    'No filters applied': 'لا توجد فلاتر مفعلة',
    'No matching properties for current filters.': 'لا توجد عقارات مطابقة للفلاتر الحالية.',
    'No listings match your filters yet.': 'لا توجد إعلانات تطابق فلاترك حالياً.',
    'No listings available yet.': 'لا توجد إعلانات متاحة حالياً.',
    'Profile': 'الملف',
    'Call': 'اتصال',
    'WhatsApp': 'واتساب',
    'Listed by': 'نُشر بواسطة',
    'Description': 'الوصف',
    'View amenities': 'عرض المزايا',
    'Hide amenities': 'إخفاء المزايا',
    'Video tour': 'جولة فيديو',
    'Walk through this home before your visit.': 'تجول في هذا العقار قبل زيارتك.',
    'No video tour uploaded yet.': 'لا توجد جولة فيديو بعد.',
    'No amenities provided.': 'لم تتم إضافة مزايا.',
    'Video preview': 'معاينة الفيديو',
    'Listing not found.': 'لم يتم العثور على الإعلان.',
    'For Sale': 'للبيع',
    'Long-term rent': 'إيجار طويل الأمد',
    'Short-term stay': 'إقامة قصيرة',
    'Land': 'أرض',
    'Office': 'مكتب',
    'Commercial space': 'محل تجاري',
    'Agency listing': 'إعلان وكالة',
    'Promoter listing': 'إعلان مطور',
    'Individual listing': 'إعلان فردي',
    '{count} Rooms': '{count} غرف',
    '{count} rooms': '{count} غرف',
    '{count} baths': '{count} حمامات',
    'Availability: {value}': 'التوفر: {value}',
    'N/A': 'غير متوفر',
    '{count} reviews': '{count} تقييمات',
    '{count} review': '{count} تقييم',
    '{count} photos': '{count} صور',
    'Direct owner': 'المالك مباشرة',
    'Agency': 'وكالة',
    'Individual': 'فردي',
    'Verified': 'موثق',
    'Promoter': 'مطور',
    'Previous photo': 'الصورة السابقة',
    'Next photo': 'الصورة التالية',
    'Go to photo {count}': 'اذهب إلى الصورة {count}',
    'Tunisia': 'تونس',
    'Show map': 'عرض الخريطة',
    'View map': 'عرض الخريطة',
    'Map & location': 'الخريطة والموقع',
    'Open full map': 'فتح الخريطة الكاملة',
    'Price per m2': 'السعر لكل م²',
    'Homes for sale in Tunisia': 'عقارات للبيع في تونس',
    'Show all photos': 'عرض كل الصور',
    'Save listing': 'حفظ الإعلان',
    'Save agency': 'حفظ الوكالة',
    'Real Estate Agency': 'وكالة عقارية',
    'Explore': 'استكشف',
    'Buy homes': 'شراء عقارات',
    'Rent homes': 'إيجار عقارات',
    'Vacation homes': 'بيوت عطلات',
    'Services': 'الخدمات',
    'Agency profiles': 'ملفات الوكالات',
    'Support': 'الدعم',
    'Help center': 'مركز المساعدة',
    'Contact us': 'اتصل بنا',
    'Contact Sales': 'تواصل مع المبيعات',
    'Safety tips': 'نصائح السلامة',
    'Follow us': 'تابعنا',
    'Company': 'الشركة',
    'About TuniHome': 'حول TuniHome',
    'Terms': 'الشروط',
    'Privacy': 'الخصوصية',
    'All rights reserved.': 'جميع الحقوق محفوظة.',
    'Email': 'البريد الإلكتروني',
    'Password': 'كلمة المرور',
    'Email or phone': 'البريد الإلكتروني أو الهاتف',
    'Invalid email or password.': 'بريد إلكتروني أو كلمة مرور غير صحيحة.',
    'Email (optional)': 'البريد الإلكتروني (اختياري)',
    'Passwords must match and be at least 6 characters.': 'يجب أن تتطابق كلمات المرور وألا تقل عن 6 أحرف.',
    'Continue': 'متابعة',
    'Back': 'رجوع',
    'Create account': 'إنشاء حساب',
    'Log in': 'تسجيل الدخول',
    'Welcome to TuniHome': 'مرحبًا بك في TuniHome',
    'Find, manage, and publish homes with a clean workflow.': 'اعثر على العقارات وأدرها وانشرها عبر مسار واضح وسهل.',
    'Access saved listings, manage agency visibility, and respond to leads faster.': 'ادخل إلى الإعلانات المحفوظة وأدر ظهور وكالتك وردّ بسرعة أكبر على العملاء المحتملين.',
    'Save favorites and alerts': 'احفظ المفضلة والتنبيهات',
    'Track listing performance': 'تابع أداء الإعلانات',
    'Manage agency profile and social links': 'أدر ملف الوكالة وروابط التواصل الاجتماعي',
    'Welcome back': 'مرحبًا بعودتك',
    'Log in to continue managing your listings and account.': 'سجّل الدخول لمتابعة إدارة إعلاناتك وحسابك.',
    'Stay connected': 'ابقَ متصلاً',
    'Show': 'إظهار',
    'Hide': 'إخفاء',
    'New to TuniHome?': 'جديد على TuniHome؟',
    'Start in minutes': 'ابدأ خلال دقائق',
    'Create your TuniHome account and manage listings with confidence.': 'أنشئ حسابك على TuniHome وأدر إعلاناتك بثقة.',
    'Built for individuals and agencies with simple tools, clean controls, and fast publishing.': 'مصمم للأفراد والوكالات بأدوات بسيطة وتحكم واضح ونشر سريع.',
    'One place for all listings': 'مكان واحد لكل الإعلانات',
    'Professional profile visibility': 'ظهور أفضل للملف المهني',
    'Quick publish and edit flow': 'نشر وتعديل سريعان',
    'Create your account': 'أنشئ حسابك',
    'Join TuniHome to publish, save, and manage properties.': 'انضم إلى TuniHome لنشر العقارات وحفظها وإدارتها.',
    'Full name': 'الاسم الكامل',
    'Your name': 'اسمك',
    'Confirm password': 'تأكيد كلمة المرور',
    'Already have an account?': 'لديك حساب بالفعل؟',
    'Sponsored': 'إعلان ممول',
    'Premium placement for agencies': 'ظهور بريميوم للوكالات',
    'Reach serious buyers and renters with high-visibility homepage placement.': 'صل إلى مشترين ومستأجرين جادين عبر ظهور بارز في الصفحة الرئيسية.',
    'Your banner could be here': 'يمكن أن يظهر إعلانك هنا',
    'Reach active buyers and renters directly inside search results.': 'صل مباشرة إلى المشترين والمستأجرين النشطين داخل نتائج البحث.',
    'Advertise with us': 'أعلن معنا',
    'Advertise this property type': 'روّج لهذا النوع من العقارات',
    'Reach active buyers and renters with premium placement in listing details.': 'صل إلى المشترين والمستأجرين النشطين عبر ظهور مميز داخل صفحة تفاصيل العقار.',
    'Send message': 'إرسال رسالة',
    'Send message to owner': 'إرسال رسالة إلى المالك',
    'Report': 'بلّغ',
    'Share': 'مشاركة',
    'Share listing': 'مشاركة الإعلان',
    'Let me know if price drops': 'نبّهني إذا انخفض السعر',
    'Reach the owner directly by call, WhatsApp, or message.': 'تواصل مباشرة مع المالك عبر الاتصال أو واتساب أو الرسائل.',
    'Price drop alert on': 'تنبيه انخفاض السعر مفعّل',
    'Price drop alert enabled for this listing.': 'تم تفعيل تنبيه انخفاض السعر لهذا الإعلان.',
    'Price drop alert removed.': 'تم حذف تنبيه انخفاض السعر.',
    'Please enter your contact details and message.': 'يرجى إدخال بيانات التواصل والرسالة.',
    'Message sent to listing owner.': 'تم إرسال الرسالة إلى مالك الإعلان.',
    'Please select a report reason.': 'يرجى اختيار سبب البلاغ.',
    'Report sent. Thank you for your feedback.': 'تم إرسال البلاغ. شكراً لملاحظاتك.',
    'Parking': 'موقف سيارات',
    'Pool': 'مسبح',
    'Terrace': 'تراس',
    'Security': 'حراسة',
    'Furnished': 'مفروش',
    'Sea view': 'إطلالة بحرية',
    'Clear': 'صافٍ',
    'Mild': 'معتدل',
    'Sea breeze': 'نسيم بحري',
    'Sunny': 'مشمس',
    'Dry': 'جاف',
    'Coastal': 'ساحلي',
    'Warm': 'دافئ',
    'Pleasant': 'لطيف'
  };
  let currentLanguage = 'fr';

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // Ignore write failures in private mode.
    }
  }

  function normalizePhone(value) {
    return String(value || '').replace(/[^0-9+]/g, '');
  }

  function normalizeAccountTier(value) {
    const raw = String(value || '').trim().toLowerCase();
    if (raw === 'professional') return 'agency';
    if (raw === 'pro' || raw === 'premium') return 'agency';
    if (raw === 'agency' || raw === 'pro_agency' || raw === 'professional-agency') return 'agency';
    if (raw === 'promoter' || raw === 'promoteur' || raw === 'pro_promoter' || raw === 'developer') return 'promoter';
    return 'individual';
  }

  function normalizeGeoName(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function normalizeAmenityKey(value) {
    const normalized = normalizeGeoName(value);
    if (!normalized) return '';
    if (
      normalized.includes('wifi') ||
      normalized.includes('wi fi') ||
      normalized.includes('internet') ||
      normalized.includes('fiber')
    ) return 'wifi';
    if (
      normalized.includes('aircon') ||
      normalized.includes('air conditioning') ||
      normalized === 'ac' ||
      normalized.includes('clim')
    ) return 'aircon';
    if (
      normalized.includes('washer') ||
      normalized.includes('washing machine') ||
      normalized.includes('machine a laver') ||
      normalized.includes('lavage')
    ) return 'washer';
    if (
      normalized.includes('dryer') ||
      normalized.includes('drying') ||
      normalized.includes('seche linge')
    ) return 'dryer';
    if (normalized.includes('kitchen') || normalized.includes('cuisine')) return 'kitchen';
    if (
      normalized.includes('heating') ||
      normalized.includes('central heating') ||
      normalized.includes('chauffage')
    ) return 'heating';
    return normalized;
  }

  const REGION_INDEX = TUNISIA_REGIONS.reduce(function (acc, entry) {
    acc[normalizeGeoName(entry.region)] = {
      region: entry.region,
      cities: entry.cities.slice()
    };
    return acc;
  }, {});

  const REGION_ALIASES = {
    'el kef': 'Kef',
    kef: 'Kef',
    kebili: 'Kebili',
    kairouan: 'Kairouan',
    gabes: 'Gabes',
    gafsa: 'Gafsa',
    medenine: 'Medenine',
    djerba: 'Medenine'
  };

  const CITY_REGION_INDEX = TUNISIA_REGIONS.reduce(function (acc, entry) {
    acc[normalizeGeoName(entry.region)] = entry.region;
    entry.cities.forEach(function (city) {
      acc[normalizeGeoName(city)] = entry.region;
    });
    return acc;
  }, {});

  function resolveRegionName(value) {
    const key = normalizeGeoName(value);
    if (!key) return '';
    if (REGION_INDEX[key]) return REGION_INDEX[key].region;
    if (REGION_ALIASES[key]) return REGION_ALIASES[key];
    return CITY_REGION_INDEX[key] || '';
  }

  function regionCities(regionName) {
    const resolved = resolveRegionName(regionName);
    if (!resolved || !REGION_INDEX[normalizeGeoName(resolved)]) return [];
    return REGION_INDEX[normalizeGeoName(resolved)].cities.slice();
  }

  function locationRegion(locationValue) {
    const parts = String(locationValue || '')
      .split(',')
      .map(function (part) {
        return part.trim();
      })
      .filter(Boolean);
    const city = parts[0] || '';
    const explicitRegion = parts[1] || '';
    return resolveRegionName(explicitRegion) || resolveRegionName(city) || '';
  }

  function locationCity(locationValue) {
    return primaryCityLabel(locationValue);
  }

  function fillSelectOptions(select, values, placeholderLabel, selectedValue) {
    if (!select) return;
    const safeValues = Array.isArray(values) ? values.slice() : [];
    const placeholder = typeof placeholderLabel === 'string' ? placeholderLabel : '';
    const selected = String(selectedValue || '');
    const options = ['<option value="">' + escapeHtml(t(placeholder)) + '</option>'];
    safeValues.forEach(function (value) {
      const safeValue = String(value || '').trim();
      if (!safeValue) return;
      const selectedAttr = safeValue === selected ? ' selected' : '';
      options.push('<option value="' + escapeHtml(safeValue) + '"' + selectedAttr + '>' + escapeHtml(safeValue) + '</option>');
    });
    select.innerHTML = options.join('');
  }

  function defaultAdminState() {
    return {
      ads: {
        home: {
          chip: 'Sponsored',
          title: 'Premium placement for agencies',
          body: 'Reach serious buyers and renters with high-visibility homepage placement.',
          cta: 'Advertise with us',
          href: 'list-property.html',
          image: 'assets/listing-6.jpg',
          phone: '+216 20 000 000'
        },
        search: {
          chip: 'Sponsored',
          title: 'Your banner could be here',
          body: 'Reach active buyers and renters directly inside search results.',
          cta: 'Advertise with us',
          href: 'list-property.html',
          image: 'assets/listing-5.jpg',
          phone: '+216 20 000 000'
        },
        property: {
          chip: 'Sponsored',
          title: 'Advertise this property type',
          body: 'Reach active buyers and renters with premium placement in listing details.',
          cta: 'Advertise with us',
          href: 'list-property.html',
          image: 'assets/listing-4.jpg',
          phone: '+216 20 000 000'
        }
      },
      deletedListingIds: []
    };
  }

  function adminStateStore() {
    const raw = readStorage(ADMIN_STATE_STORAGE_KEY, {});
    const defaults = defaultAdminState();
    const adsRaw = raw && raw.ads && typeof raw.ads === 'object' ? raw.ads : {};
    const sanitizeSlot = function (slotKey) {
      const fallback = defaults.ads[slotKey];
      const current = adsRaw[slotKey] || {};
      return {
        chip: String(current.chip || fallback.chip).trim() || fallback.chip,
        title: String(current.title || fallback.title).trim() || fallback.title,
        body: String(current.body || fallback.body).trim() || fallback.body,
        cta: String(current.cta || fallback.cta).trim() || fallback.cta,
        href: String(current.href || fallback.href).trim() || fallback.href,
        image: String(current.image || fallback.image).trim() || fallback.image,
        phone: String(current.phone || fallback.phone).trim() || fallback.phone
      };
    };
    const deleted = Array.isArray(raw.deletedListingIds) ? raw.deletedListingIds : [];
    return {
      ads: {
        home: sanitizeSlot('home'),
        search: sanitizeSlot('search'),
        property: sanitizeSlot('property')
      },
      deletedListingIds: deleted.map(function (id) {
        return String(id || '').trim();
      }).filter(Boolean)
    };
  }

  function writeAdminState(next) {
    writeStorage(ADMIN_STATE_STORAGE_KEY, next || defaultAdminState());
  }

  function migrateLegacyStorage() {
    const legacyPairs = [
      [LANGUAGE_STORAGE_KEY, LEGACY_STORAGE_KEYS.language],
      [AUTH_USERS_STORAGE_KEY, LEGACY_STORAGE_KEYS.authUsers],
      [AUTH_SESSION_STORAGE_KEY, LEGACY_STORAGE_KEYS.authSession],
      [PROFILE_SETTINGS_STORAGE_KEY, LEGACY_STORAGE_KEYS.profileSettings],
      [data.STORAGE_KEYS && data.STORAGE_KEYS.recentSearches, LEGACY_STORAGE_KEYS.recentSearches],
      [data.STORAGE_KEYS && data.STORAGE_KEYS.viewedListings, LEGACY_STORAGE_KEYS.viewedListings],
      [data.STORAGE_KEYS && data.STORAGE_KEYS.listedProperties, LEGACY_STORAGE_KEYS.listedProperties],
      [data.STORAGE_KEYS && data.STORAGE_KEYS.savedListings, LEGACY_STORAGE_KEYS.savedListings],
      [data.STORAGE_KEYS && data.STORAGE_KEYS.savedAgencies, LEGACY_STORAGE_KEYS.savedAgencies],
      [data.STORAGE_KEYS && data.STORAGE_KEYS.userPreferences, LEGACY_STORAGE_KEYS.userPreferences]
    ];
    legacyPairs.forEach(function (pair) {
      const currentKey = pair[0];
      const legacyKey = pair[1];
      if (!currentKey || !legacyKey || currentKey === legacyKey) return;
      try {
        const currentValue = localStorage.getItem(currentKey);
        const legacyValue = localStorage.getItem(legacyKey);
        if (currentValue === null && legacyValue !== null) {
          localStorage.setItem(currentKey, legacyValue);
        }
      } catch (err) {
        // Ignore migration issues in restricted environments.
      }
    });
  }

  migrateLegacyStorage();

  function adminAccountsStore() {
    const raw = readStorage(ADMIN_ACCOUNTS_STORAGE_KEY, {});
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    return raw;
  }

  function writeAdminAccountsStore(next) {
    writeStorage(ADMIN_ACCOUNTS_STORAGE_KEY, next && typeof next === 'object' ? next : {});
  }

  function isAdminEmail(email) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!normalizedEmail) return false;
    const store = adminAccountsStore();
    const profile = store[normalizedEmail];
    return Boolean(profile && profile.status !== 'disabled');
  }

  function ensureDefaultAdminUser() {
    const email = 'hamdijawher@icloud.com';
    const normalizedEmail = String(email).toLowerCase();
    const password = '22085367';
    const users = readStorage(AUTH_USERS_STORAGE_KEY, []);
    const list = Array.isArray(users) ? users.slice() : [];
    const index = list.findIndex(function (user) {
      return String(user && user.email || '').toLowerCase() === normalizedEmail;
    });
    const nextUser = Object.assign({}, index >= 0 ? list[index] : {}, {
      name: 'Hamdi Jawher',
      email: email,
      phone: String((index >= 0 && list[index] && list[index].phone) || '').trim(),
      password: password,
      role: 'admin',
      createdAt: Number((index >= 0 && list[index] && list[index].createdAt) || Date.now())
    });
    if (index >= 0) {
      list[index] = nextUser;
    } else {
      list.unshift(nextUser);
    }
    writeStorage(AUTH_USERS_STORAGE_KEY, list.slice(0, 80));

    const admins = adminAccountsStore();
    const existing = admins[normalizedEmail] || {};
    admins[normalizedEmail] = Object.assign({}, existing, {
      email: email,
      name: existing.name || 'Hamdi Jawher',
      role: existing.role || 'super-admin',
      status: existing.status || 'active',
      createdAt: Number(existing.createdAt || Date.now()),
      createdBy: existing.createdBy || 'system'
    });
    writeAdminAccountsStore(admins);

    const profiles = profileSettingsStore();
    if (!profiles[normalizedEmail]) {
      profiles[normalizedEmail] = {
        name: 'Hamdi Jawher',
        phone: '',
        avatar: '',
        cover: '',
        bio: '',
        agencyName: 'Hamdi Jawher',
        accountType: 'individual',
        requestedAccountType: '',
        verificationStatus: 'not-required',
        verificationDocument: '',
        verificationRequestedAt: 0,
        website: '',
        instagram: '',
        facebook: '',
        linkedin: '',
        proSubscriptionActive: false
      };
      writeStorage(PROFILE_SETTINGS_STORAGE_KEY, profiles);
    }
  }

  ensureDefaultAdminUser();

  function getAuthSession() {
    const session = readStorage(AUTH_SESSION_STORAGE_KEY, null);
    if (!session || typeof session !== 'object') return null;
    if (!session.email || typeof session.email !== 'string') return null;
    return session;
  }

  function clearAuthSessionStorage() {
    [AUTH_SESSION_STORAGE_KEY, LEGACY_STORAGE_KEYS.authSession].forEach(function (key) {
      if (!key) return;
      try {
        localStorage.removeItem(key);
      } catch (err) {
        // Ignore session cleanup failures.
      }
    });
  }

  function isAuthenticated() {
    return Boolean(getAuthSession());
  }

  function isAdminSession() {
    const session = getAuthSession();
    return Boolean(session && isAdminEmail(session.email));
  }

  function getUserPreferences() {
    const session = getAuthSession();
    if (!session || !session.email) return null;
    const key = (data.STORAGE_KEYS && data.STORAGE_KEYS.userPreferences) || 'tunihome_user_preferences';
    const store = readStorage(key, {});
    const current = store[session.email];
    return current && typeof current === 'object' ? current : null;
  }

  function profileSettingsStore() {
    return readStorage(PROFILE_SETTINGS_STORAGE_KEY, {});
  }

  function profileSettingsEntries() {
    const store = profileSettingsStore();
    return Object.keys(store).map(function (email) {
      return {
        email: email,
        settings: getAccountSettingsByEmail(email)
      };
    });
  }

  function updateAccountSettings(email, patch) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!normalizedEmail) return null;
    const all = profileSettingsStore();
    const current = getAccountSettingsByEmail(normalizedEmail);
    all[normalizedEmail] = Object.assign({}, current, patch || {});
    writeStorage(PROFILE_SETTINGS_STORAGE_KEY, all);
    return all[normalizedEmail];
  }

  function getAccountSettingsByEmail(email) {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const all = profileSettingsStore();
    const current = normalizedEmail ? (all[normalizedEmail] || {}) : {};
    const normalizedTier = normalizeAccountTier(current.accountType);
    const requestedTierRaw = current.requestedAccountType == null
      ? ''
      : normalizeAccountTier(current.requestedAccountType);
    const requestedTier = requestedTierRaw && requestedTierRaw !== normalizedTier ? requestedTierRaw : '';
    const proActive = Boolean(current.proSubscriptionActive);
    const verificationStatus = String(current.verificationStatus || '').toLowerCase();
    return {
      name: String(current.name || '').trim(),
      phone: String(current.phone || '').trim(),
      avatar: String(current.avatar || '').trim(),
      cover: String(current.cover || '').trim(),
      bio: String(current.bio || '').trim(),
      agencyName: String(current.agencyName || '').trim(),
      whatsapp: String(current.whatsapp || '').trim(),
      website: String(current.website || '').trim(),
      instagram: String(current.instagram || '').trim(),
      facebook: String(current.facebook || '').trim(),
      linkedin: String(current.linkedin || '').trim(),
      accountType: normalizedTier,
      requestedAccountType: requestedTier,
      proSubscriptionActive: proActive,
      verificationStatus: verificationStatus || (normalizedTier === 'individual' ? 'not-required' : 'pending'),
      verificationDocument: String(current.verificationDocument || '').trim(),
      verificationRequestedAt: Number(current.verificationRequestedAt || 0),
      verificationComment: String(current.verificationComment || '').trim(),
      proActivatedAt: Number(current.proActivatedAt || 0)
    };
  }

  function accountHasPro(settings) {
    if (!settings) return false;
    return Boolean(settings.proSubscriptionActive);
  }

  function activeAccountTier(settings) {
    const current = settings || {};
    const accountType = normalizeAccountTier(current.accountType);
    const requestedType = normalizeAccountTier(current.requestedAccountType || '');
    const verificationStatus = String(current.verificationStatus || '').toLowerCase();
    if (accountType !== 'individual' && verificationStatus === 'verified') return accountType;
    if (accountType === 'individual' && verificationStatus === 'verified' && requestedType !== 'individual' && requestedType) {
      return requestedType;
    }
    return 'individual';
  }

  function tierVideoLimit(tierValue, proSubscriptionActive) {
    if (proSubscriptionActive) return 2;
    return normalizeAccountTier(tierValue) === 'individual' ? 0 : 1;
  }

  function tierListingLimit(tierValue, proSubscriptionActive) {
    if (proSubscriptionActive) return 16;
    return normalizeAccountTier(tierValue) === 'individual' ? 2 : 6;
  }

  function accountCapabilities(settings) {
    const current = settings || {};
    const activeTier = activeAccountTier(current);
    const proActive = Boolean(current.proSubscriptionActive);
    const professional = activeTier !== 'individual';
    const verifiedStatus = String(current.verificationStatus || '').toLowerCase() === 'verified';
    return {
      activeTier: activeTier,
      isProfessional: professional,
      isVerifiedProfessional: professional && verifiedStatus,
      photoLimit: tierPhotoLimit(activeTier, proActive),
      videoLimit: tierVideoLimit(activeTier, proActive),
      listingLimit: tierListingLimit(activeTier, proActive),
      canShowSocials: professional && verifiedStatus,
      proActive: proActive
    };
  }

  function listingTier(item) {
    const tierFromItem = normalizeAccountTier(item && (item.ownerTier || item.accountType || item.tier));
    if (tierFromItem !== 'individual') return tierFromItem;
    if (item && item.professionalId) return 'agency';
    return 'individual';
  }

  function tierBadgeLabel(tierValue) {
    const tier = normalizeAccountTier(tierValue);
    if (tier === 'promoter') return t('Promoter');
    if (tier === 'agency') return t('Agency');
    return t('Individual');
  }

  function listingTierTag(tierValue) {
    const tier = normalizeAccountTier(tierValue);
    if (tier === 'promoter') return t('Promoter listing');
    if (tier === 'agency') return t('Agency listing');
    return t('Individual listing');
  }

  function tierPlanName(tierValue) {
    const tier = normalizeAccountTier(tierValue);
    if (tier === 'promoter') return t('Promoter');
    if (tier === 'agency') return t('Agency');
    return t('Individual');
  }

  function tierPhotoLimit(tierValue, proSubscriptionActive) {
    return 12;
  }

  function tierMonthlyPrice(tierValue) {
    const tier = normalizeAccountTier(tierValue);
    if (tier === 'promoter') return 0;
    if (tier === 'agency') return 0;
    return 0;
  }

  function userProfessionalId(email) {
    const slug = String(email || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 28);
    return 'pro-user-' + (slug || 'account');
  }

  function authLoginHref(redirectTarget) {
    const params = new URLSearchParams();
    params.set('redirect', String(redirectTarget || 'dashboard.html'));
    applyCurrentLanguageParam(params);
    return 'login.html?' + params.toString();
  }

  function savedListingsKey() {
    return (data.STORAGE_KEYS && data.STORAGE_KEYS.savedListings) || 'tunihome_saved_listings';
  }

  function savedAgenciesKey() {
    return (data.STORAGE_KEYS && data.STORAGE_KEYS.savedAgencies) || 'tunihome_saved_agencies';
  }

  function getSavedListingIds() {
    return readStorage(savedListingsKey(), []);
  }

  function getSavedAgencyIds() {
    return readStorage(savedAgenciesKey(), []);
  }

  function isListingSaved(listingId) {
    return getSavedListingIds().includes(listingId);
  }

  function isAgencySaved(agencyId) {
    return getSavedAgencyIds().includes(agencyId);
  }

  function toggleSavedListing(listingId) {
    const current = getSavedListingIds();
    const exists = current.includes(listingId);
    const next = exists
      ? current.filter(function (id) { return id !== listingId; })
      : [listingId].concat(current);
    writeStorage(savedListingsKey(), next.slice(0, 120));
    return !exists;
  }

  function toggleSavedAgency(agencyId) {
    const current = getSavedAgencyIds();
    const exists = current.includes(agencyId);
    const next = exists
      ? current.filter(function (id) { return id !== agencyId; })
      : [agencyId].concat(current);
    writeStorage(savedAgenciesKey(), next.slice(0, 80));
    return !exists;
  }

  function getPage() {
    return document.body.dataset.page;
  }

  function normalizeLanguage(value) {
    const raw = String(value || '').trim().toLowerCase();
    if (!raw) return 'fr';
    if (raw === 'fr' || raw === 'francais' || raw === 'français' || raw === 'french') return 'fr';
    if (raw === 'en' || raw === 'english') return 'en';
    if (raw === 'ar' || raw === 'arabic' || raw === 'العربية' || raw === 'arab') return 'ar';
    return 'fr';
  }

  function applyCurrentLanguageParam(params) {
    if (!params || typeof params.set !== 'function') return params;
    if (currentLanguage === 'fr') {
      params.delete('lang');
    } else {
      params.set('lang', normalizeLanguage(currentLanguage));
    }
    return params;
  }

  function interpolate(template, values) {
    return String(template).replace(/\{(\w+)\}/g, function (_, key) {
      if (!values || values[key] == null) return '';
      return String(values[key]);
    });
  }

  function t(text, values) {
    let source = text;
    if (currentLanguage === 'ar') {
      source = AR_TRANSLATIONS[text] || FR_TRANSLATIONS[text] || text;
    } else if (currentLanguage === 'fr') {
      source = FR_TRANSLATIONS[text] || text;
    }
    return interpolate(source, values);
  }

  function tCount(count, singular, plural) {
    return t(count === 1 ? singular : plural, { count: count });
  }

  function setText(selector, text) {
    const node = document.querySelector(selector);
    if (!node) return;
    node.textContent = t(text);
  }

  function setTextAll(selector, text) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = t(text);
    });
  }

  function setAttr(selector, attribute, text) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.setAttribute(attribute, t(text));
    });
  }

  function setOptionText(selectSelector, optionValue, text) {
    const option = document.querySelector(selectSelector + ' option[value="' + optionValue + '"]');
    if (!option) return;
    option.textContent = t(text);
  }

  function ensureNavContactSales() {
    document.querySelectorAll('.home-nav-actions').forEach(function (wrap) {
      if (wrap.querySelector('.nav-contact-sales')) return;
      const listLink = wrap.querySelector('a[href="list-property.html"]');
      const contactLink = document.createElement('a');
      contactLink.className = 'btn light mini nav-contact-sales';
      contactLink.href = 'mailto:sales@tunihome.tn?subject=' + encodeURIComponent('Contact Sales');
      contactLink.textContent = t('Contact Sales');
      contactLink.setAttribute('aria-label', t('Contact Sales'));
      if (listLink && listLink.nextSibling) {
        wrap.insertBefore(contactLink, listLink.nextSibling);
      } else if (listLink) {
        wrap.appendChild(contactLink);
      } else {
        wrap.insertBefore(contactLink, wrap.firstChild);
      }
    });
  }

  function renderSiteFooter() {
    const footers = document.querySelectorAll('.site-footer');
    if (!footers.length) return;

    const year = new Date().getFullYear();
    const accountHref = isAuthenticated() ? withLanguageParam('dashboard.html') : withLanguageParam('login.html');
    const markup = [
      '<div class="site-footer-inner">',
      '  <div class="site-footer-grid">',
      '    <section class="site-footer-col">',
      '      <h4>' + t('Explore') + '</h4>',
      '      <a href="' + withLanguageParam('search.html?category=sale') + '">' + t('Buy homes') + '</a>',
      '      <a href="' + withLanguageParam('search.html?category=long') + '">' + t('Rent homes') + '</a>',
      '      <a href="' + withLanguageParam('search.html?category=short') + '">' + t('Vacation homes') + '</a>',
      '    </section>',
      '    <section class="site-footer-col">',
      '      <h4>' + t('Services') + '</h4>',
      '      <a href="' + withLanguageParam('list-property.html') + '">' + t('List your properties') + '</a>',
      '      <a href="' + withLanguageParam('profile.html') + '">' + t('Agency profiles') + '</a>',
      '      <a href="' + accountHref + '">' + t('My account') + '</a>',
      '    </section>',
      '    <section class="site-footer-col">',
      '      <h4>' + t('Support') + '</h4>',
      '      <a href="' + withLanguageParam('search.html?advanced=true') + '">' + t('Help center') + '</a>',
      '      <a href="mailto:hello@tunihome.tn">' + t('Contact us') + '</a>',
      '      <a href="' + withLanguageParam('search.html?advanced=true') + '">' + t('Safety tips') + '</a>',
      '    </section>',
      '    <section class="site-footer-col">',
      '      <h4>' + t('Follow us') + '</h4>',
      '      <div class="site-footer-social">',
      '        <a href="https://www.instagram.com/tunihome.tn" target="_blank" rel="noreferrer" aria-label="' + escapeHtml(t('Instagram')) + '">' + socialIconMarkup('instagram') + '</a>',
      '        <a href="https://www.facebook.com/tunihome.tn" target="_blank" rel="noreferrer" aria-label="' + escapeHtml(t('Facebook')) + '">' + socialIconMarkup('facebook') + '</a>',
      '      </div>',
      '    </section>',
      '    <section class="site-footer-col">',
      '      <h4>' + t('Company') + '</h4>',
      '      <a href="' + withLanguageParam('index.html') + '">' + t('About TuniHome') + '</a>',
      '      <a href="' + withLanguageParam('signup.html') + '">' + t('Terms') + '</a>',
      '      <a href="' + withLanguageParam('signup.html') + '">' + t('Privacy') + '</a>',
      '    </section>',
      '  </div>',
      '  <div class="site-footer-bottom">',
      '    <p>© ' + year + ' TuniHome. ' + t('All rights reserved.') + '</p>',
      '    <div class="site-footer-auth-links">',
      '      <a href="' + withLanguageParam('login.html') + '">' + t('Log in') + '</a>',
      '      <a href="' + withLanguageParam('signup.html') + '">' + t('Create account') + '</a>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');

    footers.forEach(function (footer) {
      footer.removeAttribute('aria-hidden');
      footer.innerHTML = markup;
    });
  }

  function applyAuthGating() {
    const authed = isAuthenticated();

    document.querySelectorAll('.nav-account').forEach(function (link) {
      link.setAttribute('href', withLanguageParam(authed ? 'dashboard.html' : 'login.html'));
    });

    document.querySelectorAll('a[href]').forEach(function (anchor) {
      const href = String(anchor.getAttribute('href') || '');
      if (!href) return;
      const clean = href.split('#')[0].split('?')[0];
      if (!/list-property\.html$/i.test(clean)) return;

      if (!anchor.dataset.authLabel) {
        anchor.dataset.authLabel = anchor.textContent.trim();
      }

      if (authed) {
        anchor.setAttribute('href', withLanguageParam('list-property.html'));
        return;
      }

      anchor.setAttribute('href', authLoginHref('list-property.html'));
    });
  }

  function withLanguageParam(url) {
    const raw = String(url || '');
    if (!raw) return raw;
    if (raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return raw;
    if (/^https?:\/\//i.test(raw) && !raw.includes(window.location.host)) return raw;

    const hashIndex = raw.indexOf('#');
    const hash = hashIndex >= 0 ? raw.slice(hashIndex) : '';
    const pathAndQuery = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
    const queryIndex = pathAndQuery.indexOf('?');
    const path = queryIndex >= 0 ? pathAndQuery.slice(0, queryIndex) : pathAndQuery;
    const query = queryIndex >= 0 ? pathAndQuery.slice(queryIndex + 1) : '';
    const params = new URLSearchParams(query);
    applyCurrentLanguageParam(params);
    const queryString = params.toString();
    return path + (queryString ? ('?' + queryString) : '') + hash;
  }

  function localizePropertyType(typeValue) {
    const map = {
      apartment: 'Apartment',
      villa: 'Villa',
      house: 'House',
      land: 'Land',
      lot: 'Land',
      office: 'Office',
      shop: 'Commercial space',
      room: 'Room',
      studio: 'Studio',
      condo: 'Condo',
      townhouse: 'Townhouse'
    };
    const key = map[String(typeValue || '').toLowerCase()];
    return key ? t(key) : String(typeValue || '');
  }

  function localizeAmenityName(value) {
    const map = {
      wifi: 'Wifi',
      aircon: 'Aircon',
      washer: 'Washer',
      dryer: 'Dryer',
      kitchen: 'Kitchen',
      heating: 'Heating'
    };
    const key = map[String(value || '').toLowerCase()];
    return key ? t(key) : String(value || '');
  }

  function localizeRentTagName(value) {
    const map = {
      group: 'Group rent',
      couple: 'Couple rent',
      family: 'Family rent',
      students: 'Students rent'
    };
    const key = map[String(value || '').toLowerCase()];
    return key ? t(key) : String(value || '');
  }

  function primaryCityLabel(locationValue) {
    return String(locationValue || '')
      .split(',')[0]
      .trim();
  }

  function localizeListingCategory(categoryValue) {
    const map = {
      sale: 'For Sale',
      long: 'Long-term rent',
      short: 'Short-term stay',
      business: 'Fond de commerce'
    };
    const key = map[String(categoryValue || '').toLowerCase()];
    return key ? t(key) : String(categoryValue || '');
  }

  function money(value) {
    return new Intl.NumberFormat('fr-TN').format(value);
  }

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      if (!file) {
        resolve('');
        return;
      }
      const reader = new FileReader();
      reader.onload = function () {
        resolve(String(reader.result || ''));
      };
      reader.onerror = function () {
        reject(reader.error || new Error('File read failed'));
      };
      reader.readAsDataURL(file);
    });
  }

  function pushRecentSearch(searchObj) {
    const key = data.STORAGE_KEYS.recentSearches;
    if (!key) return;
    const current = readStorage(key, []);
    current.unshift({ ...searchObj, ts: Date.now() });
    writeStorage(key, current.slice(0, 12));
  }

  function trackViewedListing(listingId) {
    const key = data.STORAGE_KEYS.viewedListings;
    if (!key || !listingId) return;
    const viewed = readStorage(key, []);
    const next = [listingId].concat(viewed.filter(function (id) {
      return id !== listingId;
    }));
    writeStorage(key, next.slice(0, 18));
  }

  function buildListingPriceLabel(item) {
    const amount = money(item.price);
    if (item.category === 'long') return t('{value} TND / month', { value: amount });
    if (item.category === 'short') return t('{value} TND / night', { value: amount });
    if (item.category === 'business') return t('{value} TND / month', { value: amount });
    return t('{value} TND', { value: amount });
  }

  function adSlotContent(slot) {
    const defaults = defaultAdminState().ads;
    const state = adminStateStore().ads;
    const safeSlot = state[slot] || defaults[slot] || defaults.home;
    const defaultSlot = defaults[slot] || defaults.home;
    function localize(value, fallback) {
      return value === fallback ? t(fallback) : value;
    }
    return {
      chip: localize(safeSlot.chip, defaultSlot.chip),
      title: localize(safeSlot.title, defaultSlot.title),
      body: localize(safeSlot.body, defaultSlot.body),
      cta: localize(safeSlot.cta, defaultSlot.cta),
      href: safeSlot.href || defaultSlot.href,
      image: safeSlot.image || defaultSlot.image,
      phone: safeSlot.phone || defaultSlot.phone
    };
  }

  function premiumDescriptionMarkup(options) {
    const current = options || {};
    const ctaHref = current.href ? withLanguageParam(current.href) : '';
    const ctaLabel = current.label || t('View Pro plan');
    const showButton = Boolean(ctaHref && ctaLabel);
    return [
      '<div class="premium-upgrade-shell">',
      '  <div class="premium-home-copy">',
      '    <span class="premium-home-kicker">' + escapeHtml(t('Premium')) + '</span>',
      '    <h3>' + escapeHtml(t('Get more visibility with Premium')) + '</h3>',
      '    <p>' + escapeHtml(t('Upgrade to Pro for stronger discovery, market insights, and priority support.')) + '</p>',
      '    <ul class="premium-home-list">',
      '      <li><strong>' + escapeHtml(t('More exposure')) + '</strong><span>' + escapeHtml(t('Show your listings higher in front of serious buyers and renters.')) + '</span></li>',
      '      <li><strong>' + escapeHtml(t('Better listing recommendations')) + '</strong><span>' + escapeHtml(t('Follow tailored tips to improve performance and conversion.')) + '</span></li>',
      '      <li><strong>' + escapeHtml(t('Price and market insights')) + '</strong><span>' + escapeHtml(t('Track views, demand, and pricing signals in one place.')) + '</span></li>',
      '      <li><strong>' + escapeHtml(t('Priority support')) + '</strong><span>' + escapeHtml(t('Get faster responses when you need help.')) + '</span></li>',
      '    </ul>',
      showButton ? ('    <div class="premium-home-actions"><a class="btn" href="' + escapeHtml(ctaHref) + '">' + escapeHtml(ctaLabel) + '</a></div>') : '',
      '  </div>',
      '  <div class="premium-home-media">',
      '    <img src="assets/listing-7.jpg" alt="' + escapeHtml(t('Professional Pro Plan')) + '" loading="lazy" />',
      '  </div>',
      '</div>'
    ].join('');
  }

  function compactCardPrice(item) {
    const value = Number(item.price || 0);
    if (value >= 100000) {
      return money(Math.round(value / 1000)) + ' DT';
    }
    if (value >= 1000) {
      return money(value) + ' DT';
    }
    return value + ' DT';
  }

  const LOCAL_IMAGE_POOL = [
    'assets/listing-1.jpg',
    'assets/listing-2.jpg',
    'assets/listing-3.jpg',
    'assets/listing-4.jpg',
    'assets/listing-5.jpg',
    'assets/listing-6.jpg',
    'assets/listing-7.jpg',
    'assets/listing-8.jpg',
    'assets/listing-9.jpg',
    'assets/listing-10.jpg'
  ];

  function hashSeed(seed) {
    return String(seed || '')
      .split('')
      .reduce(function (sum, char) {
        return sum + char.charCodeAt(0);
      }, 0);
  }

  function listingImage(item, index) {
    const base = hashSeed(item && item.id ? item.id : 'listing');
    const safeIndex = (base + Number(index || 0)) % LOCAL_IMAGE_POOL.length;
    return LOCAL_IMAGE_POOL[safeIndex];
  }

  function cardImageSet(item) {
    const remoteImages = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    if (remoteImages.length) {
      return remoteImages.slice(0, 6);
    }
    return [0, 1, 2].map(function (index) {
      return listingImage(item, index);
    });
  }

  function heartIconMarkup() {
    return [
      '<svg class="icon-heart-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
      '  <path d="M12 20.5L10.6 19.2C5.4 14.5 2 11.4 2 7.6C2 4.5 4.4 2 7.5 2C9.3 2 11.1 2.9 12 4.3C12.9 2.9 14.7 2 16.5 2C19.6 2 22 4.5 22 7.6C22 11.4 18.6 14.5 13.4 19.2L12 20.5Z"></path>',
      '</svg>'
    ].join('');
  }

  function chevronIconMarkup(direction) {
    const path = direction === 'left'
      ? 'M14.5 5.5L8.5 12L14.5 18.5'
      : 'M9.5 5.5L15.5 12L9.5 18.5';
    return [
      '<svg class="icon-chevron-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
      '  <path d="' + path + '"></path>',
      '</svg>'
    ].join('');
  }

  function socialIconMarkup(kind) {
    if (kind === 'instagram') {
      return [
        '<svg class="social-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
        '  <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>',
        '  <circle cx="12" cy="12" r="4.2"></circle>',
        '  <circle cx="17.2" cy="6.8" r="1.2"></circle>',
        '</svg>'
      ].join('');
    }
    return [
      '<svg class="social-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">',
      '  <path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.6 1.7-1.6H16.7V5c-.3 0-1.3-.1-2.5-.1-2.4 0-4 1.5-4 4.2V11H8v3h2.2v7h3.3Z"></path>',
      '</svg>'
    ].join('');
  }

  function ownerFor(item) {
    const fallback = {
      id: 'owner-' + item.id,
      name: item.ownerName || t('Owner'),
      avatar: item.ownerAvatar,
      professional: false,
      verified: item.verified,
      rating: 4.2,
      reviews: 10,
      phone: '+216 20 000 000',
      whatsapp: 'https://wa.me/21620000000'
    };
    const base = data.getOwnerForListing ? data.getOwnerForListing(item) : fallback;
    const tier = listingTier(item);
    const contactPhone = String(item && (item.contactPhone || item.ownerPhone) || base.phone || '+216 20 000 000').trim();
    const contactWhatsappRaw = String(item && (item.contactWhatsapp || item.ownerWhatsapp) || '').trim();
    const contactWhatsapp = contactWhatsappRaw
      ? ('https://wa.me/' + normalizePhone(contactWhatsappRaw).replace(/^\+/, ''))
      : (base.whatsapp || 'https://wa.me/21620000000');

    return Object.assign({}, base, {
      tier: tier,
      professional: tier !== 'individual',
      phone: contactPhone,
      whatsapp: contactWhatsapp
    });
  }

  function matchesFilters(listing, filters) {
    const byCategory = !filters.category || listing.category === filters.category;
    const byType = !filters.type || filters.type === 'all' || listing.type === filters.type;
    const listingRegion = locationRegion(listing.location);
    const listingCity = locationCity(listing.location);
    const byRegion = !filters.region || normalizeGeoName(listingRegion) === normalizeGeoName(filters.region);
    const byLocation = !filters.location || normalizeGeoName(listingCity) === normalizeGeoName(filters.location);
    const byMinPrice = Number(filters.minPrice || 0) > 0 ? listing.price >= Number(filters.minPrice) : true;
    const byPrice = Number.isFinite(filters.maxPrice) ? listing.price <= filters.maxPrice : true;
    const byProfessional = filters.professionalOnly ? Boolean(listing.professionalId) : true;
    const byVerified = filters.verifiedOnly ? Boolean(listing.verified) : true;
    const byRooms = Number(filters.minRooms || 0) > 0 ? listing.rooms >= Number(filters.minRooms) : true;
    const bySurface = Number(filters.minSurface || 0) > 0 ? listing.surface >= Number(filters.minSurface) : true;
    const wantedAmenities = Array.isArray(filters.amenities) ? filters.amenities.map(normalizeAmenityKey).filter(Boolean) : [];
    const listingAmenities = (listing.amenities || []).map(function (item) {
      return normalizeAmenityKey(item);
    });
    const byAmenities = wantedAmenities.length === 0 ? true : wantedAmenities.every(function (needle) {
      return listingAmenities.some(function (entry) {
        return entry === needle;
      });
    });

    const wantedRentTags = Array.isArray(filters.rentTags) ? filters.rentTags : [];
    const listingRentTags = (listing.rentTags || []).map(function (item) {
      return String(item).toLowerCase();
    });
    const byRentTags = wantedRentTags.length === 0
      ? true
      : (String(listing.category || '').toLowerCase() === 'long' && wantedRentTags.some(function (tag) {
        return listingRentTags.includes(String(tag).toLowerCase());
      }));

    return byCategory && byType && byRegion && byLocation && byMinPrice && byPrice && byProfessional && byVerified && byRooms && bySurface && byAmenities && byRentTags;
  }

  function rankingScore(listing) {
    const tier = listingTier(listing);
    let score = 0;
    if (listing && listing.isPromoted) score += 9;
    if (tier === 'promoter' || tier === 'agency') score += 2;
    if (listing && listing.verified) score += 1;
    return score;
  }

  function rankListingsForFeed(items) {
    return items.slice().sort(function (a, b) {
      const scoreDiff = rankingScore(b) - rankingScore(a);
      if (scoreDiff !== 0) return scoreDiff;
      return Number(b.price || 0) - Number(a.price || 0);
    });
  }

  function baseCard(item) {
    const owner = ownerFor(item);
    const tier = normalizeAccountTier(owner.tier || listingTier(item));
    const listingTag = '<span class="listing-chip ' + escapeHtml(tier) + '">' + escapeHtml(tierBadgeLabel(tier)) + '</span>';
    const verifiedTag = item.verified ? '<span class="listing-chip verified">' + t('Verified') + '</span>' : '';
    const saved = isListingSaved(item.id);
    const imageSet = cardImageSet(item);
    const imageCount = imageSet.length;
    const galleryImages = imageSet.map(function (src, index) {
      const alt = escapeHtml(item.title) + (index > 0 ? ' - photo ' + (index + 1) : '');
      return '<img class="card-media ' + (index === 0 ? 'active' : '') + '" data-card-image loading="lazy" src="' + escapeHtml(src) + '" alt="' + alt + '" />';
    }).join('');
    const galleryControls = imageCount > 1
      ? [
        '<button class="card-media-nav prev" type="button" data-card-nav="-1" aria-label="' + escapeHtml(t('Previous photo')) + '">' + chevronIconMarkup('left') + '</button>',
        '<button class="card-media-nav next" type="button" data-card-nav="1" aria-label="' + escapeHtml(t('Next photo')) + '">' + chevronIconMarkup('right') + '</button>',
        '<div class="card-dots">',
        imageSet.map(function (_, index) {
          return '<button class="card-dot ' + (index === 0 ? 'active' : '') + '" type="button" data-card-dot="' + index + '" aria-label="' + escapeHtml(t('Go to photo {count}', { count: index + 1 })) + '"></button>';
        }).join(''),
        '</div>'
      ].join('')
      : '';

    return [
      '<article class="card listing-card pop" data-listing-id="' + escapeHtml(item.id) + '">',
      '  <button class="save-btn ' + (saved ? 'saved' : '') + '" type="button" data-save-listing="' + escapeHtml(item.id) + '" aria-label="' + escapeHtml(t('Save listing')) + '">' + heartIconMarkup() + '</button>',
      '  <div class="listing-media-wrap" data-card-gallery data-active-index="0">',
      '    <a class="listing-media-link" href="' + withLanguageParam('property.html?id=' + encodeURIComponent(item.id)) + '">',
      '      ' + galleryImages,
      '      <span class="image-count">' + escapeHtml(t('{count} photos', { count: imageCount })) + '</span>',
      '      <span class="price-pill">' + escapeHtml(compactCardPrice(item)) + '</span>',
      '    </a>',
      '    ' + galleryControls,
      '  </div>',
      '  <div class="card-body">',
      '    <a href="' + withLanguageParam('property.html?id=' + encodeURIComponent(item.id)) + '"><h4 class="title">' + escapeHtml(item.title) + '</h4></a>',
      '    <p class="loc">' + escapeHtml(item.location) + '</p>',
      '    <div class="specs">',
      '      <span class="spec">' + escapeHtml(t('{count} Rooms', { count: item.rooms })) + '</span>',
      '      <span class="spec">' + item.surface + ' m2</span>',
      '      <span class="spec">' + escapeHtml(localizePropertyType(item.type)) + '</span>',
      '    </div>',
      '    <div class="listing-badges">',
      '      ' + listingTag,
      '      ' + verifiedTag,
      '    </div>',
      '  </div>',
      '</article>'
    ].join('');
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function emptyMessage(text) {
    return '<div class="empty">' + escapeHtml(text) + '</div>';
  }

  function attachGoToHandlers() {
    document.querySelectorAll('[data-goto]').forEach(function (button) {
      button.addEventListener('click', function () {
        const href = button.getAttribute('data-goto');
        if (href) window.location.href = withLanguageParam(href);
      });
    });
  }

  function attachSaveHandlers() {
    function syncSavedButtons(attribute, id, saved) {
      document.querySelectorAll('[' + attribute + ']').forEach(function (node) {
        if (node.getAttribute(attribute) !== id) return;
        node.classList.toggle('saved', saved);
      });
    }

    document.addEventListener('click', function (event) {
      const listingTrigger = event.target.closest('[data-save-listing]');
      if (listingTrigger) {
        event.preventDefault();
        event.stopPropagation();
        const listingId = listingTrigger.getAttribute('data-save-listing');
        const nowSaved = toggleSavedListing(listingId);
        syncSavedButtons('data-save-listing', listingId, nowSaved);
        return;
      }

      const agencyTrigger = event.target.closest('[data-save-agency]');
      if (!agencyTrigger) return;
      event.preventDefault();
      event.stopPropagation();
      const agencyId = agencyTrigger.getAttribute('data-save-agency');
      const nowSaved = toggleSavedAgency(agencyId);
      syncSavedButtons('data-save-agency', agencyId, nowSaved);
    });
  }

  function syncCardGallery(gallery, requestedIndex) {
    const slides = gallery.querySelectorAll('[data-card-image]');
    if (!slides.length) return;
    const max = slides.length;
    const safeIndex = ((requestedIndex % max) + max) % max;
    gallery.setAttribute('data-active-index', String(safeIndex));
    slides.forEach(function (slide, index) {
      slide.classList.toggle('active', index === safeIndex);
    });
    gallery.querySelectorAll('[data-card-dot]').forEach(function (dot, index) {
      dot.classList.toggle('active', index === safeIndex);
    });
  }

  function moveCardGallery(gallery, step) {
    const current = Number(gallery.getAttribute('data-active-index') || 0);
    syncCardGallery(gallery, current + step);
  }

  function attachCardGalleryHandlers() {
    document.addEventListener('click', function (event) {
      const nav = event.target.closest('[data-card-nav]');
      if (nav) {
        const gallery = nav.closest('[data-card-gallery]');
        if (!gallery) return;
        event.preventDefault();
        event.stopPropagation();
        const step = Number(nav.getAttribute('data-card-nav') || 1);
        moveCardGallery(gallery, step);
        return;
      }

      const dot = event.target.closest('[data-card-dot]');
      if (dot) {
        const gallery = dot.closest('[data-card-gallery]');
        if (!gallery) return;
        event.preventDefault();
        event.stopPropagation();
        const nextIndex = Number(dot.getAttribute('data-card-dot') || 0);
        syncCardGallery(gallery, nextIndex);
      }
    });

    document.addEventListener('touchstart', function (event) {
      const gallery = event.target.closest('[data-card-gallery]');
      if (!gallery) return;
      const touch = event.changedTouches && event.changedTouches[0];
      if (!touch) return;
      gallery.dataset.touchStartX = String(touch.clientX);
    }, { passive: true });

    document.addEventListener('touchend', function (event) {
      const gallery = event.target.closest('[data-card-gallery]');
      if (!gallery) return;
      const touch = event.changedTouches && event.changedTouches[0];
      const startX = Number(gallery.dataset.touchStartX || '');
      delete gallery.dataset.touchStartX;
      if (!touch || Number.isNaN(startX)) return;
      const distance = touch.clientX - startX;
      if (Math.abs(distance) < 42) return;
      moveCardGallery(gallery, distance < 0 ? 1 : -1);
    }, { passive: true });
  }

  function attachNavSearchHandlers() {
    const page = getPage();
    document.querySelectorAll('[data-nav-search]').forEach(function (form) {
      const input = form.querySelector('input[type="search"]');
      if (!input) return;

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const query = input.value.trim();

        if (page === 'search') {
          const locationInput = document.getElementById('search-location');
          if (locationInput) {
            locationInput.value = query;
            locationInput.dispatchEvent(new Event('change'));
          }
          return;
        }

        const params = new URLSearchParams();
        if (query) params.set('location', query);
        applyCurrentLanguageParam(params);
        window.location.href = 'search.html?' + params.toString();
      });
    });
  }

  function setNavSearchValue(value) {
    document.querySelectorAll('[data-nav-search] input[type="search"]').forEach(function (input) {
      input.value = value || '';
    });
  }

  function applyLanguageToLinks() {
    document.querySelectorAll('a[href]').forEach(function (anchor) {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.startsWith('http://') || href.startsWith('https://')) return;
      if (!/\.html(\?|#|$)/.test(href)) return;
      anchor.setAttribute('href', withLanguageParam(href));
    });
  }

  function upsertHeadNode(selector, createTag, attrs) {
    const head = document.head || document.querySelector('head');
    if (!head) return null;
    let node = selector ? head.querySelector(selector) : null;
    if (!node && createTag) {
      node = document.createElement(createTag);
      head.appendChild(node);
    }
    if (!node) return null;
    Object.keys(attrs || {}).forEach(function (key) {
      const value = attrs[key];
      if (value == null || value === '') return;
      node.setAttribute(key, String(value));
    });
    return node;
  }

  function applySeoMeta(meta) {
    const page = getPage();
    const title = String(meta && meta.title || document.title || 'TuniHome').trim();
    const description = String(meta && meta.description || '').trim();
    const type = String(meta && meta.type || 'website').trim();
    const image = String(meta && meta.image || '').trim();
    const safeImage = image
      ? new URL(image, window.location.origin).toString()
      : new URL('assets/hero-home.jpg', window.location.origin).toString();
    const canonicalPath = String(meta && meta.canonicalPath || '').trim();
    let canonicalUrl = '';
    try {
      const url = new URL(window.location.href);
      url.hash = '';
      url.search = '';
      if (currentLanguage !== 'fr') {
        url.searchParams.set('lang', currentLanguage);
      }
      if (page === 'property') {
        const listingId = String(getQueryParam('id') || '').trim();
        if (listingId) url.searchParams.set('id', listingId);
      }
      if (canonicalPath) {
        canonicalUrl = new URL(canonicalPath, window.location.origin).toString();
      } else {
        canonicalUrl = url.toString();
      }
    } catch (err) {
      canonicalUrl = window.location.href.split('#')[0];
    }

    document.title = title;
    upsertHeadNode('meta[name="description"]', 'meta', { name: 'description', content: description });
    upsertHeadNode('meta[name="robots"]', 'meta', { name: 'robots', content: String(meta && meta.robots || 'index,follow') });
    upsertHeadNode('link[rel="canonical"]', 'link', { rel: 'canonical', href: canonicalUrl });
    upsertHeadNode('meta[property="og:site_name"]', 'meta', { property: 'og:site_name', content: 'TuniHome' });
    upsertHeadNode('meta[property="og:type"]', 'meta', { property: 'og:type', content: type });
    upsertHeadNode('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
    upsertHeadNode('meta[property="og:description"]', 'meta', { property: 'og:description', content: description });
    upsertHeadNode('meta[property="og:image"]', 'meta', { property: 'og:image', content: safeImage });
    upsertHeadNode('meta[property="og:url"]', 'meta', { property: 'og:url', content: canonicalUrl });
    upsertHeadNode('meta[name="twitter:card"]', 'meta', { name: 'twitter:card', content: 'summary_large_image' });
    upsertHeadNode('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: title });
    upsertHeadNode('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', content: description });
    upsertHeadNode('meta[name="twitter:image"]', 'meta', { name: 'twitter:image', content: safeImage });
  }

  function setSeoStructuredData(payload) {
    const head = document.head || document.querySelector('head');
    if (!head) return;
    const script = upsertHeadNode('script[data-seo-ld]', 'script', { type: 'application/ld+json', 'data-seo-ld': '1' });
    if (!script) return;
    try {
      script.textContent = JSON.stringify(payload || {}, null, 2);
    } catch (err) {
      script.textContent = '{}';
    }
  }

  function applySeoDefaults() {
    const page = getPage();
    const defaults = {
      home: {
        title: t('TuniHome | Home'),
        description: t('Find verified homes, apartments, villas, and vacation rentals across Tunisia with TuniHome.'),
        robots: 'index,follow',
        type: 'website',
        canonicalPath: '/index.html'
      },
      search: {
        title: t('Search Listings | TuniHome'),
        description: t('Search homes for sale, rent, and vacation in Tunisia with advanced filters, map view, and trusted listings.'),
        robots: 'index,follow',
        type: 'website',
        canonicalPath: '/search.html'
      },
      property: {
        title: t('Property Details | TuniHome'),
        description: t('View listing photos, pricing, amenities, owner details, and map location before contacting the seller.'),
        robots: 'index,follow',
        type: 'article',
        canonicalPath: '/property.html'
      },
      profile: {
        title: t('Professional Profile | TuniHome'),
        description: t('Explore agency and promoter profiles, active listings, and direct contact details on TuniHome.'),
        robots: 'index,follow',
        type: 'profile',
        canonicalPath: '/profile.html'
      },
      'list-property': {
        title: t('Create Listing | TuniHome'),
        description: t('Publish your property listing in minutes with clear steps for details, media, contact, and location.'),
        robots: 'index,follow',
        type: 'website',
        canonicalPath: '/list-property.html'
      },
      dashboard: {
        title: t('My Listings | TuniHome'),
        description: t('Manage your listings, activity, and publishing performance in one place.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/dashboard.html'
      },
      favorites: {
        title: t('Favorites | TuniHome'),
        description: t('Review and manage your favorite listings and agencies.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/favorites.html'
      },
      'my-listings': {
        title: t('My Listings | TuniHome'),
        description: t('Track listing verification progress and manage your published homes.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/my-listings.html'
      },
      settings: {
        title: t('Settings | TuniHome'),
        description: t('Update your account details, verification request, and publishing profile settings.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/settings.html'
      },
      login: {
        title: t('Log in | TuniHome'),
        description: t('Log in to TuniHome to manage listings, profile settings, and favorites.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/login.html'
      },
      signup: {
        title: t('Create account | TuniHome'),
        description: t('Create a TuniHome account to publish listings and connect with buyers or renters.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/signup.html'
      },
      admin: {
        title: t('Admin Analytics | TuniHome'),
        description: t('Admin operations for moderation, verification, and platform controls.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/admin.html'
      },
      'pro-upgrade': {
        title: t('Upgrade to Pro | TuniHome'),
        description: t('Upgrade to Pro for more media uploads, analytics, and improved listing visibility.'),
        robots: 'noindex,nofollow',
        type: 'website',
        canonicalPath: '/pro-upgrade.html'
      }
    };
    const fallback = {
      title: document.title || 'TuniHome',
      description: 'TuniHome real estate marketplace in Tunisia.',
      robots: 'index,follow',
      type: 'website'
    };
    const meta = defaults[page] || fallback;
    applySeoMeta(meta);

    if (page === 'home') {
      setSeoStructuredData({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TuniHome',
        url: new URL('/index.html', window.location.origin).toString(),
        potentialAction: {
          '@type': 'SearchAction',
          target: new URL('/search.html', window.location.origin).toString() + '?location={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      });
    } else {
      setSeoStructuredData({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: meta.title,
        url: new URL(meta.canonicalPath || window.location.pathname, window.location.origin).toString()
      });
    }
  }

  function applyPropertySeo(listing) {
    if (!listing) return;
    const price = buildListingPriceLabel(listing);
    const descriptionText = String(listing.description || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 165);
    const description = descriptionText || t('View listing photos, pricing, amenities, owner details, and map location before contacting the seller.');
    const image = listingImage(listing, 0);
    applySeoMeta({
      title: String(listing.title || 'Property Details') + ' | TuniHome',
      description: description,
      type: 'product',
      image: image,
      robots: 'index,follow',
      canonicalPath: '/property.html?id=' + encodeURIComponent(String(listing.id || '').trim())
    });

    setSeoStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: listing.title,
      category: localizeListingCategory(listing.category),
      description: description,
      priceCurrency: 'TND',
      price: Number(listing.price || 0),
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Residence',
        name: listing.title,
        address: listing.location,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: Number(listing.surface || 0),
          unitCode: 'MTK'
        },
        numberOfRooms: Number(listing.rooms || 0),
        numberOfBathroomsTotal: Number(listing.baths || 0),
        image: new URL(image, window.location.origin).toString()
      },
      seller: {
        '@type': 'Organization',
        name: listing.ownerName || 'TuniHome Listing Owner'
      },
      url: new URL(withLanguageParam('property.html?id=' + encodeURIComponent(listing.id)), window.location.origin).toString(),
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: Number(listing.price || 0),
        priceCurrency: 'TND',
        valueAddedTaxIncluded: false
      },
      priceValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString().slice(0, 10),
      eligibleTransactionVolume: {
        '@type': 'PriceSpecification',
        priceCurrency: 'TND',
        minPrice: 1
      },
      identifier: String(listing.id || ''),
      sku: String(listing.id || ''),
      mpn: String(listing.id || ''),
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Location', value: listing.location || '' },
        { '@type': 'PropertyValue', name: 'Type', value: localizePropertyType(listing.type) },
        { '@type': 'PropertyValue', name: 'Price label', value: price }
      ]
    });
  }

  function applyStaticTranslations() {
    const page = getPage();
    document.documentElement.lang = currentLanguage === 'ar' ? 'ar' : (currentLanguage === 'fr' ? 'fr' : 'en');
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('is-rtl', currentLanguage === 'ar');

    const pageTitles = {
      home: 'TuniHome | Home',
      search: 'Search Listings | TuniHome',
      property: 'Property Details | TuniHome',
      'list-property': 'Create Listing | TuniHome',
      'pro-upgrade': 'Upgrade to Pro | TuniHome',
      dashboard: 'My Listings | TuniHome',
      admin: 'Admin Analytics | TuniHome',
      profile: 'Professional Profile | TuniHome',
      login: 'Log in | TuniHome',
      signup: 'Create account | TuniHome',
      settings: 'Settings | TuniHome',
      'my-listings': 'My Listings | TuniHome',
      favorites: 'Favorites | TuniHome'
    };
    if (pageTitles[page]) {
      document.title = t(pageTitles[page]);
    }

    ensureNavContactSales();
    setAttr('.brand', 'aria-label', 'Go to home');
    setAttr('.nav-account', 'aria-label', 'My account');
    setAttr('.footer-nav', 'aria-label', 'Primary navigation');
    setTextAll('.nav-contact-sales', 'Contact Sales');
    setTextAll('.footer-nav a[href="index.html"] span', 'Home');
    setTextAll('.footer-nav a[href="search.html"] span', 'Search');
    setTextAll('.footer-nav a[href="list-property.html"] span', 'List');
    setTextAll('.footer-nav a[href="dashboard.html"] span', 'My Listings');

    document.querySelectorAll('[data-language-select]').forEach(function (select) {
      select.setAttribute('aria-label', t('Language'));
      Array.from(select.options).forEach(function (option) {
        const value = normalizeLanguage(option.value || option.textContent);
        if (value === 'en') option.textContent = 'EN 🇬🇧';
        if (value === 'fr') option.textContent = 'FR 🇫🇷';
        if (value === 'ar') option.textContent = 'AR 🇹🇳';
      });
    });

    if (page === 'home') {
      setText('.home-nav-actions a[href="list-property.html"]', 'List your properties');
      setText('.landing-kicker', 'Trusted homes across Tunisia');
      setText('.landing-hero-content h2', 'Find verified homes across Tunisia.');
      setText('.landing-subtitle', 'Buy, rent, or book vacation stays from trusted owners and agencies.');
      setAttr('.landing-category-pills', 'aria-label', 'Listing mode');
      setText('[data-home-tab="sale"]', 'Buy');
      setText('[data-home-tab="long"]', 'Rent');
      setText('[data-home-tab="short"]', 'Vacation');
      setAttr('.landing-search-bar', 'aria-label', 'Quick property search');
      setText('label[for="quick-region"]', 'Region');
      setOptionText('#quick-region', '', 'Search by region');
      setText('label[for="landing-budget"]', 'Price');
      setOptionText('#landing-budget', '', 'Any price');
      setOptionText('#landing-budget', '1200', 'Up to 1,200 TND');
      setOptionText('#landing-budget', '2500', 'Up to 2,500 TND');
      setOptionText('#landing-budget', '5000', 'Up to 5,000 TND');
      setOptionText('#landing-budget', '10000', 'Up to 10,000 TND');
      setOptionText('#landing-budget', '20000', 'Up to 20,000 TND');
      setText('#hero-search-submit', 'Search homes');
      setText('#hero-advanced-search', 'Advanced Search');
      setText('#home-rent-tags-label', 'Rent tags');
      setText('[data-home-rent-tag="group"]', 'Group rent');
      setText('[data-home-rent-tag="couple"]', 'Couple rent');
      setText('[data-home-rent-tag="family"]', 'Family rent');
      setText('[data-home-rent-tag="students"]', 'Students rent');
      setText('.premium-home-kicker', 'Premium');
      setText('#premium-home-title', 'Get more visibility with Premium');
      setText('#premium-home-subtitle', 'Upgrade to Pro for stronger discovery, market insights, and priority support.');
      setText('#premium-home-point-1-title', 'More exposure');
      setText('#premium-home-point-1-copy', 'Show your listings higher in front of serious buyers and renters.');
      setText('#premium-home-point-2-title', 'Better listing recommendations');
      setText('#premium-home-point-2-copy', 'Follow tailored tips to improve performance and conversion.');
      setText('#premium-home-point-3-title', 'Price and market insights');
      setText('#premium-home-point-3-copy', 'Track views, demand, and pricing signals in one place.');
      setText('#premium-home-point-4-title', 'Priority support');
      setText('#premium-home-point-4-copy', 'Get faster responses when you need help.');
      setText('#premium-home-cta', 'View Pro plan');

      const sectionTitles = document.querySelectorAll('.landing-section .section-title');
      if (sectionTitles[0]) sectionTitles[0].textContent = t('TOP PICK');
      if (sectionTitles[1]) sectionTitles[1].textContent = t('NEW PROPERTIES');
      if (sectionTitles[2]) sectionTitles[2].textContent = t('TOP AGENCIES');

      const sectionLinks = document.querySelectorAll('.landing-section .landing-link');
      if (sectionLinks[0]) sectionLinks[0].textContent = t('View all');
      if (sectionLinks[1]) sectionLinks[1].textContent = t('View all');

      const homeAd = adSlotContent('home');
      const homeAdChip = document.querySelector('.home-ad-banner .ad-chip');
      const homeAdTitle = document.querySelector('.home-ad-banner h4');
      const homeAdBody = document.querySelector('.home-ad-banner p');
      const homeAdCta = document.querySelector('.home-ad-banner .home-ad-cta');
      const homeAdPhone = document.querySelector('.home-ad-banner .ad-phone');
      const homeAdImageLink = document.querySelector('.home-ad-banner .ad-media-link');
      const homeAdImage = document.querySelector('.home-ad-banner .ad-media-image');
      if (homeAdChip) homeAdChip.textContent = homeAd.chip;
      if (homeAdTitle) homeAdTitle.textContent = homeAd.title;
      if (homeAdBody) homeAdBody.textContent = homeAd.body;
      if (homeAdPhone) homeAdPhone.textContent = homeAd.phone;
      if (homeAdImageLink) homeAdImageLink.setAttribute('href', withLanguageParam(homeAd.href));
      if (homeAdImage) homeAdImage.setAttribute('src', homeAd.image);
      if (homeAdCta) {
        homeAdCta.textContent = homeAd.cta;
        homeAdCta.setAttribute('href', withLanguageParam(homeAd.href));
      }
    }

    if (page === 'search') {
      setText('.search-header a[href="list-property.html"]', 'List your properties');
      setAttr('#search-mobile-filter-trigger', 'aria-label', 'Open filters');
      setAttr('.board-tabs', 'aria-label', 'Category');
      setAttr('#search-filter-drawer', 'aria-label', 'Extra filters');
      setText('#search-filter-panel .filter-panel-head h2', 'Advanced Filters');
      setText('[data-search-category="sale"]', 'Buy');
      setText('[data-search-category="long"]', 'Rent');
      setText('[data-search-category="short"]', 'Vacation');
      setText('#search-rent-tags-label', 'Rent tags');
      setText('[data-search-rent-tag="group"]', 'Group rent');
      setText('[data-search-rent-tag="couple"]', 'Couple rent');
      setText('[data-search-rent-tag="family"]', 'Family rent');
      setText('[data-search-rent-tag="students"]', 'Students rent');
      setText('label[for="search-region"]', 'Region');
      setOptionText('#search-region', '', 'Any region');
      setText('label[for="search-location"]', 'City');
      setOptionText('#search-location', '', 'Select region first');
      setText('#search-price-range-label', 'Price Range');
      setText('label[for="search-min-price"]', 'Min price');
      setText('label[for="search-price"]', 'Max price');
      setText('#search-rooms-beds-label', 'Rooms and Beds');
      setText('[data-room-value="0"]', 'Any');
      setText('label[for="search-min-surface"]', 'Property Size (sqm)');
      setText('#search-property-type-label', 'Property type');
      setText('[data-search-type="all"]', 'Any type');
      setText('[data-search-type="apartment"]', 'Apartment');
      setText('[data-search-type="villa"]', 'Villa');
      setText('[data-search-type="house"]', 'House');
      setText('[data-search-type="room"]', 'Room');
      setText('[data-search-type="studio"]', 'Studio');
      setText('[data-search-type="condo"]', 'Condo');
      setText('[data-search-type="townhouse"]', 'Townhouse');
      setText('#search-amenities-label', 'Amenities');
      setText('[data-search-amenity="wifi"]', 'Wifi');
      setText('[data-search-amenity="aircon"]', 'Aircon');
      setText('[data-search-amenity="washer"]', 'Washer');
      setText('[data-search-amenity="dryer"]', 'Dryer');
      setText('[data-search-amenity="kitchen"]', 'Kitchen');
      setText('[data-search-amenity="heating"]', 'Heating');
      setText('#search-professional-only', 'Professional only');
      setText('#search-verified-only', 'Verified only');
      setText('#search-reset-filters', 'Clear All');
      setText('#search-apply-drawer', 'Show homes');
      setText('#results-view-list', 'List');
      setText('#results-view-split', 'Split');
      setText('#results-view-map', 'Map');
      setText('#search-load-more', 'Load more results');
      setText('.search-summary-kicker', 'Search intelligence');
      setText('#search-summary-title', 'Results tailored to your filters');
      setText('#search-summary-subtitle', 'Adjust region, city, type, or budget to refine the list.');
      setText('#search-summary-clear', 'Clear filters');
      setText('.map-city-pill .subtle', 'Location');
      setAttr('.map-zoom', 'aria-label', 'Zoom in');
      setAttr('.map-zoom.minus', 'aria-label', 'Zoom out');
      setText('#search-filter-drawer strong', 'More filters');
      setAttr('#search-filter-close', 'aria-label', 'Close');
      setText('label[for="search-region-mobile"]', 'Region');
      setOptionText('#search-region-mobile', '', 'Any region');
      setText('label[for="search-min-rooms-mobile"]', 'Minimum rooms');
      setText('label[for="search-location-mobile"]', 'City');
      setOptionText('#search-location-mobile', '', 'Select region first');
      setText('label[for="search-type-mobile"]', 'Property type');
      setOptionText('#search-type-mobile', 'all', 'Any type');
      setOptionText('#search-type-mobile', 'apartment', 'Apartment');
      setOptionText('#search-type-mobile', 'villa', 'Villa');
      setOptionText('#search-type-mobile', 'house', 'House');
      setOptionText('#search-type-mobile', 'room', 'Room');
      setOptionText('#search-type-mobile', 'studio', 'Studio');
      setOptionText('#search-type-mobile', 'condo', 'Condo');
      setOptionText('#search-type-mobile', 'townhouse', 'Townhouse');
      setText('label[for="search-min-price-mobile"]', 'Min price');
      setText('label[for="search-price-mobile"]', 'Max price');
      setOptionText('#search-min-rooms-mobile', '0', 'No minimum');
      setOptionText('#search-min-rooms-mobile', '1', '1 room+');
      setOptionText('#search-min-rooms-mobile', '2', '2 rooms+');
      setOptionText('#search-min-rooms-mobile', '3', '3 rooms+');
      setOptionText('#search-min-rooms-mobile', '4', '4 rooms+');
      setText('label[for="search-min-surface-mobile"]', 'Minimum surface (sqm)');
      setText('#search-apply-drawer-mobile', 'Apply filters');
    }

    if (page === 'property') {
      setText('.topbar .btn.mini', 'List your properties');
      setAttr('#carousel-prev', 'aria-label', 'Previous image');
      setAttr('#carousel-next', 'aria-label', 'Next image');
      setAttr('#property-save-btn', 'aria-label', 'Save listing');
      setText('#property-sale-banner', 'Homes for sale in Tunisia');
      setText('#property-show-all-media', 'Show all photos');
      setText('#property-description-title', 'Description');
      setText('#property-hosted-title', 'Listed by');
      setAttr('#owner-avatar', 'alt', 'Owner avatar');
      setText('#owner-profile-link', 'Profile');
      setText('#cta-call', 'Call');
      setText('#cta-whatsapp', 'WhatsApp');
      setText('#property-amenities-toggle-label', 'View amenities');
      setText('#property-booking-per', '');
      setText('#property-price-per-sqm-label', 'Price per m2');
      setText('#property-quick-category-label', 'Category');
      setText('#property-quick-availability-label', 'Availability');
      setText('#property-quick-type-label', 'Property type');
      setText('#property-quick-surface-label', 'Surface (sqm)');
      setText('#property-quick-rooms-label', 'Rooms');
      setText('#property-quick-baths-label', 'Baths');
      setText('#property-map-section .section-title', 'Map & location');
      setText('#property-map-link', 'Open full map');
      setText('#property-map-unlock', 'View map');
      setText('.property-map-city-pill .subtle', 'Location');
      setText('#property-video-title', 'Video tour');
      setText('#property-video-caption', 'Walk through this home before your visit.');
      setText('#property-video-link', 'Watch video tour');
      setText('#property-owner-tier', 'Individual');
      setText('#property-alert-btn', 'Let me know if price drops');
      setText('#property-report-btn', 'Report');
      setText('#property-contact-open', 'Send message');
      setText('#property-mobile-call', 'Call');
      setText('#property-mobile-price-note', '');
      setText('#property-contact-note', 'Reach the owner directly by call, WhatsApp, or message.');
      const propertyAd = adSlotContent('property');
      const propertyAdChip = document.querySelector('.property-ad-card .ad-chip');
      const propertyAdTitle = document.querySelector('.property-ad-card h4');
      const propertyAdBody = document.querySelector('.property-ad-card p');
      const propertyAdCta = document.querySelector('.property-ad-card .btn.light');
      const propertyAdPhone = document.querySelector('.property-ad-card .ad-phone');
      const propertyAdImageLink = document.querySelector('.property-ad-card .ad-media-link');
      const propertyAdImage = document.querySelector('.property-ad-card .ad-media-image');
      if (propertyAdChip) propertyAdChip.textContent = propertyAd.chip;
      if (propertyAdTitle) propertyAdTitle.textContent = propertyAd.title;
      if (propertyAdBody) propertyAdBody.textContent = propertyAd.body;
      if (propertyAdPhone) propertyAdPhone.textContent = propertyAd.phone;
      if (propertyAdImageLink) propertyAdImageLink.setAttribute('href', withLanguageParam(propertyAd.href));
      if (propertyAdImage) propertyAdImage.setAttribute('src', propertyAd.image);
      if (propertyAdCta) {
        propertyAdCta.textContent = propertyAd.cta;
        propertyAdCta.setAttribute('href', withLanguageParam(propertyAd.href));
      }
      setAttr('#property-share-link', 'aria-label', 'Share listing');
      setText('#property-contact-title', 'Send message to owner');
      setText('#property-contact-subtitle', 'Leave your contact details and message. The owner will reach out to you.');
      setText('label[for="property-contact-name"]', 'Your name');
      setText('label[for="property-contact-phone"]', 'Your phone');
      setText('label[for="property-contact-message"]', 'Leave your contact and message');
      setText('#property-contact-send', 'Send message');
      setText('#property-contact-form [data-contact-close]', 'Cancel');
      setText('#property-report-title', 'Report listing issue');
      setText('#property-report-subtitle', 'Help us review inaccurate listing information.');
      setText('label[for="property-report-reason"]', 'Reason');
      setOptionText('#property-report-reason', 'price-wrong', 'Price wrong');
      setOptionText('#property-report-reason', 'price-mismatch', 'Mismatch price');
      setOptionText('#property-report-reason', 'other', 'Other issue');
      setText('label[for="property-report-comment"]', 'Comment');
      setAttr('#property-report-comment', 'placeholder', 'Tell us what seems wrong...');
      setText('#property-report-send', 'Send report');
      setText('#property-similar-title', 'Similar listings');
    }

    if (page === 'list-property') {
      setText('.topbar .btn.mini', 'List your properties');
      setText('.form-story h2', 'Publish your listing in minutes');
      setText('.form-story p', 'Simple flow to publish clean listings quickly. Your profile settings control account tags automatically.');
      setAttr('.form-story img', 'alt', 'Modern home');
      setText('#listing-form-title', 'Listing setup');
      setText('#listing-verification-note', 'Agency/promoter verification pending: this listing will publish as Individual until approved.');
      setText('#listing-plan-label', 'Profile publishing settings');
      setText('#listing-plan-manage', 'Manage in profile');
      setText('[data-step-target="1"]', '1. Basics');
      setText('[data-step-target="2"]', '2. Details');
      setText('[data-step-target="3"]', '3. Media & contact');
      setText('[data-step-target="4"]', '4. Location');
      setText('#listing-section-details-title', 'Step 1: Basics');
      setText('#listing-section-details-subtitle', 'Choose listing category, condition, and set a clear price.');
      setText('label[for="listing-title"]', 'Listing title');
      setAttr('#listing-title', 'placeholder', 'Example: Modern sea-view apartment');
      setText('label[for="listing-category"]', 'Category');
      setOptionText('#listing-category', 'sale', 'Vente');
      setOptionText('#listing-category', 'long', 'Rent');
      setOptionText('#listing-category', 'short', 'Vacance');
      setOptionText('#listing-category', 'business', 'Fond de commerce');
      setText('label[for="listing-state"]', 'Property state');
      setOptionText('#listing-state', 'new', 'New');
      setOptionText('#listing-state', 'good', 'Good condition');
      setOptionText('#listing-state', 'under-construction', 'Under construction');
      setText('label[for="listing-ready-date"]', 'Ready by');
      setText('#listing-price-note', 'Price must be accurate. Wrong pricing may lead to listing removal.');
      setText('#listing-flow-form [data-listing-step="2"] .section-title', 'Step 2: Property details');
      setText('#listing-flow-form [data-listing-step="2"] .subtle', 'Add type, surface, rooms, baths, and amenities.');
      setText('label[for="listing-type"]', 'Property type');
      setOptionText('#listing-type', 'apartment', 'Apartment');
      setOptionText('#listing-type', 'villa', 'Villa');
      setOptionText('#listing-type', 'house', 'House');
      setOptionText('#listing-type', 'land', 'Lot / Terrain');
      setOptionText('#listing-type', 'shop', 'Commercial space');
      setOptionText('#listing-type', 'office', 'Office');
      setOptionText('#listing-type', 'room', 'Room');
      setOptionText('#listing-type', 'condo', 'Condo');
      setOptionText('#listing-type', 'studio', 'Studio');
      setText('label[for="listing-city"]', 'City');
      setOptionText('#listing-city', '', 'Any city');
      setText('label[for="listing-address"]', 'Address');
      setAttr('#listing-address', 'placeholder', 'Area, City');
      setText('label[for="listing-price"]', 'Price (TND)');
      setText('label[for="listing-rooms"]', 'Rooms');
      setText('label[for="listing-baths"]', 'Baths');
      setText('label[for="listing-surface"]', 'Surface (sqm)');
      setText('label[for="listing-dates"]', 'Availability dates (short-term)');
      setAttr('#listing-dates', 'placeholder', 'June-August 2026');
      setText('#listing-section-media-title', 'Step 3: Media & contact');
      setText('#listing-section-media-subtitle', 'Upload photos/video and add contact details.');
      setText('#listing-images-label', 'Image gallery');
      setText('#listing-add-photos', 'Add photos');
      setText('#listing-images-help', 'Tap a slot to attach photos.');
      setText('label[for="listing-video"]', 'Upload video (optional)');
      setText('#listing-video-help', 'Add a short walkthrough video.');
      setText('label[for="listing-video-2"]', 'Upload second video (optional)');
      setText('#listing-video-2-help', 'Add a second angle or neighborhood walk.');
      setText('label[for="listing-video-url"]', 'Video URL (optional)');
      setAttr('#listing-video-url', 'placeholder', 'https://youtube...');
      setText('label[for="listing-video-url-2"]', 'Second video URL (optional)');
      setAttr('#listing-video-url-2', 'placeholder', 'https://youtube...');
      setText('label[for="listing-contact-phone"]', 'Contact number');
      setText('label[for="listing-contact-whatsapp"]', 'WhatsApp');
      setText('label[for="listing-contact-message"]', 'Contact note (optional)');
      setText('#listing-section-content-title', 'Step 4: Location');
      setText('#listing-section-content-subtitle', 'Add city and exact area for better discovery.');
      setText('#listing-map-label', 'Pin exact map location');
      setAttr('#listing-map-picker', 'aria-label', 'Click map to set listing location');
      setText('#listing-map-help', 'Select your city, then click on the map to fine-tune the exact location.');
      setText('label[for="listing-verification-doc"]', 'Ownership proof screenshot / paper (admin only)');
      setText('#listing-verification-help', 'Optional but recommended: upload one clear document screenshot so TuniHome admins can verify your listing faster.');
      setText('label[for="listing-description"]', 'Description');
      setAttr('#listing-description', 'placeholder', 'Describe your property');
      setText('#listing-amenities-label', 'Amenities checklist');
      setTextAll('[data-listing-next-step]', 'Next step');
      setTextAll('[data-listing-prev-step]', 'Back');
      setText('#listing-cancel-link', 'Cancel');
      setText('#listing-submit-btn', 'Publish listing');
    }

    if (page === 'dashboard') {
      setText('.topbar .btn.mini', 'List your properties');
      setText('.dashboard-hero h2', 'Manage your listings in one place');
      setText('.dashboard-hero p', 'Professional tools unlock from profile settings. Track listing activity and performance in one place.');
      setAttr('[role="tablist"][aria-label="Dashboard mode"]', 'aria-label', 'Dashboard mode');
      setText('[data-dashboard-mode="individual"]', 'Individual');
      setText('[data-dashboard-mode="professional"]', 'Agency / Promoter');
      setText('#dashboard-list-title', 'Your listings');
      setText('.section-head .subtle[href="list-property.html"]', 'Add listing');
      setText('#dashboard-prof-panel .section-title', 'Professional tools');
      setText('#dashboard-prof-panel .notice', 'Boost top listings for premium placement and agency visibility.');
      setText('#dashboard-prof-panel .btn[type="button"]', 'Boost listing');
      setText('#dashboard-prof-panel .btn.light[type="button"]', 'Open profile');
      setText('#dashboard-prof-panel .btn.ghost', 'Open tracking dashboard');
    }

    if (page === 'admin') {
      setText('.topbar .btn.mini', 'List your properties');
      setText('#admin-hero-title', 'Admin operations');
      setText('#admin-hero-subtitle', 'Moderate listings, review account verification, and manage sponsored ad content.');
      setText('#admin-tab-overview', 'Overview');
      setText('#admin-tab-ads', 'Ads');
      setText('#admin-tab-verify', 'Verification');
      setText('#admin-tab-profiles', 'Profiles');
      setText('#admin-tab-listings', 'Listings');
      setText('#admin-tab-admins', 'Admin users');
      setText('#admin-overview-kpi-title', 'Core KPIs');
      setText('#admin-overview-kpi-subtitle', 'Live admin state');
      setText('#admin-overview-traffic-title', 'Traffic by category');
      setText('#admin-ads-title', 'Sponsored ad sections');
      setText('#admin-verify-title', 'Profile verification queue');
      setText('#admin-profiles-title', 'Profile management');
      setText('#admin-listings-title', 'Listing moderation');
      setText('#admin-users-title', 'Admin users');
      setText('#admin-verify-subtitle', 'Agency / promoter requests');
      setText('#admin-profiles-subtitle', 'Add, edit, or delete agency/promoter profiles');
      setText('#admin-listings-subtitle', 'Manual verification and removal');
      setText('#admin-users-subtitle', 'Create or manage admin access profiles');
      setText('#admin-profile-form-title', 'Create / update profile');
      setText('label[for="admin-profile-whatsapp"]', 'WhatsApp');
      setText('label[for="admin-profile-facebook"]', 'Facebook');
      setText('#admin-user-form-title', 'Create / update admin');
      setText('label[for="admin-user-name"]', 'Full name');
      setText('label[for="admin-user-email"]', 'Email');
      setText('label[for="admin-user-password"]', 'Password');
      setText('label[for="admin-user-role"]', 'Role');
      setOptionText('#admin-user-role', 'admin', 'Admin');
      setOptionText('#admin-user-role', 'super-admin', 'Super admin');
      setOptionText('#admin-user-role', 'moderator', 'Moderator');
      setText('#admin-user-save', 'Save admin user');
    }

    if (page === 'profile') {
      setText('.topbar .btn.mini', 'List your properties');
      setAttr('#profile-avatar', 'alt', 'Owner avatar');
      setAttr('#profile-cover', 'aria-label', 'Agency cover image');
      setText('#profile-type-badge', 'Professional');
      setText('#profile-call', 'Call');
      setText('#profile-whatsapp', 'WhatsApp');
      setText('#profile-website', 'Website');
      setText('#profile-instagram', 'Instagram');
      setText('#profile-facebook', 'Facebook');
      setText('#profile-linkedin', 'LinkedIn');
      setAttr('#profile-save-agency', 'aria-label', 'Save agency');
      setText('.profile-listings-section .section-head .section-title', 'Active listings');
    }

    if (page === 'login') {
      setText('.auth-header .btn.mini', 'List your properties');
      setText('.auth-kicker', 'Welcome to TuniHome');
      setText('.auth-story h2', 'Find, manage, and publish homes with a clean workflow.');
      setText('.auth-story-copy', 'Access saved listings, manage agency visibility, and respond to leads faster.');
      const points = document.querySelectorAll('.auth-points li');
      if (points[0]) points[0].textContent = t('Save favorites and alerts');
      if (points[1]) points[1].textContent = t('Track listing performance');
      if (points[2]) points[2].textContent = t('Manage agency profile and social links');
      setText('#auth-login-title', 'Welcome back');
      setText('#auth-login-subtitle', 'Log in to continue managing your listings and account.');
      setText('label[for="login-identifier"]', 'Email or phone');
      setAttr('#login-identifier', 'placeholder', '+216 20 000 000 or you@example.com');
      setText('label[for="login-password"]', 'Password');
      setText('#login-remember-label', 'Stay connected');
      setText('[data-target="login-password"]', 'Show');
      setText('#login-submit', 'Log in');
      setText('#auth-switch-label-login', 'New to TuniHome?');
      setText('#auth-go-signup', 'Create account');
    }

    if (page === 'signup') {
      setText('.auth-header .btn.mini', 'List your properties');
      setText('.auth-kicker', 'Start in minutes');
      setText('.auth-story h2', 'Create your TuniHome account and manage listings with confidence.');
      setText('.auth-story-copy', 'Built for individuals and agencies with simple tools, clean controls, and fast publishing.');
      const points = document.querySelectorAll('.auth-points li');
      if (points[0]) points[0].textContent = t('One place for all listings');
      if (points[1]) points[1].textContent = t('Professional profile visibility');
      if (points[2]) points[2].textContent = t('Quick publish and edit flow');
      setText('#auth-signup-title', 'Create your account');
      setText('#auth-signup-subtitle', 'Join TuniHome to publish, save, and manage properties.');
      setText('label[for="signup-name"]', 'Full name');
      setAttr('#signup-name', 'placeholder', 'Your name');
      setText('label[for="signup-phone"]', 'Phone number');
      setAttr('#signup-phone', 'placeholder', '+216 20 000 000');
      setText('label[for="signup-email"]', 'Email (optional)');
      setAttr('#signup-email', 'placeholder', 'you@example.com');
      setText('label[for="signup-password"]', 'Password');
      setText('label[for="signup-confirm"]', 'Confirm password');
      setText('[data-target="signup-password"]', 'Show');
      setText('[data-target="signup-confirm"]', 'Show');
      setText('#signup-submit', 'Create account');
      setText('#auth-switch-label-signup', 'Already have an account?');
      setText('#auth-go-login', 'Log in');
    }

    if (page === 'settings') {
      setText('.topbar .btn.mini', 'List your properties');
      setText('#settings-hero-title', 'Manage your profile settings');
      setText('#settings-hero-subtitle', 'Update your account identity and contact details.');
      setText('label[for="settings-name"]', 'Full name');
      setText('label[for="settings-email"]', 'Email');
      setText('label[for="settings-phone"]', 'Phone');
      setText('label[for="settings-avatar"]', 'Profile photo');
      setText('label[for="settings-whatsapp"]', 'WhatsApp number');
      setText('label[for="settings-bio"]', 'Public profile');
      setText('label[for="settings-cover"]', 'Agency cover URL');
      setText('label[for="settings-website"]', 'Website');
      setText('label[for="settings-instagram"]', 'Instagram');
      setText('label[for="settings-facebook"]', 'Facebook');
      setText('#settings-plan-title', 'Account tags');
      setText('#settings-plan-subtitle', 'Choose your account tag from profile settings. Agency and promoter accounts require manual verification.');
      setText('#settings-plan-individual-name', 'Individual');
      setText('#settings-plan-individual-price', 'Free');
      setText('#settings-plan-individual-f1', '2 active listings');
      setText('#settings-plan-individual-f2', '12 photos per listing');
      setText('#settings-plan-individual-f3', 'No video on Standard');
      setText('#settings-plan-individual-f4', 'Upgrade to Pro for 16 listings and 2 videos');
      setText('#settings-plan-agency-name', 'Agency');
      setText('#settings-plan-agency-price', 'Tag');
      setText('#settings-plan-agency-f1', '6 active listings');
      setText('#settings-plan-agency-f2', '12 photos and 1 video per listing');
      setText('#settings-plan-agency-f3', 'Manual verification required');
      setText('#settings-plan-agency-f4', 'Social links only after verification');
      setText('#settings-plan-promoter-name', 'Promoter');
      setText('#settings-plan-promoter-price', 'Tag');
      setText('#settings-plan-promoter-f1', '6 active listings');
      setText('#settings-plan-promoter-f2', '12 photos and 1 video per listing');
      setText('#settings-plan-promoter-f3', 'Manual verification required');
      setText('#settings-plan-promoter-f4', 'Upgrade to Pro for 16 listings and 2 videos');
      setText('#settings-use-individual', 'Use Individual');
      setText('#settings-start-verification', 'Start verification');
      setText('#settings-cancel-verification', 'Cancel request');
      setText('#settings-plan-current', 'Current tag: Individual');
      setText('#settings-verification-status', 'Verification status: Not required');
      setText('#settings-verify-title', 'Start verification');
      setText('#settings-verify-subtitle', 'Upload a legal document so TuniHome admins can review your account tag request.');
      setText('label[for="settings-verify-target"]', 'Requested account tag');
      setText('label[for="settings-verify-doc"]', 'Verification document');
      setText('label[for="settings-verify-note"]', 'Review note (optional)');
      setText('#settings-cancel-title', 'Cancel verification request');
      setText('#settings-cancel-subtitle', 'Your account will stay Individual and your pending request will be removed.');
      setText('#settings-cancel-confirm', 'Confirm cancel');
      setText('#settings-pro-access-title', 'Pro subscription');
      setText('#settings-pro-access-subtitle', 'Get more visibility with Premium. Upgrade to Pro for stronger discovery, market insights, and priority support.');
      setText('#settings-pro-access-status', 'Standard');
      setText('#settings-pro-access-link', 'Upgrade to Pro');
      setText('#settings-pro-stats-title', 'Listing statistics');
      setText('#settings-pro-stats-subtitle', 'Performance insights available for all account types.');
      setText('#settings-stat-impressions-label', 'Monthly impressions');
      setText('#settings-stat-leads-label', 'Lead requests');
      setText('#settings-stat-saves-label', 'Saved by users');
      setText('#settings-stat-conv-label', 'Contact conversion');
      setText('#settings-chart-views-label', 'Views');
      setText('#settings-chart-visits-label', 'Visits');
      setText('#settings-chart-time-label', 'Avg time on listing');
      setText('#settings-save-btn', 'Save changes');
      setText('#settings-back-dashboard', 'Back to dashboard');
    }

    if (page === 'pro-upgrade') {
      setText('.topbar .btn.mini', 'List your properties');
      setText('#pro-upgrade-title', 'Upgrade to Pro');
      setText('#pro-upgrade-subtitle', 'Unlock premium visibility and analytics for your listings.');
    }

    if (page === 'my-listings') {
      setText('.topbar .btn.mini', 'List your properties');
      setText('#my-listings-title', 'My listings overview');
      setText('#my-listings-subtitle', 'Track and review all listings published from your account.');
      setText('#my-listings-verification-title', 'Listing verification process');
      setText('#my-listings-verification-subtitle', 'Each listing is checked to keep the marketplace accurate and trusted.');
      setText('#my-listings-verification-doc-note', 'Upload ownership proof screenshots in listing creation so admins can verify faster.');
      setText('#verification-step-1-title', 'Submitted');
      setText('#verification-step-1-copy', 'We received your listing and queued it for review.');
      setText('#verification-step-2-title', 'Reviewing details');
      setText('#verification-step-2-copy', 'Price, media quality, and location details are verified.');
      setText('#verification-step-3-title', 'Published');
      setText('#verification-step-3-copy', 'Approved listings go live and start appearing in search.');
      setText('#my-listings-active-title', 'Active listings');
      setText('#my-listings-back-dashboard', 'Back to dashboard');
      setText('#my-listing-verify-title', 'Verify ownership');
      setText('#my-listing-verify-subtitle', 'Upload a legal ownership proof for this listing. Admin review is required.');
      setText('label[for="my-listing-verify-doc"]', 'Ownership proof document');
      setText('label[for="my-listing-verify-note"]', 'Note (optional)');
    }

    if (page === 'favorites') {
      setText('.topbar .btn.mini', 'List your properties');
      setText('#favorites-hero-title', 'Your saved spaces');
      setText('#favorites-hero-subtitle', 'Review saved listings and agencies in one place.');
      setText('#favorites-tab-listings', 'Favorite listings');
      setText('#favorites-tab-agencies', 'Favorite agencies');
      setText('#favorites-listings-title', 'Favorite listings');
      setText('#favorites-agencies-title', 'Favorite agencies');
      setText('#favorites-back-dashboard', 'Back to dashboard');
    }

    applySeoDefaults();
    renderSiteFooter();
    applyLanguageToLinks();
    applyAuthGating();
  }

  function initLanguagePicker() {
    const query = new URLSearchParams(window.location.search);
    const queryLang = normalizeLanguage(query.get('lang'));
    const savedLang = normalizeLanguage(readStorage(LANGUAGE_STORAGE_KEY, 'fr'));
    currentLanguage = queryLang === 'fr' || queryLang === 'en' || queryLang === 'ar'
      ? queryLang
      : (savedLang === 'en' || savedLang === 'ar' ? savedLang : 'fr');
    writeStorage(LANGUAGE_STORAGE_KEY, currentLanguage);

    document.querySelectorAll('[data-language-select]').forEach(function (select) {
      select.value = currentLanguage;
      select.addEventListener('change', function () {
        const nextLanguage = normalizeLanguage(select.value);
        const safeLanguage = nextLanguage === 'ar' ? 'ar' : (nextLanguage === 'en' ? 'en' : 'fr');
        if (safeLanguage === currentLanguage) return;
        writeStorage(LANGUAGE_STORAGE_KEY, safeLanguage);
        currentLanguage = safeLanguage;
        window.location.href = withLanguageParam(window.location.pathname + window.location.search + window.location.hash);
      });
    });

    applyStaticTranslations();
  }

  function openDrawer(drawer, backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer(drawer, backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  function getUserListedProperties() {
    const key = data.STORAGE_KEYS.listedProperties;
    return key ? readStorage(key, []) : [];
  }

  function replaceUserListedProperties(nextItems) {
    const key = data.STORAGE_KEYS.listedProperties;
    if (!key) return;
    writeStorage(key, Array.isArray(nextItems) ? nextItems : []);
  }

  function updateUserListedProperty(listingId, updater) {
    const id = String(listingId || '').trim();
    if (!id || typeof updater !== 'function') return null;
    const list = getUserListedProperties();
    let updatedItem = null;
    const next = list.map(function (item) {
      if (!item || String(item.id || '') !== id) return item;
      updatedItem = updater(Object.assign({}, item));
      return updatedItem || item;
    });
    if (updatedItem) {
      replaceUserListedProperties(next);
    }
    return updatedItem;
  }

  function deleteUserListedProperty(listingId) {
    const id = String(listingId || '').trim();
    if (!id) return false;
    const list = getUserListedProperties();
    const next = list.filter(function (item) {
      return String(item && item.id || '') !== id;
    });
    const changed = next.length !== list.length;
    if (changed) replaceUserListedProperties(next);
    return changed;
  }

  function allListingsWithUserData() {
    const adminState = adminStateStore();
    const deletedIds = new Set((adminState.deletedListingIds || []).map(function (id) {
      return String(id || '').trim();
    }));

    const userItems = getUserListedProperties().map(function (item) {
      if (!item || item.source !== 'user') return item;

      const ownerEmail = String(item.ownerEmail || '').trim().toLowerCase();
      if (!ownerEmail) return item;

      const account = getAccountSettingsByEmail(ownerEmail);
      const requestedTier = normalizeAccountTier(account.requestedAccountType || account.accountType);
      const verificationStatus = String(account.verificationStatus || '').toLowerCase();
      const verifiedByAccount = verificationStatus === 'verified';
      let tier = normalizeAccountTier(account.accountType);
      if (tier !== 'individual' && !verifiedByAccount) {
        tier = 'individual';
      }
      if (tier === 'individual' && verifiedByAccount && requestedTier !== 'individual') {
        tier = requestedTier;
      }

      const ownershipStatus = String(item.ownershipStatus || '').toLowerCase();
      const postStatus = String(item.postVerificationStatus || '').toLowerCase();
      const ownershipVerified = ownershipStatus === 'verified';
      const postVerified = postStatus === 'verified';
      const listingVerified = Boolean(item.verified || (ownershipVerified && postVerified));
      const ownerName = tier !== 'individual'
        ? (account.agencyName || account.name || item.ownerName || t('Professional Account'))
        : (account.name || item.ownerName || t('New Individual Account'));
      const ownerPhone = account.phone || item.ownerPhone || item.contactPhone || '';
      const ownerAvatar = account.avatar || item.ownerAvatar || '';

      return Object.assign({}, item, {
        ownerTier: tier,
        accountType: tier,
        professionalId: tier !== 'individual' ? (item.professionalId || userProfessionalId(ownerEmail)) : null,
        ownerName: ownerName,
        ownerPhone: ownerPhone,
        ownerAvatar: ownerAvatar,
        ownerBio: account.bio || item.ownerBio || '',
        ownerWebsite: account.website || item.ownerWebsite || '',
        ownerInstagram: account.instagram || item.ownerInstagram || '',
        ownerFacebook: account.facebook || item.ownerFacebook || '',
        ownerLinkedin: account.linkedin || item.ownerLinkedin || '',
        ownerCover: account.cover || item.ownerCover || '',
        ownerWhatsapp: account.whatsapp || item.ownerWhatsapp || item.contactWhatsapp || ownerPhone,
        contactPhone: item.contactPhone || ownerPhone,
        contactWhatsapp: item.contactWhatsapp || account.whatsapp || ownerPhone,
        verified: tier === 'individual' ? listingVerified : Boolean(verifiedByAccount || listingVerified),
        ownershipStatus: ownershipStatus || (item.verificationDocument ? 'requested' : ''),
        postVerificationStatus: postStatus || (listingVerified ? 'verified' : 'pending'),
        status: item.status || (listingVerified ? 'active' : 'pending'),
        isPromoted: Boolean(account.proSubscriptionActive)
      });
    });
    const combined = data.listings.concat(userItems);
    return combined.filter(function (item) {
      return !deletedIds.has(String(item && item.id || '').trim());
    });
  }

  function allProfessionalsWithUserData() {
    const allListings = allListingsWithUserData();
    const byId = {};

    (Array.isArray(data.professionals) ? data.professionals : []).forEach(function (pro) {
      if (!pro || !pro.id) return;
      byId[pro.id] = {
        id: pro.id,
        name: pro.name,
        avatar: pro.avatar,
        cover: pro.cover,
        bio: pro.bio,
        rating: pro.rating,
        reviews: pro.reviews,
        verified: pro.verified,
        phone: pro.phone,
        whatsapp: pro.whatsapp,
        website: pro.website,
        instagram: pro.instagram,
        facebook: pro.facebook,
        linkedin: pro.linkedin,
        badge: pro.badge,
        accountType: normalizeAccountTier(pro.badge || 'agency'),
        verificationStatus: pro.verified ? 'verified' : 'pending'
      };
    });

    profileSettingsEntries().forEach(function (entry) {
      const email = String(entry.email || '').trim().toLowerCase();
      const settings = entry.settings || getAccountSettingsByEmail(email);
      const tier = normalizeAccountTier(settings.accountType);
      if (tier === 'individual') return;
      if (String(settings.verificationStatus || '').toLowerCase() !== 'verified') return;
      const profileId = userProfessionalId(email);
      byId[profileId] = Object.assign({}, byId[profileId] || {}, {
        id: profileId,
        name: settings.agencyName || settings.name || t('Professional Account'),
        avatar: settings.avatar || '',
        cover: settings.cover || '',
        bio: settings.bio || t('New professional profile with recently submitted listings.'),
        verified: true,
        phone: settings.phone || '',
        whatsapp: settings.whatsapp
          ? ('https://wa.me/' + normalizePhone(settings.whatsapp).replace(/^\+/, ''))
          : (settings.phone
            ? ('https://wa.me/' + normalizePhone(settings.phone).replace(/^\+/, ''))
            : ((byId[profileId] && byId[profileId].whatsapp) || 'https://wa.me/21620000000')),
        website: settings.website || '',
        instagram: settings.instagram || '',
        facebook: settings.facebook || '',
        linkedin: settings.linkedin || '',
        badge: tier === 'promoter' ? t('Promoter') : t('Agency'),
        accountType: tier,
        verificationStatus: 'verified'
      });
    });

    allListings.forEach(function (item) {
      const professionalId = String(item.professionalId || '').trim();
      if (!professionalId || byId[professionalId]) return;
      byId[professionalId] = {
        id: professionalId,
        name: item.ownerName || t('Professional Account'),
        avatar: item.ownerAvatar || '',
        cover: item.ownerCover || (Array.isArray(item.images) && item.images[0]) || '',
        bio: item.ownerBio || t('New professional profile with recently submitted listings.'),
        rating: 4.5,
        reviews: 0,
        verified: Boolean(item.verified),
        phone: item.ownerPhone || '+216 20 000 000',
        whatsapp: item.ownerWhatsapp || 'https://wa.me/21620000000',
        website: item.ownerWebsite || '',
        instagram: item.ownerInstagram || '',
        facebook: item.ownerFacebook || '',
        linkedin: item.ownerLinkedin || '',
        badge: normalizeAccountTier(item.ownerTier || item.accountType) === 'promoter' ? t('Promoter') : t('Real Estate Agency'),
        accountType: normalizeAccountTier(item.ownerTier || item.accountType),
        verificationStatus: item.verified ? 'verified' : 'pending'
      };
    });

    return Object.keys(byId).map(function (id) {
      const listingsCount = allListings.filter(function (item) {
        return item.professionalId === id;
      }).length;
      return Object.assign({}, byId[id], { listingsCount: listingsCount });
    });
  }

  function agencyCardMarkup(pro, index, extraClasses) {
    const listingCount = Number(pro.listingsCount || 0);
    const agencyName = pro.name.split(' ').slice(0, 3).join(' ');
    const initials = pro.name.split(/\s+/).map(function (word) {
      return word.slice(0, 1).toUpperCase();
    }).join('').slice(0, 2);
    const coverImage = String(pro.cover || '').trim() || listingImage({ id: 'agency-' + pro.id }, index + 1);
    const badge = pro.badge || (pro.verified ? t('Verified') : t('Agency'));
    const saved = isAgencySaved(pro.id);
    const href = withLanguageParam('profile.html?pro=' + encodeURIComponent(pro.id) + '&slot=' + index);

    return [
      '<article class="agency-card agency-logo-card pop ' + escapeHtml(extraClasses || '') + '" data-agency-id="' + escapeHtml(pro.id) + '">',
      '  <button class="save-btn agency-save-btn ' + (saved ? 'saved' : '') + '" type="button" data-save-agency="' + escapeHtml(pro.id) + '" aria-label="' + escapeHtml(t('Save agency')) + '">' + heartIconMarkup() + '</button>',
      '  <a class="agency-card-link" href="' + href + '">',
      '    <div class="agency-card-cover">',
      '      <img class="agency-cover-image" loading="lazy" src="' + escapeHtml(coverImage) + '" alt="' + escapeHtml(agencyName) + '" />',
      '      <span class="agency-card-badge">' + escapeHtml(badge) + '</span>',
      '    </div>',
      '    <div class="agency-card-head">',
      '      <img class="agency-logo" loading="lazy" src="' + escapeHtml(pro.avatar || '') + '" alt="' + escapeHtml(pro.name) + '" />',
      '      <span class="agency-logo-fallback">' + escapeHtml(initials || 'AG') + '</span>',
      '    </div>',
      '    <div class="agency-card-body">',
      '      <strong class="agency-card-name">' + escapeHtml(agencyName) + '</strong>',
      '      <span class="agency-card-meta">' + escapeHtml(badge) + '</span>',
      '      <span class="agency-card-count">' + escapeHtml(tCount(listingCount, '{count} listing', '{count} listings')) + '</span>',
      '    </div>',
      '  </a>',
      '</article>'
    ].join('');
  }

  function renderSponsoredRow() {
    const wrap = document.getElementById('sponsored-row');
    if (!wrap) return;
    const pros = allProfessionalsWithUserData().slice(0, 12);
    wrap.innerHTML = pros.map(function (pro, index) {
      return agencyCardMarkup(pro, index, '');
    }).join('');
  }

  function renderHomeForYou() {
    const feed = document.getElementById('for-you-feed');
    if (!feed) return;

    const viewedIds = readStorage(data.STORAGE_KEYS.viewedListings, []);
    const recent = readStorage(data.STORAGE_KEYS.recentSearches, []);

    let candidates = [];

    viewedIds.forEach(function (id) {
      const found = allListingsWithUserData().find(function (item) {
        return item.id === id;
      });
      if (found) candidates.push(found);
    });

    if (candidates.length < 4 && recent.length > 0) {
      const recentSearch = recent[0];
      const fromRecent = allListingsWithUserData().filter(function (item) {
        return matchesFilters(item, {
          category: recentSearch.category || null,
          region: recentSearch.region || '',
          location: recentSearch.location || '',
          type: recentSearch.type || 'all',
          maxPrice: recentSearch.maxPrice || Number.POSITIVE_INFINITY,
          professionalOnly: Boolean(recentSearch.professionalOnly)
        });
      });
      candidates = candidates.concat(fromRecent);
    }

    const unique = [];
    const seen = new Set();
    candidates.forEach(function (item) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
    });

    let finalItems = unique.slice(0, 4);
    if (finalItems.length === 0) {
      finalItems = allListingsWithUserData().slice().sort(function (a, b) {
        return Number(b.price || 0) - Number(a.price || 0);
      }).slice(0, 4);
    }

    feed.innerHTML = finalItems.length
      ? finalItems.map(baseCard).join('')
      : emptyMessage(t('No listings available yet.'));
  }

  function initHomePage() {
    const regionInput = document.getElementById('quick-region');
    const typeSelect = document.getElementById('landing-type');
    const budgetSelect = document.getElementById('landing-budget');
    const bedsSelect = document.getElementById('landing-beds');
    const surfaceInput = document.getElementById('home-min-surface');
    const feed = document.getElementById('home-feed');
    const loadMore = document.getElementById('load-more-home');
    const searchSubmitBtn = document.getElementById('hero-search-submit');
    const advancedSearchBtn = document.getElementById('hero-advanced-search');
    const homeRentTagsWrap = document.getElementById('home-rent-tags-wrap');
    const homeRentTagChips = Array.from(document.querySelectorAll('[data-home-rent-tag]'));
    const advancedToggleBtn = document.getElementById('toggle-home-advanced');
    const advancedPanel = document.getElementById('home-advanced-panel');
    const professionalToggle = document.getElementById('home-professional-toggle');
    const verifiedToggle = document.getElementById('home-verified-toggle');
    const topbar = document.querySelector('.home-header');
    const hero = document.querySelector('.landing-hero, .hero-banner');

    if (!regionInput || !feed) return;

    const userPreferences = getUserPreferences();
    if (userPreferences) {
      if (['sale', 'long', 'short'].includes(String(userPreferences.defaultCategory))) {
        appState.home.category = String(userPreferences.defaultCategory);
      }
      if (String(userPreferences.defaultCity || '').trim()) {
        appState.home.location = String(userPreferences.defaultCity).trim();
        appState.home.region = resolveRegionName(userPreferences.defaultCity);
      }
      if (Number(userPreferences.maxBudget) > 0) {
        appState.home.maxPrice = Number(userPreferences.maxBudget);
      }
      if (userPreferences.prioritizePro) {
        appState.home.professionalOnly = true;
      }
    }

    appState.home.region = resolveRegionName(appState.home.region || regionInput.value || appState.home.location || '');
    appState.home.location = '';
    appState.home.amenities = [];
    appState.home.rentTags = [];
    fillSelectOptions(regionInput, TUNISIA_REGIONS.map(function (entry) { return entry.region; }), 'Search by region', appState.home.region);
    if (typeSelect) typeSelect.value = appState.home.type || 'all';
    if (budgetSelect) {
      budgetSelect.value = Number.isFinite(appState.home.maxPrice) ? String(appState.home.maxPrice) : '';
    }

    document.querySelectorAll('[data-home-tab]').forEach(function (tab) {
      const active = tab.getAttribute('data-home-tab') === appState.home.category;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    renderSponsoredRow();
    renderHomeForYou();
    setNavSearchValue(appState.home.region);

    function buildHomeSearchParams() {
      const params = new URLSearchParams();
      params.set('category', appState.home.category);
      if (appState.home.region && appState.home.region.trim()) {
        params.set('region', appState.home.region.trim());
      }
      if (appState.home.type && appState.home.type !== 'all') {
        params.set('type', appState.home.type);
      }
      if (Number.isFinite(appState.home.maxPrice)) {
        params.set('maxPrice', String(appState.home.maxPrice));
      }
      if (Number(appState.home.minRooms || 0) > 0) {
        params.set('minRooms', String(appState.home.minRooms));
      }
      if (Number(appState.home.minSurface || 0) > 0) {
        params.set('minSurface', String(appState.home.minSurface));
      }
      if (appState.home.professionalOnly) {
        params.set('professionalOnly', 'true');
      }
      if (appState.home.verifiedOnly) {
        params.set('verifiedOnly', 'true');
      }
      if (appState.home.amenities.length) {
        params.set('amenities', appState.home.amenities.join(','));
      }
      if (appState.home.rentTags.length) {
        params.set('rentTags', appState.home.rentTags.join(','));
      }
      return params;
    }

    function navigateToSearch(advanced) {
      const params = buildHomeSearchParams();
      if (advanced) {
        params.set('advanced', 'true');
      }
      applyCurrentLanguageParam(params);
      window.location.href = 'search.html?' + params.toString();
    }

    function updateSearchButtonLabel() {
      if (!searchSubmitBtn) return;
      if (appState.home.category === 'sale') searchSubmitBtn.textContent = t('Search homes');
      if (appState.home.category === 'long') searchSubmitBtn.textContent = t('Search rentals');
      if (appState.home.category === 'short') searchSubmitBtn.textContent = t('Search vacation');
      if (advancedSearchBtn) {
        advancedSearchBtn.textContent = t('Advanced Search');
      }
    }

    function syncHomeRentTags() {
      const isRentMode = appState.home.category === 'long';
      if (homeRentTagsWrap) {
        homeRentTagsWrap.classList.toggle('is-inactive', !isRentMode);
        homeRentTagsWrap.setAttribute('aria-hidden', isRentMode ? 'false' : 'true');
      }
      if (!isRentMode) {
        appState.home.rentTags = [];
      }
      homeRentTagChips.forEach(function (chip) {
        const tag = String(chip.getAttribute('data-home-rent-tag') || '').toLowerCase();
        chip.classList.toggle('active', appState.home.rentTags.includes(tag));
      });
    }

    function syncChipToggle(button, active, attrName) {
      button.classList.toggle('active', active);
      if (attrName) {
        button.setAttribute(attrName, String(active));
      }
    }

    document.querySelectorAll('[data-home-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('[data-home-tab]').forEach(function (item) {
          item.classList.remove('active');
          item.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        appState.home.category = tab.getAttribute('data-home-tab');
        appState.home.visibleCount = 4;
        syncHomeRentTags();
        updateSearchButtonLabel();
      });
    });

    document.querySelectorAll('[data-home-amenity]').forEach(function (chip) {
      const amenity = chip.getAttribute('data-home-amenity');
      chip.addEventListener('click', function () {
        const exists = appState.home.amenities.includes(amenity);
        if (exists) {
          appState.home.amenities = appState.home.amenities.filter(function (entry) {
            return entry !== amenity;
          });
        } else {
          appState.home.amenities.push(amenity);
        }
        chip.classList.toggle('active', !exists);
        appState.home.visibleCount = 4;
      });
    });

    homeRentTagChips.forEach(function (chip) {
      const tag = String(chip.getAttribute('data-home-rent-tag') || '').toLowerCase();
      chip.addEventListener('click', function () {
        if (appState.home.category !== 'long') return;
        const exists = appState.home.rentTags.includes(tag);
        if (exists) {
          appState.home.rentTags = appState.home.rentTags.filter(function (entry) {
            return entry !== tag;
          });
        } else {
          appState.home.rentTags.push(tag);
        }
        chip.classList.toggle('active', !exists);
        appState.home.visibleCount = 4;
      });
    });

    if (regionInput) {
      regionInput.addEventListener('change', function () {
        appState.home.region = resolveRegionName(regionInput.value);
        setNavSearchValue(appState.home.region);
        appState.home.visibleCount = 4;
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', function () {
        appState.home.type = typeSelect.value || 'all';
        appState.home.visibleCount = 4;
      });
    }

    if (budgetSelect) {
      budgetSelect.addEventListener('change', function () {
        appState.home.maxPrice = budgetSelect.value ? Number(budgetSelect.value) : Number.POSITIVE_INFINITY;
        appState.home.visibleCount = 4;
      });
    }

    if (bedsSelect) {
      bedsSelect.addEventListener('change', function () {
        appState.home.minRooms = Number(bedsSelect.value || 0);
        appState.home.visibleCount = 4;
      });
    }

    if (surfaceInput) {
      surfaceInput.addEventListener('input', function () {
        appState.home.minSurface = Number(surfaceInput.value || 0);
        appState.home.visibleCount = 4;
      });
    }

    if (professionalToggle) {
      syncChipToggle(professionalToggle, appState.home.professionalOnly, 'data-on');
      professionalToggle.addEventListener('click', function () {
        appState.home.professionalOnly = professionalToggle.getAttribute('data-on') !== 'true';
        syncChipToggle(professionalToggle, appState.home.professionalOnly, 'data-on');
        appState.home.visibleCount = 4;
      });
    }

    if (verifiedToggle) {
      syncChipToggle(verifiedToggle, appState.home.verifiedOnly, 'data-on');
      verifiedToggle.addEventListener('click', function () {
        appState.home.verifiedOnly = verifiedToggle.getAttribute('data-on') !== 'true';
        syncChipToggle(verifiedToggle, appState.home.verifiedOnly, 'data-on');
        appState.home.visibleCount = 4;
      });
    }

    if (searchSubmitBtn) {
      searchSubmitBtn.addEventListener('click', function () {
        navigateToSearch(false);
      });
    }

    if (advancedSearchBtn) {
      advancedSearchBtn.addEventListener('click', function () {
        navigateToSearch(true);
      });
    }

    const drawer = document.getElementById('mobile-filter-drawer');
    const backdrop = document.getElementById('mobile-filter-backdrop');
    const closeBtn = document.getElementById('close-mobile-filter');
    const applyBtn = document.getElementById('apply-mobile-filter');
    const drawerRegion = document.getElementById('drawer-region');
    const drawerPrice = document.getElementById('drawer-price');
    const drawerMinRooms = document.getElementById('drawer-min-rooms');
    const drawerProToggle = document.getElementById('drawer-professional-toggle');
    const drawerVerifiedToggle = document.getElementById('drawer-verified-toggle');

    if (advancedToggleBtn) {
      advancedToggleBtn.addEventListener('click', function () {
        const mobileScreen = window.matchMedia('(max-width: 1199px)').matches;
        if (mobileScreen && drawer && backdrop) {
          if (drawerRegion) {
            drawerRegion.value = appState.home.region || '';
          }
          if (drawerPrice) {
            drawerPrice.value = Number.isFinite(appState.home.maxPrice) ? appState.home.maxPrice : '';
          }
          if (drawerMinRooms) {
            drawerMinRooms.value = String(appState.home.minRooms || 0);
          }
          if (drawerProToggle) {
            syncChipToggle(drawerProToggle, appState.home.professionalOnly, 'data-toggle');
          }
          if (drawerVerifiedToggle) {
            syncChipToggle(drawerVerifiedToggle, appState.home.verifiedOnly, 'data-toggle');
          }
          openDrawer(drawer, backdrop);
          return;
        }
        if (advancedPanel) {
          advancedPanel.classList.toggle('hidden');
        }
      });
    }

    if (closeBtn && drawer && backdrop) {
      closeBtn.addEventListener('click', function () {
        closeDrawer(drawer, backdrop);
      });
    }

    if (backdrop && drawer) {
      backdrop.addEventListener('click', function () {
        closeDrawer(drawer, backdrop);
      });
    }

    if (drawerProToggle) {
      drawerProToggle.addEventListener('click', function () {
        const next = drawerProToggle.getAttribute('data-toggle') !== 'true';
        syncChipToggle(drawerProToggle, next, 'data-toggle');
      });
    }

    if (drawerVerifiedToggle) {
      drawerVerifiedToggle.addEventListener('click', function () {
        const next = drawerVerifiedToggle.getAttribute('data-toggle') !== 'true';
        syncChipToggle(drawerVerifiedToggle, next, 'data-toggle');
      });
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', function () {
        appState.home.region = drawerRegion && drawerRegion.value ? resolveRegionName(drawerRegion.value) : appState.home.region;
        appState.home.maxPrice = drawerPrice && drawerPrice.value ? Number(drawerPrice.value) : Number.POSITIVE_INFINITY;
        appState.home.minRooms = drawerMinRooms && drawerMinRooms.value ? Number(drawerMinRooms.value) : 0;
        appState.home.professionalOnly = drawerProToggle && drawerProToggle.getAttribute('data-toggle') === 'true';
        appState.home.verifiedOnly = drawerVerifiedToggle && drawerVerifiedToggle.getAttribute('data-toggle') === 'true';
        if (regionInput) {
          regionInput.value = appState.home.region;
        }
        if (budgetSelect) {
          budgetSelect.value = Number.isFinite(appState.home.maxPrice) ? String(appState.home.maxPrice) : '';
        }
        if (bedsSelect) {
          bedsSelect.value = String(appState.home.minRooms || 0);
        }
        setNavSearchValue(appState.home.region);
        closeDrawer(drawer, backdrop);
        navigateToSearch(true);
      });
    }

    if (loadMore) {
      loadMore.addEventListener('click', function () {
        appState.home.visibleCount += 4;
        renderHomeFeed(false);
      });
    }

    if (topbar && hero) {
      const syncTopbar = function () {
        const threshold = Math.max(22, Math.round(hero.offsetHeight * 0.08));
        topbar.classList.toggle('scrolled', window.scrollY > threshold);
      };
      syncTopbar();
      window.addEventListener('scroll', syncTopbar, { passive: true });
      window.addEventListener('resize', syncTopbar);
    }

    updateSearchButtonLabel();
    syncHomeRentTags();
    renderHomeFeed(true);

    function renderHomeFeed(storeSearch) {
      const source = allListingsWithUserData();
      const filtered = source.filter(function (item) {
        return matchesFilters(item, appState.home);
      });
      const ranked = rankListingsForFeed(filtered);

      if (storeSearch) {
        pushRecentSearch({
          source: 'home',
          category: appState.home.category,
          region: appState.home.region,
          type: appState.home.type,
          location: '',
          maxPrice: Number.isFinite(appState.home.maxPrice) ? appState.home.maxPrice : null,
          professionalOnly: appState.home.professionalOnly,
          verifiedOnly: appState.home.verifiedOnly,
          minRooms: appState.home.minRooms,
          minSurface: appState.home.minSurface,
          rentTags: appState.home.rentTags.slice(),
          amenities: appState.home.amenities.slice()
        });
      }

      const slice = ranked.slice(0, appState.home.visibleCount);
      feed.innerHTML = slice.length ? slice.map(baseCard).join('') : emptyMessage(t('No listings match your filters yet.'));
      if (loadMore) {
        loadMore.classList.toggle('hidden', ranked.length <= appState.home.visibleCount);
      }
    }
  }

  function initSearchPage() {
    const layout = document.getElementById('search-layout');
    const resultsWrap = document.getElementById('search-results');
    if (!layout || !resultsWrap) return;

    const source = allListingsWithUserData();
    const regionInput = document.getElementById('search-region');
    const locationInput = document.getElementById('search-location');
    const minPriceInput = document.getElementById('search-min-price');
    const priceInput = document.getElementById('search-price');
    const priceSlider = document.getElementById('search-price-slider');
    const priceOut = document.getElementById('search-price-value');
    const minRoomsInput = document.getElementById('search-min-rooms');
    const roomPills = Array.from(document.querySelectorAll('[data-room-value]'));
    const minSurfaceInput = document.getElementById('search-min-surface');
    const rentTagsWrap = document.getElementById('search-rent-tags-wrap');
    const rentTagChips = Array.from(document.querySelectorAll('[data-search-rent-tag]'));
    const countEl = document.getElementById('results-count');
    const summaryTitle = document.getElementById('search-summary-title');
    const summarySubtitle = document.getElementById('search-summary-subtitle');
    const summaryMetrics = document.getElementById('search-summary-metrics');
    const activeFiltersWrap = document.getElementById('search-active-filters');
    const summaryClearBtn = document.getElementById('search-summary-clear');
    const loadMore = document.getElementById('search-load-more');
    const mapCityLabel = document.getElementById('map-city-label');
    const markerLayer = document.getElementById('map-marker-layer');
    const mapPreview = document.getElementById('map-listing-preview');
    let currentRankedResults = [];

    const listViewBtn = document.getElementById('results-view-list');
    const splitViewBtn = document.getElementById('results-view-split');
    const mapViewBtn = document.getElementById('results-view-map');
    const desktopFilterToggle = document.getElementById('toggle-desktop-filters');
    const resetFiltersBtn = document.getElementById('search-reset-filters');

    const professionalBtn = document.getElementById('search-professional-only');
    const verifiedBtn = document.getElementById('search-verified-only');

    const drawer = document.getElementById('search-filter-drawer');
    const backdrop = document.getElementById('search-filter-backdrop');
    const openDrawerBtn = document.getElementById('search-mobile-filter-trigger');
    const closeDrawerBtn = document.getElementById('search-filter-close');
    const applyDesktopBtn = document.getElementById('search-apply-drawer');
    const applyMobileBtn = document.getElementById('search-apply-drawer-mobile');
    const regionMobile = document.getElementById('search-region-mobile');
    const locationMobile = document.getElementById('search-location-mobile');
    const typeMobile = document.getElementById('search-type-mobile');
    const minPriceMobile = document.getElementById('search-min-price-mobile');
    const maxPriceMobile = document.getElementById('search-price-mobile');
    const minRoomsMobile = document.getElementById('search-min-rooms-mobile');
    const minSurfaceMobile = document.getElementById('search-min-surface-mobile');
    const maxPriceLimit = Number((priceSlider && priceSlider.max) || 1500000);

    appState.search.amenities = [];
    appState.search.visibleCount = 9;

    const allowedTypes = ['all', 'apartment', 'villa', 'house', 'room', 'studio', 'condo', 'townhouse'];
    const categoryParam = getQueryParam('category');
    const regionParam = getQueryParam('region');
    const locationParam = getQueryParam('location');
    const typeParam = getQueryParam('type');
    const minPriceParam = Number(getQueryParam('minPrice') || 0);
    const maxPriceParam = Number(getQueryParam('maxPrice') || 0);
    const minRoomsParam = Number(getQueryParam('minRooms') || 0);
    const minSurfaceParam = Number(getQueryParam('minSurface') || 0);
    const amenitiesParam = getQueryParam('amenities');
    const rentTagsParam = getQueryParam('rentTags');
    const professionalOnlyParam = getQueryParam('professionalOnly');
    const verifiedOnlyParam = getQueryParam('verifiedOnly');
    const advancedParam = getQueryParam('advanced') === 'true';
    const userPreferences = getUserPreferences();

    if (userPreferences) {
      if (!categoryParam && ['sale', 'long', 'short'].includes(String(userPreferences.defaultCategory))) {
        appState.search.category = String(userPreferences.defaultCategory);
      }
      if (!locationParam && String(userPreferences.defaultCity || '').trim()) {
        appState.search.location = String(userPreferences.defaultCity).trim();
        appState.search.region = resolveRegionName(userPreferences.defaultCity);
      }
      if (!(maxPriceParam > 0) && Number(userPreferences.maxBudget) > 0) {
        appState.search.maxPrice = Number(userPreferences.maxBudget);
      }
      if (professionalOnlyParam == null && userPreferences.prioritizePro) {
        appState.search.professionalOnly = true;
      }
    }

    if (categoryParam && ['sale', 'long', 'short'].includes(categoryParam)) {
      appState.search.category = categoryParam;
    }
    if (regionParam) {
      appState.search.region = resolveRegionName(regionParam);
    }
    if (locationParam) {
      appState.search.location = locationParam;
      if (!appState.search.region) {
        appState.search.region = resolveRegionName(locationParam);
      }
    }
    if (typeParam && allowedTypes.includes(typeParam)) {
      appState.search.type = typeParam;
    }
    if (minPriceParam > 0) {
      appState.search.minPrice = minPriceParam;
    }
    if (maxPriceParam > 0) {
      appState.search.maxPrice = maxPriceParam;
    }
    if (minRoomsParam > 0) {
      appState.search.minRooms = minRoomsParam;
    }
    if (minSurfaceParam > 0) {
      appState.search.minSurface = minSurfaceParam;
    }
    if (professionalOnlyParam === 'true') {
      appState.search.professionalOnly = true;
    }
    if (verifiedOnlyParam === 'true') {
      appState.search.verifiedOnly = true;
    }
    if (amenitiesParam) {
      appState.search.amenities = amenitiesParam.split(',').map(function (entry) {
        return entry.trim().toLowerCase();
      }).filter(Boolean);
    }
    if (rentTagsParam) {
      appState.search.rentTags = rentTagsParam.split(',').map(function (entry) {
        return entry.trim().toLowerCase();
      }).filter(Boolean);
    } else {
      appState.search.rentTags = [];
    }

    if (appState.search.location && !appState.search.region) {
      appState.search.region = resolveRegionName(appState.search.location);
    }

    function syncRegionCityOptions() {
      const regions = TUNISIA_REGIONS.map(function (entry) {
        return entry.region;
      });
      const cities = regionCities(appState.search.region);
      const nextLocation = appState.search.location || '';
      const hasSelectedCity = cities.some(function (city) {
        return city === nextLocation;
      });

      if (regionInput) {
        fillSelectOptions(regionInput, regions, 'Any region', appState.search.region);
      }
      if (regionMobile) {
        fillSelectOptions(regionMobile, regions, 'Any region', appState.search.region);
      }

      if (!hasSelectedCity) {
        appState.search.location = '';
      }

      const cityPlaceholder = appState.search.region ? 'Any city' : 'Select region first';
      if (locationInput) {
        fillSelectOptions(locationInput, cities, cityPlaceholder, hasSelectedCity ? nextLocation : '');
      }
      if (locationMobile) {
        fillSelectOptions(locationMobile, cities, cityPlaceholder, hasSelectedCity ? nextLocation : '');
      }
    }

    function syncMobileCityOptions(regionValue, selectedValue) {
      if (!locationMobile) return;
      const cities = regionCities(regionValue);
      fillSelectOptions(locationMobile, cities, regionValue ? 'Any city' : 'Select region first', selectedValue || '');
    }

    function syncToggleButton(button, active) {
      if (!button) return;
      button.setAttribute('data-on', String(active));
      button.classList.toggle('active', active);
    }

    function syncCategoryTabs() {
      document.querySelectorAll('[data-search-category]').forEach(function (tab) {
        const active = tab.getAttribute('data-search-category') === appState.search.category;
        tab.classList.toggle('active', active);
      });
    }

    function syncTypeChips() {
      document.querySelectorAll('[data-search-type]').forEach(function (chip) {
        chip.classList.toggle('active', chip.getAttribute('data-search-type') === appState.search.type);
      });
    }

    function syncRoomPills() {
      roomPills.forEach(function (pill) {
        const value = Number(pill.getAttribute('data-room-value') || 0);
        pill.classList.toggle('active', value === Number(appState.search.minRooms || 0));
      });
    }

    function syncAmenityChips() {
      document.querySelectorAll('[data-search-amenity]').forEach(function (chip) {
        const amenity = chip.getAttribute('data-search-amenity');
        chip.classList.toggle('active', appState.search.amenities.includes(String(amenity).toLowerCase()));
      });
    }

    function syncRentTagChips() {
      rentTagChips.forEach(function (chip) {
        const tag = String(chip.getAttribute('data-search-rent-tag') || '').toLowerCase();
        chip.classList.toggle('active', appState.search.rentTags.includes(tag));
      });
    }

    function syncRentTagVisibility() {
      const isRentMode = appState.search.category === 'long';
      if (rentTagsWrap) {
        rentTagsWrap.classList.toggle('hidden', !isRentMode);
      }
      if (!isRentMode) {
        appState.search.rentTags = [];
      }
      syncRentTagChips();
    }

    function syncFormControls() {
      syncRegionCityOptions();
      if (minPriceInput) minPriceInput.value = appState.search.minPrice ? String(appState.search.minPrice) : '';
      if (priceInput) priceInput.value = String(appState.search.maxPrice || maxPriceLimit);
      if (priceSlider) priceSlider.value = String(appState.search.maxPrice || maxPriceLimit);
      if (regionMobile) regionMobile.value = appState.search.region || '';
      if (locationMobile) locationMobile.value = appState.search.location || '';
      if (typeMobile) typeMobile.value = appState.search.type || 'all';
      if (minPriceMobile) minPriceMobile.value = appState.search.minPrice ? String(appState.search.minPrice) : '';
      if (maxPriceMobile) maxPriceMobile.value = String(appState.search.maxPrice || maxPriceLimit);
      if (minRoomsInput) minRoomsInput.value = String(appState.search.minRooms || 0);
      if (minSurfaceInput) minSurfaceInput.value = appState.search.minSurface || '';
      if (minRoomsMobile) minRoomsMobile.value = String(appState.search.minRooms || 0);
      if (minSurfaceMobile) minSurfaceMobile.value = appState.search.minSurface || '';
      syncToggleButton(professionalBtn, appState.search.professionalOnly);
      syncToggleButton(verifiedBtn, appState.search.verifiedOnly);
      syncCategoryTabs();
      syncTypeChips();
      syncRoomPills();
      syncAmenityChips();
      syncRentTagVisibility();
      syncPriceSliderTrack();
      updatePriceOutput();
      setNavSearchValue(appState.search.location || appState.search.region || '');
      updateMapLocationLabel();
    }

    function syncPriceSliderTrack() {
      if (!priceSlider) return;
      const minValue = Number(priceSlider.min || 0);
      const maxValue = Number(priceSlider.max || maxPriceLimit);
      const current = Number(priceSlider.value || maxValue);
      const percent = ((current - minValue) / Math.max(1, maxValue - minValue)) * 100;
      const stop = Math.max(0, Math.min(100, percent));
      priceSlider.style.background = 'linear-gradient(90deg, #111 0%, #111 ' + stop + '%, #d9d9d9 ' + stop + '%, #d9d9d9 100%)';
    }

    function normalizePriceBounds(source) {
      let min = Number((minPriceInput && minPriceInput.value) || appState.search.minPrice || 0);
      let max = Number((priceInput && priceInput.value) || appState.search.maxPrice || maxPriceLimit);

      if (!Number.isFinite(min) || min < 0) min = 0;
      if (min > maxPriceLimit) min = maxPriceLimit;
      if (!Number.isFinite(max) || max < 300) max = maxPriceLimit;
      if (max > maxPriceLimit) max = maxPriceLimit;
      if (min > max) {
        if (source === 'min') {
          max = min;
        } else {
          min = max;
        }
      }

      appState.search.minPrice = min;
      appState.search.maxPrice = max;

      if (minPriceInput) minPriceInput.value = min > 0 ? String(min) : '';
      if (priceInput) priceInput.value = String(max);
      if (priceSlider) priceSlider.value = String(max);
      syncPriceSliderTrack();
      updatePriceOutput();
    }

    function updatePriceOutput() {
      if (!priceOut || !priceInput) return;
      const value = Number(priceInput.value || appState.search.maxPrice || maxPriceLimit);
      const min = Number(appState.search.minPrice || 0);
      if (value >= maxPriceLimit && min <= 0) {
        priceOut.textContent = t('Any budget');
        return;
      }
      const minLabel = min > 0 ? money(min) + ' TND' : '0 TND';
      const maxLabel = value >= maxPriceLimit ? t('Any') : money(value) + ' TND';
      priceOut.textContent = minLabel + ' - ' + maxLabel;
    }

    function setViewMode(mode) {
      appState.search.mapMode = mode;
      layout.classList.remove('view-list', 'view-split', 'view-map');
      layout.classList.add('view-' + mode);
      if (listViewBtn) {
        listViewBtn.classList.toggle('light', mode !== 'list');
        listViewBtn.classList.toggle('active', mode === 'list');
      }
      if (splitViewBtn) {
        splitViewBtn.classList.toggle('light', mode !== 'split');
        splitViewBtn.classList.toggle('active', mode === 'split');
      }
      if (mapViewBtn) {
        mapViewBtn.classList.toggle('light', mode !== 'map');
        mapViewBtn.classList.toggle('active', mode === 'map');
      }
      if (mode === 'list') {
        clearMapMarkers();
      } else {
        renderMapMarkers(currentRankedResults);
        updateMapLocationLabel();
      }
    }

    function updateMapLocationLabel() {
      if (!mapCityLabel) return;
      const country = t('Tunisia');
      const location = (appState.search.location || appState.search.region || country).trim();
      mapCityLabel.textContent = location ? (location.includes(',') ? location : location + ', ' + country) : country;
    }

    function compactPrice(value) {
      if (value >= 1000000) return (value / 1000000).toFixed(1).replace('.0', '') + 'M DT';
      if (value >= 1000) return (value / 1000).toFixed(value >= 10000 ? 0 : 1).replace('.0', '') + 'k DT';
      return value + ' DT';
    }

    function searchMetricMarkup(label, value) {
      return [
        '<span class="search-metric-pill">',
        '  <strong>' + escapeHtml(value) + '</strong>',
        '  <span>' + escapeHtml(label) + '</span>',
        '</span>'
      ].join('');
    }

    function currentSearchPriceLabel() {
      const hasMin = Number(appState.search.minPrice) > 0;
      const hasMax = Number(appState.search.maxPrice) < maxPriceLimit;
      if (!hasMin && !hasMax) return '';
      const minLabel = hasMin ? (money(appState.search.minPrice) + ' TND') : '0 TND';
      const maxLabel = hasMax ? (money(appState.search.maxPrice) + ' TND') : t('Any');
      return minLabel + ' - ' + maxLabel;
    }

    function activeSearchFilters() {
      const chips = [];
      if (appState.search.category !== 'sale') {
        chips.push({ key: 'category', label: localizeListingCategory(appState.search.category) });
      }
      if (appState.search.region) {
        chips.push({ key: 'region', label: appState.search.region });
      }
      if (appState.search.location) {
        chips.push({ key: 'location', label: primaryCityLabel(appState.search.location) || appState.search.location });
      }
      if (appState.search.type !== 'all') {
        chips.push({ key: 'type', label: localizePropertyType(appState.search.type) });
      }
      if (currentSearchPriceLabel()) {
        chips.push({ key: 'price', label: currentSearchPriceLabel() });
      }
      if (Number(appState.search.minRooms || 0) > 0) {
        chips.push({ key: 'rooms', label: String(appState.search.minRooms) + '+' });
      }
      if (Number(appState.search.minSurface || 0) > 0) {
        chips.push({ key: 'surface', label: String(appState.search.minSurface) + ' m2+' });
      }
      if (appState.search.professionalOnly) {
        chips.push({ key: 'professional', label: t('Professional only') });
      }
      if (appState.search.verifiedOnly) {
        chips.push({ key: 'verified', label: t('Verified only') });
      }
      appState.search.rentTags.forEach(function (tag) {
        chips.push({ key: 'rentTag', value: tag, label: localizeRentTagName(tag) });
      });
      appState.search.amenities.forEach(function (amenity) {
        chips.push({ key: 'amenity', value: amenity, label: localizeAmenityName(amenity) });
      });
      return chips;
    }

    function renderActiveSearchFilters() {
      if (!activeFiltersWrap) return;
      const chips = activeSearchFilters();
      activeFiltersWrap.innerHTML = chips.length
        ? chips.map(function (chip) {
          return [
            '<button class="search-active-chip" type="button" data-remove-filter="' + escapeHtml(chip.key) + '"' + (chip.value ? ' data-remove-value="' + escapeHtml(chip.value) + '"' : '') + '>',
            '  <span>' + escapeHtml(chip.label) + '</span>',
            '  <strong aria-hidden="true">×</strong>',
            '</button>'
          ].join('');
        }).join('')
        : '<span class="search-empty-chip">' + escapeHtml(t('No filters applied')) + '</span>';
      if (summaryClearBtn) {
        summaryClearBtn.classList.toggle('hidden', !chips.length);
      }
    }

    function updateSearchSummary(items) {
      const safeItems = Array.isArray(items) ? items : [];
      const verifiedCount = safeItems.filter(function (item) {
        return Boolean(item.verified);
      }).length;
      const averagePrice = safeItems.length
        ? Math.round(safeItems.reduce(function (sum, item) {
          return sum + Number(item.price || 0);
        }, 0) / safeItems.length)
        : 0;
      const topLocation = safeItems.reduce(function (acc, item) {
        const city = primaryCityLabel(item.location);
        if (!city) return acc;
        acc[city] = (acc[city] || 0) + 1;
        return acc;
      }, {});
      const topCity = Object.keys(topLocation).sort(function (a, b) {
        return topLocation[b] - topLocation[a];
      })[0] || t('Tunisia');
      const verifiedShare = safeItems.length ? Math.round((verifiedCount / safeItems.length) * 100) : 0;

      if (summaryTitle) {
        summaryTitle.textContent = tCount(safeItems.length, '{count} home ready to explore', '{count} homes ready to explore');
      }
      if (summarySubtitle) {
        summarySubtitle.textContent = safeItems.length
          ? (t('Average ask') + ' ' + money(averagePrice) + ' TND · ' + t('Top location') + ' ' + topCity)
          : t('Adjust region, city, type, or budget to refine the list.');
      }
      if (summaryMetrics) {
        summaryMetrics.innerHTML = safeItems.length
          ? [
            searchMetricMarkup(t('Average ask'), money(averagePrice) + ' TND'),
            searchMetricMarkup(t('Top location'), topCity),
            searchMetricMarkup(t('Verified share'), verifiedShare + '%')
          ].join('')
          : '';
      }
      renderActiveSearchFilters();
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function coordsToPosition(item, index) {
      if (item.coordinates && typeof item.coordinates.lat === 'number' && typeof item.coordinates.lng === 'number') {
        const latMin = 33.3;
        const latMax = 37.4;
        const lngMin = 8.0;
        const lngMax = 11.7;
        const left = ((item.coordinates.lng - lngMin) / (lngMax - lngMin)) * 100;
        const top = 100 - ((item.coordinates.lat - latMin) / (latMax - latMin)) * 100;
        return { top: clamp(top, 8, 92), left: clamp(left, 8, 92) };
      }
      const fallback = [
        { top: 20, left: 28 },
        { top: 24, left: 62 },
        { top: 42, left: 38 },
        { top: 52, left: 70 },
        { top: 66, left: 52 },
        { top: 72, left: 24 },
        { top: 78, left: 76 },
        { top: 38, left: 84 }
      ];
      return fallback[index % fallback.length];
    }

    function clearFocusedResultCard() {
      resultsWrap.querySelectorAll('.listing-card.map-focused').forEach(function (card) {
        card.classList.remove('map-focused');
      });
    }

    function focusResultCard(itemId) {
      clearFocusedResultCard();
      const target = resultsWrap.querySelector('[data-listing-id="' + itemId + '"]');
      if (!target) return;
      target.classList.add('map-focused');
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closeMapPreview() {
      if (!mapPreview) return;
      mapPreview.classList.add('hidden');
      mapPreview.innerHTML = '';
    }

    function clearMapMarkers() {
      if (!markerLayer) return;
      markerLayer.querySelectorAll('.map-price-pin').forEach(function (pin) {
        pin.remove();
      });
      closeMapPreview();
      clearFocusedResultCard();
    }

    function mapPreviewMarkup(item) {
      const owner = ownerFor(item);
      const ownerTag = owner.professional ? t('Agency') : t('Individual');
      const verifiedTag = item.verified ? '<span class="map-preview-spec">' + t('Verified') + '</span>' : '';
      const image = cardImageSet(item)[0] || listingImage(item, 0);

      return [
        '<article class="map-preview-card">',
        '  <button class="map-preview-close" type="button" data-map-preview-close aria-label="' + escapeHtml(t('Close preview')) + '">✕</button>',
        '  <a class="map-preview-link" href="' + withLanguageParam('property.html?id=' + encodeURIComponent(item.id)) + '">',
        '    <img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" />',
        '    <div class="map-preview-body">',
        '      <span class="map-preview-price">' + escapeHtml(compactCardPrice(item)) + '</span>',
        '      <h4 class="map-preview-title">' + escapeHtml(item.title) + '</h4>',
        '      <p class="map-preview-loc">' + escapeHtml(item.location) + '</p>',
        '      <div class="map-preview-specs">',
        '        <span class="map-preview-spec">' + ownerTag + '</span>',
        '        ' + verifiedTag,
        '      </div>',
        '    </div>',
        '  </a>',
        '</article>'
      ].join('');
    }

    function renderMapMarkers(items) {
      if (!markerLayer) return;
      clearMapMarkers();

      items.slice(0, 24).forEach(function (item, index) {
        const marker = document.createElement('button');
        marker.type = 'button';
        marker.className = 'map-price-pin';
        const position = coordsToPosition(item, index);
        marker.style.top = position.top + '%';
        marker.style.left = position.left + '%';
        marker.textContent = compactPrice(Number(item.price || 0));
        marker.title = item.title;

        marker.addEventListener('click', function (event) {
          event.stopPropagation();
          const previous = markerLayer.querySelector('.map-price-pin.active');
          if (previous) previous.classList.remove('active');
          marker.classList.add('active');
          focusResultCard(item.id);
          if (mapPreview) {
            mapPreview.innerHTML = mapPreviewMarkup(item);
            mapPreview.classList.remove('hidden');
          }
        });

        markerLayer.appendChild(marker);
      });
    }

    function cardsPerRowForSearchResults() {
      const collapsed = layout.classList.contains('filters-collapsed');
      if (appState.search.mapMode === 'map') return 0;
      if (appState.search.mapMode === 'list') return collapsed ? 4 : 3;
      return collapsed ? 3 : 2;
    }

    function searchAdMarkup(slot) {
      const ad = adSlotContent('search');
      return [
        '<article class="search-ad-card pop" data-ad-slot="' + slot + '">',
        '  <a class="ad-media-link" href="' + withLanguageParam(ad.href) + '">',
        '    <img class="ad-media-image" src="' + escapeHtml(ad.image) + '" alt="' + escapeHtml(ad.title) + '" loading="lazy" />',
        '  </a>',
        '  <span class="search-ad-chip">' + escapeHtml(ad.chip) + '</span>',
        '  <h4>' + escapeHtml(ad.title) + '</h4>',
        '  <p>' + escapeHtml(ad.body) + '</p>',
        '  <span class="ad-phone">' + escapeHtml(ad.phone) + '</span>',
        '  <a class="btn" href="' + withLanguageParam(ad.href) + '">' + escapeHtml(ad.cta) + '</a>',
        '</article>'
      ].join('');
    }

    function renderSearchCardsWithAds(items) {
      const cards = items.map(baseCard);
      const cardsPerRow = cardsPerRowForSearchResults();
      if (!cardsPerRow) return cards.join('');
      let offset = 0;
      [cardsPerRow, cardsPerRow * 2].forEach(function (point, index) {
        if (cards.length >= point) {
          cards.splice(point + offset, 0, searchAdMarkup(index + 1));
          offset += 1;
        }
      });
      return cards.join('');
    }

    function renderSearch(storeSearch) {
      const filtered = source.filter(function (item) {
        return matchesFilters(item, appState.search);
      });
      const ranked = rankListingsForFeed(filtered);
      currentRankedResults = ranked.slice();
      const slice = ranked.slice(0, appState.search.visibleCount);

      countEl.textContent = tCount(ranked.length, '{count} RESULT', '{count} RESULTS');
      resultsWrap.innerHTML = slice.length ? renderSearchCardsWithAds(slice) : emptyMessage(t('No matching properties for current filters.'));
      if (loadMore) {
        loadMore.classList.toggle('hidden', ranked.length <= appState.search.visibleCount);
      }

      if (appState.search.mapMode === 'list') {
        clearMapMarkers();
      } else {
        renderMapMarkers(ranked);
      }
      updateMapLocationLabel();
      updateSearchSummary(ranked);

      if (storeSearch) {
        pushRecentSearch({
          source: 'search',
          category: appState.search.category,
          region: appState.search.region,
          type: appState.search.type,
          amenities: appState.search.amenities.slice(),
          location: appState.search.location,
          minPrice: appState.search.minPrice,
          maxPrice: appState.search.maxPrice,
          professionalOnly: appState.search.professionalOnly,
          verifiedOnly: appState.search.verifiedOnly,
          rentTags: appState.search.rentTags.slice(),
          minRooms: appState.search.minRooms,
          minSurface: appState.search.minSurface
        });
      }
    }

    function resetFilters() {
      appState.search.type = 'all';
      appState.search.region = '';
      appState.search.location = '';
      appState.search.minPrice = 0;
      appState.search.maxPrice = maxPriceLimit;
      appState.search.minRooms = 0;
      appState.search.minSurface = 0;
      appState.search.professionalOnly = false;
      appState.search.verifiedOnly = false;
      appState.search.rentTags = [];
      appState.search.amenities = [];
      appState.search.visibleCount = 9;
      syncFormControls();
      renderSearch(true);
    }

    function removeSearchFilter(key, value) {
      if (key === 'category') appState.search.category = 'sale';
      if (key === 'region') {
        appState.search.region = '';
        appState.search.location = '';
      }
      if (key === 'location') appState.search.location = '';
      if (key === 'type') appState.search.type = 'all';
      if (key === 'price') {
        appState.search.minPrice = 0;
        appState.search.maxPrice = maxPriceLimit;
      }
      if (key === 'rooms') appState.search.minRooms = 0;
      if (key === 'surface') appState.search.minSurface = 0;
      if (key === 'professional') appState.search.professionalOnly = false;
      if (key === 'verified') appState.search.verifiedOnly = false;
      if (key === 'rentTag') {
        appState.search.rentTags = appState.search.rentTags.filter(function (entry) {
          return entry !== value;
        });
      }
      if (key === 'amenity') {
        appState.search.amenities = appState.search.amenities.filter(function (entry) {
          return entry !== value;
        });
      }
      appState.search.visibleCount = 9;
      syncFormControls();
      renderSearch(true);
    }

    document.querySelectorAll('[data-search-category]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        appState.search.category = tab.getAttribute('data-search-category');
        appState.search.visibleCount = 9;
        syncCategoryTabs();
        syncRentTagVisibility();
        renderSearch(true);
      });
    });

    document.querySelectorAll('[data-search-type]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        appState.search.type = chip.getAttribute('data-search-type');
        appState.search.visibleCount = 9;
        syncTypeChips();
        renderSearch(true);
      });
    });

    document.querySelectorAll('[data-search-amenity]').forEach(function (chip) {
      const amenity = String(chip.getAttribute('data-search-amenity') || '').toLowerCase();
      chip.addEventListener('click', function () {
        const exists = appState.search.amenities.includes(amenity);
        if (exists) {
          appState.search.amenities = appState.search.amenities.filter(function (item) {
            return item !== amenity;
          });
        } else {
          appState.search.amenities.push(amenity);
        }
        chip.classList.toggle('active', !exists);
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    });

    rentTagChips.forEach(function (chip) {
      const tag = String(chip.getAttribute('data-search-rent-tag') || '').toLowerCase();
      chip.addEventListener('click', function () {
        if (appState.search.category !== 'long') return;
        const exists = appState.search.rentTags.includes(tag);
        if (exists) {
          appState.search.rentTags = appState.search.rentTags.filter(function (entry) {
            return entry !== tag;
          });
        } else {
          appState.search.rentTags.push(tag);
        }
        chip.classList.toggle('active', !exists);
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    });

    if (regionInput) {
      regionInput.addEventListener('change', function () {
        appState.search.region = resolveRegionName(regionInput.value);
        appState.search.location = '';
        appState.search.visibleCount = 9;
        syncFormControls();
        renderSearch(true);
      });
    }

    if (regionMobile) {
      regionMobile.addEventListener('change', function () {
        syncMobileCityOptions(regionMobile.value, '');
      });
    }

    if (locationInput) {
      locationInput.addEventListener('change', function () {
        appState.search.location = locationInput.value;
        appState.search.visibleCount = 9;
        setNavSearchValue(appState.search.location || appState.search.region);
        renderSearch(true);
      });
    }

    if (minPriceInput) {
      minPriceInput.addEventListener('input', function () {
        normalizePriceBounds('min');
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    }

    if (priceInput) {
      priceInput.addEventListener('input', function () {
        normalizePriceBounds('max');
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    }

    if (priceSlider) {
      priceSlider.addEventListener('input', function () {
        if (priceInput) {
          priceInput.value = priceSlider.value;
        }
        normalizePriceBounds('slider');
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    }

    if (minRoomsInput) {
      minRoomsInput.addEventListener('change', function () {
        appState.search.minRooms = Number(minRoomsInput.value || 0);
        appState.search.visibleCount = 9;
        syncRoomPills();
        renderSearch(true);
      });
    }

    roomPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const value = Number(pill.getAttribute('data-room-value') || 0);
        appState.search.minRooms = value;
        if (minRoomsInput) {
          minRoomsInput.value = String(value);
        }
        appState.search.visibleCount = 9;
        syncRoomPills();
        renderSearch(true);
      });
    });

    if (minSurfaceInput) {
      minSurfaceInput.addEventListener('input', function () {
        appState.search.minSurface = Number(minSurfaceInput.value || 0);
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    }

    if (professionalBtn) {
      professionalBtn.addEventListener('click', function () {
        appState.search.professionalOnly = professionalBtn.getAttribute('data-on') !== 'true';
        syncToggleButton(professionalBtn, appState.search.professionalOnly);
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    }

    if (verifiedBtn) {
      verifiedBtn.addEventListener('click', function () {
        appState.search.verifiedOnly = verifiedBtn.getAttribute('data-on') !== 'true';
        syncToggleButton(verifiedBtn, appState.search.verifiedOnly);
        appState.search.visibleCount = 9;
        renderSearch(true);
      });
    }

    if (applyDesktopBtn) {
      applyDesktopBtn.addEventListener('click', function () {
        appState.search.visibleCount = 9;
        syncFormControls();
        renderSearch(true);
      });
    }

    if (loadMore) {
      loadMore.addEventListener('click', function () {
        appState.search.visibleCount += 6;
        renderSearch(false);
      });
    }

    if (listViewBtn) {
      listViewBtn.addEventListener('click', function () {
        setViewMode('list');
        renderSearch(false);
      });
    }

    if (splitViewBtn) {
      splitViewBtn.addEventListener('click', function () {
        setViewMode('split');
        renderSearch(false);
      });
    }

    if (mapViewBtn) {
      mapViewBtn.addEventListener('click', function () {
        setViewMode('map');
        renderSearch(false);
      });
    }

    if (mapPreview && markerLayer) {
      mapPreview.addEventListener('click', function (event) {
        const closeTrigger = event.target.closest('[data-map-preview-close]');
        if (!closeTrigger) return;
        event.preventDefault();
        closeMapPreview();
        const activePin = markerLayer.querySelector('.map-price-pin.active');
        if (activePin) activePin.classList.remove('active');
        clearFocusedResultCard();
      });

      markerLayer.addEventListener('click', function (event) {
        if (
          event.target.closest('.map-price-pin') ||
          event.target.closest('.map-listing-preview') ||
          event.target.closest('.map-city-pill') ||
          event.target.closest('.map-zoom')
        ) {
          return;
        }
        closeMapPreview();
        const activePin = markerLayer.querySelector('.map-price-pin.active');
        if (activePin) activePin.classList.remove('active');
        clearFocusedResultCard();
      });
    }

    function syncDesktopFilterToggle() {
      if (!desktopFilterToggle) return;
      const collapsed = layout.classList.contains('filters-collapsed');
      const label = desktopFilterToggle.querySelector('.label');
      const arrow = desktopFilterToggle.querySelector('.arrow');
      if (label) {
        label.textContent = t(collapsed ? 'Open' : 'Close');
      } else {
        desktopFilterToggle.textContent = t(collapsed ? 'Open' : 'Close') + ' ' + (collapsed ? '→' : '←');
      }
      if (arrow) {
        arrow.textContent = collapsed ? '→' : '←';
      }
      desktopFilterToggle.setAttribute('aria-label', t(collapsed ? 'Open filter panel' : 'Collapse filters'));
    }

    if (desktopFilterToggle) {
      desktopFilterToggle.addEventListener('click', function () {
        layout.classList.toggle('filters-collapsed');
        syncDesktopFilterToggle();
        renderSearch(false);
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', function () {
        resetFilters();
      });
    }

    if (summaryClearBtn) {
      summaryClearBtn.addEventListener('click', function () {
        resetFilters();
      });
    }

    if (activeFiltersWrap) {
      activeFiltersWrap.addEventListener('click', function (event) {
        const chip = event.target.closest('[data-remove-filter]');
        if (!chip) return;
        removeSearchFilter(
          String(chip.getAttribute('data-remove-filter') || ''),
          String(chip.getAttribute('data-remove-value') || '')
        );
      });
    }

    if (openDrawerBtn && drawer && backdrop) {
      openDrawerBtn.addEventListener('click', function () {
        if (regionMobile) {
          regionMobile.value = appState.search.region || '';
        }
        syncMobileCityOptions(appState.search.region || '', appState.search.location || '');
        if (locationMobile) {
          locationMobile.value = appState.search.location || '';
        }
        if (typeMobile) {
          typeMobile.value = appState.search.type || 'all';
        }
        if (minPriceMobile) {
          minPriceMobile.value = appState.search.minPrice ? String(appState.search.minPrice) : '';
        }
        if (maxPriceMobile) {
          maxPriceMobile.value = String(appState.search.maxPrice || maxPriceLimit);
        }
        if (minRoomsMobile) {
          minRoomsMobile.value = String(appState.search.minRooms || 0);
        }
        if (minSurfaceMobile) {
          minSurfaceMobile.value = appState.search.minSurface || '';
        }
        openDrawer(drawer, backdrop);
      });
    }

    if (closeDrawerBtn && drawer && backdrop) {
      closeDrawerBtn.addEventListener('click', function () {
        closeDrawer(drawer, backdrop);
      });
    }

    if (backdrop && drawer) {
      backdrop.addEventListener('click', function () {
        closeDrawer(drawer, backdrop);
      });
    }

    if (applyMobileBtn) {
      applyMobileBtn.addEventListener('click', function () {
        if (regionMobile) {
          appState.search.region = resolveRegionName(regionMobile.value);
          if (regionInput) regionInput.value = appState.search.region || '';
        }
        if (locationMobile) {
          appState.search.location = String(locationMobile.value || '').trim();
          if (locationInput) locationInput.value = locationMobile.value || '';
        }
        if (typeMobile) {
          appState.search.type = String(typeMobile.value || 'all');
          syncTypeChips();
        }
        if (minPriceMobile) {
          appState.search.minPrice = Number(minPriceMobile.value || 0);
          if (minPriceInput) minPriceInput.value = minPriceMobile.value || '';
        }
        if (maxPriceMobile) {
          const nextMax = Number(maxPriceMobile.value || maxPriceLimit);
          appState.search.maxPrice = Number.isFinite(nextMax) && nextMax > 0 ? nextMax : maxPriceLimit;
          if (priceInput) priceInput.value = String(appState.search.maxPrice);
          if (priceSlider) priceSlider.value = String(appState.search.maxPrice);
        }
        if (minRoomsMobile) {
          appState.search.minRooms = Number(minRoomsMobile.value || 0);
          if (minRoomsInput) minRoomsInput.value = minRoomsMobile.value;
          syncRoomPills();
        }
        if (minSurfaceMobile) {
          appState.search.minSurface = Number(minSurfaceMobile.value || 0);
          if (minSurfaceInput) minSurfaceInput.value = minSurfaceMobile.value;
        }
        normalizePriceBounds('max');
        appState.search.visibleCount = 9;
        syncFormControls();
        renderSearch(true);
        closeDrawer(drawer, backdrop);
      });
    }

    if (advancedParam && drawer && backdrop && window.matchMedia('(max-width: 1199px)').matches) {
      openDrawer(drawer, backdrop);
    }

    syncFormControls();
    normalizePriceBounds('max');
    syncDesktopFilterToggle();
    setViewMode('list');
    renderSearch(true);
  }

  function initPropertyPage() {
    const track = document.getElementById('detail-carousel-track');
    if (!track) return;

    const listingId = getQueryParam('id') || data.listings[0].id;
    let listing = data.getListingById ? data.getListingById(listingId) : null;
    if (!listing) {
      listing = allListingsWithUserData().find(function (item) {
        return item.id === listingId;
      });
    }

    if (!listing) {
      track.innerHTML = emptyMessage(t('Listing not found.'));
      return;
    }

    applyPropertySeo(listing);
    trackViewedListing(listing.id);

    const dotsWrap = document.getElementById('detail-dots');
    const thumbsWrap = document.getElementById('property-media-thumbs');
    const normalizeMediaSrc = function (src, fallbackIndex) {
      const value = String(src || '').trim();
      if (!value || /^blob:/i.test(value)) {
        return listingImage(listing, fallbackIndex);
      }
      return value;
    };
    const mediaSet = cardImageSet(listing)
      .map(function (src, idx) {
        return normalizeMediaSrc(src, idx);
      })
      .filter(function (src) {
        return Boolean(src);
      })
      .slice(0, 8);
    const videoCandidates = [];
    if (Array.isArray(listing.videoUrls)) {
      listing.videoUrls.forEach(function (item) {
        const value = String(item || '').trim();
        if (value) videoCandidates.push(value);
      });
    }
    videoCandidates.push(String(listing.videoUrl || '').trim());
    videoCandidates.push(String(listing.secondaryVideoUrl || '').trim());
    const primaryVideoUrl = videoCandidates.find(function (entry) {
      return /^https?:\/\//i.test(entry);
    }) || '';
    const hasVideo = Boolean(primaryVideoUrl || listing.hasVideo);
    while (mediaSet.length < 3) {
      mediaSet.push(normalizeMediaSrc('', mediaSet.length));
    }

    track.innerHTML = mediaSet.map(function (src) {
      return '<img loading="lazy" src="' + escapeHtml(src) + '" alt="' + escapeHtml(listing.title) + '" />';
    }).join('');

    if (dotsWrap) {
      dotsWrap.innerHTML = mediaSet.map(function (_, idx) {
        return '<button class="dot ' + (idx === 0 ? 'active' : '') + '" type="button" data-dot-index="' + idx + '" aria-label="' + escapeHtml(t('Go to photo {count}', { count: idx + 1 })) + '"></button>';
      }).join('');
    }

    if (thumbsWrap) {
      const thumbHtml = mediaSet.map(function (src, idx) {
        return [
          '<button class="property-thumb ' + (idx === 0 ? 'active' : '') + '" type="button" data-thumb-index="' + idx + '" aria-label="' + escapeHtml(t('Go to photo {count}', { count: idx + 1 })) + '">',
          '  <img loading="lazy" src="' + escapeHtml(src) + '" alt="' + escapeHtml(listing.title) + '" />',
          '</button>'
        ].join('');
      });
      thumbsWrap.innerHTML = thumbHtml.join('');
    }

    const attachImageFallbacks = function (scope, offset) {
      if (!scope) return;
      scope.querySelectorAll('img').forEach(function (image, idx) {
        const fallbackSrc = normalizeMediaSrc('', idx + offset);
        image.addEventListener('error', function handleError() {
          image.removeEventListener('error', handleError);
          image.src = fallbackSrc;
        });
      });
    };
    attachImageFallbacks(track, 0);
    attachImageFallbacks(thumbsWrap, 1);

    let index = 0;
    const updateCarousel = function () {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      if (dotsWrap) {
        dotsWrap.querySelectorAll('[data-dot-index]').forEach(function (dot) {
          const dotIndex = Number(dot.getAttribute('data-dot-index') || 0);
          dot.classList.toggle('active', dotIndex === index);
        });
      }
      if (thumbsWrap) {
        thumbsWrap.querySelectorAll('[data-thumb-index]').forEach(function (thumb) {
          const thumbIndex = Number(thumb.getAttribute('data-thumb-index') || 0);
          thumb.classList.toggle('active', thumbIndex === index);
        });
      }
    };

    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        index = (index - 1 + mediaSet.length) % mediaSet.length;
        updateCarousel();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        index = (index + 1) % mediaSet.length;
        updateCarousel();
      });
    }

    if (dotsWrap) {
      dotsWrap.addEventListener('click', function (event) {
        const dot = event.target.closest('[data-dot-index]');
        if (!dot) return;
        index = Number(dot.getAttribute('data-dot-index') || 0);
        updateCarousel();
      });
    }

    if (thumbsWrap) {
      thumbsWrap.addEventListener('click', function (event) {
        const thumb = event.target.closest('[data-thumb-index]');
        if (!thumb) return;
        index = Number(thumb.getAttribute('data-thumb-index') || 0);
        updateCarousel();
      });
    }

    let touchStartX = 0;
    track.addEventListener('touchstart', function (event) {
      touchStartX = event.touches[0].clientX;
    });
    track.addEventListener('touchend', function (event) {
      const diff = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) < 36) return;
      if (diff < 0) {
        index = (index + 1) % mediaSet.length;
      } else {
        index = (index - 1 + mediaSet.length) % mediaSet.length;
      }
      updateCarousel();
    });

    updateCarousel();

    const showAllMediaBtn = document.getElementById('property-show-all-media');
    if (showAllMediaBtn && thumbsWrap) {
      showAllMediaBtn.addEventListener('click', function () {
        thumbsWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      });
    }

    const detailSaveBtn = document.getElementById('property-save-btn');

    function syncSavedState() {
      const saved = isListingSaved(listing.id);
      if (detailSaveBtn) {
        detailSaveBtn.classList.toggle('saved', saved);
      }
    }

    if (detailSaveBtn) {
      detailSaveBtn.setAttribute('data-save-listing', listing.id);
      detailSaveBtn.setAttribute('aria-label', t('Save listing'));
    }
    syncSavedState();
    [detailSaveBtn].forEach(function (button) {
      if (!button) return;
      button.addEventListener('click', function () {
        window.setTimeout(syncSavedState, 0);
      });
    });

    const shareButton = document.getElementById('property-share-link');
    if (shareButton) {
      const defaultShareLabel = t('Share listing');
      const sharePath = withLanguageParam('property.html?id=' + encodeURIComponent(listing.id));
      const shareUrl = new URL(sharePath, window.location.href).toString();
      shareButton.textContent = t('Share');
      shareButton.setAttribute('aria-label', defaultShareLabel);

      const showCopiedState = function () {
        shareButton.textContent = t('Link copied');
        window.setTimeout(function () {
          shareButton.textContent = t('Share');
        }, 1700);
      };

      shareButton.addEventListener('click', function () {
        const shareData = {
          title: listing.title,
          text: listing.location,
          url: shareUrl
        };

        if (navigator.share) {
          navigator.share(shareData).then(function () {
            showCopiedState();
          }).catch(function () {
            // User canceled native share.
          });
          return;
        }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(shareUrl).then(function () {
            showCopiedState();
          }).catch(function () {
            window.prompt(t('Copy link'), shareUrl);
          });
          return;
        }

        window.prompt(t('Copy link'), shareUrl);
      });
    }

    const listingTierValue = listingTier(listing);
    document.getElementById('property-price').textContent = buildListingPriceLabel(listing);
    const mobilePriceNode = document.getElementById('property-mobile-price');
    if (mobilePriceNode) {
      mobilePriceNode.textContent = buildListingPriceLabel(listing);
    }
    document.getElementById('property-title').textContent = listing.title;
    document.getElementById('property-location').textContent = listing.location;
    document.getElementById('property-description').textContent = listing.description;

    const saleBanner = document.getElementById('property-sale-banner');
    if (saleBanner) {
      const saleOnly = listing.category === 'sale';
      saleBanner.classList.toggle('hidden', !saleOnly);
      if (saleOnly) {
        saleBanner.textContent = t('Homes for sale in Tunisia');
      }
    }

    const tag = document.getElementById('property-tag');
    if (tag) {
      tag.textContent = listingTierTag(listingTierValue);
      tag.className = 'badge ' + normalizeAccountTier(listingTierValue);
    }

    const verifiedBadge = document.getElementById('property-verified');
    if (verifiedBadge) {
      verifiedBadge.classList.toggle('hidden', !listing.verified);
    }

    const availabilityText = listing.availability || t('N/A');

    const quickAvailability = document.getElementById('property-quick-availability');
    const quickCategory = document.getElementById('property-quick-category');
    const quickType = document.getElementById('property-quick-type');
    const quickSurface = document.getElementById('property-quick-surface');
    const quickRooms = document.getElementById('property-quick-rooms');
    const quickBaths = document.getElementById('property-quick-baths');
    const pricePerSqmElement = document.getElementById('property-price-per-sqm');
    const pricePerSqmWrap = document.querySelector('.property-v2-price-meta');
    const pricePerSqm = Number(listing.surface) > 0
      ? Math.round(Number(listing.price || 0) / Number(listing.surface || 1))
      : 0;

    if (quickCategory) quickCategory.textContent = localizeListingCategory(listing.category);
    if (quickAvailability) quickAvailability.textContent = availabilityText;
    if (quickType) quickType.textContent = localizePropertyType(listing.type);
    if (quickSurface) quickSurface.textContent = String(listing.surface || 0) + ' m2';
    if (quickRooms) quickRooms.textContent = String(listing.rooms || 0);
    if (quickBaths) quickBaths.textContent = String(listing.baths || 0);
    if (pricePerSqmElement) {
      const shouldShowPricePerSqm = listing.category === 'sale' && pricePerSqm > 0;
      if (pricePerSqmWrap) {
        pricePerSqmWrap.classList.toggle('hidden', !shouldShowPricePerSqm);
      }
      pricePerSqmElement.textContent = shouldShowPricePerSqm ? money(pricePerSqm) + ' TND' : '—';
    }

    const amenityWrap = document.getElementById('property-amenities');
    const amenityToggle = document.getElementById('property-amenities-toggle');
    const amenityToggleLabel = document.getElementById('property-amenities-toggle-label');
    const amenityArrow = amenityToggle ? amenityToggle.querySelector('.property-collapse-arrow') : null;
    function amenityIcon(label) {
      const normalized = String(label || '').toLowerCase();
      if (normalized.includes('wifi')) return '📶';
      if (normalized.includes('air') || normalized.includes('clim')) return '❄';
      if (normalized.includes('kitchen') || normalized.includes('cuisine')) return '🍳';
      if (normalized.includes('pool') || normalized.includes('piscine')) return '🏊';
      if (normalized.includes('parking') || normalized.includes('garage')) return '🅿';
      if (normalized.includes('security') || normalized.includes('securite')) return '🛡';
      if (normalized.includes('view') || normalized.includes('vue')) return '🌅';
      if (normalized.includes('terrace') || normalized.includes('terrasse') || normalized.includes('balcony')) return '🌿';
      if (normalized.includes('furnished') || normalized.includes('meuble')) return '🛋';
      return '✓';
    }
    if (amenityWrap) {
      const amenityItems = Array.isArray(listing.amenities) ? listing.amenities : [];
      amenityWrap.innerHTML = amenityItems.length
        ? amenityItems.map(function (item) {
          return [
            '<div class="property-amenity-chip">',
            '  <span class="property-amenity-icon">' + amenityIcon(item) + '</span>',
            '  <span>' + escapeHtml(item) + '</span>',
            '</div>'
          ].join('');
        }).join('')
        : '<p class="subtle">' + escapeHtml(t('No amenities provided.')) + '</p>';
    }

    function syncAmenitiesCollapse() {
      if (!amenityWrap || !amenityToggle) return;
      const expanded = !amenityWrap.classList.contains('hidden');
      amenityToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      if (amenityToggleLabel) amenityToggleLabel.textContent = expanded ? t('Hide amenities') : t('View amenities');
      if (amenityArrow) amenityArrow.textContent = expanded ? '▴' : '▾';
    }

    if (amenityToggle && amenityWrap) {
      amenityToggle.addEventListener('click', function () {
        amenityWrap.classList.toggle('hidden');
        syncAmenitiesCollapse();
      });
      syncAmenitiesCollapse();
    }

    const videoCta = document.getElementById('property-video-cta');
    const videoLink = document.getElementById('property-video-link');
    const videoPreview = document.getElementById('property-video-preview-image');
    const videoCaption = document.getElementById('property-video-caption');
    if (videoPreview) {
      videoPreview.src = mediaSet[0];
      videoPreview.alt = t('Video preview');
      videoPreview.addEventListener('error', function handleVideoPreviewError() {
        videoPreview.removeEventListener('error', handleVideoPreviewError);
        videoPreview.src = normalizeMediaSrc('', 2);
      });
    }
    if (videoCta && videoLink) {
      videoLink.textContent = t('Watch video tour');
      videoLink.addEventListener('click', function (event) {
        if (videoLink.getAttribute('aria-disabled') === 'true') {
          event.preventDefault();
        }
      });
      if (hasVideo) {
        videoCta.classList.remove('hidden');
        if (primaryVideoUrl) {
          videoLink.href = primaryVideoUrl;
          videoLink.removeAttribute('aria-disabled');
          videoLink.classList.remove('disabled');
          if (videoCaption) videoCaption.textContent = t('Walk through this home before your visit.');
        } else {
          videoLink.href = '#';
          videoLink.setAttribute('aria-disabled', 'true');
          videoLink.classList.add('disabled');
          if (videoCaption) videoCaption.textContent = t('No video tour uploaded yet.');
        }
      } else {
        videoCta.classList.add('hidden');
      }
    }

    const owner = ownerFor(listing);
    const ownerAvatar = document.getElementById('owner-avatar');
    const ownerName = document.getElementById('owner-name');
    const ownerRating = document.getElementById('owner-rating');
    const ownerLink = document.getElementById('owner-profile-link');
    const ownerTier = normalizeAccountTier(owner.tier || listingTierValue);
    const ownerTierNode = document.getElementById('property-owner-tier');
    if (ownerAvatar) {
      ownerAvatar.src = owner.avatar || listingImage(listing, 1);
      ownerAvatar.alt = owner.name || t('Owner');
    }
    if (ownerName) ownerName.textContent = owner.name;
    if (ownerRating) {
      ownerRating.textContent = ownerTier === 'individual'
        ? t('Direct owner contact')
        : (tierBadgeLabel(ownerTier) + ' · ' + t('Verified contact profile'));
    }
    if (ownerTierNode) {
      ownerTierNode.textContent = tierBadgeLabel(ownerTier);
      ownerTierNode.className = 'badge ' + ownerTier;
    }

    if (ownerLink) {
      if (ownerTier !== 'individual') {
        ownerLink.href = withLanguageParam('profile.html?pro=' + encodeURIComponent(owner.id));
        ownerLink.textContent = t('Profile');
      } else {
        ownerLink.href = '#';
        ownerLink.textContent = t('Direct owner');
      }
    }

    const ctaCall = document.getElementById('cta-call');
    const ctaWhatsapp = document.getElementById('cta-whatsapp');
    const mobileCallCta = document.getElementById('property-mobile-call');
    if (ctaCall) {
      ctaCall.href = 'tel:' + normalizePhone(owner.phone);
    }
    if (mobileCallCta) {
      mobileCallCta.href = 'tel:' + normalizePhone(owner.phone);
    }
    if (ctaWhatsapp) {
      const normalizedWhatsapp = String(owner.whatsapp || '').trim();
      const isAbsolute = /^https?:\/\//i.test(normalizedWhatsapp);
      const fallbackWa = 'https://wa.me/' + normalizePhone(owner.phone).replace(/^\+/, '');
      ctaWhatsapp.href = isAbsolute ? normalizedWhatsapp : fallbackWa;
    }

    const alertBtn = document.getElementById('property-alert-btn');
    const reportBtn = document.getElementById('property-report-btn');
    const reportModal = document.getElementById('property-report-modal');
    const reportForm = document.getElementById('property-report-form');
    const reportReason = document.getElementById('property-report-reason');
    const reportComment = document.getElementById('property-report-comment');
    const reportFeedback = document.getElementById('property-report-feedback');
    const reportCloseNodes = reportModal ? reportModal.querySelectorAll('[data-report-close]') : [];

    function readPriceAlerts() {
      return readStorage(PRICE_ALERTS_STORAGE_KEY, []);
    }

    function writePriceAlerts(value) {
      writeStorage(PRICE_ALERTS_STORAGE_KEY, value.slice(0, 300));
    }

    function syncAlertButton() {
      if (!alertBtn) return;
      const alerts = readPriceAlerts();
      const enabled = alerts.includes(listing.id);
      alertBtn.classList.toggle('active', enabled);
      alertBtn.textContent = enabled
        ? t('Price drop alert on')
        : t('Let me know if price drops');
    }

    if (alertBtn) {
      alertBtn.addEventListener('click', function () {
        const currentAlerts = readPriceAlerts();
        const exists = currentAlerts.includes(listing.id);
        const next = exists
          ? currentAlerts.filter(function (entry) { return entry !== listing.id; })
          : [listing.id].concat(currentAlerts);
        writePriceAlerts(next);
        syncAlertButton();
      });
      syncAlertButton();
    }

    function openReportModal() {
      if (!reportModal) return;
      reportModal.classList.remove('hidden');
      reportModal.setAttribute('aria-hidden', 'false');
      if (reportFeedback) {
        reportFeedback.classList.add('hidden');
        reportFeedback.textContent = '';
      }
    }

    function closeReportModal() {
      if (!reportModal) return;
      reportModal.classList.add('hidden');
      reportModal.setAttribute('aria-hidden', 'true');
      if (reportForm) reportForm.reset();
    }

    if (reportBtn) {
      reportBtn.addEventListener('click', openReportModal);
    }

    reportCloseNodes.forEach(function (node) {
      node.addEventListener('click', closeReportModal);
    });

    if (reportForm && reportReason) {
      reportForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const reason = String(reportReason.value || '').trim();
        const comment = String((reportComment && reportComment.value) || '').trim();
        if (!reason) {
          if (reportFeedback) {
            reportFeedback.classList.remove('hidden');
            reportFeedback.classList.add('error');
            reportFeedback.textContent = t('Please select a report reason.');
          }
          return;
        }

        const reports = readStorage(LISTING_REPORTS_STORAGE_KEY, []);
        reports.unshift({
          id: 'report-' + Date.now(),
          listingId: listing.id,
          reason: reason,
          comment: comment,
          createdAt: Date.now()
        });
        writeStorage(LISTING_REPORTS_STORAGE_KEY, reports.slice(0, 500));

        if (reportFeedback) {
          reportFeedback.classList.remove('hidden', 'error');
          reportFeedback.textContent = t('Report sent. Thank you for your feedback.');
        }

        window.setTimeout(function () {
          closeReportModal();
        }, 900);
      });
    }

    const contactModal = document.getElementById('property-contact-modal');
    const contactOpenButton = document.getElementById('property-contact-open');
    const contactCloseNodes = contactModal ? contactModal.querySelectorAll('[data-contact-close]') : [];
    const contactForm = document.getElementById('property-contact-form');
    const contactName = document.getElementById('property-contact-name');
    const contactPhone = document.getElementById('property-contact-phone');
    const contactMessage = document.getElementById('property-contact-message');
    const contactFeedback = document.getElementById('property-contact-feedback');
    const session = getAuthSession();
    if (contactName && session && session.name) {
      contactName.value = String(session.name || '').trim();
    }
    if (contactPhone && session && session.phone) {
      contactPhone.value = String(session.phone || '').trim();
    }

    function openContactModal() {
      if (!contactModal) return;
      contactModal.classList.remove('hidden');
      contactModal.setAttribute('aria-hidden', 'false');
      if (contactFeedback) {
        contactFeedback.classList.add('hidden');
        contactFeedback.classList.remove('error');
        contactFeedback.textContent = '';
      }
    }

    function closeContactModal() {
      if (!contactModal) return;
      contactModal.classList.add('hidden');
      contactModal.setAttribute('aria-hidden', 'true');
    }

    [contactOpenButton].forEach(function (button) {
      if (!button) return;
      button.addEventListener('click', openContactModal);
    });

    contactCloseNodes.forEach(function (node) {
      node.addEventListener('click', closeContactModal);
    });

    if (contactForm && contactName && contactPhone && contactMessage) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const fullName = String(contactName.value || '').trim();
        const phone = normalizePhone(contactPhone.value);
        const messageText = String(contactMessage.value || '').trim();
        if (fullName.length < 2 || phone.length < 8 || messageText.length < 6) {
          if (contactFeedback) {
            contactFeedback.classList.remove('hidden');
            contactFeedback.classList.add('error');
            contactFeedback.textContent = t('Please enter your contact details and message.');
          }
          return;
        }

        const contacts = readStorage(LISTING_CONTACTS_STORAGE_KEY, []);
        contacts.unshift({
          id: 'lead-' + Date.now(),
          listingId: listing.id,
          toOwner: owner.id,
          fromName: fullName,
          fromPhone: phone,
          message: messageText,
          createdAt: Date.now()
        });
        writeStorage(LISTING_CONTACTS_STORAGE_KEY, contacts.slice(0, 600));

        if (contactFeedback) {
          contactFeedback.classList.remove('hidden', 'error');
          contactFeedback.textContent = t('Message sent to listing owner.');
        }
        contactMessage.value = '';
        window.setTimeout(closeContactModal, 900);
      });
    }

    const mapLabel = document.getElementById('property-map-label');
    const mapPin = document.getElementById('property-map-pin');
    const mapLink = document.getElementById('property-map-link');
    const mapCanvas = document.getElementById('property-map-canvas');
    const mapLock = document.getElementById('property-map-lock');
    const mapUnlock = document.getElementById('property-map-unlock');

    function mapCoordinatesToPercent(coords) {
      if (!coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
        return { top: 50, left: 50 };
      }
      const latMin = 33.3;
      const latMax = 37.4;
      const lngMin = 8.0;
      const lngMax = 11.7;
      const left = ((coords.lng - lngMin) / (lngMax - lngMin)) * 100;
      const top = 100 - ((coords.lat - latMin) / (latMax - latMin)) * 100;
      return {
        top: Math.max(10, Math.min(90, top)),
        left: Math.max(10, Math.min(90, left))
      };
    }

    const mapLabelText = /tunisia|tunisie/i.test(String(listing.location || ''))
      ? listing.location
      : listing.location + ', ' + t('Tunisia');

    if (mapLabel) {
      mapLabel.textContent = mapLabelText;
    }

    if (mapPin) {
      const marker = mapCoordinatesToPercent(listing.coordinates);
      mapPin.style.top = marker.top + '%';
      mapPin.style.left = marker.left + '%';
    }

    if (mapLink) {
      const query = listing.coordinates && typeof listing.coordinates.lat === 'number' && typeof listing.coordinates.lng === 'number'
        ? (listing.coordinates.lat + ',' + listing.coordinates.lng)
        : listing.location;
      mapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
    }

    if (mapCanvas) {
      mapCanvas.classList.add('is-locked');
    }
    if (mapUnlock && mapCanvas && mapLock) {
      mapUnlock.addEventListener('click', function () {
        mapCanvas.classList.remove('is-locked');
        mapLock.classList.add('hidden');
      });
    }

    const similarWrap = document.getElementById('property-similar-listings');
    if (similarWrap) {
      const currentCity = String(listing.location || '').split(',').slice(-1)[0].trim().toLowerCase();
      const similar = allListingsWithUserData()
        .filter(function (item) {
          return item.id !== listing.id;
        })
        .map(function (item) {
          let score = 0;
          if (item.category === listing.category) score += 3;
          if (item.type === listing.type) score += 2;
          const itemCity = String(item.location || '').split(',').slice(-1)[0].trim().toLowerCase();
          if (itemCity && itemCity === currentCity) score += 2;
          const priceDiff = Math.abs(Number(item.price || 0) - Number(listing.price || 0));
          return { item: item, score: score, priceDiff: priceDiff };
        })
        .sort(function (a, b) {
          if (b.score !== a.score) return b.score - a.score;
          return a.priceDiff - b.priceDiff;
        })
        .slice(0, 4)
        .map(function (entry) {
          return entry.item;
        });

      similarWrap.innerHTML = similar.length
        ? similar.map(baseCard).join('')
        : emptyMessage(t('No similar listings available yet.'));
    }
  }

  function initListPropertyPage() {
    const form = document.getElementById('listing-flow-form');
    if (!form) return;

    if (!isAuthenticated()) {
      window.location.href = authLoginHref('list-property.html');
      return;
    }

    const session = getAuthSession();
    if (!session) return;

    const successBox = document.getElementById('listing-success');
    const accountSummary = document.getElementById('listing-account-summary');
    const verificationNote = document.getElementById('listing-verification-note');
    const planLimitPill = document.getElementById('listing-plan-photo-limit');
    const planVideoPill = document.getElementById('listing-plan-video-limit');
    const planListingPill = document.getElementById('listing-plan-listing-limit');
    const planNote = document.getElementById('listing-plan-note');
    const planManageLink = document.getElementById('listing-plan-manage');
    const addPhotosBtn = document.getElementById('listing-add-photos');
    const slotsWrap = document.getElementById('upload-slots');
    const titleInput = document.getElementById('listing-title');
    const categoryInput = document.getElementById('listing-category');
    const stateInput = document.getElementById('listing-state');
    const readyWrap = document.getElementById('listing-ready-wrap');
    const readyDateInput = document.getElementById('listing-ready-date');
    const cityInput = document.getElementById('listing-city');
    const addressInput = document.getElementById('listing-address');
    const priceInput = document.getElementById('listing-price');
    const typeInput = document.getElementById('listing-type');
    const roomsInput = document.getElementById('listing-rooms');
    const bathsInput = document.getElementById('listing-baths');
    const surfaceInput = document.getElementById('listing-surface');
    const descriptionInput = document.getElementById('listing-description');
    const shortTermWrap = document.getElementById('short-term-dates-wrap');
    const datesInput = document.getElementById('listing-dates');
    const contactPhoneInput = document.getElementById('listing-contact-phone');
    const contactWhatsappInput = document.getElementById('listing-contact-whatsapp');
    const contactMessageInput = document.getElementById('listing-contact-message');
    const imagesInput = document.getElementById('listing-images');
    const videoInput = document.getElementById('listing-video');
    const videoInputSecondary = document.getElementById('listing-video-2');
    const videoUrlInput = document.getElementById('listing-video-url');
    const videoUrlInputSecondary = document.getElementById('listing-video-url-2');
    const videoField = document.getElementById('listing-video-field');
    const videoFieldSecondary = document.getElementById('listing-video-2-field');
    const videoUrlField = document.getElementById('listing-video-url-field');
    const videoUrlFieldSecondary = document.getElementById('listing-video-url-2-field');
    const videoPreview = document.getElementById('video-preview');
    const verificationDocInput = document.getElementById('listing-verification-doc');
    const mapPicker = document.getElementById('listing-map-picker');
    const mapPin = document.getElementById('listing-map-pin');
    const latInput = document.getElementById('listing-lat');
    const lngInput = document.getElementById('listing-lng');
    const amenitiesWrap = document.getElementById('listing-amenities-grid');
    const imageHelp = document.getElementById('listing-images-help');
    const stepTabs = Array.from(document.querySelectorAll('[data-step-target]'));
    const stepPanels = Array.from(document.querySelectorAll('[data-listing-step]'));

    let accountSettings = getAccountSettingsByEmail(session.email);
    let activeTier = normalizeAccountTier(accountSettings.accountType);
    let proSubscriptionActive = Boolean(accountSettings.proSubscriptionActive);
    let planCapabilities = accountCapabilities(accountSettings);
    let selectedImageFiles = [];
    let slotObjectUrls = [];
    let currentStep = 1;
    const cityCoordinates = {
      Tunis: { lat: 36.8065, lng: 10.1815 },
      'La Marsa': { lat: 36.8782, lng: 10.3247 },
      Ariana: { lat: 36.8665, lng: 10.1647 },
      Sousse: { lat: 35.8256, lng: 10.6084 },
      Hammamet: { lat: 36.4, lng: 10.6167 },
      Nabeul: { lat: 36.4561, lng: 10.7376 },
      Djerba: { lat: 33.8076, lng: 10.8451 },
      Sfax: { lat: 34.7398, lng: 10.76 }
    };

    function clearSlotObjectUrls() {
      slotObjectUrls.forEach(function (url) {
        try {
          URL.revokeObjectURL(url);
        } catch (err) {
          // Ignore URL cleanup failures.
        }
      });
      slotObjectUrls = [];
    }

    function refreshAccountPlan() {
      accountSettings = getAccountSettingsByEmail(session.email);
      activeTier = normalizeAccountTier(accountSettings.accountType);
      proSubscriptionActive = Boolean(accountSettings.proSubscriptionActive);
      planCapabilities = accountCapabilities(accountSettings);
    }

    function maxPhotoLimit() {
      return planCapabilities.photoLimit;
    }

    function maxVideoLimit() {
      return planCapabilities.videoLimit;
    }

    function maxListingLimit() {
      return planCapabilities.listingLimit;
    }

    function ownedActiveListingsCount() {
      const normalizedEmail = String(session.email || '').toLowerCase();
      return allListingsWithUserData().filter(function (item) {
        return item.source === 'user'
          && String(item.ownerEmail || '').toLowerCase() === normalizedEmail
          && String(item.status || '').toLowerCase() !== 'archived';
      }).length;
    }

    function effectiveListingTier() {
      return planCapabilities.activeTier;
    }

    function clearFeedback() {
      if (!successBox) return;
      successBox.classList.add('hidden');
      successBox.classList.remove('error');
      successBox.textContent = '';
    }

    function showFeedback(message, isError) {
      if (!successBox) return;
      successBox.classList.remove('hidden');
      successBox.classList.toggle('error', Boolean(isError));
      successBox.textContent = message;
    }

    function openPhotoPicker() {
      if (!imagesInput) return;
      imagesInput.value = '';
      imagesInput.click();
    }

    function syncStepUI() {
      stepTabs.forEach(function (tab) {
        const step = Number(tab.getAttribute('data-step-target') || 1);
        const active = step === currentStep;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      stepPanels.forEach(function (panel) {
        const step = Number(panel.getAttribute('data-listing-step') || 1);
        panel.classList.toggle('hidden', step !== currentStep);
      });
    }

    function goToStep(stepNumber) {
      const maxStep = Math.max(1, stepPanels.length || 4);
      currentStep = Math.max(1, Math.min(maxStep, stepNumber));
      syncStepUI();
      const topTarget = document.getElementById('listing-steps-track');
      if (topTarget) {
        topTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function syncStateUI() {
      if (!stateInput || !readyWrap) return;
      const showReady = stateInput.value === 'under-construction';
      readyWrap.classList.toggle('hidden', !showReady);
      if (!showReady && readyDateInput) {
        readyDateInput.value = '';
      }
    }

    function syncCategoryUI() {
      if (!categoryInput || !shortTermWrap) return;
      const isShort = categoryInput.value === 'short';
      shortTermWrap.classList.toggle('hidden', !isShort);
    }

    function setMapCoordinates(lat, lng) {
      if (!latInput || !lngInput || !mapPin) return;
      const clampedLat = Math.max(33.3, Math.min(37.4, Number(lat || 36.8065)));
      const clampedLng = Math.max(8.0, Math.min(11.7, Number(lng || 10.1815)));
      latInput.value = String(clampedLat.toFixed(5));
      lngInput.value = String(clampedLng.toFixed(5));
      const left = ((clampedLng - 8.0) / (11.7 - 8.0)) * 100;
      const top = 100 - ((clampedLat - 33.3) / (37.4 - 33.3)) * 100;
      mapPin.style.left = Math.max(6, Math.min(94, left)) + '%';
      mapPin.style.top = Math.max(8, Math.min(92, top)) + '%';
      mapPin.classList.remove('hidden');
    }

    function syncMapWithCity() {
      if (!cityInput) return;
      const cityKey = String(cityInput.value || '').trim();
      const center = cityCoordinates[cityKey] || cityCoordinates.Tunis;
      setMapCoordinates(center.lat, center.lng);
    }

    const amenityCatalog = [
      { value: 'wifi', label: 'Wifi' },
      { value: 'aircon', label: 'Aircon' },
      { value: 'washer', label: 'Washer' },
      { value: 'dryer', label: 'Dryer' },
      { value: 'kitchen', label: 'Kitchen' },
      { value: 'heating', label: 'Heating' },
      { value: 'parking', label: 'Parking' },
      { value: 'pool', label: 'Pool' },
      { value: 'terrace', label: 'Terrace' },
      { value: 'security', label: 'Security' },
      { value: 'furnished', label: 'Furnished' },
      { value: 'sea view', label: 'Sea view' }
    ];

    function renderAmenityChecklist() {
      if (!amenitiesWrap) return;
      amenitiesWrap.innerHTML = amenityCatalog.map(function (amenity) {
        return [
          '<label class="amenity-check">',
          '  <input type="checkbox" data-amenity-check value="' + escapeHtml(amenity.value) + '" />',
          '  <span>' + escapeHtml(t(amenity.label)) + '</span>',
          '</label>'
        ].join('');
      }).join('');
    }

    function renderImageSlots() {
      if (!slotsWrap) return;
      clearSlotObjectUrls();
      const limit = maxPhotoLimit();
      slotsWrap.innerHTML = '';

      for (let index = 0; index < limit; index += 1) {
        const file = selectedImageFiles[index];
        const slot = document.createElement('div');
        slot.className = 'upload-slot';
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'upload-slot-trigger';
        trigger.setAttribute('aria-label', t('Slot {count}', { count: index + 1 }));
        trigger.addEventListener('click', openPhotoPicker);

        if (file) {
          const previewUrl = URL.createObjectURL(file);
          slotObjectUrls.push(previewUrl);
          const img = document.createElement('img');
          img.className = 'upload-slot-thumb';
          img.alt = t('Uploaded preview');
          img.src = previewUrl;
          trigger.appendChild(img);

          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'upload-slot-remove';
          removeBtn.setAttribute('aria-label', t('Remove photo'));
          removeBtn.textContent = '×';
          removeBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            selectedImageFiles.splice(index, 1);
            renderImageSlots();
            clearFeedback();
          });
          slot.appendChild(removeBtn);
        } else {
          trigger.innerHTML = [
            '<span class="upload-slot-empty">',
            '  <span class="upload-slot-plus">+</span>',
            '  <span>' + escapeHtml(t('Slot {count}', { count: index + 1 })) + '</span>',
            '</span>'
          ].join('');
        }

        slot.appendChild(trigger);
        slotsWrap.appendChild(slot);
      }

      if (addPhotosBtn) {
        addPhotosBtn.textContent = selectedImageFiles.length > 0 ? t('Add more photos') : t('Add photos');
      }
    }

    function syncPlanUI() {
      refreshAccountPlan();
      const photoLimit = maxPhotoLimit();
      const videoLimit = maxVideoLimit();
      const listingLimit = maxListingLimit();
      const tierName = tierPlanName(effectiveListingTier());
      const currentListings = ownedActiveListingsCount();
      if (selectedImageFiles.length > photoLimit) {
        selectedImageFiles = selectedImageFiles.slice(0, photoLimit);
        showFeedback(t('Please remove some photos before switching plan.'), true);
      }
      if (planLimitPill) {
        planLimitPill.textContent = t('Photo limit: {count}', { count: photoLimit });
      }
      if (planVideoPill) {
        planVideoPill.textContent = t('Video limit: {count}', { count: videoLimit });
      }
      if (planListingPill) {
        planListingPill.textContent = t('Listing limit: {count}', { count: listingLimit });
      }
      if (planNote) {
        planNote.textContent = tierName + ' · ' + t('{count} of {limit} active listings used', {
          count: currentListings,
          limit: listingLimit
        }) + (proSubscriptionActive ? (' · ' + t('Pro active')) : '');
      }
      if (verificationNote) {
        const requestedTier = normalizeAccountTier(accountSettings.requestedAccountType || activeTier);
        const status = String(accountSettings.verificationStatus || '').toLowerCase();
        const resolvedTier = effectiveListingTier();
        const pendingAccount = status === 'pending' && requestedTier !== 'individual';
        if (pendingAccount) {
          verificationNote.textContent = t('Agency/promoter verification pending: this listing will publish as Individual until approved.');
          verificationNote.classList.remove('verified');
        } else if (resolvedTier !== 'individual') {
          verificationNote.textContent = t('Account verified for {tier}. Listings publish with this account tag.', {
            tier: tierBadgeLabel(resolvedTier)
          });
          verificationNote.classList.add('verified');
        } else {
          verificationNote.textContent = t('Standard Individual profile. Upgrade to Pro for 16 listings and 2 videos.');
          verificationNote.classList.remove('verified');
        }
      }
      if (accountSummary && session && session.email) {
        accountSummary.textContent = t('Connected as {email}', { email: session.email }) + ' · ' + tierName;
      }
      if (imageHelp) {
        imageHelp.textContent = t('Tap a slot to attach up to {count} photos.', { count: photoLimit });
      }
      if (videoField) {
        videoField.classList.toggle('hidden', videoLimit < 1);
      }
      if (videoUrlField) {
        videoUrlField.classList.toggle('hidden', videoLimit < 1);
      }
      if (videoFieldSecondary) {
        videoFieldSecondary.classList.toggle('hidden', videoLimit < 2);
      }
      if (videoUrlFieldSecondary) {
        videoUrlFieldSecondary.classList.toggle('hidden', videoLimit < 2);
      }
      if (videoInput) {
        videoInput.disabled = videoLimit < 1;
        if (videoLimit < 1) videoInput.value = '';
      }
      if (videoUrlInput) {
        videoUrlInput.disabled = videoLimit < 1;
        if (videoLimit < 1) videoUrlInput.value = '';
      }
      if (videoInputSecondary) {
        videoInputSecondary.disabled = videoLimit < 2;
        if (videoLimit < 2) videoInputSecondary.value = '';
      }
      if (videoUrlInputSecondary) {
        videoUrlInputSecondary.disabled = videoLimit < 2;
        if (videoLimit < 2) videoUrlInputSecondary.value = '';
      }
      renderImageSlots();
      syncVideoPreview();
    }

    function validateStep(stepNumber) {
      const title = String((titleInput && titleInput.value) || '').trim();
      const city = String((cityInput && cityInput.value) || '').trim();
      const address = String((addressInput && addressInput.value) || '').trim();
      const price = Number((priceInput && priceInput.value) || 0);
      const description = String((descriptionInput && descriptionInput.value) || '').trim();
      const rooms = Math.max(1, Number((roomsInput && roomsInput.value) || 0));
      const baths = Math.max(1, Number((bathsInput && bathsInput.value) || 0));
      const surface = Math.max(10, Number((surfaceInput && surfaceInput.value) || 0));
      const contactPhone = normalizePhone((contactPhoneInput && contactPhoneInput.value) || '');

      if (stepNumber === 1) {
        if (!title) {
          showFeedback(t('Listing title is required.'), true);
          return false;
        }
        if (!Number.isFinite(price) || price <= 0) {
          showFeedback(t('Please enter a valid property price.'), true);
          return false;
        }
        if (!description || description.length < 20) {
          showFeedback(t('Please provide a short description (at least 20 characters).'), true);
          return false;
        }
        if (stateInput && stateInput.value === 'under-construction' && !String((readyDateInput && readyDateInput.value) || '').trim()) {
          showFeedback(t('Please add when the property will be ready.'), true);
          return false;
        }
      }

      if (stepNumber === 2) {
        if (!typeInput || !String(typeInput.value || '').trim()) {
          showFeedback(t('Please complete all required listing fields.'), true);
          return false;
        }
        if (rooms < 1 || baths < 1 || surface < 10) {
          showFeedback(t('Please complete all required listing fields.'), true);
          return false;
        }
      }

      if (stepNumber === 3) {
        if (selectedImageFiles.length === 0) {
          showFeedback(t('Please upload at least one photo.'), true);
          return false;
        }
        const requestedVideos = [
          videoInput && videoInput.files && videoInput.files[0],
          videoInputSecondary && videoInputSecondary.files && videoInputSecondary.files[0],
          String((videoUrlInput && videoUrlInput.value) || '').trim(),
          String((videoUrlInputSecondary && videoUrlInputSecondary.value) || '').trim()
        ].filter(Boolean).length;
        if (requestedVideos > maxVideoLimit()) {
          showFeedback(t('Your plan allows {count} video uploads per listing.', { count: maxVideoLimit() }), true);
          return false;
        }
        if (!contactPhone || contactPhone.length < 8) {
          showFeedback(t('Please enter your contact phone number.'), true);
          return false;
        }
      }

      if (stepNumber === 4) {
        if (!city) {
          showFeedback(t('Please select a city.'), true);
          return false;
        }
        if (!address) {
          showFeedback(t('Please complete all required listing fields.'), true);
          return false;
        }
        if (latInput && lngInput && (!latInput.value || !lngInput.value)) {
          syncMapWithCity();
        }
      }

      clearFeedback();
      return true;
    }

    if (planManageLink) {
      planManageLink.href = withLanguageParam('settings.html');
    }
    if (contactPhoneInput && session.phone) {
      contactPhoneInput.value = session.phone;
    }
    if (contactWhatsappInput) {
      contactWhatsappInput.value = accountSettings.whatsapp || session.phone || '';
    }

    if (categoryInput) categoryInput.addEventListener('change', syncCategoryUI);
    if (stateInput) stateInput.addEventListener('change', syncStateUI);
    if (cityInput) cityInput.addEventListener('change', syncMapWithCity);

    stepTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const targetStep = Number(tab.getAttribute('data-step-target') || 1);
        if (targetStep <= currentStep) {
          goToStep(targetStep);
          return;
        }
        for (let step = currentStep; step < targetStep; step += 1) {
          if (!validateStep(step)) return;
        }
        goToStep(targetStep);
      });
    });

    if (mapPicker) {
      mapPicker.addEventListener('click', function (event) {
        const rect = mapPicker.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
        const leftPct = x / rect.width;
        const topPct = y / rect.height;
        const lng = 8.0 + (11.7 - 8.0) * leftPct;
        const lat = 37.4 - ((37.4 - 33.3) * topPct);
        setMapCoordinates(lat, lng);
        clearFeedback();
      });
    }

    form.addEventListener('click', function (event) {
      const nextButton = event.target.closest('[data-listing-next-step]');
      if (nextButton) {
        event.preventDefault();
        if (!validateStep(currentStep)) return;
        goToStep(currentStep + 1);
        return;
      }
      const prevButton = event.target.closest('[data-listing-prev-step]');
      if (prevButton) {
        event.preventDefault();
        goToStep(currentStep - 1);
      }
    });

    if (addPhotosBtn) {
      addPhotosBtn.addEventListener('click', openPhotoPicker);
    }

    if (imagesInput) {
      imagesInput.addEventListener('change', function () {
        const incoming = Array.from(imagesInput.files || []);
        if (!incoming.length) return;
        const limit = maxPhotoLimit();
        const remaining = Math.max(0, limit - selectedImageFiles.length);
        if (remaining === 0) {
          showFeedback(t('Add up to {count} photos.', { count: limit }), true);
          return;
        }
        const accepted = incoming.slice(0, remaining);
        selectedImageFiles = selectedImageFiles.concat(accepted);
        if (incoming.length > remaining) {
          showFeedback(t('Add up to {count} photos.', { count: limit }), true);
        } else {
          clearFeedback();
        }
        renderImageSlots();
      });
    }

    function syncVideoPreview() {
      if (!videoPreview) return;
      videoPreview.innerHTML = '';
      videoPreview.classList.add('hidden');
      if (maxVideoLimit() < 1) return;

      const file = videoInput && videoInput.files && videoInput.files[0];
      const fileSecondary = videoInputSecondary && videoInputSecondary.files && videoInputSecondary.files[0];
      const url = String((videoUrlInput && videoUrlInput.value) || '').trim();
      const urlSecondary = String((videoUrlInputSecondary && videoUrlInputSecondary.value) || '').trim();

      const videos = [file, fileSecondary].filter(Boolean).slice(0, maxVideoLimit());
      const urls = [url, urlSecondary].filter(Boolean).slice(0, Math.max(0, maxVideoLimit() - videos.length));
      if (!videos.length && !urls.length) return;

      videos.forEach(function (item) {
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        video.src = URL.createObjectURL(item);
        const label = document.createElement('p');
        label.className = 'subtle';
        label.textContent = t('Video ready: {name}', { name: item.name });
        videoPreview.appendChild(video);
        videoPreview.appendChild(label);
      });

      urls.forEach(function (entry) {
        const info = document.createElement('p');
        info.className = 'subtle';
        info.textContent = t('Video URL added.');
        const link = document.createElement('a');
        link.href = entry;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = entry;
        videoPreview.appendChild(info);
        videoPreview.appendChild(link);
      });

      videoPreview.classList.remove('hidden');
    }

    if (videoInput) {
      videoInput.addEventListener('change', syncVideoPreview);
    }
    if (videoInputSecondary) {
      videoInputSecondary.addEventListener('change', syncVideoPreview);
    }
    if (videoUrlInput) {
      videoUrlInput.addEventListener('input', syncVideoPreview);
    }
    if (videoUrlInputSecondary) {
      videoUrlInputSecondary.addEventListener('input', syncVideoPreview);
    }

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const maxStep = Math.max(1, stepPanels.length || 4);
      for (let step = 1; step <= maxStep; step += 1) {
        if (!validateStep(step)) {
          goToStep(step);
          return;
        }
      }

      refreshAccountPlan();
      const currentListingCount = ownedActiveListingsCount();
      if (currentListingCount >= maxListingLimit()) {
        showFeedback(t('Your current plan allows {count} active listings.', { count: maxListingLimit() }), true);
        return;
      }

      const title = String((titleInput && titleInput.value) || '').trim();
      const category = String((categoryInput && categoryInput.value) || 'sale').trim();
      const propertyState = String((stateInput && stateInput.value) || 'good').trim();
      const readyBy = String((readyDateInput && readyDateInput.value) || '').trim();
      const type = String((typeInput && typeInput.value) || '').trim();
      const city = String((cityInput && cityInput.value) || '').trim();
      const address = String((addressInput && addressInput.value) || '').trim();
      const price = Number((priceInput && priceInput.value) || 0);
      const rooms = Math.max(1, Number((roomsInput && roomsInput.value) || 0));
      const baths = Math.max(1, Number((bathsInput && bathsInput.value) || 0));
      const surface = Math.max(10, Number((surfaceInput && surfaceInput.value) || 0));
      const description = String((descriptionInput && descriptionInput.value) || '').trim();
      const dates = String((datesInput && datesInput.value) || '').trim();
      const contactPhone = String((contactPhoneInput && contactPhoneInput.value) || '').trim();
      const contactWhatsapp = String((contactWhatsappInput && contactWhatsappInput.value) || '').trim();
      const contactMessage = String((contactMessageInput && contactMessageInput.value) || '').trim();
      const selectedAmenities = Array.from(form.querySelectorAll('[data-amenity-check]:checked')).map(function (input) {
        return String(input.value || '').trim();
      }).filter(Boolean);
      const uploadedFiles = selectedImageFiles.slice(0, maxPhotoLimit());

      const seed = Date.now();
      const mappedImages = uploadedFiles.map(function (_, index) {
        return LOCAL_IMAGE_POOL[(seed + index) % LOCAL_IMAGE_POOL.length];
      });

      const fullLocation = address.toLowerCase().includes(city.toLowerCase()) ? address : (address + ', ' + city);
      const normalizedEmail = String(session.email || '').toLowerCase();
      const tier = effectiveListingTier();
      const listingProfessionalId = tier !== 'individual' ? userProfessionalId(normalizedEmail) : null;
      const ownerName = tier !== 'individual'
        ? (accountSettings.agencyName || accountSettings.name || session.name || t('Professional Account'))
        : ((accountSettings.name || session.name) || t('New Individual Account'));
      const ownerAvatar = accountSettings.avatar
        || (tier !== 'individual'
          ? 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=160&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80');
      const ownerBio = tier !== 'individual'
        ? (accountSettings.bio || t('New professional profile with recently submitted listings.'))
        : '';

      let availability = t('Immediate');
      if (propertyState === 'under-construction') {
        availability = readyBy || t('Under construction');
      } else if (category === 'short') {
        availability = dates || t('Flexible dates');
      }

      const selectedLat = Number((latInput && latInput.value) || 0);
      const selectedLng = Number((lngInput && lngInput.value) || 0);
      const fallbackCenter = cityCoordinates[city] || cityCoordinates.Tunis;
      const resolvedCoordinates = {
        lat: Number.isFinite(selectedLat) && selectedLat > 0 ? selectedLat : fallbackCenter.lat,
        lng: Number.isFinite(selectedLng) && selectedLng > 0 ? selectedLng : fallbackCenter.lng
      };
      const selectedVideos = [
        String((videoUrlInput && videoUrlInput.value) || '').trim(),
        String((videoUrlInputSecondary && videoUrlInputSecondary.value) || '').trim()
      ].filter(Boolean).slice(0, maxVideoLimit());
      const primaryVideoUrl = selectedVideos[0] || '';
      const secondaryVideoUrl = selectedVideos[1] || '';
      const videoUrls = selectedVideos.slice();
      const verificationDocumentName = verificationDocInput && verificationDocInput.files && verificationDocInput.files[0]
        ? String(verificationDocInput.files[0].name || '').trim()
        : '';

      const newEntry = {
        id: 'user-' + Date.now(),
        title: title,
        location: fullLocation,
        category: category,
        type: type,
        price: price,
        rooms: rooms,
        baths: baths,
        surface: surface,
        verified: false,
        professionalId: listingProfessionalId,
        isPromoted: Boolean(accountSettings.proSubscriptionActive),
        ownerTier: tier,
        accountType: tier,
        ownerName: ownerName,
        ownerEmail: normalizedEmail,
        ownerAvatar: ownerAvatar,
        ownerBio: ownerBio,
        ownerPhone: contactPhone,
        ownerWhatsapp: contactWhatsapp,
        contactPhone: contactPhone,
        contactWhatsapp: contactWhatsapp,
        contactMessage: contactMessage,
        propertyState: propertyState,
        readyDate: readyBy,
        availability: availability,
        description: description,
        amenities: selectedAmenities.length ? selectedAmenities : [t('User-submitted listing'), t('Pending verification')],
        images: mappedImages.length ? mappedImages : ['assets/listing-9.jpg'],
        videoUrl: primaryVideoUrl,
        secondaryVideoUrl: secondaryVideoUrl,
        videoUrls: videoUrls,
        hasVideo: Boolean(
          (maxVideoLimit() >= 1 && videoInput && videoInput.files && videoInput.files[0]) ||
          (maxVideoLimit() >= 2 && videoInputSecondary && videoInputSecondary.files && videoInputSecondary.files[0]) ||
          videoUrls.length
        ),
        status: 'pending',
        verificationDocument: verificationDocumentName,
        source: 'user',
        coordinates: resolvedCoordinates
      };
      newEntry.priceLabel = buildListingPriceLabel(newEntry);

      const key = data.STORAGE_KEYS.listedProperties;
      const existing = readStorage(key, []);
      existing.unshift(newEntry);
      writeStorage(key, existing.slice(0, 60));

      showFeedback(t('Property submitted successfully. Redirecting you to My Listings dashboard...'), false);
      form.reset();
      selectedImageFiles = [];
      clearSlotObjectUrls();
      if (videoPreview) {
        videoPreview.innerHTML = '';
        videoPreview.classList.add('hidden');
      }
      renderAmenityChecklist();
      syncPlanUI();
      syncCategoryUI();
      syncStateUI();
      goToStep(1);
      syncMapWithCity();
      if (contactPhoneInput && session.phone) {
        contactPhoneInput.value = session.phone;
      }
      if (contactWhatsappInput && session.phone) {
        contactWhatsappInput.value = session.phone;
      }

      window.setTimeout(function () {
        window.location.href = withLanguageParam('dashboard.html');
      }, 1200);
    });

    renderAmenityChecklist();
    syncPlanUI();
    syncCategoryUI();
    syncStateUI();
    syncMapWithCity();
    syncStepUI();
  }

  function initDashboardPage() {
    const modeTabs = document.querySelectorAll('[data-dashboard-mode]');
    const kpiWrap = document.getElementById('dashboard-kpis');
    const listWrap = document.getElementById('dashboard-listings');
    const listTitle = document.getElementById('dashboard-list-title');
    const profPanel = document.getElementById('dashboard-prof-panel');
    const insightsWrap = document.getElementById('dashboard-insights');
    if (!modeTabs.length || !kpiWrap || !listWrap || !insightsWrap) return;

    const all = allListingsWithUserData();
    const session = getAuthSession();
    const account = session ? getAccountSettingsByEmail(session.email) : null;
    const capabilities = accountCapabilities(account || {});
    const proUnlocked = Boolean(account && (capabilities.isProfessional || capabilities.proActive));
    const proModeTab = document.querySelector('[data-dashboard-mode="professional"]');
    let mode = 'individual';

    if (proModeTab) {
      proModeTab.textContent = t('Professional / Pro');
      if (!proUnlocked) {
        proModeTab.classList.add('disabled');
        proModeTab.setAttribute('aria-disabled', 'true');
      }
    }

    function statusCode(value) {
      const raw = String(value || '').toLowerCase();
      if (raw.includes('active')) return 'active';
      if (raw.includes('pending') || raw.includes('attente')) return 'pending';
      return 'pending';
    }

    function currentUserListings() {
      const normalizedEmail = String((session && session.email) || '').toLowerCase();
      return all.filter(function (item) {
        return String(item.ownerEmail || '').toLowerCase() === normalizedEmail;
      });
    }

    function kpi(title, value, note) {
      return [
        '<article class="kpi dashboard-kpi-large">',
        '  <span class="subtle">' + escapeHtml(title) + '</span>',
        '  <b>' + escapeHtml(String(value)) + '</b>',
        note ? ('  <small>' + escapeHtml(note) + '</small>') : '',
        '</article>'
      ].join('');
    }

    function insightCard(title, body, items) {
      return [
        '<article class="form-card dashboard-insight-card">',
        '  <h3 class="section-title">' + escapeHtml(title) + '</h3>',
        '  <p class="subtle">' + escapeHtml(body) + '</p>',
        Array.isArray(items) && items.length ? (
          '  <div class="dashboard-insight-list">' + items.map(function (item) {
            return '<span class="chip">' + escapeHtml(item) + '</span>';
          }).join('') + '</div>'
        ) : '',
        '</article>'
      ].join('');
    }

    modeTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const requestedMode = tab.getAttribute('data-dashboard-mode');
        if (requestedMode === 'professional' && !proUnlocked) {
          window.location.href = withLanguageParam('settings.html');
          return;
        }
        modeTabs.forEach(function (t) {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        mode = requestedMode;
        render();
      });
    });

    render();

    function render() {
      if (mode === 'professional' && !proUnlocked) {
        mode = 'individual';
      }
      const ownedListings = currentUserListings();
      const individualListings = ownedListings.filter(function (item) {
        return normalizeAccountTier(item.ownerTier || item.accountType) === 'individual';
      });
      const professionalListings = ownedListings.filter(function (item) {
        return normalizeAccountTier(item.ownerTier || item.accountType) !== 'individual';
      });
      const listingPool = mode === 'professional' ? professionalListings : individualListings;
      const activeCount = listingPool.filter(function (item) {
        return statusCode(item.status || '') === 'active';
      }).length;
      const pendingCount = listingPool.filter(function (item) {
        return statusCode(item.status || '') !== 'active';
      }).length;
      const boostMultiplier = mode === 'professional' ? 1.7 : 1;
      const impressions = Math.round((listingPool.length * 920 + 2400) * boostMultiplier);
      const leads = Math.round((listingPool.length * 8 + 18) * boostMultiplier);
      const saved = Math.round((listingPool.length * 17 + 30) * boostMultiplier);
      const availabilityNote = t('{count} of {limit} active listings used', {
        count: ownedListings.length,
        limit: capabilities.listingLimit
      });

      if (mode === 'individual') {
        listTitle.textContent = t('Individual listings');
        if (profPanel) profPanel.classList.remove('hidden');

        kpiWrap.innerHTML = [
          kpi(t('Active listings'), activeCount, availabilityNote),
          kpi(t('Pending verification'), pendingCount, t('Ownership and post checks')),
          kpi(t('Lead requests'), leads, t('Calls, WhatsApp, and messages')),
          kpi(t('Saved by users'), saved, t('People monitoring this listing'))
        ].join('');

        insightsWrap.innerHTML = [
          insightCard(t('Current plan limits'), t('Your upload rules are now enforced from profile settings.'), [
            t('12 photos per listing'),
            t('0 video on Standard Individual'),
            t('2 active listings'),
            capabilities.proActive ? t('Pro active: 16 listings and 2 videos') : t('Upgrade to Pro for 16 listings and 2 videos')
          ]),
          insightCard(t('Performance snapshot'), t('A simplified read on how buyers are interacting with your listings.'), [
            t('{count} monthly impressions', { count: money(impressions) }),
            t('{count} saved by users', { count: saved }),
            t('{count} lead requests', { count: leads })
          ])
        ].join('');

        listWrap.innerHTML = individualListings.length ? individualListings.map(function (item) {
          return dashboardListing(item, item.status || (item.verified ? 'active' : 'pending'), false);
        }).join('') : emptyMessage(t('No individual listings yet.'));

        if (profPanel) {
          profPanel.innerHTML = [
            '<div class="form-card dashboard-pro-shell">',
            premiumDescriptionMarkup({ href: 'pro-upgrade.html', label: t('View Pro plan') }),
            '</div>'
          ].join('');
        }
      }

      if (mode === 'professional') {
        listTitle.textContent = t('Professional listings');
        if (profPanel) profPanel.classList.remove('hidden');

        kpiWrap.innerHTML = [
          kpi(t('Total listings'), professionalListings.length, availabilityNote),
          kpi(t('Active campaigns'), Math.max(1, Math.min(6, professionalListings.length)), t('Highlighted inventory')),
          kpi(t('Monthly impressions'), money(impressions), t('Across your professional profile')),
          kpi(t('Client leads'), leads, t('Calls, WhatsApp, and messages'))
        ].join('');

        insightsWrap.innerHTML = [
          insightCard(t('Professional capacity'), t('Verified Agency and Promoter profiles can publish more inventory.'), [
            t('12 photos per listing'),
            t('1 video on Standard professional plans'),
            t('6 active listings'),
            capabilities.proActive ? t('Pro active: 16 listings and 2 videos') : t('Upgrade to Pro for 16 listings and 2 videos')
          ]),
          insightCard(t('Pro visibility'), t('Use the same Premium tools shown on the homepage and upgrade flow.'), [
            t('{count} professional listings live', { count: professionalListings.length }),
            t('{count} lead requests', { count: leads }),
            t('{count} saved by users', { count: saved })
          ])
        ].join('');

        listWrap.innerHTML = professionalListings.length ? professionalListings.map(function (item, index) {
          return dashboardListing(item, item.status || 'active', index < 3);
        }).join('') : emptyMessage(t('No professional listings found.'));

        if (profPanel) {
          profPanel.innerHTML = [
            '<div class="form-card dashboard-pro-shell">',
            premiumDescriptionMarkup({ href: 'pro-upgrade.html', label: capabilities.proActive ? t('Manage Pro') : t('Activate Pro') }),
            '<div class="button-row" style="margin-top: 12px">',
            '  <a class="btn light" href="' + withLanguageParam('settings.html') + '">' + escapeHtml(t('Open settings')) + '</a>',
            '  <a class="btn ghost" href="' + withLanguageParam('profile.html') + '">' + escapeHtml(t('Open profile')) + '</a>',
            '</div>',
            '</div>'
          ].join('');
        }
      }
    }

    function dashboardListing(item, status, featured) {
      const code = statusCode(status);
      const statusClass = code === 'active' ? 'verified' : '';
      const normalizedStatus = code === 'active' ? t('active') : t('Pending verification');
      return [
        '<article class="card">',
        '  <img class="card-media" src="' + listingImage(item, 0) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" />',
        '  <div class="card-body">',
        '    <div class="meta-row"><strong>' + escapeHtml(item.title) + '</strong><span class="badge ' + statusClass + '">' + escapeHtml(normalizedStatus) + '</span></div>',
        '    <p class="loc">' + escapeHtml(item.location) + '</p>',
        '    <div class="specs">',
        featured ? '      <span class="spec">' + escapeHtml(t('Featured/Sponsored')) + '</span>' : '',
        '      <span class="spec">' + escapeHtml(t('Leads: {count}', { count: Math.floor(Math.random() * 80 + 10) })) + '</span>',
        '      <span class="spec">' + escapeHtml(t('Saves: {count}', { count: Math.floor(Math.random() * 200 + 12) })) + '</span>',
        '    </div>',
        '  </div>',
        '</article>'
      ].join('');
    }
  }

  function initAdminPage() {
    if (getPage() !== 'admin') return;
    if (!isAuthenticated()) {
      window.location.href = authLoginHref('admin.html');
      return;
    }
    if (!isAdminSession()) {
      window.location.href = withLanguageParam('dashboard.html');
      return;
    }

    const tabButtons = Array.from(document.querySelectorAll('[data-admin-tab]'));
    const tabPanels = Array.from(document.querySelectorAll('[data-admin-panel]'));
    const kpiWrap = document.getElementById('admin-kpis');
    const chartWrap = document.getElementById('admin-chart');
    const premiumSpotlight = document.getElementById('admin-premium-spotlight');
    const adsForm = document.getElementById('admin-ads-form');
    const adsGrid = document.getElementById('admin-ads-grid');
    const queueWrap = document.getElementById('admin-profile-queue');
    const profileForm = document.getElementById('admin-profile-form');
    const profilesList = document.getElementById('admin-profiles-list');
    const listingsWrap = document.getElementById('admin-listings');
    const adminUserForm = document.getElementById('admin-user-form');
    const adminUsersList = document.getElementById('admin-users-list');
    const session = getAuthSession();
    if (!kpiWrap || !chartWrap || !premiumSpotlight || !adsForm || !adsGrid || !queueWrap || !profileForm || !profilesList || !listingsWrap || !adminUserForm || !adminUsersList) return;

    function setAdminTab(tabKey) {
      const requestedKey = String(tabKey || 'overview');
      const known = tabButtons.map(function (button) {
        return button.getAttribute('data-admin-tab');
      }).filter(Boolean);
      const safeKey = known.includes(requestedKey) ? requestedKey : 'overview';
      tabButtons.forEach(function (button) {
        const active = button.getAttribute('data-admin-tab') === safeKey;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', active ? 'true' : 'false');
        button.setAttribute('tabindex', active ? '0' : '-1');
      });
      tabPanels.forEach(function (panel) {
        const active = panel.getAttribute('data-admin-panel') === safeKey;
        panel.classList.toggle('hidden', !active);
        panel.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', safeKey);
        window.history.replaceState(null, '', url.toString());
      } catch (err) {
        // Ignore URL state update failures.
      }
      return safeKey;
    }

    tabButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const target = button.getAttribute('data-admin-tab');
        setAdminTab(target);
      });
      button.addEventListener('keydown', function (event) {
        const key = event.key;
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;
        event.preventDefault();
        if (!tabButtons.length) return;
        const currentIndex = tabButtons.indexOf(button);
        const offset = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0;
        const targetIndex = key === 'Home'
          ? 0
          : key === 'End'
            ? tabButtons.length - 1
            : (currentIndex + offset + tabButtons.length) % tabButtons.length;
        const nextButton = tabButtons[targetIndex];
        if (!nextButton) return;
        const tabKey = nextButton.getAttribute('data-admin-tab');
        setAdminTab(tabKey);
        nextButton.focus();
      });
    });

    function verificationTarget(settings) {
      const requested = normalizeAccountTier(settings.requestedAccountType);
      if (requested !== 'individual') return requested;
      const currentTier = normalizeAccountTier(settings.accountType);
      if (currentTier !== 'individual' && String(settings.verificationStatus || '').toLowerCase() !== 'verified') {
        return currentTier;
      }
      return 'individual';
    }

    function readQueue() {
      return profileSettingsEntries().map(function (entry) {
        const settings = entry.settings || {};
        return {
          email: entry.email,
          settings: settings,
          target: verificationTarget(settings),
          status: String(settings.verificationStatus || '').toLowerCase()
        };
      }).filter(function (row) {
        return row.status === 'pending' && row.target !== 'individual';
      });
    }

    function adminKpi(label, value) {
      return '<article class="kpi"><span class="subtle">' + escapeHtml(label) + '</span><b>' + escapeHtml(String(value)) + '</b></article>';
    }

    function bar(label, count, maxValue) {
      const width = Math.max(Math.round((count / Math.max(maxValue, 1)) * 100), 6);
      return [
        '<article class="admin-bar">',
        '  <div class="admin-bar-head"><strong>' + escapeHtml(label) + '</strong><span>' + count + '</span></div>',
        '  <div class="admin-track"><span style="width:' + width + '%"></span></div>',
        '</article>'
      ].join('');
    }

    function tierBadge(tier, status) {
      const normalizedTier = normalizeAccountTier(tier);
      const classes = ['badge'];
      if (normalizedTier === 'agency' || normalizedTier === 'promoter') classes.push(normalizedTier);
      if (String(status || '').toLowerCase() === 'verified') classes.push('verified');
      return '<span class="' + classes.join(' ') + '">' + escapeHtml(tierBadgeLabel(normalizedTier)) + '</span>';
    }

    function renderAdsSection() {
      const ads = adminStateStore().ads;
      const slots = [
        { key: 'home', label: t('Home banner') },
        { key: 'search', label: t('Search banner') },
        { key: 'property', label: t('Listing details banner') }
      ];
      adsGrid.innerHTML = slots.map(function (slot) {
        const current = ads[slot.key];
        return [
          '<article class="admin-ad-card">',
          '  <h4>' + escapeHtml(slot.label) + '</h4>',
          '  <div class="form-grid two-col">',
          '    <div class="field"><label>' + escapeHtml(t('Badge')) + '</label><input class="input" data-admin-ad-field="' + slot.key + '" data-admin-ad-prop="chip" type="text" value="' + escapeHtml(current.chip) + '" /></div>',
          '    <div class="field"><label>' + escapeHtml(t('CTA label')) + '</label><input class="input" data-admin-ad-field="' + slot.key + '" data-admin-ad-prop="cta" type="text" value="' + escapeHtml(current.cta) + '" /></div>',
          '    <div class="field"><label>' + escapeHtml(t('Title')) + '</label><input class="input" data-admin-ad-field="' + slot.key + '" data-admin-ad-prop="title" type="text" value="' + escapeHtml(current.title) + '" /></div>',
          '    <div class="field"><label>' + escapeHtml(t('CTA link')) + '</label><input class="input" data-admin-ad-field="' + slot.key + '" data-admin-ad-prop="href" type="text" value="' + escapeHtml(current.href) + '" /></div>',
          '    <div class="field"><label>' + escapeHtml(t('Image path')) + '</label><input class="input" data-admin-ad-field="' + slot.key + '" data-admin-ad-prop="image" type="text" value="' + escapeHtml(current.image || '') + '" /></div>',
          '    <div class="field"><label>' + escapeHtml(t('Phone number')) + '</label><input class="input" data-admin-ad-field="' + slot.key + '" data-admin-ad-prop="phone" type="text" value="' + escapeHtml(current.phone || '') + '" /></div>',
          '  </div>',
          '  <div class="field">',
          '    <label>' + escapeHtml(t('Description')) + '</label>',
          '    <textarea class="textarea" data-admin-ad-field="' + slot.key + '" data-admin-ad-prop="body">' + escapeHtml(current.body) + '</textarea>',
          '  </div>',
          '  <div class="admin-ad-preview">',
          '    <a class="ad-media-link" href="' + escapeHtml(withLanguageParam(current.href)) + '"><img class="ad-media-image" src="' + escapeHtml(current.image || '') + '" alt="' + escapeHtml(current.title) + '" loading="lazy" /></a>',
          '    <div><strong>' + escapeHtml(current.title) + '</strong><p>' + escapeHtml(current.body) + '</p><span class="ad-phone">' + escapeHtml(current.phone || '') + '</span></div>',
          '  </div>',
          '</article>'
        ].join('');
      }).join('');
    }

    function renderVerificationQueue() {
      const rows = readQueue();
      if (!rows.length) {
        queueWrap.innerHTML = emptyMessage(t('No pending profile verification requests.'));
        return;
      }
      queueWrap.innerHTML = [
        '<div class="admin-table">',
        '  <div class="admin-table-head admin-table-row">',
        '    <span>' + escapeHtml(t('Profile')) + '</span><span>' + escapeHtml(t('Requested account tag')) + '</span><span>' + escapeHtml(t('Verification document')) + '</span><span>' + escapeHtml(t('Actions')) + '</span>',
        '  </div>',
        rows.map(function (row) {
          const requestedAt = row.settings.verificationRequestedAt
            ? new Date(Number(row.settings.verificationRequestedAt)).toLocaleDateString()
            : '-';
          return [
            '<div class="admin-table-row">',
            '  <span><strong>' + escapeHtml(row.settings.name || row.email) + '</strong><small>' + escapeHtml(row.email) + '</small><small>' + escapeHtml(t('Requested')) + ': ' + escapeHtml(requestedAt) + '</small></span>',
            '  <span>' + tierBadge(row.target, row.status) + '</span>',
            '  <span>' + escapeHtml(row.settings.verificationDocument || t('No document')) + '</span>',
            '  <span class="admin-actions">',
            '    <button type="button" class="btn mini" data-admin-verify-action="approve" data-admin-email="' + escapeHtml(row.email) + '">' + escapeHtml(t('Approve')) + '</button>',
            '    <button type="button" class="btn light mini" data-admin-verify-action="reject" data-admin-email="' + escapeHtml(row.email) + '">' + escapeHtml(t('Reject')) + '</button>',
            '  </span>',
            '</div>'
          ].join('');
        }).join(''),
        '</div>'
      ].join('');
    }

    function renderProfilesList() {
      const rows = profileSettingsEntries().filter(function (entry) {
        const tier = normalizeAccountTier(entry.settings.accountType);
        return tier !== 'individual';
      });
      if (!rows.length) {
        profilesList.innerHTML = '<h4>' + escapeHtml(t('Existing verified profiles')) + '</h4>' + emptyMessage(t('No agency/promoter profiles yet.'));
        return;
      }
      profilesList.innerHTML = [
        '<h4>' + escapeHtml(t('Existing verified profiles')) + '</h4>',
        '<div class="admin-profile-list">',
        rows.map(function (row) {
          const settings = row.settings;
          const tier = normalizeAccountTier(settings.accountType);
          return [
            '<article class="admin-profile-item">',
            '  <div>',
            '    <strong>' + escapeHtml(settings.agencyName || settings.name || row.email) + '</strong>',
            '    <small>' + escapeHtml(row.email) + '</small>',
            '  </div>',
            '  <div class="admin-actions">',
            '    ' + tierBadge(tier, settings.verificationStatus),
            '    <button type="button" class="btn light mini" data-admin-profile-action="load" data-admin-email="' + escapeHtml(row.email) + '">' + escapeHtml(t('Edit')) + '</button>',
            '    <button type="button" class="btn mini danger" data-admin-profile-action="delete" data-admin-email="' + escapeHtml(row.email) + '">' + escapeHtml(t('Delete')) + '</button>',
            '  </div>',
            '</article>'
          ].join('');
        }).join(''),
        '</div>'
      ].join('');
    }

    function upsertAuthUser(email, name, password) {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      if (!normalizedEmail) return;
      const users = readStorage(AUTH_USERS_STORAGE_KEY, []);
      const list = Array.isArray(users) ? users.slice() : [];
      const index = list.findIndex(function (user) {
        return String(user && user.email || '').toLowerCase() === normalizedEmail;
      });
      const currentUser = index >= 0 ? list[index] : {};
      const nextUser = Object.assign({}, currentUser, {
        name: String(name || currentUser.name || normalizedEmail.split('@')[0]).trim(),
        email: normalizedEmail,
        phone: String(currentUser.phone || '').trim(),
        role: 'admin',
        password: String(password || currentUser.password || '').trim(),
        createdAt: Number(currentUser.createdAt || Date.now())
      });
      if (index >= 0) {
        list[index] = nextUser;
      } else {
        list.unshift(nextUser);
      }
      writeStorage(AUTH_USERS_STORAGE_KEY, list.slice(0, 100));
    }

    function renderAdminUsersList() {
      const store = adminAccountsStore();
      const rows = Object.keys(store).map(function (email) {
        const entry = store[email] || {};
        return {
          email: email,
          name: entry.name || email,
          role: String(entry.role || 'admin'),
          status: String(entry.status || 'active'),
          createdAt: Number(entry.createdAt || 0),
          createdBy: String(entry.createdBy || 'system')
        };
      }).sort(function (a, b) {
        return Number(b.createdAt || 0) - Number(a.createdAt || 0);
      });

      if (!rows.length) {
        adminUsersList.innerHTML = '<h4>' + escapeHtml(t('Admin accounts')) + '</h4>' + emptyMessage(t('No admin profiles yet.'));
        return;
      }

      adminUsersList.innerHTML = [
        '<h4>' + escapeHtml(t('Admin accounts')) + '</h4>',
        '<div class="admin-profile-list">',
        rows.map(function (row) {
          const isActive = row.status !== 'disabled';
          return [
            '<article class="admin-profile-item">',
            '  <div>',
            '    <strong>' + escapeHtml(row.name) + '</strong>',
            '    <small>' + escapeHtml(row.email) + '</small>',
            '    <small>' + escapeHtml(t('Created by')) + ': ' + escapeHtml(row.createdBy) + '</small>',
            '  </div>',
            '  <div class="admin-actions">',
            '    <span class="badge ' + (isActive ? 'verified' : 'error') + '">' + escapeHtml(isActive ? t('Active') : t('Disabled')) + '</span>',
            '    <span class="badge">' + escapeHtml(row.role) + '</span>',
            '    <button type="button" class="btn light mini" data-admin-user-action="load" data-admin-user-email="' + escapeHtml(row.email) + '">' + escapeHtml(t('Edit')) + '</button>',
            '    <button type="button" class="btn light mini" data-admin-user-action="toggle" data-admin-user-email="' + escapeHtml(row.email) + '">' + escapeHtml(isActive ? t('Disable') : t('Enable')) + '</button>',
            '    <button type="button" class="btn mini danger" data-admin-user-action="delete" data-admin-user-email="' + escapeHtml(row.email) + '">' + escapeHtml(t('Delete')) + '</button>',
            '  </div>',
            '</article>'
          ].join('');
        }).join(''),
        '</div>'
      ].join('');
    }

    function renderListingsModeration() {
      const all = allListingsWithUserData();
      const sorted = all.slice().sort(function (a, b) {
        return Number(b.createdAt || 0) - Number(a.createdAt || 0);
      });
      if (!sorted.length) {
        listingsWrap.innerHTML = emptyMessage(t('No listings available.'));
        return;
      }
      listingsWrap.innerHTML = [
        '<div class="admin-table">',
        '  <div class="admin-table-head admin-table-row">',
        '    <span>' + escapeHtml(t('Listing')) + '</span><span>' + escapeHtml(t('Status')) + '</span><span>' + escapeHtml(t('Ownership')) + '</span><span>' + escapeHtml(t('Actions')) + '</span>',
        '  </div>',
        sorted.map(function (item) {
          const isUserListing = item.source === 'user';
          const status = String(item.status || '').toLowerCase();
          const live = Boolean(item.verified) || status === 'active';
          const ownership = String(item.ownershipStatus || '').toLowerCase() || (item.verificationDocument ? 'requested' : 'missing');
          return [
            '<div class="admin-table-row">',
            '  <span><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(item.location) + '</small><small>' + escapeHtml(item.id) + '</small></span>',
            '  <span>' + (live ? '<span class="badge verified">Verified</span>' : '<span class="badge">Pending</span>') + '</span>',
            '  <span>' + escapeHtml(ownership || '-') + '</span>',
            '  <span class="admin-actions">',
            isUserListing ? '    <button type="button" class="btn light mini" data-admin-listing-action="verify-ownership" data-admin-listing-id="' + escapeHtml(item.id) + '">' + escapeHtml(t('Verify ownership')) + '</button>' : '',
            isUserListing ? '    <button type="button" class="btn light mini" data-admin-listing-action="verify-post" data-admin-listing-id="' + escapeHtml(item.id) + '">' + escapeHtml(t('Verify post')) + '</button>' : '',
            isUserListing ? '    <button type="button" class="btn mini" data-admin-listing-action="publish" data-admin-listing-id="' + escapeHtml(item.id) + '">' + escapeHtml(t('Mark verified')) + '</button>' : '',
            '    <button type="button" class="btn mini danger" data-admin-listing-action="delete" data-admin-listing-id="' + escapeHtml(item.id) + '" data-admin-listing-source="' + escapeHtml(String(item.source || 'seed')) + '">' + escapeHtml(t('Delete')) + '</button>',
            '  </span>',
            '</div>'
          ].join('');
        }).join(''),
        '</div>'
      ].join('');
    }

    function renderKpis() {
      const all = allListingsWithUserData();
      const saleCount = all.filter(function (item) { return item.category === 'sale'; }).length;
      const longCount = all.filter(function (item) { return item.category === 'long'; }).length;
      const shortCount = all.filter(function (item) { return item.category === 'short'; }).length;
      const proCount = all.filter(function (item) { return Boolean(item.professionalId); }).length;
      const verifiedCount = all.filter(function (item) { return Boolean(item.verified); }).length;
      const pendingProfileCount = readQueue().length;

      kpiWrap.innerHTML = [
        adminKpi(t('Total listings'), all.length),
        adminKpi(t('Professional listings'), proCount),
        adminKpi(t('Verified listings'), verifiedCount),
        adminKpi(t('Pending profile verification'), pendingProfileCount),
        adminKpi(t('Est. monthly GMV'), money(all.reduce(function (sum, item) { return sum + Number(item.price || 0); }, 0)))
      ].join('');

      const max = Math.max(saleCount, longCount, shortCount, 1);
      chartWrap.innerHTML = [
        '<div class="admin-bars">',
        bar(t('For Sale'), saleCount, max),
        bar(t('Rent Long'), longCount, max),
        bar(t('Rent Short'), shortCount, max),
        '</div>'
      ].join('');

      premiumSpotlight.innerHTML = [
        premiumDescriptionMarkup({ href: 'pro-upgrade.html', label: t('Open Pro plan') }),
        '<div class="notice">' + escapeHtml(t('Use the same Premium copy here to keep admin, profile, and upgrade flows aligned.')) + '</div>'
      ].join('');
    }

    function rerender() {
      renderKpis();
      renderAdsSection();
      renderVerificationQueue();
      renderProfilesList();
      renderAdminUsersList();
      renderListingsModeration();
    }

    adsForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const current = adminStateStore();
      const next = Object.assign({}, current, {
        ads: Object.assign({}, current.ads)
      });
      ['home', 'search', 'property'].forEach(function (slot) {
        next.ads[slot] = Object.assign({}, next.ads[slot] || {});
        ['chip', 'title', 'body', 'cta', 'href', 'image', 'phone'].forEach(function (prop) {
          const node = adsForm.querySelector('[data-admin-ad-field="' + slot + '"][data-admin-ad-prop="' + prop + '"]');
          if (!node) return;
          const value = String(node.value || '').trim();
          if (value) next.ads[slot][prop] = value;
        });
      });
      writeAdminState(next);
      rerender();
    });

    queueWrap.addEventListener('click', function (event) {
      const button = event.target.closest('[data-admin-verify-action]');
      if (!button) return;
      const email = String(button.getAttribute('data-admin-email') || '').trim().toLowerCase();
      const action = String(button.getAttribute('data-admin-verify-action') || '').trim().toLowerCase();
      if (!email || !action) return;
      const current = getAccountSettingsByEmail(email);
      const targetTier = verificationTarget(current);
      if (action === 'approve') {
        updateAccountSettings(email, {
          accountType: targetTier,
          requestedAccountType: '',
          verificationStatus: 'verified',
          verificationRequestedAt: 0
        });
      }
      if (action === 'reject') {
        updateAccountSettings(email, {
          accountType: 'individual',
          requestedAccountType: '',
          verificationStatus: 'rejected',
          verificationRequestedAt: 0
        });
      }
      rerender();
    });

    profileForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = String((document.getElementById('admin-profile-email') || {}).value || '').trim().toLowerCase();
      const tier = normalizeAccountTier(String((document.getElementById('admin-profile-type') || {}).value || 'agency'));
      const name = String((document.getElementById('admin-profile-name') || {}).value || '').trim();
      if (!email || !name) return;
      updateAccountSettings(email, {
        name: name,
        agencyName: name,
        phone: String((document.getElementById('admin-profile-phone') || {}).value || '').trim(),
        whatsapp: String((document.getElementById('admin-profile-whatsapp') || {}).value || '').trim(),
        avatar: String((document.getElementById('admin-profile-avatar') || {}).value || '').trim(),
        cover: String((document.getElementById('admin-profile-cover') || {}).value || '').trim(),
        website: String((document.getElementById('admin-profile-website') || {}).value || '').trim(),
        instagram: String((document.getElementById('admin-profile-instagram') || {}).value || '').trim(),
        facebook: String((document.getElementById('admin-profile-facebook') || {}).value || '').trim(),
        bio: String((document.getElementById('admin-profile-bio') || {}).value || '').trim(),
        accountType: tier === 'promoter' ? 'promoter' : 'agency',
        requestedAccountType: '',
        verificationStatus: 'verified',
        verificationRequestedAt: 0
      });
      rerender();
    });

    profilesList.addEventListener('click', function (event) {
      const button = event.target.closest('[data-admin-profile-action]');
      if (!button) return;
      const email = String(button.getAttribute('data-admin-email') || '').trim().toLowerCase();
      const action = String(button.getAttribute('data-admin-profile-action') || '').trim().toLowerCase();
      if (!email || !action) return;
      const store = profileSettingsStore();
      if (action === 'delete') {
        delete store[email];
        writeStorage(PROFILE_SETTINGS_STORAGE_KEY, store);
        rerender();
        return;
      }
      if (action === 'load') {
        const current = getAccountSettingsByEmail(email);
        const setValue = function (id, value) {
          const node = document.getElementById(id);
          if (node) node.value = value;
        };
        setValue('admin-profile-email', email);
        setValue('admin-profile-type', normalizeAccountTier(current.accountType) === 'promoter' ? 'promoter' : 'agency');
        setValue('admin-profile-name', current.agencyName || current.name || '');
        setValue('admin-profile-phone', current.phone || '');
        setValue('admin-profile-whatsapp', current.whatsapp || '');
        setValue('admin-profile-avatar', current.avatar || '');
        setValue('admin-profile-cover', current.cover || '');
        setValue('admin-profile-website', current.website || '');
        setValue('admin-profile-instagram', current.instagram || '');
        setValue('admin-profile-facebook', current.facebook || '');
        setValue('admin-profile-bio', current.bio || '');
      }
    });

    adminUserForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = String((document.getElementById('admin-user-name') || {}).value || '').trim();
      const email = String((document.getElementById('admin-user-email') || {}).value || '').trim().toLowerCase();
      const password = String((document.getElementById('admin-user-password') || {}).value || '').trim();
      const role = String((document.getElementById('admin-user-role') || {}).value || 'admin').trim() || 'admin';
      if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) return;

      upsertAuthUser(email, name, password);
      const admins = adminAccountsStore();
      const currentAdmin = admins[email] || {};
      admins[email] = Object.assign({}, currentAdmin, {
        email: email,
        name: name,
        role: role,
        status: 'active',
        createdAt: Number(currentAdmin.createdAt || Date.now()),
        createdBy: String((session && session.email) || 'admin')
      });
      writeAdminAccountsStore(admins);

      const profiles = profileSettingsStore();
      if (!profiles[email]) {
        profiles[email] = {
          name: name,
          phone: '',
          whatsapp: '',
          avatar: '',
          cover: '',
          bio: '',
          agencyName: name,
          accountType: 'individual',
          requestedAccountType: '',
          verificationStatus: 'not-required',
          verificationDocument: '',
          verificationRequestedAt: 0,
          website: '',
          instagram: '',
          facebook: '',
          linkedin: '',
          proSubscriptionActive: false
        };
        writeStorage(PROFILE_SETTINGS_STORAGE_KEY, profiles);
      }

      rerender();
      adminUserForm.reset();
      const roleSelect = document.getElementById('admin-user-role');
      if (roleSelect) roleSelect.value = 'admin';
    });

    adminUsersList.addEventListener('click', function (event) {
      const button = event.target.closest('[data-admin-user-action]');
      if (!button) return;
      const action = String(button.getAttribute('data-admin-user-action') || '').trim().toLowerCase();
      const email = String(button.getAttribute('data-admin-user-email') || '').trim().toLowerCase();
      if (!email || !action) return;

      const admins = adminAccountsStore();
      const target = admins[email];
      if (!target) return;

      if (action === 'load') {
        const setValue = function (id, value) {
          const node = document.getElementById(id);
          if (node) node.value = value;
        };
        const users = readStorage(AUTH_USERS_STORAGE_KEY, []);
        const authUser = (Array.isArray(users) ? users : []).find(function (user) {
          return String(user && user.email || '').toLowerCase() === email;
        }) || {};
        setValue('admin-user-name', target.name || '');
        setValue('admin-user-email', email);
        setValue('admin-user-password', String(authUser.password || ''));
        setValue('admin-user-role', target.role || 'admin');
        setAdminTab('admins');
        return;
      }

      if ((action === 'toggle' || action === 'delete') && session && String(session.email || '').toLowerCase() === email) {
        return;
      }

      if (action === 'toggle') {
        admins[email] = Object.assign({}, target, {
          status: target.status === 'disabled' ? 'active' : 'disabled'
        });
      }

      if (action === 'delete') {
        delete admins[email];
        const users = readStorage(AUTH_USERS_STORAGE_KEY, []);
        if (Array.isArray(users)) {
          const nextUsers = users.map(function (user) {
            if (String(user && user.email || '').toLowerCase() !== email) return user;
            return Object.assign({}, user, { role: 'user' });
          });
          writeStorage(AUTH_USERS_STORAGE_KEY, nextUsers);
        }
      }

      writeAdminAccountsStore(admins);
      rerender();
    });

    listingsWrap.addEventListener('click', function (event) {
      const button = event.target.closest('[data-admin-listing-action]');
      if (!button) return;
      const listingId = String(button.getAttribute('data-admin-listing-id') || '').trim();
      const source = String(button.getAttribute('data-admin-listing-source') || '').trim();
      const action = String(button.getAttribute('data-admin-listing-action') || '').trim();
      if (!listingId || !action) return;

      if (action === 'delete') {
        if (source === 'user') {
          deleteUserListedProperty(listingId);
        } else {
          const currentState = adminStateStore();
          const nextDeleted = Array.from(new Set(currentState.deletedListingIds.concat(listingId)));
          writeAdminState(Object.assign({}, currentState, { deletedListingIds: nextDeleted }));
        }
        rerender();
        return;
      }

      updateUserListedProperty(listingId, function (item) {
        if (action === 'verify-ownership') {
          item.ownershipStatus = 'verified';
        }
        if (action === 'verify-post') {
          item.postVerificationStatus = 'verified';
          item.status = 'active';
        }
        if (action === 'publish') {
          item.ownershipStatus = 'verified';
          item.postVerificationStatus = 'verified';
          item.status = 'active';
          item.verified = true;
        }
        if (String(item.ownershipStatus || '').toLowerCase() === 'verified' && String(item.postVerificationStatus || '').toLowerCase() === 'verified') {
          item.verified = true;
          item.status = 'active';
        }
        return item;
      });
      rerender();
    });

    const initialTab = String(getQueryParam('tab') || 'overview').trim().toLowerCase();
    setAdminTab(initialTab);
    rerender();
  }

  function initProfilePage() {
    const name = document.getElementById('profile-name');
    if (!name) return;
    const cover = document.getElementById('profile-cover');
    const specialty = document.getElementById('profile-specialty');
    const metaNote = document.getElementById('profile-meta-note');
    const bioNode = document.getElementById('profile-bio');
    const phoneChip = document.getElementById('profile-phone-chip');
    const whatsappChip = document.getElementById('profile-whatsapp-chip');
    const socialRow = document.querySelector('.profile-social-row');
    const websiteLink = document.getElementById('profile-website');
    const instagramLink = document.getElementById('profile-instagram');
    const facebookLink = document.getElementById('profile-facebook');
    const saveAgencyButton = document.getElementById('profile-save-agency');

    const mergedProfessionals = allProfessionalsWithUserData();
    const firstPro = mergedProfessionals[0] || data.professionals[0];
    const proId = getQueryParam('pro') || (firstPro && firstPro.id);
    let professional = mergedProfessionals.find(function (item) {
      return item.id === proId;
    }) || (data.getProfessionalById ? data.getProfessionalById(proId) : data.professionals.find(function (item) {
      return item.id === proId;
    }));

    if (!professional) {
      const fallbackListing = allListingsWithUserData().find(function (item) {
        return item.professionalId === proId;
      });
      const session = getAuthSession();
      const currentSettings = session ? getAccountSettingsByEmail(session.email) : null;
      if (fallbackListing) {
        professional = {
          id: proId,
          name: fallbackListing.ownerName || t('Professional Account'),
          avatar: fallbackListing.ownerAvatar || 'assets/listing-1.jpg',
          cover: (fallbackListing.images && fallbackListing.images[0]) || '',
          bio: fallbackListing.ownerBio || t('New professional profile with recently submitted listings.'),
          phone: fallbackListing.ownerPhone || '+216 20 000 000',
          whatsapp: fallbackListing.ownerWhatsapp || fallbackListing.ownerPhone || '+216 20 000 000',
          website: fallbackListing.ownerWebsite || '',
          instagram: fallbackListing.ownerInstagram || '',
          facebook: fallbackListing.ownerFacebook || '',
          badge: tierBadgeLabel(fallbackListing.ownerTier || fallbackListing.accountType),
          accountType: normalizeAccountTier(fallbackListing.ownerTier || fallbackListing.accountType),
          verificationStatus: fallbackListing.verified ? 'verified' : 'pending'
        };
      } else if (session && currentSettings) {
        professional = {
          id: userProfessionalId(session.email),
          name: currentSettings.agencyName || currentSettings.name || session.name || t('My account'),
          avatar: currentSettings.avatar || 'assets/listing-1.jpg',
          cover: currentSettings.cover || '',
          bio: currentSettings.bio || '',
          phone: currentSettings.phone || '',
          whatsapp: currentSettings.whatsapp || currentSettings.phone || '',
          website: currentSettings.website || '',
          instagram: currentSettings.instagram || '',
          facebook: currentSettings.facebook || '',
          badge: tierBadgeLabel(activeAccountTier(currentSettings)),
          accountType: activeAccountTier(currentSettings),
          verificationStatus: currentSettings.verificationStatus
        };
      }
    }

    if (!professional) {
      name.textContent = t('Professional not found');
      document.getElementById('profile-listings').innerHTML = emptyMessage(t('No profile information available.'));
      return;
    }

    document.getElementById('profile-avatar').src = professional.avatar;
    document.getElementById('profile-name').textContent = professional.name;
    const activeTier = normalizeAccountTier(professional.accountType || 'agency');
    const profileCapabilities = accountCapabilities({
      accountType: activeTier,
      requestedAccountType: '',
      verificationStatus: professional.verificationStatus || (activeTier === 'individual' ? 'not-required' : 'verified'),
      proSubscriptionActive: false
    });
    if (bioNode) {
      bioNode.textContent = professional.bio || t('Direct contact profile.');
    }
    document.getElementById('profile-call').href = 'tel:' + String(professional.phone || '').replace(/\s+/g, '');
    document.getElementById('profile-whatsapp').href = /^https?:\/\//i.test(String(professional.whatsapp || ''))
      ? professional.whatsapp
      : ('https://wa.me/' + normalizePhone(professional.whatsapp || professional.phone || '').replace(/^\+/, ''));
    if (cover) {
      const fallbackCover = 'assets/hero-home.jpg';
      const coverUrl = String(professional.cover || fallbackCover);
      cover.style.backgroundImage = 'url("' + coverUrl.replace(/"/g, '\\"') + '")';
    }
    if (specialty) {
      specialty.textContent = professional.badge || tierBadgeLabel(activeTier);
    }
    if (metaNote) {
      metaNote.textContent = profileCapabilities.canShowSocials
        ? t('Verified contact profile')
        : t('Direct owner contact');
    }
    if (phoneChip) {
      phoneChip.textContent = t('Phone') + ': ' + (professional.phone || '-');
    }
    if (whatsappChip) {
      whatsappChip.textContent = t('WhatsApp') + ': ' + (/^https?:\/\//i.test(String(professional.whatsapp || ''))
        ? (professional.phone || '-')
        : (professional.whatsapp || professional.phone || '-'));
    }
    if (saveAgencyButton) {
      saveAgencyButton.setAttribute('data-save-agency', professional.id);
      saveAgencyButton.setAttribute('aria-label', t('Save agency'));
      saveAgencyButton.classList.toggle('saved', isAgencySaved(professional.id));
      saveAgencyButton.classList.toggle('hidden', activeTier === 'individual');
    }

    function syncSocialLink(node, href) {
      if (!node) return;
      const value = String(href || '').trim();
      if (profileCapabilities.canShowSocials && /^https?:\/\//i.test(value)) {
        node.href = value;
        node.classList.remove('hidden');
        return;
      }
      node.classList.add('hidden');
      node.removeAttribute('href');
    }

    syncSocialLink(websiteLink, professional.website);
    syncSocialLink(instagramLink, professional.instagram);
    syncSocialLink(facebookLink, professional.facebook);
    if (socialRow) {
      socialRow.classList.toggle('hidden', !profileCapabilities.canShowSocials);
    }

    const listings = allListingsWithUserData().filter(function (item) {
      if (activeTier === 'individual') {
        return String(item.ownerName || '').trim() === String(professional.name || '').trim();
      }
      return item.professionalId === professional.id;
    });

    document.getElementById('profile-count').textContent = t('{count} active', { count: listings.length });
    document.getElementById('profile-listings').innerHTML = listings.length ? listings.map(baseCard).join('') : emptyMessage(t('No listings currently active.'));
  }

  function initSettingsPage() {
    if (getPage() !== 'settings') return;
    if (!isAuthenticated()) {
      window.location.href = authLoginHref('settings.html');
      return;
    }

    const session = getAuthSession();
    const form = document.getElementById('settings-form');
    if (!form || !session) return;
    const nameInput = document.getElementById('settings-name');
    const emailInput = document.getElementById('settings-email');
    const phoneInput = document.getElementById('settings-phone');
    const avatarInput = document.getElementById('settings-avatar');
    const avatarPreview = document.getElementById('settings-avatar-preview');
    const whatsappInput = document.getElementById('settings-whatsapp');
    const bioInput = document.getElementById('settings-bio');
    const coverInput = document.getElementById('settings-cover');
    const websiteInput = document.getElementById('settings-website');
    const instagramInput = document.getElementById('settings-instagram');
    const facebookInput = document.getElementById('settings-facebook');
    const professionalFields = document.getElementById('settings-professional-fields');
    const message = document.getElementById('settings-message');
    const individualCard = document.getElementById('settings-plan-individual');
    const useIndividualBtn = document.getElementById('settings-use-individual');
    const startVerificationBtn = document.getElementById('settings-start-verification');
    const cancelVerificationBtn = document.getElementById('settings-cancel-verification');
    const currentPlanText = document.getElementById('settings-plan-current');
    const verificationStatusText = document.getElementById('settings-verification-status');
    const proAccessStatus = document.getElementById('settings-pro-access-status');
    const proAccessLink = document.getElementById('settings-pro-access-link');
    const proStatsCard = document.getElementById('settings-pro-stats-card');
    const impressionsValue = document.getElementById('settings-stat-impressions');
    const leadsValue = document.getElementById('settings-stat-leads');
    const savesValue = document.getElementById('settings-stat-saves');
    const conversionValue = document.getElementById('settings-stat-conv');
    const chartViews = document.getElementById('settings-chart-views');
    const chartVisits = document.getElementById('settings-chart-visits');
    const chartTime = document.getElementById('settings-chart-time');
    const chartViewsTotal = document.getElementById('settings-chart-views-total');
    const chartVisitsTotal = document.getElementById('settings-chart-visits-total');
    const chartTimeTotal = document.getElementById('settings-chart-time-total');
    const agencyCard = document.getElementById('settings-plan-agency');
    const promoterCard = document.getElementById('settings-plan-promoter');
    const verifyModal = document.getElementById('settings-verify-modal');
    const verifyForm = document.getElementById('settings-verify-form');
    const verifyTargetInput = document.getElementById('settings-verify-target');
    const verifyDocInput = document.getElementById('settings-verify-doc');
    const verifyNoteInput = document.getElementById('settings-verify-note');
    const verifyCloseNodes = verifyModal ? verifyModal.querySelectorAll('[data-settings-verify-close]') : [];
    const cancelModal = document.getElementById('settings-cancel-modal');
    const cancelConfirmBtn = document.getElementById('settings-cancel-confirm');
    const cancelCloseNodes = cancelModal ? cancelModal.querySelectorAll('[data-settings-cancel-close]') : [];

    const current = getAccountSettingsByEmail(session.email);
    let activeTier = normalizeAccountTier(current.accountType);
    let requestedTier = normalizeAccountTier(current.requestedAccountType || '');
    let verificationStatus = String(current.verificationStatus || '').toLowerCase() || (activeTier === 'individual' ? 'not-required' : 'verified');
    let existingVerificationDocument = String(current.verificationDocument || '').trim();
    let verificationRequestedAt = Number(current.verificationRequestedAt || 0);
    let verificationComment = String(current.verificationComment || '').trim();
    let proSubscriptionActive = Boolean(current.proSubscriptionActive);
    let avatarDataUrl = String(current.avatar || '').trim();
    let selectedVerificationTarget = requestedTier !== 'individual' && requestedTier
      ? requestedTier
      : (activeTier === 'promoter' ? 'promoter' : 'agency');

    if (activeTier !== 'individual' && verificationStatus !== 'verified') {
      requestedTier = activeTier;
      activeTier = 'individual';
      verificationStatus = 'pending';
    }
    if (verificationStatus === 'pending' && (requestedTier === 'individual' || !requestedTier)) {
      requestedTier = selectedVerificationTarget;
    }
    if (activeTier === 'individual' && verificationStatus === 'verified' && requestedTier !== 'individual' && requestedTier) {
      activeTier = requestedTier;
      requestedTier = '';
    }
    if (activeTier === 'individual' && verificationStatus === 'verified' && !requestedTier) {
      verificationStatus = 'not-required';
    }

    if (nameInput) nameInput.value = current.name || session.name || '';
    if (emailInput) emailInput.value = session.email || '';
    if (phoneInput) phoneInput.value = current.phone || '';
    if (avatarPreview) avatarPreview.src = avatarDataUrl || 'assets/listing-1.jpg';
    if (whatsappInput) whatsappInput.value = current.whatsapp || current.phone || '';
    if (bioInput) bioInput.value = current.bio || '';
    if (coverInput) coverInput.value = current.cover || '';
    if (websiteInput) websiteInput.value = current.website || '';
    if (instagramInput) instagramInput.value = current.instagram || '';
    if (facebookInput) facebookInput.value = current.facebook || '';

    function countOwnedListings(email, name) {
      return allListingsWithUserData().filter(function (item) {
        const byEmail = String(item.ownerEmail || '').toLowerCase() === String(email || '').toLowerCase();
        const byName = String(item.ownerName || '').trim() === String(name || '').trim();
        return byEmail || byName;
      });
    }

    function buildSeries(base, step, floor) {
      return Array.from({ length: 7 }, function (_, index) {
        const wave = 0.8 + ((index % 3) * 0.11);
        return Math.max(floor, Math.round((base + step * index) * wave));
      });
    }

    function buildTimeSeries(baseMinutes) {
      return Array.from({ length: 7 }, function (_, index) {
        const minutes = baseMinutes + (index * 0.14) + ((index % 2) * 0.08);
        return Number(Math.max(1.1, minutes).toFixed(1));
      });
    }

    function statsMultiplier(tier) {
      if (tier === 'promoter') return 3.8;
      if (tier === 'agency') return 2.9;
      return 1;
    }

    function currentPlanLabel(tier) {
      if (tier === 'promoter') return t('Current tag: Promoter');
      if (tier === 'agency') return t('Current tag: Agency');
      return t('Current tag: Individual');
    }

    function isPendingRequest() {
      return verificationStatus === 'pending' && requestedTier && requestedTier !== 'individual';
    }

    function showMessage(text, isError) {
      if (!message) return;
      message.classList.remove('hidden');
      message.classList.toggle('error', Boolean(isError));
      message.textContent = text;
    }

    function persistVerificationState() {
      const emailKey = String(session.email || '').trim().toLowerCase();
      if (!emailKey) return;
      const allSettings = profileSettingsStore();
      const base = getAccountSettingsByEmail(emailKey);
      const pendingRequest = isPendingRequest();
      allSettings[emailKey] = Object.assign({}, base, {
        name: String((nameInput && nameInput.value) || base.name || session.name || '').trim(),
        phone: String((phoneInput && phoneInput.value) || base.phone || '').trim(),
        whatsapp: String((whatsappInput && whatsappInput.value) || base.whatsapp || base.phone || '').trim(),
        avatar: String(avatarDataUrl || base.avatar || '').trim(),
        cover: String((coverInput && coverInput.value) || base.cover || '').trim(),
        bio: String((bioInput && bioInput.value) || base.bio || '').trim(),
        website: String((websiteInput && websiteInput.value) || base.website || '').trim(),
        instagram: String((instagramInput && instagramInput.value) || base.instagram || '').trim(),
        facebook: String((facebookInput && facebookInput.value) || base.facebook || '').trim(),
        agencyName: String((nameInput && nameInput.value) || base.agencyName || base.name || session.name || '').trim(),
        accountType: pendingRequest ? 'individual' : activeTier,
        requestedAccountType: pendingRequest ? requestedTier : '',
        verificationStatus: pendingRequest
          ? 'pending'
          : (activeTier === 'individual' ? 'not-required' : verificationStatus),
        verificationDocument: pendingRequest ? existingVerificationDocument : '',
        verificationRequestedAt: pendingRequest ? verificationRequestedAt : 0,
        verificationComment: pendingRequest ? verificationComment : ''
      });
      writeStorage(PROFILE_SETTINGS_STORAGE_KEY, allSettings);
    }

    function closeVerifyModal() {
      if (!verifyModal) return;
      verifyModal.classList.add('hidden');
      verifyModal.setAttribute('aria-hidden', 'true');
    }

    function openVerifyModal(targetTier) {
      if (!verifyModal || !verifyTargetInput) return;
      verifyTargetInput.value = targetTier === 'promoter' ? 'promoter' : 'agency';
      if (verifyDocInput) verifyDocInput.value = '';
      if (verifyNoteInput) verifyNoteInput.value = verificationComment || '';
      verifyModal.classList.remove('hidden');
      verifyModal.setAttribute('aria-hidden', 'false');
    }

    function closeCancelModal() {
      if (!cancelModal) return;
      cancelModal.classList.add('hidden');
      cancelModal.setAttribute('aria-hidden', 'true');
    }

    function openCancelModal() {
      if (!cancelModal) return;
      cancelModal.classList.remove('hidden');
      cancelModal.setAttribute('aria-hidden', 'false');
    }

    function syncProAccessUI() {
      if (proAccessStatus) {
        proAccessStatus.className = proSubscriptionActive ? 'badge verified' : 'badge';
        proAccessStatus.textContent = proSubscriptionActive ? t('Pro active') : t('Standard');
      }
      if (proAccessLink) {
        proAccessLink.href = withLanguageParam('pro-upgrade.html');
        proAccessLink.textContent = proSubscriptionActive ? t('Manage Pro') : t('Upgrade to Pro');
      }
    }

    if (avatarInput) {
      avatarInput.addEventListener('change', function () {
        const file = avatarInput.files && avatarInput.files[0];
        if (!file) return;
        readFileAsDataUrl(file).then(function (result) {
          avatarDataUrl = result;
          if (avatarPreview) avatarPreview.src = result || 'assets/listing-1.jpg';
        }).catch(function () {
          showMessage(t('Could not read the selected profile photo.'), true);
        });
      });
    }

    function renderMiniBars(node, values) {
      if (!node) return;
      const max = values.reduce(function (best, value) {
        return Math.max(best, Number(value || 0));
      }, 1);
      node.innerHTML = values.map(function (value) {
        const ratio = Math.max(10, Math.round((Number(value || 0) / max) * 100));
        return '<span style="height:' + ratio + '%"></span>';
      }).join('');
    }

    function syncPlanUI() {
      const capabilities = accountCapabilities({
        accountType: activeTier,
        requestedAccountType: requestedTier,
        verificationStatus: verificationStatus,
        proSubscriptionActive: proSubscriptionActive
      });
      if (individualCard) individualCard.classList.toggle('active', activeTier === 'individual');
      if (agencyCard) agencyCard.classList.toggle('active', activeTier === 'agency');
      if (promoterCard) promoterCard.classList.toggle('active', activeTier === 'promoter');
      if (agencyCard) agencyCard.classList.toggle('pending-request', isPendingRequest() && requestedTier === 'agency');
      if (promoterCard) promoterCard.classList.toggle('pending-request', isPendingRequest() && requestedTier === 'promoter');
      if (professionalFields) {
        professionalFields.classList.toggle('hidden', !capabilities.canShowSocials);
      }
      if (currentPlanText) {
        currentPlanText.classList.toggle('error', isPendingRequest());
        currentPlanText.textContent = isPendingRequest()
          ? t('Current tag: Individual') + ' · ' + t('Verification status: Pending review')
          : currentPlanLabel(activeTier);
      }

      syncProAccessUI();

      if (proStatsCard) {
        proStatsCard.classList.remove('hidden');
      }

      if (verificationStatusText) {
        verificationStatusText.classList.remove('hidden');
        if (verificationStatus === 'verified' && activeTier !== 'individual') {
          verificationStatusText.classList.remove('hidden', 'error');
          verificationStatusText.classList.add('verified');
          verificationStatusText.textContent = t('Verification status: Verified');
        } else if (isPendingRequest()) {
          verificationStatusText.classList.remove('hidden', 'verified');
          verificationStatusText.classList.add('error');
          verificationStatusText.textContent = t('Verification status: Pending review');
        } else if (verificationStatus === 'rejected') {
          verificationStatusText.classList.remove('hidden', 'verified');
          verificationStatusText.classList.add('error');
          verificationStatusText.textContent = t('Verification status: Rejected');
        } else {
          verificationStatusText.classList.remove('error', 'verified');
          verificationStatusText.textContent = t('Verification status: Not required');
          verificationStatus = 'not-required';
        }
      }

      if (useIndividualBtn) {
        useIndividualBtn.disabled = isPendingRequest();
      }
      if (startVerificationBtn) {
        const canOpenVerification = !isPendingRequest() && activeTier === 'individual';
        startVerificationBtn.disabled = !canOpenVerification;
        startVerificationBtn.textContent = canOpenVerification
          ? t('Start verification')
          : (isPendingRequest() ? t('Verification pending') : t('Verified profile active'));
      }
      if (cancelVerificationBtn) {
        cancelVerificationBtn.classList.toggle('hidden', !isPendingRequest());
      }

      const listings = countOwnedListings(
        String((emailInput && emailInput.value) || session.email || '').toLowerCase(),
        String((nameInput && nameInput.value) || session.name || '').trim()
      );
      const listingCount = listings.length;
      const boost = statsMultiplier(activeTier);
      const baseLeads = Math.round((listingCount * 4 + 8) * boost);
      const baseSaves = Math.round((listingCount * 9 + 18) * boost);
      const baseImpressions = Math.round((listingCount * 360 + 680) * boost);
      const conversion = (3 + (boost * 1.7)).toFixed(1) + '%';
      const viewsSeries = buildSeries(
        Math.round((listingCount * 120 + 200) * boost),
        Math.round(26 * boost),
        70
      );
      const visitsSeries = buildSeries(
        Math.round((listingCount * 34 + 72) * boost),
        Math.round(8 * boost),
        24
      );
      const timeSeries = buildTimeSeries((listingCount * 0.08 + 1.5) * Math.max(1, boost * 0.84));
      const totalViews = viewsSeries.reduce(function (sum, value) { return sum + Number(value || 0); }, 0);
      const totalVisits = visitsSeries.reduce(function (sum, value) { return sum + Number(value || 0); }, 0);
      const avgMinutes = timeSeries.reduce(function (sum, value) { return sum + Number(value || 0); }, 0) / Math.max(timeSeries.length, 1);

      if (impressionsValue) impressionsValue.textContent = money(baseImpressions);
      if (leadsValue) leadsValue.textContent = String(baseLeads);
      if (savesValue) savesValue.textContent = String(baseSaves);
      if (conversionValue) conversionValue.textContent = conversion;
      if (chartViewsTotal) chartViewsTotal.textContent = money(totalViews);
      if (chartVisitsTotal) chartVisitsTotal.textContent = money(totalVisits);
      if (chartTimeTotal) chartTimeTotal.textContent = avgMinutes.toFixed(1) + t('min');
      renderMiniBars(chartViews, viewsSeries);
      renderMiniBars(chartVisits, visitsSeries);
      renderMiniBars(chartTime, timeSeries);
    }

    if (useIndividualBtn) {
      useIndividualBtn.addEventListener('click', function () {
        if (isPendingRequest()) {
          showMessage(t('Verification request is pending. Use cancel request first.'), true);
          return;
        }
        activeTier = 'individual';
        verificationStatus = 'not-required';
        requestedTier = '';
        syncPlanUI();
      });
    }

    if (individualCard) {
      individualCard.style.cursor = 'pointer';
      individualCard.addEventListener('click', function () {
        if (isPendingRequest()) {
          showMessage(t('Currently under Individual profile while verification is pending. Cancel request to switch.'), true);
          return;
        }
        activeTier = 'individual';
        verificationStatus = 'not-required';
        requestedTier = '';
        syncPlanUI();
      });
    }

    [
      { tier: 'agency', node: agencyCard },
      { tier: 'promoter', node: promoterCard }
    ].forEach(function (entry) {
      if (!entry.node) return;
      entry.node.style.cursor = 'pointer';
      entry.node.addEventListener('click', function () {
        selectedVerificationTarget = entry.tier;
        if (isPendingRequest()) {
          showMessage(t('Currently under Individual profile while verification is pending. Use cancel request to change.'), true);
          return;
        }
        if (activeTier === entry.tier && verificationStatus === 'verified') {
          showMessage(t('This account tag is already active and verified.'), false);
          return;
        }
        openVerifyModal(entry.tier);
      });
    });

    if (startVerificationBtn) {
      startVerificationBtn.addEventListener('click', function () {
        if (isPendingRequest()) {
          showMessage(t('Verification request already pending.'), true);
          return;
        }
        if (activeTier !== 'individual') {
          showMessage(t('Switch to Individual first before requesting a new account tag.'), true);
          return;
        }
        openVerifyModal(selectedVerificationTarget);
      });
    }

    if (cancelVerificationBtn) {
      cancelVerificationBtn.addEventListener('click', function () {
        if (!isPendingRequest()) return;
        openCancelModal();
      });
    }

    if (verifyCloseNodes.length) {
      verifyCloseNodes.forEach(function (node) {
        node.addEventListener('click', closeVerifyModal);
      });
    }

    if (cancelCloseNodes.length) {
      cancelCloseNodes.forEach(function (node) {
        node.addEventListener('click', closeCancelModal);
      });
    }

    if (verifyModal) {
      verifyModal.addEventListener('click', function (event) {
        if (!event.target.closest('.settings-modal-card')) {
          closeVerifyModal();
        }
      });
    }

    if (cancelModal) {
      cancelModal.addEventListener('click', function (event) {
        if (!event.target.closest('.settings-modal-card')) {
          closeCancelModal();
        }
      });
    }

    if (verifyForm) {
      verifyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const target = normalizeAccountTier(verifyTargetInput ? verifyTargetInput.value : selectedVerificationTarget);
        const uploaded = verifyDocInput && verifyDocInput.files && verifyDocInput.files[0];
        if (!uploaded || (target !== 'agency' && target !== 'promoter')) {
          showMessage(t('Please upload a verification document and choose Agency or Promoter.'), true);
          return;
        }
        selectedVerificationTarget = target;
        requestedTier = target;
        activeTier = 'individual';
        verificationStatus = 'pending';
        verificationRequestedAt = Date.now();
        verificationComment = String((verifyNoteInput && verifyNoteInput.value) || '').trim();
        existingVerificationDocument = String(uploaded.name || '').trim();
        persistVerificationState();
        closeVerifyModal();
        syncPlanUI();
        showMessage(t('Verification request sent. We will review your account.'), false);
      });
    }

    if (cancelConfirmBtn) {
      cancelConfirmBtn.addEventListener('click', function () {
        requestedTier = '';
        verificationStatus = 'not-required';
        existingVerificationDocument = '';
        verificationRequestedAt = 0;
        verificationComment = '';
        activeTier = 'individual';
        persistVerificationState();
        closeCancelModal();
        syncPlanUI();
        showMessage(t('Verification request canceled. Account remains Individual.'), false);
      });
    }

    syncPlanUI();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const nextName = String((nameInput && nameInput.value) || '').trim();
      const nextEmail = String((emailInput && emailInput.value) || '').trim().toLowerCase();
      if (nextName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
        if (message) {
          message.classList.remove('hidden');
          message.classList.add('error');
          message.textContent = t('Please enter a valid email and full name.');
        }
        return;
      }

      const pendingRequest = isPendingRequest();
      const finalAccountTier = pendingRequest ? 'individual' : activeTier;
      const nextVerificationStatus = pendingRequest
        ? 'pending'
        : (finalAccountTier === 'individual' ? (verificationStatus === 'rejected' ? 'rejected' : 'not-required') : 'verified');

      const nextSettings = {
        name: nextName,
        phone: String((phoneInput && phoneInput.value) || '').trim(),
        whatsapp: String((whatsappInput && whatsappInput.value) || '').trim(),
        avatar: String(avatarDataUrl || '').trim(),
        cover: String((coverInput && coverInput.value) || '').trim(),
        bio: String((bioInput && bioInput.value) || '').trim(),
        website: String((websiteInput && websiteInput.value) || '').trim(),
        instagram: String((instagramInput && instagramInput.value) || '').trim(),
        facebook: String((facebookInput && facebookInput.value) || '').trim(),
        agencyName: String((nextName || '').trim()),
        accountType: finalAccountTier,
        requestedAccountType: pendingRequest ? requestedTier : '',
        proSubscriptionActive: proSubscriptionActive,
        verificationStatus: nextVerificationStatus,
        verificationDocument: pendingRequest ? existingVerificationDocument : '',
        verificationRequestedAt: pendingRequest ? verificationRequestedAt : 0,
        verificationComment: pendingRequest ? verificationComment : '',
        proActivatedAt: current.proActivatedAt || 0
      };
      const allSettings = profileSettingsStore();
      if (String(session.email || '').toLowerCase() !== nextEmail) {
        delete allSettings[String(session.email || '').toLowerCase()];
      }
      allSettings[nextEmail] = nextSettings;
      writeStorage(PROFILE_SETTINGS_STORAGE_KEY, allSettings);
      const adminStore = adminAccountsStore();
      const adminProfile = adminStore[nextEmail];
      writeStorage(AUTH_SESSION_STORAGE_KEY, {
        name: nextName,
        email: nextEmail,
        phone: String((phoneInput && phoneInput.value) || '').trim(),
        role: adminProfile ? String(adminProfile.role || 'admin') : 'user',
        isAdmin: Boolean(adminProfile && adminProfile.status !== 'disabled'),
        signedAt: Date.now()
      });

      if (message) {
        message.classList.remove('hidden', 'error');
        message.textContent = t('Profile settings and account tag saved successfully.');
      }

      activeTier = finalAccountTier;
      verificationStatus = nextVerificationStatus;
      requestedTier = nextSettings.requestedAccountType || '';
      verificationRequestedAt = Number(nextSettings.verificationRequestedAt || 0);
      verificationComment = String(nextSettings.verificationComment || '').trim();
      existingVerificationDocument = String(nextSettings.verificationDocument || '').trim();
      proSubscriptionActive = Boolean(nextSettings.proSubscriptionActive);
      syncPlanUI();
    });
  }

  function initProUpgradePage() {
    if (getPage() !== 'pro-upgrade') return;
    if (!isAuthenticated()) {
      window.location.href = authLoginHref('pro-upgrade.html');
      return;
    }
    const session = getAuthSession();
    if (!session) return;

    const title = document.getElementById('pro-upgrade-title');
    const subtitle = document.getElementById('pro-upgrade-subtitle');
    const card = document.querySelector('.pro-upgrade-card');

    const settings = getAccountSettingsByEmail(session.email);
    const isActive = Boolean(settings.proSubscriptionActive);

    if (title) title.textContent = t('Upgrade to Pro');
    if (subtitle) subtitle.textContent = t('Unlock premium visibility and analytics for your listings.');
    if (!card) return;

    const premiumIntroMarkup = premiumDescriptionMarkup({});

    if (isActive) {
      card.innerHTML = [
        premiumIntroMarkup,
        '<div class="premium-payment-card">',
        '  <div class="listing-section-head">',
        '    <h3 class="section-title">' + escapeHtml(t('Professional Pro Plan')) + '</h3>',
        '    <p class="subtle">' + escapeHtml(t('Pro plan activated successfully.')) + '</p>',
        '  </div>',
        '  <span class="badge verified">' + escapeHtml(t('Pro active')) + '</span>',
        '  <div class="button-row">',
        '    <a class="btn" href="' + withLanguageParam('settings.html') + '">' + escapeHtml(t('Back to settings')) + '</a>',
        '  </div>',
        '</div>'
      ].join('');
      return;
    }

    card.innerHTML = [
      premiumIntroMarkup,
      '<div class="premium-payment-card">',
      '  <div class="listing-section-head">',
      '    <h3 class="section-title">' + escapeHtml(t('Professional Pro Plan')) + '</h3>',
      '    <p class="subtle">' + escapeHtml(t('29 TND / month billed monthly. Cancel any time from profile settings.')) + '</p>',
      '  </div>',
      '  <form id="pro-upgrade-form" class="form-grid two-col" novalidate>',
      '    <div class="field">',
      '      <label for="pro-card-name">' + escapeHtml(t('Cardholder name')) + '</label>',
      '      <input id="pro-card-name" class="input" type="text" placeholder="Name Surname" />',
      '    </div>',
      '    <div class="field">',
      '      <label for="pro-card-number">' + escapeHtml(t('Card number')) + '</label>',
      '      <input id="pro-card-number" class="input" type="text" inputmode="numeric" placeholder="4242 4242 4242 4242" />',
      '    </div>',
      '    <div class="field">',
      '      <label for="pro-card-expiry">' + escapeHtml(t('Expiry')) + '</label>',
      '      <input id="pro-card-expiry" class="input" type="text" placeholder="MM/YY" />',
      '    </div>',
      '    <div class="field" style="display:flex;align-items:flex-end;">',
      '      <button id="pro-upgrade-submit" class="btn" type="submit">' + escapeHtml(t('Pay 29 TND and activate Pro')) + '</button>',
      '    </div>',
      '  </form>',
      '  <p id="pro-upgrade-feedback" class="notice hidden" role="status" aria-live="polite"></p>',
      '  <div class="button-row">',
      '    <a class="btn light" href="' + withLanguageParam('settings.html') + '">' + escapeHtml(t('Back to settings')) + '</a>',
      '  </div>',
      '</div>'
    ].join('');

    const form = document.getElementById('pro-upgrade-form');
    const feedback = document.getElementById('pro-upgrade-feedback');
    const nameField = document.getElementById('pro-card-name');
    const numberField = document.getElementById('pro-card-number');
    const expiryField = document.getElementById('pro-card-expiry');
    if (!form || !feedback) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const cardName = String((nameField && nameField.value) || '').trim();
      const cardNumber = String((numberField && numberField.value) || '').replace(/\s+/g, '');
      const cardExpiry = String((expiryField && expiryField.value) || '').trim();
      if (!cardName || cardNumber.length < 12 || !cardExpiry) {
        feedback.classList.remove('hidden');
        feedback.classList.add('error');
        feedback.textContent = t('Please complete all payment fields.');
        return;
      }

      const allSettings = profileSettingsStore();
      const currentSettings = getAccountSettingsByEmail(session.email);
      allSettings[session.email] = Object.assign({}, currentSettings, {
        proSubscriptionActive: true,
        proActivatedAt: Date.now()
      });
      writeStorage(PROFILE_SETTINGS_STORAGE_KEY, allSettings);

      feedback.classList.remove('hidden', 'error');
      feedback.textContent = t('Pro plan activated successfully. Redirecting to settings...');
      window.setTimeout(function () {
        window.location.href = withLanguageParam('settings.html');
      }, 900);
    });
  }

  function initMyListingsPage() {
    if (getPage() !== 'my-listings') return;
    if (!isAuthenticated()) {
      window.location.href = authLoginHref('my-listings.html');
      return;
    }

    const session = getAuthSession();
    const grid = document.getElementById('my-listings-grid');
    const count = document.getElementById('my-listings-count');
    const verificationSummary = document.getElementById('my-listings-verification-summary');
    const verifyModal = document.getElementById('my-listing-verify-modal');
    const verifyForm = document.getElementById('my-listing-verify-form');
    const verifyDocInput = document.getElementById('my-listing-verify-doc');
    const verifyNoteInput = document.getElementById('my-listing-verify-note');
    const verifyCloseNodes = verifyModal ? verifyModal.querySelectorAll('[data-my-listing-modal-close]') : [];
    if (!grid || !session) return;

    let activeOwnershipListingId = '';

    function myListingsSource() {
      return allListingsWithUserData().filter(function (item) {
        const byEmail = String(item.ownerEmail || '').toLowerCase() === String(session.email || '').toLowerCase();
        const byName = !item.professionalId && item.source === 'user' && String(item.ownerName || '') === String(session.name || '');
        return byEmail || byName;
      });
    }

    function listingMetrics(item) {
      const seed = hashSeed(item.id || item.title || 'listing');
      const views = 180 + (seed % 760);
      const visits = Math.max(18, Math.round(views * (0.24 + ((seed % 7) / 100))));
      const avgTime = (1.6 + ((seed % 18) / 10)).toFixed(1);
      const leads = Math.max(1, Math.round(visits * 0.12));
      return { views: views, visits: visits, avgTime: avgTime, leads: leads };
    }

    function normalizeOwnership(item) {
      const raw = String(item.ownershipStatus || '').toLowerCase();
      if (raw === 'verified' || raw === 'requested' || raw === 'rejected') return raw;
      if (item.verificationDocument) return 'requested';
      return 'missing';
    }

    function normalizePostStatus(item) {
      const raw = String(item.postVerificationStatus || '').toLowerCase();
      if (raw === 'verified' || raw === 'requested' || raw === 'rejected') return raw;
      return item.verified ? 'verified' : 'pending';
    }

    function statusLabel(status, kind) {
      if (status === 'verified') return t('Verified');
      if (status === 'requested') return kind === 'ownership' ? t('Ownership requested') : t('Post review requested');
      if (status === 'rejected') return t('Rejected');
      if (status === 'missing') return t('Not submitted');
      return t('Pending');
    }

    function statusClass(status) {
      if (status === 'verified') return 'verified';
      if (status === 'rejected') return 'error';
      return '';
    }

    function renderItems() {
      const items = myListingsSource();
      if (count) count.textContent = t('{count} active', { count: items.length });
      if (verificationSummary) {
        const pendingCount = items.filter(function (item) {
          return normalizePostStatus(item) !== 'verified' || normalizeOwnership(item) !== 'verified';
        }).length;
        const liveCount = Math.max(0, items.length - pendingCount);
        verificationSummary.textContent = t('{count} listings live · {pending} pending verification', {
          count: liveCount,
          pending: pendingCount
        });
      }

      if (!items.length) {
        grid.innerHTML = emptyMessage(t('No listings currently active for your account.'));
        return;
      }

      grid.innerHTML = items.map(function (item) {
        const postStatus = normalizePostStatus(item);
        const ownershipStatus = normalizeOwnership(item);
        const metrics = listingMetrics(item);
        const href = withLanguageParam('property.html?id=' + encodeURIComponent(item.id));
        return [
          '<article class="my-listing-manage-card" data-my-listing-id="' + escapeHtml(item.id) + '">',
          '  <a class="my-listing-manage-cover" href="' + href + '">',
          '    <img loading="lazy" src="' + escapeHtml(cardImageSet(item)[0]) + '" alt="' + escapeHtml(item.title) + '" />',
          '    <span class="price-pill">' + escapeHtml(compactCardPrice(item)) + '</span>',
          '  </a>',
          '  <div class="my-listing-manage-body">',
          '    <div class="meta-row"><strong>' + escapeHtml(item.title) + '</strong><span class="badge ' + (item.verified ? 'verified' : '') + '">' + escapeHtml(item.verified ? t('Verified') : t('Pending')) + '</span></div>',
          '    <p class="loc">' + escapeHtml(item.location) + '</p>',
          '    <div class="specs">',
          '      <span class="spec">' + escapeHtml(t('{count} Rooms', { count: item.rooms })) + '</span>',
          '      <span class="spec">' + escapeHtml(String(item.surface || 0)) + ' m2</span>',
          '      <span class="spec">' + escapeHtml(localizePropertyType(item.type)) + '</span>',
          '    </div>',
          '    <div class="my-listing-kpis">',
          '      <span><small>' + escapeHtml(t('Views')) + '</small><b>' + escapeHtml(money(metrics.views)) + '</b></span>',
          '      <span><small>' + escapeHtml(t('Visits')) + '</small><b>' + escapeHtml(money(metrics.visits)) + '</b></span>',
          '      <span><small>' + escapeHtml(t('Leads')) + '</small><b>' + escapeHtml(String(metrics.leads)) + '</b></span>',
          '      <span><small>' + escapeHtml(t('Avg time')) + '</small><b>' + escapeHtml(metrics.avgTime) + 'm</b></span>',
          '    </div>',
          '    <div class="my-listing-verify-row">',
          '      <span class="badge ' + statusClass(postStatus) + '">' + escapeHtml(t('Post review') + ': ' + statusLabel(postStatus, 'post')) + '</span>',
          '      <span class="badge ' + statusClass(ownershipStatus) + '">' + escapeHtml(t('Ownership') + ': ' + statusLabel(ownershipStatus, 'ownership')) + '</span>',
          '    </div>',
          '    <div class="button-row">',
          '      <a class="btn light mini" href="' + href + '">' + escapeHtml(t('View listing')) + '</a>',
          '      <button type="button" class="btn light mini" data-my-listing-action="verify-post" data-listing-id="' + escapeHtml(item.id) + '"' + (postStatus === 'verified' ? ' disabled' : '') + '>' + escapeHtml(t('Verify post')) + '</button>',
          '      <button type="button" class="btn mini" data-my-listing-action="verify-ownership" data-listing-id="' + escapeHtml(item.id) + '"' + (ownershipStatus === 'verified' ? ' disabled' : '') + '>' + escapeHtml(t('Verify ownership')) + '</button>',
          '    </div>',
          '  </div>',
          '</article>'
        ].join('');
      }).join('');
    }

    function closeVerifyModal() {
      if (!verifyModal) return;
      verifyModal.classList.add('hidden');
      verifyModal.setAttribute('aria-hidden', 'true');
      if (verifyForm) verifyForm.reset();
      activeOwnershipListingId = '';
    }

    function openVerifyModal(listingId) {
      activeOwnershipListingId = listingId;
      if (!verifyModal) return;
      verifyModal.classList.remove('hidden');
      verifyModal.setAttribute('aria-hidden', 'false');
      if (verifyDocInput) verifyDocInput.value = '';
      if (verifyNoteInput) verifyNoteInput.value = '';
    }

    grid.addEventListener('click', function (event) {
      const button = event.target.closest('[data-my-listing-action]');
      if (!button) return;
      const action = String(button.getAttribute('data-my-listing-action') || '').trim();
      const listingId = String(button.getAttribute('data-listing-id') || '').trim();
      if (!action || !listingId) return;
      if (action === 'verify-post') {
        updateUserListedProperty(listingId, function (item) {
          item.postVerificationStatus = 'requested';
          item.status = 'pending';
          return item;
        });
        renderItems();
      }
      if (action === 'verify-ownership') {
        openVerifyModal(listingId);
      }
    });

    verifyCloseNodes.forEach(function (node) {
      node.addEventListener('click', closeVerifyModal);
    });

    if (verifyModal) {
      verifyModal.addEventListener('click', function (event) {
        if (!event.target.closest('.settings-modal-card')) {
          closeVerifyModal();
        }
      });
    }

    if (verifyForm) {
      verifyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const uploaded = verifyDocInput && verifyDocInput.files && verifyDocInput.files[0];
        if (!activeOwnershipListingId || !uploaded) return;
        const note = String((verifyNoteInput && verifyNoteInput.value) || '').trim();
        updateUserListedProperty(activeOwnershipListingId, function (item) {
          item.verificationDocument = String(uploaded.name || '').trim();
          item.ownershipStatus = 'requested';
          item.status = 'pending';
          if (note) {
            item.verificationNote = note;
          }
          return item;
        });
        closeVerifyModal();
        renderItems();
      });
    }

    renderItems();
  }

  function initFavoritesPage() {
    if (getPage() !== 'favorites') return;
    if (!isAuthenticated()) {
      window.location.href = authLoginHref('favorites.html');
      return;
    }

    const listingsGrid = document.getElementById('favorites-listings-grid');
    const agenciesGrid = document.getElementById('favorites-agencies-grid');
    if (!listingsGrid || !agenciesGrid) return;

    const listingsCount = document.getElementById('favorites-listings-count');
    const agenciesCount = document.getElementById('favorites-agencies-count');
    const tabListings = document.getElementById('favorites-tab-listings');
    const tabAgencies = document.getElementById('favorites-tab-agencies');
    const listingsSection = document.getElementById('favorites-listings-section');
    const agenciesSection = document.getElementById('favorites-agencies-section');

    const listingsSource = allListingsWithUserData();
    const agenciesSource = allProfessionalsWithUserData();

    const listingMap = listingsSource.reduce(function (acc, item) {
      acc[item.id] = item;
      return acc;
    }, {});
    const agencyMap = agenciesSource.reduce(function (acc, item) {
      acc[item.id] = item;
      return acc;
    }, {});

    function setView(view) {
      const showAgencies = view === 'agencies';
      if (listingsSection) listingsSection.classList.toggle('hidden', showAgencies);
      if (agenciesSection) agenciesSection.classList.toggle('hidden', !showAgencies);
      if (tabListings) tabListings.classList.toggle('active', !showAgencies);
      if (tabAgencies) tabAgencies.classList.toggle('active', showAgencies);
    }

    function renderSavedItems() {
      const savedListings = getSavedListingIds().map(function (id) {
        return listingMap[id];
      }).filter(Boolean);
      const savedAgencies = getSavedAgencyIds().map(function (id) {
        return agencyMap[id];
      }).filter(Boolean);

      listingsGrid.innerHTML = savedListings.length
        ? savedListings.map(baseCard).join('')
        : emptyMessage(t('No saved listings yet.'));

      agenciesGrid.innerHTML = savedAgencies.length
        ? savedAgencies.map(function (pro, index) {
          return agencyCardMarkup(pro, index, 'favorite-agency-card');
        }).join('')
        : emptyMessage(t('No saved agencies yet.'));

      if (listingsCount) {
        listingsCount.textContent = t('{count} saved', { count: savedListings.length });
      }
      if (agenciesCount) {
        agenciesCount.textContent = t('{count} saved', { count: savedAgencies.length });
      }

      if (savedListings.length === 0 && savedAgencies.length > 0 && tabListings && tabListings.classList.contains('active')) {
        setView('agencies');
      }
      if (savedAgencies.length === 0 && savedListings.length > 0 && tabAgencies && tabAgencies.classList.contains('active')) {
        setView('listings');
      }
    }

    if (tabListings) {
      tabListings.addEventListener('click', function () {
        setView('listings');
      });
    }

    if (tabAgencies) {
      tabAgencies.addEventListener('click', function () {
        setView('agencies');
      });
    }

    setView('listings');
    renderSavedItems();

    document.addEventListener('click', function (event) {
      if (!event.target.closest('[data-save-listing], [data-save-agency]')) return;
      window.setTimeout(renderSavedItems, 0);
    });
  }

  function initAccountMenu() {
    const triggers = document.querySelectorAll('.nav-account');
    if (!triggers.length) return;
    if (!isAuthenticated()) return;

    const session = getAuthSession();
    const profileStore = profileSettingsStore();
    const profile = session && session.email ? (profileStore[session.email] || {}) : {};
    const rawName = (session && session.name) ? session.name : ((session && session.email) ? session.email.split('@')[0] : t('My account'));
    const displayName = String(rawName || '').trim() || t('My account');
    const initials = displayName
      .split(/\s+/)
      .map(function (word) { return word.slice(0, 1).toUpperCase(); })
      .join('')
      .slice(0, 2);
    const avatarUrl = String(profile.avatar || '').trim();
    const hasAvatar = /^(https?:\/\/|data:image\/|assets\/|\/)/i.test(avatarUrl);

    let modal = document.getElementById('account-action-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'account-action-modal';
      modal.className = 'account-action-modal hidden';
      modal.innerHTML = [
        '<div class="account-action-backdrop" data-account-modal-close></div>',
        '<div class="account-action-card" role="dialog" aria-modal="true" aria-label="' + escapeHtml(t('Account menu')) + '">',
        '  <h4 id="account-modal-title"></h4>',
        '  <p id="account-modal-description"></p>',
        '  <div class="account-modal-actions">',
        '    <button type="button" class="btn light" data-account-modal-close>' + escapeHtml(t('Close')) + '</button>',
        '    <button type="button" class="btn" id="account-modal-primary"></button>',
        '  </div>',
        '</div>'
      ].join('');
      document.body.appendChild(modal);
      modal.addEventListener('click', function (event) {
        if (event.target.closest('[data-account-modal-close]')) {
          modal.classList.add('hidden');
        }
      });
    }

    const modalTitle = modal.querySelector('#account-modal-title');
    const modalDescription = modal.querySelector('#account-modal-description');
    const modalPrimary = modal.querySelector('#account-modal-primary');

    function openLogoutAction() {
      if (!modalTitle || !modalDescription || !modalPrimary) return;
      modalTitle.textContent = t('Log out');
      modalDescription.textContent = t('Are you sure you want to sign out from your account?');
      modalPrimary.textContent = t('Sign out');
      modalPrimary.onclick = function () {
        clearAuthSessionStorage();
        modal.classList.add('hidden');
        window.location.href = withLanguageParam('login.html');
      };
      modal.classList.remove('hidden');
    }

    const actionRoutes = {
      favorites: 'favorites.html',
      settings: 'settings.html',
      listings: 'my-listings.html',
      admin: 'admin.html'
    };
    const canOpenAdmin = Boolean(session && isAdminEmail(session.email));

    triggers.forEach(function (trigger) {
      if (trigger.dataset.accountMenuBound === 'true') return;
      trigger.dataset.accountMenuBound = 'true';
      trigger.setAttribute('href', '#');
      trigger.setAttribute('aria-haspopup', 'menu');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.add('auth-user-trigger');
      trigger.innerHTML = [
        hasAvatar
          ? '<img class="nav-account-avatar" src="' + escapeHtml(avatarUrl) + '" alt="' + escapeHtml(displayName) + '" />'
          : '<span class="nav-account-initials">' + escapeHtml(initials || 'DP') + '</span>',
        '<span class="nav-account-label">' + escapeHtml(displayName) + '</span>',
        '<svg class="nav-account-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5"></path></svg>'
      ].join('');
      trigger.setAttribute('aria-label', displayName);

      const menuWrap = document.createElement('div');
      menuWrap.className = 'account-menu-wrap';
      trigger.parentNode.insertBefore(menuWrap, trigger);
      menuWrap.appendChild(trigger);

      const menu = document.createElement('div');
      menu.className = 'account-dropdown hidden';
      const menuItems = [
        '<button type="button" data-account-action="favorites">' + escapeHtml(t('My favorites')) + '</button>',
        '<button type="button" data-account-action="settings">' + escapeHtml(t('Profile settings')) + '</button>',
        '<button type="button" data-account-action="listings">' + escapeHtml(t('Check listings')) + '</button>'
      ];
      if (canOpenAdmin) {
        menuItems.push('<button type="button" data-account-action="admin">' + escapeHtml(t('Admin panel')) + '</button>');
      }
      menuItems.push(
        '<button type="button" data-account-action="logout" class="danger">' + escapeHtml(t('Log out')) + '</button>'
      );
      menu.innerHTML = menuItems.join('');
      menuWrap.appendChild(menu);

      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        const open = !menu.classList.contains('hidden');
        document.querySelectorAll('.account-dropdown').forEach(function (panel) {
          panel.classList.add('hidden');
        });
        if (!open) {
          menu.classList.remove('hidden');
          trigger.setAttribute('aria-expanded', 'true');
        } else {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });

      menu.addEventListener('click', function (event) {
        const button = event.target.closest('[data-account-action]');
        if (!button) return;
        const action = button.getAttribute('data-account-action');
        menu.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
        if (action === 'logout') {
          openLogoutAction();
          return;
        }
        const target = actionRoutes[action];
        if (target) {
          window.location.href = withLanguageParam(target);
        }
      });
    });

    document.addEventListener('click', function (event) {
      const inMenu = event.target.closest('.account-menu-wrap');
      if (inMenu) return;
      document.querySelectorAll('.account-dropdown').forEach(function (panel) {
        panel.classList.add('hidden');
      });
      document.querySelectorAll('.nav-account[aria-expanded="true"]').forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initAuthPage() {
    const page = getPage();
    if (page !== 'login' && page !== 'signup') return;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function getPostAuthTarget() {
      const fallback = 'dashboard.html';
      const raw = String(getQueryParam('redirect') || '').trim();
      if (!raw) return fallback;
      if (raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return fallback;
      if (/^https?:\/\//i.test(raw) || raw.startsWith('//')) return fallback;
      if (!/\.html(\?|#|$)/.test(raw)) return fallback;
      return raw;
    }

    function showFeedback(node, message, isError) {
      if (!node) return;
      node.textContent = message;
      node.classList.remove('hidden');
      node.classList.toggle('error', Boolean(isError));
      node.classList.toggle('verified', !isError);
    }

    function redirectAfterAuth() {
      const nextTarget = getPostAuthTarget();
      window.setTimeout(function () {
        window.location.href = withLanguageParam(nextTarget);
      }, 900);
    }

    document.querySelectorAll('[data-password-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        const targetId = button.getAttribute('data-target');
        const input = targetId ? document.getElementById(targetId) : null;
        if (!input) return;
        const nextType = input.type === 'password' ? 'text' : 'password';
        input.type = nextType;
        button.textContent = nextType === 'password' ? t('Show') : t('Hide');
      });
    });

    if (page === 'login') {
      const form = document.getElementById('login-form');
      const identifierInput = document.getElementById('login-identifier');
      const passwordInput = document.getElementById('login-password');
      const rememberInput = document.getElementById('login-remember');
      const feedback = document.getElementById('login-feedback');
      if (!form || !identifierInput || !passwordInput) return;

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const identifier = String(identifierInput.value || '').trim();
        const identifierEmail = identifier.toLowerCase();
        const identifierPhone = normalizePhone(identifier);
        const password = String(passwordInput.value || '').trim();
        if (!identifier || password.length < 6) {
          showFeedback(feedback, t('Please enter phone/email and password (6+ chars).'), true);
          return;
        }

        const users = readStorage(AUTH_USERS_STORAGE_KEY, []);
        const foundUser = users.find(function (user) {
          const userEmail = String(user.email || '').toLowerCase();
          const userPhone = normalizePhone(user.phone);
          return userEmail === identifierEmail || (Boolean(identifierPhone) && userPhone === identifierPhone);
        });
        const demoUser = (identifierEmail === 'demo@tunihome.tn' || identifierPhone === '+21620000000') && password === '123456'
          ? { name: 'Demo User', email: 'demo@tunihome.tn', phone: '+216 20 000 000', password: password }
          : null;
        const activeUser = foundUser || demoUser;
        if (!activeUser || String(activeUser.password || '') !== password) {
          showFeedback(feedback, t('Invalid phone/email or password.'), true);
          return;
        }

        writeStorage(AUTH_SESSION_STORAGE_KEY, {
          name: activeUser.name || 'TuniHome User',
          email: activeUser.email,
          phone: activeUser.phone || '',
          role: isAdminEmail(activeUser.email) ? 'admin' : String(activeUser.role || 'user'),
          isAdmin: isAdminEmail(activeUser.email),
          remember: rememberInput ? Boolean(rememberInput.checked) : true,
          signedAt: Date.now()
        });
        showFeedback(feedback, t('Login successful. Redirecting...'), false);
        redirectAfterAuth();
      });
    }

    if (page === 'signup') {
      const form = document.getElementById('signup-form');
      const nameInput = document.getElementById('signup-name');
      const phoneInput = document.getElementById('signup-phone');
      const emailInput = document.getElementById('signup-email');
      const passwordInput = document.getElementById('signup-password');
      const confirmInput = document.getElementById('signup-confirm');
      const feedback = document.getElementById('signup-feedback');
      if (!form || !nameInput || !phoneInput || !emailInput || !passwordInput || !confirmInput) return;

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = String(nameInput.value || '').trim();
        const phoneRaw = String(phoneInput.value || '').trim();
        const phone = normalizePhone(phoneRaw);
        const emailRaw = String(emailInput.value || '').trim().toLowerCase();
        const password = String(passwordInput.value || '').trim();
        const confirm = String(confirmInput.value || '').trim();

        if (name.length < 2) {
          showFeedback(feedback, t('Please enter your full name.'), true);
          return;
        }
        if (!phone || phone.length < 8) {
          showFeedback(feedback, t('Please enter a valid phone number.'), true);
          return;
        }
        if (emailRaw && !emailPattern.test(emailRaw)) {
          showFeedback(feedback, t('Please enter a valid email (or leave it empty).'), true);
          return;
        }
        if (password.length < 6 || password !== confirm) {
          showFeedback(feedback, t('Passwords must match and be at least 6 characters.'), true);
          return;
        }

        const syntheticEmail = 'phone-' + phone.replace(/[^0-9]/g, '') + '@tunihome.local';
        const email = emailRaw || syntheticEmail;

        const users = readStorage(AUTH_USERS_STORAGE_KEY, []);
        const filtered = users.filter(function (user) {
          return String(user.email || '').toLowerCase() !== email && normalizePhone(user.phone) !== phone;
        });
        filtered.unshift({
          name: name,
          email: email,
          phone: phoneRaw || phone,
          password: password,
          createdAt: Date.now()
        });
        writeStorage(AUTH_USERS_STORAGE_KEY, filtered.slice(0, 50));
        writeStorage(AUTH_SESSION_STORAGE_KEY, {
          name: name,
          email: email,
          phone: phoneRaw || phone,
          role: isAdminEmail(email) ? 'admin' : 'user',
          isAdmin: isAdminEmail(email),
          signedAt: Date.now()
        });
        const allProfiles = profileSettingsStore();
        if (!allProfiles[email]) {
          allProfiles[email] = {
            name: name,
            phone: phoneRaw || phone,
            avatar: '',
            cover: '',
            bio: '',
            agencyName: name,
            accountType: 'individual',
            requestedAccountType: '',
            verificationStatus: 'not-required',
            verificationDocument: '',
            verificationRequestedAt: 0,
            website: '',
            instagram: '',
            facebook: '',
            linkedin: '',
            proSubscriptionActive: false
          };
          writeStorage(PROFILE_SETTINGS_STORAGE_KEY, allProfiles);
        }

        showFeedback(feedback, t('Account created successfully. Redirecting...'), false);
        redirectAfterAuth();
      });
    }
  }

  function initBaseUI() {
    attachGoToHandlers();
    attachNavSearchHandlers();
    attachSaveHandlers();
    attachCardGalleryHandlers();
    initLanguagePicker();
    initAccountMenu();
    if (getPage() !== 'home') {
      const topbar = document.querySelector('.topbar');
      if (topbar) {
        const sync = function () {
          topbar.classList.toggle('scrolled', window.scrollY > 8);
        };
        sync();
        window.addEventListener('scroll', sync, { passive: true });
      }
    }
  }

  initBaseUI();

  const page = getPage();
  if (page === 'home') initHomePage();
  if (page === 'search') initSearchPage();
  if (page === 'property') initPropertyPage();
  if (page === 'list-property') initListPropertyPage();
  if (page === 'dashboard') initDashboardPage();
  if (page === 'admin') initAdminPage();
  if (page === 'profile') initProfilePage();
  if (page === 'settings') initSettingsPage();
  if (page === 'pro-upgrade') initProUpgradePage();
  if (page === 'my-listings') initMyListingsPage();
  if (page === 'favorites') initFavoritesPage();
  if (page === 'login' || page === 'signup') initAuthPage();
})();
