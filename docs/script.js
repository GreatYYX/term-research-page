function set_color(mode, names) {
  names.forEach(function(name){
    var prop1 = "--color-" + name;
    var prop2 = "--color-" + mode + "-" + name;
    document.documentElement.style.setProperty(prop1, getComputedStyle(document.documentElement).getPropertyValue(prop2));
  });
}

function set_theme_mode(toggle=true) {
  var dark_mode = (localStorage.getItem("theme-mode") === null 
    || localStorage.getItem("theme-mode") === "dark");
  dark_mode = toggle ? dark_mode : !dark_mode;
  if (dark_mode) {
    // switch to light
    set_color("light", [
      "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", 
      "foreground", "background", "gray-dark", "gray-light"]);
    localStorage.setItem("theme-mode", "light");
    document.getElementById("theme-switch").innerHTML = "Light Mode";
  } else {
    // switch to dark
    set_color("dark", [
      "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", 
      "foreground", "background", "gray-dark", "gray-light"]);
    localStorage.setItem("theme-mode", "dark");
    document.getElementById("theme-switch").innerHTML = "Dark Mode";
  }
}

function load_content(element_id, page) {
  xhr = new XMLHttpRequest();
  if (!xhr) {
    return false;
  }
  xhr.open('GET', page, false);
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        document.getElementById(element_id).innerHTML = xhr.responseText;
      } else {
        console.log(xhr.statusText);
      }
    }
  }
  xhr.send(null);
}

(function () {
  set_theme_mode(false);
  document.getElementById("theme-switch").addEventListener("click", set_theme_mode);

  load_content('logo', 'logo.html');
  load_content('profile-picture', 'profile-picture.html');
})();