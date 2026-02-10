import Splash from "./_components/splash";

export default  function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Splash>
      {children}
    </Splash>
  );
}
