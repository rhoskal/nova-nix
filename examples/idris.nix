{ lib, build-idris-package, fetchFromGitHub, contrib, lightyear }:
build-idris-package {
  name = "yaml";
  version = "2018-01-25";

  /* This is the .ipkg file that should be built, defaults to the package name
     In this case it should build `Yaml.ipkg` instead of `yaml.ipkg`
     This is only necessary because the yaml packages ipkg file is
     different from its package name here.
  */
  ipkgName = "Yaml";
  # Idris dependencies to provide for the build
  idrisDeps = [ contrib lightyear ];

  src = fetchFromGitHub {
    owner = "Heather";
    repo = "Idris.Yaml";
    rev = "5afa51ffc839844862b8316faba3bafa15656db4";
    sha256 = "1g4pi0swmg214kndj85hj50ccmckni7piprsxfdzdfhg87s0avw7";
  };

  meta = with lib; {
    description = "Idris YAML lib";
    homepage = "https://github.com/Heather/Idris.Yaml";
    license = licenses.mit;
    maintainers = [ maintainers.brainrape ];
  };
}
