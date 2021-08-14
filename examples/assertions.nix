{ localServer ? false, httpServer ? false, sslSupport ? false
, pythonBindings ? false, javaSwigBindings ? false, javahlBindings ? false
, stdenv, fetchurl, openssl ? null, httpd ? null, db4 ? null, expat, swig ? null
, j2sdk ? null }:

assert localServer -> db4 != null;
assert httpServer -> httpd != null && httpd.expat == expat;
assert sslSupport -> openssl != null
  && (httpServer -> httpd.openssl == openssl);
assert pythonBindings -> swig != null || swig.pythonSupport;
assert javaSwigBindings -> swig != null && swig.javaSupport;
assert javahlBindings -> j2sdk != null;

let
  arithemtic = [
    (3 > -2)
    #> true

    (2 < 3)
    #> false

    (2 <= 3)
    #> true

    (3 >= 1)
    #> true

    (3 / 3)
    #> 1

    ({ a = 1; } // { b = 2; })
    #> { a = 1; b = 2; }

    (4 != 5)
    #> true

    (3 * 5)
    #> 15

    (!true)
    #> false

    (5 - 4)
    #> 1

    (3 + 4)
    #> 7

    ([ 1 2 ] ++ [ 3 4 ])
    #> [ 1 2 3 4 ]

    (true || false)
    #> true

    (true && false)
    #> false
  ];
in stdenv.mkDerivation {
  name = "subversion-1.1.1";
  #...
  openssl = if sslSupport then openssl else null;
  #...
}
