export default function Header() {
    return (
      <header className="p-6 flex justify-between items-center bg-black">
        <div className="flex items-center space-x-4">
        <h1>
            <span className="highlight_1 text-white">باخشکبار</span>
          </h1>
        </div>
        <a href="#">
        <button className="btn hover:scale-110 ml-6">
          افزودن محصول
        </button>
        </a>
      </header>
    );
  }
  