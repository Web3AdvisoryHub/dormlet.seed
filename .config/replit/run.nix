{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
  ];
  buildInputs = with pkgs; [
    nodejs-18_x
    yarn
  ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin:$PATH"
    export NODE_ENV=development
  '';
} 