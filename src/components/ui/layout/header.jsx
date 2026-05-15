export default function Header() {
  return (
    <header className="bg-blue-900 text-white py-4 px-6 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">R-Tech Machine & Tools</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Testimonials</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}
