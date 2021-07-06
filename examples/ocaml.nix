{ lib, fetchFromGitHub, buildDunePackage, alcotest, result, bigstringaf }:

buildDunePackage rec {
  pname = "angstrom";
  version = "0.10.0";

  minimumOCamlVersion = "4.03";

  src = fetchFromGitHub {
    owner = "inhabitedtype";
    repo = pname;
    rev = version;
    sha256 = "0lh6024yf9ds0nh9i93r9m6p5psi8nvrqxl5x7jwl13zb0r9xfpw";
  };

  buildInputs = [ alcotest ];
  propagatedBuildInputs = [ bigstringaf result ];
  doCheck = true;

  preConfigure = ''
    export LDFLAGS="-L${pkgs.fftw.dev}/lib -L${pkgs.fftwFloat.out}/lib -L${pkgs.fftwLongDouble.out}/lib"
    export CFLAGS="-I${pkgs.fftw.dev}/include -I${pkgs.fftwFloat.dev}/include -I${pkgs.fftwLongDouble.dev}/include"
  '';

  meta = with lib; {
    homepage = "https://github.com/inhabitedtype/angstrom";
    description =
      "OCaml parser combinators built for speed and memory efficiency";
    license = licenses.bsd3;
    maintainers = with maintainers; [ sternenseemann ];
  };
}
