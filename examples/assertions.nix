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
assert 3 > 2 == true;
assert 2 < 3 == false;
assert 2 <= 3 == true;
assert 3 >= 1 == true;
assert 3 // 2 == 1;
assert 4 != 5;
assert 3 * 5 == 15;
assert !true == false;
assert 5 - 4 == 1;
assert 3 + 4 == 7;
assert [ 1 2 ] ++ [ 3 4 ] == [ 1 2 3 4 ];
assert !e1 || e2;

stdenv.mkDerivation {
  name = "subversion-1.1.1";
  #...
  openssl = if sslSupport then openssl else null;
  #...
}
