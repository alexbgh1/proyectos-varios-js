let
clock, alarm,
hours, minutes, seconds,
hoursElem, minutesElem, secondsElem,
startButton, stopButton,
repeater, ejecutando;

// Cargar datos una vez cargue la página
window.addEventListener('load',() =>{

    /*
    - - - - - SETEO VARIABLES HTML Y AUDIO
    */
    // Creamos elemento ' alarm ' con el Audio
    alarm = new Audio('sound/vendo-papa-cebolla.mp3');

    // Elementos HTML de Horas, Minutos y Segundos (SE USARÁ PARA LA PARTE VISUAL)
    hoursElem = document.getElementById('hours');
    minutesElem = document.getElementById('minutes');
    secondsElem = document.getElementById('seconds');
    
    // Elementos HTML de Botón de Inicio y de Pausa
    startButton = document.getElementById('startAlarm');
    stopButton = document.getElementById('stopAlarm');

    // HTML del Reloj/Alarma
    clock = document.querySelector('.clock');


    /*
    - - - - - LISTENERS PARA ELEMENTOS HTML
    */
    // LISTENER para altenar botón Inicio y Pausa 
    startButton.addEventListener('click', () =>{
        stopButton.classList.toggle('hidden');
        startButton.classList.toggle('hidden');
    })

    // LISTENER para altenar botón Inicio y Pausa 
    stopButton.addEventListener('click', () =>{
        startButton.classList.toggle('hidden');
        stopButton.classList.toggle('hidden');
        alarm.pause();
        alarm.currentTime = 0;
    })
    
    // LISTENER para evitar 'paste' en las casillas de Horas, Minutos y Segundos
    hoursElem.addEventListener('paste', event =>{
        validate(event);
    })
    minutesElem.addEventListener('paste', event =>{
        validate(event);
    })
    secondsElem.addEventListener('paste', event =>{
        validate(event);
    })

    /*
    - - - - - VALIDATE & LOAD LOCAL STORAGE
    */

    // SI EXISTE Local Storage Y tiene al menos un dato carga los datos
    if (typeof(window.localStorage) !== "undefined" && window.localStorage.length) {
        // VARIABLES HTML
        hoursElem.value = localStorage.getItem("hours");
        minutesElem.value = localStorage.getItem("minutes");
        secondsElem.value = localStorage.getItem("seconds");

        // VARIABLES NUMBER
        hours = localStorage.getItem("hours");
        minutes = localStorage.getItem("minutes");
        seconds = localStorage.getItem("seconds");

        // NOTA: La respuesta de Local Storage entrega un STRING, por eso lo parseamos : "false":string -> false:bool
        ejecutando = JSON.parse(localStorage.getItem("ejecutando"));
        if (ejecutando){
            // Le pasamos el parametro true, en este caso implicaría que está siendo ejecutado dentro del Local storage
            startAlarm(true);
        };
    }// SI NO EXISTE Local Storage, inicializa en 0
    else{
        hours = 0;
        minutes = 0;
        seconds = 0;
        hoursElem.value = "00";
        minutesElem.value = "00";
        secondsElem.value = "00";

        ejecutando=false;
        console.log("f")
    }

    // Ternario para ocultar un botón Inicio o Pause según si está ejecutándose la alarma.
    !ejecutando ? startButton.classList.toggle('hidden') : stopButton.classList.toggle('hidden');
});


/*
- - - - - VALIDATE: Previene 'paste' y key char
- - - Una vez válida, actualiza variables de la alarma.
*/
function validate(evt){
    var theEvent = evt || window.event;

    // En caso de recibir un 'paste', dejamos en texto plano, pudiendo leerlo
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Si se presiona una tecla, simplemente rescatamos los valores, ejemplo, presionamos 'a' -> keyCode: 'a'
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }

    // Aplicamos Expresiones regulares para solo obtener números
    var regex = /[0-9]|\./;

    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }

    /* 
    Reconocemos la casilla que estamos editando, y en cada caso, actualizamos la variable en la que estemos 
    Considerando la variable horas, minutos o segundos, con su respectiva validación
    */
    if (theEvent.type == 'keyup'){ 

        switch (theEvent.path[0].id){
            case 'hours':
                if (theEvent.path[0].value > 23) theEvent.path[0].value = '23';
                hours = Number(theEvent.path[0].value);
                break;
                   
            case 'minutes':
                if (theEvent.path[0].value > 59) theEvent.path[0].value = '59';
                minutes = Number(theEvent.path[0].value);
                break;

            case 'seconds':
                if (theEvent.path[0].value > 59) theEvent.path[0].value = '59';
                seconds = Number(theEvent.path[0].value);
                break;
        }
    }
}
/*
- - - - - startAlarm: función asociada al botón 'Inicio'; Actualiza el contador y 
- - - key: true -> Se da comienzo con el estado 'ejecutando' de 'Local Storage'
- - - key: false -> Se da comienzo con el botón 'Inicio'
*/
function startAlarm(key=false){
    if (!ejecutando || key){
        if (hours === null){
            hours=0;
        }
        localStorage.setItem("hours",hours);
        if (minutes === null){
            minutes=0;
        }
        localStorage.setItem("minutes",minutes);
        if (seconds === null){
            seconds=0;
        }
        localStorage.setItem("seconds",seconds);
        setAlarm();
        regresiveCounter();
    }else{
        return
    }
}


/*
- - - - - regresiveCounter: hace llamado a la alarma -> va descontando el tiempo
- - - - ejecutando -> true
*/
function regresiveCounter(){
    ejecutando = true;
    localStorage.setItem("ejecutando", ejecutando);
    repeater = setInterval(runner, 1000);
}

/*
- - - - - runner: Hace la parte del calculo de la alarma.
*/
function runner(){
    if (seconds > 0){
        seconds--;
        localStorage.setItem("seconds",seconds);
        localStorage.setItem("minutes",minutes);
        localStorage.setItem("hours",hours);
    } else {
        if (minutes > 0) {
            seconds = 59;
            minutes--;
        } else {
            if (hours> 0){
                seconds = 59;
                minutes = 59;
                hours--;
            } else {
                alarm.play();
                return;
            }
        }
    }
    setAlarm();
    return;
}

/*
- - - - - setAlarm: Actualiza la alarma visualmente como <p></p>
*/
function setAlarm(){
    document.title = `Alarm ${hours > 9 ? hours : ('0'+hours)}:${minutes> 9 ? minutes : ('0'+minutes)}:${seconds> 9 ? seconds : ('0'+seconds)}`;
    clock.innerHTML = `
    <p>${hours}</p>
    <span>hs</span>
    <p>${minutes}</p>
    <span>min</span>
    <p>${seconds}</p>
    <span>seg</span>
    `;

}

/*
- - - - - stopAlarm: Actualiza la alarma visualmente como <input>
- - - ejecutando -> false
*/
function stopAlarm(){
    ejecutando = false;
    localStorage.setItem("ejecutando",ejecutando);
    clearInterval(repeater);
    clock.innerHTML = `
    <input id="hours" class="time_num" type="tel" onkeypress='validate(event)' onkeyup='validate(event)' maxlength="2" value ="${hours}"/>
    <span>hs</span>
    <input id="minutes" class="time_num" type="tel" onkeypress='validate(event)' onkeyup='validate(event)' maxlength="2" value ="${minutes}"/>
    <span>min</span>
    <input id="seconds" class="time_num" type="tel" onkeypress='validate(event)' onkeyup='validate(event)' maxlength="2" value ="${seconds}"/>
    <span>seg</span>
    `;
}