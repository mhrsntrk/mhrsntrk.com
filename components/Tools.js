import markdownStyles from './markdown-styles.module.css';

export default function Tools({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full mb-8">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
