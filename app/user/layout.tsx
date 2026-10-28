import React from "react";

function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="container flex-1 space-y-4 p-8 pt-6  mx-auto">
        {children}
      </div>
    </>
  );
}

export default UserLayout;
