# KyunTerm

KyunTerm is a multifunctional serial terminal application.

![overview](https://github.com/syundo0730/kyun-term/wiki/image/overview.png)

# Install
Available for [Windows 64bit](https://github.com/syundo0730/kyun-term/releases/download/v0.1.0/kyun-term-Setup-0.1.0.exe)
[Mac](https://github.com/syundo0730/kyun-term/releases/download/v0.1.0/kyun-term-0.1.0.dmg)

# Usage
## Setting for serial port
Select port name and baudrate.

![setting](https://github.com/syundo0730/kyun-term/wiki/image/setting.png)

## Send data
### Send text
1. Select text input tag.
2. Input text which you want to send.
3. Push send button.

![setting](https://github.com/syundo0730/kyun-term/wiki/image/text-input.png)

### Send integer value by slider
1. Select slider input tag.
2. Move the slider until it reach the value you want to send.
3. You can select type of value from 'string', 'uint8', 'int8', 'uint16', 'int16', 'uint32', 'int32', which is constituting the character string of UTF 8, 8 bits, 16 bits, 32 bits, with or without sign, respectively.
4. Push send button.

![slider-input](https://github.com/syundo0730/kyun-term/wiki/image/slider-input.png)

## View received data
### View text
1. Select text view tag.
2. You can observe received data in the form of character string, hexadecimal, decimal number.
If you want to see the log of transmitted data, click "show send log" button.

![text-view](https://github.com/syundo0730/kyun-term/wiki/image/text-view.png)

### View graph
1. Select graph view tag.
2. You can display character string data in the form of line graph. The delimiter character is set to comma by default, but it is possible to change it. Currently, only character string data is supported. It is not possible to display raw numerical data well.

![graph-view](https://github.com/syundo0730/kyun-term/wiki/image/graph-view.png)

# Develop
## setup
```
# Clone this repository
$ git clone git@github.com:syundo0730/kyun-term.git
# Go into the repository
$ cd kyun-term
# Install dependencies and run the watch
$ npm install
```
## Build js
```
# Build js for production
$ npm run bundle
# Or watch file's change and build automaticaly
$ npm run bundle:watch
# Run the electron application
$ npm run start
```
## Build application
```
$ npm run build
```
! Applications for Windows/Mac can only be built in Windows/Mac environment

# Contribute
1. Fork it ( https://github.com/syundo0730/kyun-term )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

# License
Copyright (c) 2016 Shundo Kishi
Released under the MIT license
http://opensource.org/licenses/mit-license.php