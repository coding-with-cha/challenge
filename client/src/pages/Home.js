import React from 'react'

const Home = () => {
  const today = new Date();
  const h = today.getHours();
  const m = today.getMinutes();
  return (
    <div className='home'>
      <div className='welcome'>Welcome !</div>
    <div className="main">
          <div className="background"></div>
          <div className="iphone-body">
            {/* <div className="tt">
              <div className="time">
                {h}:{m}
              </div>
              
           </div> */}
            <hr />
            <div className="round-shape-1" style={{ zIndex: "2" }}></div>
            <div className="round-shape-2" style={{ zIndex: "2" }}></div>
            <div className="round-shape-color1" style={{ zIndex: "2" }}></div>
            <div className="round-shape-color2" style={{ zIndex: "2" }}></div>
            <div className="top-section">
              <div className="camera"></div>
              <div className="speaker"></div>
            </div>
            <div className="btn volume-up" style={{ zIndex: "1" }}></div>
            <div className="btn volume-down" style={{ zIndex: "1" }}></div>
            <div className="btn silent" style={{ zIndex: "1" }}></div>
            <div className="btn power" style={{ zIndex: "1" }}></div>
          </div>
        </div>
      </div>
     
    
  )
}

export default Home