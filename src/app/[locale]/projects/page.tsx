import { ProjectSection } from '@/components/landing/project-section';

interface ProjectPagesProps {
  params: {
    slug: string[];
    locale: string;
  };
}

export default async function ProjectsPage({ params }: ProjectPagesProps) {
  return (
    <div className="w-full py-20">
      <ProjectSection locale={params.locale} />
    </div>
  );
}
