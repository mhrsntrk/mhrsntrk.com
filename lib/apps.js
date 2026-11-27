/**
 * The apps I ship, one entry each. Feeds the app pages (components/AppPage.js),
 * the umbrella privacy policy (pages/apps/privacy.js) and the sitemap.
 *
 * Privacy facts here must match each app's code and, where an app has its own
 * site, its own published policy. Change them together.
 */

/** Copy Center keeps /copy-center because its App Store listing points there. */
function appUrl(app) {
  return app.path || `/apps/${app.slug}`;
}

const APPS = [
  {
    slug: 'copy-center',
    cardIcon: 'copy-center',
    path: '/copy-center',
    privacyHref: '/copy-center/privacy',
    name: 'Copy Center',
    storeName: 'Copy Center: Batch PDF Print',
    icon: '/static/icons/copy-center.png',
    seoTitle: 'Copy Center: Batch Print PDFs on Your Mac',
    seoDescription:
      'Copy Center prints a whole stack of PDFs in one go and follows every job to paper. Auto reads each page on your Mac and picks the right settings per file. Support and FAQ.',
    tagline:
      'Batch print PDFs on your Mac. Drop in a whole folder, press Print, and Copy Center follows every job until it is on paper.',
    meta: 'Free. macOS 15 or later.',
    os: 'macOS 15 or later',
    category: 'UtilitiesApplication',
    appStoreUrl: null,
    email: 'copycenter@mhrsntrk.com',
    portraitShots: false,
    shots: [
      { src: '/static/images/copy-center/printing.jpg', alt: 'Copy Center printing a list of PDFs, with a job in progress and a progress bar' },
      { src: '/static/images/copy-center/auto.jpg', alt: 'Copy Center explaining the settings Auto picked for a lease agreement' },
      { src: '/static/images/copy-center/printer.jpg', alt: 'Copy Center printer tab showing color ink low and black ink at 76 percent' }
    ],
    heroShot: 0,
    sections: [
      {
        title: 'What it does',
        bullets: [
          'Prints PDFs and whole folders of PDFs in list order, one job per file.',
          'One set of default settings for everything, with exceptions for single files and saved print profiles.',
          'Shows every job live: sending, waiting, printing, printed, canceled, with sheet counts and printer messages.',
          'Keeps a print history, watches a folder for new PDFs, and works from Finder and Shortcuts.'
        ]
      },
      {
        title: 'Auto profile',
        body: 'Copy Center looks at every page before it prints: color, scans, blank pages, landscape pages and paper size. It reads scanned pages with on-device text recognition and uses Apple Intelligence on your Mac to tell a contract from a receipt or a boarding pass. Then it picks settings for each file and says why, in plain words. Nothing leaves your Mac.',
        shot: 1
      },
      {
        title: 'Knows your printer',
        body: 'Copy Center reads ink levels and alerts straight from the printer. When color ink runs low, Auto prints in black and white on its own.',
        shot: 2
      },
      {
        title: 'Getting started',
        steps: [
          'Drop PDFs or folders into the window, or press Add Files.',
          'Check the list. A star in the Settings column means Auto picked the settings for that file. Select a file to see why.',
          'Press Print.'
        ]
      }
    ],
    faq: [
      { q: 'A form prints without the answers I typed in.', a: 'Copy Center fills form answers into the page before printing. If a form still prints empty, it may use an old Adobe form format that macOS cannot draw. Open it in Preview, choose File, Export as PDF, and print the exported file.' },
      { q: 'Everything prints in black and white.', a: 'Your printer reports that color ink is low or empty, and Auto switches to black and white to save the print. Open the Printer tab to see the ink levels. You can still set a file to color by hand.' },
      { q: 'The Printer tab says the printer did not answer.', a: 'Ink levels come from the printer over your network. A printer that is off, asleep or connected by USB cannot report them. Printing still works.' },
      { q: 'Auto does not name the document type.', a: 'Document recognition uses Apple Intelligence where it is available. Without it, Copy Center uses built-in rules and still picks settings from what it measures on the pages.' },
      { q: 'How do I add files from Finder?', a: 'Right-click PDFs or a folder in Finder and choose Services, then Add to Copy Center. Or use Open With, Copy Center.' }
    ],
    privacy: {
      summary: 'Copy Center does not collect, store or send any personal data.',
      points: [
        'Your PDFs stay on your Mac. Page analysis, text recognition and document recognition run on your Mac with Apple frameworks. Nothing is uploaded.',
        'When you print, the file goes to the macOS printing system and on to the printer you chose.',
        'Copy Center asks your printer on your local network for ink levels, alerts and loaded paper. That stays in the app.',
        'Print profiles, settings, print history and the watched folder are saved in the app’s own storage on your Mac. Deleting the app removes them.',
        'No account, no analytics, no ads, no tracking.'
      ]
    }
  },
  {
    slug: 'bino-image-search',
    cardIcon: 'bino',
    name: 'Bino: Kids Safe Image Search',
    storeName: 'Bino: Kids Safe Image Search',
    icon: '/static/icons/bino.png',
    seoTitle: 'Bino: Kids Safe Image Search for iPhone and iPad',
    seoDescription:
      'An image search app for young children with SafeSearch locked to strict, no address bar and no links out. Child profiles, voice search and a daily Discover feed.',
    tagline: 'An image search app for young children with SafeSearch locked on and no way out to the open web.',
    meta: 'Free, with an optional Bino Pro subscription. iPhone and iPad. Made for ages 6 to 8.',
    os: 'iOS, iPadOS',
    category: 'EducationalApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6764813350',
    site: { home: 'https://mhrsntrk.github.io/bino-site/', support: 'https://mhrsntrk.github.io/bino-site/support/', label: 'Bino website' },
    email: 'bino@mhrsntrk.com',
    portraitShots: true,
    shots: [
      { src: '/static/images/apps/bino-image-search/1.jpg', alt: 'Bino safety screen: SafeSearch locked on and no links to websites' },
      { src: '/static/images/apps/bino-image-search/2.jpg', alt: 'Bino child profiles, each with its own favorites' }
    ],
    sections: [
      {
        title: 'What it does',
        body: 'Bino lets young children search for pictures by typing or speaking, and browse the results in a Photos-style grid. SafeSearch is fixed at strict, there is no address bar and there are no links to websites.'
      },
      {
        title: 'Features',
        bullets: [
          'Image search with SafeSearch forced to strict on the device and again on the server.',
          'Voice search for children who cannot type yet (Bino Pro).',
          'Child profiles with their own favorites, starred searches and history.',
          'A Photos-like grid and full-screen viewer with pinch to zoom.',
          'Daily Discover topics with kid-safe images.',
          'The parents area and purchases sit behind a parental gate.'
        ]
      }
    ],
    privacy: {
      summary: 'No account, no ads, no analytics or tracking SDKs. Searches go through my server to Brave Search so the app can enforce SafeSearch.',
      points: [
        'Search text, typed or spoken, goes to my server at bino-api.mhrsntrk.com, which runs on Cloudflare. It forces SafeSearch to strict and passes the search to the Brave Search API. Brave receives the search text, not your IP address or any device or profile identifier.',
        'My server sees your IP address and language setting with each request and uses the IP address to limit how many searches one connection can make per minute.',
        'Search results, which include the search text, are cached on Cloudflare for up to 24 hours so repeat searches are not billed again. The cache is not linked to any person or device.',
        'My server keeps daily totals that identify no one: number of searches and feed loads, country, language, and which fixed Discover topic was searched (anything else is counted as other). They are kept for about 100 days and used to pick the next Discover topics.',
        'Thumbnails load from the image service Brave returns. Opening an image full screen or saving a favorite downloads it from the website that hosts the image, which sees your IP address like any web request.',
        'Voice search uses Apple speech recognition. On iOS 17 to 25, if the device cannot recognize a language offline, Apple processes the audio on its servers.',
        'Profiles, favorites, history and starred searches are stored only on the device.',
        'Bino Pro is bought through Apple. I receive no payment details.'
      ]
    }
  },
  {
    slug: 'bino-read-along',
    cardIcon: 'bino-reader',
    name: 'Bino: Kids Read Along',
    storeName: 'Bino: Kids Read Along',
    icon: '/static/icons/bino-reader.png',
    seoTitle: 'Bino Read Along: Help for Early Readers on iPhone and iPad',
    seoDescription:
      'Your child photographs a page of their own book and taps any word to hear it, or sounds it out syllable by syllable. Text recognition and speech run on the device.',
    tagline: 'Your child photographs a page of their own book and taps any word to hear it, or sounds it out syllable by syllable.',
    meta: 'Free, with a one-time Unlimited Reading unlock. iPhone and iPad. Made for ages 6 to 8.',
    os: 'iOS, iPadOS',
    category: 'EducationalApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6788398289',
    site: { home: 'https://mhrsntrk.github.io/bino-site/', label: 'Bino website' },
    email: 'bino@mhrsntrk.com',
    portraitShots: true,
    shots: [
      { src: '/static/images/apps/bino-read-along/1.jpg', alt: 'Bino Read Along: tap a word to hear it out loud' },
      { src: '/static/images/apps/bino-read-along/2.jpg', alt: 'Bino Read Along: sound a word out syllable by syllable' },
      { src: '/static/images/apps/bino-read-along/3.jpg', alt: 'Bino Read Along home screen' }
    ],
    sections: [
      {
        title: 'What it does',
        body: 'Bino Read Along helps early readers who get stuck on words in their own printed books. The child photographs a page, every word becomes tappable, and a tricky word can be broken into syllables and spoken slowly.'
      },
      {
        title: 'Features',
        bullets: [
          'Photograph a book page and every printed word becomes tappable.',
          'Tap a word to hear it read aloud with Apple on-device voices.',
          'Sound it out splits a word into syllables and speaks each one slowly.',
          'English and Spanish pages, with the language detected automatically.',
          'A Words I cracked collection for the child, and reading days for parents behind a gate.',
          'No scores, timers or reading-speed measures.'
        ]
      }
    ],
    privacy: {
      summary: 'Nothing leaves the device except purchases, which Apple handles.',
      points: [
        'Pages are photographed and read on the device. Page images are held in memory only and are not saved.',
        'The Words I cracked collection (each word and how often it was heard) and the reading-day streak are stored only on the device.',
        'The app has no network code of its own. The only outside contact is Apple, for the one-time purchase and the rating prompt.',
        'Purchases, restore and every link out of the app sit behind a parental gate.',
        'No account, no ads, no analytics or tracking.'
      ]
    }
  },
  {
    slug: 'bino-word-safari',
    cardIcon: 'bino-word',
    name: 'Bino: Kids Word Safari',
    storeName: 'Bino: Kids Word Safari',
    icon: '/static/icons/bino-word.png',
    seoTitle: 'Bino Word Safari: Learn Words by Photo Hunt on iPhone and iPad',
    seoDescription:
      'A word-learning scavenger hunt for children: hear a word, then find and photograph the real object. Six languages, works offline, photos are never saved.',
    tagline: 'A word-learning scavenger hunt: your child hears a word, then finds and photographs the real object.',
    meta: 'Free with Level 1; more levels as one-time unlocks. iPhone and iPad. Made for ages 6 to 8.',
    os: 'iOS, iPadOS',
    category: 'EducationalApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6788046866',
    site: { home: 'https://mhrsntrk.github.io/bino-site/', label: 'Bino website' },
    email: 'bino@mhrsntrk.com',
    portraitShots: true,
    shots: [
      { src: '/static/images/apps/bino-word-safari/1.jpg', alt: 'Word Safari: see the word, then find it' },
      { src: '/static/images/apps/bino-word-safari/2.jpg', alt: 'Word Safari celebrating a found word' },
      { src: '/static/images/apps/bino-word-safari/3.jpg', alt: 'Word Safari levels' }
    ],
    sections: [
      {
        title: 'What it does',
        body: 'Word Safari teaches everyday words in English, Turkish, Basque, Spanish, French and German. The child sees and hears a word, then photographs a matching object, and Apple on-device image recognition checks the match.'
      },
      {
        title: 'Features',
        bullets: [
          'Six languages: English, Turkish, Basque, Spanish, French and German.',
          'Three levels of 30 everyday words each.',
          'Recorded audio for every word, bundled with the app.',
          'Photograph the real object and on-device recognition confirms the match.',
          'Hints and skip when stuck; missed words come back later.',
          'Works offline. Purchases and links out sit behind a parental gate.'
        ]
      }
    ],
    privacy: {
      summary: 'Nothing leaves the device except purchases, which Apple handles.',
      points: [
        'Photos are checked on the device and never saved.',
        'Found words, the review schedule, the chosen languages and the streak are stored only on the device.',
        'The app has no network code of its own. The only outside contact is Apple, for level unlocks and the rating prompt.',
        'Purchases, restore and every link out of the app sit behind a parental gate.',
        'No account, no ads, no analytics or tracking.'
      ]
    }
  },
  {
    slug: 'palmares',
    cardIcon: 'palmares',
    name: 'Palmares',
    storeName: 'Palmares: Car Service History',
    icon: '/static/icons/palmares.png',
    seoTitle: 'Palmares: Car Service History and Receipts on iPhone',
    seoDescription:
      'Turn the folder of receipts that came with your car into a searchable service history, with every entry marked by the proof behind it, and export one PDF dossier.',
    tagline: 'A service history for your car where every entry shows whether a receipt backs it.',
    meta: 'Free for one car; a one-time unlock adds every car and the PDF dossier. iPhone and iPad.',
    os: 'iOS, iPadOS',
    category: 'LifestyleApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6799980228',
    site: { home: 'https://getpalmares.com', support: 'https://getpalmares.com/support', label: 'getpalmares.com' },
    email: 'support@getpalmares.com',
    portraitShots: true,
    shots: [
      { src: '/static/images/apps/palmares/1.jpg', alt: 'Palmares garage with service files for each car' },
      { src: '/static/images/apps/palmares/2.jpg', alt: 'Palmares entries marked by the proof behind them' },
      { src: '/static/images/apps/palmares/3.jpg', alt: 'Palmares PDF dossier' }
    ],
    sections: [
      {
        title: 'What it does',
        body: 'Palmares turns the folder of receipts that came with a car into a searchable service history. Receipts, previous owners’ summary sheets and workshop PDFs are read on the iPhone, and the whole history exports as one PDF dossier for a buyer, insurer or specialist.'
      },
      {
        title: 'Features',
        bullets: [
          'Photograph a receipt and the date, workshop, odometer reading and total are read on the device.',
          'Entries are marked receipted, transcribed or stated, depending on the proof attached.',
          'A previous owner’s summary sheet files every row at once; receipts attach later as proof.',
          'The odometer is kept as a series that flags readings going backwards and unusual jumps.',
          'One PDF dossier with the timeline, odometer series and every scan behind it.',
          'Syncs through your own iCloud; no account.'
        ]
      }
    ],
    privacy: {
      summary: 'Your records sync through your own iCloud. Some images go to an AI service through my server, described below. No ads, no analytics in the app.',
      points: [
        'Cars, documents, page images, service events and photos are stored on the device and synced through your iCloud private database. This is on by default and can be turned off. I cannot read it.',
        'When on-device reading of a document is weak, you can tap to ask for a closer read. Up to five page images, as captured, go to my server on Cloudflare and on to OpenRouter and Google Gemini. This only happens when you tap, and is not offered when AI assistance is turned off in Settings.',
        'When you take or choose a photo of your car while adding it, the photo goes the same way, to identify the make, model and year. This happens as soon as the photo is chosen and is not controlled by the AI assistance setting. The photo may show the number plate.',
        'To count AI reads, the app sends a random identifier that syncs through your iCloud Keychain. Purchases are verified by my server from Apple-signed receipts, and my server keeps the purchases linked to that identifier, an Apple device check record and usage counters.',
        'Whether OpenRouter or Google keep the images is governed by their own policies; the app does not set a retention preference.',
        'No account, no ads, no analytics or tracking SDKs in the app.'
      ]
    }
  },
  {
    slug: 'nonna',
    cardIcon: 'nonna',
    name: 'Nonna',
    storeName: 'Nonna: Reminders & Habits',
    icon: '/static/icons/nonna.png',
    seoTitle: 'Nonna: Reminders and Habit Nudges in Your Mac Notch',
    seoDescription:
      'Personal reminders and healthy-habit nudges from a small Italian grandma who lives in your Mac’s notch. Type reminders in plain words; everything stays on your Mac.',
    tagline: 'Personal reminders and healthy-habit nudges from a small Italian grandma who lives in your Mac’s notch.',
    meta: 'Free 7-day trial, then a one-time purchase. Mac.',
    os: 'macOS',
    category: 'ProductivityApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6812915626',
    site: { home: 'https://withnonna.com', support: 'https://withnonna.com/support', label: 'withnonna.com' },
    email: 'hello@withnonna.com',
    portraitShots: false,
    shots: [
      { src: '/static/images/apps/nonna/1.jpg', alt: 'Nonna in the Mac notch with a reminder' },
      { src: '/static/images/apps/nonna/2.jpg', alt: 'Typing a reminder for Nonna in plain words' },
      { src: '/static/images/apps/nonna/3.jpg', alt: 'Nonna habit settings for water, walking and eye breaks' }
    ],
    heroShot: 0,
    sections: [
      {
        title: 'What it does',
        body: 'Nonna sits in the Mac’s notch and appears when a reminder is due or when you click her. Type a reminder in plain words such as Call Mum tomorrow at 6 pm, confirm the time she understood, and set recurring habits like water, walking and eye breaks.',
        shot: 1
      },
      {
        title: 'Features',
        bullets: [
          'Type reminders in natural language and confirm the time before saving.',
          'Water, walking and eye-break habits, or your own, with a custom icon and interval.',
          'Missed personal reminders wait for you; missed habits start fresh.',
          'A Focus Filter keeps automatic nudges quiet during linked Focus modes.',
          'Optional on-device Apple Intelligence for personal wording and time parsing.',
          'Works with or without a notch.'
        ],
        shot: 2
      }
    ],
    privacy: {
      summary: 'Everything stays on your Mac. The App Store edition makes no network requests of its own.',
      points: [
        'Reminders, habits and preferences are stored on your Mac.',
        'Apple Intelligence, when you turn it on, runs on your Mac.',
        'Nonna follows the pointer on screen but records nothing.',
        'The only outside contact is Apple, for the free trial and the one-time purchase. I receive no payment details.',
        'No account, no ads, no analytics or tracking. This covers the Mac App Store edition; withnonna.com describes any other edition.'
      ]
    }
  },
  {
    slug: 'tramontana',
    cardIcon: 'tramontana',
    name: 'Tramontana',
    storeName: 'Tramontana: Wildfire Radar',
    icon: '/static/icons/tramontana.png',
    seoTitle: 'Tramontana: Route Weather and Wildfires Ahead on iPhone',
    seoDescription:
      'Weather along your driving route at the hour you reach each point, with satellite-detected wildfires on the same line. No account, no analytics, no developer servers.',
    tagline: 'Weather along your driving route at the hour you reach each point, with active wildfires on the same line.',
    meta: 'Free, no in-app purchases. iPhone and iPad.',
    os: 'iOS, iPadOS',
    category: 'TravelApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6802674657',
    site: { home: 'https://mhrsntrk.github.io/tramontana-site/', support: 'https://mhrsntrk.github.io/tramontana-site/support/', label: 'Tramontana website' },
    email: 'tramontana@mhrsntrk.com',
    sections: [
      {
        title: 'What it does',
        body: 'Tramontana reads the forecast along a driving route for the time you will actually arrive at each point, and marks satellite-detected wildfires near the road. Drag the departure time and the whole route is read again. It is not an emergency service.'
      },
      {
        title: 'Features',
        bullets: [
          'Forecast at your arrival time for points about every 20 km along the route.',
          'Fog, rain, snow, ice and wind drawn on the road with a severity from 1 to 5, shown as number, color and pattern.',
          'Active wildfire detections from NASA FIRMS near the route, each with its age.',
          'Drag the time ruler to compare departure times.',
          'No account, no sign in, no analytics and no developer servers.'
        ]
      }
    ],
    privacy: {
      summary: 'No account and no developer servers. Location goes to the weather and map services that need it, as described below.',
      points: [
        'Location is used only while the app is open. You can type a starting point instead.',
        'Points along your route, rounded to about 100 meters, go to the Norwegian Meteorological Institute (MET Norway) for the forecast. The first point is your start, which is your current location if you use it.',
        'Your exact start and destination go to Apple Maps to calculate the route, and the text you type to search for a place goes to Apple as you type.',
        'Wildfire data is a public list downloaded from NASA FIRMS and filtered on the phone. NASA receives nothing about you.',
        'Each of these services sees your IP address, like any web request.',
        'Routes, places and location history are not saved. Forecasts and fires are cached in memory only.',
        'No ads, no analytics or tracking.'
      ]
    }
  },
  {
    slug: 'light-wallet',
    cardIcon: 'lightwallet',
    name: 'Light SSI Wallet',
    storeName: 'Light SSI Wallet',
    icon: '/static/icons/lightwallet.png',
    seoTitle: 'Light SSI Wallet: OpenID4VCI and OpenID4VP Wallet for iPhone',
    seoDescription:
      'A small digital identity wallet for developers that receives, stores and presents verifiable credentials over OpenID4VCI 1.0 and OpenID4VP 1.0, with SD-JWT selective disclosure.',
    tagline: 'A small digital identity wallet that receives, stores and presents verifiable credentials using the OpenID4VCI and OpenID4VP standards.',
    meta: 'Free. iPhone.',
    os: 'iOS',
    category: 'DeveloperApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6755690506',
    email: 'lightwallet@mhrsntrk.com',
    sections: [
      {
        title: 'What it does',
        body: 'Light Wallet receives verifiable credentials from issuers that support OpenID for Verifiable Credential Issuance 1.0 and presents them to verifiers over OpenID for Verifiable Presentations 1.0. It is built as a practical wallet for trying real issuer and verifier flows.'
      },
      {
        title: 'Features',
        bullets: [
          'Scan a credential offer to receive a credential, with pre-authorized code, authorization code and deferred issuance.',
          'Scan a verifier request, see who is asking, choose a credential and approve before anything is sent.',
          'Selective disclosure for SD-JWT VC credentials: only the claims you approve are revealed.',
          'A did:key identifier with a P-256 key kept in the iOS Keychain, protected by Face ID or Touch ID when available.',
          'Password-encrypted backup and restore through the share sheet.',
          'English, Spanish and Turkish.'
        ]
      }
    ],
    privacy: {
      summary: 'No account and no developer server in the app’s flows. Data goes only to the issuers and verifiers you choose.',
      points: [
        'When you receive a credential, the app talks to the issuer named in the offer you scanned, and sends a proof signed with your wallet key, which includes your wallet identifier.',
        'When you present a credential, the app sends it to the verifier you scanned, only after you approve on the consent screen. For SD-JWT credentials only the claims you approve are revealed; other formats are sent whole.',
        'Credentials, their details and the list of verifiers you presented to are stored in the app’s database on your iPhone. The wallet key is kept in the iOS Keychain, protected by Face ID or Touch ID when available. The same wallet key and identifier are used for every credential until you reset the wallet.',
        'The app keeps a local log of warnings and errors, including request addresses. It stays on the device unless you export it.',
        'Backups are encrypted with your password and go only where you send them from the share sheet.',
        'No ads, no analytics or tracking, no in-app purchases.'
      ]
    }
  },
  {
    slug: 'landline',
    cardIcon: 'landline',
    name: 'Landline',
    storeName: 'Landline: Tailscale SSH',
    icon: '/static/icons/landline.png',
    seoTitle: 'Landline: A Terminal for Your Own Machines over Tailscale',
    seoDescription:
      'A terminal on iPhone and iPad for your own Mac, Linux and Windows machines over your Tailscale network. No SSH keys, no open ports, sessions that survive lost signal.',
    tagline: 'A terminal on your iPhone and iPad for the machines you already own, reached over your own Tailscale network.',
    meta: 'Free 7-day trial, then a one-time unlock. iPhone and iPad. The landlined daemon is free and open source.',
    os: 'iOS, iPadOS',
    category: 'DeveloperApplication',
    appStoreUrl: 'https://apps.apple.com/app/id6808344753',
    site: { home: 'https://github.com/mhrsntrk/landline', support: 'https://github.com/mhrsntrk/landline/issues', label: 'Source on GitHub' },
    email: 'landline@mhrsntrk.com',
    portraitShots: true,
    shots: [
      { src: '/static/images/apps/landline/1.jpg', alt: 'Landline terminal session on iPhone' },
      { src: '/static/images/apps/landline/2.jpg', alt: 'Landline list of machines and sessions' },
      { src: '/static/images/apps/landline/3.jpg', alt: 'Landline tmux-aware key bar' }
    ],
    sections: [
      {
        title: 'What it does',
        body: 'Landline pairs an iOS app with landlined, a small open source daemon you run on your Mac, Linux or Windows machine. The app opens a real shell on any of them over your tailnet, with no SSH keys, no open ports, no account and no server in between. Sessions stay alive on the machine, so you can lock the phone, lose signal and pick up where you left off.'
      },
      {
        title: 'Features',
        bullets: [
          'A real shell on your own machines over Tailscale.',
          'Sessions that survive network changes, with scrollback replayed when you come back.',
          'A tmux-aware key bar with a per-machine leader key and custom keys.',
          'Nine color schemes, true color and a bundled Nerd Font.',
          'Send a photo or file from the phone to the machine, and receive files a machine offers.',
          'An optional unlock secret per machine and a Face ID gate.'
        ]
      }
    ],
    privacy: {
      summary: 'Everything goes only to your own machines over your own tailnet. Nothing goes to me.',
      points: [
        'Terminal input and output, session controls and the files you send go only to your own machine running landlined, over Tailscale. TLS is on by default for each machine and can be turned off, in which case only Tailscale’s WireGuard encryption protects the traffic.',
        'Landline uses the separately installed Tailscale app to reach your machines; Tailscale’s own policy covers that.',
        'Machines, settings, the key bar and snippets are stored in the app on the device, and are included in your own device backups. The optional unlock secret is kept in the iOS Keychain on this device only; the daemon stores only a hash of it.',
        'The daemon listens only on the machine itself behind tailscale serve and makes no calls home. It keeps scrollback in memory, deletes received uploads after 72 hours, and its logs record logins, upload paths and session identifiers but not terminal content.',
        'The trial and unlock are handled by Apple.',
        'No account, no ads, no analytics, crash reporting or telemetry.'
      ]
    }
  }
];

module.exports = { APPS, appUrl };
