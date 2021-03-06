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
      <div className="flex items-center border border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 rounded p-4">
        {icon == 'crypto' && (
          <div className="ml-2 mr-4">
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
        {icon == 'kutt' && (
          <div className="ml-2 mr-4">
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
        {icon == 'auth' && (
          <div className="ml-2 mr-4">
            <span className="sr-only">{title}</span>
            <Image
                  alt={icon}
                  height={width}
                  width={height}
                  src="/static/icons/auth.png"
                  className=""
                />
          </div>
        )}
        {icon == 'qrcode' && (
          <div className="ml-2 mr-4">
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
        <div>
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
