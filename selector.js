//CAR SELECTOR DROP DOWN MENU

function myOptions() {
    document.getElementById('optionDropdown').classList.toggle('show');
  }

  window.onclick = function(event) {
      if(!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName('optionContent');
          var i;
          for(let i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if(openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
              }
          }
      }

      document.querySelector(".startBtn").onclick = function () {
        if (document.getElementsByClassName('optionDropdown a').innerHTML === 'Option 1') {
        let ferrari = new Car(canvas.width /2 + 10, canvas.height / 2 - 50, 50, 100, './assets/FerrariEnzoTrans.png')

        // ferrari.loadCar()
      
      }
      window.location.href = "index.html";
        
      };
     
  }


console.log(ferrari);
      