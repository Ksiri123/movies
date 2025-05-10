
const Footer = () => {
  return (
    <footer className="bg-movie-secondary/80 py-4 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-movie-muted text-sm">
          FlickFind uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
        <div className="mt-2 flex justify-center items-center gap-2">
          <p className="text-movie-muted text-xs">
            © {new Date().getFullYear()} FlickFind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
