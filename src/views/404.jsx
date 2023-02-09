import React from "react";

const NotFount = () => {
  function randomNum() {
    return Math.floor(Math.random() * 9) + 1;
  }
  let loop1,
    loop2,
    loop3,
    time = 30,
    i = 0;
  loop3 = setInterval(function () {
    if (i > 40) {
      clearInterval(loop3);
      document.querySelector(".thirdDigit").textContent = 4;
    } else {
      document.querySelector(".thirdDigit").textContent = randomNum();
      i++;
    }
  }, time);
  loop2 = setInterval(function () {
    if (i > 80) {
      clearInterval(loop2);
      document.querySelector(".secondDigit").textContent = 0;
    } else {
      document.querySelector(".secondDigit").textContent = randomNum();
      i++;
    }
  }, time);
  loop1 = setInterval(function () {
    if (i > 100) {
      clearInterval(loop1);
      document.querySelector(".firstDigit").textContent = 4;
    } else {
      document.querySelector(".firstDigit").textContent = randomNum();
      i++;
    }
  }, time);
  return (
    <div className="fund404">
      <div className="container-floud">
        <div className="con-center">
          <div className="container-error-404">
            <div className="clip">
              <div className="shadow">
                <span className="digit thirdDigit">4</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit secondDigit">0</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit firstDigit">4</span>
              </div>
            </div>
            <div className="msg">
              OH!
              <span className="triangle"></span>
            </div>
          </div>
          <h2 className="h1">很抱歉，你访问的页面找不到了</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFount;
