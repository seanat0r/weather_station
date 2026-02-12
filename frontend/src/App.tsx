import './css/App.css'
import Board from './board.tsx'
import WeatherHeader from './title.tsx'

export default function WeatherDashboard() {
  
  const title = WeatherHeader();
  const board = Board();

  return (
    <div className='app-container '>
      <div>
        {title}
      </div>
      <div>
        {board}
      </div>
    </div>
  )
}
