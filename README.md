     
    # |_|  _   _ |_   _   _ 1\5
      | | (_| _) | | |/_ | 

Hasher is a small but powerful URL Hash Routing script. It allows you to easily manage and create routes as well as apply object and functions to those routes.

Usage:

    // Setup the Hasher
    Hasher.setup();
    
    // Add a route: (http://url.to.index/#/name/Nijikokun) will initialize this.
    Hasher.add("name/:name", function(name) {
        // Alert
        alert(name);
        
        // Console
        console.log(name);
    });
    
<h3>Licensing?</h3>

Hasher is copyrighted / licensed under the MIT License.

    Copyright (c) 2011 Nijikokun <nijikokun@gmail.com>, http://nexua.org

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.