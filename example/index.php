<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <?php
      for($input = 0; $input < 6; $input++) {
        echo "<input maxlength=\"1\" type=\"password\" class=\"" . (2 << $input) . "\">";
      }
    ?>

    <!-- <script type="text/javascript" src="../autotab.class.es6.js"></script> -->
    <script type="text/javascript" src="../autotab.js"></script>
    <script type="text/javascript">
      let login = new Autotab();
      login.listen(document.querySelector("body"), 1, (keys, els) => {
        alert(keys);
        login.clear(els);
      });
    </script>
  </body>
</html>