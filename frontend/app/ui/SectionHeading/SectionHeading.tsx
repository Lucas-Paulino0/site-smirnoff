type SectionHeadingProps = {
  title: string;
  subtitle?: React.ReactNode;
  as?: "h1" | "h2";
};

export default function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className="page-header">
      <Tag className="title">{title}</Tag>
      <div className="divider">
        <span />
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
