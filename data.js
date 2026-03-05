(function () {
  const STORAGE_KEYS = {
    recentSearches: 'tunihome_recent_searches',
    viewedListings: 'tunihome_viewed_listings',
    listedProperties: 'tunihome_listed_properties',
    savedListings: 'tunihome_saved_listings',
    savedAgencies: 'tunihome_saved_agencies',
    userPreferences: 'tunihome_user_preferences'
  };

  const professionals = [
    {
      id: 'pro-aurora',
      name: 'Aurora Living Tunisia',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=160&q=80',
      cover: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1800&q=80',
      bio: 'Boutique agency focused on modern villas and premium rentals in Grand Tunis and coastal zones.',
      rating: 4.8,
      reviews: 184,
      verified: true,
      phone: '+216 21 400 211',
      whatsapp: 'https://wa.me/21621400211',
      website: 'https://aurora-living.example.com',
      instagram: 'https://www.instagram.com/auroralivingtn',
      facebook: 'https://www.facebook.com/auroralivingtn',
      linkedin: 'https://www.linkedin.com/company/aurora-living-tn',
      badge: 'Luxury Specialist'
    },
    {
      id: 'pro-medina',
      name: 'Medina Keys Agency',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
      cover: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80',
      bio: 'Experienced team for city apartments, student rentals, and family homes across Tunis and Ariana.',
      rating: 4.6,
      reviews: 97,
      verified: true,
      phone: '+216 55 118 909',
      whatsapp: 'https://wa.me/21655118909',
      website: 'https://medinakeys.example.com',
      instagram: 'https://www.instagram.com/medinakeys',
      facebook: 'https://www.facebook.com/medinakeysagency',
      linkedin: 'https://www.linkedin.com/company/medina-keys',
      badge: 'Urban Rentals'
    },
    {
      id: 'pro-sea',
      name: 'SeaSide Stays',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      cover: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
      bio: 'Short-term and vacation homes in Hammamet, Sousse, and Djerba designed for diaspora and summer guests.',
      rating: 4.9,
      reviews: 233,
      verified: true,
      phone: '+216 27 900 443',
      whatsapp: 'https://wa.me/21627900443',
      website: 'https://seasidestays.example.com',
      instagram: 'https://www.instagram.com/seasidestays.tn',
      facebook: 'https://www.facebook.com/seasidestays.tn',
      linkedin: 'https://www.linkedin.com/company/seaside-stays-tn',
      badge: 'Vacation Homes'
    }
  ];

  const listings = [
    {
      id: 'darna-101',
      title: 'Modern Villa with Garden',
      location: 'La Marsa, Tunis',
      category: 'sale',
      type: 'villa',
      price: 1250000,
      currency: 'TND',
      priceLabel: '1,250,000 TND',
      rooms: 5,
      baths: 3,
      surface: 420,
      verified: true,
      professionalId: 'pro-aurora',
      availability: 'Immediate',
      description: 'A contemporary detached villa with landscaped garden, private parking, and premium finishing.',
      amenities: ['Garden', 'Parking', 'Central heating', 'Security system'],
      coordinates: { lat: 36.889, lng: 10.327 },
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-102',
      title: 'City Apartment Near Universities',
      location: 'El Manar, Tunis',
      category: 'long',
      type: 'apartment',
      price: 1800,
      currency: 'TND',
      priceLabel: '1,800 TND / month',
      rooms: 3,
      baths: 1,
      surface: 110,
      verified: true,
      professionalId: 'pro-medina',
      availability: 'From March 2026',
      description: 'Bright apartment ideal for families or professionals, close to transport and schools.',
      amenities: ['Balcony', 'Elevator', 'Fiber internet'],
      rentTags: ['family', 'couple'],
      coordinates: { lat: 36.82, lng: 10.145 },
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-103',
      title: 'Beachfront Summer Home',
      location: 'Hammamet, Nabeul',
      category: 'short',
      type: 'villa',
      price: 650,
      currency: 'TND',
      priceLabel: '650 TND / night',
      rooms: 4,
      baths: 2,
      surface: 260,
      verified: true,
      professionalId: 'pro-sea',
      availability: 'Summer 2026',
      description: 'Stylish holiday villa with pool, walking distance to the beach, great for family vacations.',
      amenities: ['Pool', 'Sea view', 'Wi-Fi', 'Outdoor dining'],
      coordinates: { lat: 36.405, lng: 10.622 },
      images: [
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-104',
      title: 'Cozy Studio for Young Professionals',
      location: 'Lac 2, Tunis',
      category: 'long',
      type: 'studio',
      price: 1250,
      currency: 'TND',
      priceLabel: '1,250 TND / month',
      rooms: 1,
      baths: 1,
      surface: 48,
      verified: false,
      professionalId: null,
      ownerName: 'Sami Ben Amor',
      ownerAvatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=160&q=80',
      availability: 'Immediate',
      description: 'Compact studio in a secure residence with modern kitchen and access to nearby business hubs.',
      amenities: ['Security', 'Air conditioning'],
      rentTags: ['students', 'couple'],
      coordinates: { lat: 36.843, lng: 10.279 },
      images: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-105',
      title: 'Family Apartment with Terrace',
      location: 'Ariana Ville, Ariana',
      category: 'sale',
      type: 'apartment',
      price: 420000,
      currency: 'TND',
      priceLabel: '420,000 TND',
      rooms: 4,
      baths: 2,
      surface: 175,
      verified: true,
      professionalId: 'pro-medina',
      availability: 'Immediate',
      description: 'Spacious apartment with a large terrace, natural light, and quick access to central routes.',
      amenities: ['Terrace', 'Parking', 'Storage room'],
      coordinates: { lat: 36.866, lng: 10.193 },
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-106',
      title: 'Djerba Holiday Apartment',
      location: 'Houmt Souk, Djerba',
      category: 'short',
      type: 'apartment',
      price: 290,
      currency: 'TND',
      priceLabel: '290 TND / night',
      rooms: 2,
      baths: 1,
      surface: 85,
      verified: true,
      professionalId: 'pro-sea',
      availability: 'Weekends + Summer',
      description: 'Comfortable vacation apartment for couples and small families, close to cafes and beach routes.',
      amenities: ['Wi-Fi', 'AC', 'Parking'],
      coordinates: { lat: 33.875, lng: 10.858 },
      images: [
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-107',
      title: 'Independent House with Patio',
      location: 'Sfax Ville, Sfax',
      category: 'sale',
      type: 'house',
      price: 365000,
      currency: 'TND',
      priceLabel: '365,000 TND',
      rooms: 4,
      baths: 2,
      surface: 220,
      verified: false,
      professionalId: null,
      ownerName: 'Amina Trabelsi',
      ownerAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=160&q=80',
      availability: 'Immediate',
      description: 'Well-maintained house with internal patio and potential for small office conversion.',
      amenities: ['Patio', 'Solar water heater'],
      coordinates: { lat: 34.741, lng: 10.76 },
      images: [
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-108',
      title: 'Room in Shared Apartment',
      location: 'Sahloul, Sousse',
      category: 'long',
      type: 'room',
      price: 520,
      currency: 'TND',
      priceLabel: '520 TND / month',
      rooms: 1,
      baths: 1,
      surface: 22,
      verified: true,
      professionalId: null,
      ownerName: 'Nour Labidi',
      ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      availability: 'From April 2026',
      description: 'Private furnished room in a calm apartment near hospital and public transport.',
      amenities: ['Furnished', 'Internet', 'Shared kitchen'],
      rentTags: ['students', 'group'],
      coordinates: { lat: 35.836, lng: 10.608 },
      images: [
        'https://images.unsplash.com/photo-1630699144867-37acec97df5a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616594039964-3e5c4a64c5a4?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-109',
      title: 'Contemporary Penthouse',
      location: 'Les Berges du Lac, Tunis',
      category: 'sale',
      type: 'apartment',
      price: 890000,
      currency: 'TND',
      priceLabel: '890,000 TND',
      rooms: 5,
      baths: 3,
      surface: 305,
      verified: true,
      professionalId: 'pro-aurora',
      availability: 'Immediate',
      description: 'Penthouse with panoramic terrace, elegant interior, and direct access parking.',
      amenities: ['Panoramic terrace', 'Smart home', '2 parking spots'],
      coordinates: { lat: 36.839, lng: 10.267 },
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1617104551722-3b2d513664c2?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-110',
      title: 'Cap Bon Vacation Bungalow',
      location: 'Kelibia, Nabeul',
      category: 'short',
      type: 'house',
      price: 430,
      currency: 'TND',
      priceLabel: '430 TND / night',
      rooms: 3,
      baths: 2,
      surface: 140,
      verified: true,
      professionalId: 'pro-sea',
      availability: 'All year',
      description: 'Warm and airy bungalow for weekend escapes with a short drive to sandy beaches.',
      amenities: ['Garden', 'BBQ', 'Family friendly'],
      coordinates: { lat: 36.847, lng: 11.093 },
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753051-f0b90dd4e67f?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-111',
      title: 'Business District Condo',
      location: 'Centre Urbain Nord, Tunis',
      category: 'long',
      type: 'condo',
      price: 2100,
      currency: 'TND',
      priceLabel: '2,100 TND / month',
      rooms: 3,
      baths: 2,
      surface: 128,
      verified: true,
      professionalId: 'pro-medina',
      availability: 'Immediate',
      description: 'Modern condo suited for executives with high-end finishes and secure residence services.',
      amenities: ['Concierge', 'Elevator', 'Covered parking'],
      rentTags: ['couple', 'family'],
      coordinates: { lat: 36.84, lng: 10.196 },
      images: [
        'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    {
      id: 'darna-112',
      title: 'Quiet Villa in Menzah',
      location: 'El Menzah 9, Tunis',
      category: 'sale',
      type: 'villa',
      price: 760000,
      currency: 'TND',
      priceLabel: '760,000 TND',
      rooms: 6,
      baths: 3,
      surface: 360,
      verified: false,
      professionalId: null,
      ownerName: 'Hatem Jaziri',
      ownerAvatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=160&q=80',
      availability: 'Negotiable',
      description: 'Spacious family villa on a calm street with private garage and mature trees.',
      amenities: ['Garage', 'Garden', 'Guest room'],
      coordinates: { lat: 36.854, lng: 10.163 },
      images: [
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1495435229349-e86db7bfa013?auto=format&fit=crop&w=1200&q=80'
      ]
    }
  ];

  function getProfessionalById(id) {
    return professionals.find(function (item) {
      return item.id === id;
    }) || null;
  }

  function getListingById(id) {
    return listings.find(function (item) {
      return item.id === id;
    }) || null;
  }

  function getOwnerForListing(listing) {
    if (listing.professionalId) {
      const professional = getProfessionalById(listing.professionalId);
      if (professional) {
        return {
          id: professional.id,
          name: professional.name,
          avatar: professional.avatar,
          professional: true,
          rating: professional.rating,
          reviews: professional.reviews,
          verified: professional.verified,
          bio: professional.bio,
          phone: professional.phone,
          whatsapp: professional.whatsapp
        };
      }

      return {
        id: listing.professionalId,
        name: listing.ownerName || 'Professional Account',
        avatar: listing.ownerAvatar || 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=160&q=80',
        professional: true,
        rating: 4.5,
        reviews: 0,
        verified: listing.verified,
        bio: listing.ownerBio || 'New professional account',
        phone: '+216 20 000 000',
        whatsapp: 'https://wa.me/21620000000'
      };
    }

    return {
      id: 'owner-' + listing.id,
      name: listing.ownerName || 'Private Owner',
      avatar: listing.ownerAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
      professional: false,
      rating: 4.2,
      reviews: 18,
      verified: listing.verified,
      bio: 'Direct owner account',
      phone: '+216 20 000 000',
      whatsapp: 'https://wa.me/21620000000'
    };
  }

  window.TUNIHOME_DATA = {
    STORAGE_KEYS: STORAGE_KEYS,
    professionals: professionals,
    listings: listings,
    getProfessionalById: getProfessionalById,
    getListingById: getListingById,
    getOwnerForListing: getOwnerForListing
  };
  window.DARNA_DATA = window.TUNIHOME_DATA;
})();
