@ECHO OFF 

@ECHO Iniciando emulador... 

@REM call Set-ExecutionPolicy Bypass -Scope Process

call firebase emulators:start --only auth,firestore,hosting,functions,storage --import=./firestore_export --export-on-exit

cmd /k