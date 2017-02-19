const Autotab = {
  blocLen: 0,
  count: 0,
  current: null,
  keys: null,
  listen: (bloc, frequency = 1, callback) => {
    Autotab.blocLen = bloc.length;
    Autotab.keys = new Array(length);

    if(Autotab.blocLen > 30) throw "overflow, you have exceeded 30 items";

    for(let input of bloc) {
      input.addEventListener("keyup", (e) => {
        let value = parseInt(e.target.getAttribute("class"));

        if(!(e.keyCode ^ 37) && (value > 2)) { // left arrow
          Autotab.current = document.getElementsByClassName(value >> 1)[0];
          Autotab.current.focus() | Autotab.current.select();
        } else if(!(e.keyCode ^ 39) && (value < (2 << (Autotab.blocLen - 1)))) { // right arrow
          Autotab.current = document.getElementsByClassName(value << 1)[0];
          Autotab.current.focus() | Autotab.current.select();
        } else {
          if(e.target.value.length == frequency) {
            if((value << 1) ^ (2 << Autotab.blocLen)) {
              Autotab.current = document.getElementsByClassName(value << 1)[0];
              Autotab.current.focus() | Autotab.current.select();
            } else {
              e.target.blur();
            }

            if(!(Autotab.count & value)) {
              Autotab.count |= value;
            }

            Autotab.keys[Autotab.ulog2(value) - 1] = e.target.value;
          }
        }

        if(!(Autotab.count ^ ((2 << Autotab.blocLen) - 2))) {
          callback(Autotab.keys.join(""), bloc);
        }
      });
    }
  },
  ulog2: (number) => {
    let base = 0;

    while(number >>= 1) base++;
    return base;
  },
  clear: (bloc) => {
    Autotab.count = 0;
    for(let input of bloc) {
      input.value = "";
    }
  }
};