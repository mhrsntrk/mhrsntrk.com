import Image from 'next/image';

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

const icons = {
  crypto: { src: '/static/icons/coinpaprika.png', alt: 'Crypto ticker tool icon' },
  starmap: { src: '/static/icons/starmap.png', alt: 'Starmap generator tool icon' },
  qrcode: { src: '/static/icons/qrcode.png', alt: 'QR code generator tool icon' },
  fingerprint: { src: '/static/icons/fingerprint.png', alt: 'DID resolver tool icon' },
  ens: { src: '/static/icons/ens.png', alt: 'ENS resolver tool icon' },
  'fortune-cookie': {
    src: '/static/icons/fortunecookie.png',
    alt: 'Fortune cookie VC tool icon'
  },
  vulgate: {
    src: '/static/icons/vulgate.png',
    alt: 'The Vulgate corpus icon, a section sign on a catalogue card'
  },
  bino: {
    src: '/static/icons/bino.png',
    alt: 'Bino kids safe image search app icon',
    className: 'rounded-2xl'
  },
  'bino-reader': {
    src: '/static/icons/bino-reader.png',
    alt: 'Bino Kids Read Along app icon',
    className: 'rounded-2xl'
  },
  lightwallet: {
    src: '/static/icons/lightwallet.png',
    alt: 'Light Wallet SSI developer wallet app icon',
    className: 'rounded-2xl'
  }
};

export default function SwissKnifeCard({
  title,
  description,
  href,
  icon,
  width,
  height,
  target
}) {
  const iconConfig = icons[icon];

  return (
    <a
      className="block mb-4 hover:shadow"
      href={href}
      aria-label={title}
      target={target}
      rel="noopener noreferrer"
    >
      <div className="flex items-center p-4 border border-gray-200 rounded md:h-40 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500">
        {iconConfig && (
          <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 mr-4 sm:w-20 sm:h-20">
            <span className="sr-only">{title}</span>
            <Image
              alt={`${title} - ${iconConfig.alt}`}
              height={height}
              width={width}
              src={iconConfig.src}
              className={`object-contain w-full h-full ${iconConfig.className || ''}`}
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        )}
        <div className="min-w-0">
          <h4 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg dark:text-gray-100">
            {title}
          </h4>
          <p className="text-sm leading-5 text-gray-700 sm:text-base dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
