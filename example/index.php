<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <?php
      for($input = 0; $input < 6; $input++) {
          echo "<input type=\"password\" class=\"" . (2 << $input) . "\">";
        }
    ?>

    <script type="text/javascript" src="../autotab.js"></script>
    <script type="text/javascript">
      Autotab.listen(document.querySelectorAll("input"), 1, (keys, els) => {
        alert(keys);
        Autotab.clear(els);
      });
    </script>
  </body>
</html>