export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-col h-screen">
      Root Layout
      <main className="flex-1 max-w-7xl py-5 px-10 w-full">{children}</main>
    </div>
  );
}
