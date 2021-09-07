import { useHistory, Link } from 'react-router-dom'

const SelectItems: React.FC = () => {
  const history = useHistory()

  return (
    <div className="mr-12 w-40 h-full border-2 border-brown maxMd:hidden">
      <div className="border-b border-brown bg-lightYellow text-darkRed py-2 font-medium text-center">材料</div>
      <Link to="/ingredients/にんじん/recipes" className="block border-b border-brown py-2 font-medium text-center">
        にんじん
      </Link>
      <Link to="/ingredients/じゃがいも/recipes" className="block border-b border-brown py-2 font-medium text-center">
        じゃがいも
      </Link>
      <Link to="/ingredients/玉ねぎ/recipes" className="block border-b border-brown py-2 font-medium text-center">
        玉ねぎ
      </Link>
      <Link to="/ingredients/牛肉/recipes" className="block border-b border-brown py-2 font-medium text-center">
        牛肉
      </Link>
      <Link to="/ingredients/豚肉/recipes" className="block border-b border-brown py-2 font-medium text-center">
        豚肉
      </Link>
      <div className="border-b border-brown bg-lightYellow text-darkRed py-2 font-medium text-center">カテゴリ</div>
      <Link to="/categories/朝食/recipes" className="block border-b border-brown py-2 font-medium text-center">
        朝食
      </Link>
      <Link to="/categories/昼食/recipes" className="block border-b border-brown py-2 font-medium text-center">
        昼食
      </Link>
      <Link to="/categories/夕食/recipes" className="block border-b border-brown py-2 font-medium text-center">
        夕食
      </Link>
      <Link to="/categories/和食/recipes" className="block border-b border-brown py-2 font-medium text-center">
        和食
      </Link>
      <Link to="/categories/クリスマス/recipes" className="block py-2 font-medium text-center">
        クリスマス
      </Link>
    </div>
  )
}

export default SelectItems
