{ pkgs ? import <nixpkgs> { } }:

with pkgs;

let
  basePackages = [ nixfmt nodejs yarn ];

  inputs = basePackages;
in mkShell { buildInputs = inputs; }
