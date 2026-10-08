import "server-only";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

function Footer() {
  const currentYear = getCurrentYear();

  return (
    <footer className="border-t">
      <div className="p-5 text-center">
        © {currentYear} Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
