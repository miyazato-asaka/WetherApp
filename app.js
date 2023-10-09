window.addEventListener("load", ()=> {
    //HTML要素取得
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    let city = document.querySelector('.city');
    let updateButton = document.querySelector('.change');

    //グローバル変数
    const api = `https://www.jma.go.jp/bosai/forecast/data/forecast/010000.json`;
    let cel_temperature;
    let fah_temperature;

    //API実行
    fetch(api)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);

        //プルダウン生成
        for(let i = 0; i < data.length; i++){
            let opt = document.createElement('option');

            opt.value = i;
            opt.textContent = data[i].name;

            city.appendChild(opt);
        }

        //初回起動時の気温/天気表示
        update();

        //ボタンクリック時のイベント追加
        updateButton.addEventListener("click", function(){
            update();
        });

        //摂氏華氏変換イベント追加
        temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = cel_temperature;
            }else{
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = fah_temperature;
            }
        });

        //気温と天気の更新
        function update(){
            //選択されているプルダウンのValueを取得
            let num = city.value;

            const summary = data[num].srf.timeSeries[0].areas.weathers[0];

            const celsius_max = data[num].week.tempAverage.areas.max;
            const celsius_min = data[num].week.tempAverage.areas.min;
            let fahrenheit_min = (celsius_min * 1.8) + 32;
            let fahrenheit_max = (celsius_max * 1.8) + 32;
            cel_temperature = celsius_min + " ~ " + celsius_max;
            fah_temperature = fahrenheit_min.toFixed(1) + " ~ " + fahrenheit_max.toFixed(1);
            
            temperatureDegree.textContent = cel_temperature; //平均気温(tempAverage)に
            temperatureSpan.textContent = "C";

            temperatureDescription.textContent = summary; //weathersに
        };
    })
});