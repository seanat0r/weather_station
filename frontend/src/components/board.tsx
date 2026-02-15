import Graph from "./graph"



function Tile() {
    return (
        <>
            <div className="tile">
              {/* Graphen durch mappen */}
                <Graph /> {/* 24 h temp */}
                <Graph /> {/* 07 d temp */}
                <Graph /> {/* 01 M temp */}
                <Graph /> {/* 24 h hum */}
                <Graph /> {/* 07 d hum */}
                <Graph /> {/* 01 M hum */}
                <Graph /> {/* 24 h press */}
                <Graph /> {/* 07 d press*/}
                <Graph /> {/* 01 M press*/}
                <MetricBox />
                <MetricBox />
            </div>
        </>
    )
}


function MetricBox() {
  return (
    <>
      <h3>Forecast</h3>
      <span>⛈️</span>
      <p>It's likely to comes a storm!</p>
    </>
  )
}

export default function Board() {
    return (
        <>
            <Tile />
        </>
    )
}