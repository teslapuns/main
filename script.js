function generateResult() {
  // Получение введенных данных
  var input1 = document.getElementById("input1").value;
  var select1 = document.getElementById("select1");
  var selectedValue = select1.options[select1.selectedIndex].value;
  var input2 = document.getElementById("input2").value;
  var checkbox1 = document.getElementById("checkbox1").checked;

  var incidents = [[], [], [], [], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], [], [],
             [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [1, 2, 3, 4, 5, 6], [1, 2, 3], [1, 2, 3, 4, 5, 6, 7], [], [],
             [1, 2, 3, 4], [], [], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6]]

  var times = [[], [], [], [],
             ["15m", "45m", "1h", "3h", "6h", "9h", "12h", "16h", "20h", "1d", "30h", "36h", "2d", "54h", "60h", "3d", "7d",
              "14d", "31d", "5y"], [], [], ["5m", "30m", "2h", "4h", "8h", "12h", "18h", "1d", "36h", "3d", "7d", ""],
             ["3h", "12h", "3d", "7d", "15d", "5y"], ["10m", "7d", ""], ["1h", "6h", "12h", "1d", "3d", "7d", ""], [],
             [], ["2h", "1d", "7d", ""], [], [], ["6h", "1d", "7d", "30d", ""],
             ["2h", "6h", "1d", "3d", "7d", ""]]
    
  var puns = ["/ban", "/ban", "/ban", "/warn", "/tempmute", "/warn", "/warn", "/tempban", "/tempmute", "/tempban", "/tempban",
            "/warn", "/bans", "/tempban", "/warn", "/warn", "/tempban", "/rtempban Крокодил"]
  // Генерация результата
  var result = "Введите данные...";
  var selectElement = document.getElementById("select1");
  var selectedIndex = selectElement.selectedIndex;
  if (incidents[selectedIndex].length === 0) {
    result = puns[selectedIndex] + " " + input1 + " " + selectedValue;
  } else {
    inc = incidents[selectedIndex][input2 - 1];
    pun_time = times[selectedIndex][input2 - 1];
    if (pun_time == "") {
      result = "/ban " + input1;
    } else {
      pun_time = " " + pun_time;
      result = puns[selectedIndex] + " " + input1;
    }
    if (inc == incidents[selectedIndex].length - 1) {
      result += pun_time + " " + selectedValue + "[Инцидент " + inc + "(предпоследний)]";
    } else if (inc == incidents[selectedIndex].length ) {
      result += pun_time + " " + selectedValue + "[Инцидент " + inc + "(последний)]";
    } else {
      result += pun_time + " " + selectedValue + "[Инцидент " + inc + "]";
    }
  }
  if (checkbox1) {
    result += " [Жалоба на форуме]";
  }
  if (input1 === "") {
    result = "Ошибка: введите имя пользователя";
  } else if (input2 === "" && (puns[selectedIndex] != "/ban" && puns[selectedIndex] != "/warn" && puns[selectedIndex] != "/bans")) {
    result = "Ошибка: введите номер инцидента";
  } else if (input2 > incidents[selectedIndex].length || (input2 < 1 && input2 !== "")){
    result = "Ошибка: инцидент указан неверно!";
  }
  
  // Отображение результата на странице
  document.getElementById("result-container").innerHTML = result + "</div>";

}
// Добавляем обработчики событий на нужные элементы ввода, чтобы функция generateResult() вызывалась автоматически при вводе данных
document.getElementById("input1").addEventListener("input", generateResult);
document.getElementById("select1").addEventListener("change", generateResult);
document.getElementById("input2").addEventListener("input", generateResult);
document.getElementById("checkbox1").addEventListener("change", generateResult);

function copyResult() {
  var resultElement = document.getElementById("result-container");
  var resultText = resultElement.innerText;
  var copyButton = document.getElementById('copy-button'); // Получаем ссылку на кнопку
  
  // Записываем текст в буфер обмена
  navigator.clipboard.writeText(resultText).then(function() {
    // Меняем текст на кнопке на "Скопировано!" и цвет на зеленый
    copyButton.textContent = "Скопировано!";
    copyButton.style.backgroundColor = "green";
    
    // Через 4 секунды восстанавливаем текст на кнопке на "Скопировать" и цвет на изначальный
    setTimeout(function() {
      copyButton.textContent = "Скопировать";
      copyButton.style.backgroundColor = "";
    }, 4000);
  }).catch(function(err) {
    console.error("Ошибка при копировании: ", err);
  });
}



