function Autotab() {
  this.inputsLen = 0;
  this.count = 0;
  this.current = null;
  this.keys = null;

  if(typeof Autotab.initialized == "undefined") {
    Autotab.prototype.listen = (bloc, frequency = 1, callback) => {
      let $this = this;
      let inputs = bloc.querySelectorAll("input");

      $this.inputsLen = inputs.length;
      $this.keys = new Array($this.inputsLen);

      if($this.inputsLen > 30) throw "overflow, you have exceeded 30 items";

      for(let input of inputs) {
        input.addEventListener("keyup", (e) => {
          let value = parseInt(e.target.getAttribute("class"));

          if(!(e.keyCode ^ 37) && (value > 2)) { // left arrow
            $this.current = bloc.getElementsByClassName(value >> 1)[0];
            $this.current.focus() | $this.current.select();
          } else if(!(e.keyCode ^ 39) && (value < (2 << ($this.inputsLen - 1)))) { // right arrow
            $this.current = bloc.getElementsByClassName(value << 1)[0];
            $this.current.focus() | $this.current.select();
          } else {
            if(e.target.value.length >= frequency) {
              if((value << 1) ^ (2 << $this.inputsLen)) {
                $this.current = bloc.getElementsByClassName(value << 1)[0];
                $this.current.focus() | $this.current.select();
              } else {
                e.target.blur();
              }

              if(!($this.count & value)) {
                $this.count |= value;
              }

              $this.keys[$this.ulog2(value) - 1] = e.target.value;
            }
          }

          if(!($this.count ^ ((2 << $this.inputsLen) - 2))) {
            callback($this.keys.join("").substring(0, $this.inputsLen * frequency), inputs);
          }
        });
      }
    }

    Autotab.prototype.ulog2 = (number) => {
      let index = 0;

      while(number >>= 1) index++;
      return index;
    };

    Autotab.prototype.clear = (bloc) => {
      Autotab.count = 0;
      for(let input of bloc) {
        input.value = "";
      }

      this.keys = new Array(this.inputsLen);
      this.count = 0;
    }
  }
}