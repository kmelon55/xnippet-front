interface KeywordDescriptionProps {
  title: string;
  description?: string;
}

export default function KeywordDescription(props: KeywordDescriptionProps) {
  const { title, description } = props;
  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
    </div>
  );
}
