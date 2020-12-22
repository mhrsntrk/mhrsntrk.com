import markdownStyles from './markdown-styles.module.css';

export default function Gear({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 w-full">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
