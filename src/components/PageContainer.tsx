import HeadSection from "./HeadSection";

export default function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <>
      <HeadSection />
      {children}
    </>
  );
}
