import Image from 'next/image';

export default function SwissKnifeCard({ title, description, href, icon, width, height }) {
  return (
    <a
      className="mb-4 hover:shadow"
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center h-40 p-4 border border-gray-200 rounded dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500">
        {icon == 'crypto' && (
          <div className="ml-2 mr-4 min-w-xxs max-w-xxs">
            <span className="sr-only">{title}</span>
            <Image
                  alt={icon}
                  height={width}
                  width={height}
                  src="/static/icons/coinpaprika.png"
                  className=""
                />
          </div>
        )}
        {icon == 'starmap' && (
          <div className="ml-2 mr-4 min-w-xxs max-w-xxs">
            <span className="sr-only">{title}</span>
            <Image
                  alt={icon}
                  height={width}
                  width={height}
                  src="/static/icons/starmap.png"
                  className=""
                />
          </div>
        )}
        {icon == 'kutt' && (
          <div className="ml-2 mr-4 min-w-xxs max-w-xxs">
            <span className="sr-only">{title}</span>
            <Image
                  alt={icon}
                  height={width}
                  width={height}
                  src="/static/icons/kutt.png"
                  className=""
                />
          </div>
        )}
        {icon == 'qrcode' && (
          <div className="ml-2 mr-4 min-w-xxs max-w-xxs">
            <span className="sr-only">{title}</span>
            <Image
                  alt={icon}
                  height={width}
                  width={height}
                  src="/static/icons/qrcode.png"
                  className=""
                />
          </div>
        )}
        {icon == 'fingerprint' && (
          <div className="ml-2 mr-4 min-w-xxs max-w-xxs">
            <span className="sr-only">{title}</span>
            <Image
                  alt={icon}
                  height={width}
                  width={height}
                  src="/static/icons/fingerprint.png"
                  className=""
                />
          </div>
        )}
        {icon == 'ens' && (
          <div className="ml-2 mr-4 min-w-xxs max-w-xxs">
            <span className="sr-only">{title}</span>
            <Image
                  alt={icon}
                  height={width}
                  width={height}
                  src="/static/icons/ens.png"
                  className=""
                />
          </div>
        )}
        <div className="ml-4">
          <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          <p className="leading-5 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
