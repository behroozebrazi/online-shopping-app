function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 text-center">
        © {currentYear} Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
