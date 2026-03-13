interface Props {
  title: string;
  description: string;
  id: string;
}

const SectionHeader = ({ title, description, id }: Props) => (
  <div id={id} className="mb-8 scroll-mt-8">
    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>
    <div className="mt-4 h-px bg-border" />
  </div>
);

export default SectionHeader;
