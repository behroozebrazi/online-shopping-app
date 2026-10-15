export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center min-h-screen w-full">{children}</div>
  );
}
