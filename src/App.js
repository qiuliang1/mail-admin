import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React GIT up1111ss

          <code>
          #！/bash/sh
          cd /home/nginx/www/web
          if [ -d "build/" ];then
                  echo "文件夹存在"
                  tar -zcvf old-build.tar.gz build
                  rm -rf build
          fi

          if [ "build-origin.tar.gz" ]; then
                  echo "tar 压缩文件存在"
            tar -zxvf build-origin.tar.gz
          else
                  echo "tar 压缩文件不存在"
                  tar -zxvf old-origin.tar.gz
          fi


          #！/bash/sh
          npm install
          npm run build
          if [ "build-origin.tar.gz" ]; then
            echo "进来了"
            rm -rf build-origin.tar.gz
          fi
          tar -zcvf build-origin.tar.gz build
          # scp build-origin.zip root@101.35.190.75:/home/nginx/www/web

          </code>
        </a>
      </header>
    </div>
  );
}

export default App;
