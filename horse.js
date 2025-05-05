//open / close info box popup

function myButton() {
    const div = document.getElementById("infoPopup");
    div.style.display = "block";
    setTimeout(() => {
      div.classList.add("visible");
    }, 10); // 10ms
}

//leaves time for div to fade in / out before being non-intractable / completely hidden

function hideDiv() {
  const div = document.getElementById("infoPopup");
  div.classList.remove("visible"); // start fade-out
  setTimeout(() => {
    div.style.display = "none";
  }, 1000); // 1s = 1000ms
}

function myLeaving() {
    window.location.href = 'lookaround.html';
}


// BACK TO INDEX NO ACTIVITY

let inactivityRedirect = function () {
    let timeout;
    const redirectUrl = 'index.html'; 

    function resetTimer() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            window.location.href = redirectUrl; // redirects 
        }, 90000); // 1 minute 
    }

    ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(evt =>
        window.addEventListener(evt, resetTimer)
    );
    
    resetTimer();
};

inactivityRedirect();