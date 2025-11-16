import { setRequestLocale } from 'next-intl/server';

export default async function ToolsLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // Minimal layout for standalone tool pages
  return <>{props.children}</>;
}
