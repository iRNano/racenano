// components/DefaultLayout.tsx
interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
