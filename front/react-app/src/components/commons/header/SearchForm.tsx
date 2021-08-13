const SearchForm: React.FC = () => {
  return (
    <form className="relative top-2 left-6 maxSm:hidden">
      <div className="flex">
        <section className="w-24 h-9 bg-darkRed text-orange">
          <p className="relative top-2.5 w-18 h-9 text-xs font-w6 text-center text-yellow-400">他ユーザー 🔽</p>
        </section>
        <input type="text" className="w-60 px-2" />
        <button className="w-12 bg-lightGreen text-white">
          <i className="fas fa-search" />
        </button>
      </div>
      <div className="flex mt-1.5">
        <span className="h-6 mr-2 py-1 px-3 whitespace-nowrap bg-brown rounded-xl text-xs text-center text-orange">
          にんじん
        </span>
        <span className="h-6 mr-2 py-1 px-3 whitespace-nowrap bg-brown rounded-xl text-xs text-center text-orange">
          にんじん
        </span>
        <span className="h-6 mr-2 py-1 px-3 whitespace-nowrap bg-brown rounded-xl text-xs text-center text-orange">
          にんじん
        </span>
        <span className="h-6 mr-2 py-1 px-3 whitespace-nowrap bg-brown rounded-xl text-xs text-center text-orange">
          にんじん
        </span>
        <span className="h-6 mr-2 py-1 px-3 whitespace-nowrap bg-brown rounded-xl text-xs text-center text-orange">
          じゃがいも
        </span>
      </div>
    </form>
  )
}

export default SearchForm
