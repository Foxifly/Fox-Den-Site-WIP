const staffImages = document.querySelectorAll('.staff-image'),
  menuItems = document.querySelectorAll('.nav-item'),
  subMenuItems = document.querySelectorAll('.sub-menu'),
  h1 = document.querySelectorAll('h1'),
  npContainer = document.querySelectorAll('.now-playing-container'),
  loadingDiv = document.getElementsByClassName('loading'),
  mainImage = document.getElementsByClassName('main-image'),
  headingDiv = document.getElementsByClassName('heading'),
  userClass = document.getElementsByClassName('user-count'),
  currUserClass = document.getElementsByClassName('current-users'),
  songClass = document.getElementsByClassName('total-songs-played'),
  waitlistClass = document.getElementsByClassName('waitlist-length'),
  djClass = document.getElementsByClassName('dj-name'),
  titleClass = document.getElementsByClassName('song-title'),
  authorClass = document.getElementsByClassName('song-artist');

var socket = io.connect('https://foxdenedm.com:3000', { secure: true });
socket.on('connect', function () {

  socket.on('songUpdate', function (title, author, djUsername, waitlistLength, songCount) {
    djClass[0].textContent = djUsername;
    titleClass[0].textContent = title;
    authorClass[0].textContent = author;
    songClass[0].textContent = songCount;
    waitlistClass[0].textContent = waitlistLength;
  });

  socket.on('contentUpdate', function (userCount, currUsers, songCount, waitlistLength) {
    userClass[0].textContent = userCount;
    currUserClass[0].textContent = currUsers;
    songClass[0].textContent = songCount;
    waitlistClass[0].textContent = waitlistLength;
  });

  socket.on('pushUpdateUsers', (userCount, currUsers) => {
    userClass[0].textContent = userCount;
    currUserClass[0].textContent = currUsers;
  });

  socket.on('pushWaitlist', (waitlistLength) => {
    waitlistClass[0].textContent = waitlistLength;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  socket.emit('getUpdate');
})


window.addEventListener("load", () => {
  loadingDiv[0].classList.add("fadeout");
  h1[0].classList.add('h1-transform');
  npContainer[0].classList.add('h2-transform');
  setTimeout(() => {
    if (loadingDiv) {
          loadingDiv[0].style.visibility = "hidden";
    }
    headingDiv[0].classList.add("fadein");
    headingDiv[0].classList.add("fade-in-finish");
  }, 2000)
  console.log("LOADED");
})


menuItems.forEach((menu, index) => {
  menu.addEventListener("mouseover", function () {
    if (index == 1) {
      this.classList.add("hovered");
      subMenuItems[0].classList.add("show");
    } else if (index == 2) {
      this.classList.add("hovered");
      subMenuItems[1].classList.add("show");
    }
  })
  menu.addEventListener("mouseout", function () {
    if (index == 1) {
      this.classList.remove("hovered");
      subMenuItems[0].classList.remove("show");
    } else if (index == 2) {
      this.classList.remove("hovered");
      subMenuItems[1].classList.remove("show");
    }
  })
})

staffImages.forEach((staff, index) => {
  staff.addEventListener("click", function () {
    console.log(index);
    let name, image, bio;
    switch (index) {
    case 0: //Foxifly
      name = "Foxifly";
      image = "/resources/img/FoxiflyStaffPhoto.jpg"
      bio = "Hello I am a dev and I like to have fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun "
      handleStaffModal(name, image, bio);
      break;
    case 1: //Fincely
      name = "FincelyFox";
      image = "/resources/img/FinceStaffPhoto.png"
      bio = `Hi there! I'm FincelyFox, but you can call me Fince. I'm from Finland, and i'm also a member of the pLoT program, translating plug.dj to Finnish. I like foxes a lot, though that's not a big surprise given that i myself am actually a fox. I do code stuff every now and then, mostly with node. <br> <br>I'm introverted and (usually) friendly and helpful fox, who tends to play Overwatch a lot. I've been plug user for 5 years now, visiting various communities during those years and grabbing awesome songs from them. On 14th August 2017 though i found Fox Den, and have stayed here since.
Don't hesitate to ask me something or just start a chat with me, Fince is here for you.`
      handleStaffModal(name, image, bio);
      break;
    case 2: //SheeX
      name = "SheeX";
      image = "/resources/img/SheexStaffPhoto.png"
      bio = "Hello I am a shit and I like to have fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun "
      handleStaffModal(name, image, bio);
      break;
    case 3: //Dottieliver
      name = "Dottieliver";
      image = "/resources/img/DottieStaffPhoto.png"
      bio = "Hello I am a dot and I like to have fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun fun fun funfunfun "
      handleStaffModal(name, image, bio);
      break;
    }
  });
});
const handleStaffModal = (name, image, bio) => {
  modal.style.display = "flex";
  modal.innerHTML = `
  <div class="modal-content">
  <span class="close"><i class="fa fa-times"></i></span>
    <div class="modal-container">

      <div class="modal-image">
        <h2>${name}</h2>

      <img class="staff-image" src=${image}>
      </div>
      <div class="modal-text">
        <p>${bio}</p>
      </div>
    </div>
  </div>`;
  let close = document.getElementsByClassName("close")[0];
  modal.style.display = "flex";
  close.onclick = () => {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
