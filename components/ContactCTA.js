export default function ContactCTA() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Let’s Work Together 💼</h2>
      <p className="text-lg mb-8 max-w-xl mx-auto text-gray-300">
        Whether you need a dashboard built, data analyzed, or just a conversation — I’m ready to collaborate.
      </p>
      <a
        href="/contact"
        className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
      >
        📬 Contact Me
      </a>
    </div>
  );
}
