/*
 * # |_|  _   _ |_   _   _ 2\6
 *   | | (_| _) | | |/_ | 
 * 
 * Url Hash Routing made easy.
 *
 * @author: Nijikokun <nijikokun@gmail.com>
 * @copyright: May 22, 2011
 * @version: 0.3
 * @license: MIT License <https://github.com/Nijikokun/Hasher>
 */

var Hasher = {
    routes: [],
    
    regex : {
        HASH_STRIP: /^(\#|\#\!)*/,
        ARG_NAMED: /:([\w\d]+)/g,
        ARG_SPLAT: /\*([\w\d]+)/g,
        ESC: /[-[\]{}()+?.,\\^$|#\s]/g
    },
    
    history: {
        cache: false,
        support: ("history" in window)
    },
    
    marray: function(args){
        return Array.prototype.slice.call(args, 0);
    },
    
    proxy: function(o){
        var me = this;
        return(function(){ 
            return o.apply(me, arguments); 
        });
    },
    
    proxyAll: function(){
        var functions = this.marray(arguments);
      
        for (var i=0; i < functions.length; i++)
            this[functions[i]] = this.proxy(this[functions[i]]);
    },
        
    add: function(path, callback){
        if (typeof path == "object") {
            for(var p in path) this.add(p, path[p]);
        } else {
            if (typeof path == "string") {      
                path = path.replace(this.regex.ESC, "\\$&").replace(this.regex.ARG_NAMED, "([^\/]*)").replace(this.regex.ARG_SPLAT, "(.*?)");
                path = new RegExp('^' + path + '$');
            }
        
            this.routes.push({
                'route': path, 
                'callback': callback
            });
        }
    },
    
    setup: function(options){
        if (options && options.history)
            this.history.cache = this.history.support && options.history;
        
        if ( this.history.cache )
            $(window).bind("popstate", this.change);
        else
            $(window).bind("hashchange", this.change);
        
        this.proxyAll("change");
        this.change();
    },
    
    unbind: function(){
        if (this.history)
            $(window).unbind("popstate", this.change);
        else
            $(window).unbind("hashchange", this.change);
    },
    
    navigate: function(){
        var args = this.marray(arguments);
        var triggers = false;
      
        if (typeof args[args.length - 1] == "boolean") {
            triggers = args.pop();
        }
      
        var path = args.join("/");      
        if (this.path == path) return;
      
        if ( !triggers )
            this.path = path;
      
        if (this.history.cache)
            history.cache.pushState({}, document.title, this.getHost() + path);
        else
            window.location.hash = path;
    },
    
    match: function(path, route, callback){
        var match = route.exec(path);
        if (!match) return false;
        var params = match.slice(1);
        callback.apply(callback, params);
        return true;
    },
    
    getPath: function(){
        return window.location.pathname;
    },
    
    getHash: function(){
        return window.location.hash;
    },
    
    getHost: function(){
        return((document.location + "").replace(
            this.getPath() + this.getHash(), ""
        ));
    },
    
    getFragment: function(){
        return this.getHash().replace(this.regex.HASH_STRIP, "");
    },
    
    change: function(e){
        var path = (Hasher.history.cache ? Hasher.getPath() : Hasher.getFragment());
        if (path == Hasher.path) return;
        Hasher.path = path;
        for (var i=0; i < Hasher.routes.length; i++) {
            var r = Hasher.routes[i];
            if (Hasher.match(path, r['route'], r['callback'])) return;
        }
    }
};