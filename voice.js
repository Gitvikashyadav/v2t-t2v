let StartBtn1 = document.getElementById("StartBtn1");
let StartBtn2 = document.getElementById("StartBtn2");
let Btn_pause_play = document.getElementById("Btn_pause_play");
let Btn_Stop1 = document.getElementById("Btn_Stop1");

let Btn_Stop2 = document.getElementById("Btn_Stop2");

let speaker_On = document.getElementById("speaker_On");
let speaker_of = document.getElementById("speaker_of");
let Un_mute = document.getElementById("Un_mute");
let Mute = document.getElementById("Mute");
let Btn_pause = document.getElementById("Btn_pause");
let Btn_play = document.getElementById("Btn_play");
let msg = document.querySelector(".msg");

const fetch_Text = document.getElementById("texts");
const voiceText = document.getElementById("voice");
let check = true;
Btn_Stop1.onclick = Btn_Stop11;
Btn_Stop2.onclick = Btn_Stop22;
voiceText.disabled = true;

StartBtn1.addEventListener("click", (e) => {
  if (check) {
    check = false;
    StartBtn1.style.display = "none";
    BtnPause_Play(e);
    Mute.style.display = "block";
    Btn_Stop1.style.display = "block";
    Btn_pause_play.style.display = "block";

    //======== voice to text Functionality start=====
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    voiceText.innerText = "Listening Start .....";
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      voiceText.innerText = text;
      console.log("You said:", text);
    };
    recognition.start();
  } else {
    msg.innerHTML = "mute is open";
    msg.style.display = "block";

    // alert("Working is progerss");
  }
});

StartBtn2.addEventListener("click", (e) => {
  if (check) {
    fetch_Text.disabled = true;

    check = false;
    StartBtn2.style.display = "none";
    BtnPause_Play(e);
    speaker_On.style.display = "block";
    Btn_Stop2.style.display = "block";
    Btn_pause_play.style.display = "block";

    //========text to voice Functionality start========
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      console.log(voices);
    };

    text = fetch_Text.value;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      Btn_Stop22();
      console.log("Speech finished!");
    };
  } else {
    msg.innerHTML = "speaker is open";
    msg.style.display = "block";
    // alert("Working is progerss");
  }
});

function Btn_Stop11() {
  console.log("call the function manually");

  check = true;
  voiceText.value = "";
  Btn_Stop1.style.display = "none";
  Mute.style.display = "none";
  Un_mute.style.display = "none";
  StartBtn1.style.display = "block";
  Btn_pause_play.style.display = "none";
  msg.style.display = "none";
}

function Btn_Stop22() {
  fetch_Text.disabled = false;
  console.log("call the function manually");

  check = true;
  speechSynthesis.cancel();
  fetch_Text.value = "";
  Btn_Stop2.style.display = "none";
  speaker_On.style.display = "none";
  speaker_of.style.display = "none";

  StartBtn2.style.display = "block";
  Btn_pause_play.style.display = "none";
  msg.style.display = "none";
}

function BtnPause_Play(e) {
  console.log(e.target);
  const key = e.target.id;

  //Remove old Add event Listener
  let newPause = Btn_pause.cloneNode(true);
  Btn_pause.replaceWith(newPause);
  Btn_pause = newPause;

  let newPlay = Btn_play.cloneNode(true);
  Btn_play.replaceWith(newPlay);
  Btn_play = newPlay; // reassign reference

  Btn_pause.addEventListener("click", () => {
    Btn_pause.style.display = "none";
    Btn_play.style.display = "block";
    if (key == "StartBtn1") {
      console.log(key);

      Mute.style.display = "none";
      Un_mute.style.display = "block";
    }
    //  StartBtn2 work
    else {
      speechSynthesis.pause();

      speaker_On.style.display = "none";
      speaker_of.style.display = "block";
    }
  });

  Btn_play.addEventListener("click", () => {
    Btn_play.style.display = "none";
    Btn_pause.style.display = "block";
    if (key == "StartBtn1") {
      Un_mute.style.display = "none";
      Mute.style.display = "block";
    } else {
      speechSynthesis.resume();

      speaker_of.style.display = "none";
      speaker_On.style.display = "block";
    }
  });
}

// function Togglefun() {
//   if (isText == false) {

//     btnText1.style.display = "none";
//     isText = true;
//   } else {
//     btnText2.style.display = "none";
//     btnText1.style.display = "inline";
//     isText = false;
//   }
// }

//

// StartBtn2.onclick = Togglefun;
// function toggleText(e) {
//   console.log(e);
//   console.log(fetch_Text.value);
// }
// const Text = fetch_Text.value;
// let synthi = window.SpeechSynthesis;
// const uttern = new SpeechSynthesisUtterance(Text);
// let lang = synthi.get;
