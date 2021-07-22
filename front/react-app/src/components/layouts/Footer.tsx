import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <div className="absolute bottom-0 w-full h-26 px-6 py-4 mt-12 bg-brown">
      <div className="flex justify-around">
        <Link to="#" className="text-lg font-w6 text-center text-orange">
          トップ
        </Link>
        <Link to="#" className="ml-20 text-lg font-w6 text-center text-orange">
          Food Professorとは
        </Link>
        <Link to="#" className="text-lg font-w6 text-center text-orange">
          他のユーザーのレシピ
        </Link>
      </div>
      <p className="mt-4 text-lg italic font-bolditalic text-center text-orange">
        Copyright© ︎ECPTeam All RIghts Reserved.
      </p>
    </div>
  )
}

export default Footer
