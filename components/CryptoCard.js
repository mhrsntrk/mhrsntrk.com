import format from 'comma-number';

export default function MetricCard({ name, symbol, price, change, ath }) {
  const formattedPrice = format(price);
  const formattedATH = format(ath);
  return (
    <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4">
      <div className="flex items-center text-gray-900 dark:text-gray-100">
        <span className="text-md">{name}</span>
        <span className="text-sm">&nbsp;&nbsp;&#40;{symbol}&#41;</span>
      </div>
      <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
        <span>${formattedPrice || '-'}</span>
        <span
          className={
            change < 0
              ? 'text-red-500 px-4 py-4 text-center text-sm'
              : 'text-green-500 px-4 py-4 text-center text-sm'
          }
        >
          &nbsp;&nbsp;{change}%
        </span>
      </p>
      <p className="mt-4 text-sm spacing-sm text-black dark:text-white">
        <span >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            stroke="currentColor"
            className="inline top-3 h-5 w-5"
          >
            <path d="M437.65 348.588l-49.086 58.904-117.53-204.324v-56.121h100.227V36.796H240.966v166.372L123.435 407.49 74.35 348.587 0 458.341l24.895 16.863 51.937-76.67 51.142 61.369 63.5-110.393A270.23 270.23 0 00256 357.336c21.659 0 43.319-2.612 64.526-7.826l63.5 110.393 51.141-61.369 51.938 76.67L512 458.341l-74.35-109.753zM271.034 66.865h70.159v50.114h-70.159V66.865zM207.16 322.241L256 237.335l48.84 84.906a240.036 240.036 0 01-97.68 0z" />
          </svg>
        </span>
        <span>&nbsp;&nbsp;${formattedATH || '-'}</span>
      </p>
    </div>
  );
}
