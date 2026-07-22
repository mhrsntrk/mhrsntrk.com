import styles from '@/components/ReportCover.module.css';

/**
 * The cover shown for a report in the /reports list.
 *
 * Built entirely from registry fields, so a new report gets one with no extra
 * file and no code change. `sector`, `period` and `stats` are all optional:
 * sector falls back to the report's first tag, period to the publication year,
 * and a report with no stats gets the quieter tag strip instead of an empty
 * band.
 */
export default function ReportCover({ report }) {
  const sector = report.sector || report.tags[0] || 'Research note';
  const period = report.period || new Date(report.date).getFullYear();
  const stats = report.stats || [];

  return (
    <div className={styles.cover} aria-hidden="true">
      <div className={styles.head}>
        <span className={styles.sector}>{sector}</span>
        <span className={styles.period}>{period}</span>
      </div>

      {stats.length > 0 ? (
        <div className={styles.stats}>
          {stats.slice(0, 4).map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.quiet}>
          {report.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
