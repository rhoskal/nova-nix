with import <nixpkgs> { };

let
  foiltex_run = stdenvNoCC.mkDerivation {
    pname = "latex-foiltex";
    version = "2.1.4b";
    passthru.tlType = "run";

    srcs = [
      (fetchurl {
        url =
          "http://mirrors.ctan.org/macros/latex/contrib/foiltex/foiltex.dtx";
        sha256 = "07frz0krpz7kkcwlayrwrj2a2pixmv0icbngyw92srp9fp23cqpz";
      })
      (fetchurl {
        url =
          "http://mirrors.ctan.org/macros/latex/contrib/foiltex/foiltex.ins";
        sha256 = "09wkyidxk3n3zvqxfs61wlypmbhi1pxmjdi1kns9n2ky8ykbff99";
      })
    ];

    configureFlags = "-system-zlib -system-libpng -system-libjpeg ${
        if openglSupport then
          "-dlopen-opengl -L${mesa}/lib -I${mesa}/include -L${libXmu}/lib -I${libXmu}/include"
        else
          ""
      } ${if threadSupport then "-thread" else "-no-thread"}";

    unpackPhase = ''
      runHook preUnpack

      for _src in $srcs; do
        cp "$_src" $(stripHash "$_src")
      done

      runHook postUnpack
    '';

    postInstall = ''
      mkdir $out/bin $out/etc
      cp foo $out/bin
      echo "Hello World" > $out/etc/foo.conf
      ${if enableBar then "cp bar $out/bin" else ""}
    '';

    nativeBuildInputs = [ texlive.combined.scheme-small ];

    dontConfigure = true;

    buildPhase = ''
      runHook preBuild

      # Generate the style files
      latex foiltex.ins

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      path="$out/tex/latex/foiltex"
      mkdir -p "$path"
      cp *.{cls,def,clo} "$path/"

      runHook postInstall
    '';

    meta = with lib; {
      description = "A LaTeX2e class for overhead transparencies";
      license = licenses.unfreeRedistributable;
      maintainers = with maintainers; [ veprbl ];
      platforms = platforms.all;
    };
  };
  foiltex = { pkgs = [ foiltex_run ]; };

  latex_with_foiltex = texlive.combine {
    inherit (texlive) scheme-small;
    inherit foiltex;
  };
in runCommand "test.pdf" { nativeBuildInputs = [ latex_with_foiltex ]; } ''
  cat >test.tex <<EOF
  \documentclass{foils}

  \title{Presentation title}
  \date{}

  \begin{document}
  \maketitle
  \end{document}
  EOF
    pdflatex test.tex
    cp test.pdf $out
''
