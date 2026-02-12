import './css/App.css'
import Board from './components/board.tsx'
import WeatherHeader from './components/title.tsx'

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
