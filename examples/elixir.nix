with import <nixpkgs> { };

let
  packages = beam.packagesWith beam.interpreters.erlang;
  src = builtins.fetchgit {
    url = "ssh://git@github.com/your_id/your_repo";
    rev = "replace_with_your_commit";
  };

  pname = "your_project";
  version = "0.0.1";
  mixEnv = "prod";

  mixDeps = packages.fetchMixDeps {
    pname = "mix-deps-${pname}";
    inherit src mixEnv version;
    # nix will complain and tell you the right value to replace this with
    sha256 = lib.fakeSha256;
    # if you have build time environment variables add them here
    MY_ENV_VAR = "my_value";
  };

  nodeDependencies =
    (pkgs.callPackage ./assets/default.nix { }).shell.nodeDependencies;

  frontEndFiles = stdenvNoCC.mkDerivation {
    pname = "frontend-${pname}";

    nativeBuildInputs = [ nodejs ];

    inherit version src;

    buildPhase = ''
      cp -r ./assets $TEMPDIR

      mkdir -p $TEMPDIR/assets/node_modules/.cache
      cp -r ${nodeDependencies}/lib/node_modules $TEMPDIR/assets
      export PATH="${nodeDependencies}/bin:$PATH"

      cd $TEMPDIR/assets
      webpack --config ./webpack.config.js
      cd ..
    '';

    installPhase = ''
      cp -r ./priv/static $out/
    '';

    outputHashAlgo = "sha256";
    outputHashMode = "recursive";
    # nix will complain and tell you the right value to replace this with
    outputHash = lib.fakeSha256;

    impureEnvVars = lib.fetchers.proxyImpureEnvVars;
  };

in packages.mixRelease {
  inherit src pname version mixEnv mixDeps;
  # if you have build time environment variables add them here
  MY_ENV_VAR = "my_value";
  preInstall = ''
    mkdir -p ./priv/static
    cp -r ${frontEndFiles} ./priv/static
  '';
}
