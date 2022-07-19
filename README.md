## Welcome to Rep-Runner

This module was created to easily deploy changes for testing without having to rerun your code yourself every single time!


**For any suggestions or bug reports, please go to [this link](https://github.com/VioPaige/rep-runner/issues)**



To install this module, run the following:
```
npm install rep-runner -g
```

to then use the module, use the command `reprun` as follows:
```
reprun <filename>
```

doing this will run
```
node <filename>
```
when a .js, .ts or .json file inside the root directory (or a subdirectory) is updated, this process will restart shortly and the command will be rerun.