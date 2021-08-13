import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <div className="bottom-0 w-full h-26 px-6 py-4 mt-12 bg-brown">
      <div className="flex justify-around">
        <Link to="#" className="text-lg font-w6 text-center text-orange maxSm:hidden">
          トップ
        </Link>
        <Link to="#" className="ml-20 text-lg font-w6 text-center text-orange maxSm:ml-0">
          Food Professorとは
        </Link>
        <Link to="#" className="text-lg font-w6 text-center text-orange maxSm:hidden">
          他のユーザーのレシピ
        </Link>
      </div>
      <p className="mt-4 text-lg italic font-light text-center text-orange">Copyright© ︎ECPTeam All RIghts Reserved.</p>
    </div>
  )
}

export default Footer
