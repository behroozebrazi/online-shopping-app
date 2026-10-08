import Header from "@/components/shared/header";
import Footer from "@/components/footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 max-w-7xl w-full py-5 px-10 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
