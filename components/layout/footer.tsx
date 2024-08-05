const Footer = () => {
  return (
    <footer className="border-t">
      <div className="m-auto max-w-5xl px-3 py-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Flow Jobs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
